"""Playwright-based browser backend for true parallel execution.

This module provides headless browser automation with multiple browser contexts,
enabling true parallel generation with separate login sessions per agent.
"""

from __future__ import annotations

import asyncio
import time
from pathlib import Path
from typing import Any, Callable, Optional
from dataclasses import dataclass, field

from playwright.async_api import async_playwright, Browser, BrowserContext, Page

# Platform-specific selectors (same as tab.py but accessed from async code)
PLATFORM_SELECTORS = {
    "gemini": {
        "input": [
            "rich-textarea div[contenteditable='true']",
            "rich-textarea p",
            "div[contenteditable='true'][data-placeholder]",
            "div[contenteditable='true']",
        ],
        "send": [
            "button[aria-label='Send message']",
            "button[jsname='Qx7uuf']",
            "button[data-testid='send-button']",
        ],
        "stop": [
            "button[aria-label='Stop response']",
            "button[aria-label='Stop generating']",
            "button[aria-label='Stop']",
        ],
        "response": [
            "model-response .markdown",
            "model-response response-text",
            "model-response",
            "[data-turn-role='model']",
            "[data-message-author-role='model']",
        ],
    },
    "chatgpt": {
        "input": ["textarea", "div[contenteditable='true']", "#prompt-textarea"],
        "send": ["button[data-testid='send-button']", "button[class*='sendButton']"],
        "stop": ["button[data-testid='stop-button']"],
        "response": ["div[data-message-author-role='model']", "div.markdown"],
    },
    "claude": {
        "input": ["textarea", "div[contenteditable='true']", "div.prompt-textarea"],
        "send": ["button[aria-label='Send Message']", "button[type='submit']"],
        "stop": ["button[aria-label='Stop generating']"],
        "response": ["div[data-is-streaming='false']", "div.message-content"],
    },
    "perplexity": {
        "input": ["textarea", "div[contenteditable='true']"],
        "send": ["button[type='submit']", "button[aria-label='Submit']"],
        "stop": ["button[aria-label='Stop']"],
        "response": ["div[data-testid='response']", "div.markdown"],
    },
}

RESPONSE_TIMEOUT = 240000  # ms
STABLE_CHECKS = 4
STABLE_INTERVAL = 3000  # ms


@dataclass
class AsyncResponse:
    """Response from an async browser operation."""
    text: str = ""
    success: bool = True
    error: Optional[str] = None
    response_time_ms: float = 0.0
    char_count: int = 0


class AsyncAgent:
    """A single browser agent with its own context (profile/session).
    
    Each agent runs in its own browser context, enabling true parallel execution
    without tab switching overhead.
    """

    def __init__(
        self,
        name: str,
        context: BrowserContext,
        platform: str = "gemini",
        home_url: str = "https://gemini.google.com/app",
    ):
        self.name = name
        self.context = context
        self.platform = platform
        self.home_url = home_url
        self.selectors = PLATFORM_SELECTORS.get(platform, PLATFORM_SELECTORS["gemini"])
        self.page: Optional[Page] = None
        self._initialized = False

    async def init(self) -> None:
        """Open the platform page in this agent's context."""
        self.page = await self.context.new_page()
        try:
            await self.page.goto(self.home_url, timeout=45000)
        except Exception:
            pass  # Attached/headless sessions can timeout
        self._initialized = True

    async def close(self) -> None:
        """Close this agent's page."""
        if self.page:
            await self.page.close()

    async def _find_element(self, selectors: list[str], timeout: int = 20000):
        """Find the first matching element from a list of selectors."""
        deadline = time.time() + timeout / 1000
        while time.time() < deadline:
            for sel in selectors:
                try:
                    el = await self.page.query_selector(sel)
                    if el:
                        return el
                except Exception:
                    continue
            await asyncio.sleep(0.5)
        raise TimeoutException(f"{self.name}: selector not found with {selectors}")

    async def _type_text(self, text: str) -> None:
        """Type text into the platform's input field."""
        try:
            el = await self._find_element(self.selectors["input"])
            await el.click()
            # Select all and delete
            await self.page.keyboard.press("Meta+A" if self.page.context.browser else "Control+A")
            await self.page.keyboard.press("Backspace")
            await asyncio.sleep(0.2)
            # Type in chunks to avoid rate issues
            for i in range(0, len(text), 200):
                chunk = text[i : i + 200]
                await self.page.keyboard.type(chunk, delay=0.01)
                await asyncio.sleep(0.05)
        except TimeoutException:
            # Recovery: navigate to home and retry
            try:
                await self.page.goto(self.home_url, timeout=30000)
            except Exception:
                pass
            el = await self._find_element(self.selectors["input"], timeout=15000)
            await el.click()
            await self.page.keyboard.press("Meta+A")
            await self.page.keyboard.press("Backspace")
            await asyncio.sleep(0.2)
            for i in range(0, len(text), 200):
                chunk = text[i : i + 200]
                await self.page.keyboard.type(chunk, delay=0.01)
                await asyncio.sleep(0.05)

    async def _click_send(self) -> bool:
        """Click the send button."""
        for sel in self.selectors["send"]:
            try:
                el = await self.page.query_selector(sel)
                if el:
                    await el.click()
                    return True
            except Exception:
                continue
        # Fallback: press Enter
        await self.page.keyboard.press("Enter")
        return True

    async def _is_streaming(self) -> bool:
        """Check if the platform is still streaming a response."""
        for sel in self.selectors["stop"]:
            try:
                el = await self.page.query_selector(sel)
                if el and await el.is_visible():
                    return True
            except Exception:
                continue
        return False

    async def _get_response_text(self) -> str:
        """Get the latest response text from the page."""
        for sel in self.selectors["response"]:
            try:
                els = await self.page.query_selector_all(sel)
                if els:
                    texts = [await el.inner_text() for el in els]
                    # Return the last non-empty response
                    for t in reversed(texts):
                        if t.strip():
                            return t.strip()
            except Exception:
                continue
        return ""

    async def _response_count(self) -> int:
        """Count the number of response elements on the page."""
        for sel in self.selectors["response"]:
            try:
                els = await self.page.query_selector_all(sel)
                return len(els)
            except Exception:
                continue
        return 0

    async def send_and_recv(self, text: str) -> AsyncResponse:
        """Send a prompt and wait for the response. Fully async — no blocking."""
        start = time.time()
        try:
            # Type the prompt
            await self._type_text(text)
            await asyncio.sleep(0.8)
            await self._click_send()

            # Wait for response to start
            before = await self._response_count()
            t0 = time.time()
            while time.time() - t0 < 20:
                if await self._is_streaming() or await self._response_count() > before:
                    break
                await asyncio.sleep(0.5)

            # Wait for response to finish
            deadline = time.time() + RESPONSE_TIMEOUT / 1000
            last = ""
            stable = 0
            while time.time() < deadline:
                await asyncio.sleep(STABLE_INTERVAL / 1000)
                live = await self._is_streaming()
                cur = await self._get_response_text()
                if live:
                    stable = 0
                    last = cur
                    continue
                if cur and cur == last:
                    stable += 1
                    if stable >= STABLE_CHECKS:
                        elapsed_ms = (time.time() - start) * 1000
                        return AsyncResponse(
                            text=cur,
                            success=True,
                            response_time_ms=elapsed_ms,
                            char_count=len(cur),
                        )
                else:
                    stable = 0
                    last = cur

            # Timeout
            elapsed_ms = (time.time() - start) * 1000
            return AsyncResponse(
                text=last,
                success=False,
                error="Response timeout",
                response_time_ms=elapsed_ms,
                char_count=len(last),
            )

        except Exception as exc:
            elapsed_ms = (time.time() - start) * 1000
            return AsyncResponse(
                text="",
                success=False,
                error=str(exc),
                response_time_ms=elapsed_ms,
            )

    async def upload_file(self, file_path: str) -> bool:
        """Upload a file (for multimodal support)."""
        try:
            input_el = await self.page.query_selector('input[type="file"]')
            if input_el:
                await input_el.set_input_files(file_path)
                return True
        except Exception:
            pass
        return False


