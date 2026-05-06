"""CSV output writer."""

from __future__ import annotations

import csv
from pathlib import Path
from typing import Any


class CsvWriter:
    """Write dataset as CSV."""

    def __init__(self, path: Path):
        self.path = path

    def write(self, items: list, stats=None) -> None:
        if not items:
            return
        # Collect all fieldnames
        fieldnames = []
        for item in items:
            for k in item.keys():
                if k not in fieldnames:
                    fieldnames.append(k)

        with open(self.path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for item in items:
                row = {}
                for k, v in item.items():
                    if isinstance(v, (list, dict)):
                        row[k] = str(v)
                    else:
                        row[k] = v
                writer.writerow(row)
