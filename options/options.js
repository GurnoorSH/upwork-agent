// ─────────────────────────────────────────────────────────────
// Upwork Toolkit – Options Page Script
// Manages: search profiles, templates, feed filters, settings
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initTabNavigation();
  initJobsTab();
  initFeedsTab();
  initTemplatesTab();
  initFiltersTab();
  initAIFiltersTab();
  initSettingsTab();
});

// ══════════════════════════════════════════════════════════════
// Tab Navigation
// ══════════════════════════════════════════════════════════════

function setupFormChangeTracker(formId, getFormDataObjFn) {
  const form = document.getElementById(formId);
  if (!form) return;
  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;

  let initialDataStr = JSON.stringify(getFormDataObjFn());

  function checkState() {
    const currentDataStr = JSON.stringify(getFormDataObjFn());
    btn.disabled = currentDataStr === initialDataStr;
  }

  checkState();

  form.addEventListener('input', checkState);
  form.addEventListener('change', checkState);

  return function updateInitialState() {
    initialDataStr = JSON.stringify(getFormDataObjFn());
    checkState();
  };
}

function initTabNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabPanels = document.querySelectorAll('.tab-panel');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = item.dataset.tab;

      navItems.forEach(n => n.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      document.getElementById(`tab-${tabId}`).classList.add('active');
    });
  });
}

// ══════════════════════════════════════════════════════════════
// Job Feed
// ══════════════════════════════════════════════════════════════

