import React from 'react';

// Spartan-helmet badge for paid Premium students: the helmet with "PRO" written under it.
// On an avatar:  <span className="elite-wrap"><Avatar/> <EliteBadge /></span>   (sits on the corner)
// Next to a name: <EliteBadge inline size={14} />
export default function EliteBadge({ size = 18, inline = false }) {
  const w = Math.round(size * 1.3);
  const icon = Math.round(size * 0.72);
  const font = Math.max(5.5, Math.round(size * 0.33 * 10) / 10);
  return (
    <span
      className={`elite-badge${inline ? ' inline' : ''}`}
      style={{ width: w, minHeight: Math.round(size * 1.5) }}
      title="Elite Premium member"
      aria-label="Elite Premium member"
    >
      <svg viewBox="0 0 24 24" width={icon} height={icon} aria-hidden="true">
        <path fill="#2E1065" d="M12 2.5c-3.9 0-6.9 2.9-6.9 6.7v5.4c0 .5.2 1 .6 1.3l1.6 1.4V21h2.2v-3.2h1.1V21h2.8v-3.2h1.1V21h2.2v-4.4l1.6-1.4c.4-.3.6-.8.6-1.3V9.2c0-3.8-3-6.7-6.9-6.7z"/>
        <path fill="#FFC53D" d="M12 3.6c1.1 0 2.1.3 3 .8-.6 1.3-.9 2.8-.9 4.6h-4.2c0-1.8-.3-3.3-.9-4.6.9-.5 1.9-.8 3-.8z"/>
        <path fill="#FFC53D" d="M8 10.6h8v1.9c0 .7-.5 1.3-1.2 1.4l-.9.1V16h-3.8v-2l-.9-.1c-.7-.1-1.2-.7-1.2-1.4v-1.9z"/>
        <rect x="11.1" y="10.6" width="1.8" height="4.2" rx=".5" fill="#2E1065"/>
      </svg>
      <span className="elite-badge-txt" style={{ fontSize: font }}>PRO</span>
    </span>
  );
}
