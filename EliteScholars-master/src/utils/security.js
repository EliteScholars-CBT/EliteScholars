import { attachSecurityTrackers } from '../analytics/securityAnalytics';

// ============================================================================
// security.js — Anti-scraping & content protection utilities
// Call applySecurityMeasures() once on app mount.
// ============================================================================

export function applySecurityMeasures() {
  // Attach analytics trackers
  attachSecurityTrackers();
  // ── 1. Disable text selection globally ──────────────────────────────────────
  const noSelectStyle = document.createElement('style');
  noSelectStyle.id = 'no-select-style';
  noSelectStyle.textContent = `
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
    input, textarea, [contenteditable] {
      -webkit-user-select: text !important;
      user-select: text !important;
    }
  `;
  if (!document.getElementById('no-select-style')) {
    document.head.appendChild(noSelectStyle);
  }

  // ── 2. Disable right-click context menu ─────────────────────────────────────
  document.addEventListener('contextmenu', preventDefault, { passive: false });

  // ── 3. Disable copy / cut keyboard shortcuts ─────────────────────────────────
  document.addEventListener('copy',  preventDefault, { passive: false });
  document.addEventListener('cut',   preventDefault, { passive: false });

  // ── 4. Disable common inspect/scraping shortcuts ─────────────────────────────
  document.addEventListener('keydown', (e) => {
    // F12 (devtools), Ctrl+Shift+I/J/C/U
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
      (e.ctrlKey && e.key === 'U') ||   // view source
      (e.ctrlKey && e.key === 'S') ||   // save page
      (e.ctrlKey && e.key === 'P')      // print
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, { passive: false });

  // ── 5. Detect devtools open (basic) ─────────────────────────────────────────
  // Width/height heuristic — not foolproof but catches casual attempts
  let devtoolsOpen = false;
  const devtoolsCheck = () => {
    const threshold = 160;
    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        console.clear();
        console.log('%cEliteScholars CBT', 'color:#8B5CF6;font-size:20px;font-weight:900;');
        console.log('%cContent is protected. Unauthorised scraping is not permitted.', 'color:#ef4444;font-size:13px;');
      }
    } else {
      devtoolsOpen = false;
    }
  };
  setInterval(devtoolsCheck, 1500);

  // ── 6. Disable drag (prevents dragging text/images out) ──────────────────────
  document.addEventListener('dragstart', preventDefault, { passive: false });

  // ── 7. Console warning ────────────────────────────────────────────────────────
  console.log('%cEliteScholars', 'color:#8B5CF6;font-size:24px;font-weight:900;');
  console.log('%c⚠️  Content is protected. Unauthorised scraping is a violation of our Terms of Service.', 'color:#ef4444;font-size:13px;');
}

function preventDefault(e) {
  e.preventDefault();
  return false;
}

export function removeSecurityMeasures() {
  document.removeEventListener('contextmenu', preventDefault);
  document.removeEventListener('copy',        preventDefault);
  document.removeEventListener('cut',         preventDefault);
  document.removeEventListener('dragstart',   preventDefault);
  const style = document.getElementById('no-select-style');
  if (style) style.remove();
}
