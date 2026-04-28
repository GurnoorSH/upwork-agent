# Screenshot Checklist

Capture these from the actual unpacked extension loaded in Chrome, not from a local static server.

Suggested save location:

```text
docs/screenshots/
```

Suggested filenames:

```text
01-jobs-detailed.png
02-jobs-compact.png
03-jobs-empty.png
04-settings.png
05-debug.png
06-logs.png
07-cover-letter.png
08-subscription.png
```

## Steps

1. Open Chrome.
2. Go to `chrome://extensions/`.
3. Enable Developer mode.
4. Load unpacked extension from the reconstructed source build:

```text
C:\Users\gurno\Desktop\Upwork\upwork-agent\source\.output\chrome-mv3
```

Use `upwork-toolkit-pro` only when comparing against the protected baseline.

5. Open the extension options page.
6. Capture the listed screens.
7. Add a short note below each screenshot filename in this checklist if the page state depends on logged-in Upwork data.

## Captured Screenshot Notes

- `Compact_view.png`: captured on 2026-04-29.
- `CoverLetterView.png`: captured on 2026-04-29.
- `Job_opened_View.png`: captured on 2026-04-29.
- `SettingsDropdownView.png`: captured on 2026-04-29.
- `SettingsView.png`: captured on 2026-04-29.

## Still Useful To Capture

- Detailed jobs list with multiple expanded cards.
- Empty jobs state.
- Debug page.
- Logs page.
- Subscription page.
