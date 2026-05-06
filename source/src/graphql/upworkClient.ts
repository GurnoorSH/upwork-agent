import type { Job } from "../jobs/jobTypes";
import { appendLog, appendRequestLog } from "../logs/logStorage";
import type { FeedType } from "../storage/globalState";
import { USERNAME_QUERY } from "./jobSearchQuery";
import { buildFeedRequest, feedOptions, getFeedResults, normalizeFeedJobs } from "./requestBuilder";

const UPWORK_ORIGIN = "https://www.upwork.com";
const GRAPHQL_ENDPOINT = `${UPWORK_ORIGIN}/api/graphql/v1`;
const JOBS_TOKEN_PATH = "/nx/find-work/";
const PROPOSAL_TOKEN_PATH = "/nx/proposals/";
const USERNAME_TOKEN_PATH = "/freelancers/settings/";
const TOKEN_RETRY_DELAY_MS = 5_000;

const HTML_TRIGGER_HEADERS = {
  "Cache-Control": "no-cache",
  Accept: [
    "text/html",
    "application/xhtml+xml",
    "application/xml;q=0.9",
    "image/avif",
    "image/webp",
    "image/apng",
    "*/*;q=0.8",
    "application/signed-exchange;v=b3;q=0.9"
  ].join(", "),
  "X-Requested-With": "XMLHttpRequest"
} as const;

export { feedOptions };

export class UpworkApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly code?: string
  ) {
    super(message);
    this.name = "UpworkApiError";
  }
}

type TokenCookie = {
  value: string;
  path: string;
  expirationDate?: number;
};

export async function getJobs(feedType: FeedType): Promise<Job[]> {
  await safeAppendLog("debug", "Starting Upwork jobs fetch.", { feedType });
  const token = await getJobsToken();
  if (!token) {
    await safeAppendLog("error", "Could not find usable Upwork jobs token cookie.", { feedType });
    throw new UpworkApiError("UNAUTHENTICATED", 401);
  }

  try {
    const jobs = await fetchFeedJobs(token, feedType);
    await safeAppendLog("info", "Upwork jobs fetch returned normalized jobs.", {
      feedType,
      normalizedCount: jobs.length
    });
    return jobs;
  } catch (error) {
    if (isUnauthenticatedError(error)) {
      await safeAppendLog("warn", "Upwork GraphQL rejected the jobs token; clearing token cookies and retrying.", {
        feedType
      });
      await clearCookies(JOBS_TOKEN_PATH);
      const retryToken = await getJobsToken();
      if (!retryToken) {
        await safeAppendLog("error", "Retry could not find a usable Upwork jobs token cookie.", { feedType });
        throw new UpworkApiError("UNAUTHENTICATED", 401);
      }
      const jobs = await fetchFeedJobs(retryToken, feedType);
      await safeAppendLog("info", "Upwork jobs retry returned normalized jobs.", {
        feedType,
        normalizedCount: jobs.length
      });
      return jobs;
    }

    throw error;
  }
}

export async function getJobDetails(jobId: string): Promise<unknown> {
  await safeAppendLog("debug", "Starting Upwork job details fetch.", { jobId });
  const token = await getProposalToken(jobId);
  if (!token) {
    await safeAppendLog("error", "Could not find usable Upwork proposal token cookie.", { jobId });
    throw new UpworkApiError("UNAUTHENTICATED", 401);
  }

  return requestJson(`${UPWORK_ORIGIN}/ab/proposals/api/v4/check/${jobId}?payload=1`, {
    headers: { Authorization: `bearer ${token.value}` }
  });
}

export async function getJobsToken() {
  return getTokenCookie({
    path: JOBS_TOKEN_PATH,
    triggerCookieToken: () => triggerUpworkPage(`${UPWORK_ORIGIN}/nx/find-work/`)
  });
}

export async function getUsernameToken() {
  return getTokenCookie({
    path: USERNAME_TOKEN_PATH,
    triggerCookieToken: () => triggerUpworkPage(`${UPWORK_ORIGIN}/freelancers/settings/contactInfo`)
  });
}

