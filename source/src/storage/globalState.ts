import { storage } from "@wxt-dev/storage";
import { FEED_TYPES } from "../shared/constants";
import { migrateGlobalState } from "./migrations";
import { storageKeys } from "./keys";

export type FeedType = (typeof FEED_TYPES)[keyof typeof FEED_TYPES];

export type Schedule = {
  id: string;
  days: number[];
  from: string | number | Date;
  to: string | number | Date;
};

export type GlobalState = {
  instanceId: string;
  enabled: boolean;
  darkMode: "system" | "true" | "false";
  compactList: boolean;
  readAlerts: Array<{ id: string; read_at: number }>;
  readAlertIds: string[];
  openProposalPage: boolean;
  lastLoginAttemptAt: number | null;
  lastCaptchaAttemptAt: number | null;
  feedType: FeedType;
  product: unknown | null;
  subscription: unknown | null;
  lastCycleError:
    | "FORBIDDEN"
    | "NETWORK_ERROR"
    | "OTHER"
    | "SERVER_ERROR"
    | "UNAUTHENTICATED"
    | null;
  lastCycleStartedAt: number;
  soundSettings: {
    volume: number;
    enabled: boolean;
  };
  schedulingEnabled: boolean;
  schedules: Schedule[];
  usTimeFormat: boolean;
  usernameHash: string | null;
};

export function createDefaultGlobalState(): GlobalState {
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

export const globalStateStorage = storage.defineItem<GlobalState>(storageKeys.GLOBAL_STATE, {
  version: 1,
  init: createDefaultGlobalState,
  migrations: {
    1: migrateGlobalState
  }
});

export async function getGlobalState() {
  return migrateGlobalState(await globalStateStorage.getValue());
}

export async function setGlobalState(value: GlobalState) {
  await globalStateStorage.setValue(migrateGlobalState(value));
}

export async function patchGlobalState(patch: Partial<GlobalState>) {
  const current = await getGlobalState();
  const next = migrateGlobalState({ ...current, ...patch });
  await globalStateStorage.setValue(next);
  return next;
}
