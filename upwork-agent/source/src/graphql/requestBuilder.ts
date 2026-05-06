import type { Job } from "../jobs/jobTypes";
import { FEED_TYPES } from "../shared/constants";
import type { FeedType } from "../storage/globalState";
import { BEST_MATCHES_QUERY, MOST_RECENT_QUERY, MY_FEED_QUERY } from "./jobSearchQuery";

export type GraphqlRequest = {
  query: string;
  variables: Record<string, unknown>;
};

export type FeedOption = {
  pageUrl: string;
  description: string;
};

export const feedOptions: Record<FeedType, FeedOption> = {
  [FEED_TYPES.MY_FEED]: {
    pageUrl: "https://www.upwork.com/nx/find-work",
    description:
      "Jobs that match your personal preferences/filters <strong>(configurable)</strong>."
  },
  [FEED_TYPES.BEST_MATCHES]: {
    pageUrl: "https://www.upwork.com/nx/find-work/best-matches",
    description:
      "Jobs that match your experience to a client's hiring preferences <strong>(not configurable)</strong>. Ordered by most relevant."
  },
  [FEED_TYPES.MOST_RECENT]: {
    pageUrl: "https://www.upwork.com/nx/find-work/most-recent",
    description:
      "The most recent jobs that match your skills and profile description to the skills clients are looking for <strong>(not configurable)</strong>."
  }
};

export function buildFeedRequest(feedType: FeedType): GraphqlRequest {
  switch (feedType) {
    case FEED_TYPES.MY_FEED:
      return {
        query: MY_FEED_QUERY,
        variables: { queryParams: {} }
      };
    case FEED_TYPES.BEST_MATCHES:
      return {
        query: BEST_MATCHES_QUERY,
        variables: { fromTime: 0, toTime: 30 }
      };
    case FEED_TYPES.MOST_RECENT:
      return {
        query: MOST_RECENT_QUERY,
        variables: { limit: 10 }
      };
  }
}

export function getFeedResults(response: unknown, feedType: FeedType): unknown[] {
  const data = toRecord(toRecord(response).data);
  const graphData = Object.keys(toRecord(data.data)).length > 0 ? toRecord(data.data) : data;

  switch (feedType) {
    case FEED_TYPES.MY_FEED:
      return toArray(toRecord(graphData.userSavedSearches).results);
    case FEED_TYPES.BEST_MATCHES:
      return toArray(toRecord(graphData.bestMatchJobsFeed).results);
    case FEED_TYPES.MOST_RECENT:
      return toArray(toRecord(graphData.mostRecentJobsFeed).results);
  }
}

export function normalizeFeedJobs(rawJobs: unknown[], feedType: FeedType): Job[] {
  return rawJobs.map((rawJob) => normalizeJob(rawJob, feedType)).filter((job): job is Job => job !== null);
}

function normalizeJob(rawJob: unknown, feedType: FeedType): Job | null {
  const job = toRecord(rawJob);
  const title = toString(job.title);
  const ciphertext = toString(job.ciphertext);
  const description = toString(job.description);

  if (!title || !ciphertext || !description) {
    return null;
  }

  const amount = normalizeAmount(job.amount);
  const normalized: Job = {
    ...(job as Partial<Job>),
    title,
    ciphertext,
    description,
    __isSeen: false,
    type: normalizeType(job.type, feedType),
    amount
  };

  if (feedType === FEED_TYPES.MY_FEED) {
    return {
      ...normalized,
      tierText: toString(job.contractorTier) || normalized.tierText,
      client: {
        ...toRecord(job.client),
        totalSpent: parseClientSpend(toRecord(job.client).totalSpent)
      }
    };
  }

  if (feedType === FEED_TYPES.MOST_RECENT) {
    return {
      ...normalized,
      durationLabel: toString(job.duration) || normalized.durationLabel,
      clientRelation: null,
      renewedOn: toString(job.publishedOn) || normalized.renewedOn
    };
  }

  return normalized;
}

function normalizeType(value: unknown, feedType: FeedType): Job["type"] {
  if (feedType === FEED_TYPES.MY_FEED) {
    return value === "FIXED" || value === "Fixed-price" ? "Fixed-price" : "Hourly";
  }

  return value === 1 || value === "Fixed-price" ? "Fixed-price" : "Hourly";
}

function normalizeAmount(value: unknown): Job["amount"] {
  const amount = toRecord(value);
  if (Object.keys(amount).length === 0) {
    return undefined;
  }

  const rawAmount = amount.amount;
  return {
    ...(amount as Job["amount"]),
    amount:
      typeof rawAmount === "number"
        ? String(rawAmount)
        : typeof rawAmount === "string"
          ? rawAmount
          : ""
  };
}

function parseClientSpend(value: unknown) {
  if (typeof value === "number") {
    return value;
  }

  const spend = toRecord(value);
  if (typeof spend.rawValue === "number") {
    return spend.rawValue;
  }

  if (typeof spend.displayValue === "string") {
    const parsed = Number.parseFloat(spend.displayValue.replace(/[^0-9.]/g, ""));
    return Number.isNaN(parsed) ? undefined : parsed;
  }

  return undefined;
}

function toRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function toString(value: unknown) {
  return typeof value === "string" ? value : "";
}
