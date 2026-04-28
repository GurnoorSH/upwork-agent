import type { GlobalState } from "../storage/globalState";

export type CycleError = NonNullable<GlobalState["lastCycleError"]>;

type ErrorLike = {
  code?: unknown;
  message?: unknown;
  response?: {
    status?: unknown;
  };
  status?: unknown;
};

export function classifyCycleError(error: unknown): CycleError {
  const errorLike = toErrorLike(error);
  const status = getStatus(errorLike);
  const code = typeof errorLike.code === "string" ? errorLike.code : "";
  const message = typeof errorLike.message === "string" ? errorLike.message : "";

  if (status === 401 || message.includes("UNAUTHENTICATED")) {
    return "UNAUTHENTICATED";
  }

  if (status === 403 || status === 429) {
    return "FORBIDDEN";
  }

  if (code === "ERR_NETWORK" || message.toLowerCase().includes("network")) {
    return "NETWORK_ERROR";
  }

  if (typeof status === "number" && status >= 500) {
    return "SERVER_ERROR";
  }

  return "OTHER";
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function toErrorLike(error: unknown): ErrorLike {
  return typeof error === "object" && error !== null ? (error as ErrorLike) : {};
}

function getStatus(error: ErrorLike) {
  if (typeof error.status === "number") return error.status;
  if (typeof error.response?.status === "number") return error.response.status;
  return null;
}
