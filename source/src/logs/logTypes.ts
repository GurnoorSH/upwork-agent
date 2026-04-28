export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogEntry = {
  id: string;
  level: LogLevel;
  message: string;
  createdAt: number;
  context?: Record<string, unknown>;
};

export type RequestLogEntry = {
  id: string;
  method: string;
  url: string;
  status?: number;
  ok?: boolean;
  durationMs?: number;
  createdAt: number;
  error?: string;
};

export type LogsState = {
  logs: LogEntry[];
  requests: RequestLogEntry[];
};
