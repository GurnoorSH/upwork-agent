"""Tests for validators."""

from aigen.validators.schema import SchemaValidator
from aigen.validators.dedup import DedupEngine
from aigen.utils.fingerprint import fingerprint


def test_schema_validator_required_fields():
    cfg = {"fields": ["name", "age"], "required": ["name", "age"]}
    v = SchemaValidator(cfg)
    
    assert v.validate({"name": "Alice", "age": 30}) is not None
    assert v.validate({"name": "Alice"}) is None  # missing age


def test_schema_validator_normalization():
    cfg = {"fields": ["text"], "required": ["text"]}
    v = SchemaValidator(cfg)
    
    result = v.validate({"text": "  hello   world  "})
    assert result["text"] == "hello world"


def test_dedup_engine():
    dedup = DedupEngine()
    item = {"question_text": "What is 2+2?", "chapter": "Math"}
    
    assert not dedup.is_duplicate(item)
    dedup.add(item)
    assert dedup.is_duplicate(item)


def test_fingerprint_consistency():
    item1 = {"question_text": "What is 2+2?", "chapter": "Math"}
    item2 = {"question_text": "What is 2+2?", "chapter": "Math"}
    item3 = {"question_text": "What is 3+3?", "chapter": "Math"}
    
    assert fingerprint(item1) == fingerprint(item2)
    assert fingerprint(item1) != fingerprint(item3)


def test_dedup_disabled():
    dedup = DedupEngine(enabled=False)
    item = {"text": "hello"}
    dedup.add(item)
    assert not dedup.is_duplicate(item)
