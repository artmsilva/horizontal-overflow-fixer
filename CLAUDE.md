# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Chrome Manifest V3 extension that automatically detects and constrains DOM elements causing horizontal overflow scrollbars. The extension runs a content script on every page load and displays a transient badge indicating whether fixes were applied.

## Commands

```bash
# Install dependencies (required once)
npm install

# Format code
make format

# Lint code
make lint

# Install pre-commit hook (runs format + lint before each commit)
make hooks

# Package extension for distribution
make package

# Clean build artifacts
make clean
```

## Architecture

Chrome Manifest V3 extension with three detection modes selectable via popup:

- **manifest.json**: MV3 manifest with `<all_urls>` and `storage` permissions
- **content.js**: Main detection logic with MutationObserver for dynamic content
  - **Conservative mode**: Body/html only (safest)
  - **Moderate mode**: Scans all elements for obvious overflow via `getBoundingClientRect()`
  - **Aggressive mode**: Full scan including transforms, negative margins, 100vw, positioned elements
- **popup.html/popup.js**: Mode selector UI, stores preference in `chrome.storage.sync`
- **test/overflow-test.html**: Test page with various overflow scenarios for verification

## Code Style

- Uses Biome for formatting and linting
- 2-space indentation, 100-character line width
- Keep the content script lean with no external dependencies
