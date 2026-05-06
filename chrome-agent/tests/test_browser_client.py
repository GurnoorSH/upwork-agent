"""Tests for reusable browser LLM client primitives."""

from aigen.core.browser_client import BrowserLLMClient


class FakeSwitchTo:
    def __init__(self, driver):
        self.driver = driver

    def window(self, handle):
        self.driver.current_window_handle = handle
        self.driver.current_url = self.driver.urls.get(handle, "")

    def new_window(self, _kind):
        handle = f"h{len(self.driver.window_handles) + 1}"
        self.driver.window_handles.append(handle)
        self.driver.urls[handle] = "about:blank"
        self.window(handle)


class FakeDriver:
    def __init__(self, urls=None):
        self.urls = urls or {}
        self.window_handles = list(self.urls.keys())
        self.current_window_handle = self.window_handles[0] if self.window_handles else ""
        self.current_url = self.urls.get(self.current_window_handle, "")
        self.switch_to = FakeSwitchTo(self)
        self.loaded_urls = []

    def set_page_load_timeout(self, _seconds):
        return None

    def get(self, url):
        self.current_url = url
        self.urls[self.current_window_handle] = url
        self.loaded_urls.append(url)


class FakeTab:
    def __init__(self, _driver, handle, name, platform):
        self.handle = handle
        self.name = name
        self.platform = platform
        self.sent = []

    def send(self, text):
        self.sent.append(text)

    def recv(self):
        return '{"results": []}'


def test_browser_llm_client_reuses_existing_platform_tab():
    driver = FakeDriver(
        {
            "h1": "https://www.example.com",
            "h2": "https://gemini.google.com/app",
        }
    )
    created_tabs = []

    def tab_factory(*args):
        tab = FakeTab(*args)
        created_tabs.append(tab)
        return tab

    client = BrowserLLMClient(driver=driver, tab_factory=tab_factory)

    response = client.generate("rank these jobs")

    assert response.text == '{"results": []}'
    assert response.platform == "gemini"
    assert response.tab_name == "BRIDGE"
    assert created_tabs[0].handle == "h2"
    assert created_tabs[0].sent == ["rank these jobs"]
    assert driver.loaded_urls == []


def test_browser_llm_client_opens_platform_tab_when_missing():
    driver = FakeDriver({"h1": "https://www.example.com"})

    client = BrowserLLMClient(driver=driver, tab_factory=FakeTab, platform="chatgpt")

    response = client.generate("hello")

    assert response.text == '{"results": []}'
    assert len(driver.window_handles) == 2
    assert driver.loaded_urls == ["https://chatgpt.com"]
    assert client.tab.platform == "chatgpt"


def test_browser_llm_client_attaches_lazily():
    driver = FakeDriver({"h1": "https://gemini.google.com/app"})
    calls = []

    def attach(port):
        calls.append(port)
        return driver

    client = BrowserLLMClient(attach=attach, debug_port=9333, tab_factory=FakeTab)

    assert calls == []

    response = client.generate("ping")

    assert response.text == '{"results": []}'
    assert calls == [9333]
