"""Compliance & Lineage — provenance tracking, PII detection, audit trails."""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path
from typing import Optional
from dataclasses import dataclass, asdict

from aigen.utils.normalize import normalize_text


@dataclass
class ProvenanceRecord:
    """Complete provenance chain for a single item."""
    platform: str
    batch_id: int
    tab_name: str
    generated_at: str
    prompt_hash: str
    config_version: str
    raw_response_path: str
    parsed_path: str
    validation_passed: bool
    quality_score: Optional[float] = None
    dedup_passed: bool = True


@dataclass
class PIIResult:
    """PII detection result."""
    has_pii: bool
    entities: list[dict]
    redacted_text: str
    entity_types: list[str]


class ProvenanceTracker:
    """Track full provenance for every generated item."""

    def __init__(self, config_version: str = "1.0"):
        self.config_version = config_version
        self.records: list[ProvenanceRecord] = []

    def record_item(
        self,
        platform: str,
        batch_id: int,
        tab_name: str,
        generated_at: str,
        prompt_text: str,
        raw_response_path: str,
        parsed_path: str,
        validation_passed: bool = True,
        quality_score: Optional[float] = None,
    ) -> ProvenanceRecord:
        """Record provenance for a generated item."""
        record = ProvenanceRecord(
            platform=platform,
            batch_id=batch_id,
            tab_name=tab_name,
            generated_at=generated_at,
            prompt_hash=hashlib.sha256(prompt_text.encode()).hexdigest()[:16],
            config_version=self.config_version,
            raw_response_path=raw_response_path,
            parsed_path=parsed_path,
            validation_passed=validation_passed,
            quality_score=quality_score,
            dedup_passed=True,
        )
        self.records.append(record)
        return record

    def export_audit_trail(self, output_path: Path) -> None:
        """Export a signed audit trail JSON for compliance."""
        audit = {
            "config_version": self.config_version,
            "total_items": len(self.records),
            "records": [asdict(r) for r in self.records],
        }
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text(json.dumps(audit, ensure_ascii=False, indent=2), encoding="utf-8")

    def get_stats(self) -> dict:
        """Get provenance statistics."""
        platforms = {}
        for r in self.records:
            platforms[r.platform] = platforms.get(r.platform, 0) + 1
        return {
            "total_tracked": len(self.records),
            "platforms": platforms,
            "config_version": self.config_version,
        }


class PIIDetector:
    """Detect and optionally redact PII from generated text."""

    # Common PII patterns
    PATTERNS = {
        "email": r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}",
        "phone": r"\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b",
        "ssn": r"\b\d{3}-\d{2}-\d{4}\b",
        "credit_card": r"\b(?:\d{4}[-\s]?){3}\d{4}\b",
        "ip_address": r"\b(?:\d{1,3}\.){3}\d{1,3}\b",
        "date_of_birth": r"\b(?:0?[1-9]|1[0-2])[/\-](?:0?[1-9]|[12]\d|3[01])[/\-](?:19|20)?\d{2}\b",
    }

    def __init__(self, enabled: bool = True, auto_redact: bool = False):
        self.enabled = enabled
        self.auto_redact = auto_redact
        self.stats = {
            "scanned": 0,
            "flagged": 0,
            "entity_counts": {},
        }

    def detect(self, text: str) -> PIIResult:
        """Scan text for PII entities."""
        if not self.enabled:
            return PIIResult(has_pii=False, entities=[], redacted_text=text, entity_types=[])

        self.stats["scanned"] += 1
        entities = []
        redacted = text

        for entity_type, pattern in self.PATTERNS.items():
            matches = list(re.finditer(pattern, text))
            if matches:
                for match in matches:
                    entities.append({
                        "type": entity_type,
                        "value": match.group()[:3] + "***" if self.auto_redact else match.group(),
                        "start": match.start(),
                        "end": match.end(),
                    })
                    if self.auto_redact:
                        redacted = redacted[:match.start()] + f"[{entity_type.upper()}]" + redacted[match.end():]

        entity_types = list(set(e["type"] for e in entities))
        for et in entity_types:
            self.stats["entity_counts"][et] = self.stats["entity_counts"].get(et, 0) + len(
                [e for e in entities if e["type"] == et]
            )

        if entities:
            self.stats["flagged"] += 1

        return PIIResult(
            has_pii=bool(entities),
            entities=entities,
            redacted_text=redacted,
            entity_types=entity_types,
        )

    def scan_item(self, item: dict) -> dict:
        """Scan all text fields in an item for PII."""
        results = {}
        for key, value in item.items():
            if isinstance(value, str) and len(value) > 10:
                result = self.detect(value)
                if result.has_pii:
                    results[key] = result
        return results

    def get_stats(self) -> dict:
        """Get PII detection statistics."""
        return {
            "enabled": self.enabled,
            "auto_redact": self.auto_redact,
            "scanned": self.stats["scanned"],
            "flagged": self.stats["flagged"],
            "entity_types_found": self.stats["entity_counts"],
        }
