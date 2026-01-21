// Horizontal Scrollbar Smasher v1.1
// Three detection modes: conservative, moderate, aggressive
// Now with MutationObserver for dynamic content

(() => {
  const BADGE_ID = "overflow-fixer-emoji-badge";
  const FIX_CLASS = "overflow-fixer-applied";
  const DEFAULT_MODE = "conservative";

  let currentMode = DEFAULT_MODE;
  let fixedElementsCount = 0;
  let observer = null;
  let debounceTimer = null;

  // Debounce helper for MutationObserver
  function debounce(fn, delay) {
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function showBadge(hasFixes, mode) {
    const existingBadge = document.getElementById(BADGE_ID);
    if (existingBadge) {
      existingBadge.remove();
    }

    const modeLabels = {
      conservative: "Safe",
      moderate: "Balanced",
      aggressive: "Chaos",
    };

    const badge = document.createElement("div");
    badge.id = BADGE_ID;
    badge.textContent = hasFixes
      ? `🛠️ Fixed ${fixedElementsCount} [${modeLabels[mode]}]`
      : `✅ Clean [${modeLabels[mode]}]`;
    badge.style.cssText = `
      position: fixed;
      bottom: 16px;
      right: 16px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(32, 33, 36, 0.85);
      color: white;
      font-size: 12px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      z-index: 2147483647;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      pointer-events: none;
    `;

    document.body.appendChild(badge);

    setTimeout(() => {
      badge.style.transition = "opacity 300ms ease";
      badge.style.opacity = "0";
      setTimeout(() => badge.remove(), 350);
    }, 3000);
  }

  function applyFix(element, reason) {
    if (element.classList.contains(FIX_CLASS)) return false;

    element.classList.add(FIX_CLASS);
    element.style.setProperty("overflow-x", "hidden", "important");
    element.style.setProperty("max-width", "100%", "important");
    element.style.setProperty("box-sizing", "border-box", "important");

    fixedElementsCount++;
    const identifier = element.id || element.className || element.tagName;
    console.log(`[Overflow Fixer] Fixed: ${identifier} | Reason: ${reason}`);
    return true;
  }

  // Mode: Conservative - Only body/html elements
  function checkConservative() {
    const elements = [document.documentElement, document.body];

    for (const element of elements) {
      if (!element) continue;
      try {
        if (element.scrollWidth > window.innerWidth) {
          const overflow = element.scrollWidth - window.innerWidth;
          applyFix(element, `scrollWidth overflow ${overflow}px`);
        }
      } catch (_e) {
        // Skip errors
      }
    }
  }

  // Mode: Moderate - All elements, obvious overflow only
  function checkModerate() {
    // First do conservative check
    checkConservative();

    const viewportWidth = window.innerWidth;
    const tolerance = 5; // pixels

    document.querySelectorAll("*").forEach((element) => {
      if (element.classList.contains(FIX_CLASS)) return;
      if (element.id === BADGE_ID) return;

      try {
        const rect = element.getBoundingClientRect();

        // Check if element extends beyond viewport (with tolerance)
        if (rect.right > viewportWidth + tolerance) {
          const overflow = Math.round(rect.right - viewportWidth);
          applyFix(element, `extends viewport by ${overflow}px`);
        }
      } catch (_e) {
        // Skip errors
      }
    });
  }

  // Mode: Aggressive - Everything including edge cases
  function checkAggressive() {
    // First do moderate check
    checkModerate();

    const viewportWidth = window.innerWidth;

    document.querySelectorAll("*").forEach((element) => {
      if (element.classList.contains(FIX_CLASS)) return;
      if (element.id === BADGE_ID) return;

      try {
        const styles = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();

        // Check for transforms that might cause visual overflow
        if (styles.transform !== "none") {
          if (rect.right > viewportWidth || rect.left < 0) {
            applyFix(element, `transform overflow (${styles.transform})`);
          }
        }

        // Check for negative margins
        const marginLeft = Number.parseFloat(styles.marginLeft);
        const marginRight = Number.parseFloat(styles.marginRight);
        if (marginLeft < -10 || marginRight < -10) {
          if (rect.right > viewportWidth || rect.left < 0) {
            applyFix(element, `negative margin (L:${marginLeft}, R:${marginRight})`);
          }
        }

        // Check for 100vw width (common culprit)
        if (styles.width === "100vw" || element.style.width === "100vw") {
          applyFix(element, "100vw width detected");
        }

        // Check absolutely positioned elements off-screen
        if (styles.position === "absolute" || styles.position === "fixed") {
          if (rect.right > viewportWidth + 50 || rect.left < -50) {
            applyFix(element, `positioned element off-screen`);
          }
        }
      } catch (_e) {
        // Skip errors
      }
    });
  }

  function runFix(isInitial = false) {
    fixedElementsCount = 0;

    console.log(`[Overflow Fixer] Running in ${currentMode} mode...`);

    switch (currentMode) {
      case "conservative":
        checkConservative();
        break;
      case "moderate":
        checkModerate();
        break;
      case "aggressive":
        checkAggressive();
        break;
      default:
        checkConservative();
    }

    console.log(`[Overflow Fixer] Done. Fixed ${fixedElementsCount} elements.`);

    // Only show badge on initial run or if fixes were applied
    if (isInitial || fixedElementsCount > 0) {
      showBadge(fixedElementsCount > 0, currentMode);
    }
  }

  function setupMutationObserver() {
    if (observer) {
      observer.disconnect();
    }

    const debouncedFix = debounce(() => runFix(false), 500);

    observer = new MutationObserver(debouncedFix);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributeFilter: ["class", "style"],
    });

    console.log("[Overflow Fixer] MutationObserver active for dynamic content");
  }

  // Load saved mode and run
  function init() {
    // Check if chrome.storage is available (extension context)
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(["overflowFixerMode"], (result) => {
        currentMode = result.overflowFixerMode || DEFAULT_MODE;
        runFix(true);
        setupMutationObserver();
      });

      // Listen for mode changes from popup
      chrome.storage.onChanged.addListener((changes) => {
        if (changes.overflowFixerMode) {
          currentMode = changes.overflowFixerMode.newValue;
          // Clear previous fixes before re-running
          document.querySelectorAll(`.${FIX_CLASS}`).forEach((el) => {
            el.classList.remove(FIX_CLASS);
            el.style.removeProperty("overflow-x");
            el.style.removeProperty("max-width");
            el.style.removeProperty("box-sizing");
          });
          runFix(true);
        }
      });
    } else {
      // Fallback for non-extension context (testing)
      runFix(true);
      setupMutationObserver();
    }
  }

  init();
})();
