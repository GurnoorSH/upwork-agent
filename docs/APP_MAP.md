# Phase 1 App Map

Last updated: 2026-04-29

This file maps the current compiled extension bundle to the source modules/components that should be rebuilt during migration.

## Entrypoints

| Current artifact | Purpose | Rebuilt source target |
| --- | --- | --- |
| `upwork-toolkit-pro/options.html` | Options UI HTML shell | `source/entrypoints/options/index.html` |
| `upwork-toolkit-pro/chunks/options-BM9_X5gH.js` | Compiled React options app | `source/entrypoints/options/main.tsx` and `source/src/app/*` |
| `upwork-toolkit-pro/background.js` | MV3 background service worker | `source/entrypoints/background.ts` |
| `upwork-toolkit-pro/content-scripts/content.js` | Proposal assistant content script | `source/entrypoints/content.ts` |
| `upwork-toolkit-pro/offscreen.html` | Offscreen document shell | `source/entrypoints/offscreen/index.html` |
| `upwork-toolkit-pro/chunks/offscreen-DurcmbxY.js` | Offscreen runtime, likely sound playback | `source/entrypoints/offscreen/main.ts` |
| `upwork-toolkit-pro/request_modifier.json` | DNR header override for Upwork GraphQL | `source/public/request_modifier.json` or WXT manifest config |

## Content Script Status

Phase 9 source status:

- `source/entrypoints/content.ts` mounts the proposal assistant on `https://*.upwork.com/nx/proposals/job/*/apply*`.
- `source/src/content/proposalAssistant.ts` waits for `textarea[aria-labelledby="cover_letter_label"]`, loads saved cover-letter text/prompt storage, requests job details via `GET_JOB_DETAILS`, and mounts a lightweight native DOM assistant.
- The assistant inserts saved or prompt-substituted drafts into the Upwork textarea using the native textarea value setter plus a bubbling `input` event for React compatibility.
- The assistant mounts near `.cover-letter-area` when available and falls back to the textarea parent.
- Keyboard behavior: `Ctrl/Cmd+Enter` opens the assistant; `Escape` closes it.
- This phase does not call the old UpToolkit cover-letter generation endpoint. It uses saved text and local prompt substitution until subscription/generation behavior is reconstructed separately.

## Shared Compiled Modules

| Artifact | What it contains | Rebuilt target |
| --- | --- | --- |
| `chunks/_virtual_wxt-plugins-C1xRqpYK.js` | WXT browser wrapper, global state storage, logger, Upwork API client, message types, URL helpers | `source/src/storage/*`, `source/src/graphql/*`, `source/src/shared/messages.ts` |
| `chunks/format-Cenk5p6T.js` | Subscription API client, analytics, colors, jobs storage, notification helpers, date-fns formatting | subscription UI/API removed from source; remaining behavior split across `source/src/analytics/*`, `source/src/jobs/storage.ts`, `source/src/notifications/*` |

## Planned Gemini AI Ranking Modules

The post-GraphQL advanced filter direction is a Gemini-powered high-quality lead finder, not manual scoring as the primary path.

| Planned source module | Purpose |
| --- | --- |
| `source/src/storage/aiFilterSettings.ts` | Local-only settings for Gemini API key, model, enabled state, niche/profile prompt, and ranking prompt |
| `source/src/ai/geminiClient.ts` | Gemini API client wrapper using the user-entered key |
| `source/src/ai/jobRankingPrompt.ts` | Default high-quality lead finder prompt and prompt assembly helpers |
| `source/src/ai/jobRankingTypes.ts` | Structured ranking request/response types |
| `source/src/ai/jobRanker.ts` | Job batching, deterministic cost-control pre-checks, Gemini ranking, and selected-job sorting |
| `source/src/app/pages/FiltersPage.tsx` | Optional settings page for AI lead filter controls |

Planned storage key:

| Key | Area | Purpose | Default |
| --- | --- | --- | --- |
| `local:__AI_FILTER_SETTINGS` | local | Gemini AI lead filter settings and API key | enabled false, model `gemini-2.5-flash`, default prompt/profile |

