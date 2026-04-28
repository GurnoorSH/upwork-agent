# Phase 0 Baseline

Last updated: 2026-04-28

This file records the current unpacked extension baseline before source reconstruction begins. Keep `upwork-toolkit-pro/` as the working baseline until the new `source/` project can rebuild equivalent behavior.

## Repository Baseline

- Baseline extension directory: `upwork-toolkit-pro/`
- Extension name: `Upwork Toolkit - Agent Edition`
- Extension version: `1.5.48`
- Manifest version: `3`
- Background entry: `background.js`
- Options entry: `options.html`
- Options bundle: `chunks/options-BM9_X5gH.js`
- Content script entry: `content-scripts/content.js`
- Content script match: `https://*.upwork.com/nx/proposals/job/*/apply*`
- Declarative net request rules: `request_modifier.json`
- Host permissions: `https://*.upwork.com/`
- Permissions: `idle`, `alarms`, `storage`, `cookies`, `offscreen`, `notifications`, `declarativeNetRequest`

## Source Availability

- Original source files are not present.
- `package.json` is not present.
- WXT/Vite config is not present.
- Sourcemap comments are present in compiled files, but `.map` files are not present.
- Chrome metadata hash files can verify package integrity but cannot recover source.

## Build Artifact Safety

- Do not delete `upwork-toolkit-pro/`.
- Do not overwrite `upwork-toolkit-pro/` with generated output until the source migration has an equivalent loadable extension.
- Current patched jobs UI is in `upwork-toolkit-pro/chunks/options-BM9_X5gH.js`.
- Direct chunk edits are allowed only as temporary hotfixes while migration is incomplete.

## Current Options Routes

Recovered from `chunks/options-BM9_X5gH.js` route declarations:

| Route | Compiled component | Purpose |
| --- | --- | --- |
| `/` | `fH` | Jobs feed |
| `/faq` | `M$` | FAQ |
| `/logs` | `pH` | Logs |
| `/debug` | `gH` | Debug/storage inspection |
| `/settings` | `bV` | Settings |
| `/cover-letter` | `TV` | Cover letter prompt/template settings |
| `/subscription` | `xH` | Subscription/license page |

## Current Jobs UI Behavior

Recovered from the patched options bundle:

- Jobs page reads jobs from `local:__JOBS`.
- Global options/state are read from `sync:__STATE`.
- Jobs can render as detailed cards or compact rows via `globalState.compactList`.
- Unseen jobs are tracked locally in the Jobs page and highlighted.
- When the options tab is active/focused, jobs with `__isSeen === false` are marked seen.
- Clicking a job opens its Upwork job view URL.
- If `globalState.openProposalPage` is enabled, clicking a job also opens the proposal/apply URL.
- Empty state displays "Sit back and relax" and "Extension will notify you when new jobs appear."
- Error states include disabled notifications, captcha/forbidden, server error, generic fetch error, network error, and unauthenticated login required.

## Current Jobs UI Patch

The current chunk patch improves:

- detailed card spacing, border, hover elevation, and title hierarchy,
- unread job highlighting,
- metadata separators,
- job description line clamping,
- skill chip spacing,
- compact row borders and spacing,
- jobs feed summary panel with total/new counts,
- empty-state presentation.

If source reconstruction reaches `JobCard`, `CompactJobRow`, and `JobsPage`, port these UI decisions into source rather than reusing chunk edits.

## Background Behavior

Recovered from `background.js`:

- Uses Manifest V3 service worker.
- Opens `options.html` when the extension action is clicked.
- Opens `options.html` when a notification is clicked.
- Uses `chrome.alarms`.
- Alarm cycles:
  - `FETCH_JOBS`: starts immediately, repeats every 1 minute.
  - `DAILY_REPORT`: starts after 10 seconds, repeats every 24 hours.
  - `CHECK_SUBSCRIPTION`: starts after 10 seconds, repeats every 60 minutes.
- Fetch cycle:
  - exits if another fetch started within the last 30 seconds,
  - exits and sets badge `OFF` if disabled,
  - calls `getJobs(feedType)`,
  - merges new jobs into existing jobs,
  - keeps at most 50 jobs,
  - marks newly fetched jobs `__isSeen: false`,
  - updates badge count with unseen count,
  - stores fetch errors in `lastCycleError`,
  - shows login notification when session becomes unauthenticated,
  - respects scheduling settings before notifications,
  - shows a native notification when new jobs arrive.
- Runtime message handling:
  - handles get-job-details messages via `getJobDetails(jobId)`,
  - handles open-page messages by creating a focused tab.

## Request Modifier Baseline

`request_modifier.json` modifies requests to `https://www.upwork.com/api/graphql/v1`:

- sets `Origin` to `https://www.upwork.com`,
- sets `Referer` to `https://www.upwork.com/nx/find-work/`.

This strongly suggests the rebuilt GraphQL client must preserve browser-session-compatible request context.

## Storage Baseline

Known storage keys:

| Key | Area | Purpose | Default |
| --- | --- | --- | --- |
| `sync:__STATE` | sync | Global extension state/settings | see default state below |
| `local:__JOBS` | local | Stored jobs feed | `undefined` read as `[]` by UI provider |
| `local:__LOGS` | local | Extension logs | not fully mapped |
| `sync:__COVER_LETTER_PROMPT` | sync | Cover letter prompt template | default prompt below |
| `sync:__COVER_LETTER` | sync | Saved cover letter text | `""` |

Default `sync:__STATE`:

```json
{
  "instanceId": "generated id",
  "enabled": true,
  "darkMode": "system",
  "compactList": true,
  "readAlerts": [],
  "readAlertIds": [],
  "openProposalPage": true,
  "lastLoginAttemptAt": null,
  "lastCaptchaAttemptAt": null,
  "feedType": "My Feed / Saved Searches",
  "product": null,
  "subscription": null,
  "lastCycleError": null,
  "lastCycleStartedAt": 0,
  "soundSettings": {
    "volume": 100,
    "enabled": true
  },
  "schedulingEnabled": false,
  "schedules": [],
  "usTimeFormat": false,
  "usernameHash": null
}
```

Default `sync:__COVER_LETTER_PROMPT`:

```text
Create a cover letter for this job which has title:
#{title}

and job description:
#{job_description}

Mention my experience with relevant technologies.
Use less than 300 words.
```

## Screenshot Baseline Status

Screenshots have not yet been captured in this repo.

Reason: the options page depends on Chrome extension APIs such as `chrome.runtime.getURL`; loading `options.html` through a normal local static server does not render the app. Screenshots should be captured from the actual unpacked extension loaded in Chrome.

Required screenshot checklist is in `docs/SCREENSHOT_CHECKLIST.md`.

## Phase 0 Exit Status

Complete enough for text baseline and safety:

- Current extension behavior documented from manifest and compiled bundle.
- Current storage keys/defaults documented.
- Current background cycles documented.
- Current build-output safety rules documented.
- Screenshot capture is explicitly pending because it needs the loaded Chrome extension context.
