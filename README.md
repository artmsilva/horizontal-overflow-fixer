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

## Packaging for Personal Use
1. Run `make package` from the repo root to generate a ZIP in `dist/` that contains everything needed for sideloading.
2. Share the ZIP (or extract it) and load the folder via **Load unpacked** in `chrome://extensions` on any device where you want the same setup.
3. Keep the packaged archive handy as a personal backup so you can quickly re-install without re-downloading the repo.

## Host Permission Rationale
The extension requests `<all_urls>` so it can run immediately on any page that unexpectedly exhibits horizontal overflow. Alternatives like `activeTab` or a tight host allowlist would force users to manually trigger the fix on every site or limit it to a few domains, defeating the goal of silently keeping all browsing scroll-clean.

## Agents
See `AGENTS.md` for a short description of the responsibilities handled by the automated agents within this project.