function initJobsTab() {
  const list = document.getElementById('jobFeed');
  const empty = document.getElementById('jobFeedEmpty');
  
  const diagStatus = document.getElementById('diagStatus');
  const diagNextFetch = document.getElementById('diagNextFetch');
  const diagError = document.getElementById('diagError');

  let countdownInterval = null;

  function updateNextFetchCountdown() {
    chrome.alarms.get('check-upwork-jobs', (alarm) => {
      if (!alarm) {
        diagNextFetch.textContent = 'Not scheduled';
        return;
      }
      const now = Date.now();
      const diffMs = alarm.scheduledTime - now;
      if (diffMs <= 0) {
        diagNextFetch.textContent = 'Starting...';
        return;
      }
      
      const mins = Math.floor(diffMs / 60000);
      const secs = Math.floor((diffMs % 60000) / 1000);
      diagNextFetch.textContent = `in ${mins}m ${secs}s`;
    });
  }

  function startDiagnostics() {
    updateNextFetchCountdown();
    countdownInterval = setInterval(updateNextFetchCountdown, 1000);

    chrome.storage.local.get(['syncStatus', 'lastFetchError'], (res) => {
      diagStatus.textContent = res.syncStatus || 'Idle';
      if (res.syncStatus === 'Idle') {
        diagStatus.className = 'diagnostic-value success';
      } else {
        diagStatus.className = 'diagnostic-value warning';
      }

      if (res.lastFetchError) {
        diagError.textContent = res.lastFetchError;
        diagError.className = 'diagnostic-value error';
      } else {
        diagError.textContent = 'None';
        diagError.className = 'diagnostic-value success';
      }
    });
  }

  function renderJobs(jobs) {
    if (!jobs || !jobs.length) {
      list.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }

    empty.classList.add('hidden');

    list.innerHTML = jobs.map(j => `
      <div class="card-item job-card" data-url="https://www.upwork.com/jobs/${j.id}">
        <div class="card-info" style="width: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <h4 style="margin: 0; font-size: 15px;">${escapeHtml(j.title)}</h4>
            ${j.budget ? `<span style="color: var(--accent); font-weight: 700; white-space: nowrap; margin-left: 12px;">${escapeHtml(j.budget)}</span>` : ''}
          </div>
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <span class="card-badge" style="background: rgba(255,255,255,0.05); border: none; color: var(--text-secondary);">${escapeHtml(j.sourceFeed || 'Feed')}</span>
            ${j.aiFeedback ? `<span class="card-badge" style="background: rgba(245, 166, 35, 0.1); border: 1px solid rgba(245, 166, 35, 0.2); color: #f5a623;">AI Score: ${j.aiFeedback.matchScore}/10</span>` : ''}
          </div>
          <p style="max-width: 100%; white-space: normal; line-height: 1.5; color: var(--text-secondary);">${escapeHtml((j.shortDescription || '').slice(0, 200))}...</p>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.job-card').forEach(card => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        chrome.tabs.create({ url: card.dataset.url });
      });
    });
  }

  // Load initial state
  chrome.storage.local.get('unseenJobs', ({ unseenJobs = [] }) => {
    renderJobs(unseenJobs);
  });
  startDiagnostics();

  // Listen for changes
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      if (changes.unseenJobs) {
        renderJobs(changes.unseenJobs.newValue);
      }
      if (changes.syncStatus) {
        const stat = changes.syncStatus.newValue || 'Idle';
        diagStatus.textContent = stat;
        diagStatus.className = stat === 'Idle' ? 'diagnostic-value success' : 'diagnostic-value warning';
      }
      if (changes.lastFetchError) {
        const err = changes.lastFetchError.newValue;
        if (err) {
          diagError.textContent = err;
          diagError.className = 'diagnostic-value error';
        } else {
          diagError.textContent = 'None';
          diagError.className = 'diagnostic-value success';
        }
      }
    }
  });

  document.getElementById('btnClearJobs').addEventListener('click', async () => {
    if (confirm('Clear the job feed?')) {
      await chrome.runtime.sendMessage({ type: 'CLEAR_BADGE' });
      renderJobs([]);
      showToast('Job feed cleared.');
    }
  });
}

// ══════════════════════════════════════════════════════════════
// Feed Sources
// ══════════════════════════════════════════════════════════════

function initFeedsTab() {
  let updateBtnState = () => {};

  chrome.storage.sync.get('feedSources', ({ feedSources = {} }) => {
    document.getElementById('feedMyFeed').checked = feedSources.myFeed !== false; // default true
    document.getElementById('feedBestMatches').checked = feedSources.bestMatches || false;
    document.getElementById('feedMostRecent').checked = feedSources.mostRecent || false;
    
    updateBtnState = setupFormChangeTracker('feedSourcesForm', () => ({
      myFeed: document.getElementById('feedMyFeed').checked,
      bestMatches: document.getElementById('feedBestMatches').checked,
      mostRecent: document.getElementById('feedMostRecent').checked
    }));
  });

  document.getElementById('feedSourcesForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const feedSources = {
      myFeed: document.getElementById('feedMyFeed').checked,
      bestMatches: document.getElementById('feedBestMatches').checked,
      mostRecent: document.getElementById('feedMostRecent').checked
    };

    await chrome.storage.sync.set({ feedSources });
    updateBtnState();
    showToast('Feed sources saved!');
  });
}

// ══════════════════════════════════════════════════════════════
// Proposal Templates
// ══════════════════════════════════════════════════════════════

function initTemplatesTab() {
  const modal = document.getElementById('templateModal');
  const form = document.getElementById('templateForm');

  document.getElementById('btnAddTemplate').addEventListener('click', () => {
    openTemplateModal();
  });

  document.getElementById('templateModalClose').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  document.getElementById('templateCancel').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.querySelector('.modal-backdrop').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveTemplate();
    modal.classList.add('hidden');
    await renderTemplates();
    showToast('Template saved!');
  });

  renderTemplates();
}

function openTemplateModal(template = null) {
  const modal = document.getElementById('templateModal');
  const title = document.getElementById('templateModalTitle');

  if (template) {
    title.textContent = 'Edit Template';
    document.getElementById('templateId').value = template.id;
    document.getElementById('templateName').value = template.name;
    document.getElementById('templateTags').value = (template.categoryTags || []).join(', ');
    document.getElementById('templateBody').value = template.body;
    document.getElementById('templateDefault').checked = false; // Will check below
  } else {
    title.textContent = 'Add Template';
    document.getElementById('templateForm').reset();
    document.getElementById('templateId').value = '';
  }

  modal.classList.remove('hidden');
}

async function saveTemplate() {
  const { templates = [] } = await chrome.storage.sync.get('templates');

  const id = document.getElementById('templateId').value || generateId();
  const tags = document.getElementById('templateTags').value
    .split(',').map(t => t.trim()).filter(Boolean);
  const isDefault = document.getElementById('templateDefault').checked;

  const template = {
    id,
    name: document.getElementById('templateName').value.trim(),
    body: document.getElementById('templateBody').value,
    categoryTags: tags
  };

  const idx = templates.findIndex(t => t.id === id);
  if (idx >= 0) {
    templates[idx] = template;
  } else {
    templates.push(template);
  }

  await chrome.storage.sync.set({ templates });

  if (isDefault) {
    await chrome.storage.sync.set({ selectedTemplateId: id });
  }
}

async function deleteTemplate(id) {
  if (!confirm('Delete this template?')) return;
  const { templates = [] } = await chrome.storage.sync.get('templates');
  const filtered = templates.filter(t => t.id !== id);
  await chrome.storage.sync.set({ templates: filtered });
  await renderTemplates();
  showToast('Template deleted.');
}

async function renderTemplates() {
  const { templates = [], selectedTemplateId } = await chrome.storage.sync.get(['templates', 'selectedTemplateId']);
  const list = document.getElementById('templatesList');
  const empty = document.getElementById('templatesEmpty');

  if (!templates.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');

  list.innerHTML = templates.map(t => `
    <div class="card-item" data-id="${t.id}">
      <div class="card-info">
        <h4>
          ${escapeHtml(t.name)}
          ${t.id === selectedTemplateId ? '<span class="card-badge">Default</span>' : ''}
        </h4>
        <p>${escapeHtml(t.body.slice(0, 100))}${t.body.length > 100 ? '…' : ''}</p>
        ${t.categoryTags?.length ? `
          <div class="card-tags">
            ${t.categoryTags.map(tag => `<span class="card-tag">${escapeHtml(tag)}</span>`).join('')}
          </div>
        ` : ''}
      </div>
      <div class="card-actions">
        <button class="card-btn edit" title="Edit" data-action="edit-tpl" data-id="${t.id}">✏️</button>
        <button class="card-btn delete" title="Delete" data-action="delete-tpl" data-id="${t.id}">🗑️</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('[data-action="edit-tpl"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const template = templates.find(t => t.id === btn.dataset.id);
      if (template) openTemplateModal(template);
    });
  });

  list.querySelectorAll('[data-action="delete-tpl"]').forEach(btn => {
    btn.addEventListener('click', () => deleteTemplate(btn.dataset.id));
  });
}

