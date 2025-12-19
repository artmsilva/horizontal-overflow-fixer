// Horizontal Scrollbar Smasher v1.0
// This script attempts to fix unwanted horizontal scrollbars by identifying
// elements that extend past the viewport and constraining them.

(function fixHorizontalOverflow() {
  const viewportWidth = window.innerWidth;
  let fixedElementsCount = 0;
  const badgeId = "overflow-fixer-emoji-badge";

  function showBadge(hasFixes) {
    // Remove any existing badge so we don't stack multiples on reloads
    const existingBadge = document.getElementById(badgeId);
    if (existingBadge) {
      existingBadge.remove();
    }

    const badge = document.createElement("div");
    badge.id = badgeId;
    badge.textContent = hasFixes ? "🛠️ Scrollbar smashed" : "✅ Checked for overflow";
    badge.style.position = "fixed";
    badge.style.bottom = "16px";
    badge.style.right = "16px";
    badge.style.padding = "8px 12px";
    badge.style.borderRadius = "999px";
    badge.style.background = "rgba(32, 33, 36, 0.85)";
    badge.style.color = "white";
    badge.style.fontSize = "12px";
    badge.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    badge.style.zIndex = "2147483647"; // stay on top of the page
    badge.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.25)";
    badge.style.pointerEvents = "none"; // avoid impacting page interactions

    document.body.appendChild(badge);

    // Let the badge fade away after a few seconds to keep the UI clean
    setTimeout(() => {
      badge.style.transition = "opacity 300ms ease";
      badge.style.opacity = "0";
      setTimeout(() => badge.remove(), 350);
    }, 3000);
  }

  console.log(`[Vibe Code Scroll Fix] Starting analysis for viewport width: ${viewportWidth}px`);

  // Only check body and html elements for overflow
  const elementsToCheck = [document.documentElement, document.body];

  elementsToCheck.forEach((element) => {
    if (!element) return;

    try {
      // Check if horizontal overflow exists
      if (element.scrollWidth > window.innerWidth) {
        // Apply overflow fix
        element.style.setProperty("overflow-x", "hidden", "important");
        element.style.setProperty("max-width", "100%", "important");
        element.style.setProperty("box-sizing", "border-box", "important");

        fixedElementsCount++;

        console.log(
          `[Vibe Code Fixed] Element: ${element.tagName} | Overflow Width: ${Math.round(element.scrollWidth - window.innerWidth)}px`,
        );
      }
    } catch (_error) {
      // Safely skip if error occurs
    }
  });

  console.log(`[Vibe Code Scroll Fix] Finished. Total elements constrained: ${fixedElementsCount}`);

  showBadge(fixedElementsCount > 0);
})();
