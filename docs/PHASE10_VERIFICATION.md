# Phase 10 Verification

Last updated: 2026-04-29

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
| Host permissions | Pass | `https://*.upwork.com/`, `https://generativelanguage.googleapis.com/*`. |
| DNR ruleset | Pass | `request_modifier.json` is generated. |
| Assets | Pass | Icons and `sound.mp3` are generated. |

## Manual Loaded-Extension Verification

These steps require an interactive Chrome session, an authenticated Upwork account, and, for Gemini ranking, a valid Gemini API key.

1. Open `chrome://extensions/`.
2. Enable Developer mode.
3. Load unpacked extension from:

```text
C:\Users\gurno\Desktop\Upwork\upwork-agent\source\.output\chrome-mv3
```

4. Open the extension options page.
5. Verify route rendering:
   - Jobs
   - AI filter
   - Cover letter
   - Settings
   - Debug
   - Logs
6. Verify storage persistence:
   - toggle Settings values, reload options page, confirm persistence,
   - save Gemini API key/model/profile/prompt, reload, confirm persistence,
   - confirm Debug masks the Gemini API key.
7. Verify jobs workflow with an authenticated Upwork session:
   - background alarms are present,
   - jobs fetch via GraphQL,
   - badge count updates,
   - new jobs persist to `local:__JOBS`,
   - notification appears when new jobs arrive and schedule allows it.
8. Verify Gemini ranking with a valid key:
   - enable AI ranking,
   - confirm only selected jobs appear,
   - confirm cards show score and reasons,
   - confirm failure with an invalid key logs an error and preserves prior feed.
9. Verify proposal assistant on an Upwork apply page:
   - button appears near the cover-letter area,
   - `Ctrl/Cmd+Enter` opens the assistant,
   - job details load,
   - draft inserts into the Upwork textarea,
   - saved draft persists.

## Current Manual Status

Manual loaded-extension verification is pending. It cannot be completed from static source/build checks alone because it depends on Chrome extension runtime APIs, authenticated Upwork cookies, live Upwork pages, and optionally a Gemini API key.
