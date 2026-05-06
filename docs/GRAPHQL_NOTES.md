# GraphQL Notes

Use this file to document all Upwork GraphQL request and response details recovered from the current extension.

## Current Status

Phase 6 source reconstruction is implemented in `source/src/graphql/`. The feed queries and normalization branches were recovered from `chunks/_virtual_wxt-plugins-C1xRqpYK.js`.

Known from `request_modifier.json`:

```text
URL filter: https://www.upwork.com/api/graphql/v1
Header override: Origin = https://www.upwork.com
Header override: Referer = https://www.upwork.com/nx/find-work/
```

Known from `background.js`:

```text
getJobs(feedType) is called during the FETCH_JOBS alarm cycle.
getJobDetails(jobId) is called in response to runtime get-job-details messages.
```

The source implementation centralizes query strings in `source/src/graphql/jobSearchQuery.ts`, request/normalization behavior in `source/src/graphql/requestBuilder.ts`, and token/network behavior in `source/src/graphql/upworkClient.ts`.

Live verification on 2026-04-29 showed `My Feed / Saved Searches` results at `data.userSavedSearches.results`. Source parsing supports both this current shape and the older nested shape `data.data.userSavedSearches.results`.

## Current API Client Location

Compiled file:

```text
upwork-toolkit-pro/chunks/_virtual_wxt-plugins-C1xRqpYK.js
```

Compiled API object:

```text
Gd
```

Imported into options/background as:

```text
du / o
```

Exported methods:

```text
getJobDetails
getJobs
getJobsToken
getUsername
getUsernameToken
feedOptions
isUnauthenticatedError
isForbiddenError
isNetworkError
isRateLimitError
isServerError
proposalUrl
shouldIgnoreError
viewUrl
```

## Feed Types

```ts
type FeedType =
  | "My Feed / Saved Searches"
  | "Best Matches"
  | "Most Recent";
```

## Auth/Token Flow

The API client creates an axios instance:

```text
baseURL: https://www.upwork.com
withCredentials: true
adapter: fetch
```

Jobs token:

```text
Cookie path: /nx/find-work/
Trigger request: GET nx/find-work/
```

Proposal/details token:

```text
Cookie path: /nx/proposals/
Trigger request: GET nx/proposals/job/{ciphertext}/apply
```

Username token:

```text
Cookie path: /freelancers/settings/
Trigger request: GET /freelancers/settings/contactInfo
```

Token recovery behavior:

- Reads cookies for a path and chooses the cookie with the latest expiration.
- If missing/expired, clears cookies for that path, triggers the relevant page request, waits about 5 seconds, and retries once.
- If Upwork redirects to login, treats the user as unauthenticated.
- On 401 during job fetch, clears `/nx/find-work/` cookies and retries token acquisition once.

## Job Feed Requests

### My Feed / Saved Searches

Name:
My Feed / Saved Searches

Compiled location:
`_virtual_wxt-plugins-C1xRqpYK.js`, query constant `cd`, branch inside `ts(token, feedType)`.

Endpoint:
`POST https://www.upwork.com/api/graphql/v1`

Headers:

```text
Authorization: bearer {jobsToken.value}
```

Payload:

```js
{
  query: Qe["My Feed / Saved Searches"].query,
  variables: { queryParams: {} }
}
```

Response path:

```text
data.data.userSavedSearches.results
```

Normalization:

```js
{
  ...job,
  __isSeen: false,
  tierText: job.contractorTier,
  type: job.type === "FIXED" ? "Fixed-price" : "Hourly",
  client: {
    ...job.client,
    totalSpent: Number.parseFloat(job.client.totalSpent ? job.client.totalSpent.displayValue : "")
  }
}
```

Notes:

- This is the configurable feed in current settings.
- The current request sends an empty `queryParams` object; advanced source migration can extend this carefully.

### Best Matches

Name:
Best Matches

Compiled location:
`_virtual_wxt-plugins-C1xRqpYK.js`, query constant `ud`, branch inside `ts(token, feedType)`.

Endpoint:
`POST https://www.upwork.com/api/graphql/v1`

Headers:

```text
Authorization: bearer {jobsToken.value}
```

Payload:

```js
{
  query: Qe["Best Matches"].query,
  variables: { fromTime: 0, toTime: 30 }
}
```

Response path:

```text
data.data.bestMatchJobsFeed.results
```

Normalization:

```js
{
  ...job,
  __isSeen: false,
  type: job.type === 1 ? "Fixed-price" : "Hourly",
  amount: { ...job.amount, amount: String(job.amount.amount) }
}
```

### Most Recent

Name:
Most Recent

Compiled location:
`_virtual_wxt-plugins-C1xRqpYK.js`, query constant `ld`, branch inside `ts(token, feedType)`.

Endpoint:
`POST https://www.upwork.com/api/graphql/v1`

Headers:

```text
Authorization: bearer {jobsToken.value}
X-Requested-With: XMLHttpRequest
```

Payload:

```js
{
  query: Qe["Most Recent"].query,
  variables: { limit: 10 }
}
```

Response path:

```text
data.data.mostRecentJobsFeed.results
```

Normalization:

```js
{
  ...job,
  __isSeen: false,
  durationLabel: job.duration,
  clientRelation: null,
  renewedOn: job.publishedOn,
  type: job.type === 1 ? "Fixed-price" : "Hourly",
  amount: { ...job.amount, amount: String(job.amount.amount) }
}
```

## Job Details Request

Name:
Job details / proposal check

Compiled function:
`dd`

Endpoint:

```text
GET https://www.upwork.com/ab/proposals/api/v4/check/{ciphertext}?payload=1
```

Headers:

```text
Authorization: bearer {proposalToken.value}
```

Used by:

- Background runtime message handler for `GET_JOB_DETAILS`.
- Content script proposal assistant likely requests this data.

## Username Request

Name:
Username lookup for daily report hash

Compiled function:
`gd`

Endpoint:

```text
POST https://www.upwork.com/api/graphql/v1
```

Payload query:

```graphql
query {
  user {
    id
    rid
    nid
  }
}
```

Response value:

```text
data.data.user.nid
```

The background hashes this username with SHA-256 before analytics.

## Error Classification

Recovered helpers:

```text
401 or UNAUTHENTICATED message -> UNAUTHENTICATED
403 -> FORBIDDEN
429 -> FORBIDDEN/rate-limit path in background classification
ERR_NETWORK -> NETWORK_ERROR
status >= 500 -> SERVER_ERROR
400, 409, 499 -> shouldIgnoreError
fallback -> OTHER
```

## What To Capture

For every discovered request:

```text
Name:
Compiled location:
Endpoint:
Method:
Headers:
Operation name:
Variables:
Query/mutation shape:
Response path:
Normalization behavior:
Errors handled:
Used by:
Notes:
```

## Planned Source Files

```text
source/src/graphql/upworkClient.ts
source/src/graphql/jobSearchQuery.ts
source/src/graphql/requestBuilder.ts
source/src/jobs/jobTypes.ts
source/src/jobs/jobFilters.ts
source/src/jobs/jobScoring.ts
```

## Rules

- Centralize GraphQL request construction in source.
- Keep request variables typed.
- Document which filters are server-side and which filters are local-only.
- Do not hardcode user-sensitive values.
- Preserve existing behavior before adding new filtering behavior.

## Phase 6 Verification Notes

- `npm run typecheck` passes from `source/`.
- `npm run build` passes from `source/`.
- Live request verification still requires loading `.output/chrome-mv3` in Chrome with an authenticated Upwork session.
- The implementation preserves the current baseline behavior before Gemini ranking or advanced filters are added.
