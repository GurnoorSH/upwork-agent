"""Prompt template system."""

from __future__ import annotations

from typing import Any, Optional

GENERATION_SYSTEM = """You are generating high-quality dataset items.

MANDATORY:
1) Output ONLY valid JSON array.
2) No markdown/code fences.
3) No LaTeX.
4) Fractions only plain text like 3/5.
5) Keep JSON strings single-line; no embedded newlines.
6) Use double quotes for all keys and string values.
"""


def make_batch_prompt(
    batch_size: int,
    batch_idx: int,
    project: str,
    topic: dict,
    schema: dict,
    platform: str = "",
    source_attachment: Optional[dict] = None,
) -> str:
    """Build a batch generation prompt."""
    topic_str = " | ".join(f"{k}: {v}" for k, v in topic.items() if k != "weight")
    
    fields_desc = ", ".join(schema.get("fields", []))
    required_desc = ", ".join(schema.get("required", []))

    source_block = ""
    if source_attachment:
        source_text = str(source_attachment.get("source_text", "")).replace('"""', '\"\"\"')
        source_path = source_attachment.get("source_path", "unknown")
        source_book = source_attachment.get("book_id", "unknown")
        source_class = source_attachment.get("class", "unknown")
        source_block = f"""
Grounding Source (attached textbook excerpt):
- source_path: {source_path}
- book_id: {source_book}
- class: {source_class}

Use ONLY this excerpt as the factual source for this batch:
\"\"\"{source_text}\"\"\"

Grounding rules:
- Do not invent facts outside the excerpt.
- Ensure generated items are derivable from this excerpt.
- If schema includes a `source_text` field, copy an exact quote from the excerpt.
"""

    return f"""
{GENERATION_SYSTEM}

Project: {project}
Batch: {batch_idx}
Topic: {topic_str}
{source_block}

Generate exactly {batch_size} unique items.

Schema fields: {fields_desc}
Required fields: {required_desc}

Return a JSON array with exactly {batch_size} objects.
Each object must include all required fields.
"""
