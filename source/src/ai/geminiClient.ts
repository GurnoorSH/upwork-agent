import type { AiFilterSettings, JobRankingInput, JobRankingResult } from "./jobRankingTypes";

const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

const rankingResponseSchema = {
  type: "object",
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          jobId: { type: "string" },
          selected: { type: "boolean" },
          score: { type: "number" },
          title: { type: "string" },
          budget: { type: "string" },
          clientSummary: { type: "string" },
          reasons: {
            type: "array",
            items: { type: "string" },
            maxItems: 3
          },
          rejectionReason: { type: ["string", "null"] }
        },
        required: [
          "jobId",
          "selected",
          "score",
          "title",
          "budget",
          "clientSummary",
          "reasons",
          "rejectionReason"
        ],
        additionalProperties: false
      }
    }
  },
  required: ["results"],
  additionalProperties: false
} as const;

export async function rankJobsWithGemini(
  settings: AiFilterSettings,
  input: JobRankingInput
): Promise<JobRankingResult[]> {
  const response = await fetch(
    `${GEMINI_API_BASE_URL}/models/${encodeURIComponent(settings.model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": settings.apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: buildRankingPrompt(input) }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseJsonSchema: rankingResponseSchema
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini ranking failed: HTTP ${response.status}`);
  }

  const json = (await response.json()) as unknown;
  const text = extractCandidateText(json);
  const parsed = JSON.parse(text) as unknown;
  return parseRankingResults(parsed);
}

function buildRankingPrompt(input: JobRankingInput) {
  return [
    input.rankingPrompt,
    "",
    `Niche/profile priority: ${input.profilePrompt}`,
    "",
    "Return JSON only. Use the exact jobId values provided. Be strict. Hide weak or mixed-signal jobs by setting selected=false.",
    "",
    "Jobs to evaluate:",
    JSON.stringify(
      input.jobs.map((job) => ({
        jobId: job.jobId,
        title: job.title,
        type: job.type,
        budget: job.budget,
        description: job.description,
        proposals: job.proposals,
        connects: job.connects,
        skills: job.skills,
        client: job.client
      })),
      null,
      2
    )
  ].join("\n");
}

function extractCandidateText(value: unknown) {
  const candidates = toArray(toRecord(value).candidates);
  const firstCandidate = toRecord(candidates[0]);
  const parts = toArray(toRecord(firstCandidate.content).parts);
  const text = parts.map((part) => toRecord(part).text).find((partText) => typeof partText === "string");

  if (typeof text !== "string") {
    throw new Error("Gemini ranking response did not include JSON text.");
  }

  return text;
}

function parseRankingResults(value: unknown) {
  const rawResults = toArray(toRecord(value).results);
  return rawResults.map(parseRankingResult);
}

function parseRankingResult(value: unknown): JobRankingResult {
  const record = toRecord(value);
  const jobId = requireString(record.jobId, "jobId");
  const score = clampScore(typeof record.score === "number" ? record.score : Number(record.score));

  return {
    jobId,
    selected: record.selected === true,
    score,
    title: requireString(record.title, "title"),
    budget: typeof record.budget === "string" ? record.budget : "",
    clientSummary: typeof record.clientSummary === "string" ? record.clientSummary : "",
    reasons: toArray(record.reasons).filter((reason): reason is string => typeof reason === "string").slice(0, 3),
    rejectionReason: typeof record.rejectionReason === "string" ? record.rejectionReason : null
  };
}

function requireString(value: unknown, key: string) {
  if (typeof value !== "string") {
    throw new Error(`Gemini ranking result is missing ${key}.`);
  }
  return value;
}

function clampScore(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(1, Math.min(10, value));
}

function toRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}
