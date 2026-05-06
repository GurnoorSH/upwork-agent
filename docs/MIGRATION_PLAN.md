# Upwork Toolkit Source Migration Plan

This document is the durable handoff plan for migrating the current unpacked Chrome extension from edited build artifacts into a maintainable source project. Future agents should read this file first, then `Docx/Context.md`, then inspect the current `upwork-toolkit-pro/` build output.

## Current State

- The repository currently contains an unpacked Chrome extension in `upwork-toolkit-pro/`.
- The extension appears to have been built with WXT/Vite and React/MUI.
- Original source files are not present. There is no `src/`, `package.json`, WXT config, or sourcemap files.
- Sourcemap references exist in compiled files, for example `options-BM9_X5gH.js.map`, but the referenced `.map` files are missing.
- `computed_hashes.json` and `verified_contents.json` are Chrome extension integrity metadata. They verify packaged files but cannot reconstruct source.
- A jobs UI patch has already been made directly in `upwork-toolkit-pro/chunks/options-BM9_X5gH.js`.

## Why Migrate

Editing chunks is acceptable for small local patches, but planned work now includes:

- adding a new page for advanced filters,
- changing how GraphQL job requests are built,
- improving scoring and filtering,
- maintaining the extension across multiple AI sessions.

Those changes should live in source code, not compiled chunks.

## Migration Goal

Create a clean source project that can rebuild an equivalent Chrome extension while preserving the current extension behavior. Once the rebuilt output works, future features should be implemented in source and compiled into `upwork-toolkit-pro/` or a new build directory.

## Recommended Target Stack

- WXT for Chrome extension structure.
- React for UI.
- TypeScript for source safety.
- MUI for UI continuity, since the current bundle uses MUI.
- `@wxt-dev/storage` or WXT storage helpers for extension state.
- Chrome Manifest V3 service worker background script.

## Important Working Rule

Do not continue large feature work in compiled chunks unless it is a temporary hotfix. For migration work, keep source changes in a new source project and document every recovered behavior.

## Suggested Directory Structure

```text
upwork-agent/
  docs/
    MIGRATION_PLAN.md
    RECONSTRUCTION_LOG.md
    GRAPHQL_NOTES.md
  source/
    package.json
    wxt.config.ts
    entrypoints/
      background.ts
      options/
        index.html
        main.tsx
      content.ts
      offscreen/
        index.html
        main.ts
    src/
      app/
        App.tsx
        routes.tsx
        layout/
      jobs/
        JobsPage.tsx
        JobCard.tsx
        CompactJobRow.tsx
        JobFeedSummary.tsx
        jobTypes.ts
        jobFilters.ts
        jobScoring.ts
      ai/
        geminiClient.ts
        jobRankingPrompt.ts
        jobRankingTypes.ts
        jobRanker.ts
      graphql/
        upworkClient.ts
        jobSearchQuery.ts
        requestBuilder.ts
      storage/
        aiFilterSettings.ts
        keys.ts
        state.ts
        migrations.ts
      settings/
        SettingsPage.tsx
        AdvancedFiltersPage.tsx
      notifications/
      content/
      shared/
  upwork-toolkit-pro/
    existing unpacked extension output
```

Use `source/` instead of `src/` at repo root so it is obvious which folder is the reconstructed source project.

## Phase 0: Baseline And Safety

1. Record current extension behavior.
2. Keep `upwork-toolkit-pro/` as the working baseline.
3. Do not delete or overwrite current build output.
4. Add `docs/RECONSTRUCTION_LOG.md` and update it after every migration session.
5. Add `docs/GRAPHQL_NOTES.md` for endpoint names, payload shapes, filters, and response field mapping.
6. Load the current extension in Chrome and capture screenshots of:
   - Jobs page with detailed cards.
   - Jobs page with compact list enabled.
   - Empty jobs state.
   - Settings/options pages.
   - Debug/logs pages, if used.
7. Note all current storage keys and default values from the bundle.

Exit criteria:

- Future agents can identify the current behavior from docs/screenshots without rereading the whole compiled bundle.

## Phase 1: Recover App Map From Bundle

1. Inspect route declarations near the bottom of `options-BM9_X5gH.js`.
2. Map compiled route components to intended pages.
3. Create a table in `docs/RECONSTRUCTION_LOG.md`:

