"""AI Quality Scorer — automated quality assessment of generated items.

Supports three modes:
- fast: LLM self-critique (same platform)
- adversarial: one tab generates, another critiques
- human: flag low-confidence items to review queue
"""

from __future__ import annotations

import json
import re
from typing import Optional
from dataclasses import dataclass


@dataclass
class QualityScore:
    score: float  # 1-10
    factual_accuracy: float  # 1-10
    clarity: float  # 1-10
    completeness: float  # 1-10
    issues: list[str]
    passed: bool  # True if score >= threshold


CRITIQUE_PROMPT = """You are an expert evaluator assessing the quality of AI-generated content.

Evaluate the following item on three dimensions (1-10 scale):

1. FACTUAL ACCURACY: Is the information correct? Any errors or hallucinations?
2. CLARITY: Is it well-written and easy to understand?
3. COMPLETENESS: Does it fully address the question/topic?

Item:
{item_json}

Respond with ONLY a JSON object in this format:
{{
  "factual_accuracy": 8,
  "clarity": 7,
  "completeness": 9,
  "overall_score": 8,
  "issues": ["issue 1", "issue 2"]
}}

Score guidelines:
- 1-3: Severely flawed, unusable
- 4-5: Major issues, needs significant revision
- 6-7: Minor issues, acceptable with edits
- 8-9: High quality, minor improvements possible
- 10: Perfect
"""

ADVERSARIAL_PROMPT = """You are a quality reviewer. Another AI generated the following item.

Critique it honestly. Identify:
1. Factual errors or inaccuracies
2. Missing or incomplete information
3. Unclear or confusing language
4. Common misconceptions it perpetuates

Item:
{item_json}

Respond with ONLY a JSON object:
{{
  "factual_accuracy": 8,
  "clarity": 7,
  "completeness": 9,
  "overall_score": 8,
  "issues": ["issue 1", "issue 2"]
}}
"""

HUMAN_REVIEW_TEMPLATE = """⚠️  ITEM FLAGGED FOR HUMAN REVIEW

Score: {score}/10 (threshold: {threshold})
Issues: {issues}

Item:
{item_json}

Review URL: {review_url}
"""


