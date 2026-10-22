// Blog illustration toolkit (runs at build time).
//  - expandShortcodes(html): turns [[callout ...]], [[qa ...]], [[flow ...]] etc. into designed HTML
//  - scene(key): small flat illustrations used inside posts and on covers
//  - coverSvg(post): a designed cover image for every post (1200x630 SVG)
// Authors never write SVG: they use shortcodes (see public/blog/AUTHORING.md).

const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Allow a few inline tags in author text (everything else is escaped).
const rich = (s) => esc(s).replace(/&lt;(\/?)(b|i|em|strong|sub|sup|code|u)&gt;/g, '<$1$2>');
const list = (s, sep = ';') => String(s || '').split(sep).map((x) => x.trim()).filter(Boolean);
const parts = (s) => String(s || '').split('|').map((x) => x.trim());

// ── Illustrations (400x400 box). Colours come from the palette p = {a,b,c,d}. ──
const SCENES = {
  book: (p) => `<rect x="70" y="250" width="260" height="34" rx="8" fill="${p.d}"/><rect x="90" y="206" width="240" height="40" rx="8" fill="${p.b}"/><rect x="60" y="164" width="250" height="38" rx="8" fill="${p.c}"/><path d="M200 150c-40-34-96-34-130-8v-74c34-24 90-24 130 10 40-34 96-34 130-10v74c-34-26-90-26-130 8z" fill="#fff"/><path d="M200 78v72" stroke="${p.a}" stroke-width="5"/><g fill="none" stroke="${p.b}" stroke-width="5" stroke-linecap="round"><path d="M92 96q40-12 80 8M92 120q40-12 80 8M228 104q40-20 80-8M228 128q40-20 80-8"/></g>`,
  calculator: (p) => `<rect x="110" y="50" width="190" height="300" rx="26" fill="${p.d}"/><rect x="132" y="76" width="146" height="62" rx="12" fill="#fff"/><text x="262" y="122" font-size="40" font-weight="800" text-anchor="end" fill="${p.d}" font-family="system-ui,sans-serif">3.14</text>${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<rect x="${134 + c * 50}" y="${160 + r * 46}" width="40" height="34" rx="9" fill="${r === 3 && c === 2 ? p.a : '#fff'}" opacity="${r === 3 && c === 2 ? 1 : .92}"/>`).join('')).join('')}`,
  flask: (p) => `<path d="M165 60h70v100l84 150c12 22-2 40-26 40H107c-24 0-38-18-26-40l84-150z" fill="#fff" opacity=".95"/><path d="M130 270h140l48 40c8 24-4 40-28 40H110c-24 0-36-16-28-40z" fill="${p.a}"/><circle cx="180" cy="240" r="12" fill="${p.b}"/><circle cx="222" cy="214" r="8" fill="${p.c}"/><circle cx="200" cy="180" r="6" fill="${p.b}"/><rect x="150" y="48" width="100" height="18" rx="9" fill="${p.d}"/>`,
  brain: (p) => `<path d="M200 90c-30-34-90-20-96 28-30 6-44 44-24 72-12 30 8 62 40 62 10 22 40 28 56 8 16 20 46 14 56-8 32 0 52-32 40-62 20-28 6-66-24-72-6-48-66-62-96-28z" fill="${p.b}"/><g stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"><path d="M200 96v190M200 150c-26-6-44 6-52 24M200 210c28-4 44 10 52 26M150 120c14 6 24 16 28 30M250 120c-14 6-24 16-28 30"/></g><circle cx="320" cy="90" r="26" fill="${p.a}"/><path d="M308 90l9 9 17-20" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  clock: (p) => `<circle cx="200" cy="205" r="130" fill="#fff"/><circle cx="200" cy="205" r="130" fill="none" stroke="${p.d}" stroke-width="14"/>${Array.from({ length: 12 }, (_, i) => { const a = (i * 30 - 90) * Math.PI / 180; return `<line x1="${200 + 104 * Math.cos(a)}" y1="${205 + 104 * Math.sin(a)}" x2="${200 + 118 * Math.cos(a)}" y2="${205 + 118 * Math.sin(a)}" stroke="${p.d}" stroke-width="6" stroke-linecap="round"/>`; }).join('')}<path d="M200 205V130" stroke="${p.d}" stroke-width="10" stroke-linecap="round"/><path d="M200 205l56 32" stroke="${p.a}" stroke-width="10" stroke-linecap="round"/><circle cx="200" cy="205" r="12" fill="${p.a}"/><rect x="150" y="48" width="100" height="22" rx="10" fill="${p.d}"/>`,
  chart: (p) => `<rect x="60" y="64" width="290" height="260" rx="22" fill="#fff"/><g>${[70, 120, 170, 120, 210].map((h, i) => `<rect x="${92 + i * 50}" y="${290 - h}" width="34" height="${h}" rx="8" fill="${[p.b, p.c, p.a, p.c, p.d][i]}"/>`).join('')}</g><path d="M92 214l50-46 50 22 50-52 50-18" stroke="${p.d}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  trophy: (p) => `<path d="M130 70h140v90c0 44-30 72-70 72s-70-28-70-72z" fill="${p.a}"/><path d="M130 94H88c0 50 18 72 52 78M270 94h42c0 50-18 72-52 78" stroke="${p.a}" stroke-width="14" fill="none" stroke-linecap="round"/><rect x="186" y="230" width="28" height="48" fill="${p.a}"/><rect x="140" y="278" width="120" height="30" rx="10" fill="${p.d}"/><path d="M200 100l12 26 28 4-20 20 5 28-25-14-25 14 5-28-20-20 28-4z" fill="#fff"/>`,
  phone: (p) => `<rect x="120" y="40" width="160" height="320" rx="30" fill="${p.d}"/><rect x="134" y="66" width="132" height="268" rx="16" fill="#fff"/><rect x="148" y="86" width="104" height="26" rx="8" fill="${p.b}"/><rect x="148" y="126" width="104" height="52" rx="10" fill="${p.c}" opacity=".5"/><rect x="148" y="190" width="104" height="14" rx="7" fill="${p.c}"/><rect x="148" y="214" width="70" height="14" rx="7" fill="${p.c}"/><rect x="148" y="278" width="104" height="36" rx="18" fill="${p.a}"/>`,
  pencil: (p) => `<g transform="rotate(-38 200 200)"><rect x="150" y="40" width="100" height="250" rx="10" fill="${p.a}"/><rect x="150" y="40" width="100" height="46" rx="10" fill="${p.d}"/><path d="M150 290h100l-50 82z" fill="#FDE7C4"/><path d="M178 340h44l-22 32z" fill="${p.d}"/><rect x="176" y="40" width="10" height="250" fill="#fff" opacity=".35"/></g><path d="M70 330q40-30 80 0t80 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>`,
  school: (p) => `<path d="M200 60l150 70H50z" fill="${p.d}"/><rect x="70" y="130" width="260" height="170" fill="#fff"/><rect x="170" y="210" width="60" height="90" rx="8" fill="${p.a}"/>${[0, 1].map((i) => `<rect x="${96 + i * 160}" y="160" width="44" height="52" rx="8" fill="${p.c}"/>`).join('')}<rect x="50" y="300" width="300" height="20" rx="8" fill="${p.b}"/><path d="M200 60V26l36 12-36 12" fill="${p.a}"/>`,
  coin: (p) => `<ellipse cx="200" cy="300" rx="120" ry="30" fill="${p.d}" opacity=".6"/><circle cx="200" cy="190" r="110" fill="${p.a}"/><circle cx="200" cy="190" r="82" fill="none" stroke="#fff" stroke-width="8" opacity=".7"/><text x="200" y="218" font-size="100" font-weight="900" text-anchor="middle" fill="#fff" font-family="system-ui,sans-serif">₦</text>`,
  globe: (p) => `<circle cx="200" cy="200" r="130" fill="${p.b}"/><g fill="${p.c}"><path d="M120 150c30-34 76-32 90-10 14 24-20 42-6 70 10 20-18 38-40 30-30-12-60-54-44-90z"/><path d="M240 110c24-4 50 12 54 38 4 28-26 36-34 60-6 16-30 6-36-12-8-24 0-80 16-86z"/></g><ellipse cx="200" cy="200" rx="130" ry="46" fill="none" stroke="#fff" stroke-width="5" opacity=".6"/><circle cx="200" cy="200" r="130" fill="none" stroke="${p.d}" stroke-width="8"/>`,
  chat: (p) => `<rect x="60" y="80" width="220" height="140" rx="30" fill="#fff"/><path d="M110 220l-6 54 56-54z" fill="#fff"/><rect x="92" y="116" width="156" height="14" rx="7" fill="${p.c}"/><rect x="92" y="146" width="110" height="14" rx="7" fill="${p.c}"/><rect x="130" y="212" width="210" height="110" rx="26" fill="${p.a}"/><path d="M300 322l8 44-46-44z" fill="${p.a}"/><circle cx="176" cy="268" r="9" fill="#fff"/><circle cx="214" cy="268" r="9" fill="#fff"/><circle cx="252" cy="268" r="9" fill="#fff"/>`,
};
const SCENE_KEYS = Object.keys(SCENES);

