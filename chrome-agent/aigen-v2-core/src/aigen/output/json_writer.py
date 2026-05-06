"""JSON output writer."""

from __future__ import annotations

import datetime
import json
from pathlib import Path
from typing import Any


class JsonWriter:
    """Write dataset as JSON with metadata wrapper."""

    def __init__(self, path: Path, project: str = "dataset"):
        self.path = path
        self.project = project

    def write(self, items: list, stats=None) -> None:
        payload = {
            "dataset_name": self.project,
            "created_at": datetime.datetime.utcnow().isoformat() + "Z",
            "total_items": len(items),
            "items": items,
        }
        if stats:
            payload["stats"] = stats
        self.path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
