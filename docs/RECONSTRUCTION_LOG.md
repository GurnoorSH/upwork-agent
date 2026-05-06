# Reconstruction Log

Use this file as the running memory for the source migration. Every agent session should add a dated entry before ending work.

## Known Compiled Symbol Map

| Compiled symbol | Source guess | Purpose | Status |
| --- | --- | --- | --- |
| `fH` | `JobsPage` | Main jobs feed route in options UI | partially mapped |
| `k5` | `JobCard` | Detailed job card | partially mapped |
| `lH` | `JobListItem` | Switches between detailed card, expanded compact card, and compact row | partially mapped |
| `cH` | `JobList` | Renders jobs collection | partially mapped |
| `bH` | `OptionsLayout` | App shell, app bar, desktop side nav, mobile tabs | mapped |
| `mH` | `ErrorBoundary` | Catches UI errors and reports them | mapped |
| `jV` | `ThemeProviderShell` | MUI theme and dark-mode wrapper | mapped |
| `FV` | `AppStateProvider` | Loads global state, jobs, and cover-letter prompt | mapped |
| `NV` | `OptionsApp` | Router and route declarations | mapped |
| `M$` | removed | FAQ page removed from source by request | removed |
| `pH` | `LogsPage` | Logs/Requests tabs | mapped |
| `gH` | `DebugPage` | Global state and job storage debug inspector | mapped |
| `bV` | `SettingsPage` | Extension settings page | mapped |
| `TV` | `CoverLetterPage` | Cover letter prompt/template page | mapped |
| `xH` | removed | Subscription page removed from source by request | removed |

## 2026-04-28 Session

Goal:
Create durable migration context for future AI sessions and complete Phase 0 baseline/safety documentation.

Files changed:
- `docs/MIGRATION_PLAN.md`
- `docs/RECONSTRUCTION_LOG.md`
- `docs/GRAPHQL_NOTES.md`
- `docs/BASELINE.md`
- `docs/SCREENSHOT_CHECKLIST.md`
- `Docx/Context.md`

Behavior recovered:
- Confirmed current project is an unpacked Chrome extension build output.
- Confirmed original source files and sourcemaps are not present.
- Confirmed current jobs UI lives in `upwork-toolkit-pro/chunks/options-BM9_X5gH.js`.
- Recorded manifest baseline: MV3, extension version `1.5.48`, options page, background service worker, content script match, host permissions, and permissions.
- Recorded current options routes from the compiled bundle.
- Recorded jobs page baseline behavior and the existing jobs UI chunk patch.
- Recorded background alarm cycles and fetch behavior from `background.js`.
- Recorded known storage keys and `sync:__STATE` defaults.
- Recorded GraphQL request modifier behavior for `https://www.upwork.com/api/graphql/v1`.

Open questions:
- Exact GraphQL endpoint and payload shape still need to be mapped.
- Original WXT package versions are unknown.
- Screenshot baseline is pending and should be captured from the real Chrome extension context.

Next recommended step:
Begin Phase 1 by mapping route/component symbols, storage abstractions, job model fields, and GraphQL request construction from the compiled bundle before scaffolding the new `source/` project.

Verification:
- Documentation-only change. No build required.

## 2026-04-29 Session

Goal:
Proceed after screenshot capture and complete Phase 1 app-map recovery from the compiled bundle.

Files changed:
- `docs/APP_MAP.md`
- `docs/GRAPHQL_NOTES.md`
- `docs/SCREENSHOT_CHECKLIST.md`
- `docs/RECONSTRUCTION_LOG.md`
- `Docx/Context.md`

Behavior recovered:
- Confirmed screenshots were added: `Compact_view.png`, `CoverLetterView.png`, `Job_opened_View.png`, `SettingsDropdownView.png`, and `SettingsView.png`.
- Mapped options entrypoints, layout, routes, navigation, Jobs UI components, and provider structure.
- Mapped storage aliases: `Ts` -> `sync:__STATE`, `By` -> `local:__JOBS`, `Bh` -> `local:__LOGS`, cover-letter prompt/text storage.
- Mapped `GlobalState`, `FeedType`, preliminary `Schedule`, and the important `Job` fields used by UI and queries.
- Mapped background rebuild modules and alarm/message behavior.
- Mapped the Upwork API client location and exported methods.
- Recovered the three GraphQL feed queries, request variables, response paths, and normalization behavior.
- Recovered job details and username request behavior.

