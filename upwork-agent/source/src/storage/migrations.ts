import { FEED_TYPES } from "../shared/constants";
import {
  DEFAULT_AI_FILTER_PROFILE,
  DEFAULT_AI_MODEL,
  DEFAULT_JOB_RANKING_PROMPT
} from "../ai/jobRankingPrompt";
import type { AiFilterSettings } from "../ai/jobRankingTypes";
import type { CoverLetterPrompt, CoverLetterText } from "../coverLetter/coverLetterTypes";
import type { Job } from "../jobs/jobTypes";
import type { LogsState } from "../logs/logTypes";
import type { FeedType, GlobalState } from "./globalState";

const FEED_TYPE_VALUES = Object.values(FEED_TYPES) as FeedType[];
const PLATFORM_VALUES: AiFilterSettings["platform"][] = ["gemini", "chatgpt", "claude", "perplexity"];
const DEFAULT_AIGEN_BRIDGE_URL = "http://127.0.0.1:8787";
export const MAX_EVENT_LOGS = 50;
export const MAX_REQUEST_LOGS = 25;

export const DEFAULT_COVER_LETTER_PROMPT =
  "Create a cover letter for this job which has title:\n#{title}\n\nand job description:\n#{job_description}\n\nMention my experience with relevant technologies.\nUse less than 300 words.";

export function migrateGlobalState(value: unknown): GlobalState {
  const defaults = createMigrationDefaultGlobalState();

  if (!isRecord(value)) {
    return defaults;
  }

  const feedType = FEED_TYPE_VALUES.includes(value.feedType as FeedType)
    ? (value.feedType as FeedType)
    : defaults.feedType;

  const darkMode =
    value.darkMode === "true" || value.darkMode === "false" || value.darkMode === "system"
      ? value.darkMode
      : defaults.darkMode;

  const soundSettings = isRecord(value.soundSettings)
    ? {
        enabled:
          typeof value.soundSettings.enabled === "boolean"
            ? value.soundSettings.enabled
            : defaults.soundSettings.enabled,
        volume:
          typeof value.soundSettings.volume === "number"
            ? clamp(value.soundSettings.volume, 0, 100)
            : defaults.soundSettings.volume
      }
    : defaults.soundSettings;

  return {
    ...defaults,
    ...value,
    instanceId: typeof value.instanceId === "string" ? value.instanceId : defaults.instanceId,
    enabled: typeof value.enabled === "boolean" ? value.enabled : defaults.enabled,
    darkMode,
    compactList: typeof value.compactList === "boolean" ? value.compactList : defaults.compactList,
    readAlerts: Array.isArray(value.readAlerts) ? value.readAlerts : defaults.readAlerts,
    readAlertIds: Array.isArray(value.readAlertIds) ? value.readAlertIds.filter(isString) : [],
    openProposalPage:
      typeof value.openProposalPage === "boolean"
        ? value.openProposalPage
        : defaults.openProposalPage,
    lastLoginAttemptAt:
      typeof value.lastLoginAttemptAt === "number" ? value.lastLoginAttemptAt : null,
    lastCaptchaAttemptAt:
      typeof value.lastCaptchaAttemptAt === "number" ? value.lastCaptchaAttemptAt : null,
    feedType,
    lastCycleError: isCycleError(value.lastCycleError) ? value.lastCycleError : null,
    lastCycleStartedAt:
      typeof value.lastCycleStartedAt === "number" ? value.lastCycleStartedAt : 0,
    soundSettings,
    schedulingEnabled:
      typeof value.schedulingEnabled === "boolean"
        ? value.schedulingEnabled
        : defaults.schedulingEnabled,
    schedules: Array.isArray(value.schedules) ? value.schedules : defaults.schedules,
    usTimeFormat: typeof value.usTimeFormat === "boolean" ? value.usTimeFormat : defaults.usTimeFormat,
    usernameHash: typeof value.usernameHash === "string" ? value.usernameHash : null
  };
}

