"""Tests for platform tab selectors."""

from aigen.core.tab import PLATFORM_SELECTORS


def test_all_platforms_have_required_selectors():
    for platform in ["gemini", "chatgpt", "claude", "perplexity"]:
        selectors = PLATFORM_SELECTORS[platform]
        assert "input" in selectors
        assert "send" in selectors
        assert "stop" in selectors
        assert "response" in selectors
        assert len(selectors["input"]) >= 1
        assert len(selectors["send"]) >= 1


def test_gemini_selectors():
    s = PLATFORM_SELECTORS["gemini"]
    assert "rich-textarea" in s["input"][0]
    assert "aria-label" in s["send"][0]
