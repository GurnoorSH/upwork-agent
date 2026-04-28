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
  const { unseenCount = 0, syncStatus = 'Idle' } = await chrome.storage.local.get(['unseenCount', 'syncStatus']);
  const { feedSources = {} } = await chrome.storage.sync.get('feedSources');

  toggleAlerts.checked = settings.jobAlertsEnabled !== false;
  toggleAutoFill.checked = settings.autoFillEnabled !== false;
  toggleHighlight.checked = settings.feedHighlightEnabled !== false;

  statusCount.textContent = unseenCount;

  // Determine how many feeds are active
  let activeFeedsCount = 0;
  if (feedSources.myFeed !== false) activeFeedsCount++;
  if (feedSources.bestMatches) activeFeedsCount++;
  if (feedSources.mostRecent) activeFeedsCount++;

  function updateStatusUI(currentSyncStatus) {
    if (activeFeedsCount === 0) {
      statusDot.className = 'status-dot';
      statusText.textContent = 'No feed sources enabled';
      return;
    }
    
    if (!toggleAlerts.checked) {
      statusDot.className = 'status-dot';
      statusText.textContent = 'Alerts paused';
      return;
    }

    if (currentSyncStatus && currentSyncStatus !== 'Idle') {
      statusDot.className = 'status-dot syncing';
      statusText.textContent = currentSyncStatus;
    } else {
      statusDot.className = 'status-dot active';
      statusText.textContent = `Monitoring ${activeFeedsCount} feed channel${activeFeedsCount > 1 ? 's' : ''}`;
    }
  }

  updateStatusUI(syncStatus);

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      if (changes.syncStatus) updateStatusUI(changes.syncStatus.newValue);
      if (changes.unseenCount) statusCount.textContent = changes.unseenCount.newValue;
    }
  });

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
    updateStatusUI('Idle'); // Forces a re-render of the base text
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