```text
Compiled symbol | Source component guess | Purpose | Status
fH              | JobsPage               | Main jobs feed route | partially mapped
k5              | JobCard                | Detailed job card | partially mapped
lH              | JobListItem            | Detailed/compact row switch | partially mapped
cH              | JobList                | Jobs collection render | partially mapped
```

4. Identify storage abstractions and global state shape.
5. Identify background polling logic in `background.js`.
6. Identify GraphQL request construction and response normalization.

Exit criteria:

- There is a documented map of major pages, state stores, job model fields, and background behaviors.

## Phase 2: Scaffold New WXT Project

1. Create `source/package.json`.
2. Install WXT, React, React DOM, TypeScript, MUI, Emotion, and any needed utilities.
3. Create WXT entrypoints:
   - `entrypoints/options/index.html`
   - `entrypoints/options/main.tsx`
   - `entrypoints/background.ts`
   - `entrypoints/content/proposal-assistant.tsx`
4. Create `wxt.config.ts`.
5. Copy icon assets from `upwork-toolkit-pro/icon/`.
6. Recreate `manifest.json` permissions from the existing manifest.
7. Build once and confirm WXT produces a loadable extension.

Exit criteria:

- A blank but loadable WXT extension exists in `source/`.
- Chrome can load the new build output.

## Phase 3: Rebuild State And Storage

1. Define TypeScript types for:
   - `GlobalState`
   - `Job`
   - `Client`
   - `HourlyBudget`
   - filter settings
   - notification settings
2. Recreate storage keys used by the current extension.
3. Add migration helpers so existing local extension state can be read where possible.
4. Build a small storage inspector page or debug panel.
5. Confirm the new extension can read/write basic settings.

Exit criteria:

- Source extension preserves settings across reloads.
- State shape is documented and typed.

## Phase 4: Rebuild Jobs UI

1. Implement `JobsPage`.
2. Implement `JobCard`, `CompactJobRow`, and `JobFeedSummary`.
3. Port the improved UI currently patched in the chunk.
4. Keep the UI dense and operational, not marketing-style.
5. Add responsive behavior for small extension windows.
6. Implement:
   - unread/new highlighting,
   - compact/detailed toggle,
   - empty state,
   - error alerts,
   - auth/captcha/server/network states,
   - click behavior for opening job view/proposal pages.

Exit criteria:

- New source UI visually matches or improves the current patched chunk UI.
- Jobs render from mock data before connecting live GraphQL.

## Phase 5: Rebuild Background Polling

1. Recreate Manifest V3 background service worker.
2. Use `chrome.alarms`, not long-running timers.
3. Recreate job polling cadence.
4. Recreate error handling:
   - unauthenticated,
   - forbidden/captcha,
   - server error,
   - network error,
   - unknown error.
5. Recreate badge and notification behavior.
6. Keep all network requests inside extension permissions and Chrome APIs.

Exit criteria:

- New extension can poll on schedule and update storage.
- Jobs page updates when storage changes.

## Phase 6: GraphQL Request Reconstruction

1. Identify the existing endpoint and request payload shape from the bundle/background script.
2. Document all request variables in `docs/GRAPHQL_NOTES.md`.
3. Create `src/graphql/upworkClient.ts`.
4. Create `src/graphql/jobSearchQuery.ts`.
5. Create `src/graphql/requestBuilder.ts`.
6. Implement a typed request builder for:
   - search text,
   - feed type,
   - sort,
   - category/skills,
   - budget,
   - hourly/fixed,
   - experience level,
   - client attributes,
   - location/timezone if available.
7. Add defensive response parsing and typed normalization.
8. Do not hardcode user-sensitive data. Use only state/settings that the user configured.

Exit criteria:

- GraphQL request construction is centralized and typed.
- Existing behavior is preserved before adding new filters.

## Phase 7: AI Lead Filter Settings

1. Add a new route, likely `/filters`, and add a navigation item in the options layout.
2. Create `source/src/storage/aiFilterSettings.ts` for typed local-only settings stored under `local:__AI_FILTER_SETTINGS`.
3. Store the Gemini API key locally, not in sync storage, so the secret is not synced across browser profiles.
4. Add settings for:
   - Gemini API key,
   - AI ranking enabled/disabled,
   - Gemini model, defaulting to `gemini-2.5-flash`,
   - niche/profile prompt, defaulting to Shopify / UI UX / Figma / Web Design,
   - editable high-quality lead finder prompt.
