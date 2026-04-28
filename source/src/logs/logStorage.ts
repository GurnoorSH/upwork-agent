import { storage } from "@wxt-dev/storage";
import { storageKeys } from "../storage/keys";
import { migrateLogs } from "../storage/migrations";
import type { LogEntry, LogsState, RequestLogEntry } from "./logTypes";

export const logsStorage = storage.defineItem<LogsState>(storageKeys.LOGS, {
  version: 1,
  fallback: { logs: [], requests: [] },
  migrations: {
    1: migrateLogs
  }
});

export async function getLogs() {
  return migrateLogs(await logsStorage.getValue());
}

export async function setLogs(logs: LogsState) {
  await logsStorage.setValue(migrateLogs(logs));
}

export async function appendLog(log: LogEntry) {
  const current = await getLogs();
  await setLogs({ ...current, logs: [log, ...current.logs].slice(0, 250) });
}

export async function appendRequestLog(request: RequestLogEntry) {
  const current = await getLogs();
  await setLogs({ ...current, requests: [request, ...current.requests].slice(0, 250) });
}
