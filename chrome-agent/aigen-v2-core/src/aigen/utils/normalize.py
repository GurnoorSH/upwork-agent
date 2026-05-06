"""Text normalization utilities."""

from __future__ import annotations

import re


def normalize_text(value: str) -> str:
    """Normalize whitespace and strip."""
    return re.sub(r"\s+", " ", (value or "").strip())
