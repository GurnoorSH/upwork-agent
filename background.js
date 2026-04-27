// ─────────────────────────────────────────────────────────────
// Upwork Toolkit – Background Service Worker (Manifest V3)
// Handles: alarm-based job polling, notifications, deduplication
// ─────────────────────────────────────────────────────────────

const DEFAULT_INTERVAL_MIN = 2; // minutes between checks

// ── Lifecycle ────────────────────────────────────────────────

chrome.runtime.onInstalled.addListener(async () => {
  // Set defaults on first install
  const { settings } = await chrome.storage.sync.get('settings');
  if (!settings) {
    await chrome.storage.sync.set({
      settings: {
        jobAlertsEnabled: true,
        autoFillEnabled: true,
        feedHighlightEnabled: true,
        pollIntervalMin: DEFAULT_INTERVAL_MIN
      }
    });
  }

  // Create polling alarm
  const interval = settings?.pollIntervalMin || DEFAULT_INTERVAL_MIN;
  chrome.alarms.create('check-upwork-jobs', { periodInMinutes: interval });

  console.log('[Upwork Toolkit] Installed – alarm created.');
});

// ── Alarm Handler ────────────────────────────────────────────

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'check-upwork-jobs') {
    checkAllSearchProfiles();
  }
});

// ── Main Polling Logic ───────────────────────────────────────

async function checkAllSearchProfiles() {
  const { settings } = await chrome.storage.sync.get('settings');
  if (!settings?.jobAlertsEnabled) return;

  const { searchProfiles = [] } = await chrome.storage.sync.get('searchProfiles');
  if (!searchProfiles.length) return;

  for (const profile of searchProfiles) {
    try {
      await checkSingleProfile(profile);
    } catch (err) {
      console.error(`[Upwork Toolkit] Error checking profile "${profile.name}":`, err);
    }
  }
}

async function checkSingleProfile(profile) {
  const { lastSeenIds = {} } = await chrome.storage.local.get('lastSeenIds');
  const profileLastIds = lastSeenIds[profile.id] || [];

  // ── Strategy: ask content script in an open Upwork tab ──────
  // We try to find an active Upwork tab and ask it to scrape.
  // If no tab is found, we attempt a direct fetch (may fail if
  // Upwork requires cookies / JS rendering).

  let jobs = [];

  const tabs = await chrome.tabs.query({ url: 'https://www.upwork.com/*' });
  if (tabs.length > 0) {
    // Ask the first matching tab's content script to scrape
    try {
      const response = await chrome.tabs.sendMessage(tabs[0].id, {
        type: 'SCRAPE_JOBS',
        url: profile.url,
        filters: profile.filters
      });
      if (response?.jobs) {
        jobs = response.jobs;
      }
    } catch {
      console.warn('[Upwork Toolkit] Content script unreachable, trying direct fetch.');
      jobs = await fetchJobsDirect(profile);
    }
  } else {
    jobs = await fetchJobsDirect(profile);
  }

  // Filter & deduplicate
  const filtered = filterJobs(jobs, profile.filters);
  const unseen = filtered.filter(j => !profileLastIds.includes(j.id));

  if (unseen.length > 0) {
    await sendJobNotifications(unseen, profile);

    // Update last-seen IDs (keep max 500 to avoid storage bloat)
    const merged = Array.from(new Set([...profileLastIds, ...unseen.map(j => j.id)]));
    lastSeenIds[profile.id] = merged.slice(-500);
    await chrome.storage.local.set({ lastSeenIds });

    // Update badge
    const { unseenCount = 0 } = await chrome.storage.local.get('unseenCount');
    const newCount = unseenCount + unseen.length;
    await chrome.storage.local.set({ unseenCount: newCount });
    chrome.action.setBadgeText({ text: String(newCount) });
    chrome.action.setBadgeBackgroundColor({ color: '#14a800' });
  }
}

// ── Direct Fetch (fallback) ──────────────────────────────────

async function fetchJobsDirect(profile) {
  try {
    const res = await fetch(profile.url, { credentials: 'include' });
    if (!res.ok) return [];
    const html = await res.text();
    return parseJobsFromHtml(html);
  } catch (err) {
    console.error('[Upwork Toolkit] Direct fetch failed:', err);
    return [];
  }
}

// ── HTML Parser (simple extraction) ──────────────────────────
// Upwork's DOM changes often — this is best-effort.
// Real-time accuracy relies on the content-script strategy.

function parseJobsFromHtml(html) {
  const jobs = [];
  // Match job links like /jobs/~01abc123
  const idRegex = /\/jobs\/(~[a-zA-Z0-9]+)/g;
  let match;
  const seen = new Set();
  while ((match = idRegex.exec(html)) !== null) {
    const id = match[1];
    if (!seen.has(id)) {
      seen.add(id);
      jobs.push({ id, title: `Job ${id}`, budget: '', shortDescription: '' });
    }
  }
  return jobs;
}

// ── Filtering ────────────────────────────────────────────────

function filterJobs(jobs, filters = {}) {
  if (!filters) return jobs;
  const { keywords = [], minBudget, maxBudget, paymentVerifiedOnly } = filters;

  return jobs.filter(job => {
    // Keyword match
    if (keywords.length) {
      const text = `${job.title} ${job.shortDescription} ${(job.skills || []).join(' ')}`.toLowerCase();
      const hasKeyword = keywords.some(kw => text.includes(kw.toLowerCase()));
      if (!hasKeyword) return false;
    }

    // Budget range
    if (minBudget && job.budgetValue && job.budgetValue < minBudget) return false;
    if (maxBudget && job.budgetValue && job.budgetValue > maxBudget) return false;

    // Payment verified
    if (paymentVerifiedOnly && !job.paymentVerified) return false;

    return true;
  });
}

// ── Notifications ────────────────────────────────────────────

async function sendJobNotifications(jobs, profile) {
  for (const job of jobs.slice(0, 5)) { // max 5 at once to avoid spam
    try {
      await chrome.notifications.create(`job-${job.id}`, {
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: `📋 ${job.title}`,
        message: job.budget
          ? `${job.budget} — ${job.shortDescription || 'New job on Upwork'}`
          : job.shortDescription || 'New job matching your profile!',
        priority: 2
      });
    } catch (err) {
      console.warn('[Upwork Toolkit] Notification error:', err);
    }
  }
}

// Click notification → open job page
chrome.notifications.onClicked.addListener((notifId) => {
  const jobId = notifId.replace('job-', '');
  if (jobId.startsWith('~')) {
    chrome.tabs.create({ url: `https://www.upwork.com/jobs/${jobId}` });
  }
});

// ── Message Listener (from popup / options) ──────────────────

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'FORCE_CHECK') {
    checkAllSearchProfiles().then(() => sendResponse({ ok: true }));
    return true; // async
  }

  if (msg.type === 'UPDATE_ALARM') {
    chrome.alarms.clear('check-upwork-jobs', () => {
      chrome.alarms.create('check-upwork-jobs', {
        periodInMinutes: msg.interval || DEFAULT_INTERVAL_MIN
      });
      sendResponse({ ok: true });
    });
    return true;
  }

  if (msg.type === 'CLEAR_BADGE') {
    chrome.storage.local.set({ unseenCount: 0 });
    chrome.action.setBadgeText({ text: '' });
    sendResponse({ ok: true });
  }
});
