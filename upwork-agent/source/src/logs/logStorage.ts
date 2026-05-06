import { storage } from "@wxt-dev/storage";
import { storageKeys } from "../storage/keys";
import { MAX_EVENT_LOGS, MAX_REQUEST_LOGS, migrateLogs } from "../storage/migrations";
import type { LogEntry, LogsState, RequestLogEntry } from "./logTypes";

export const logsStorage = storage.defineItem<LogsState>(storageKeys.LOGS, {
  version: 1,
  fallback: { logs: [], requests: [] },
  migrations: {
    1: migrateLogs
  }
});

export async function getLogs() {
  const rawLogs = await logsStorage.getValue();
  const logs = migrateLogs(rawLogs);

  if (shouldPersistTrimmedLogs(rawLogs, logs)) {
    await logsStorage.setValue(logs);
  }

  return logs;
}

export async function setLogs(logs: LogsState) {
  await logsStorage.setValue(migrateLogs(logs));
}

export async function appendLog(log: LogEntry) {
  const current = await getLogs();
  await setLogs({ ...current, logs: [log, ...current.logs].slice(0, MAX_EVENT_LOGS) });
}

export async function appendRequestLog(request: RequestLogEntry) {
  const current = await getLogs();
  await setLogs({ ...current, requests: [request, ...current.requests].slice(0, MAX_REQUEST_LOGS) });
}

function shouldPersistTrimmedLogs(rawLogs: LogsState, logs: LogsState) {
  return rawLogs.logs.length !== logs.logs.length || rawLogs.requests.length !== logs.requests.length;
}
