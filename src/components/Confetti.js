import React, { useMemo } from 'react';

// ============================================================================
// Confetti — lightweight celebratory burst, no dependencies.
// Mount it conditionally (e.g. {won && <Confetti />}) — it renders its
// pieces once via useMemo so re-renders don't reshuffle mid-fall, and it's
// pointer-events:none so it never blocks taps underneath it.
// ============================================================================

const COLORS = ['#FFC53D', '#FFE8A3', '#8B5CF6', '#9169e0', '#0F9D74', '#FFFFFF'];

export default function Confetti({ count = 70, duration = 2600 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 6 + Math.random() * 7;
        return {
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 0.3,
          fall: 1.6 + Math.random() * 1.3,
          color: COLORS[i % COLORS.length],
          drift: Math.round((Math.random() - 0.5) * 160),
          rot: Math.round(Math.random() * 520 - 260),
          size,
          round: Math.random() > 0.45,
        };
      }),
    [count]
  );

  return (
    <div className="confetti-burst" aria-hidden="true" style={{ '--confetti-life': `${duration}ms` }}>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * (p.round ? 1 : 0.42),
            background: p.color,
            borderRadius: p.round ? '50%' : '2px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.fall}s`,
            '--drift': `${p.drift}px`,
            '--rot': `${p.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}