class PlaywrightPool:
    """Manages a pool of parallel browser agents with independent contexts."""

    def __init__(self, headless: bool = True):
        self.headless = headless
        self.playwright = None
        self.browser: Optional[Browser] = None
        self.agents: list[AsyncAgent] = []

    async def __aenter__(self):
        await self.start()
        return self

    async def __aexit__(self, *args):
        await self.close()

    async def start(self) -> None:
        """Start the Playwright browser."""
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(headless=self.headless)

    async def close(self) -> None:
        """Close the browser and all agents."""
        for agent in self.agents:
            await agent.close()
        if self.browser:
            await self.browser.close()
        if self.playwright:
            await self.playwright.stop()

    async def create_agents(
        self,
        count: int,
        platforms: list[str] | None = None,
        cookies_per_agent: list[list[dict]] | None = None,
    ) -> list[AsyncAgent]:
        """Create multiple agents with independent browser contexts."""
        platforms = platforms or ["gemini"] * count
        self.agents = []

        for i in range(count):
            platform = platforms[i % len(platforms)]
            home_url = self._platform_url(platform)

            # Each agent gets its own browser context (separate profile/cookies)
            context = await self.browser.new_context(
                viewport={"width": 1280, "height": 720},
                user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            )

            # Load cookies for this agent if provided
            if cookies_per_agent and i < len(cookies_per_agent):
                for cookie in cookies_per_agent[i]:
                    try:
                        await context.add_cookies([cookie])
                    except Exception:
                        pass

            agent = AsyncAgent(
                name=f"AG{i + 1}",
                context=context,
                platform=platform,
                home_url=home_url,
            )
            await agent.init()
            self.agents.append(agent)

        return self.agents

    def _platform_url(self, platform: str) -> str:
        urls = {
            "gemini": "https://gemini.google.com/app",
            "chatgpt": "https://chatgpt.com",
            "claude": "https://claude.ai",
            "perplexity": "https://perplexity.ai",
        }
        return urls.get(platform, urls["gemini"])

    async def save_session(self, agent_idx: int, output_dir: str) -> str:
        """Save cookies from an agent's context to a JSON file."""
        import json
        if agent_idx >= len(self.agents):
            return ""
        context = self.agents[agent_idx].context
        cookies = await context.cookies()
        path = f"{output_dir}/session_{self.agents[agent_idx].name}.json"
        with open(path, "w") as f:
            json.dump({"cookies": cookies, "platform": self.agents[agent_idx].platform}, f, indent=2)
        return path

    async def run_parallel(self, tasks: list[tuple[int, str]]) -> list[AsyncResponse]:
        """Run multiple send tasks in parallel across agents.
        
        Args:
            tasks: List of (agent_index, prompt_text) tuples
        Returns:
            List of AsyncResponse objects in the same order as input tasks
        """
        async def _run(idx: int, agent_idx: int, text: str) -> tuple[int, AsyncResponse]:
            return idx, await self.agents[agent_idx].send_and_recv(text)

        coros = [_run(i, agent_idx, text) for i, (agent_idx, text) in enumerate(tasks)]
        results = await asyncio.gather(*coros)
        # Sort by original index
        results.sort(key=lambda x: x[0])
        return [r for _, r in results]


class TimeoutException(Exception):
    """Raised when a browser operation times out."""
    pass