Open questions:
- Exact source package versions are still unknown.
- Schedule type needs refinement during source rebuild.
- Subscription/product types are still `unknown` pending subscription page migration.
- Detailed card, empty state, debug, logs, and subscription screenshots are still useful but not blocking.

Next recommended step:
Begin Phase 2 by scaffolding a new WXT/React/TypeScript source project under `source/`, preserving `upwork-toolkit-pro/` as the current working baseline.

Verification:
- Documentation-only change. No build required.

## 2026-04-29 Phase 2 Session

Goal:
Scaffold a new WXT/React/TypeScript source project under `source/` without replacing the current `upwork-toolkit-pro/` baseline.

Files changed:
- `source/package.json`
- `source/package-lock.json`
- `source/wxt.config.ts`
- `source/tsconfig.json`
- `source/README.md`
- `source/.gitignore`
- `source/entrypoints/background.ts`
- `source/entrypoints/content.ts`
- `source/entrypoints/options/index.html`
- `source/entrypoints/options/main.tsx`
- `source/entrypoints/offscreen/index.html`
- `source/entrypoints/offscreen/main.ts`
- `source/public/icon/*.png`
- `source/public/request_modifier.json`
- `source/public/sound.mp3`
- `source/src/app/*`
- `source/src/shared/*`
- `source/src/storage/globalState.ts`
- `source/src/jobs/jobTypes.ts`
- `source/src/graphql/upworkClient.ts`
- `source/src/notifications/notifications.ts`
- `source/src/content/proposalAssistant.ts`
- `docs/APP_MAP.md`
- `docs/MIGRATION_PLAN.md`
- `Docx/Context.md`

Behavior recovered:
- Created a WXT MV3 project with React, TypeScript, MUI, React Router, storage dependency, axios, and date-fns declared.
- Copied extension icons, `request_modifier.json`, and `sound.mp3` into `source/public/`.
- Recreated manifest-level baseline config: name, description, version, action icon, icons, permissions, host permissions, and DNR rule resource.
- Added background scaffold with action click, notification click, alarm registration, startup/install/idle hooks, and current alarm names/cadence.
- Added content script scaffold matching `https://*.upwork.com/nx/proposals/job/*/apply*`.
- Added options app scaffold with placeholder routes for Jobs, FAQ, Logs, Debug, Settings, Cover Letter, and Subscription.
- Added offscreen scaffold that listens for `PLAY_SOUND` messages and plays `sound.mp3`.
- Added typed constants, message shapes, global-state defaults, and job model types based on Phase 1.

Open questions:
- NPM install reported 5 moderate vulnerabilities; these were not remediated in Phase 2.
- The source app is a placeholder shell. Actual storage behavior starts in Phase 3.
- Upwork GraphQL behavior remains intentionally stubbed until Phase 6.
- WXT alias config is present, but scaffold imports were switched to relative paths because production build resolution was more reliable that way on this Windows path.

Next recommended step:
Begin Phase 3 by replacing placeholder state with real WXT storage wrappers for `sync:__STATE`, `local:__JOBS`, `local:__LOGS`, `sync:__COVER_LETTER_PROMPT`, and `sync:__COVER_LETTER`.

Verification:
- `npm install` completed and generated `source/package-lock.json`.
- `npm run build` passes and outputs `.output/chrome-mv3`.
- `npm run typecheck` passes.
- Generated manifest includes background service worker, options UI, content script, DNR rule resource, permissions, host permissions, icons, and version `1.5.48`.

## 2026-04-29 Phase 3 Session

Goal:
Rebuild typed state and storage in `source/` only, preserving the current build baseline and avoiding GraphQL fetching or real jobs UI work.

Files changed:
- `source/entrypoints/options/main.tsx`
- `source/src/app/AppStateContext.tsx`
- `source/src/app/pages/CoverLetterPage.tsx`
- `source/src/app/pages/DebugPage.tsx`
- `source/src/app/pages/JobsPage.tsx`
- `source/src/app/pages/LogsPage.tsx`
- `source/src/app/pages/SettingsPage.tsx`
- `source/src/coverLetter/coverLetterStorage.ts`
- `source/src/coverLetter/coverLetterTypes.ts`
- `source/src/coverLetter/promptStorage.ts`
- `source/src/jobs/jobsStorage.ts`
- `source/src/jobs/jobTypes.ts`
- `source/src/logs/logStorage.ts`
- `source/src/logs/logTypes.ts`
- `source/src/storage/globalState.ts`
- `source/src/storage/keys.ts`
- `source/src/storage/migrations.ts`
- `docs/APP_MAP.md`
- `docs/MIGRATION_PLAN.md`
- `docs/RECONSTRUCTION_LOG.md`
- `Docx/Context.md`

