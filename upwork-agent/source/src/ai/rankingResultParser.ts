import { toArray, toRecord } from "../shared/utils";
import type { JobRankingResult } from "./jobRankingTypes";

export function parseRankingResults(value: unknown): JobRankingResult[] {
  const rawResults = toArray(toRecord(value).results);
  return rawResults.map(parseRankingResult);
}

export function parseRankingJsonObject(text: string): unknown {
  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("AI ranking response did not include a JSON object.");
    }

    return JSON.parse(trimmed.slice(start, end + 1));
  }
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
    throw new Error(`AI ranking result is missing ${key}.`);
  }
  return value;
}

function clampScore(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(1, Math.min(10, value));
}