export async function getUsername(): Promise<string> {
  const token = await getUsernameToken();
  if (!token) {
    throw new UpworkApiError("UNAUTHENTICATED", 401);
  }

  const response = await requestJson(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: getGraphqlHeaders(token),
    body: JSON.stringify({ query: USERNAME_QUERY, variables: { queryParams: {} } })
  });
  const username = getNestedString(response, ["data", "user", "nid"]);

  if (!username) {
    throw new UpworkApiError("Username response did not include user.nid.");
  }

  return username;
}

export function viewUrl(ciphertext: string) {
  return `https://www.upwork.com/jobs/${getUpworkJobToken(ciphertext)}`;
}

export function proposalUrl(ciphertext: string) {
  return `https://www.upwork.com/ab/proposals/job/${getUpworkJobToken(ciphertext)}/apply`;
}

export function isUnauthenticatedError(error: unknown) {
  return hasStatus(error, 401) || (error instanceof Error && error.message === "UNAUTHENTICATED");
}

export function isForbiddenError(error: unknown) {
  return hasStatus(error, 403);
}

export function isRateLimitError(error: unknown) {
  return hasStatus(error, 429);
}

export function isNetworkError(error: unknown) {
  return (
    error instanceof TypeError ||
    (error instanceof UpworkApiError && error.code === "ERR_NETWORK") ||
    (error instanceof Error && error.message.toLowerCase().includes("network"))
  );
}

export function isServerError(error: unknown) {
  const status = getStatus(error);
  return typeof status === "number" && status >= 500;
}

export function shouldIgnoreError(error: unknown) {
  const status = getStatus(error);
  return status === 400 || status === 409 || status === 499;
}

async function fetchFeedJobs(token: TokenCookie, feedType: FeedType) {
  const response = await requestJson(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: getGraphqlHeaders(token, feedType === "Most Recent"),
    body: JSON.stringify(buildFeedRequest(feedType))
  });
  const rawJobs = getFeedResults(response, feedType);
  const jobs = normalizeFeedJobs(rawJobs, feedType);
  const data = getRecord(getRecord(response).data);
  await safeAppendLog("debug", "Parsed Upwork GraphQL response.", {
    feedType,
    dataKeys: Object.keys(data),
    nestedDataKeys: Object.keys(getRecord(data.data)),
    rawCount: rawJobs.length,
    normalizedCount: jobs.length
  });
  return jobs;
}

async function getProposalToken(jobId: string) {
  return getTokenCookie({
    path: PROPOSAL_TOKEN_PATH,
    triggerCookieToken: () => triggerUpworkPage(`${UPWORK_ORIGIN}/nx/proposals/job/${jobId}/apply`)
  });
}

async function getTokenCookie({
  path,
  shouldTryAgain = true,
  triggerCookieToken
}: {
  path: string;
  shouldTryAgain?: boolean;
  triggerCookieToken: () => Promise<TriggerResponse>;
}): Promise<TokenCookie | null> {
  await safeAppendLog("debug", "Looking for Upwork token cookie.", { path, shouldTryAgain });
  const cookie = await getLatestCookie(path);

  if (cookie && isCookieUsable(cookie)) {
    await safeAppendLog("debug", "Found usable Upwork token cookie.", {
      path,
      expiresAt: cookie.expirationDate ? Math.round(cookie.expirationDate * 1000) : null
    });
    return cookie;
  }

  if (!shouldTryAgain) {
    await safeAppendLog("warn", "No usable Upwork token cookie after trigger attempt.", { path });
    return null;
  }

  await clearCookies(path);
  await safeAppendLog("debug", "Triggering Upwork page to refresh token cookie.", { path });
  await triggerCookieToken();
  await wait(TOKEN_RETRY_DELAY_MS);
  const triggerResponse = await triggerCookieToken();

  if (isLoginRedirect(triggerResponse)) {
    await safeAppendLog("error", "Upwork token trigger redirected to login.", {
      path,
      responseUrl: triggerResponse.url
    });
    return null;
  }

  return getTokenCookie({ path, shouldTryAgain: false, triggerCookieToken });
}