Behavior recovered:
- Added typed WXT storage wrappers for `sync:__STATE`, `local:__JOBS`, `local:__LOGS`, `sync:__COVER_LETTER_PROMPT`, and `sync:__COVER_LETTER`.
- Added migration/default normalization helpers for global state, jobs, logs, cover-letter prompt, and saved cover-letter text.
- Expanded `Job` typing to include the remaining Phase 1 fields such as `recno`, hire counts, connects, tier labels, weekly budget, client IDs, and application flags.
- Added log and request-log types for the future Logs page.
- Wired the options app placeholder through `AppStateProvider`, loading all Phase 3 stores before rendering.
- Settings placeholder now persists global settings including enabled state, feed source, compact list, proposal-page behavior, time format, theme, sound enabled state, and volume.
- Cover-letter placeholder now loads and persists prompt template and saved cover-letter text.
- Jobs, Logs, and Debug placeholders now read typed storage; Debug can reload storage and reset global state.
- Theme selection is applied from `globalState.darkMode` when explicitly set to dark or light; `system` currently renders light until full theme-shell parity is rebuilt.

Open questions:
- `local:__LOGS` exact compiled shape is still only approximated as `{ logs, requests }`.
- Subscription and product remain `unknown` in `GlobalState` until subscription page migration.
- `darkMode: "system"` does not yet follow the browser media query.
- Real Jobs UI, GraphQL fetching, background persistence cycles, and live log rendering remain later phases.

Next recommended step:
Begin Phase 4 by rendering the real Jobs page from `local:__JOBS` or mock data, including empty state, detailed cards, compact rows, unread highlighting, and job click behavior.

Verification:
- `npm run typecheck` passes from `source/`.
- `npm run build` passes from `source/` and outputs `.output/chrome-mv3`.
- WXT build emitted a chunk-size warning for the options bundle, but no build errors.

## 2026-04-29 Phase 4 Session

Goal:
Rebuild the Jobs UI in `source/` from typed storage/mock data only, without implementing GraphQL fetching or background polling.

Files changed:
- `source/src/app/AppStateContext.tsx`
- `source/src/app/pages/JobsPage.tsx`
- `source/src/jobs/CompactJobRow.tsx`
- `source/src/jobs/EmptyJobsState.tsx`
- `source/src/jobs/JobCard.tsx`
- `source/src/jobs/JobFeedSummary.tsx`
- `source/src/jobs/JobList.tsx`
- `source/src/jobs/jobFormatters.ts`
- `source/src/jobs/jobUrls.ts`
- `source/src/jobs/mockJobs.ts`
- `docs/APP_MAP.md`
- `docs/MIGRATION_PLAN.md`
- `docs/RECONSTRUCTION_LOG.md`
- `Docx/Context.md`

Behavior recovered:
- Replaced the Phase 3 Jobs placeholder with a real Jobs page that reads `local:__JOBS` and `sync:__STATE`.
- Added a feed summary with total/new counts and a mark-seen action.
- Added detailed job cards with title, metadata, budget, age, clamped description, skills, proposal/connect badges, payment status, rating stars, client spend, and location.
- Added compact row rendering with expand/collapse into the detailed card presentation.
- Added empty-state UI matching the baseline copy: "Sit back and relax" and "Extension will notify you when new jobs appear."
- Added a mock-data seed button to support manual UI verification before GraphQL fetching exists.
- Added stored-job click behavior: mark clicked job as seen, optionally open proposal/apply URL first, then open the Upwork job URL.
- Added disabled-notifications and last-cycle-error alerts for the known baseline error states.
- Added formatter and URL helper modules so Phase 5/6 work can reuse the same display and click behavior.

