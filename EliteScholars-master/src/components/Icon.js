import React from 'react';

// ============================================================================
// Icon — dependency-free stroke icons (24x24 grid, currentColor).
// <Icon name="trophy" size={20} />
// <EmojiIcon emoji="🏆" />   → renders the matching icon if we have one,
//                              otherwise falls back to the emoji as text, so
//                              data files that still store emojis keep working.
// Emojis inside sentences ("Hi Michael 👋") are intentionally left as text.
// ============================================================================

const P = {
  book: (<><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" /><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" /><path d="M9 8h6" /></>),
  bookOpen: (<><path d="M12 6.5C10.2 5 7.6 4.5 3 4.5v13c4.6 0 7.2.5 9 2 1.8-1.5 4.4-2 9-2v-13c-4.6 0-7.2.5-9 2Z" /><path d="M12 6.5v13" /></>),
  swords: (<><path d="M14.5 17.5 4 7V4h3l10.5 10.5" /><path d="m13 19 6 2 2-2-2-6" /><path d="m3 21 3-3" /><path d="M20 4h-3l-3.5 3.5" /><path d="m21 4-6 6" /></>),
  trophy: (<><path d="M8 4h8v6a4 4 0 0 1-8 0V4Z" /><path d="M8 6H5a1 1 0 0 0-1 1c0 2.5 1.5 4 4 4" /><path d="M16 6h3a1 1 0 0 1 1 1c0 2.5-1.5 4-4 4" /><path d="M12 14v4" /><path d="M8 21h8" /><path d="M9.5 18h5" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>),
  bell: (<><path d="M6 9a6 6 0 1 1 12 0c0 6 2 7.5 2 7.5H4S6 15 6 9Z" /><path d="M10 20a2 2 0 0 0 4 0" /></>),
  upload: (<><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>),
  file: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5" /><path d="M9 13h6" /><path d="M9 17h4" /></>),
  layers: (<><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>),
  cards: (<><rect x="3" y="6" width="13" height="15" rx="2.5" /><path d="M8 3h11a2 2 0 0 1 2 2v12" /></>),
  sparkles: (<><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z" /><path d="M19 14v4" /><path d="M17 16h4" /><path d="M5 16v3" /><path d="M3.5 17.5h3" /></>),
  gamepad: (<><rect x="2.5" y="7" width="19" height="11" rx="5" /><path d="M7 10.5v4" /><path d="M5 12.5h4" /><circle cx="15.5" cy="11.5" r=".9" fill="currentColor" /><circle cx="18" cy="14" r=".9" fill="currentColor" /></>),
  cap: (<><path d="m12 4 10 5-10 5L2 9l10-5Z" /><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" /><path d="M22 9v6" /></>),
  zap: (<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />),
  flame: (<path d="M12 22c4 0 7-2.7 7-6.6 0-3-1.6-4.9-3.2-6.6-.6 1.5-1.5 2.3-2.5 2.6.4-3.4-.9-6.3-3.8-8.4.2 3.2-1.6 5-3.1 6.7C5 11.3 5 13 5 15.4 5 19.3 8 22 12 22Z" />),
  target: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></>),
  timer: (<><circle cx="12" cy="13.5" r="7.5" /><path d="M12 9.5v4l2.5 1.5" /><path d="M9.5 2.5h5" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>),
  check: (<path d="m5 12.5 4.5 4.5L19 7.5" />),
  checkCircle: (<><circle cx="12" cy="12" r="9" /><path d="m8 12.5 3 3 5-6" /></>),
  x: (<><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>),
  xCircle: (<><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6" /><path d="m15 9-6 6" /></>),
  lock: (<><rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>),
  arrowLeft: (<><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>),
  arrowRight: (<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>),
  chevronRight: (<path d="m9 5 7 7-7 7" />),
  moon: (<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" /></>),
  star: (<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />),
  crown: (<><path d="m3 8 4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8Z" /><path d="M5.5 21h13" /></>),
  gem: (<><path d="M6 3h12l4 6-10 12L2 9l4-6Z" /><path d="M2 9h20" /><path d="m9 3-2 6 5 12 5-12-2-6" /></>),
  brain: (<><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2.5 2.5 0 0 0-3-1Z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1V5a2.5 2.5 0 0 1 3-1Z" /></>),
  bulb: (<><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" /></>),
  chart: (<><path d="M4 20V4" /><path d="M4 20h16" /><path d="M8 16v-4" /><path d="M12 16V8" /><path d="M16 16v-6" /></>),
  trending: (<><path d="m3 17 6-6 4 4 8-8" /><path d="M15 7h6v6" /></>),
  flask: (<><path d="M9 3h6" /><path d="M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21.5h11.6a2 2 0 0 0 1.7-3L14 9V3" /><path d="M7.5 15h9" /></>),
  microscope: (<><path d="M6 21h12" /><path d="M9 21a6 6 0 0 0 0-11" /><rect x="9" y="3" width="4" height="9" rx="1.5" transform="rotate(20 11 7.5)" /><path d="M12 17H9" /></>),
  ruler: (<><path d="m3 17 14-14 4 4L7 21l-4-4Z" /><path d="m8 8 2 2M11 5l2 2M5 11l2 2M14 14l2 2" /></>),
  landmark: (<><path d="M3 10 12 4l9 6H3Z" /><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" /><path d="M3 21h18" /></>),
  coins: (<><ellipse cx="9" cy="7" rx="6" ry="3" /><path d="M3 7v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7" /><path d="M15 12.5c3 .1 6 1.3 6 3v2c0 1.7-2.7 3-6 3-2.4 0-4.4-.7-5.4-1.7" /></>),
  laptop: (<><rect x="4" y="5" width="16" height="11" rx="2" /><path d="M2 20h20" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.8 3 2.8 15 0 18-2.8-3-2.8-15 0-18Z" /></>),
  rocket: (<><path d="M5 15c-1.5 1.3-2 4.5-2 6 1.5 0 4.7-.5 6-2" /><path d="M12 15 9 12c1-4 4.5-8 11-9 0 6.500-4 10-8 12Z" /><circle cx="15" cy="9" r="1.5" /></>),
  mic: (<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11.5a6.500 6.500 0 0 0 13 0" /><path d="M12 18v3" /></>),
  home: (<><path d="m3 11 9-7.500 9 7.500" /><path d="M5.500 9.500V20h13V9.500" /><path d="M10 20v-5.500h4V20" /></>),
  settings: (<><circle cx="12" cy="12" r="3" /><path d="M12 2.500v3M12 18.500v3M21.500 12h-3M5.500 12h-3M18.700 5.300l-2.100 2.100M7.400 16.600l-2.100 2.100M18.700 18.700l-2.100-2.100M7.400 7.400 5.300 5.300" /></>),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2.500" /><path d="m4 7.500 8 6 8-6" /></>),
  search: (<><circle cx="11" cy="11" r="6.500" /><path d="m20 20-4.200-4.200" /></>),
  refresh: (<><path d="M20 12a8 8 0 1 1-2.500-5.800" /><path d="M20 4v5h-5" /></>),
  volume: (<><path d="M4 9.500v5h3.500L13 19V5L7.500 9.500H4Z" /><path d="M16.500 9a4 4 0 0 1 0 6" /><path d="M19 6.500a7.500 7.500 0 0 1 0 11" /></>),
  play: (<path d="M7 4.500v15l12-7.500-12-7.500Z" />),
  pause: (<><rect x="6" y="4.500" width="4.500" height="15" rx="1.200" fill="currentColor" stroke="none" /><rect x="13.500" y="4.500" width="4.500" height="15" rx="1.200" fill="currentColor" stroke="none" /></>),
  stop: (<rect x="5.500" y="5.500" width="13" height="13" rx="2.500" fill="currentColor" />),
  heart: (<path d="M12 20.500S3 15 3 8.800A4.800 4.800 0 0 1 12 6.500 4.800 4.800 0 0 1 21 8.800C21 15 12 20.500 12 20.500Z" />),
  share: (<><circle cx="6" cy="12" r="2.500" /><circle cx="18" cy="6" r="2.500" /><circle cx="18" cy="18" r="2.500" /><path d="m8.200 10.800 7.600-3.600M8.200 13.200l7.600 3.600" /></>),
  handshake: (<><path d="m11 17 2 2a1.400 1.400 0 0 0 2-2" /><path d="m14 14 2.500 2.500a1.400 1.400 0 0 0 2-2L15 11" /><path d="M3 9.500 7.500 5 12 8.500 16.500 5 21 9.500" /><path d="m3 9.500 7 7a1.400 1.400 0 0 0 2-2" /></>),
  alert: (<><path d="M12 3.500 2.500 20h19L12 3.500Z" /><path d="M12 10v4.500" /><circle cx="12" cy="17.300" r=".8" fill="currentColor" /></>),
  ban: (<><circle cx="12" cy="12" r="9" /><path d="m5.600 5.600 12.800 12.800" /></>),
  hourglass: (<><path d="M6 3h12M6 21h12" /><path d="M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" /></>),
  shop: (<><path d="M4 8h16l-1 12H5L4 8Z" /><path d="M8.500 8V6.500a3.500 3.500 0 0 1 7 0V8" /></>),
  pen: (<><path d="m4 20 1-4L16.500 4.500a2.100 2.100 0 0 1 3 3L8 19l-4 1Z" /><path d="m14.500 6.500 3 3" /></>),
  clipboard: (<><rect x="5" y="4.500" width="14" height="17" rx="2.500" /><path d="M9 4.500V3.500h6v1" /><path d="M9 11h6M9 15h4" /></>),
  trash: (<><path d="M4 7h16" /><path d="M9 7V4.500h6V7" /><path d="M6 7l1 13h10l1-13" /><path d="M10 11v6M14 11v6" /></>),
  plus: (<><path d="M12 5v14" /><path d="M5 12h14" /></>),
  wand: (<><path d="m4 20 11-11" /><path d="m14 7 3 3" /><path d="M18 3v3M16.500 4.500h3M20 12v2M19 13h2" /></>),
  list: (<><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.500" cy="6" r="1" fill="currentColor" /><circle cx="4.500" cy="12" r="1" fill="currentColor" /><circle cx="4.500" cy="18" r="1" fill="currentColor" /></>),
  shield: (<><path d="M12 3 4.500 6v6c0 4.500 3.200 7.600 7.500 9 4.300-1.400 7.500-4.500 7.500-9V6L12 3Z" /><path d="m9 12 2.200 2.200L15.500 10" /></>),
  store: (<><path d="M4 9.500 5.500 4h13L20 9.500" /><path d="M4 9.500a2.700 2.700 0 0 0 5.300 0 2.700 2.700 0 0 0 5.400 0 2.700 2.700 0 0 0 5.300 0" /><path d="M5 12.500V20h14v-7.500" /><path d="M10 20v-4.500h4V20" /></>),
  ballot: (<><rect x="3.500" y="12.500" width="17" height="8.500" rx="2" /><path d="M9 12.500V8h6v4.500" /><path d="m10.500 6 1.500-2.500L13.500 6" /></>),
  calc: (<><path d="M5 12h14" /><circle cx="12" cy="6.500" r="1.300" fill="currentColor" /><circle cx="12" cy="17.500" r="1.300" fill="currentColor" /></>),
  cross: (<><path d="M12 3v18" /><path d="M6.500 8.500h11" /></>),
  palette: (<><path d="M12 3a9 9 0 1 0 0 18c1.400 0 2-1 2-2 0-1.500-1-1.700-1-3 0-1 .8-2 2-2h2.500A3.500 3.500 0 0 0 21 10.500C21 6.300 17 3 12 3Z" /><circle cx="7.500" cy="11" r="1" fill="currentColor" /><circle cx="10" cy="7" r="1" fill="currentColor" /><circle cx="15" cy="7" r="1" fill="currentColor" /></>),
  chef: (<><path d="M7 14.500A4 4 0 1 1 9 7a4 4 0 0 1 6 0 4 4 0 1 1 2 7.500V20H7v-5.500Z" /><path d="M7 17h10" /></>),
  megaphone: (<><path d="M3 10v4a1 1 0 0 0 1 1h3l8 4.500V4.500L7 9H4a1 1 0 0 0-1 1Z" /><path d="M18.500 9a4 4 0 0 1 0 6" /><path d="m7 15 1.500 5" /></>),
  sprout: (<><path d="M12 21v-9" /><path d="M12 12c0-3.500-2.500-6-6.500-6 0 3.500 2.500 6 6.500 6Z" /><path d="M12 14c0-3 2.200-5.500 6-5.500 0 3.200-2.200 5.500-6 5.500Z" /></>),
  idcard: (<><rect x="3" y="5" width="18" height="14" rx="2.500" /><circle cx="9" cy="11" r="2" /><path d="M5.800 16c.6-1.600 1.800-2.400 3.200-2.400s2.600.8 3.200 2.400" /><path d="M14.500 10h4M14.500 13.500h3" /></>),
  flag: (<><path d="M5 21V4" /><path d="M5 4.500c3-1.500 5 1.500 8 0s4.500-.5 6 0v9c-1.500-.5-3-1.500-6 0s-5-1.500-8 0" /></>),
  telescope: (<><path d="m3 12 12-6 2 4.500-12 6L3 12Z" /><path d="m15 6 3-1.500 2.500 4.500-3 1.500" /><path d="m9 15.500-3 5.500" /><path d="m11 14.500 3 6.500" /></>),
  dove: (<><path d="M21 6c-2.500 0-4.500 1-6 3l-2 3H8c-2.500 0-4 2-4.500 4.500 2-1 3.800-1 5.500 0 2 1.300 4 1.300 6-.5 2.500-2.200 3-5 3-7.500V6Z" /><circle cx="17" cy="8" r=".8" fill="currentColor" /></>),
  chat: (<path d="M4 5.500A2.500 2.500 0 0 1 6.500 3h11A2.500 2.500 0 0 1 20 5.500v8a2.500 2.500 0 0 1-2.500 2.500H11l-4.500 4v-4A2.500 2.500 0 0 1 4 13.500v-8Z" />),
  leaf: (<><path d="M5 19C5 10 10 4 20 4c0 10-6 15-15 15Z" /><path d="M5 19c3-5 6-8 10-10" /></>),
};

export function Icon({ name, size = 20, stroke = 1.9, className = '', style, title }) {
  const body = P[name];
  if (!body) return null;
  const filled = name === 'play' || name === 'zap' || name === 'heart';
  // size can be a number (px) or a CSS length like "1.1em" so icons dropped
  // inline in text scale with the surrounding font-size.
  const px = typeof size === 'number' ? size : undefined;
  const emSize = typeof size === 'string' ? size : undefined;
  return (
    <svg
      className={`ic ic-${name} ${className}`}
      width={px}
      height={px}
      style={emSize ? { width: emSize, height: emSize, ...style } : style}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {body}
    </svg>
  );
}

// Emoji → icon name. Anything not listed renders as the original emoji.
const MAP = {
  '📚': 'layers', '📖': 'bookOpen', '📗': 'book', '📘': 'book', '📕': 'book', '📝': 'pen', '📋': 'clipboard',
  '⚔️': 'swords', '⚔': 'swords', '🏆': 'trophy', '👤': 'user', '🔔': 'bell',
  '📤': 'upload', '📥': 'upload', '📄': 'file', '🃏': 'cards',
  '✨': 'sparkles', '🎮': 'gamepad', '🎓': 'cap', '⚡': 'zap', '🔥': 'flame', '🎯': 'target',
  '⏱️': 'timer', '⏱': 'timer', '⏰': 'clock', '⏳': 'hourglass',
  '✅': 'checkCircle', '✓': 'check', '❌': 'xCircle', '✕': 'x', '✖': 'x',
  '🔒': 'lock', '🌙': 'moon', '☀️': 'sun', '⭐': 'star', '🌟': 'star', '👑': 'crown', '💎': 'gem',
  '🧠': 'brain', '💡': 'bulb', '📊': 'chart', '📈': 'trending', '⚗️': 'flask', '🔬': 'microscope',
  '📐': 'ruler', '🏛️': 'landmark', '💰': 'coins', '💻': 'laptop', '🌍': 'globe', '🚀': 'rocket',
  '🎤': 'mic', '🗣️': 'chat', '🏠': 'home', '⌂': 'home', '⚙️': 'settings', '📧': 'mail', '🔍': 'search',
  '🔄': 'refresh', '🔊': 'volume', '▶': 'play', '❤️': 'heart', '🤝': 'handshake',
  '⚠️': 'alert', '⚠': 'alert', '🚫': 'ban', '🛍️': 'shop', '🗑️': 'trash', '🏫': 'landmark',
  '🔭': 'telescope', '🌿': 'leaf', '🕊️': 'dove', '📭': 'file', '📢': 'megaphone', '🎬': 'play',
  '🏪': 'store', '🗳️': 'ballot', '➗': 'calc', '✝️': 'cross', '🎨': 'palette', '🍲': 'chef', '🌱': 'sprout', '🪪': 'idcard', '🇳🇬': 'flag',
  '🛡️': 'shield', '←': 'arrowLeft', '→': 'arrowRight',
};

export const hasIcon = (emoji) => !!MAP[emoji];

export function EmojiIcon({ emoji, size = 20, stroke, className, style }) {
  const key = typeof emoji === 'string' ? emoji.trim() : emoji;
  const name = MAP[key];
  if (!name) return <span className={className} style={style}>{emoji}</span>;
  return <Icon name={name} size={size} stroke={stroke} className={className} style={style} />;
}

export default Icon;
