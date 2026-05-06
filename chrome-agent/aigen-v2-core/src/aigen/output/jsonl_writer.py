"""JSONL (JSON Lines) output writer."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


class JsonlWriter:
    """Write dataset as JSONL (one JSON object per line)."""

    def __init__(self, path: Path):
        self.path = path

    def write(self, items: list, stats=None) -> None:
        lines = [json.dumps(item, ensure_ascii=False) for item in items]
        self.path.write_text("\n".join(lines) + "\n", encoding="utf-8")
