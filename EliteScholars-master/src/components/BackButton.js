import React from 'react';

// ============================================================================
// BackButton — Consistent back arrow used across all screens.
// Props:
//   onClick   — handler
//   light     — white version (for dark headers)
//   label     — text label (defaults to "Back")
//   truncate  — truncate label to 24 chars if true
// ============================================================================

export default function BackButton({ onClick, light = false, label = 'Back', truncate = false }) {
  const display = truncate && label.length > 22 ? label.slice(0, 22) + '…' : label;

  return (
    <button
      className={`back-btn ${light ? 'back-btn-light' : 'back-btn-dark'}`}
      onClick={onClick}
      aria-label={`Go back: ${label}`}
    >
      <span className="back-btn-arrow">←</span>
      <span className="back-btn-label">{display}</span>
    </button>
  );
}