5. Create planned AI source modules:
   - `source/src/ai/geminiClient.ts`
   - `source/src/ai/jobRankingPrompt.ts`
   - `source/src/ai/jobRankingTypes.ts`
   - `source/src/ai/jobRanker.ts`
6. Preserve the following default high-quality lead finder prompt in `jobRankingPrompt.ts`:

```text
You are an expert Upwork job filtering assistant. Your task is to analyze job postings and return ONLY high-quality, high-conversion opportunities. Ignore low-quality, risky, or time-wasting jobs.

Select ONLY jobs that meet MOST of these GOOD criteria:

Client Quality
- Payment verified
- 4.5+ star rating, preferably 4.7+
- Has spent $1,000+, ideal $10K+
- Has hired before, hire rate 50%+
- Leaves good feedback for freelancers
- Long-term client or repeat hiring pattern

Budget Quality
- Fixed price: $200+, ideal $500+
- Hourly: $15+/hr, ideal $25+/hr+ depending on niche
- Clear willingness to pay for quality
- Not cheap-language driven

Job Clarity
- Clear, detailed description
- Defined scope and deliverables
- Mentions tools/stack such as Shopify, Figma, Webflow, etc.
- Real business context, not vague ideas

Serious Intent Signals
- Mentions timeline or urgency
- Provides reference examples
- Uses professional language
- Not mass-posted or copy-paste job

Project Type
- Long-term or repeat work preferred
- Ongoing support, scaling, or optimization work
- Real business, not test/trial/experiment work

Bonus Signals, high priority
- Mentions expert, top talent, or long-term collaboration
- Open to suggestions or values experience
- Has interviewed or hired recently
- Low competition, less than 15-20 proposals

Strictly reject jobs with these BAD signals:

Low-Quality Clients
- No payment verified
- 0 hires or very low hire rate below 20%
- Poor reviews from freelancers
- History of disputes or bad behavior

Bad Budget
- Extremely low budget, $5-$50 fixed
- Hourly below $10/hr unless clearly high volume or long-term
- Looking for cheapest, low budget, or tight budget language

Vague / Risky Jobs
- No clear scope
- One-line descriptions
- Need a website without details
- No mention of deliverables

Time Wasters
- Test project with no real follow-up
- Commission-only or profit sharing
- Unrealistic expectations, such as build Uber in $100
- Urgent and underpaid combo

Red Flags
- Asking for free work/sample
- Outside payment requests
- Suspicious or spam-like wording
- Too many freelancers hired but no reviews given

If a job has mixed signals, be strict. Only include jobs clearly worth applying to.
Prioritize Shopify / UI UX / Figma / Web Design, mid to high-ticket projects, clients looking for long-term collaboration, and clean professional communication.
```

Exit criteria:

- User can save Gemini API key and AI ranking settings.
- Settings persist across extension reloads.
- The default prompt and niche/profile are editable without code changes.
- No GraphQL request changes are implemented in this phase.

## Phase 8: Gemini Ranking And Strict Filtering

1. Send normalized jobs to Gemini after GraphQL fetch/normalization.
2. Use `gemini-2.5-flash` by default and request structured JSON output.
3. Require one ranking result per analyzed job with:
   - `selected: boolean`
   - `score: number`
   - `title: string`
   - `budget: string`
   - `clientSummary: string`
   - `reasons: string[]`
   - `rejectionReason: string | null`
4. Only persist/display jobs where `selected === true`, sorted by `score` descending.
5. Keep deterministic pre-checks only for obvious rejects and cost control, such as missing title/description or extremely low budget.
6. Update job card UI to show AI match score and 2-3 concise "why this is good" reasons.
7. Hide rejected jobs from the main feed by default. Debug view may expose rejected jobs and rejection reasons later for troubleshooting.
8. Keep raw job data available in debug mode.

Exit criteria:

- Mock jobs can be ranked without GraphQL.
- Low-quality jobs are rejected and hidden from the main jobs feed.
- Selected jobs show AI match score and reasons.
- Gemini failures do not crash polling; they should log an error and preserve the previous usable feed state.

## Phase 9: Content Script Migration

