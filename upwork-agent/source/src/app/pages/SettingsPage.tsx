import { useState } from "react";
import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Snackbar,
  Stack,
  Switch,
  Typography
} from "@mui/material";
import { useAppState } from "../AppStateContext";
import { FEED_TYPES } from "../../shared/constants";
import { PlaceholderPage } from "./PlaceholderPage";

export function SettingsPage() {
  const { globalState, saveGlobalState } = useAppState();
  const [noticeOpen, setNoticeOpen] = useState(false);

  const saveSetting: typeof saveGlobalState = async (patch) => {
    await saveGlobalState(patch);
    setNoticeOpen(true);
  };

  return (
    <PlaceholderPage title="Settings" compiledSymbol="bV">
      <>
        <Stack spacing={3}>
          <FormControlLabel
            control={
              <Switch
                checked={globalState.enabled}
                onChange={(_, enabled) => void saveSetting({ enabled })}
              />
            }
            label="Notifications enabled"
          />
          <FormControl fullWidth>
            <InputLabel id="feed-type-label">Feed source</InputLabel>
            <Select
              labelId="feed-type-label"
              label="Feed source"
              value={globalState.feedType}
              onChange={(event) => void saveSetting({ feedType: event.target.value })}
            >
              {Object.values(FEED_TYPES).map((feedType) => (
                <MenuItem key={feedType} value={feedType}>
                  {feedType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={globalState.compactList}
                  onChange={(_, compactList) => void saveSetting({ compactList })}
                />
              }
              label="Compact list"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={globalState.openProposalPage}
                  onChange={(_, openProposalPage) => void saveSetting({ openProposalPage })}
                />
              }
              label="Open proposal page"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={globalState.usTimeFormat}
                  onChange={(_, usTimeFormat) => void saveSetting({ usTimeFormat })}
                />
              }
              label="US time format"
            />
          </Stack>
          <FormControl fullWidth>
            <InputLabel id="dark-mode-label">Theme</InputLabel>
            <Select
              labelId="dark-mode-label"
              label="Theme"
              value={globalState.darkMode}
              onChange={(event) => void saveSetting({ darkMode: event.target.value })}
            >
              <MenuItem value="system">System</MenuItem>
              <MenuItem value="false">Light</MenuItem>
              <MenuItem value="true">Dark</MenuItem>
            </Select>
          </FormControl>
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={globalState.soundSettings.enabled}
                  onChange={(_, enabled) =>
                    void saveSetting({
                      soundSettings: { ...globalState.soundSettings, enabled }
                    })
                  }
                />
              }
              label="Sound"
            />
            <Typography id="volume-slider" color="text.secondary" gutterBottom>
              Volume: {globalState.soundSettings.volume}
            </Typography>
            <Slider
              aria-labelledby="volume-slider"
              disabled={!globalState.soundSettings.enabled}
              max={100}
              min={0}
              value={globalState.soundSettings.volume}
              onChange={(_, volume) =>
                void saveGlobalState({
                  soundSettings: {
                    ...globalState.soundSettings,
                    volume: Array.isArray(volume) ? volume[0] : volume
                  }
                })
              }
              onChangeCommitted={() => setNoticeOpen(true)}
            />
          </Box>
        </Stack>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={2500}
          open={noticeOpen}
          onClose={(_, reason) => {
            if (reason === "clickaway") return;
            setNoticeOpen(false);
          }}
        >
          <Alert severity="success" variant="filled" onClose={() => setNoticeOpen(false)}>
            Settings saved.
          </Alert>
        </Snackbar>
      </>
    </PlaceholderPage>
  );
}
