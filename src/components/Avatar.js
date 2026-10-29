import React from 'react';

// Deterministic unique avatar from any string: gradient + pattern + animal, so the same player always looks the same
// (works for guests too, because it only needs a name).
const ANIMALS = ['🦊', '🐼', '🦁', '🐯', '🐸', '🐙', '🦄', '🐧', '🦉', '🐬', '🦋', '🐢', '🦅', '🐨', '🐵', '🐰', '🦈', '🐺', '🦒', '🐘', '🦜', '🐝', '🦖', '🐳'];
const hash = (str) => { let h = 2166136261; const s = String(str || '?'); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

export function avatarSpec(name) {
  const h = hash(String(name || '?').toLowerCase());
  const h1 = h % 360, h2 = (h1 + 40 + ((h >>> 9) % 140)) % 360, ang = (h >>> 4) % 360, pat = (h >>> 12) % 4;
  return { animal: ANIMALS[(h >>> 3) % ANIMALS.length], h1, h2, ang, pat };
}

export default function Avatar({ name, size = 36, ring }) {
  const a = avatarSpec(name);
  const overlay = [
    'radial-gradient(circle at 25% 25%, rgba(255,255,255,.35), transparent 55%)',
    'repeating-linear-gradient(45deg, rgba(255,255,255,.14) 0 4px, transparent 4px 9px)',
    'radial-gradient(circle at 80% 85%, rgba(0,0,0,.25), transparent 60%)',
    'radial-gradient(rgba(255,255,255,.22) 1.5px, transparent 2px) 0 0/8px 8px',
  ][a.pat];
  return (
    <span className="avt" aria-hidden="true" style={{ width: size, height: size, fontSize: size * 0.54, background: `${overlay}, linear-gradient(${a.ang}deg, hsl(${a.h1} 75% 55%), hsl(${a.h2} 75% 45%))`, boxShadow: ring ? `0 0 0 3px ${ring}` : undefined }}>
      {a.animal}
    </span>
  );
}