Open questions:
- The exact compiled expanded compact-card close affordance may need refinement once compared inside the loaded extension.
- Analytics `JOB_CLICK` is still pending because analytics reconstruction is not part of Phase 4.
- Automatic active-tab seen marking from the compiled app is not fully reproduced; Phase 4 supports clicked/mark-all seen persistence.
- GraphQL fetching, background polling, badge counts, native notifications, and real live job ingestion remain later phases.

Next recommended step:
Begin Phase 5 by rebuilding background polling around the typed stores, or explicitly reorder to Phase 6 first if live GraphQL request reconstruction should happen before polling.

Verification:
- `npm run typecheck` passes from `source/`.
- `npm run build` passes from `source/` and outputs `.output/chrome-mv3`.
- WXT build emitted the existing options chunk-size warning, but no build errors.

## 2026-04-29 Gemini Ranking Plan Refinement

Goal:
Refine the future advanced filter/scoring migration plan so it uses Gemini AI ranking as a strict high-quality lead finder.

Files changed:
- `docs/MIGRATION_PLAN.md`
- `docs/APP_MAP.md`
- `docs/RECONSTRUCTION_LOG.md`

Behavior planned:
- Reframed Phase 7 from manual advanced filters into AI lead filter settings.
- Added planned local-only storage key `local:__AI_FILTER_SETTINGS` for Gemini API key and ranking settings.
- Set planned default Gemini model to `gemini-2.5-flash`.
- Preserved the high-quality lead finder prompt as the default editable ranking prompt.
- Reframed Phase 8 as Gemini ranking and strict filtering after GraphQL normalization.
- Defined the structured ranking result fields: `selected`, `score`, `title`, `budget`, `clientSummary`, `reasons`, and `rejectionReason`.
- Recorded that rejected jobs should be hidden from the main feed by default, while selected jobs should be sorted by score and show 2-3 reasons in the UI.
- Added planned source modules: `source/src/ai/geminiClient.ts`, `source/src/ai/jobRankingPrompt.ts`, `source/src/ai/jobRankingTypes.ts`, `source/src/ai/jobRanker.ts`, `source/src/storage/aiFilterSettings.ts`, and optional `source/src/app/pages/FiltersPage.tsx`.

Open questions:
- Exact Gemini API request shape and SDK choice remain implementation details for the future AI ranking phase.
- Whether to expose rejected jobs in Debug is optional and can be deferred.

Next recommended step:
Continue with Phase 5/6 in migration order, then implement the Gemini AI lead filter settings and ranking phases once live job normalization is available.

Verification:
- Documentation-only change. No build required.
- Checked docs for consistent planned storage key, model name, and AI module names.

## 2026-04-29 Phase 5 Session

Goal:
Rebuild background polling orchestration in `source/` while leaving live GraphQL request reconstruction for Phase 6.

Files changed:
- `source/entrypoints/background.ts`
- `source/src/background/alarms.ts`
- `source/src/background/badge.ts`
- `source/src/background/dailyReport.ts`
- `source/src/background/errorClassification.ts`
- `source/src/background/fetchJobsCycle.ts`
- `source/src/background/schedule.ts`
- `source/src/background/subscriptionCheck.ts`
- `source/src/graphql/upworkClient.ts`
- `source/src/shared/messages.ts`
- `docs/APP_MAP.md`
- `docs/MIGRATION_PLAN.md`
- `docs/RECONSTRUCTION_LOG.md`
- `Docx/Context.md`

Behavior recovered:
- Added alarm definitions and restoration for `FETCH_JOBS`, `DAILY_REPORT`, and `CHECK_SUBSCRIPTION`.
- Replaced scaffold alarm logging with background cycle dispatch.
- Added fetch-cycle orchestration with a 30-second overlap guard, enabled-state gate, storage merge, 50-job retention, unseen marking for new jobs, action badge updates, schedule-aware native notifications, and `lastCycleError` persistence.
- Added error classification for unauthenticated, forbidden/rate-limit, network, server, and unknown errors.
- Added local log entries for fetch, daily report, subscription placeholder, and install/update alarm initialization.
- Added runtime message handling for `OPEN_PAGE` and `GET_JOB_DETAILS`.
- Added typed message validators for `OPEN_PAGE` and `PLAY_SOUND`.
- Kept `source/src/graphql/upworkClient.ts` as a typed Phase 6 stub so background polling can compile before live Upwork GraphQL behavior is rebuilt.

