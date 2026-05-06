# Phase 10 Verification

Last updated: 2026-05-06

This file records the verification status for the reconstructed source extension in `source/`.

## Source Build Verification

Run from:

```powershell
C:\Users\gurno\Desktop\Upwork\upwork-agent\source
```

| Check | Status | Notes |
| --- | --- | --- |
| `npm run typecheck` | Pass | `wxt prepare && tsc --noEmit` completed successfully. |
| `npm run build` | Pass | Built `.output/chrome-mv3`. WXT emitted the known options chunk-size warning only. |
| Manifest version | Pass | Generated manifest is MV3. |
| Extension metadata | Pass | Name `Upwork Toolkit - Agent Edition`, version `1.5.48`. |
| Background worker | Pass | `background.js` is generated. |
| Options page | Pass | `options.html` is generated. |
| Content script match | Pass | `https://*.upwork.com/nx/proposals/job/*/apply*`. |
| Permissions | Pass | `idle`, `alarms`, `storage`, `cookies`, `offscreen`, `notifications`, `declarativeNetRequest`. |
| Host permissions | Pass | `https://*.upwork.com/`, `http://127.0.0.1/*`, `http://localhost/*`. |
| DNR ruleset | Pass | `request_modifier.json` is generated. |
| Assets | Pass | Icons and `sound.mp3` are generated. |

## Manual Loaded-Extension Verification

These steps require an interactive Chrome session, an authenticated Upwork account, and a running aigen bridge server.

### Prerequisites

1. Install `aigen-v2-core` editable:

```bash
cd C:\Users\gurno\Desktop\Upwork\chrome-agent\aigen-v2-core
pip install -e .
```

2. Start Chrome with remote debugging:

```bash
chrome.exe --remote-debugging-port=9222
```

3. Open Gemini (or your chosen AI platform) in that Chrome profile and confirm login.

4. Start the aigen bridge:

```bash
aigen bridge --host 127.0.0.1 --port 8787 --debug-port 9222 --platform gemini
```

5. Verify bridge is running:

```bash
curl http://127.0.0.1:8787/health
```

### Extension Loading

1. Open `chrome://extensions/`.
2. Enable Developer mode.
3. Load unpacked extension from:

```text
C:\Users\gurno\Desktop\Upwork\upwork-agent\source\.output\chrome-mv3
```

### Verification Steps

1. Open the extension options page.
2. Verify route rendering:
   - Jobs
   - AI filter
   - Cover letter
   - Settings
   - Debug
   - Logs
3. Verify storage persistence:
   - toggle Settings values, reload options page, confirm persistence,
   - save bridge URL/token/platform/profile/prompt, reload, confirm persistence,
   - confirm Debug masks the bridge token.
4. Verify bridge connection:
   - open the Filters page,
   - click "Check connection" next to the bridge URL,
   - confirm the status shows green/online.
5. Verify jobs workflow with an authenticated Upwork session:
   - background alarms are present,
   - jobs fetch via GraphQL,
   - badge count updates,
   - new jobs persist to `local:__JOBS`,
   - notification appears when new jobs arrive and schedule allows it.
6. Verify AI ranking with a running aigen bridge:
   - enable AI ranking,
   - confirm the bridge receives a ranking request (visible in bridge console),
   - confirm only selected jobs appear,
   - confirm cards show score and reasons,
   - confirm failure with bridge stopped logs an error and preserves prior feed.
7. Verify proposal assistant on an Upwork apply page:
   - button appears near the cover-letter area,
   - `Ctrl/Cmd+Enter` opens the assistant,
   - job details load,
   - draft inserts into the Upwork textarea,
   - saved draft persists.

## Current Manual Status

Manual loaded-extension verification is pending. It cannot be completed from static source/build checks alone because it depends on Chrome extension runtime APIs, authenticated Upwork cookies, live Upwork pages, and a running aigen bridge server.
