"""Upwork job-ranking domain adapter."""

from __future__ import annotations

import json
from typing import Any, Literal, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator

from aigen.parsers.json_extract import extract_json_object


UpworkJobType = Literal["Hourly", "Fixed-price"]
UpworkPlatform = Literal["gemini", "chatgpt", "claude", "perplexity"]


class UpworkClientInfo(BaseModel):
    """Client fields used by the ranking prompt."""

    model_config = ConfigDict(extra="ignore")

    paymentVerified: bool = False
    rating: Optional[float] = None
    spend: Optional[float] = None
    hires: Optional[int] = None
    postedJobs: Optional[int] = None
    country: Optional[str] = None


class UpworkRankingJob(BaseModel):
    """One Upwork job candidate to rank."""

    model_config = ConfigDict(extra="ignore")

    jobId: str
    title: str
    type: UpworkJobType
    budget: str = ""
    description: str
    proposals: Optional[str] = None
    connects: Optional[int] = None
    skills: list[str] = Field(default_factory=list)
    client: UpworkClientInfo = Field(default_factory=UpworkClientInfo)

    @field_validator("jobId", "title", "description")
    @classmethod
    def _required_string(cls, value: str) -> str:
        value = str(value).strip()
        if not value:
            raise ValueError("field must be a non-empty string")
        return value

    @field_validator("skills", mode="before")
    @classmethod
    def _normalize_skills(cls, value: Any) -> list[str]:
        if not isinstance(value, list):
            return []
        return [str(skill).strip() for skill in value if str(skill).strip()]


class UpworkRankingRequest(BaseModel):
    """Request body for ranking Upwork jobs via a browser AI platform."""

    model_config = ConfigDict(extra="ignore")

    jobs: list[UpworkRankingJob]
    profilePrompt: str
    rankingPrompt: str
    platform: UpworkPlatform = "gemini"
    debugPort: int = 9222
    timeoutMs: int = 180000

    @field_validator("jobs")
    @classmethod
    def _require_jobs(cls, value: list[UpworkRankingJob]) -> list[UpworkRankingJob]:
        if not value:
            raise ValueError("at least one job is required")
        return value


class UpworkRankingResult(BaseModel):
    """Normalized ranking result returned to the Upwork extension."""

    model_config = ConfigDict(extra="ignore")

    jobId: str
    selected: bool
    score: float = 0
    title: str
    budget: str = ""
    clientSummary: str = ""
    reasons: list[str] = Field(default_factory=list)
    rejectionReason: Optional[str] = None

    @field_validator("jobId", "title")
    @classmethod
    def _require_string(cls, value: str) -> str:
        value = str(value).strip()
        if not value:
            raise ValueError("field must be a non-empty string")
        return value

    @field_validator("score", mode="before")
    @classmethod
    def _clamp_score(cls, value: Any) -> float:
        try:
            score = float(value)
        except (TypeError, ValueError):
            return 0
        return max(1, min(10, score))

    @field_validator("reasons", mode="before")
    @classmethod
    def _normalize_reasons(cls, value: Any) -> list[str]:
        if not isinstance(value, list):
            return []
        return [str(reason).strip() for reason in value if str(reason).strip()][:3]

    @field_validator("budget", "clientSummary", mode="before")
    @classmethod
    def _default_string(cls, value: Any) -> str:
        return value if isinstance(value, str) else ""

    @field_validator("rejectionReason", mode="before")
    @classmethod
    def _normalize_rejection_reason(cls, value: Any) -> Optional[str]:
        return value if isinstance(value, str) else None


class UpworkRankingMeta(BaseModel):
    """Metadata about a ranking response."""

    model_config = ConfigDict(extra="ignore")

    platform: UpworkPlatform = "gemini"
    rawResultCount: int = 0
    skippedUnknownJobIds: list[str] = Field(default_factory=list)
    missingJobIds: list[str] = Field(default_factory=list)