1. Recreate proposal assistant content script.
2. Scope it only to the current matched Upwork apply URLs.
3. Keep DOM integration resilient to Upwork markup changes.
4. Avoid over-broad selectors.
5. Rebuild any proposal generation UI as React/MUI or lightweight DOM components.

Exit criteria:

- Proposal assistant works in the reconstructed extension.

## Phase 10: Verification Workflow

For each migration session:

1. Build the source extension.
2. Load/reload it in Chrome.
3. Test options page.
4. Test background polling.
5. Test storage persistence.
6. Test at least one job click.
7. Run available static checks.
8. Update `docs/RECONSTRUCTION_LOG.md`.

Suggested commands after source exists:

```powershell
cd C:\Users\gurno\Desktop\Upwork\upwork-agent\source
npm install
npm run dev
npm run build
npm run typecheck
```

If commands require network or package installation, get user approval when needed.

## Handoff Protocol For Future Agents

At the start of every new session:

1. Read `docs/MIGRATION_PLAN.md`.
2. Read `docs/RECONSTRUCTION_LOG.md` if it exists.
3. Read `docs/GRAPHQL_NOTES.md` if touching requests or filters.
4. Check `git status`.
5. Identify whether work should happen in `source/` or in `upwork-toolkit-pro/`.
6. Do not edit chunks unless the user asks for a direct hotfix or the source migration has not reached that area yet.
7. Update docs before ending the session.

At the end of every session, write a short log entry:

```text
## YYYY-MM-DD Session

Goal:
Files changed:
Behavior recovered:
Open questions:
Next recommended step:
Verification:
```

## Initial Agent Tasks

Recommended order for the next few sessions:

1. Create `docs/RECONSTRUCTION_LOG.md` and `docs/GRAPHQL_NOTES.md`.
2. Map route/component symbols from `options-BM9_X5gH.js`.
3. Map storage keys and job type shape.
4. Scaffold `source/` WXT project.
5. Rebuild jobs UI from mock data.
6. Rebuild storage and background polling.
7. Rebuild GraphQL client.
8. Add Gemini AI lead filter settings and ranking.

## Risks

- Upwork internal GraphQL endpoints may change.
- Current extension behavior may depend on authenticated browser state.
- Original sourcemaps are missing, so exact source recovery is not possible.
- Rebuilt output may not exactly match current extension behavior on the first pass.
- Chrome Manifest V3 service workers are ephemeral, so polling must use extension-safe APIs.
- Direct chunk edits can be overwritten once source build output replaces `upwork-toolkit-pro/`.

## Decision Record

- Keep current patched chunk as the short-term working extension.
- Start long-term migration in a separate `source/` folder.
- Prefer source changes for significant features.
- Use chunk edits only as temporary hotfixes during migration.

## Completed Phases

- Phase 0 completed in `docs/BASELINE.md`.
- Phase 1 completed in `docs/APP_MAP.md` and `docs/GRAPHQL_NOTES.md`.
- Phase 2 completed in `source/`.
- Phase 3 completed in `source/` with typed WXT storage wrappers and placeholder options persistence.
- Phase 4 completed in `source/` with a typed Jobs page rendering stored jobs, compact and detailed states, empty state, unread status, and job click behavior. Mock job seeding was later removed by request.
- Phase 5 completed in `source/` with alarm-driven background polling orchestration, storage merge behavior, error classification, badges, and notifications. Live GraphQL fetching remains Phase 6.
- Phase 6 completed in `source/` with typed Upwork GraphQL requests, token-cookie acquisition, feed normalization, job-details request, username lookup, and error helpers.
- Phase 7 completed in `source/` with local-only Gemini AI lead filter settings, default prompt/profile storage, route/navigation, and typed AI module scaffolding. Gemini ranking remains Phase 8.
- Phase 8 completed in `source/` with Gemini structured-output ranking, strict selected-job filtering, score/reason display, manifest host permission, and graceful ranking failure handling.
- Phase 9 completed in `source/` with a lightweight proposal assistant content script for Upwork apply pages, job-details lookup, saved draft/prompt insertion, and resilient textarea integration.
- Phase 10 static verification completed in `docs/PHASE10_VERIFICATION.md`; `npm run typecheck`, `npm run build`, and generated manifest/output checks pass. Manual loaded-extension verification remains pending.
