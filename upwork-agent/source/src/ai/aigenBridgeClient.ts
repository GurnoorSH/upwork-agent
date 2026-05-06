import { fetchWithRequestLog } from "../logs/fetchWithLog";
import { toArray, toRecord } from "../shared/utils";
import type { AiFilterSettings, JobRankingInput, JobRankingResult } from "./jobRankingTypes";

export class AigenBridgeError extends Error {
  constructor(
    message: string,
    readonly status?: number
  ) {
    super(message);
    this.name = "AigenBridgeError";
  }
}

export async function rankJobsWithAigen(
  settings: AiFilterSettings,
  input: JobRankingInput
): Promise<JobRankingResult[]> {
  const url = buildBridgeUrl(settings.bridgeUrl, "/rank-jobs");
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  if (settings.bridgeToken.trim()) {
    headers["X-Aigen-Bridge-Token"] = settings.bridgeToken.trim();
  }

  let response: Response;
  try {
    response = await fetchWithRequestLog(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...input,
        platform: settings.platform
      })
    });
  } catch {
    throw new AigenBridgeError("Aigen bridge unavailable.");
  }

  const json = (await response.json()) as unknown;

  if (!response.ok) {
    const message = getErrorMessage(json) ?? `Aigen bridge ranking failed: HTTP ${response.status}`;
    throw new AigenBridgeError(message, response.status);
  }

  return parseRankingResults(json);
}

function buildBridgeUrl(baseUrl: string, path: string) {
  const trimmed = baseUrl.trim().replace(/\/+$/, "");
  if (!trimmed) {
    throw new AigenBridgeError("Aigen bridge URL is empty.");
  }
  return `${trimmed}${path}`;
}

function getErrorMessage(value: unknown) {
  const error = toRecord(value).error;
  return typeof error === "string" && error.trim() ? error : null;
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
    throw new Error(`Aigen bridge ranking result is missing ${key}.`);
  }
  return value;
}

function clampScore(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.max(1, Math.min(10, value));
}