async function getLatestCookie(path: string): Promise<TokenCookie | null> {
  const cookies = await getUpworkCookies();
  const candidates = cookies.filter((cookie) => cookie.path === path && cookie.value.length > 0);
  await safeAppendLog("debug", "Scanned Upwork cookies for token path.", {
    path,
    totalUpworkCookies: cookies.length,
    candidateCount: candidates.length
  });

  if (candidates.length === 0) {
    return null;
  }

  const latest = candidates.reduce((current, next) =>
    (next.expirationDate ?? Number.POSITIVE_INFINITY) >
    (current.expirationDate ?? Number.POSITIVE_INFINITY)
      ? next
      : current
  );

  return {
    value: latest.value,
    path: latest.path,
    expirationDate: latest.expirationDate
  };
}

async function clearCookies(path: string) {
  const cookies = (await getUpworkCookies()).filter((cookie) => cookie.path === path);
  await safeAppendLog("debug", "Clearing Upwork token cookies for path.", { path, count: cookies.length });
  await Promise.all(
    cookies.map((cookie) =>
      browser.cookies.remove({
        name: cookie.name,
        url: getCookieUrl(cookie)
      })
    )
  );
}

async function getUpworkCookies() {
  const [wwwCookies, rootCookies] = await Promise.all([
    browser.cookies.getAll({ domain: "www.upwork.com" }),
    browser.cookies.getAll({ domain: ".upwork.com" })
  ]);
  const byKey = new Map<string, (typeof wwwCookies)[number]>();

  for (const cookie of [...wwwCookies, ...rootCookies]) {
    byKey.set(`${cookie.domain}:${cookie.path}:${cookie.name}`, cookie);
  }

  return [...byKey.values()];
}

function getCookieUrl(cookie: { domain: string; path: string; secure: boolean }) {
  const protocol = cookie.secure ? "https" : "http";
  const host = cookie.domain.replace(/^\./, "");
  return `${protocol}://${host}${cookie.path}`;
}

function isCookieUsable(cookie: TokenCookie) {
  return !cookie.expirationDate || cookie.expirationDate * 1000 > Date.now();
}

type TriggerResponse = {
  action?: unknown;
  url: string;
};

async function triggerUpworkPage(url: string): Promise<TriggerResponse> {
  const response = await fetchWithRequestLog(url, {
    credentials: "include",
    headers: HTML_TRIGGER_HEADERS
  });
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const json = (await response.json()) as unknown;
    return {
      action: getRecord(json).action,
      url: response.url
    };
  }

  return { url: response.url };
}

async function requestJson(url: string, init: RequestInit = {}) {
  const response = await fetchWithRequestLog(url, {
    ...init,
    credentials: "include",
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers
    }
  });

  if (!response.ok) {
    throw new UpworkApiError(response.statusText || `HTTP ${response.status}`, response.status);
  }

  return response.json() as Promise<unknown>;
}

function getGraphqlHeaders(token: TokenCookie, requestedWith = false): HeadersInit {
  return {
    Authorization: `bearer ${token.value}`,
    ...(requestedWith ? { "X-Requested-With": "XMLHttpRequest" } : {})
  };
}

function isLoginRedirect(response: TriggerResponse) {
  return (
    response.url.startsWith(`${UPWORK_ORIGIN}/ab/account-security/login`) ||
    (typeof response.action === "string" &&
      response.action.startsWith(`${UPWORK_ORIGIN}/ab/account-security/login`))
  );
}

function hasStatus(error: unknown, status: number) {
  return getStatus(error) === status;
}

function getStatus(error: unknown) {
  return error instanceof UpworkApiError ? error.status : undefined;
}

function getNestedString(value: unknown, path: string[]) {
  let current = value;

  for (const key of path) {
    current = getRecord(current)[key];
  }

  return typeof current === "string" ? current : null;
}

function getRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getUpworkJobToken(ciphertext: string) {
  return `~${ciphertext.replace(/^~+/, "")}`;
}

async function fetchWithRequestLog(url: string, init: RequestInit = {}) {
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
    throw new UpworkApiError(message, undefined, "ERR_NETWORK");
  }
}

async function safeAppendLog(level: "debug" | "info" | "warn" | "error", message: string, context?: Record<string, unknown>) {
  try {
    await appendLog({
      id: crypto.randomUUID(),
      level,
      message,
      createdAt: Date.now(),
      context
    });
  } catch {
    // Logging should never break the fetch path.
  }
}

async function safeAppendRequestLog(request: Parameters<typeof appendRequestLog>[0]) {
  try {
    await appendRequestLog(request);
  } catch {
    // Request logging should never break the fetch path.
  }
}
