/**
 * RSS Feed Fetcher for Upwork Job Listings
 *
 * Constructs the Upwork RSS URL from config, fetches the feed,
 * and parses it into an array of job objects.
 */

import fetch from "node-fetch";
import { XMLParser } from "fast-xml-parser";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/**
 * Build the Upwork RSS feed URL from the config object.
 * @param {object} config
 * @returns {string} The RSS feed URL
 */
function buildRssUrl(config) {
  const queryString = config.keywords
    .map((kw) => encodeURIComponent(kw))
    .join("+");

  let url = `https://www.upwork.com/ab/feed/jobs/rss?q=${queryString}&sort=recency&paging=0%3B20`;

  if (config.jobType === "fixed") {
    url += "&job_type=fixed";
  } else if (config.jobType === "hourly") {
    url += "&job_type=hourly";
  }

  return url;
}

/**
 * Fetch and parse Upwork job listings from the RSS feed.
 *
 * @param {object} config - The user config object
 * @returns {Promise<Array<{title: string, link: string, pubDate: string, description: string}>>}
 */
export async function fetchJobUrls(config) {
  const url = buildRssUrl(config);

  console.log(`  RSS URL: ${url}`);

  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/rss+xml, application/xml, text/xml",
    },
  });

  if (!response.ok) {
    throw new Error(
      `RSS fetch failed: ${response.status} ${response.statusText}`
    );
  }

  const xml = await response.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    parseTagValue: true,
    trimValues: true,
  });

  const parsed = parser.parse(xml);

  // The RSS structure: rss > channel > item (can be a single object or array)
  const channel = parsed?.rss?.channel;
  if (!channel) {
    throw new Error("Invalid RSS structure — no channel found.");
  }

  let items = channel.item;
  if (!items) {
    return [];
  }

  // Normalize to array if a single item is returned
  if (!Array.isArray(items)) {
    items = [items];
  }

  return items.map((item) => ({
    title: item.title || "Untitled",
    link: (item.link || "").split("?")[0], // strip tracking query params
    pubDate: item.pubDate || "",
    description: item.description || "",
  }));
}