Open questions:
- Phase 6 must implement live `getJobs(feedType)` and `getJobDetails(jobId)` behavior.
- Daily report analytics and subscription refresh remain placeholders until their dedicated source modules are reconstructed.
- Schedule parsing currently supports numeric minute values, `Date`, and `HH:mm` style strings; exact compiled schedule encoding may need refinement during settings migration.
- Native notifications do not yet trigger offscreen sound playback.

Next recommended step:
Begin Phase 6 by implementing the Upwork GraphQL client, token acquisition, request builders, response normalization, and job-details request.

Verification:
- `npm run typecheck` passes from `source/`.
- `npm run build` passes from `source/` and outputs `.output/chrome-mv3`.
- WXT build emitted the existing options chunk-size warning, but no build errors.

## 2026-04-29 Phase 6 Session

Goal:
Reconstruct Upwork GraphQL request construction, token-cookie acquisition, response normalization, username lookup, and job-details request in `source/`.

Files changed:
- `source/src/graphql/jobSearchQuery.ts`
- `source/src/graphql/requestBuilder.ts`
- `source/src/graphql/upworkClient.ts`
- `docs/APP_MAP.md`
- `docs/GRAPHQL_NOTES.md`
- `docs/MIGRATION_PLAN.md`
- `docs/RECONSTRUCTION_LOG.md`
- `Docx/Context.md`

Behavior recovered:
- Added recovered query strings for `My Feed / Saved Searches`, `Best Matches`, `Most Recent`, and username lookup.
- Added typed request builder variables for all three feed types.
- Added response-path extraction and normalization into the Phase 3/4 `Job` shape.
- Implemented jobs token acquisition from `/nx/find-work/`, proposal token acquisition from `/nx/proposals/`, and username token acquisition from `/freelancers/settings/`.
- Implemented cookie clearing and one retry when a job fetch is unauthenticated.
- Implemented `getJobs(feedType)`, `getJobDetails(jobId)`, and `getUsername()`.
- Exported feed options, view/proposal URL helpers, and error helper functions matching the compiled API surface.
- Preserved GraphQL request behavior without adding Gemini ranking or advanced filter changes.

Open questions:
- Live network behavior still needs verification with the built source extension loaded in Chrome and an authenticated Upwork session.
- Token-cookie matching may need refinement if Upwork changes cookie path/domain behavior.
- Phase 7/8 Gemini ranking is not implemented yet.

Next recommended step:
Begin Phase 7 by adding Gemini AI lead filter settings and local-only API key storage.

Verification:
- `npm run typecheck` passes from `source/`.
- `npm run build` passes from `source/` and outputs `.output/chrome-mv3`.
- WXT build emitted the existing options chunk-size warning, but no build errors.

## 2026-04-29 Phase 7 Session

Goal:
Implement Gemini AI lead filter settings in `source/`, including local-only API key storage, route/navigation, default prompt/profile, and typed AI scaffolding.

Files changed:
- `source/src/ai/geminiClient.ts`
- `source/src/ai/jobRanker.ts`
- `source/src/ai/jobRankingPrompt.ts`
- `source/src/ai/jobRankingTypes.ts`
- `source/src/app/App.tsx`
- `source/src/app/AppStateContext.tsx`
- `source/src/app/layout/OptionsLayout.tsx`
- `source/src/app/pages/DebugPage.tsx`
- `source/src/app/pages/FiltersPage.tsx`
- `source/src/shared/constants.ts`
- `source/src/storage/aiFilterSettings.ts`
- `source/src/storage/migrations.ts`
- `docs/APP_MAP.md`
- `docs/MIGRATION_PLAN.md`
- `docs/RECONSTRUCTION_LOG.md`
- `Docx/Context.md`

Behavior recovered:
- Added `local:__AI_FILTER_SETTINGS` as a typed local-only storage key for Gemini lead filter settings.
- Added default AI filter settings with ranking disabled, empty API key, model `gemini-2.5-flash`, default niche/profile, and the preserved high-quality lead finder prompt.
- Added migration helpers for AI filter settings.
- Added `/filters` route and "AI filter" navigation item.
- Added AI filter settings page with enable toggle, password-style Gemini API key input, model input, profile prompt, ranking prompt, save action, and prompt reset action that preserves the saved API key.
- Wired AI filter settings into `AppStateProvider` load/save flow.
- Added Debug snapshot support with the API key masked.
- Added typed scaffolds for Phase 8 Gemini ranking modules without making live Gemini requests yet.

