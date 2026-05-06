"""Tests for generation preflight validation."""

from aigen.core.engine import validate_generation_config


def _base_cfg() -> dict:
    return {
        "target": 10,
        "batch_size": 2,
        "topic_pool": [{"topic": "fractions"}],
        "output": {"path": "output", "filename": "dataset.json"},
    }


def test_validate_generation_config_accepts_valid_config():
    assert validate_generation_config(_base_cfg()) == []


def test_validate_generation_config_rejects_empty_topic_pool():
    cfg = _base_cfg()
    cfg["topic_pool"] = []

    errors = validate_generation_config(cfg)
    assert "'topic_pool' must be a non-empty list." in errors


def test_validate_generation_config_rejects_non_positive_target():
    cfg = _base_cfg()
    cfg["target"] = 0

    errors = validate_generation_config(cfg)
    assert "'target' must be a positive integer." in errors


def test_validate_generation_config_rejects_invalid_topic_entries():
    cfg = _base_cfg()
    cfg["topic_pool"] = ["fractions"]

    errors = validate_generation_config(cfg)
    assert "'topic_pool' entries must be objects (dict-like)." in errors


def test_validate_generation_config_rejects_blank_output_filename():
    cfg = _base_cfg()
    cfg["output"]["filename"] = ""

    errors = validate_generation_config(cfg)
    assert "'output.filename' must be a non-empty string." in errors


def test_validate_generation_config_accepts_runtime_backend_playwright():
    cfg = _base_cfg()
    cfg["runtime"] = {"backend": "playwright"}
    cfg["playwright"] = {"headless": True}

    assert validate_generation_config(cfg) == []


def test_validate_generation_config_rejects_invalid_runtime_backend():
    cfg = _base_cfg()
    cfg["runtime"] = {"backend": "invalid"}

    errors = validate_generation_config(cfg)
    assert "runtime.backend must be one of: selenium, playwright." in errors


def test_validate_generation_config_rejects_non_mapping_runtime():
    cfg = _base_cfg()
    cfg["runtime"] = "playwright"

    errors = validate_generation_config(cfg)
    assert "'runtime' must be an object." in errors
