import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Switch,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppState } from "../AppStateContext";
import {
  createDefaultAiFilterSettings
} from "../../storage/aiFilterSettings";
import { checkBridgeHealth, type BridgeHealthStatus } from "../../ai/bridgeHealth";
import { PlaceholderPage } from "./PlaceholderPage";

export function FiltersPage() {
  const { aiFilterSettings, replaceAiFilterSettings } = useAppState();
  const [enabled, setEnabled] = useState(aiFilterSettings.enabled);
  const [provider, setProvider] = useState(aiFilterSettings.provider);
  const [groqApiKey, setGroqApiKey] = useState(aiFilterSettings.groqApiKey);
  const [bridgeUrl, setBridgeUrl] = useState(aiFilterSettings.bridgeUrl);
  const [bridgeToken, setBridgeToken] = useState(aiFilterSettings.bridgeToken);
  const [platform, setPlatform] = useState(aiFilterSettings.platform);
  const [model, setModel] = useState(aiFilterSettings.model);
  const [profilePrompt, setProfilePrompt] = useState(aiFilterSettings.profilePrompt);
  const [rankingPrompt, setRankingPrompt] = useState(aiFilterSettings.rankingPrompt);
  const [saved, setSaved] = useState(false);
  const [healthStatus, setHealthStatus] = useState<BridgeHealthStatus | null>(null);
  const [healthChecking, setHealthChecking] = useState(false);

  useEffect(() => {
    setEnabled(aiFilterSettings.enabled);
    setProvider(aiFilterSettings.provider);
    setGroqApiKey(aiFilterSettings.groqApiKey);
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
      provider,
      groqApiKey,
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
      groqApiKey,
      bridgeUrl,
      bridgeToken,
      platform,
      provider
    });
    setSaved(true);
  };

  const testConnection = async () => {
    setHealthChecking(true);
    setHealthStatus(null);
    try {
      const status = await checkBridgeHealth({ bridgeUrl, bridgeToken });
      setHealthStatus(status);
    } catch {
      setHealthStatus({ online: false, error: "Health check failed unexpectedly." });
    } finally {
      setHealthChecking(false);
    }
  };

  return (
    <PlaceholderPage title="AI lead filter" compiledSymbol="source-only">
      <>
        <Stack spacing={2.5}>
          <Alert severity="info">
            AI ranking can call Groq directly with your saved API key, or use the local aigen bridge
            when you turn on the bridge mode below.
          </Alert>
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
          <FormControlLabel
            control={
              <Switch
                checked={provider === "aigen-local"}
                onChange={(_, checked) => {
                  setProvider(checked ? "aigen-local" : "groq");
                  setSaved(false);
                  setHealthStatus(null);
                }}
              />
            }
            label={provider === "aigen-local" ? "Use local aigen bridge" : "Use Groq API"}
          />
          {provider === "groq" ? (
            <>
              <Alert severity="warning">
                Groq on-demand limits can be tight for ranking. Keep batches small for
                llama-3.1-8b-instant, roughly 30 requests/minute and about 6.5k tokens/minute.
              </Alert>
              <TextField
                autoComplete="off"
                label="Groq API key"
                onChange={(event) => {
                  setGroqApiKey(event.target.value);
                  setSaved(false);
                }}
                type="password"
                value={groqApiKey}
              />
            </>
          ) : (
            <>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Local aigen bridge URL"
                  onChange={(event) => {
                    setBridgeUrl(event.target.value);
                    setSaved(false);
                    setHealthStatus(null);
                  }}
                  value={bridgeUrl}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">default: 127.0.0.1:8787</InputAdornment>
                  }}
                />
                <Button
                  onClick={() => void testConnection()}
                  variant="outlined"
                  disabled={healthChecking || !bridgeUrl.trim()}
                  size="small"
                  sx={{ whiteSpace: "nowrap", minWidth: 140 }}
                >
                  {healthChecking ? (
                    <CircularProgress size={18} sx={{ mr: 1 }} />
                  ) : null}
                  Check connection
                </Button>
                {healthStatus ? (
                  <Chip
                    label={healthStatus.online
                      ? `Online${healthStatus.platform ? ` - ${healthStatus.platform}` : ""}`
                      : healthStatus.error ?? "Offline"}
                    color={healthStatus.online ? "success" : "error"}
                    size="small"
                    sx={{ minWidth: 80 }}
                  />
                ) : null}
              </Stack>
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
            </>
          )}
          <Divider />
          <TextField
            label={provider === "groq" ? "Groq model" : "Model label"}
            onChange={(event) => {
              setModel(event.target.value);
              setSaved(false);
            }}
            value={model}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {provider === "groq" ? "default: llama-3.1-8b-instant" : "optional bridge metadata"}
                </InputAdornment>
              )
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
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={4000}
          open={saved}
          onClose={(_, reason) => {
            if (reason === "clickaway") return;
            setSaved(false);
          }}
        >
          <Alert severity="success" variant="filled" onClose={() => setSaved(false)}>
            AI filter settings saved.
          </Alert>
        </Snackbar>
      </>
    </PlaceholderPage>
  );
}