export function migrateJobs(value: unknown): Job[] {
  return Array.isArray(value) ? value.filter(isMigratableJob) : [];
}

export function migrateLogs(value: unknown): LogsState {
  if (!isRecord(value)) {
    return { logs: [], requests: [] };
  }

  return {
    logs: Array.isArray(value.logs) ? value.logs.slice(0, MAX_EVENT_LOGS) : [],
    requests: Array.isArray(value.requests) ? value.requests.slice(0, MAX_REQUEST_LOGS) : []
  };
}

export function migrateCoverLetterPrompt(value: unknown): CoverLetterPrompt {
  return typeof value === "string" && value.length > 0 ? value : DEFAULT_COVER_LETTER_PROMPT;
}

export function migrateCoverLetter(value: unknown): CoverLetterText {
  return typeof value === "string" ? value : "";
}

export function migrateAiFilterSettings(value: unknown): AiFilterSettings {
  const defaults = createMigrationDefaultAiFilterSettings();

  if (!isRecord(value)) {
    return defaults;
  }

  return {
    enabled: typeof value.enabled === "boolean" ? value.enabled : defaults.enabled,
    provider: "aigen-local",
    bridgeUrl:
      typeof value.bridgeUrl === "string" && value.bridgeUrl.trim().length > 0
        ? value.bridgeUrl.trim()
        : defaults.bridgeUrl,
    bridgeToken: typeof value.bridgeToken === "string" ? value.bridgeToken : defaults.bridgeToken,
    platform: PLATFORM_VALUES.includes(value.platform as AiFilterSettings["platform"])
      ? (value.platform as AiFilterSettings["platform"])
      : defaults.platform,
    model: typeof value.model === "string" && value.model.length > 0 ? value.model : defaults.model,
    profilePrompt:
      typeof value.profilePrompt === "string" && value.profilePrompt.length > 0
        ? value.profilePrompt
        : defaults.profilePrompt,
    rankingPrompt:
      typeof value.rankingPrompt === "string" && value.rankingPrompt.length > 0
        ? value.rankingPrompt
        : defaults.rankingPrompt
  };
}

function isMigratableJob(value: unknown): value is Job {
  return (
    isRecord(value) &&
    typeof value.title === "string" &&
    typeof value.ciphertext === "string" &&
    typeof value.description === "string" &&
    (value.type === "Hourly" || value.type === "Fixed-price")
  );
}

function isCycleError(value: unknown): value is NonNullable<GlobalState["lastCycleError"]> {
  return (
    value === "FORBIDDEN" ||
    value === "NETWORK_ERROR" ||
    value === "OTHER" ||
    value === "SERVER_ERROR" ||
    value === "UNAUTHENTICATED"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function createMigrationDefaultGlobalState(): GlobalState {
  return {
    instanceId: crypto.randomUUID(),
    enabled: true,
    darkMode: "system",
    compactList: true,
    readAlerts: [],
    readAlertIds: [],
    openProposalPage: true,
    lastLoginAttemptAt: null,
    lastCaptchaAttemptAt: null,
    feedType: FEED_TYPES.MY_FEED,
    product: null,
    subscription: null,
    lastCycleError: null,
    lastCycleStartedAt: 0,
    soundSettings: { volume: 100, enabled: true },
    schedulingEnabled: false,
    schedules: [],
    usTimeFormat: false,
    usernameHash: null
  };
}

function createMigrationDefaultAiFilterSettings(): AiFilterSettings {
  return {
    enabled: false,
    provider: "aigen-local",
    bridgeUrl: DEFAULT_AIGEN_BRIDGE_URL,
    bridgeToken: "",
    platform: "gemini",
    model: DEFAULT_AI_MODEL,
    profilePrompt: DEFAULT_AI_FILTER_PROFILE,
    rankingPrompt: DEFAULT_JOB_RANKING_PROMPT
  };
}
