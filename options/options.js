// ─────────────────────────────────────────────────────────────
// Upwork Toolkit – Options Page Script
// Manages: search profiles, templates, feed filters, settings
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initTabNavigation();
  initProfilesTab();
  initTemplatesTab();
  initFiltersTab();
  initAIFiltersTab();
  initSettingsTab();
});

// ══════════════════════════════════════════════════════════════
// Tab Navigation
// ══════════════════════════════════════════════════════════════

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
// Search Profiles
// ══════════════════════════════════════════════════════════════

function initProfilesTab() {
  const modal = document.getElementById('profileModal');
  const form = document.getElementById('profileForm');

  document.getElementById('btnAddProfile').addEventListener('click', () => {
    openProfileModal();
  });

  document.getElementById('profileModalClose').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  document.getElementById('profileCancel').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.querySelector('.modal-backdrop').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveProfile();
    modal.classList.add('hidden');
    await renderProfiles();
    showToast('Search profile saved!');
  });

  renderProfiles();
}

function openProfileModal(profile = null) {
  const modal = document.getElementById('profileModal');
  const title = document.getElementById('profileModalTitle');

  if (profile) {
    title.textContent = 'Edit Search Profile';
    document.getElementById('profileId').value = profile.id;
    document.getElementById('profileName').value = profile.name;
    document.getElementById('profileUrl').value = profile.url;
    document.getElementById('filterKeywords').value = (profile.filters?.keywords || []).join(', ');
    document.getElementById('filterMinBudget').value = profile.filters?.minBudget || '';
    document.getElementById('filterMaxBudget').value = profile.filters?.maxBudget || '';
    document.getElementById('filterMinRating').value = profile.filters?.minClientRating || '';
    document.getElementById('filterPaymentVerified').checked = profile.filters?.paymentVerifiedOnly || false;
  } else {
    title.textContent = 'Add Search Profile';
    document.getElementById('profileForm').reset();
    document.getElementById('profileId').value = '';
  }

  modal.classList.remove('hidden');
}

async function saveProfile() {
  const { searchProfiles = [] } = await chrome.storage.sync.get('searchProfiles');

  const id = document.getElementById('profileId').value || generateId();
  const keywords = document.getElementById('filterKeywords').value
    .split(',').map(k => k.trim()).filter(Boolean);

  const profile = {
    id,
    name: document.getElementById('profileName').value.trim(),
    url: document.getElementById('profileUrl').value.trim(),
    filters: {
      keywords,
      minBudget: parseFloat(document.getElementById('filterMinBudget').value) || undefined,
      maxBudget: parseFloat(document.getElementById('filterMaxBudget').value) || undefined,
      minClientRating: parseFloat(document.getElementById('filterMinRating').value) || undefined,
      paymentVerifiedOnly: document.getElementById('filterPaymentVerified').checked
    }
  };

  const idx = searchProfiles.findIndex(p => p.id === id);
  if (idx >= 0) {
    searchProfiles[idx] = profile;
  } else {
    searchProfiles.push(profile);
  }

  await chrome.storage.sync.set({ searchProfiles });
}

async function deleteProfile(id) {
  if (!confirm('Delete this search profile?')) return;
  const { searchProfiles = [] } = await chrome.storage.sync.get('searchProfiles');
  const filtered = searchProfiles.filter(p => p.id !== id);
  await chrome.storage.sync.set({ searchProfiles: filtered });
  await renderProfiles();
  showToast('Profile deleted.');
}

async function renderProfiles() {
  const { searchProfiles = [] } = await chrome.storage.sync.get('searchProfiles');
  const list = document.getElementById('profilesList');
  const empty = document.getElementById('profilesEmpty');

  if (!searchProfiles.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');

  list.innerHTML = searchProfiles.map(p => `
    <div class="card-item" data-id="${p.id}">
      <div class="card-info">
        <h4>${escapeHtml(p.name)}</h4>
        <p>${escapeHtml(p.url)}</p>
        ${p.filters?.keywords?.length ? `
          <div class="card-tags">
            ${p.filters.keywords.map(k => `<span class="card-tag">${escapeHtml(k)}</span>`).join('')}
          </div>
        ` : ''}
      </div>
      <div class="card-actions">
        <button class="card-btn edit" title="Edit" data-action="edit" data-id="${p.id}">✏️</button>
        <button class="card-btn delete" title="Delete" data-action="delete" data-id="${p.id}">🗑️</button>
      </div>
    </div>
  `).join('');

  // Bind card actions
  list.querySelectorAll('[data-action="edit"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const profile = searchProfiles.find(p => p.id === btn.dataset.id);
      if (profile) openProfileModal(profile);
    });
  });

  list.querySelectorAll('[data-action="delete"]').forEach(btn => {
    btn.addEventListener('click', () => deleteProfile(btn.dataset.id));
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
  const { feedFilters = {} } = await chrome.storage.sync.get('feedFilters');

  document.getElementById('feedKeywords').value = (feedFilters.keywords || []).join(', ');
  document.getElementById('feedMinBudget').value = feedFilters.minBudget || '';

  document.getElementById('feedFiltersForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const keywords = document.getElementById('feedKeywords').value
      .split(',').map(k => k.trim()).filter(Boolean);
    const minBudget = parseFloat(document.getElementById('feedMinBudget').value) || undefined;

    await chrome.storage.sync.set({
      feedFilters: { keywords, minBudget }
    });

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

  document.getElementById('aiEnabled').checked = aiSettings.enabled || false;
  document.getElementById('aiProvider').value = aiSettings.provider || 'openai';
  document.getElementById('aiApiKey').value = aiSettings.apiKey || '';
  document.getElementById('aiMinFixedBudget').value = aiSettings.minFixedBudget || '';
  document.getElementById('aiMinHourlyRate').value = aiSettings.minHourlyRate || '';
  document.getElementById('aiMinClientRating').value = aiSettings.minClientRating || '';
  document.getElementById('aiMinClientSpend').value = aiSettings.minClientSpend || '';
  document.getElementById('aiNiche').value = aiSettings.niche || '';
  document.getElementById('aiSystemPrompt').value = aiSettings.systemPrompt || defaultPrompt;

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

    showToast('AI filtering settings saved!');
  });
}

// ══════════════════════════════════════════════════════════════
// General Settings
// ══════════════════════════════════════════════════════════════

async function initSettingsTab() {
  const { settings = {} } = await chrome.storage.sync.get('settings');

  document.getElementById('safeModeEnabled').checked = settings.safeModeEnabled !== false; // Default to true
  document.getElementById('pollInterval').value = String(settings.pollIntervalMin || 15);

  document.getElementById('settingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const interval = parseInt(document.getElementById('pollInterval').value, 10);
    const safeMode = document.getElementById('safeModeEnabled').checked;
    
    const newSettings = { ...settings, pollIntervalMin: interval, safeModeEnabled: safeMode };
    await chrome.storage.sync.set({ settings: newSettings });

    // Update alarm interval
    await chrome.runtime.sendMessage({ type: 'UPDATE_ALARM', interval, safeMode });

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
