# Upwork Toolkit - Agent Edition

A powerful Chrome Extension built to automate and optimize the Upwork job search and application process. This toolkit helps freelancers identify high-quality leads, filter jobs, and streamline their bidding workflow.

## Overview

This extension integrates directly into the browser to monitor Upwork job feeds and provides sophisticated filtering and application assistance. By leveraging the user's active Upwork session within Chrome, it ensures a persistent, authenticated connection to Upwork's platform without running into typical anti-bot protections.

## Key Features

- **Job Monitoring:** Periodically fetches new jobs in the background and surfaces them.
- **Advanced Filtering:** Identifies high-quality leads based on customizable parameters (client quality, budget, job clarity, and intent signals).
- **Proposal Assistance:** Injects content scripts to assist with auto-filling proposals directly on the Upwork job application pages.
- **Custom Options UI:** Provides a dedicated dashboard (Options page) to view the job feed, tweak settings, and configure filtering criteria.
- **Native Notifications:** Alerts you when high-conversion opportunities matching your criteria are found.

## Architecture

This project is built using modern Chrome Extension architecture (Manifest V3):

- **Background Service Worker (`background.js`):** Handles background tasks such as fetching new jobs on a regular interval, checking subscription status, and sending system notifications.
- **Options UI (`options.html`):** The primary user interface for configuring extension settings and viewing the curated job feed.
- **Content Scripts (`content-scripts/`):** Scripts that run on specific Upwork pages (e.g., proposal submission pages) to interact with the DOM and enhance the user interface.
- **Declarative Net Requests (`request_modifier.json`):** Rules to modify network requests for optimal data fetching.

## Getting Started

1. Go to `chrome://extensions/` in your Chrome browser.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked** and select the `upwork-toolkit-pro` folder.
4. Pin the extension to your toolbar and click its icon to access the Options page.
