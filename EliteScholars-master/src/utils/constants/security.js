// ============================================================================
// constants/security.js — Master on/off switches for every security measure
// Set any flag to false to disable that protection without touching logic code
// ============================================================================

// ── Master switch ─────────────────────────────────────────────────────────────
// Set to false to disable ALL security measures in one go (e.g. during dev)
export const SECURITY_ENABLED = true;

// ── Individual measures ───────────────────────────────────────────────────────
// Each one only applies when SECURITY_ENABLED is also true

// Injects a CSS rule that prevents users from selecting / highlighting text
export const SECURITY_DISABLE_TEXT_SELECTION = true;

// Blocks the right-click context menu across the entire app
export const SECURITY_DISABLE_RIGHT_CLICK = true;

// Intercepts Ctrl+C / Ctrl+X so content cannot be copied or cut
export const SECURITY_DISABLE_COPY_CUT = true;

// Blocks keyboard shortcuts used to open DevTools or view source:
// F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S, Ctrl+P
export const SECURITY_DISABLE_DEVTOOLS_SHORTCUTS = true;

// Polls every 1.5 s and prints a warning to the console if DevTools appear open
// (uses the window size heuristic — not foolproof but catches casual attempts)
export const SECURITY_DETECT_DEVTOOLS = true;

// Prevents dragging text or images out of the app window
export const SECURITY_DISABLE_DRAG = true;

// Prints a styled warning message in the browser console on app load
export const SECURITY_CONSOLE_WARNING = true;

// Interval (ms) for the DevTools size-heuristic check
// Only used when SECURITY_DETECT_DEVTOOLS is true
export const SECURITY_DEVTOOLS_POLL_MS = 1500;