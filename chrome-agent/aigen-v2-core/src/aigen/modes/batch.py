"""Batch generation mode."""

from __future__ import annotations

from typing import Any


class BatchMode:
    """Standard batch generation: send prompt, get batch response, parse."""

    def __init__(self, cfg: dict):
        self.batch_size = cfg.get("batch_size", 5)

    def make_prompt(self, batch_idx: int, topic: dict, schema: dict, project: str) -> str:
        from aigen.prompts.templates import make_batch_prompt

        return make_batch_prompt(
            batch_size=self.batch_size,
            batch_idx=batch_idx,
            project=project,
            topic=topic,
            schema=schema,
        )

    def process_response(self, raw: str, parser) -> list[dict]:
        return parser(raw)
