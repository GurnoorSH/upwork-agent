"""Deduplication engine for generated items."""

from __future__ import annotations

from aigen.utils.fingerprint import fingerprint


class DedupEngine:
    """Track and filter duplicate items based on fingerprints."""

    def __init__(self, enabled: bool = True):
        self.enabled = enabled
        self.seen: set[str] = set()

    def is_duplicate(self, item: dict) -> bool:
        if not self.enabled:
            return False
        return fingerprint(item) in self.seen

    def add(self, item: dict) -> None:
        self.seen.add(fingerprint(item))

    def add_existing(self, item: dict) -> None:
        """Add an existing item to the seen set (for resume)."""
        self.seen.add(fingerprint(item))
