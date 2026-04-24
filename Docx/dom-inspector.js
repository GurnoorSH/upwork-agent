/**
 * Upwork DOM Inspector — Paste into browser DevTools console
 *
 * Run this on https://www.upwork.com/nx/search/jobs/?q=...
 * to extract the current DOM selectors for job cards.
 *
 * If the scraper stops working, run this script and update
 * the SELECTORS object in rss.mjs with the new values.
 *
 * Usage:
 *   1. Navigate to Upwork job search in your browser
 *   2. Solve any Cloudflare challenge
 *   3. Open DevTools → Console
 *   4. Paste this entire script and press Enter
 *   5. Copy the JSON output and compare with rss.mjs SELECTORS
 */

(function extractUpworkSelectors() {
  const report = {};

  // --- 1. Find the job list container ---
  const containerCandidates = [
    'section[data-test="job-tile-list"]',
    '[data-test="job-tile-list"]',
    '[data-test="JobsList"]',
    'ul.jobs-list',
    '[class*="job-list"]',
    '[class*="JobList"]',
    'main ul',
    'div[data-test*="search"]'
  ];

  let container = null;
  for (const sel of containerCandidates) {
    const el = document.querySelector(sel);
    if (el) { container = el; report.containerSelector = sel; break; }
  }

  if (!container) {
    const lists = [...document.querySelectorAll('ul, ol')];
    const bigList = lists.find(l => l.children.length >= 3);
    if (bigList) {
      container = bigList;
      report.containerSelector = `<${bigList.tagName.toLowerCase()}> with classes: ${bigList.className}`;
    }
  }

  // --- 2. Find individual job cards ---
  const cardCandidates = [
    '[data-test="job-tile"]',
    '[data-test="JobTile"]',
    '[data-test*="JobTile"]',
    'article[data-job-uid]',
    'article.job-tile',
    '[class*="job-tile"]',
    '[class*="JobTile"]',
    'article',
    'li[data-ev-job-uid]',
    'li[data-job-uid]'
  ];

  let cards = [];
  for (const sel of cardCandidates) {
    const found = document.querySelectorAll(sel);
    if (found.length >= 2) { cards = [...found]; report.cardSelector = sel; break; }
  }

  report.cardCount = cards.length;

  if (cards.length === 0) {
    report.error = "No cards found. Page may not have rendered yet, or selectors changed.";
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  // --- 3. Inspect the first card deeply ---
  const card = cards[0];
  report.cardTagName = card.tagName;
  report.cardClasses = card.className;
  report.cardDataAttributes = Object.fromEntries(
    [...card.attributes].filter(a => a.name.startsWith('data-')).map(a => [a.name, a.value])
  );

  const findIn = (root, selectors) => {
    for (const s of selectors) {
      const el = root.querySelector(s);
      if (el) return {
        selector: s,
        tag: el.tagName,
        classes: el.className,
        text: el.textContent.trim().slice(0, 100),
        dataAttrs: Object.fromEntries(
          [...el.attributes].filter(a => a.name.startsWith('data-')).map(a => [a.name, a.value])
        )
      };
    }
    return null;
  };

  // --- Job Title ---
  report.jobTitle = findIn(card, [
    'a[data-test="job-tile-title-link UpLink"]',
    '[data-test="job-tile-title"]',
    '[data-test="job-title"]',
    'h2 a', 'h3 a', 'h4 a',
    'a[href*="/jobs/"]',
    '[class*="title"] a',
    '[class*="Title"] a',
    'a[data-test*="title"]'
  ]);

  // --- Description ---
  report.description = findIn(card, [
    '[data-test="job-description-text"]',
    '[data-test*="JobDescription"]',
    '[data-test="job-description"]',
    'p.text-body-sm',
    '[class*="description"]',
    '[class*="Description"]',
    'p[class*="text"]',
    '[data-test*="description"]'
  ]);

  // --- Posted Date ---
  report.postedDate = findIn(card, [
    '[data-test="job-pubilshed-date"]',
    '[data-test="job-published-date"]',
    'time',
    '[class*="posted"]',
    '[class*="date"]',
    '[class*="Date"]',
    'span[datetime]'
  ]);

  // --- Budget ---
  report.budget = findIn(card, [
    '[data-test="budget"]',
    '[data-test="is-fixed-price"]',
    '[class*="budget"]',
    '[class*="Budget"]',
    '[class*="price"]',
    '[class*="Price"]',
    '[class*="rate"]',
    'strong'
  ]);

  // --- Skills/Tags ---
  const skillCandidates = card.querySelectorAll(
    '[data-test="skill"], [class*="skill"], [class*="Skill"], [class*="tag"], [class*="Tag"]'
  );
  report.skills = [...skillCandidates].slice(0, 5).map(el => ({
    tag: el.tagName, classes: el.className, text: el.textContent.trim()
  }));

  // --- First card HTML (truncated) ---
  report.firstCardHTML = card.outerHTML.slice(0, 3000);

  // --- All data-test attributes on page (unique) ---
  const allDataTest = [...document.querySelectorAll('[data-test]')]
    .map(el => el.getAttribute('data-test'))
    .filter((v, i, a) => a.indexOf(v) === i);
  report.allDataTestValues = allDataTest;

  console.log('%c=== UPWORK SELECTOR REPORT ===', 'color: green; font-size: 16px; font-weight: bold;');
  console.log(JSON.stringify(report, null, 2));
  console.log('%cCopy the JSON above and compare with rss.mjs SELECTORS', 'color: orange; font-weight: bold;');

  return report;
})();


// copy(document.documentElement.outerHTML);
// This copies the entire rendered DOM to your clipboard
// Paste it into a .html file for offline inspection