Open questions:
- Phase 8 must implement Gemini API request/response parsing and selected-job ranking.
- No validation call is made for the API key in Phase 7.
- The settings page has not been visually tested in a loaded Chrome extension context.

Next recommended step:
Begin Phase 8 by implementing Gemini ranking and strict filtering after GraphQL normalization.

Verification:
- `npm run typecheck` passes from `source/`.
- `npm run build` passes from `source/` and outputs `.output/chrome-mv3`.
- WXT build emitted the existing options chunk-size warning, but no build errors.

## 2026-04-29 Phase 8 Session

Goal:
Implement Gemini ranking and strict filtering after Upwork GraphQL normalization.

Files changed:
- `source/src/ai/geminiClient.ts`
- `source/src/ai/jobRanker.ts`
- `source/src/ai/jobRankingTypes.ts`
- `source/src/background/fetchJobsCycle.ts`
- `source/src/jobs/JobCard.tsx`
- `source/src/jobs/jobTypes.ts`
- `source/wxt.config.ts`
- `docs/APP_MAP.md`
- `docs/MIGRATION_PLAN.md`
- `docs/RECONSTRUCTION_LOG.md`
- `Docx/Context.md`

Behavior recovered:
- Added Gemini `generateContent` integration using structured JSON output.
- Added ranking result schema for `jobId`, `selected`, `score`, `title`, `budget`, `clientSummary`, `reasons`, and `rejectionReason`.
- Added deterministic pre-checks for missing/very short descriptions, very low fixed-price budgets, and very low hourly rates.
- Added `rankAndSelectJobs`, which hides rejected jobs, attaches `aiRanking` metadata to selected jobs, and sorts selected jobs by score descending.
- Integrated ranking into the background fetch cycle after Upwork normalization and before `local:__JOBS` persistence.
- Preserved the previous usable feed if Gemini ranking fails.
- Added Gemini host permission to the generated manifest.
- Updated job cards to show AI match score and 2-3 ranking reasons.

Open questions:
- Live Gemini ranking still needs verification with a real Gemini API key in the loaded Chrome extension.
- The rejected-job debug view is still optional and not implemented.
- Gemini request batching is currently one batch per fetch result set; larger future fetches may need chunking.

Next recommended step:
Begin Phase 9 by migrating the proposal assistant content script.

Verification:
- `npm run typecheck` passes from `source/`.
- `npm run build` passes from `source/` and outputs `.output/chrome-mv3`.
- Generated manifest includes `https://generativelanguage.googleapis.com/*` host permission.
- WXT build emitted the existing options chunk-size warning, but no build errors.

## 2026-04-29 Phase 9 Session

Goal:
Migrate the proposal assistant content script in `source/` for Upwork apply pages.

Files changed:
- `source/entrypoints/content.ts`
- `source/src/content/proposalAssistant.ts`
- `docs/APP_MAP.md`
- `docs/MIGRATION_PLAN.md`
- `docs/RECONSTRUCTION_LOG.md`
- `Docx/Context.md`

Behavior recovered:
- Replaced the content-script placeholder with a native DOM proposal assistant.
- Scoped the content script to `https://*.upwork.com/nx/proposals/job/*/apply*`, matching the baseline manifest.
- Waits for `textarea[aria-labelledby="cover_letter_label"]`.
- Loads saved cover-letter text from `sync:__COVER_LETTER` and pre-fills the Upwork textarea when available.
- Loads the prompt from `sync:__COVER_LETTER_PROMPT`.
- Requests job details through the existing `GET_JOB_DETAILS` runtime message and Phase 6 background API.
- Builds a local prompt-substituted draft using `#{title}` and `#{job_description}`.
- Mounts a lightweight button near `.cover-letter-area`, with fallback to the textarea parent.
- Provides a modal editor for the draft, with Cancel, Save draft, and Insert actions.
- Inserts into Upwork's textarea using the native value setter and bubbling `input` event for React compatibility.
- Adds `Ctrl/Cmd+Enter` to open the assistant and `Escape` to close it.

Open questions:
- Live behavior still needs verification on an authenticated Upwork apply page.
- The old UpToolkit subscription/generation API is not rebuilt; this phase uses local prompt substitution and saved draft insertion.
- Selector resilience may need refinement if Upwork changes `cover_letter_label` or `.cover-letter-area`.

