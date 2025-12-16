# Horizontal Scrollbar Fixer

A lightweight Manifest V3 extension that hunts down DOM nodes causing horizontal overflow and constrains them so pages stop spawning annoying horizontal scrollbars. When the script runs, it flashes a tiny emoji badge so you know the fix did its thing.

## Features
- Scans every element for overflow past the viewport and applies a scoped CSS fix.
- Automatically toggles `body` overflow rules for a last-resort safety net.
- Shows a transient badge (`🛠️` when fixes are applied, `✅` when none are needed) to confirm the extension ran.
- Zero permissions and instant load thanks to a single content script.

## Development
1. Clone or download this repo.
2. Open Chrome, go to `chrome://extensions`, and enable **Developer mode**.
3. Choose **Load unpacked** and select this folder. Chrome will inject `content.js` on every page so you can test immediately.

Changes to `content.js` are reflected after reloading the extension (click the refresh icon in `chrome://extensions`).

## Packaging for the Chrome Web Store
1. Run `make package` from the repo root to generate an upload-ready ZIP in `dist/`.
2. Visit the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/), click **New Item**, and upload the ZIP along with listing metadata (descriptions, icons, and the screenshots in `screenshots/`).
3. Paste the text from `PERMISSION_JUSTIFICATION.md` into the permissions justification prompt when asked, then submit for review.

Chrome will warn you if any required metadata (icons, descriptions, etc.) is missing, so double-check the listing information before publishing.

### Screenshots
The `screenshots/` directory contains 1280×800 PNGs ready for the listing image requirement. Capture fresh screenshots or update the placeholders whenever UI changes.

## Host Permission Rationale
The extension requests `<all_urls>` so it can run immediately on any page that unexpectedly exhibits horizontal overflow. Alternatives like `activeTab` or a tight host allowlist would force users to manually trigger the fix on every site or limit it to a few domains, defeating the goal of silently keeping all browsing scroll-clean. See `PERMISSION_JUSTIFICATION.md` for the explanation used in the Chrome Web Store submission.

## Agents
See `AGENTS.md` for a short description of the responsibilities handled by the automated agents within this project.