Phase 7 source status:

- `source/src/storage/aiFilterSettings.ts` defines the local-only storage wrapper and patch/replace helpers for `local:__AI_FILTER_SETTINGS`.
- `source/src/ai/jobRankingPrompt.ts` contains the default Gemini model, niche/profile prompt, and high-quality lead finder prompt.
- `source/src/ai/jobRankingTypes.ts` defines `AiFilterSettings`, ranking input, and ranking result types.
- `source/src/ai/geminiClient.ts` and `source/src/ai/jobRanker.ts` are typed Phase 8 scaffolds; they do not call Gemini yet.
- `source/src/app/pages/FiltersPage.tsx` provides the AI lead filter settings UI at `/filters`.
- `source/src/app/AppStateContext.tsx` loads and persists AI filter settings alongside the other typed stores.
- `source/src/app/pages/DebugPage.tsx` includes `local:__AI_FILTER_SETTINGS` in the snapshot with the API key masked.

## Options Route Map

Recovered from route declarations near the bottom of `chunks/options-BM9_X5gH.js`.

| Route | Compiled component | Source component guess | Notes |
| --- | --- | --- | --- |
| `/` | `fH` | `JobsPage` | Main jobs feed route |
| `/logs` | `pH` | `LogsPage` | Logs/Requests tabs |
| `/debug` | `gH` | `DebugPage` | Global state and jobs storage inspector/resetter |
| `/settings` | `bV` | `SettingsPage` | Feed source, notifications, schedule, sound, proposal-page, dark mode |
| `/cover-letter` | `TV` | `CoverLetterPage` | Prompt template and generated cover letter settings |
| `/faq` | `M$` | removed | FAQ page removed from source by request |
| `/subscription` | `xH` | removed | Subscription page removed from source by request |

## Layout And Navigation

| Compiled symbol | Source guess | Behavior |
| --- | --- | --- |
| `bH` | `OptionsLayout` | Fixed black app bar, desktop side nav, mobile tabs, outlet rendering |
| `mH` | `ErrorBoundary` | Reports caught errors and shows reload state |
| `jV` | `ThemeProviderShell` | Applies MUI theme, dark mode, scoped CSS baseline |
| `FV` | `AppStateProvider` | Loads jobs, global state, and cover-letter prompt before rendering app |
| `NV` | `OptionsApp` | Router, analytics page-view tracking, route declarations |

Navigation items in `bH`:

- Jobs
- Cover letter
- Settings
- Debug, hidden until debug trigger
- Logs, hidden until debug trigger

Source navigation now shows Jobs, AI filter, Cover letter, Settings, Debug, and Logs. FAQ and Subscription are intentionally removed.

Debug mode is triggered from Settings by clicking the version line more than 10 times. This emits `DEBUG_MODE_TRIGGERED` and reveals Debug/Logs nav items.

## Logs UI Status

- `source/src/app/pages/LogsPage.tsx` renders `local:__LOGS` event and request logs in tabbed tables.
- Event logs include fetch-cycle, token-cookie, GraphQL parsing, Gemini ranking, and storage/update checkpoints where available.
- Request logs include Upwork token trigger requests, Upwork GraphQL requests, proposal-detail requests, and Gemini ranking requests.
- The Logs page has a reload action because background service worker logs are written outside the currently open options page state.
- Log retention is intentionally small: 50 event logs and 25 request logs, with older entries trimmed from `local:__LOGS`.

## Jobs UI Map

| Compiled symbol | Source guess | Behavior |
| --- | --- | --- |
| `fH` | `JobsPage` | Handles alerts, unseen tracking, compact toggle portal, empty state, job click behavior |
| `cH` | `JobList` | Renders a list of jobs |
| `lH` | `JobListItem` | Chooses detailed card, expanded compact card, or compact row |
| `k5` | `JobCard` | Detailed job card |
| `R3` | `ExpandToggle` | Compact row expansion control |
| `T$` | `EmptyJobsIllustration` | Empty jobs SVG illustration |

Phase 4 source status:

- `source/src/app/pages/JobsPage.tsx` renders the rebuilt Jobs route from typed storage.
- `source/src/jobs/JobFeedSummary.tsx` renders total/new counts and mark-seen action.
- `source/src/jobs/JobList.tsx` switches between detailed cards and compact rows.
- `source/src/jobs/JobCard.tsx` renders detailed job cards with metadata, description clamp, skills, proposal/connect chips, payment, rating, spend, and location.
- `source/src/jobs/CompactJobRow.tsx` renders compact rows and expanded compact cards.
- `source/src/jobs/EmptyJobsState.tsx` renders the empty state only; mock job seeding was removed by request.
- `source/src/jobs/jobFormatters.ts` and `source/src/jobs/jobUrls.ts` centralize display formatting and Upwork view/proposal URLs.
- Jobs now appear only when real fetch/ranking behavior stores them in `local:__JOBS`.

Planned AI ranking UI status:

Phase 8 source status:

- `source/src/ai/geminiClient.ts` calls `https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent` with `x-goog-api-key`, `responseMimeType: "application/json"`, and a JSON schema for ranking results.
- `source/src/ai/jobRanker.ts` applies deterministic cost-control pre-checks, sends candidate jobs to Gemini, hides rejected jobs, attaches `aiRanking` metadata to selected jobs, and sorts by score descending.
- `source/src/background/fetchJobsCycle.ts` runs Gemini ranking after Upwork normalization and before storage merge. If Gemini ranking fails, it logs the error and preserves the previous stored feed.
- `source/src/jobs/JobCard.tsx` shows AI match score and up to 3 concise "why this is a good lead" reasons.
- `source/src/jobs/jobTypes.ts` includes `JobAiRanking` metadata.
- `source/wxt.config.ts` adds `https://generativelanguage.googleapis.com/*` to host permissions.
- Rejected jobs are hidden from the main feed by default.
- Debug view may expose rejected jobs and rejection reasons later, but the main Jobs route remains focused on selected high-quality leads.

Job click behavior:

- If `globalState.openProposalPage` is true, open proposal URL first.
- Always open job view URL.
- Mark the clicked stored job as seen by setting `__isSeen: true`.
- `JOB_CLICK` analytics is still pending until the analytics module is reconstructed.

## Storage Map

| Imported alias in options | Compiled source | Storage key | Purpose | Rebuilt target |
| --- | --- | --- | --- | --- |
| `Ts` | `_virtual_wxt-plugins...` export `g` / object `wl` | `sync:__STATE` | Global settings/state | `source/src/storage/globalState.ts` |
| `By` | `format-Cenk5p6T.js` export `j` / object `Ft` | `local:__JOBS` | Jobs feed storage | `source/src/jobs/jobsStorage.ts` |
| `Bh` | `_virtual_wxt-plugins...` export `l` / object `ni` | `local:__LOGS` | Logs and request logs | `source/src/logs/logStorage.ts` |
| `n0` | local object in options bundle | `sync:__COVER_LETTER_PROMPT` | Cover letter prompt template | `source/src/coverLetter/promptStorage.ts` |
| `Z5` | local object in options bundle | `sync:__COVER_LETTER` | Saved cover letter text | `source/src/coverLetter/coverLetterStorage.ts` |
| new | source-only AI ranking setting | `local:__AI_FILTER_SETTINGS` | Gemini API key and ranking settings | `source/src/storage/aiFilterSettings.ts` |

Phase 3 source status:

- `source/src/storage/globalState.ts` defines `globalStateStorage` for `sync:__STATE` plus read/patch helpers.
- `source/src/jobs/jobsStorage.ts` defines `jobsStorage` for `local:__JOBS`.
- `source/src/logs/logStorage.ts` defines `logsStorage` for `local:__LOGS`.
- `source/src/coverLetter/promptStorage.ts` defines `coverLetterPromptStorage` for `sync:__COVER_LETTER_PROMPT`.
- `source/src/coverLetter/coverLetterStorage.ts` defines `coverLetterStorage` for `sync:__COVER_LETTER`.
- `source/src/storage/migrations.ts` centralizes Phase 3 migration/default normalization helpers.
- `source/src/app/AppStateContext.tsx` loads these stores for the options app placeholder and writes settings/cover-letter changes back to storage.

