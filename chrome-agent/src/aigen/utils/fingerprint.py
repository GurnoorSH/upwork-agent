"""Fingerprint generation for deduplication."""

from __future__ import annotations

import hashlib

from aigen.utils.normalize import normalize_text


def fingerprint(item: dict) -> str:
    """Generate a deduplication fingerprint from an item.
    
    Uses class, chapter, topic, and primary text field.
    """
    key = "|".join(
        [
            normalize_text(str(item.get("class", item.get("subject", "")))).lower(),
            normalize_text(str(item.get("chapter", ""))).lower(),
            normalize_text(str(item.get("topic", ""))).lower(),
            normalize_text(str(item.get("question_text", item.get("text", item.get("title", ""))))).lower(),
        ]
    )
    return hashlib.md5(key.encode("utf-8")).hexdigest()[:16]
