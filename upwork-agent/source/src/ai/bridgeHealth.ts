import type { AiFilterSettings } from "./jobRankingTypes";
import { toRecord } from "../shared/utils";

export type BridgeHealthStatus = {
  online: boolean;
  platform?: string;
  service?: string;
  error?: string;
};

export async function checkBridgeHealth(
  settings: Pick<AiFilterSettings, "bridgeUrl" | "bridgeToken">
): Promise<BridgeHealthStatus> {
  const url = buildHealthUrl(settings.bridgeUrl);

  if (!url) {
    return { online: false, error: "Bridge URL is empty." };
  }

  try {
    const headers: Record<string, string> = {};
    if (settings.bridgeToken.trim()) {
      headers["X-Aigen-Bridge-Token"] = settings.bridgeToken.trim();
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      return { online: false, error: `Bridge returned HTTP ${response.status}.` };
    }

    const json = (await response.json()) as unknown;
    const record = toRecord(json);

    return {
      online: record.status === "ok",
      platform: typeof record.platform === "string" ? record.platform : undefined,
      service: typeof record.service === "string" ? record.service : undefined,
      error: record.status !== "ok" ? "Bridge /health did not return status ok." : undefined
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not connect to bridge.";
    return { online: false, error: message };
  }
}

function buildHealthUrl(baseUrl: string): string | null {
  const trimmed = baseUrl.trim().replace(/\/+$/, "");
  if (!trimmed) return null;
  return `${trimmed}/health`;
}
