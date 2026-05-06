"""Tests for the Upwork ranking domain adapter."""

import json

from aigen.domains.upwork import (
    UpworkRankingRequest,
    build_upwork_ranking_prompt,
    parse_upwork_ranking_response,
)


def _request() -> UpworkRankingRequest:
    return UpworkRankingRequest(
        profilePrompt="Prefer Chrome extensions and React automation work.",
        rankingPrompt="Select only high-quality Upwork leads.",
        jobs=[
            {
                "jobId": "job-1",
                "title": "Build a Chrome extension",
                "type": "Fixed-price",
                "budget": "$500",
                "description": "Need a Chrome extension with React options UI and background jobs.",
                "proposals": "Less than 5",
                "connects": 8,
                "skills": ["React", "Chrome Extension", ""],
                "client": {
                    "paymentVerified": True,
                    "rating": 4.9,
                    "spend": 12000,
                    "hires": 16,
                    "postedJobs": 20,
                    "country": "United States",
                },
            },
            {
                "jobId": "job-2",
                "title": "Low budget scrape task",
                "type": "Hourly",
                "budget": "$5/hr",
                "description": "Scrape a few pages with unclear scope and very low hourly budget.",
                "proposals": "20 to 50",
                "connects": 2,
                "skills": ["Scraping"],
                "client": {"paymentVerified": False},
            },
        ],
    )


def test_build_upwork_ranking_prompt_contains_contract_and_jobs():
    request = _request()

    prompt = build_upwork_ranking_prompt(request)

    assert "Select only high-quality Upwork leads." in prompt
    assert "Niche/profile priority: Prefer Chrome extensions and React automation work." in prompt
    assert "Return JSON only." in prompt
    assert '"results"' in prompt
    assert '"jobId": "job-1"' in prompt
    assert '"skills": [' in prompt
    assert "exact jobId values" in prompt


def test_parse_upwork_ranking_response_normalizes_results():
    request = _request()
    raw = json.dumps(
        {
            "results": [
                {
                    "jobId": "job-1",
                    "selected": True,
                    "score": 12,
                    "title": "Build a Chrome extension",
                    "budget": "$500",
                    "clientSummary": "Verified client with strong spend.",
                    "reasons": ["Strong fit", "Relevant stack", "Clear scope", "extra reason"],
                    "rejectionReason": None,
                },
                {
                    "jobId": "job-2",
                    "selected": False,
                    "score": "bad score",
                    "title": "Low budget scrape task",
                    "budget": "$5/hr",
                    "clientSummary": "",
                    "reasons": "not an array",
                    "rejectionReason": "Budget is too low.",
                },
            ]
        }
    )

    response = parse_upwork_ranking_response(raw, request)

    assert len(response.results) == 2
    assert response.results[0].score == 10
    assert response.results[0].reasons == ["Strong fit", "Relevant stack", "Clear scope"]
    assert response.results[1].score == 0
    assert response.results[1].reasons == []
    assert response.results[1].rejectionReason == "Budget is too low."
    assert response.meta.rawResultCount == 2


def test_parse_upwork_ranking_response_handles_noisy_wrapped_json():
    request = _request()
    raw = """Here is the strict JSON:

{"results":[{"jobId":"job-1","selected":true,"score":9,"title":"Build a Chrome extension","budget":"$500","clientSummary":"Verified","reasons":["Fit"],"rejectionReason":null},{"jobId":"job-2","selected":false,"score":2,"title":"Low budget scrape task","budget":"$5/hr","clientSummary":"","reasons":[],"rejectionReason":"Weak lead"}]}

Done."""

    response = parse_upwork_ranking_response(raw, request)

    assert [result.jobId for result in response.results] == ["job-1", "job-2"]
    assert response.results[0].selected is True
    assert response.results[1].selected is False


def test_parse_upwork_ranking_response_skips_unknown_and_rejects_missing():
    request = _request()
    raw = json.dumps(
        {
            "results": [
                {
                    "jobId": "job-1",
                    "selected": True,
                    "score": 8,
                    "title": "Build a Chrome extension",
                    "budget": "$500",
                    "clientSummary": "Verified",
                    "reasons": ["Fit"],
                    "rejectionReason": None,
                },
                {
                    "jobId": "unknown-job",
                    "selected": True,
                    "score": 10,
                    "title": "Unknown",
                    "budget": "",
                    "clientSummary": "",
                    "reasons": [],
                    "rejectionReason": None,
                },
            ]
        }
    )

    response = parse_upwork_ranking_response(raw, request)

    assert [result.jobId for result in response.results] == ["job-1", "job-2"]
    assert response.results[1].selected is False
    assert response.results[1].rejectionReason == "Model response omitted this job."
    assert response.meta.skippedUnknownJobIds == ["unknown-job"]
    assert response.meta.missingJobIds == ["job-2"]


def test_parse_upwork_ranking_response_rejects_missing_json_object():
    request = _request()

    try:
        parse_upwork_ranking_response("not json", request)
    except ValueError as exc:
        assert "valid JSON object" in str(exc)
    else:
        raise AssertionError("Expected ValueError")


def test_parse_upwork_ranking_response_rejects_missing_results_array():
    request = _request()

    try:
        parse_upwork_ranking_response('{"items": []}', request)
    except ValueError as exc:
        assert "results array" in str(exc)
    else:
        raise AssertionError("Expected ValueError")
