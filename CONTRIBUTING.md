# Contributing to Horizontal Scrollbar Fixer

Thanks for your interest in making this little overflow bouncer even better! Below is a lightweight workflow to keep changes easy to review and ship.

## Getting Started
1. Fork or clone the repo.
2. Load the unpacked extension via `chrome://extensions` (enable Developer Mode → Load unpacked → select the project folder).
3. Open any page with a horizontal scrollbar to verify the fix script behaves as expected. The 🛠️ badge should appear whenever the script constrains an element.

## Development Guidelines
- Keep the content script lean; avoid pulling in large dependencies so the extension stays fast.
- When touching `content.js`, add concise comments for non-obvious logic and test on a couple of pages with and without overflow.
- If you update UI-facing text or behavior, reflect the change in `README.md` and screenshots before release packaging.

## Submitting Changes
1. Run through the packaging checklist in `README.md` to ensure the manifest, icons, and metadata are consistent.
2. Create a clear PR title/description outlining what changed and why. Screenshots or console logs help reviewers reproduce results quickly.
3. Mention any follow-up work or open questions so maintainers can plan the next iteration.

## Release Prep
When a change is ready for the Chrome Web Store, create an updated ZIP per the README instructions and note the version bump in `manifest.json`. This keeps reviewers aligned on what shipped.

## Questions?
Feel free to open an issue describing what you’re running into—bug reports, enhancement ideas, and feedback on the existing heuristics are all welcome!
