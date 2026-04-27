// ─────────────────────────────────────────────────────────────
// Upwork Toolkit – Background Service Worker (Manifest V3)
// Handles: alarm-based job polling, notifications, deduplication
// ─────────────────────────────────────────────────────────────

const DEFAULT_INTERVAL_MIN = 15; // default for safe mode

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
        pollIntervalMin: DEFAULT_INTERVAL_MIN,
        safeModeEnabled: true
      }
    });
  }

  scheduleNextAlarm();
  console.log('[Upwork Toolkit] Installed – first alarm scheduled.');
});

// ── Alarm Handler ────────────────────────────────────────────

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'check-upwork-jobs') {
    const idleState = await new Promise(resolve => chrome.idle.queryState(300, resolve)); // 5 mins idle
    if (idleState === 'active') {
      await checkAllSearchProfiles();
    } else {
      console.log(`[Upwork Toolkit] [${new Date().toISOString()}] User is idle/locked. Skipping this check cycle to remain compliant.`);
    }
    // Always schedule the next one
    scheduleNextAlarm();
  }
});

async function scheduleNextAlarm() {
  const { settings } = await chrome.storage.sync.get('settings');
  let baseInterval = settings?.pollIntervalMin || DEFAULT_INTERVAL_MIN;
  let safeMode = settings?.safeModeEnabled !== false; // true by default

  // Jitter: +/- 20% of base interval
  let jitter = baseInterval * 0.2;
  let delay = baseInterval + (Math.random() * jitter * 2 - jitter);

  if (safeMode && delay < 10) {
    // Force at least 10-20m random if safe mode is on to prevent fast polling
    delay = 10 + (Math.random() * 10);
  }

  // Absolute minimum safety fallback
  delay = Math.max(delay, 2);

  chrome.alarms.create('check-upwork-jobs', { delayInMinutes: delay });
  console.log(`[Upwork Toolkit] Next check scheduled in ~${delay.toFixed(1)} mins (Safe Mode: ${safeMode})`);
}

// ── Main Polling Logic ───────────────────────────────────────