## Global State Shape

`sync:__STATE` default:

```ts
type GlobalState = {
  instanceId: string;
  enabled: boolean;
  darkMode: "system" | "true" | "false";
  compactList: boolean;
  readAlerts: Array<{ id: string; read_at: number }>;
  readAlertIds: string[];
  openProposalPage: boolean;
  lastLoginAttemptAt: number | null;
  lastCaptchaAttemptAt: number | null;
  feedType: FeedType;
  product: unknown | null;
  subscription: unknown | null;
  lastCycleError: "FORBIDDEN" | "NETWORK_ERROR" | "OTHER" | "SERVER_ERROR" | "UNAUTHENTICATED" | null;
  lastCycleStartedAt: number;
  soundSettings: {
    volume: number;
    enabled: boolean;
  };
  schedulingEnabled: boolean;
  schedules: Schedule[];
  usTimeFormat: boolean;
  usernameHash: string | null;
};
```

Known feed type enum:

```ts
type FeedType =
  | "Most Recent"
  | "Best Matches"
  | "My Feed / Saved Searches";
```

Schedule shape is not fully typed yet, but settings code uses:

```ts
type Schedule = {
  id: string;
  days: number[];
  from: string | number | Date;
  to: string | number | Date;
};
```

## Job Model Fields

Fields used by the Jobs UI and/or fetched GraphQL queries:

```ts
type Job = {
  id?: string;
  uid?: string;
  title: string;
  ciphertext: string;
  description: string;
  type: "Hourly" | "Fixed-price";
  recno?: string | number;
  freelancersToHire?: number;
  duration?: string;
  durationLabel?: string;
  engagement?: string;
  amount?: {
    amount: string;
    currency?: string;
    currencyCode?: string;
    displayValue?: string;
  };
  createdOn?: string;
  publishedOn?: string;
  renewedOn?: string;
  connectPrice?: number;
  tierText?: string;
  tier?: string | number;
  tierLabel?: string;
  contractorTier?: string;
  proposalsTier?: string;
  totalApplicants?: number;
  enterpriseJob?: boolean;
  premium?: boolean;
  isApplied?: boolean;
  attrs?: Array<{
    id?: string;
    uid?: string;
    prettyName: string;
    prefLabel?: string;
    parentSkillId?: string;
    highlighted?: boolean;
    freeText?: string;
    skillType?: string;
  }>;
  skills?: Array<{
    id?: string;
    name?: string;
    prettyName?: string;
    prefLabel?: string;
    highlighted?: boolean;
  }>;
  hourlyBudget?: {
    type?: string;
    min: number;
    max: number;
  };
  weeklyBudget?: {
    amount?: number;
  };
  client?: {
    totalHires?: number;
    totalPostedJobs?: number;
    totalSpent?: number;
    paymentVerificationStatus?: number;
    location?: {
      country?: string;
      city?: string;
      state?: string;
      countryTimezone?: string;
      worldRegion?: string;
    };
    totalReviews?: number;
    totalFeedback?: number;
    companyRid?: string;
    edcUserId?: string;
    lastContractRid?: string;
    companyOrgUid?: string;
    hasFinancialPrivacy?: boolean;
  };
  clientRelation?: null | {
    companyRid?: string;
    companyName?: string;
    edcUserId?: string;
    lastContractPlatform?: string;
    lastContractRid?: string;
    lastContractTitle?: string;
  };
  __isSeen?: boolean;
};
```

Phase 3 typed source adds these fields in `source/src/jobs/jobTypes.ts`; the type remains intentionally permissive for still-unmapped GraphQL fields.

## Background Map

The detailed Phase 0 behavior is in `docs/BASELINE.md`. Source reconstruction should split background behavior into:

- `source/entrypoints/background.ts`
- `source/src/background/alarms.ts`
- `source/src/background/fetchJobsCycle.ts`
- `source/src/background/dailyReport.ts`
- `source/src/shared/messages.ts`
- `source/src/notifications/notifications.ts`

