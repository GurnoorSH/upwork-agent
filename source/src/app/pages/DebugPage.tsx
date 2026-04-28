import { Button, Stack, TextField } from "@mui/material";
import { useMemo } from "react";
import { useAppState } from "../AppStateContext";
import { createDefaultGlobalState } from "../../storage/globalState";
import { PlaceholderPage } from "./PlaceholderPage";

export function DebugPage() {
  const { aiFilterSettings, coverLetterPrompt, globalState, jobs, logs, reloadStorage, replaceGlobalState } =
    useAppState();
  const snapshot = useMemo(
    () =>
      JSON.stringify(
        {
          "sync:__STATE": globalState,
          "local:__JOBS": jobs,
          "local:__LOGS": logs,
          "local:__AI_FILTER_SETTINGS": {
            ...aiFilterSettings,
            apiKey: aiFilterSettings.apiKey ? "[saved locally]" : ""
          },
          "sync:__COVER_LETTER_PROMPT": coverLetterPrompt
        },
        null,
        2
      ),
    [aiFilterSettings, coverLetterPrompt, globalState, jobs, logs]
  );

  return (
    <PlaceholderPage title="Debug" compiledSymbol="gH">
      <Stack spacing={2}>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" onClick={() => void reloadStorage()}>
            Reload storage
          </Button>
          <Button variant="outlined" onClick={() => void replaceGlobalState(createDefaultGlobalState())}>
            Reset state
          </Button>
        </Stack>
        <TextField label="Storage snapshot" minRows={18} multiline value={snapshot} />
      </Stack>
    </PlaceholderPage>
  );
}