class UpworkRankingResponse(BaseModel):
    """Normalized ranking response for bridge clients."""

    model_config = ConfigDict(extra="ignore")

    results: list[UpworkRankingResult]
    meta: UpworkRankingMeta = Field(default_factory=UpworkRankingMeta)


def build_upwork_ranking_prompt(request: UpworkRankingRequest) -> str:
    """Build the strict JSON ranking prompt for browser AI platforms."""

    jobs_payload = [
        {
            "jobId": job.jobId,
            "title": job.title,
            "type": job.type,
            "budget": job.budget,
            "description": job.description,
            "proposals": job.proposals,
            "connects": job.connects,
            "skills": job.skills,
            "client": job.client.model_dump(),
        }
        for job in request.jobs
    ]

    response_contract = {
        "results": [
            {
                "jobId": "exact input jobId",
                "selected": True,
                "score": 8,
                "title": "job title",
                "budget": "budget summary",
                "clientSummary": "brief client summary",
                "reasons": ["reason 1", "reason 2"],
                "rejectionReason": None,
            }
        ]
    }

    return "\n".join(
        [
            request.rankingPrompt,
            "",
            f"Niche/profile priority: {request.profilePrompt}",
            "",
            "Return JSON only. Do not use markdown, code fences, comments, or extra prose.",
            "Use the exact jobId values provided. Be strict. Hide weak or mixed-signal jobs by setting selected=false.",
            "Return one result for every input job.",
            "The response must be a single JSON object with this shape:",
            json.dumps(response_contract, indent=2),
            "",
            "Jobs to evaluate:",
            json.dumps(jobs_payload, indent=2, ensure_ascii=False),
        ]
    )


def parse_upwork_ranking_response(
    raw_text: str,
    request: UpworkRankingRequest,
    include_missing_rejections: bool = True,
) -> UpworkRankingResponse:
    """Parse and normalize a browser AI response for Upwork ranking."""

    payload = extract_json_object(raw_text)
    if not payload:
        raise ValueError("Ranking response did not include a valid JSON object.")

    raw_results = payload.get("results")
    if not isinstance(raw_results, list):
        raise ValueError("Ranking response is missing a results array.")

    jobs_by_id = {job.jobId: job for job in request.jobs}
    seen_ids: set[str] = set()
    skipped_unknown: list[str] = []
    results: list[UpworkRankingResult] = []

    for raw_result in raw_results:
        if not isinstance(raw_result, dict):
            continue

        job_id = raw_result.get("jobId")
        if not isinstance(job_id, str) or job_id not in jobs_by_id:
            if isinstance(job_id, str) and job_id.strip():
                skipped_unknown.append(job_id)
            continue

        job = jobs_by_id[job_id]
        normalized_payload = {
            "jobId": job_id,
            "selected": raw_result.get("selected") is True,
            "score": raw_result.get("score", 0),
            "title": raw_result.get("title", job.title),
            "budget": raw_result.get("budget", job.budget),
            "clientSummary": raw_result.get("clientSummary", ""),
            "reasons": raw_result.get("reasons", []),
            "rejectionReason": raw_result.get("rejectionReason"),
        }

        result = UpworkRankingResult.model_validate(normalized_payload)
        results.append(result)
        seen_ids.add(job_id)

    missing_ids = [job.jobId for job in request.jobs if job.jobId not in seen_ids]
    if include_missing_rejections:
        for missing_id in missing_ids:
            job = jobs_by_id[missing_id]
            results.append(_missing_job_rejection(job))

    return UpworkRankingResponse(
        results=results,
        meta=UpworkRankingMeta(
            platform=request.platform,
            rawResultCount=len(raw_results),
            skippedUnknownJobIds=skipped_unknown,
            missingJobIds=missing_ids,
        ),
    )


def _missing_job_rejection(job: UpworkRankingJob) -> UpworkRankingResult:
    return UpworkRankingResult(
        jobId=job.jobId,
        selected=False,
        score=0,
        title=job.title,
        budget=job.budget,
        clientSummary="",
        reasons=[],
        rejectionReason="Model response omitted this job.",
    )
