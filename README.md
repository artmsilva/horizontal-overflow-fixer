# Horizontal Scrollbar Fixer

A lightweight Manifest V3 extension that hunts down DOM nodes causing horizontal overflow and constrains them so pages stop spawning annoying horizontal scrollbars. When the script runs, it flashes a tiny emoji badge so you know the fix did its thing.

## Features
- **Three detection modes** selectable via popup:
  - **Conservative (Safe)**: Fixes only body/html elements. Lowest risk of breaking layouts.
  - **Moderate (Balanced)**: Scans all elements for obvious overflow issues.
  - **Aggressive (Chaos)**: Full scan including CSS transforms, negative margins, 100vw widths, and positioned elements.
- **MutationObserver** watches for dynamic content (SPAs, lazy loading) and re-runs detection automatically.
- Shows a transient badge with fix count and current mode (e.g., `🛠️ Fixed 3 [Chaos]`).
- Click the extension icon to switch modes; changes apply on page reload.

## Development
1. Clone or download this repo.
2. Open Chrome, go to `chrome://extensions`, and enable **Developer mode**.
3. Choose **Load unpacked** and select this folder. Chrome will inject `content.js` on every page so you can test immediately.

Changes to `content.js` are reflected after reloading the extension (click the refresh icon in `chrome://extensions`).

### Linting, Formatting, and Hooks
- Run `npm install` once to pull down the Biome CLI (dev dependency).
- Run `make format` to apply Biome formatting across the repo and `make lint` to check for issues using `npx @biomejs/biome`.
- Execute `make hooks` once to install a standard Git pre-commit hook that automatically formats and lints before every commit (it simply calls the Make targets above).

## Packaging for Personal Use
1. Run `make package` from the repo root to generate a ZIP in `dist/` that contains everything needed for sideloading.
2. Share the ZIP (or extract it) and load the folder via **Load unpacked** in `chrome://extensions` on any device where you want the same setup.
3. Keep the packaged archive handy as a personal backup so you can quickly re-install without re-downloading the repo.

## Host Permission Rationale
The extension requests `<all_urls>` so it can run immediately on any page that unexpectedly exhibits horizontal overflow. Alternatives like `activeTab` or a tight host allowlist would force users to manually trigger the fix on every site or limit it to a few domains, defeating the goal of silently keeping all browsing scroll-clean.

## Agents
See `AGENTS.md` for a short description of the responsibilities handled by the automated agents within this project.
