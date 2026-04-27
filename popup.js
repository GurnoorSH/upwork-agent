// ─────────────────────────────────────────────────────────────
// Upwork Toolkit – Popup Script
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  const toggleAlerts = document.getElementById('toggleAlerts');
  const toggleAutoFill = document.getElementById('toggleAutoFill');
  const toggleHighlight = document.getElementById('toggleHighlight');
  const btnCheckNow = document.getElementById('btnCheckNow');
  const btnClearBadge = document.getElementById('btnClearBadge');
  const btnOptions = document.getElementById('btnOptions');
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const statusCount = document.getElementById('statusCount');

  // ── Load current state ─────────────────────────────────────

  const { settings = {} } = await chrome.storage.sync.get('settings');
  const { unseenCount = 0 } = await chrome.storage.local.get('unseenCount');
  const { searchProfiles = [] } = await chrome.storage.sync.get('searchProfiles');

  toggleAlerts.checked = settings.jobAlertsEnabled !== false;
  toggleAutoFill.checked = settings.autoFillEnabled !== false;
  toggleHighlight.checked = settings.feedHighlightEnabled !== false;

  statusCount.textContent = unseenCount;

  if (!searchProfiles.length) {
    statusDot.classList.remove('active');
    statusText.textContent = 'No search profiles configured';
  } else if (!settings.jobAlertsEnabled) {
    statusDot.classList.remove('active');
    statusText.textContent = 'Alerts paused';
  } else {
    statusDot.classList.add('active');
    statusText.textContent = `Monitoring ${searchProfiles.length} profile${searchProfiles.length > 1 ? 's' : ''}`;
  }

  // ── Toggle Handlers ────────────────────────────────────────

  async function saveToggle() {
    const newSettings = {
      ...settings,
      jobAlertsEnabled: toggleAlerts.checked,
      autoFillEnabled: toggleAutoFill.checked,
      feedHighlightEnabled: toggleHighlight.checked
    };
    await chrome.storage.sync.set({ settings: newSettings });

    // Update status display
    if (!toggleAlerts.checked) {
      statusDot.classList.remove('active');
      statusText.textContent = 'Alerts paused';
    } else if (searchProfiles.length) {
      statusDot.classList.add('active');
      statusText.textContent = `Monitoring ${searchProfiles.length} profile${searchProfiles.length > 1 ? 's' : ''}`;
    }
  }

  toggleAlerts.addEventListener('change', saveToggle);
  toggleAutoFill.addEventListener('change', saveToggle);
  toggleHighlight.addEventListener('change', saveToggle);

  // ── Action Buttons ─────────────────────────────────────────

  btnCheckNow.addEventListener('click', async () => {
    btnCheckNow.classList.add('loading');
    btnCheckNow.querySelector('.btn-icon').textContent = '⏳';

    try {
      await chrome.runtime.sendMessage({ type: 'FORCE_CHECK' });
    } catch (err) {
      console.error('Force check failed:', err);
    }

    setTimeout(() => {
      btnCheckNow.classList.remove('loading');
      btnCheckNow.querySelector('.btn-icon').textContent = '🔄';
    }, 2000);
  });

  btnClearBadge.addEventListener('click', async () => {
    await chrome.runtime.sendMessage({ type: 'CLEAR_BADGE' });
    statusCount.textContent = '0';
  });

  // ── Open Options ───────────────────────────────────────────

  btnOptions.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
});
