import { Alert, Box, CircularProgress } from "@mui/material";
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AiFilterSettings } from "../ai/jobRankingTypes";
import { getCoverLetter, setCoverLetter } from "../coverLetter/coverLetterStorage";
import { getCoverLetterPrompt, setCoverLetterPrompt } from "../coverLetter/promptStorage";
import { getJobs, setJobs } from "../jobs/jobsStorage";
import type { Job } from "../jobs/jobTypes";
import { getLogs } from "../logs/logStorage";
import type { LogsState } from "../logs/logTypes";
import {
  getGlobalState,
  patchGlobalState,
  setGlobalState,
  type GlobalState
} from "../storage/globalState";
import {
  getAiFilterSettings,
  patchAiFilterSettings,
  setAiFilterSettings
} from "../storage/aiFilterSettings";

type AppStateContextValue = {
  globalState: GlobalState;
  jobs: Job[];
  logs: LogsState;
  aiFilterSettings: AiFilterSettings;
  coverLetterPrompt: string;
  coverLetter: string;
  reloadStorage: () => Promise<void>;
  saveGlobalState: (patch: Partial<GlobalState>) => Promise<void>;
  replaceGlobalState: (state: GlobalState) => Promise<void>;
  saveAiFilterSettings: (patch: Partial<AiFilterSettings>) => Promise<void>;
  replaceAiFilterSettings: (settings: AiFilterSettings) => Promise<void>;
  saveJobs: (jobs: Job[]) => Promise<void>;
  saveCoverLetterPrompt: (prompt: string) => Promise<void>;
  saveCoverLetter: (value: string) => Promise<void>;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

type LoadedStorage = {
  globalState: GlobalState;
  jobs: Job[];
  logs: LogsState;
  aiFilterSettings: AiFilterSettings;
  coverLetterPrompt: string;
  coverLetter: string;
};

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<LoadedStorage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadStorage = useCallback(async () => {
    setError(null);
    try {
      const [globalState, jobs, logs, aiFilterSettings, coverLetterPrompt, coverLetter] =
        await Promise.all([
        getGlobalState(),
        getJobs(),
        getLogs(),
        getAiFilterSettings(),
        getCoverLetterPrompt(),
        getCoverLetter()
      ]);

      setData({ globalState, jobs, logs, aiFilterSettings, coverLetterPrompt, coverLetter });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Unknown storage error";
      setError(message);
    }
  }, []);

  useEffect(() => {
    void loadStorage();
  }, [loadStorage]);

  const value = useMemo<AppStateContextValue | null>(() => {
    if (!data) {
      return null;
    }

    return {
      ...data,
      reloadStorage: loadStorage,
      saveGlobalState: async (patch) => {
        const next = await patchGlobalState(patch);
        setData((current) => (current ? { ...current, globalState: next } : current));
      },
      replaceGlobalState: async (state) => {
        await setGlobalState(state);
        setData((current) => (current ? { ...current, globalState: state } : current));
      },
      saveAiFilterSettings: async (patch) => {
        const next = await patchAiFilterSettings(patch);
        setData((current) => (current ? { ...current, aiFilterSettings: next } : current));
      },
      replaceAiFilterSettings: async (settings) => {
        await setAiFilterSettings(settings);
        setData((current) => (current ? { ...current, aiFilterSettings: settings } : current));
      },
      saveJobs: async (jobs) => {
        await setJobs(jobs);
        setData((current) => (current ? { ...current, jobs } : current));
      },
      saveCoverLetterPrompt: async (prompt) => {
        await setCoverLetterPrompt(prompt);
        setData((current) => (current ? { ...current, coverLetterPrompt: prompt } : current));
      },
      saveCoverLetter: async (text) => {
        await setCoverLetter(text);
        setData((current) => (current ? { ...current, coverLetter: text } : current));
      }
    };
  }, [data, loadStorage]);

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Unable to load extension storage: {error}</Alert>
      </Box>
    );
  }

  if (!value) {
    return (
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", minHeight: 240 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }

  return context;
}
