// ─────────────────────────────────────────────────────────────
// Upwork Toolkit – Content Script
// Injected on all upwork.com pages.
// Handles: proposal auto-fill, feed highlighting, scrape requests
// ─────────────────────────────────────────────────────────────

(async function () {
  'use strict';

  // ── Wait a moment for Upwork's SPA to settle ─────────────
  await sleep(1500);

  // Determine current page type
  const url = window.location.href;
  const isProposalPage = url.includes('/proposals/') || url.includes('/apply/');
  const isFeedPage =
    url.includes('/nx/search/jobs') ||
    url.includes('/nx/find-work') ||
    url.includes('/ab/jobs/search') ||
    url.includes('/freelance-jobs');

  if (isProposalPage) {
    initProposalAutoFill();
  }

  if (isFeedPage) {
    initFeedHighlighting();
  }

  // Always listen for messages from background
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.type === 'SCRAPE_JOBS') {
      handleScrapeRequest(msg).then(result => sendResponse(result));
      return true; // async
    }
  });

  // ── Proposal Auto-Fill ─────────────────────────────────────

  async function initProposalAutoFill() {
    const { settings } = await chrome.storage.sync.get('settings');
    if (!settings?.autoFillEnabled) return;

    // Watch for the cover letter textarea to appear
    const observer = new MutationObserver(() => {
      autoFillCoverLetter();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Also try immediately
    autoFillCoverLetter();
  }

  async function autoFillCoverLetter() {
    const textarea = document.querySelector(
      'textarea[name="cover_letter"], ' +
      'textarea[aria-label*="Cover letter"], ' +
      'textarea[aria-label*="cover letter"], ' +
      'textarea[data-test="cover-letter-area"], ' +
      '#cover_letter'
    );

    if (!textarea) return;
    if (textarea.dataset.toolkitFilled === 'true') return; // don't re-fill

    let templates = [], selectedTemplateId = null;
    try {
      if (!chrome.runtime.id) return;
      const result = await chrome.storage.sync.get(['templates', 'selectedTemplateId']);
      templates = result.templates || [];
      selectedTemplateId = result.selectedTemplateId;
    } catch (err) {
      return;
    }

    if (!templates.length) return;

    const template = templates.find(t => t.id === selectedTemplateId) || templates[0];
    if (!template?.body) return;

    // Only fill if empty
    if (!textarea.value.trim()) {
      textarea.value = template.body;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
      textarea.dataset.toolkitFilled = 'true';

      // Show a subtle indicator
      showToast('📝 Draft prepared. Please review and edit before submitting.');
    }
  }

  // ── Feed Highlighting ──────────────────────────────────────

  async function initFeedHighlighting() {
    const { settings } = await chrome.storage.sync.get('settings');
    if (!settings?.feedHighlightEnabled) return;

    const observer = new MutationObserver(() => {
      styleJobFeed();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Initial styling
    styleJobFeed();
  }

  async function styleJobFeed() {
    let feedFilters = {};
    try {
      if (!chrome.runtime.id) return;
      const result = await chrome.storage.sync.get('feedFilters');
      feedFilters = result.feedFilters || {};
    } catch (err) {
      return; // Orphaned script after extension reload
    }
    const { keywords = [], minBudget } = feedFilters;

    // Common Upwork job card selectors
    const cards = document.querySelectorAll(
      'article[data-test="JobTile"], ' +
      'section.job-tile, ' +
      '[data-test="job-tile-list"] article, ' +
      '.up-card-section.up-card-list-section.up-card-hover'
    );

    if (!cards.length) return;

    cards.forEach(card => {
      if (card.dataset.toolkitStyled === 'true') return;
      card.dataset.toolkitStyled = 'true';

      const titleEl = card.querySelector(
        'a[data-test="job-title-link"], ' +
        'a.job-title-link, ' +
        'h2 a, h3 a'
      );
      const descEl = card.querySelector(
        '[data-test="job-description-text"], ' +
        '.job-description, ' +
        'p'
      );
      const title = titleEl?.innerText || '';
      const desc = descEl?.innerText || '';
      const text = `${title} ${desc}`.toLowerCase();

      // Extract budget from card text
      const budget = extractBudgetFromText(card.textContent || '');

      // Evaluate rules
      const matchesKeyword =
        !keywords.length || keywords.some(kw => text.includes(kw.toLowerCase()));
      const passesBudget = !minBudget || (budget !== null && budget >= minBudget);

      if (!matchesKeyword || !passesBudget) {
        card.classList.add('toolkit-dimmed');
      } else if (keywords.length > 0 && matchesKeyword) {
        card.classList.add('toolkit-highlighted');
      }
    });
  }

  // ── Scrape Request Handler ─────────────────────────────────

  async function handleScrapeRequest(msg) {
    try {
      // Navigate to the search URL if we're not already there
      if (window.location.href !== msg.url) {
        // We can't navigate from content script reliably,
        // so scrape from the current page instead
      }

      const jobs = scrapeJobsFromDOM();
      return { jobs };
    } catch (err) {
      console.error('[Upwork Toolkit] Scrape error:', err);
      return { jobs: [] };
    }
  }

  function scrapeJobsFromDOM() {
    const jobs = [];
    const cards = document.querySelectorAll(
      'article[data-test="JobTile"], ' +
      'section.job-tile, ' +
      '[data-test="job-tile-list"] article, ' +
      '.up-card-section'
    );

    cards.forEach(card => {
      const titleEl = card.querySelector(
        'a[data-test="job-title-link"], a.job-title-link, h2 a, h3 a'
      );
      const descEl = card.querySelector(
        '[data-test="job-description-text"], .job-description, p'
      );
      const link = titleEl?.href || '';
      const idMatch = link.match(/\/(~[a-zA-Z0-9]+)/);

      if (idMatch) {
        const textContent = card.textContent || '';
        const budget = extractBudgetFromText(textContent);
        const skills = Array.from(
          card.querySelectorAll('[data-test="token"] span, .up-skill-badge')
        ).map(s => s.textContent.trim());

        // Extract client rating
        const ratingMatch = textContent.match(/(\d\.\d+)\s*(?:out of 5)?\s*stars?/i);
        const clientRating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;
        
        // Extract client spend
        const spendMatch = textContent.match(/\$([\d,]+K?M?\+?)\s*spent/i);
        const clientSpend = spendMatch ? spendMatch[1] : '';

        // Determine job type
        const isHourly = textContent.toLowerCase().includes('hourly');
        const isFixed = textContent.toLowerCase().includes('fixed-price') || textContent.toLowerCase().includes('fixed price');
        const jobType = isHourly ? 'Hourly' : (isFixed ? 'Fixed' : 'Unknown');

        jobs.push({
          id: idMatch[1],
          title: titleEl?.textContent?.trim() || '',
          shortDescription: descEl?.textContent?.trim().slice(0, 200) || '',
          budget: budget ? `$${budget}` : '',
          budgetValue: budget,
          skills,
          url: link,
          paymentVerified: textContent.toLowerCase().includes('payment verified'),
          clientRating,
          clientSpend,
          jobType
        });
      }
    });

    return jobs;
  }

  // ── Utilities ──────────────────────────────────────────────

  function extractBudgetFromText(text) {
    // Match patterns like $500, $1,000, $50/hr
    const match = text.match(/\$[\d,]+(?:\.\d+)?/);
    if (match) {
      return parseFloat(match[0].replace(/[$,]/g, ''));
    }
    return null;
  }

  function showToast(message) {
    const existing = document.getElementById('toolkit-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toolkit-toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      padding: 12px 20px;
      background: linear-gradient(135deg, #14a800, #1a8f00);
      color: #fff;
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 14px;
      border-radius: 10px;
      box-shadow: 0 8px 32px rgba(20, 168, 0, 0.3);
      z-index: 999999;
      opacity: 0;
      transform: translateY(12px);
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
})();
