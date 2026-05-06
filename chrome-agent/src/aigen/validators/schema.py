"""Schema validation for generated items."""

from __future__ import annotations

from typing import Any, Optional

from aigen.utils.normalize import normalize_text


class SchemaValidator:
    """Validate items against a configurable schema."""

    def __init__(self, schema_cfg: dict):
        self.fields = schema_cfg.get("fields", [])
        self.required = schema_cfg.get("required", [])
        self.min_answer_length = schema_cfg.get("min_answer_length", 50)

    def validate(self, raw: dict) -> Optional[dict]:
        """Validate and normalize a raw item. Returns None if invalid."""
        # Check required fields
        for k in self.required:
            if k not in raw or not str(raw[k]).strip():
                return None

        # Build normalized item
        item = {}
        for k, v in raw.items():
            if isinstance(v, str):
                item[k] = normalize_text(v)
            elif isinstance(v, list):
                item[k] = [normalize_text(str(x)) for x in v if normalize_text(str(x))]
            else:
                item[k] = v

        # Validate answer length
        answer_key = "expected_answer" if "expected_answer" in item else "answer"
        if answer_key in item and len(item[answer_key]) < self.min_answer_length:
            return None

        return item
