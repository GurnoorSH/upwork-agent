import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
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
  const [bridgeUrl, setBridgeUrl] = useState(aiFilterSettings.bridgeUrl);
  const [bridgeToken, setBridgeToken] = useState(aiFilterSettings.bridgeToken);
  const [platform, setPlatform] = useState(aiFilterSettings.platform);
  const [model, setModel] = useState(aiFilterSettings.model);
  const [profilePrompt, setProfilePrompt] = useState(aiFilterSettings.profilePrompt);
  const [rankingPrompt, setRankingPrompt] = useState(aiFilterSettings.rankingPrompt);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setEnabled(aiFilterSettings.enabled);
    setBridgeUrl(aiFilterSettings.bridgeUrl);
    setBridgeToken(aiFilterSettings.bridgeToken);
    setPlatform(aiFilterSettings.platform);
    setModel(aiFilterSettings.model);
    setProfilePrompt(aiFilterSettings.profilePrompt);
    setRankingPrompt(aiFilterSettings.rankingPrompt);
  }, [aiFilterSettings]);

  const save = async () => {
    await replaceAiFilterSettings({
      enabled,
      provider: "aigen-local",
      bridgeUrl,
      bridgeToken,
      platform,
      model,
      profilePrompt,
      rankingPrompt
    });
    setSaved(true);
  };

  const reset = async () => {
    const defaults = createDefaultAiFilterSettings();
    await replaceAiFilterSettings({
      ...defaults,
      bridgeUrl,
      bridgeToken,
      platform
    });
    setSaved(true);
  };

  return (
    <PlaceholderPage title="AI lead filter" compiledSymbol="source-only">
      <Stack spacing={2.5}>
        <Alert severity="info">
          AI ranking uses a local aigen bridge in this browser profile. Start the bridge before
          running lead filtering.
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
          label="Enable AI lead ranking"
        />
        <TextField
          autoComplete="off"
          label="Local aigen bridge URL"
          onChange={(event) => {
            setBridgeUrl(event.target.value);
            setSaved(false);
          }}
          value={bridgeUrl}
          InputProps={{
            endAdornment: <InputAdornment position="end">default: 127.0.0.1:8787</InputAdornment>
          }}
        />
        <TextField
          autoComplete="off"
          label="Bridge token"
          onChange={(event) => {
            setBridgeToken(event.target.value);
            setSaved(false);
          }}
          type="password"
          value={bridgeToken}
        />
        <FormControl fullWidth>
          <InputLabel id="ai-platform-label">Web AI platform</InputLabel>
          <Select
            labelId="ai-platform-label"
            label="Web AI platform"
            value={platform}
            onChange={(event) => {
              setPlatform(event.target.value as typeof platform);
              setSaved(false);
            }}
          >
            <MenuItem value="gemini">Gemini</MenuItem>
            <MenuItem value="chatgpt">ChatGPT</MenuItem>
            <MenuItem value="claude">Claude</MenuItem>
            <MenuItem value="perplexity">Perplexity</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Model label"
          onChange={(event) => {
            setModel(event.target.value);
            setSaved(false);
          }}
          value={model}
          InputProps={{
            endAdornment: <InputAdornment position="end">optional bridge metadata</InputAdornment>
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
