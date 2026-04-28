export const EXTENSION_VERSION = "1.5.48";

export const CYCLE_NAMES = {
  FETCH_JOBS: "FETCH_JOBS",
  DAILY_REPORT: "DAILY_REPORT",
  CHECK_SUBSCRIPTION: "CHECK_SUBSCRIPTION"
} as const;

export const STORAGE_KEYS = {
  GLOBAL_STATE: "sync:__STATE",
  JOBS: "local:__JOBS",
  LOGS: "local:__LOGS",
  COVER_LETTER_PROMPT: "sync:__COVER_LETTER_PROMPT",
  COVER_LETTER: "sync:__COVER_LETTER",
  AI_FILTER_SETTINGS: "local:__AI_FILTER_SETTINGS"
} as const;

export const FEED_TYPES = {
  MY_FEED: "My Feed / Saved Searches",
  BEST_MATCHES: "Best Matches",
  MOST_RECENT: "Most Recent"
} as const;

export const MESSAGE_TYPES = {
  OPEN_PAGE: "OPEN_PAGE",
  PLAY_SOUND: "PLAY_SOUND",
  GET_JOB_DETAILS: "GET_JOB_DETAILS"
} as const;
