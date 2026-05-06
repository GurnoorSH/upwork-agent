"""Browser tab abstraction for multi-platform support."""

from __future__ import annotations

import subprocess
import sys
import time
from pathlib import Path
from typing import Optional

from selenium.common.exceptions import (
    ElementNotInteractableException,
    NoSuchElementException,
    StaleElementReferenceException,
    TimeoutException,
)
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from aigen.utils.logging import log

# Platform-specific selectors
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
        "upload_button": [
            "button[aria-label='Open upload file menu']",
            "button[aria-label='Close upload file menu']",
            "button[aria-label*='Upload']",
            "button[aria-label*='Attach']",
            "button[aria-label*='Add file']",
            "button[aria-label*='Insert file']",
            "button[data-testid='add-files']",
        ],
        "upload_menu_item": [
            "button[aria-label*='Upload files']",
            "[role='menuitem'][aria-label*='Upload files']",
        ],
        "upload_input": [
            "input[type='file']",
            "input[accept*='text/plain']",
        ],
    },
    "chatgpt": {
        "input": [
            "textarea",
            "div[contenteditable='true']",
            "#prompt-textarea",
        ],
        "send": [
            "button[data-testid='send-button']",
            "button[class*='sendButton']",
        ],
        "stop": [
            "button[data-testid='stop-button']",
        ],
        "response": [
            "div[data-message-author-role='model']",
            "div.markdown",
            "[class*='markdown']",
        ],
    },
    "claude": {
        "input": [
            "textarea",
            "div[contenteditable='true']",
            "div.prompt-textarea",
        ],
        "send": [
            "button[aria-label='Send Message']",
            "button[type='submit']",
        ],
        "stop": [
            "button[aria-label='Stop generating']",
        ],
        "response": [
            "div[data-is-streaming='false']",
            "div.message-content",
        ],
    },
    "perplexity": {
        "input": [
            "textarea",
            "div[contenteditable='true']",
        ],
        "send": [
            "button[type='submit']",
            "button[aria-label='Submit']",
        ],
        "stop": [
            "button[aria-label='Stop']",
        ],
        "response": [
            "div[data-testid='response']",
            "div.markdown",
        ],
    },
}

RESPONSE_TIMEOUT = 90
STABLE_CHECKS = 3
STABLE_INTERVAL = 3.0


