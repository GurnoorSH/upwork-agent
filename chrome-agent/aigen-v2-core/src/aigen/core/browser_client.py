"""Reusable browser-backed LLM client primitives."""

from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Callable, Optional, Protocol


PLATFORM_URLS = {
    "gemini": "https://gemini.google.com/app",
    "chatgpt": "https://chatgpt.com",
    "claude": "https://claude.ai",
    "perplexity": "https://perplexity.ai",
}


class BrowserTabLike(Protocol):
    """Small protocol for a browser tab that can send and receive prompts."""

    platform: str
    name: str

    def send(self, text: str) -> None:
        ...

    def recv(self) -> str:
        ...


@dataclass(frozen=True)
class BrowserLLMResponse:
    """Text returned by a browser AI platform plus useful request metadata."""

    text: str
    platform: str
    tab_name: str
    duration_ms: float


class BrowserLLMClient:
    """Send one-off prompts to a logged-in browser AI platform.

    This client intentionally knows nothing about datasets, schemas, output
    writers, or Upwork. It only owns the browser attachment and prompt exchange
    boundary so higher-level domains can reuse it.
    """

    def __init__(
        self,
        platform: str = "gemini",
        debug_port: int = 9222,
        tab_name: str = "BRIDGE",
        driver=None,
        attach: Optional[Callable[[int], object]] = None,
        tab_factory: Optional[Callable[[object, str, str, str], BrowserTabLike]] = None,
    ):
        self.platform = platform
        self.debug_port = debug_port
        self.tab_name = tab_name
        self._driver = driver
        self._attach = attach
        self._tab_factory = tab_factory
        self._tab: Optional[BrowserTabLike] = None

    @property
    def driver(self):
        """Return the attached driver, connecting lazily if needed."""

        if self._driver is None:
            self._driver = self._get_attach()(self.debug_port)
        return self._driver

    @property
    def tab(self) -> BrowserTabLike:
        """Return the active browser tab, creating it lazily if needed."""

        if self._tab is None:
            handle = self._select_or_open_handle()
            self._tab = self._get_tab_factory()(self.driver, handle, self.tab_name, self.platform)
        return self._tab

    def generate(self, prompt: str) -> BrowserLLMResponse:
        """Send a prompt to the configured platform and return the raw response."""

        started_at = time.perf_counter()
        tab = self.tab
        tab.send(prompt)
        text = tab.recv()
        return BrowserLLMResponse(
            text=text,
            platform=self.platform,
            tab_name=tab.name,
            duration_ms=(time.perf_counter() - started_at) * 1000,
        )

    def _select_or_open_handle(self) -> str:
        """Find an existing platform tab or open a new tab if needed."""

        driver = self.driver
        handles = list(getattr(driver, "window_handles", []) or [])
        if not handles:
            return self._open_platform_tab()

        platform_url = PLATFORM_URLS.get(self.platform, PLATFORM_URLS["gemini"])
        platform_host = _host_from_url(platform_url)

        for handle in handles:
            try:
                driver.switch_to.window(handle)
                current_url = str(getattr(driver, "current_url", "") or "")
            except Exception:
                continue
            if platform_host in current_url:
                return handle

        try:
            driver.switch_to.window(handles[0])
        except Exception:
            pass
        return self._open_platform_tab()

    def _open_platform_tab(self) -> str:
        driver = self.driver
        before = set(getattr(driver, "window_handles", []) or [])
        driver.switch_to.new_window("tab")
        after = set(getattr(driver, "window_handles", []) or [])
        new_handles = list(after - before)
        if not new_handles:
            handles = list(after)
            if not handles:
                raise RuntimeError("Cannot open browser tab for LLM platform.")
            handle = handles[-1]
        else:
            handle = new_handles[0]

        driver.switch_to.window(handle)
        platform_url = PLATFORM_URLS.get(self.platform, PLATFORM_URLS["gemini"])
        try:
            driver.set_page_load_timeout(45)
        except Exception:
            pass
        try:
            driver.get(platform_url)
        except Exception:
            pass
        return handle

    def _get_attach(self) -> Callable[[int], object]:
        if self._attach is not None:
            return self._attach
        from aigen.core.driver import attach_driver

        return attach_driver

    def _get_tab_factory(self) -> Callable[[object, str, str, str], BrowserTabLike]:
        if self._tab_factory is not None:
            return self._tab_factory
        from aigen.core.tab import BrowserTab

        return BrowserTab


def _host_from_url(url: str) -> str:
    return url.split("//", 1)[-1].split("/", 1)[0]