const PALETTE = {
  jamb:         { bg1: '#4C1D95', bg2: '#7C3AED', a: '#FFC53D', b: '#A78BFA', c: '#DDD6FE', d: '#2E1065', chip: '#FFC53D', chipText: '#3B1A00', label: 'JAMB' },
  waec:         { bg1: '#064E3B', bg2: '#059669', a: '#FDE047', b: '#34D399', c: '#A7F3D0', d: '#022C22', chip: '#FDE047', chipText: '#3B2A00', label: 'WAEC' },
  neco:         { bg1: '#7C2D12', bg2: '#EA580C', a: '#FDE68A', b: '#FB923C', c: '#FED7AA', d: '#431407', chip: '#FDE68A', chipText: '#431407', label: 'NECO' },
  'study-tips': { bg1: '#1E3A8A', bg2: '#2563EB', a: '#FBBF24', b: '#60A5FA', c: '#BFDBFE', d: '#172554', chip: '#FBBF24', chipText: '#3B2A00', label: 'STUDY TIPS' },
  gst:          { bg1: '#7F1D1D', bg2: '#DC2626', a: '#FCD34D', b: '#F87171', c: '#FECACA', d: '#450A0A', chip: '#FCD34D', chipText: '#450A0A', label: 'GST' },
  lessons:      { bg1: '#134E4A', bg2: '#0D9488', a: '#FDE047', b: '#2DD4BF', c: '#99F6E4', d: '#042F2E', chip: '#FDE047', chipText: '#042F2E', label: 'LESSON' },
};
const DEFAULT_SCENE = { jamb: 'book', waec: 'flask', neco: 'pencil', 'study-tips': 'brain', gst: 'school', lessons: 'calculator' };
const pal = (cat) => PALETTE[cat] || PALETTE['study-tips'];