class BrowserTab:
    """Represents one browser tab connected to an AI chat platform."""

    COLORS = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"]

    def __init__(self, driver, handle: str, name: str, platform: str = "gemini"):
        self.driver = driver
        self.handle = handle
        self.name = name
        self.platform = platform
        self.color = self.COLORS[hash(name) % len(self.COLORS)]
        self._selectors = PLATFORM_SELECTORS.get(platform, PLATFORM_SELECTORS["gemini"])
        self._upload_capable: Optional[bool] = None

    def focus(self) -> None:
        if self.driver.current_window_handle != self.handle:
            self.driver.switch_to.window(self.handle)

    def _find(self, selectors: list[str], timeout: int = 20):
        deadline = time.time() + timeout
        while time.time() < deadline:
            for sel in selectors:
                try:
                    els = self.driver.find_elements(By.CSS_SELECTOR, sel)
                    if not els:
                        continue
                    for el in els:
                        try:
                            if el.is_displayed() and el.is_enabled():
                                return el
                        except StaleElementReferenceException:
                            continue
                    return els[0]
                except Exception:
                    continue
            time.sleep(0.5)
        raise TimeoutException(f"{self.name}: selector not found with {selectors}")

    def _find_optional(self, selectors: list[str], timeout: int = 5):
        deadline = time.time() + timeout
        while time.time() < deadline:
            for sel in selectors:
                try:
                    els = self.driver.find_elements(By.CSS_SELECTOR, sel)
                    if not els:
                        continue
                    for el in els:
                        try:
                            if el.is_enabled():
                                return el
                        except StaleElementReferenceException:
                            continue
                    return els[0]
                except Exception:
                    continue
            time.sleep(0.35)
        return None

    def _click_optional(self, selectors: list[str], timeout: int = 3) -> bool:
        el = self._find_optional(selectors, timeout=timeout)
        if not el:
            return False
        try:
            self.driver.execute_script("arguments[0].click();", el)
            return True
        except Exception:
            try:
                el.click()
                return True
            except Exception:
                return False

    def _upload_via_macos_dialog(self, path: Path) -> bool:
        if sys.platform != "darwin":
            return False

        # Gemini currently opens a native file chooser in some UI variants.
        # This fallback drives the macOS file picker using AppleScript.
        escaped = str(path).replace("\\", "\\\\").replace('"', '\\"')
        script_lines = [
            'tell application "Google Chrome" to activate',
            "delay 0.2",
            'tell application "System Events"',
            'keystroke "G" using {command down, shift down}',
            "delay 0.2",
            f'keystroke "{escaped}"',
            "delay 0.2",
            "key code 36",
            "delay 0.3",
            "key code 36",
            "end tell",
        ]
        cmd = ["osascript"]
        for line in script_lines:
            cmd.extend(["-e", line])

        try:
            subprocess.run(cmd, check=True, timeout=4, capture_output=True, text=True)
            time.sleep(1.0)
            attached = bool(
                self.driver.execute_script(
                    "return (document.body && document.body.innerText || '').includes(arguments[0]);",
                    path.name,
                )
            )
            if attached:
                log(f"Attached file via macOS dialog: {path.name}", "OK", self.name)
            else:
                log("macOS dialog upload attempted; attachment not yet detectable", "WARN", self.name)
            return attached
        except Exception as exc:
            log(f"macOS dialog upload failed: {exc}", "WARN", self.name)
            return False

    def _type_text(self, el, text: str) -> None:
        """Type text into a contenteditable element safely."""
        self.driver.execute_script(
            "arguments[0].focus();document.execCommand('selectAll',false,null);document.execCommand('delete',false,null);",
            el,
        )
        time.sleep(0.2)
        for i in range(0, len(text), 300):
            chunk = text[i : i + 300]
            safe = chunk.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
            self.driver.execute_script("document.execCommand('insertText',false,`" + safe + "`);", el)
            time.sleep(0.05)

    def _click_send(self) -> bool:
        for sel in self._selectors["send"]:
            els = self.driver.find_elements(By.CSS_SELECTOR, sel)
            if not els:
                continue
            el = els[0]
            try:
                self.driver.execute_script("arguments[0].click();", el)
                return True
            except Exception:
                try:
                    el.click()
                    return True
                except Exception:
                    continue
        return False

    def upload_file(self, file_path: str) -> bool:
        """Try to upload a local file using platform file input controls."""
        if self._upload_capable is False:
            return False

        self.focus()

        p = Path(file_path).expanduser().resolve()
        if not p.exists() or not p.is_file():
            log(f"Upload skipped: file not found {p}", "WARN", self.name)
            return False

        input_selectors = self._selectors.get("upload_input", ["input[type='file']"])
        button_selectors = self._selectors.get("upload_button", [])
        upload_menu_selectors = self._selectors.get("upload_menu_item", [])

        for attempt in range(1, 4):
            try:
                file_input = self._find_optional(input_selectors, timeout=2)

                # If hidden input isn't found yet, try opening uploader UI first.
                if not file_input and button_selectors:
                    self._click_optional(button_selectors, timeout=2)
                    if upload_menu_selectors:
                        self._click_optional(upload_menu_selectors, timeout=2)
                    time.sleep(0.5)
                    file_input = self._find_optional(input_selectors, timeout=3)

                if not file_input:
                    if self._upload_via_macos_dialog(p):
                        return True
                    log(f"Upload attempt {attempt}: no file input located", "WARN", self.name)
                    continue

                try:
                    self.driver.execute_script(
                        "arguments[0].removeAttribute('hidden');"
                        "arguments[0].style.display='block';"
                        "arguments[0].style.visibility='visible';",
                        file_input,
                    )
                except Exception:
                    pass

                file_input.send_keys(str(p))
                time.sleep(1.0)
                log(f"Attached file: {p.name}", "OK", self.name)
                self._upload_capable = True
                return True
            except (StaleElementReferenceException, ElementNotInteractableException, TimeoutException) as exc:
                log(f"Upload attempt {attempt} failed: {exc.__class__.__name__}", "WARN", self.name)
                time.sleep(0.6)
            except Exception as exc:
                log(f"Upload attempt {attempt} unexpected error: {exc}", "WARN", self.name)
                time.sleep(0.6)

        log("Upload failed after retries", "WARN", self.name)
        self._upload_capable = False
        log("Disabling upload attempts for this tab after repeated failures", "WARN", self.name)
        return False

    def _streaming(self) -> bool:
        for sel in self._selectors["stop"]:
            try:
                if self.driver.find_element(By.CSS_SELECTOR, sel).is_displayed():
                    return True
            except NoSuchElementException:
                continue
        return False

    def _last_text(self) -> str:
        for sel in self._selectors["response"]:
            try:
                els = self.driver.find_elements(By.CSS_SELECTOR, sel)
                if els:
                    t = els[-1].text.strip()
                    if t:
                        return t
            except StaleElementReferenceException:
                continue
        return ""

    def _resp_count(self) -> int:
        for sel in self._selectors["response"]:
            count = len(self.driver.find_elements(By.CSS_SELECTOR, sel))
            if count:
                return count
        return 0

    def send(self, text: str) -> None:
        self.focus()
        log(f"Sending {len(text)} chars", "TX", self.name)
        before = self._resp_count()

        for attempt in range(1, 4):
            try:
                try:
                    el = self._find(self._selectors["input"])
                except TimeoutException:
                    try:
                        self.driver.set_page_load_timeout(30)
                        self.driver.get("https://gemini.google.com/app")
                    except Exception:
                        log("Recovery navigation failed", "WARN", self.name)
                    el = self._find(self._selectors["input"], timeout=15)

                self._type_text(el, text)
                time.sleep(0.8)
                if not self._click_send():
                    el.send_keys(Keys.RETURN)

                # Confirm send actually triggered output or streaming.
                t0 = time.time()
                while time.time() - t0 < 4.0:
                    if self._streaming() or self._resp_count() > before:
                        return
                    time.sleep(0.25)

                log(f"Send attempt {attempt} did not trigger response, retrying", "WARN", self.name)
            except (ElementNotInteractableException, StaleElementReferenceException, TimeoutException) as exc:
                log(f"Send attempt {attempt} failed: {exc.__class__.__name__}", "WARN", self.name)
                time.sleep(0.6)

        raise RuntimeError(f"{self.name}: failed to submit prompt after retries")

    def recv(self) -> str:
        self.focus()
        log("Waiting for response", "RX", self.name)
        before = self._resp_count()
        t0 = time.time()
        while time.time() - t0 < 8:
            if self._streaming() or self._resp_count() > before:
                break
            time.sleep(0.5)

        deadline = time.time() + RESPONSE_TIMEOUT
        last = ""
        stable = 0
        while time.time() < deadline:
            time.sleep(STABLE_INTERVAL)
            live = self._streaming()
            cur = self._last_text()
            if live:
                stable = 0
                last = cur
                continue
            if cur and cur == last:
                stable += 1
                if stable >= STABLE_CHECKS:
                    log(f"Response ready: {len(cur)} chars", "OK", self.name)
                    return cur
            else:
                stable = 0
                last = cur
        log("Timeout: best effort response", "WARN", self.name)
        return last
