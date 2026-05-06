import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  Typography
} from "@mui/material";
import { useAppState } from "../AppStateContext";
import { FEED_TYPES } from "../../shared/constants";
import { PlaceholderPage } from "./PlaceholderPage";

export function SettingsPage() {
  const { globalState, saveGlobalState } = useAppState();

  return (
    <PlaceholderPage title="Settings" compiledSymbol="bV">
      <Stack spacing={3}>
        <FormControlLabel
          control={
            <Switch
              checked={globalState.enabled}
              onChange={(_, enabled) => void saveGlobalState({ enabled })}
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
            onChange={(event) => void saveGlobalState({ feedType: event.target.value })}
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
                onChange={(_, compactList) => void saveGlobalState({ compactList })}
              />
            }
            label="Compact list"
          />
          <FormControlLabel
            control={
              <Switch
                checked={globalState.openProposalPage}
                onChange={(_, openProposalPage) => void saveGlobalState({ openProposalPage })}
              />
            }
            label="Open proposal page"
          />
          <FormControlLabel
            control={
              <Switch
                checked={globalState.usTimeFormat}
                onChange={(_, usTimeFormat) => void saveGlobalState({ usTimeFormat })}
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
            onChange={(event) => void saveGlobalState({ darkMode: event.target.value })}
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
                  void saveGlobalState({
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
          />
        </Box>
      </Stack>
    </PlaceholderPage>
  );
}