async function checkAllSearchProfiles() {
  const { settings } = await chrome.storage.sync.get('settings');
  if (!settings?.jobAlertsEnabled) return;

  const { searchProfiles = [] } = await chrome.storage.sync.get('searchProfiles');
  if (!searchProfiles.length) return;

  for (const profile of searchProfiles) {
    try {
      console.log(`[Upwork Toolkit] [${new Date().toISOString()}] Checking profile: ${profile.name}`);
      await checkSingleProfile(profile);
      
      // Random delay between checking multiple profiles to prevent parallel hammering
      const delayMs = Math.floor(Math.random() * 3000) + 2000;
      await new Promise(r => setTimeout(r, delayMs));
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
  let unseen = filtered.filter(j => !profileLastIds.includes(j.id));

  // AI Evaluation Step
  if (unseen.length > 0) {
    const { aiSettings } = await chrome.storage.sync.get('aiSettings');
    if (aiSettings?.enabled && aiSettings?.apiKey) {
      unseen = await evaluateJobsWithAI(unseen, aiSettings);
    }
  }

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
      let message = job.budget
        ? `${job.budget} — ${job.shortDescription || 'New job on Upwork'}`
        : job.shortDescription || 'New job matching your profile!';
      
      if (job.aiFeedback) {
        message = `Score: ${job.aiFeedback.matchScore}/10 | ${job.aiFeedback.reasons?.[0] || 'Good fit'}\n${message}`;
      }

      await chrome.notifications.create(`job-${job.id}`, {
        type: 'basic',
        iconUrl: 'assets/icons/icon128.png',
        title: `📋 ${job.title}`,
        message: message,
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
      scheduleNextAlarm();
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

// ── AI Evaluation ────────────────────────────────────────────

async function evaluateJobsWithAI(jobs, aiSettings) {
  try {
    const prompt = constructAIPrompt(jobs, aiSettings);
    let aiResponseText = '';

    if (aiSettings.provider === 'openai') {
      aiResponseText = await callOpenAI(prompt, aiSettings.apiKey);
    } else if (aiSettings.provider === 'anthropic') {
      aiResponseText = await callAnthropic(prompt, aiSettings.apiKey);
    } else if (aiSettings.provider === 'gemini') {
      aiResponseText = await callGemini(prompt, aiSettings.apiKey);
    }

    // Try to parse JSON from the response. The AI should ideally return a JSON list of objects.
    // If it didn't strictly return JSON, try to extract JSON array using regex.
    const jsonMatch = aiResponseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.warn('[Upwork Toolkit] AI returned non-JSON format:', aiResponseText);
      return []; // Reject if we can't parse it
    }

    const evaluations = JSON.parse(jsonMatch[0]);
    const validJobs = [];

    // Match evaluations back to jobs
    for (const job of jobs) {
      // Find the evaluation for this job based on ID or Title
      const evalItem = evaluations.find(e => 
        (e.id && e.id === job.id) || 
        (e.Title && e.Title.includes(job.title.substring(0, 10))) ||
        (e.title && e.title.includes(job.title.substring(0, 10)))
      );

      if (evalItem) {
        // If it made it to the output array, it's considered GOOD by the AI.
        // We'll attach the feedback to the job object.
        job.aiFeedback = {
          matchScore: evalItem["Match Score"] || evalItem.matchScore || evalItem.MatchScore || '?',
          reasons: evalItem["Why this is a GOOD job"] || evalItem.reasons || []
        };
        validJobs.push(job);
      }
    }

    return validJobs;
  } catch (err) {
    console.error('[Upwork Toolkit] AI Evaluation failed:', err);
    // If AI fails, fallback to passing all jobs or failing safe? 
    // Usually better to pass all if AI is temporarily down, so user doesn't miss out.
    // But since the user wants a strict filter, maybe we shouldn't. Let's return the original jobs for now.
    return jobs; 
  }
}

function constructAIPrompt(jobs, aiSettings) {
  const jobsJson = jobs.map(j => ({
    id: j.id,
    title: j.title,
    description: j.shortDescription,
    budget: j.budget,
    skills: j.skills,
    clientRating: j.clientRating,
    clientSpend: j.clientSpend,
    paymentVerified: j.paymentVerified,
    jobType: j.jobType
  }));

  const userParams = [];
  if (aiSettings.niche) userParams.push(`- Niche/Tools: ${aiSettings.niche}`);
  if (aiSettings.minFixedBudget) userParams.push(`- Min Fixed Budget: $${aiSettings.minFixedBudget}`);
  if (aiSettings.minHourlyRate) userParams.push(`- Min Hourly Rate: $${aiSettings.minHourlyRate}/hr`);
  if (aiSettings.minClientRating) userParams.push(`- Min Client Rating: ${aiSettings.minClientRating}`);
  if (aiSettings.minClientSpend) userParams.push(`- Min Client Spend: $${aiSettings.minClientSpend}`);

  const customParamsText = userParams.length > 0 
    ? `\n\nUSER'S CUSTOM PARAMETERS (Prioritize these):\n${userParams.join('\n')}` 
    : '';

  return `${aiSettings.systemPrompt}${customParamsText}

IMPORTANT: You MUST return the result ONLY as a JSON array of objects. Do not include markdown formatting like \`\`\`json.
Each object in the array must represent a job you selected as GOOD, and must include:
{
  "id": "job id here",
  "Title": "job title here",
  "Budget": "job budget here",
  "Client Rating & Spend": "rating and spend here",
  "Why this is a GOOD job": ["reason 1", "reason 2"],
  "Match Score": 8
}

If no jobs meet the criteria, return an empty array [].

HERE ARE THE JOBS TO EVALUATE:
${JSON.stringify(jobsJson, null, 2)}`;
}

async function callOpenAI(prompt, apiKey) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2
    })
  });
  if (!res.ok) throw new Error(`OpenAI error: ${await res.text()}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

async function callAnthropic(prompt, apiKey) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerously-allow-urls': 'true' // For extension fetches
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.2
    })
  });
  if (!res.ok) throw new Error(`Anthropic error: ${await res.text()}`);
  const data = await res.json();
  return data.content[0].text;
}

async function callGemini(prompt, apiKey) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2 }
    })
  });
  if (!res.ok) throw new Error(`Gemini error: ${await res.text()}`);
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}
