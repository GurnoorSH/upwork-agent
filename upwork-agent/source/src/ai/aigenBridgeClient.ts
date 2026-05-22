import { fetchWithRequestLog } from "../logs/fetchWithLog";
import { toRecord } from "../shared/utils";
import type { AiFilterSettings, JobRankingInput, JobRankingResult } from "./jobRankingTypes";
import { parseRankingResults } from "./rankingResultParser";

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

  const json = await readJsonResponse(response);

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

async function readJsonResponse(response: Response) {
  try {
    return (await response.json()) as unknown;
  } catch {
    if (!response.ok) {
      return {};
    }

    throw new AigenBridgeError("Aigen bridge ranking response was not valid JSON.", response.status);
  }
}