// ══════════════════════════════════════════════════════════════
// Feed Filters
// ══════════════════════════════════════════════════════════════

async function initFiltersTab() {
  let updateBtnState = () => {};

  chrome.storage.sync.get('feedFilters', ({ feedFilters = {} }) => {
    document.getElementById('feedKeywords').value = (feedFilters.keywords || []).join(', ');
    document.getElementById('feedMinBudget').value = feedFilters.minBudget || '';

    updateBtnState = setupFormChangeTracker('feedFiltersForm', () => ({
      keywords: document.getElementById('feedKeywords').value.trim(),
      minBudget: document.getElementById('feedMinBudget').value
    }));
  });

  document.getElementById('feedFiltersForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const keywords = document.getElementById('feedKeywords').value
      .split(',').map(k => k.trim()).filter(Boolean);
    const minBudget = parseFloat(document.getElementById('feedMinBudget').value) || undefined;

    await chrome.storage.sync.set({
      feedFilters: { keywords, minBudget }
    });

    updateBtnState();
    showToast('Feed filters saved!');
  });
}

// ══════════════════════════════════════════════════════════════
// AI Filters
// ══════════════════════════════════════════════════════════════

async function initAIFiltersTab() {
  const { aiSettings = {} } = await chrome.storage.sync.get('aiSettings');

  const defaultPrompt = `You are an expert Upwork job filtering assistant. Your task is to analyze job postings and return ONLY high-quality, high-conversion opportunities. Ignore low-quality, risky, or time-wasting jobs.

Select ONLY jobs that meet MOST of these GOOD criteria:

Client Quality
Payment verified
4.5+ star rating (preferably 4.7+)
Has spent $1,000+ (ideal: $10K+)
Has hired before (hire rate 50%+)
Leaves good feedback for freelancers
Long-term client or repeat hiring pattern

Budget Quality
Fixed price: $200+ (ideal: $500+)
Hourly: $15+/hr (ideal: $25+/hr+ depending on niche)
Clear willingness to pay for quality
Not “cheap” language

Job Clarity
Clear, detailed description
Defined scope and deliverables
Mentions tools/stack (Shopify, Figma, Webflow, etc.)
Real business context (not vague ideas)

Serious Intent Signals
Mentions timeline or urgency
Provides reference examples
Uses professional language
Not mass-posted or copy-paste job

Project Type
Long-term or repeat work preferred
Ongoing support, scaling, or optimization work
Real business (not “test”, “trial”, or “experiment”)

Bonus Signals (HIGH priority)
Mentions “expert”, “top talent”, or “long-term collaboration”
Open to suggestions / values experience
Has interviewed or hired recently
Low competition (less than 15–20 proposals)

STRICTLY REJECT jobs with these BAD signals:

Low-Quality Clients
No payment verified
0 hires or very low hire rate (<20%)
Poor reviews from freelancers
History of disputes or bad behavior

Bad Budget
Extremely low budget ($5–$50 fixed)
Hourly < $10/hr (unless clearly high volume/long-term)
“Looking for cheapest”, “low budget”, “tight budget”

Vague / Risky Jobs
No clear scope
One-line descriptions
“Need a website” without details
No mention of deliverables

Time Wasters
“Test project” with no real follow-up
“Commission-only” or “profit sharing”
Unrealistic expectations (e.g., “build Uber in $100”)
Urgent + underpaid combo

Red Flags
Asking for free work/sample
Outside payment requests
Suspicious or spam-like wording
Too many freelancers hired but no reviews given

Output Format
For each selected job, return:
Title
Budget
Client Rating & Spend
Why this is a GOOD job (2–3 bullet points)
Match Score (1–10)

Important Rule
If a job has mixed signals, be strict — only include jobs that are clearly worth applying to.`;

  let updateBtnState = () => {};

  chrome.storage.sync.get('aiSettings', ({ aiSettings = {} }) => {
    document.getElementById('aiEnabled').checked = aiSettings.enabled || false;
    document.getElementById('aiProvider').value = aiSettings.provider || 'openai';
    document.getElementById('aiApiKey').value = aiSettings.apiKey || '';
    document.getElementById('aiMinFixedBudget').value = aiSettings.minFixedBudget || '';
    document.getElementById('aiMinHourlyRate').value = aiSettings.minHourlyRate || '';
    document.getElementById('aiMinClientRating').value = aiSettings.minClientRating || '';
    document.getElementById('aiMinClientSpend').value = aiSettings.minClientSpend || '';
    document.getElementById('aiNiche').value = aiSettings.niche || '';
    document.getElementById('aiSystemPrompt').value = aiSettings.systemPrompt || defaultPrompt;

    updateBtnState = setupFormChangeTracker('aiFiltersForm', () => ({
      enabled: document.getElementById('aiEnabled').checked,
      provider: document.getElementById('aiProvider').value,
      apiKey: document.getElementById('aiApiKey').value.trim(),
      minFixedBudget: document.getElementById('aiMinFixedBudget').value,
      minHourlyRate: document.getElementById('aiMinHourlyRate').value,
      minClientRating: document.getElementById('aiMinClientRating').value,
      minClientSpend: document.getElementById('aiMinClientSpend').value,
      niche: document.getElementById('aiNiche').value.trim(),
      systemPrompt: document.getElementById('aiSystemPrompt').value.trim()
    }));
  });

  document.getElementById('aiFiltersForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const enabled = document.getElementById('aiEnabled').checked;
    const provider = document.getElementById('aiProvider').value;
    const apiKey = document.getElementById('aiApiKey').value.trim();
    const minFixedBudget = parseFloat(document.getElementById('aiMinFixedBudget').value) || undefined;
    const minHourlyRate = parseFloat(document.getElementById('aiMinHourlyRate').value) || undefined;
    const minClientRating = parseFloat(document.getElementById('aiMinClientRating').value) || undefined;
    const minClientSpend = parseFloat(document.getElementById('aiMinClientSpend').value) || undefined;
    const niche = document.getElementById('aiNiche').value.trim();
    const systemPrompt = document.getElementById('aiSystemPrompt').value.trim();

    await chrome.storage.sync.set({
      aiSettings: {
        enabled,
        provider,
        apiKey,
        minFixedBudget,
        minHourlyRate,
        minClientRating,
        minClientSpend,
        niche,
        systemPrompt
      }
    });

    updateBtnState();
    showToast('AI filtering settings saved!');
  });
}

