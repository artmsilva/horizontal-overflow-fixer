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
1. Ensure the repository contains only the files needed for the build. Typically: `manifest.json`, `content.js`, `icon16.png`, `icon48.png`, `icon128.png`, `README.md`, `AGENTS.md`, `LICENSE`, and `CONTRIBUTING.md`.
2. From the project root, create a production ZIP (macOS/Linux example):
   ```sh
   zip -r overflow-fixer-1.0.zip manifest.json content.js icon16.png icon48.png icon128.png README.md AGENTS.md LICENSE CONTRIBUTING.md
   ```
   or simply run `make package` to emit `dist/overflow-fixer-<version>.zip`.
3. Visit the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/) and choose **New Item**.
4. Upload the ZIP from step 2, add your store listing details (screenshots, short/long descriptions, category), and submit for review.

Chrome will warn you if any required metadata (icons, descriptions, etc.) is missing, so double-check the listing information before publishing.

### Screenshots
The `screenshots/` directory contains 1280×800 PNGs ready for the listing image requirement. Capture fresh screenshots or update the placeholders whenever UI changes.

## Agents
See `AGENTS.md` for a short description of the responsibilities handled by the automated agents within this project.
