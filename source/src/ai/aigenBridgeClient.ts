import { appendRequestLog } from "../logs/logStorage";
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

  const response = await fetchWithRequestLog(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...input,
      platform: settings.platform
    })
  });

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

function toRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

async function fetchWithRequestLog(url: string, init: RequestInit) {
  const startedAt = performance.now();

  try {
    const response = await fetch(url, init);
    await safeAppendRequestLog({
      id: crypto.randomUUID(),
      method: init.method ?? "GET",
      url,
      status: response.status,
      ok: response.ok,
      durationMs: performance.now() - startedAt,
      createdAt: Date.now()
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    await safeAppendRequestLog({
      id: crypto.randomUUID(),
      method: init.method ?? "GET",
      url,
      ok: false,
      durationMs: performance.now() - startedAt,
      createdAt: Date.now(),
      error: message
    });
    throw new AigenBridgeError("Aigen bridge unavailable.");
  }
}

async function safeAppendRequestLog(request: Parameters<typeof appendRequestLog>[0]) {
  try {
    await appendRequestLog(request);
  } catch {
    // Request logging should never break ranking.
  }
}
