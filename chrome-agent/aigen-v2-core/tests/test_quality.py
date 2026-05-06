"""Tests for quality scoring behavior."""

from aigen.validators.quality import QualityScorer


def _good_item() -> dict:
    return {
        "question_text": "Explain why 3/4 is larger than 2/3.",
        "expected_answer": "Compare with a common denominator: 3/4 = 9/12 and 2/3 = 8/12, so 3/4 is larger.",
        "key_marking_points": ["common denominator", "9/12", "8/12"],
        "difficulty": "medium",
    }


def test_quality_fast_mode_passes_good_item():
    scorer = QualityScorer(mode="fast", threshold=6.0)

    result = scorer.score_item_sync(_good_item())

    assert result.passed is True
    assert result.score >= 6.0


def test_quality_fast_mode_fails_missing_answer():
    scorer = QualityScorer(mode="fast", threshold=6.0)
    item = {"question_text": "What is photosynthesis?", "expected_answer": ""}

    result = scorer.score_item_sync(item)

    assert result.passed is False
    assert any("Missing answer" in issue for issue in result.issues)


def test_quality_adversarial_mode_parses_critic_json_response():
    scorer = QualityScorer(mode="adversarial", threshold=7.0)
    critic_response = (
        '{"factual_accuracy": 8, "clarity": 7, "completeness": 9, '
        '"overall_score": 8, "issues": ["minor wording"]}'
    )

    result = scorer.score_item_sync(_good_item(), critic_response_text=critic_response)

    assert result.passed is True
    assert result.score == 8
    assert result.issues == ["minor wording"]


def test_quality_stats_updated_for_each_scored_item():
    scorer = QualityScorer(mode="fast", threshold=6.0)

    scorer.score_item_sync(_good_item())
    scorer.score_item_sync({"question_text": "Q", "expected_answer": ""})

    stats = scorer.get_stats()
    assert stats["scored"] == 2
    assert stats["passed"] + stats["failed"] + stats["human_review"] == 2
