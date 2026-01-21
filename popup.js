// Popup mode selector logic

const DEFAULT_MODE = "conservative";

function updateUI(mode) {
  document.querySelectorAll(".mode-option").forEach((option) => {
    const isSelected = option.dataset.mode === mode;
    option.classList.toggle("selected", isSelected);
    option.querySelector("input").checked = isSelected;
  });
}

// Load current mode on popup open
chrome.storage.sync.get(["overflowFixerMode"], (result) => {
  const mode = result.overflowFixerMode || DEFAULT_MODE;
  updateUI(mode);
});

// Handle mode selection
document.querySelectorAll(".mode-option").forEach((option) => {
  option.addEventListener("click", () => {
    const mode = option.dataset.mode;
    chrome.storage.sync.set({ overflowFixerMode: mode }, () => {
      updateUI(mode);
    });
  });
});