function scene(key, cat = 'study-tips', size = 400) {
  const p = pal(cat);
  const fn = SCENES[key] || SCENES[DEFAULT_SCENE[cat]] || SCENES.book;
  return `<svg viewBox="0 0 400 400" width="${size}" height="${size}" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><circle cx="200" cy="200" r="190" fill="${p.bg2}" opacity=".18"/>${fn(p)}</svg>`;
}

function wrapLines(text, max, maxLines) {
  const words = String(text).split(/\s+/); const lines = []; let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…'; }
  return lines;
}

// 1200x630 cover: category gradient, title, chip, and a flat illustration.
function coverSvg(post) {
  const p = pal(post.category);
  const lines = wrapLines(post.coverTitle || post.title, 22, 4);
  const fs = lines.length > 3 ? 54 : 62;
  const startY = 330 - ((lines.length - 1) * fs * 1.14) / 2;
  const key = post.scene && SCENES[post.scene] ? post.scene : DEFAULT_SCENE[post.category] || 'book';
  const chipText = (post.categoryLabel || p.label).toUpperCase();
  const chipW = Math.max(120, chipText.length * 15 + 44);
  const dots = Array.from({ length: 28 }, (_, i) => `<circle cx="${(i * 97) % 1200}" cy="${(i * 53) % 630}" r="${2 + (i % 3)}" fill="#fff" opacity="${.08 + (i % 4) * .03}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="${esc(post.title)}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.bg1}"/><stop offset="1" stop-color="${p.bg2}"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/>${dots}<circle cx="1010" cy="300" r="300" fill="#fff" opacity=".07"/><circle cx="1090" cy="120" r="150" fill="${p.a}" opacity=".16"/><rect x="64" y="64" width="${chipW}" height="46" rx="23" fill="${p.chip}"/><text x="${64 + chipW / 2}" y="95" text-anchor="middle" font-size="22" font-weight="800" letter-spacing="1.5" fill="${p.chipText}" font-family="system-ui,Segoe UI,Arial,sans-serif">${esc(chipText)}</text><g font-family="system-ui,Segoe UI,Arial,sans-serif" font-weight="800" fill="#fff" font-size="${fs}">${lines.map((l, i) => `<text x="64" y="${startY + i * fs * 1.14}">${esc(l)}</text>`).join('')}</g><text x="64" y="574" font-size="26" font-weight="700" fill="#fff" opacity=".85" font-family="system-ui,Segoe UI,Arial,sans-serif">EliteScholars · elitescholars.site</text><g transform="translate(720 130) scale(1.1)">${SCENES[key](p)}</g></svg>`;
}

// ── Shortcodes ───────────────────────────────────────────────────────────────
const ICON = { tip: '💡', warn: '⚠️', key: '🔑', note: '📝', fact: '📌' };

const RENDER = {
  callout: (a, cat) => { const [type, title, text] = parts(a); const t = ICON[type] ? type : 'tip'; return `<aside class="bx bx-${t}"><div class="bx-ic" aria-hidden="true">${ICON[t]}</div><div><b>${rich(title)}</b><p>${rich(text)}</p></div></aside>`; },
  qa: (a) => { const [q, steps, ans] = parts(a); return `<div class="bx bx-qa"><div class="bx-q"><span>Question</span>${rich(q)}</div><ol class="bx-steps">${list(steps).map((s) => `<li>${rich(s)}</li>`).join('')}</ol><div class="bx-a"><span>Answer</span>${rich(ans)}</div></div>`; },
  flow: (a) => `<div class="bx bx-flow" role="list">${list(a).map((s, i, arr) => `<div class="bx-node" role="listitem"><b>${i + 1}</b><span>${rich(s)}</span></div>${i < arr.length - 1 ? '<i class="bx-arrow" aria-hidden="true"></i>' : ''}`).join('')}</div>`,
  compare: (a) => { const [l, r, ls, rs] = parts(a); return `<div class="bx bx-compare"><div class="bx-col bad"><h4>${rich(l)}</h4><ul>${list(ls).map((s) => `<li>${rich(s)}</li>`).join('')}</ul></div><div class="bx-col good"><h4>${rich(r)}</h4><ul>${list(rs).map((s) => `<li>${rich(s)}</li>`).join('')}</ul></div></div>`; },
  timeline: (a) => `<ol class="bx bx-timeline">${list(a).map((s) => { const [k, v] = s.split('::'); return `<li><b>${rich(k)}</b><span>${rich(v || '')}</span></li>`; }).join('')}</ol>`,
  bars: (a) => {
    const [title, data, unit] = parts(a); const rows = list(data).map((s) => { const [k, v] = s.split('='); return [k.trim(), Number(v)]; }).filter((r) => Number.isFinite(r[1]));
    const max = Math.max(1, ...rows.map((r) => r[1]));
    return `<figure class="bx bx-bars"><figcaption>${rich(title)}</figcaption>${rows.map(([k, v]) => `<div class="bx-bar"><span>${rich(k)}</span><div><i style="width:${Math.max(4, Math.round((v / max) * 100))}%"></i></div><em>${v}${rich(unit || '')}</em></div>`).join('')}</figure>`;
  },
  formula: (a) => { const [name, f, note] = parts(a); return `<div class="bx bx-formula"><span>${rich(name)}</span><code>${rich(f)}</code>${note ? `<small>${rich(note)}</small>` : ''}</div>`; },
  stats: (a) => `<div class="bx bx-stats">${list(a).map((s) => { const [k, v] = s.split('::'); return `<div><b>${rich(k)}</b><span>${rich(v || '')}</span></div>`; }).join('')}</div>`,
  checklist: (a) => `<ul class="bx bx-check">${list(a).map((s) => `<li>${rich(s)}</li>`).join('')}</ul>`,
  scene: (a, cat) => { const [key, cap] = parts(a); return `<figure class="bx bx-scene bx-scene-${cat}">${scene(key, cat, 220)}${cap ? `<figcaption>${rich(cap)}</figcaption>` : ''}</figure>`; },
  steps: (a) => `<ol class="bx bx-numbered">${list(a).map((s) => { const [k, v] = s.split('::'); return `<li><b>${rich(k)}</b>${v ? `<span>${rich(v)}</span>` : ''}</li>`; }).join('')}</ol>`,
};

function expandShortcodes(html, cat = 'study-tips') {
  return String(html || '').replace(/(?:<p>\s*)?\[\[(\w+)\s+([\s\S]*?)\]\](?:\s*<\/p>)?/g, (m, name, args) => {
    const fn = RENDER[name];
    if (!fn) throw new Error(`Unknown blog shortcode [[${name} …]]`);
    return fn(args.replace(/\s*\n\s*/g, ' ').trim(), cat);
  }).replace(/<table/g, '<div class="bx-table"><table').replace(/<\/table>/g, '</table></div>');
}

// Anchors + table of contents from the <h2> headings.
function addToc(html) {
  const heads = []; let n = 0;
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (m, t) => { const id = `s${++n}`; heads.push([id, t.replace(/<[^>]+>/g, '')]); return `<h2 id="${id}">${t}</h2>`; });
  if (heads.length < 4) return out;
  const toc = `<nav class="bx-toc" aria-label="In this article"><b>In this article</b><ol>${heads.map(([id, t]) => `<li><a href="#${id}">${esc(t)}</a></li>`).join('')}</ol></nav>`;
  const i = out.indexOf('<h2');
  return i < 0 ? out : out.slice(0, i) + toc + out.slice(i);
}

const faqHtml = (faq) => (Array.isArray(faq) && faq.length
  ? `<section class="bx-faq"><h2>Frequently asked questions</h2>${faq.map((f) => `<details><summary>${rich(f.q)}</summary><p>${rich(f.a)}</p></details>`).join('')}</section>` : '');
const faqLd = (faq) => (Array.isArray(faq) && faq.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: String(f.q).replace(/<[^>]+>/g, ''), acceptedAnswer: { '@type': 'Answer', text: String(f.a).replace(/<[^>]+>/g, '') } })) } : null);

module.exports = { scene, coverSvg, expandShortcodes, addToc, faqHtml, faqLd, SCENE_KEYS };
