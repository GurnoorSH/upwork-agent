/**
 * Instrumented fetch wrapper that logs requests without breaking the caller.
 * Shared between upworkClient.ts and aigenBridgeClient.ts.
 */

import { safeAppendRequestLog } from "./safeLogger";

export async function fetchWithRequestLog(url: string, init: RequestInit = {}) {
  const startedAt = performance.now();
  const method = init.method ?? "GET";

  try {
    const response = await fetch(url, init);
    await safeAppendRequestLog({
      id: crypto.randomUUID(),
      method,
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
      method,
      url,
      ok: false,
      durationMs: performance.now() - startedAt,
      createdAt: Date.now(),
      error: message
    });
    throw error;
  }
}