Next recommended step:
Begin Phase 10 by loading `.output/chrome-mv3` in Chrome and verifying options, polling, Gemini ranking, and proposal assistant behavior end to end.

Verification:
- `npm run typecheck` passes from `source/`.
- `npm run build` passes from `source/` and outputs `.output/chrome-mv3`.
- WXT build emitted the existing options chunk-size warning, but no build errors.

## 2026-04-29 Phase 10 Session

Goal:
Run source verification, inspect generated extension output, and create a durable loaded-extension verification checklist.

Files changed:
- `docs/PHASE10_VERIFICATION.md`
- `docs/SCREENSHOT_CHECKLIST.md`
- `docs/MIGRATION_PLAN.md`
- `docs/RECONSTRUCTION_LOG.md`
- `Docx/Context.md`

Verification completed:
- `npm run typecheck` passes from `source/`.
- `npm run build` passes from `source/` and outputs `.output/chrome-mv3`.
- Generated manifest is MV3 with name `Upwork Toolkit - Agent Edition` and version `1.5.48`.
- Generated manifest includes `background.js`, `options.html`, and content script match `https://*.upwork.com/nx/proposals/job/*/apply*`.
- Generated permissions include `idle`, `alarms`, `storage`, `cookies`, `offscreen`, `notifications`, and `declarativeNetRequest`.
- Generated host permissions include `https://*.upwork.com/` and `https://generativelanguage.googleapis.com/*`.
- Generated output includes `request_modifier.json`, icons, and `sound.mp3`.

Open questions:
- Manual Chrome verification is still pending because it requires loading `.output/chrome-mv3` in Chrome.
- Live Upwork GraphQL/polling requires authenticated Upwork cookies.
- Gemini ranking requires a valid Gemini API key.
- Proposal assistant verification requires a real Upwork apply page.

Next recommended step:
Load `source/.output/chrome-mv3` as an unpacked Chrome extension and follow `docs/PHASE10_VERIFICATION.md`.

Verification:
- Static source/build/manifest verification passed.
- WXT build emitted the existing options chunk-size warning, but no build errors.

## 2026-04-29 Remove FAQ And Subscription Session

Goal:
Remove the FAQ and Subscription pages from the source options app.

Files changed:
- `source/entrypoints/background.ts`
- `source/src/app/App.tsx`
- `source/src/app/layout/OptionsLayout.tsx`
- `source/src/app/pages/FaqPage.tsx`
- `source/src/app/pages/SubscriptionPage.tsx`
- `source/src/background/alarms.ts`
- `source/src/background/subscriptionCheck.ts`
- `source/src/shared/constants.ts`
- `docs/APP_MAP.md`
- `docs/PHASE10_VERIFICATION.md`
- `docs/RECONSTRUCTION_LOG.md`
- `docs/SCREENSHOT_CHECKLIST.md`

Behavior changed:
- Removed `/faq` and `/subscription` routes.
- Removed FAQ and Subscription navigation items.
- Deleted FAQ and Subscription placeholder page files.
- Removed `CHECK_SUBSCRIPTION` alarm and subscription placeholder cycle.
- Updated docs and verification checklists to stop asking for FAQ/Subscription checks.

Verification:
- `npm run typecheck` passes from `source/`.
- `npm run build` passes from `source/`.

## 2026-04-29 Remove Mock Jobs Session

Goal:
Remove mock jobs from the source Jobs page so the feed only shows real stored jobs.

Files changed:
- `source/src/app/pages/JobsPage.tsx`
- `source/src/jobs/EmptyJobsState.tsx`
- `source/src/jobs/mockJobs.ts`
- `docs/APP_MAP.md`
- `docs/MIGRATION_PLAN.md`
- `docs/RECONSTRUCTION_LOG.md`

Behavior changed:
- Removed the `Load mock jobs` button from the empty Jobs state.
- Deleted the source mock jobs dataset.
- The Jobs feed now stays empty until the Upwork fetch and Gemini ranking pipeline stores real jobs in `local:__JOBS`.

Verification:
- `npm run typecheck` passes from `source/`.
- `npm run build` passes from `source/`.
- Active source search confirms no `mockJobs`, `Load mock`, `mock-data`, or `stored/mock` references remain outside historical reconstruction notes.
