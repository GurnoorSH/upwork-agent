import {
  Alert,
  Button,
  FormControlLabel,
  InputAdornment,
  Stack,
  Switch,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppState } from "../AppStateContext";
import {
  createDefaultAiFilterSettings
} from "../../storage/aiFilterSettings";
import { PlaceholderPage } from "./PlaceholderPage";

export function FiltersPage() {
  const { aiFilterSettings, replaceAiFilterSettings } = useAppState();
  const [enabled, setEnabled] = useState(aiFilterSettings.enabled);
  const [apiKey, setApiKey] = useState(aiFilterSettings.apiKey);
  const [model, setModel] = useState(aiFilterSettings.model);
  const [profilePrompt, setProfilePrompt] = useState(aiFilterSettings.profilePrompt);
  const [rankingPrompt, setRankingPrompt] = useState(aiFilterSettings.rankingPrompt);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setEnabled(aiFilterSettings.enabled);
    setApiKey(aiFilterSettings.apiKey);
    setModel(aiFilterSettings.model);
    setProfilePrompt(aiFilterSettings.profilePrompt);
    setRankingPrompt(aiFilterSettings.rankingPrompt);
  }, [aiFilterSettings]);

  const save = async () => {
    await replaceAiFilterSettings({
      enabled,
      apiKey,
      model,
      profilePrompt,
      rankingPrompt
    });
    setSaved(true);
  };

  const reset = async () => {
    const defaults = createDefaultAiFilterSettings();
    await replaceAiFilterSettings({ ...defaults, apiKey });
    setSaved(true);
  };

  return (
    <PlaceholderPage title="AI lead filter" compiledSymbol="source-only">
      <Stack spacing={2.5}>
        <Alert severity="info">
          Gemini ranking settings are local to this browser profile. Ranking runs in Phase 8 after
          jobs are fetched and normalized.
        </Alert>
        {saved ? <Alert severity="success">AI filter settings saved.</Alert> : null}
        <FormControlLabel
          control={
            <Switch
              checked={enabled}
              onChange={(_, checked) => {
                setEnabled(checked);
                setSaved(false);
              }}
            />
          }
          label="Enable Gemini lead ranking"
        />
        <TextField
          autoComplete="off"
          label="Gemini API key"
          onChange={(event) => {
            setApiKey(event.target.value);
            setSaved(false);
          }}
          type="password"
          value={apiKey}
        />
        <TextField
          label="Gemini model"
          onChange={(event) => {
            setModel(event.target.value);
            setSaved(false);
          }}
          value={model}
          InputProps={{
            endAdornment: <InputAdornment position="end">default: gemini-2.5-flash</InputAdornment>
          }}
        />
        <TextField
          label="Niche/profile"
          minRows={3}
          multiline
          onChange={(event) => {
            setProfilePrompt(event.target.value);
            setSaved(false);
          }}
          value={profilePrompt}
        />
        <TextField
          label="High-quality lead finder prompt"
          minRows={18}
          multiline
          onChange={(event) => {
            setRankingPrompt(event.target.value);
            setSaved(false);
          }}
          value={rankingPrompt}
        />
        <Stack direction="row" flexWrap="wrap" gap={1}>
          <Button onClick={() => void save()} variant="contained">
            Save settings
          </Button>
          <Button onClick={() => void reset()} variant="outlined">
            Reset prompt
          </Button>
        </Stack>
      </Stack>
    </PlaceholderPage>
  );
}
