// Horizontal Scrollbar Smasher v1.0
// This script attempts to fix unwanted horizontal scrollbars by identifying
// elements that extend past the viewport and constraining them.

(function fixHorizontalOverflow() {
  const viewportWidth = window.innerWidth;
  let fixedElementsCount = 0;
  const overflowFixStyle = "important-overflow-fix-vibe-code";
  const badgeId = "overflow-fixer-emoji-badge";

  function showBadge(hasFixes) {
    // Remove any existing badge so we don't stack multiples on reloads
    const existingBadge = document.getElementById(badgeId);
    if (existingBadge) {
      existingBadge.remove();
    }

    const badge = document.createElement("div");
    badge.id = badgeId;
    badge.textContent = hasFixes
      ? "🛠️ Scrollbar smashed"
      : "✅ Checked for overflow";
    badge.style.position = "fixed";
    badge.style.bottom = "16px";
    badge.style.right = "16px";
    badge.style.padding = "8px 12px";
    badge.style.borderRadius = "999px";
    badge.style.background = "rgba(32, 33, 36, 0.85)";
    badge.style.color = "white";
    badge.style.fontSize = "12px";
    badge.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif";
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

  // 1. Initial quick fix to kill the main scrollbar while we find the root cause
  document.body.style.overflowX = "hidden";

  console.log(
    `[Vibe Code Scroll Fix] Starting analysis for viewport width: ${viewportWidth}px`,
  );

  // Get all elements on the page
  const allElements = document.querySelectorAll("*");

  allElements.forEach((element) => {
    try {
      // Check if the element already has the fix applied
      if (element.classList.contains(overflowFixStyle)) {
        return;
      }

      // Get the bounding box relative to the viewport
      const rect = element.getBoundingClientRect();

      // Check if the element's right edge is past the viewport edge (with a small tolerance of 5px)
      if (rect.right > viewportWidth + 5) {
        // Element is causing overflow! Apply the fix.

        // Add a class for tracking and future exclusion
        element.classList.add(overflowFixStyle);

        // Apply CSS properties to contain the width and hide internal overflow
        element.style.setProperty("max-width", "100%", "important");
        element.style.setProperty("box-sizing", "border-box", "important");
        element.style.setProperty("overflow-x", "hidden", "important");

        fixedElementsCount++;

        console.log(
          `[Vibe Code Fixed] Element ID/Tag: ${element.id || element.tagName} | Overflow Width: ${Math.round(rect.right - viewportWidth)}px`,
        );
      }
    } catch (e) {
      // Safely skip elements that throw errors (e.g., hidden SVGs or foreign objects)
      // console.warn('Skipped element due to error:', e.message);
    }
  });

  console.log(
    `[Vibe Code Scroll Fix] Finished. Total elements constrained: ${fixedElementsCount}`,
  );

  if (fixedElementsCount > 0) {
    // Double-check the body overflow setting after fixing elements
    document.body.style.overflowX = "auto";
    if (document.body.scrollWidth > window.innerWidth) {
      console.log(
        "[Vibe Code Scroll Fix] WARNING: Scrollbar might persist. Reverting body overflow to hidden.",
      );
      document.body.style.overflowX = "hidden";
    } else {
      console.log(
        "[Vibe Code Scroll Fix] Success! The page should now be scrollbar-free.",
      );
    }
  } else {
    // If nothing was found, but a scrollbar still exists, it's likely a persistent body overflow
    if (document.body.scrollWidth > window.innerWidth) {
      document.body.style.overflowX = "hidden";
      console.log(
        "[Vibe Code Scroll Fix] No individual offenders found, setting body overflow-x: hidden as a final measure.",
      );
    } else {
      console.log(
        "[Vibe Code Scroll Fix] No immediate horizontal overflow issues detected on this page.",
      );
    }
  }

  showBadge(fixedElementsCount > 0);
})();