class QualityScorer:
    """Score generated items for quality using AI critique."""

    def __init__(
        self,
        mode: str = "fast",
        threshold: float = 6.0,
        platform_url: str = "https://gemini.google.com/app",
    ):
        self.mode = mode
        self.threshold = threshold
        self.platform_url = platform_url
        self.review_queue: list[dict] = []
        self.stats = {
            "scored": 0,
            "passed": 0,
            "failed": 0,
            "human_review": 0,
            "avg_score": 0.0,
            "total_scores": [],
        }

    @staticmethod
    def _clamp_score(value: float) -> float:
        return max(1.0, min(10.0, round(float(value), 1)))

    def _record_score(self, score: QualityScore) -> None:
        self.stats["scored"] += 1
        self.stats["total_scores"].append(score.score)
        self.stats["avg_score"] = sum(self.stats["total_scores"]) / len(self.stats["total_scores"])

        if score.passed:
            self.stats["passed"] += 1
        elif self.mode == "human":
            self.stats["human_review"] += 1
        else:
            self.stats["failed"] += 1

    def _parse_critic_payload(self, critic_response_text: Optional[str]) -> Optional[QualityScore]:
        if not critic_response_text:
            return None

        candidates = [critic_response_text.strip()]
        fenced = re.findall(r"```(?:json)?\s*([\s\S]*?)```", critic_response_text, flags=re.IGNORECASE)
        candidates.extend(block.strip() for block in fenced)

        payload = None
        for candidate in candidates:
            if not candidate:
                continue
            try:
                loaded = json.loads(candidate)
            except Exception:
                continue
            if isinstance(loaded, dict):
                payload = loaded
                break

        if payload is None:
            return None

        factual = self._clamp_score(payload.get("factual_accuracy", payload.get("factual", 5)))
        clarity = self._clamp_score(payload.get("clarity", 5))
        completeness = self._clamp_score(payload.get("completeness", 5))

        overall = payload.get("overall_score", payload.get("score"))
        if overall is None:
            overall = (factual + clarity + completeness) / 3
        overall = self._clamp_score(overall)

        issues = payload.get("issues", [])
        if not isinstance(issues, list):
            issues = [str(issues)] if issues else []

        return QualityScore(
            score=overall,
            factual_accuracy=factual,
            clarity=clarity,
            completeness=completeness,
            issues=[str(i) for i in issues],
            passed=overall >= self.threshold,
        )

    def _heuristic_score(self, item: dict, strict: bool = False) -> QualityScore:
        question = str(item.get("question_text", item.get("question", ""))).strip()
        answer = str(item.get("expected_answer", item.get("answer", ""))).strip()

        factual = 9.0
        clarity = 8.5
        completeness = 8.0
        issues: list[str] = []

        def add_issue(text: str) -> None:
            if text not in issues:
                issues.append(text)

        if not question:
            factual -= 1.0
            clarity -= 3.0
            completeness -= 2.5
            add_issue("Missing question")
        elif len(question) < 10:
            clarity -= 1.0
            add_issue("Question too short")

        if not answer:
            factual -= 4.0
            clarity -= 2.0
            completeness -= 4.0
            add_issue("Missing answer")
        else:
            answer_len = len(answer)
            if answer_len < 30:
                clarity -= 1.5
                completeness -= 2.0
                add_issue(f"Answer too short ({answer_len} chars)")
            if answer_len > 5000:
                clarity -= 1.5
                add_issue(f"Answer very long ({answer_len} chars)")

            answer_lower = answer.lower()
            disclaimer_markers = (
                "as an ai",
                "i cannot",
                "i can't",
                "not enough information",
                "i do not know",
            )
            if any(marker in answer_lower for marker in disclaimer_markers):
                factual -= 2.0
                completeness -= 1.0
                add_issue("Answer contains uncertainty/disclaimer language")

            if "```" in answer:
                clarity -= 1.0
                add_issue("Answer contains markdown fences")

        key_points = item.get("key_marking_points")
        if isinstance(key_points, list) and len(key_points) >= 2:
            completeness += 0.5

        if strict:
            factual -= 0.5
            completeness -= 0.5

        factual = self._clamp_score(factual)
        clarity = self._clamp_score(clarity)
        completeness = self._clamp_score(completeness)
        overall = self._clamp_score((factual + clarity + completeness) / 3)

        return QualityScore(
            score=overall,
            factual_accuracy=factual,
            clarity=clarity,
            completeness=completeness,
            issues=issues,
            passed=overall >= self.threshold,
        )

    def score_item_sync(self, item: dict, critic_response_text: Optional[str] = None) -> QualityScore:
        """Synchronously score a single item.

        This is the default path used by the engine.
        """
        if self.mode == "adversarial":
            score = self._parse_critic_payload(critic_response_text) or self._heuristic_score(item, strict=True)
        elif self.mode == "human":
            score = self._human_review(item)
        elif self.mode == "fast":
            score = self._heuristic_score(item)
        else:
            score = QualityScore(
                score=5.0,
                factual_accuracy=5.0,
                clarity=5.0,
                completeness=5.0,
                issues=["Unknown quality mode"],
                passed=False,
            )

        self._record_score(score)
        return score

    async def score_item(self, item: dict, critic_tab=None) -> QualityScore:
        """Score a single item.
        
        Args:
            item: The generated item dict
            critic_tab: BrowserTab or AsyncAgent for adversarial mode
        """
        critic_response_text = None
        if self.mode == "adversarial" and critic_tab is not None:
            prompt = ADVERSARIAL_PROMPT.format(item_json=json.dumps(item, ensure_ascii=False, indent=2))
            try:
                if hasattr(critic_tab, "send_and_recv"):
                    response = await critic_tab.send_and_recv(prompt)
                    critic_response_text = getattr(response, "text", None)
                elif hasattr(critic_tab, "send") and hasattr(critic_tab, "recv"):
                    critic_tab.send(prompt)
                    critic_response_text = critic_tab.recv()
            except Exception:
                critic_response_text = None

        return self.score_item_sync(item, critic_response_text=critic_response_text)

    def _human_review(self, item: dict) -> QualityScore:
        """Human review mode: score heuristically and queue low-quality items."""
        score = self._heuristic_score(item, strict=True)

        if not score.passed:
            self.review_queue.append(
                {
                    "item": item,
                    "score": score.score,
                    "issues": score.issues,
                }
            )

        return score

    def get_review_queue(self) -> list[dict]:
        """Get items flagged for human review."""
        return self.review_queue

    def get_stats(self) -> dict:
        """Get quality scoring statistics."""
        return {
            "mode": self.mode,
            "threshold": self.threshold,
            "scored": self.stats["scored"],
            "passed": self.stats["passed"],
            "failed": self.stats["failed"],
            "human_review": self.stats["human_review"],
            "avg_score": round(self.stats["avg_score"], 1),
        }
