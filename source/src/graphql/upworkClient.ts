import type { Job } from "../jobs/jobTypes";
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
  const token = await getJobsToken();
  if (!token) {
    throw new UpworkApiError("UNAUTHENTICATED", 401);
  }

  try {
    return await fetchFeedJobs(token, feedType);
  } catch (error) {
    if (isUnauthenticatedError(error)) {
      await clearCookies(JOBS_TOKEN_PATH);
      const retryToken = await getJobsToken();
      if (!retryToken) {
        throw new UpworkApiError("UNAUTHENTICATED", 401);
      }
      return fetchFeedJobs(retryToken, feedType);
    }

    throw error;
  }
}

export async function getJobDetails(jobId: string): Promise<unknown> {
  const token = await getProposalToken(jobId);
  if (!token) {
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
  return `https://upwork.com/jobs/${ciphertext}`;
}

export function proposalUrl(ciphertext: string) {
  return `https://upwork.com/ab/proposals/job/${ciphertext}/apply`;
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
  return normalizeFeedJobs(rawJobs, feedType);
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
  const cookie = await getLatestCookie(path);

  if (cookie && isCookieUsable(cookie)) {
    return cookie;
  }

  if (!shouldTryAgain) {
    return null;
  }

  await clearCookies(path);
  await triggerCookieToken();
  await wait(TOKEN_RETRY_DELAY_MS);
  const triggerResponse = await triggerCookieToken();

  if (isLoginRedirect(triggerResponse)) {
    return null;
  }

  return getTokenCookie({ path, shouldTryAgain: false, triggerCookieToken });
}

async function getLatestCookie(path: string): Promise<TokenCookie | null> {
  const cookies = await browser.cookies.getAll({ url: UPWORK_ORIGIN, path });
  const candidates = cookies.filter((cookie) => cookie.value.length > 0);

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
  const cookies = await browser.cookies.getAll({ url: UPWORK_ORIGIN, path });
  await Promise.all(
    cookies.map((cookie) =>
      browser.cookies.remove({
        name: cookie.name,
        url: `${UPWORK_ORIGIN}${cookie.path}`
      })
    )
  );
}

function isCookieUsable(cookie: TokenCookie) {
  return !cookie.expirationDate || cookie.expirationDate * 1000 > Date.now();
}

type TriggerResponse = {
  action?: unknown;
  url: string;
};

async function triggerUpworkPage(url: string): Promise<TriggerResponse> {
  const response = await fetch(url, {
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
  let response: Response;

  try {
    response = await fetch(url, {
      ...init,
      credentials: "include",
      headers: {
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...init.headers
      }
    });
  } catch (error) {
    throw new UpworkApiError(error instanceof Error ? error.message : "Network error", undefined, "ERR_NETWORK");
  }

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
