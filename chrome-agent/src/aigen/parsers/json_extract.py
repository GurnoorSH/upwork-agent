"""JSON extraction from raw LLM response text."""

from __future__ import annotations

import json
import re
from typing import Optional


def _largest_balanced_block(text: str, open_char: str, close_char: str) -> Optional[str]:
    """Find the largest balanced JSON block for the given delimiters."""
    best = None
    best_len = 0
    in_str = False
    esc = False
    depth = 0
    start = -1

    for i, ch in enumerate(text):
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                in_str = False
            continue

        if ch == '"':
            in_str = True
            continue

        if ch == open_char:
            if depth == 0:
                start = i
            depth += 1
        elif ch == close_char and depth > 0:
            depth -= 1
            if depth == 0 and start >= 0:
                cand = text[start : i + 1]
                if len(cand) > best_len:
                    best = cand
                    best_len = len(cand)
                start = -1

    return best


def _largest_balanced_array_block(text: str) -> Optional[str]:
    """Find the largest balanced JSON array block in text."""

    return _largest_balanced_block(text, "[", "]")


def _largest_balanced_object_block(text: str) -> Optional[str]:
    """Find the largest balanced JSON object block in text."""

    return _largest_balanced_block(text, "{", "}")


def _candidate_json_blocks(text: str, balanced_block: Optional[str]) -> list[str]:
    candidates: list[str] = [text.strip()]

    fenced = re.findall(r"```(?:json)?\s*([\s\S]*?)```", text, flags=re.IGNORECASE)
    candidates.extend(c.strip() for c in fenced if c.strip())

    if balanced_block:
        candidates.append(balanced_block.strip())

    return candidates


def extract_json_array(text: str | None) -> list[dict]:
    """Extract JSON array from potentially noisy LLM response text.
    
    Tries multiple strategies:
    1. Direct parse of stripped text
    2. Markdown code fence extraction
    3. Largest balanced bracket block
    """
    if not text:
        return []

    candidates = _candidate_json_blocks(text, _largest_balanced_array_block(text))

    for cand in candidates:
        try:
            parsed = json.loads(cand)
            if isinstance(parsed, list):
                return [x for x in parsed if isinstance(x, dict)]
        except Exception:
            continue
    
    return []


def extract_json_object(text: str | None) -> dict:
    """Extract a JSON object from potentially noisy LLM response text.

    This is intended for bridge-style responses such as {"results": [...]}.
    It accepts only valid JSON objects and returns an empty dict on failure.
    """

    if not text:
        return {}

    stripped = text.strip()
    try:
        parsed = json.loads(stripped)
        return parsed if isinstance(parsed, dict) else {}
    except Exception:
        pass

    candidates = _candidate_json_blocks(text, _largest_balanced_object_block(text))

    for cand in candidates:
        try:
            parsed = json.loads(cand)
            if isinstance(parsed, dict):
                return parsed
        except Exception:
            continue

    return {}
