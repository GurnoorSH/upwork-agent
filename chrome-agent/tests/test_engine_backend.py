"""Tests for engine backend selection behavior."""

from aigen.core.engine import GenerationEngine


def _cfg(tmp_path):
    return {
        "project": "backend-test",
        "target": 5,
        "batch_size": 1,
        "topic_pool": [{"topic": "fractions"}],
        "output": {
            "path": str(tmp_path / "out"),
            "filename": "dataset.json",
            "format": "json",
        },
        "schema": {
            "fields": ["question_text", "expected_answer"],
            "required": ["question_text", "expected_answer"],
        },
    }


def test_engine_uses_runtime_backend_from_config(tmp_path):
    cfg = _cfg(tmp_path)
    cfg["runtime"] = {"backend": "playwright"}
    cfg["playwright"] = {"headless": False}

    engine = GenerationEngine(cfg, resume=False)

    assert engine.backend == "playwright"
    assert engine.playwright_headless is False


def test_engine_explicit_backend_override_wins(tmp_path):
    cfg = _cfg(tmp_path)
    cfg["runtime"] = {"backend": "playwright"}

    engine = GenerationEngine(cfg, resume=False, backend="selenium")

    assert engine.backend == "selenium"