Phase 5 source status:

- `source/entrypoints/background.ts` now wires action click, notification click, alarms, startup/install/idle alarm restoration, runtime open-page messages, and job-details messages.
- `source/src/background/alarms.ts` owns alarm definitions and registration.
- `source/src/background/fetchJobsCycle.ts` owns the fetch cycle: 30-second overlap guard, enabled-state gate, job merge, 50-job retention, unseen marking, badge updates, native notification trigger, and `lastCycleError` updates.
- `source/src/background/errorClassification.ts` maps unauthenticated, forbidden/rate-limit, network, server, and fallback errors to `GlobalState["lastCycleError"]`.
- `source/src/background/schedule.ts` checks notification schedules before native notifications.
- `source/src/background/badge.ts` owns action badge text/color updates.
- `source/src/background/dailyReport.ts` is a non-network placeholder that logs cycle execution until analytics behavior is reconstructed.
- `source/src/graphql/upworkClient.ts` remains a typed Phase 6 stub, so the fetch cycle is structurally wired but cannot retrieve live jobs yet.

Alarm cycles:

| Cycle | Delay | Period | Purpose |
| --- | --- | --- | --- |
| `FETCH_JOBS` | 0 minutes | 1 minute | Fetch jobs and notify |
| `DAILY_REPORT` | 10 seconds | 24 hours | Send analytics daily report |

## Message Map

Recovered message enum:

```ts
enum Message {
  OPEN_PAGE = "OPEN_PAGE",
  PLAY_SOUND = "PLAY_SOUND",
  GET_JOB_DETAILS = "GET_JOB_DETAILS",
}
```

Known message validators:

- `isGetJobDetailsMessage`: `type === "GET_JOB_DETAILS"` and `jobId` is a string.
- `isOpenPageMessage`: `type === "OPEN_PAGE"`.
- `isPlaySoundMessage`: `type === "PLAY_SOUND"` and `volume` is numeric.

## External Services

| Service | Base URL | Use |
| --- | --- | --- |
| Upwork | `https://www.upwork.com` | job feeds, auth/session token triggering, proposal details |
| Upwork GraphQL | `https://www.upwork.com/api/graphql/v1` | job feeds, username lookup |
| UpToolkit API | `https://www.uptoolkit.io/api` | old subscription/products/cover-letter generation service, not rebuilt in source |
| Google Analytics Measurement Protocol | `https://www.google-analytics.com/mp/collect` | page view, job click, daily report, debug trigger |
| Sentry | configured DSN in compiled bundle | production error reporting |

## GraphQL Source Status

Phase 6 source status:

- `source/src/graphql/jobSearchQuery.ts` contains the recovered `My Feed / Saved Searches`, `Best Matches`, `Most Recent`, and username GraphQL query strings.
- `source/src/graphql/requestBuilder.ts` maps each `FeedType` to request variables, response result paths, and typed `Job` normalization.
- `source/src/graphql/upworkClient.ts` implements:
  - jobs token acquisition from `/nx/find-work/`,
  - proposal token acquisition from `/nx/proposals/`,
  - username token acquisition from `/freelancers/settings/`,
  - cookie clearing and one retry on unauthenticated job fetch,
  - `getJobs(feedType)`,
  - `getJobDetails(jobId)`,
  - `getUsername()`,
  - feed options metadata,
  - view/proposal URL helpers,
  - error classification helpers.
- Network requests use `fetch` with `credentials: "include"` and extension host permissions. The declarative net request rule in `source/public/request_modifier.json` still provides the GraphQL `Origin`/`Referer` behavior from the baseline.
- Live behavior still needs verification in Chrome with the source extension loaded and an authenticated Upwork session.

## Screenshot Baseline

Screenshots currently present in `docs/screenshots/`:

- `Compact_view.png`
- `CoverLetterView.png`
- `Job_opened_View.png`
- `SettingsDropdownView.png`
- `SettingsView.png`

Still missing or not clearly represented:

- detailed jobs list with multiple detailed cards,
- empty jobs state,
- debug page,
- logs page,
