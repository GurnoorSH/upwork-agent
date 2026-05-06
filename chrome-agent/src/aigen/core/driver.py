"""Selenium Chrome driver attachment with webdriver-manager fallback."""

from __future__ import annotations

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

from aigen.utils.logging import log

try:
    from webdriver_manager.chrome import ChromeDriverManager

    HAS_WDM = True
except ImportError:
    HAS_WDM = False


def attach_driver(port: int):
    """Attach to a running Chrome instance via remote debugging port."""
    log(f"Attaching to Chrome on port {port}")
    opts = Options()
    opts.add_experimental_option("debuggerAddress", f"127.0.0.1:{port}")

    if HAS_WDM:
        try:
            drv = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=opts)
            log("Attached via webdriver-manager", "OK")
            return drv
        except Exception as exc:
            log(f"WDM failed: {exc}", "WARN")

    drv = webdriver.Chrome(options=opts)
    log("Attached via system chromedriver", "OK")
    return drv
