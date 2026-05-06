/**
 * Safe logging wrappers that never throw.
 * Shared across background modules to prevent logging failures
 * from breaking critical flows like job ranking and fetching.
 */

import { appendLog, appendRequestLog } from "./logStorage";

export async function safeAppendLog(
  level: "debug" | "info" | "warn" | "error",
  message: string,
  context?: Record<string, unknown>
) {
  try {
    await appendLog({
      id: crypto.randomUUID(),
      level,
      message,
      createdAt: Date.now(),
      context
    });
  } catch {
    // Logging should never break the caller.
  }
}

export async function safeAppendRequestLog(
  request: Parameters<typeof appendRequestLog>[0]
) {
  try {
    await appendRequestLog(request);
  } catch {
    // Request logging should never break the caller.
  }
}

export function createLogEntry(
  level: "debug" | "info" | "warn" | "error",
  message: string,
  context?: Record<string, unknown>
) {
  return {
    id: crypto.randomUUID(),
    level,
    message,
    createdAt: Date.now(),
    context
  };
}
