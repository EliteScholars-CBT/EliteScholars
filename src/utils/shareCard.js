// Draws a shareable 1080x1350 picture (score or badge) and shares it anywhere.
const W = 1080, H = 1350;

function wrap(ctx, text, x, y, maxW, lh, maxLines = 4) {
  const words = String(text).split(/\s+/);
  let line = '', lines = [];
  words.forEach((w) => {
    const t = line ? line + ' ' + w : w;
    if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
  });
  if (line) lines.push(line);
  lines.slice(0, maxLines).forEach((l, i) => ctx.fillText(l, x, y + i * lh));
  return Math.min(lines.length, maxLines) * lh;
}

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

// card: { kind:'score'|'badge', icon, headline, big, sub, name, accent, link }
export function renderCard(card) {
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  const accent = card.accent || '#FFC53D';
  const font = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#1E0B4B'); g.addColorStop(0.55, '#4C1D95'); g.addColorStop(1, '#2E1065');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  // soft glows + stars
  [[180, 220, 320, accent], [900, 1050, 380, '#8B5CF6']].forEach(([x, y, r, col]) => {
    const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, col + '55'); rg.addColorStop(1, col + '00');
    ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
  });
  ctx.fillStyle = 'rgba(255,255,255,.55)';
  for (let i = 0; i < 40; i++) { const x = (i * 197) % W, y = (i * 331) % H; ctx.beginPath(); ctx.arc(x, y, 1.5 + (i % 3), 0, 7); ctx.fill(); }

  // brand
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff'; ctx.font = `800 46px ${font}`;
  ctx.fillText('EliteScholars', W / 2, 120);
  ctx.fillStyle = accent; ctx.font = `700 26px ${font}`;
  ctx.fillText(card.kind === 'badge' ? 'NEW BADGE UNLOCKED' : 'PRACTICE RESULT', W / 2, 168);

  // main panel
  ctx.fillStyle = 'rgba(255,255,255,.09)'; rr(ctx, 90, 230, W - 180, 700, 56); ctx.fill();
  ctx.strokeStyle = accent + 'AA'; ctx.lineWidth = 3; rr(ctx, 90, 230, W - 180, 700, 56); ctx.stroke();

  ctx.font = `400 190px ${font}`; ctx.fillStyle = '#fff';
  ctx.fillText(card.icon || '🏆', W / 2, 460);
  ctx.fillStyle = accent; ctx.font = `900 ${card.kind === 'badge' ? 78 : 170}px ${font}`;
  ctx.fillText(String(card.big || ''), W / 2, card.kind === 'badge' ? 610 : 650);
  ctx.fillStyle = '#fff'; ctx.font = `700 44px ${font}`;
  wrap(ctx, card.headline || '', W / 2, card.kind === 'badge' ? 690 : 730, W - 300, 56, 2);
  ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.font = `500 34px ${font}`;
  wrap(ctx, card.sub || '', W / 2, card.kind === 'badge' ? 790 : 830, W - 300, 46, 3);

  // who
  ctx.fillStyle = '#fff'; ctx.font = `800 40px ${font}`;
  ctx.fillText(card.name || 'A Scholar', W / 2, 1010);

  // invite strip
  ctx.fillStyle = accent; rr(ctx, 120, 1060, W - 240, 190, 40); ctx.fill();
  ctx.fillStyle = '#2E1065'; ctx.font = `900 46px ${font}`;
  ctx.fillText('Join me — it is free to start', W / 2, 1136);
  ctx.font = `700 34px ${font}`;
  ctx.fillText(String(card.link || 'elitescholars.site').replace(/^https?:\/\//, ''), W / 2, 1192);
  ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.font = `500 26px ${font}`;
  ctx.fillText('JAMB · WAEC · NECO · GST practice', W / 2, 1310);

  return new Promise((resolve) => c.toBlob((b) => resolve(b), 'image/png'));
}

export function canShareFiles(blob) {
  try {
    const f = new File([blob], 'elitescholars.png', { type: 'image/png' });
    return !!(navigator.canShare && navigator.canShare({ files: [f] }));
  } catch { return false; }
}

// Opens the phone's own share sheet (WhatsApp, Instagram, Telegram, Messages, …).
export async function nativeShare(blob, text, link) {
  const file = new File([blob], 'elitescholars.png', { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({ files: [file], text: `${text}\n${link}`, title: 'EliteScholars' });
    return true;
  }
  if (navigator.share) { await navigator.share({ text, url: link, title: 'EliteScholars' }); return true; }
  return false;
}

export function downloadBlob(blob, name = 'elitescholars-card.png') {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
