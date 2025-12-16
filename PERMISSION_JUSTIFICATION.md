# Permission Justification

Chrome flags the `<all_urls>` host permission because it allows the content script to run on every site. The Horizontal Scrollbar Fixer needs that breadth for three reasons:

1. **The root problem is page-agnostic.** Horizontal overflow bugs show up anywhere—in documentation portals, marketing sites, project dashboards, and internal apps. Limiting the extension to a static allowlist would miss most real-world cases and undercut the core value proposition, which is “make every site scroll cleanly.”

2. **The script never exfiltrates or stores data.** The only code injected is `content.js`, and it only measures bounding boxes, adjusts CSS, and displays a local badge. No network requests, analytics calls, or persistent storage occur, so even though the script runs everywhere, it never transmits page content out of the user’s browser.

3. **Users opt in on install.** The Chrome Web Store listing clearly describes that the extension inspects layout on whatever page the user visits. The host permission simply grants the extension the ability to deliver that promised behavior without constant user prompts.

In short, `<all_urls>` is required because the scrollbar issue is universal and unpredictable, while the extension’s implementation remains narrowly focused on layout tweaks and avoids touching or collecting content beyond what is necessary to constrain overflow.
