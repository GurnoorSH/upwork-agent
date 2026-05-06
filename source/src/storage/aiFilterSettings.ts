import { storage } from "@wxt-dev/storage";
import type { AiFilterSettings } from "../ai/jobRankingTypes";
import {
  DEFAULT_AI_FILTER_PROFILE,
  DEFAULT_GEMINI_MODEL,
  DEFAULT_JOB_RANKING_PROMPT
} from "../ai/jobRankingPrompt";
import { storageKeys } from "./keys";
import { migrateAiFilterSettings } from "./migrations";

export const DEFAULT_AIGEN_BRIDGE_URL = "http://127.0.0.1:8787";
export const DEFAULT_AIGEN_BRIDGE_PLATFORM = "gemini";

export function createDefaultAiFilterSettings(): AiFilterSettings {
  return {
    enabled: false,
    provider: "aigen-local",
    bridgeUrl: DEFAULT_AIGEN_BRIDGE_URL,
    bridgeToken: "",
    platform: DEFAULT_AIGEN_BRIDGE_PLATFORM,
    model: DEFAULT_GEMINI_MODEL,
    profilePrompt: DEFAULT_AI_FILTER_PROFILE,
    rankingPrompt: DEFAULT_JOB_RANKING_PROMPT
  };
}

export const aiFilterSettingsStorage = storage.defineItem<AiFilterSettings>(
  storageKeys.AI_FILTER_SETTINGS,
  {
    version: 1,
    fallback: createDefaultAiFilterSettings(),
    migrations: {
      1: migrateAiFilterSettings
    }
  }
);

export async function getAiFilterSettings() {
  return migrateAiFilterSettings(await aiFilterSettingsStorage.getValue());
}

export async function setAiFilterSettings(settings: AiFilterSettings) {
  await aiFilterSettingsStorage.setValue(migrateAiFilterSettings(settings));
}

export async function patchAiFilterSettings(patch: Partial<AiFilterSettings>) {
  const current = await getAiFilterSettings();
  const next = migrateAiFilterSettings({ ...current, ...patch });
  await aiFilterSettingsStorage.setValue(next);
  return next;
}