// ══════════════════════════════════════════════════════════════
// General Settings
// ══════════════════════════════════════════════════════════════

async function initSettingsTab() {
  let settings = {};
  let updateBtnState = () => {};

  chrome.storage.sync.get('settings', (result) => {
    settings = result.settings || {};
    document.getElementById('safeModeEnabled').checked = settings.safeModeEnabled !== false; // Default to true
    document.getElementById('pollInterval').value = String(settings.pollIntervalMin || 15);

    updateBtnState = setupFormChangeTracker('settingsForm', () => ({
      interval: document.getElementById('pollInterval').value,
      safeMode: document.getElementById('safeModeEnabled').checked
    }));
  });

  document.getElementById('settingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const interval = parseInt(document.getElementById('pollInterval').value, 10);
    const safeMode = document.getElementById('safeModeEnabled').checked;
    
    const newSettings = { ...settings, pollIntervalMin: interval, safeModeEnabled: safeMode };
    await chrome.storage.sync.set({ settings: newSettings });

    // Update alarm interval
    await chrome.runtime.sendMessage({ type: 'UPDATE_ALARM', interval, safeMode });

    updateBtnState();
    showToast('Settings saved!');
  });

  // Export
  document.getElementById('btnExport').addEventListener('click', async () => {
    const data = await chrome.storage.sync.get(null);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'upwork-toolkit-settings.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Settings exported!');
  });

  // Import
  const importFile = document.getElementById('importFile');
  document.getElementById('btnImport').addEventListener('click', () => {
    importFile.click();
  });

  importFile.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      await chrome.storage.sync.set(data);
      showToast('Settings imported! Reloading…');
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      showToast('Invalid settings file.');
    }
  });

  // Reset
  document.getElementById('btnReset').addEventListener('click', async () => {
    if (!confirm('This will delete ALL settings, profiles, and templates. Continue?')) return;
    await chrome.storage.sync.clear();
    await chrome.storage.local.clear();
    showToast('All data cleared. Reloading…');
    setTimeout(() => window.location.reload(), 1000);
  });
}

// ══════════════════════════════════════════════════════════════
// Utilities
// ══════════════════════════════════════════════════════════════

function generateId() {
  return 'id_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 3000);
}
