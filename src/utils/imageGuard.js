// Checks a photo on the student's own phone BEFORE it is posted. No AI keys are used anywhere.
//   1. Skin check   — plain pixel maths (works offline, instant): a picture that is mostly skin colour is stopped.
//   2. NSFWJS       — an open-source picture classifier (TensorFlow.js) for nudity / sexual content.
//   3. Text check   — Tesseract.js (open-source OCR) reads any words in the picture; they go through the same word
//                     filter as statuses (money offers, exam leaks, betting, phone numbers, links, explicit words).
// The two libraries load from a CDN the first time they are needed (a few MB, then cached by the phone).
// Result: { state: 'clean' | 'flagged' | 'unchecked', reason, text }
//   unchecked = a library could not load (offline, slow, blocked). The server then keeps the post to the poster's squads
//   only and shows it in Admin → Status as "not scanned".
import { checkText } from './textGuard';

const TF_SRC = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js';
const NSFW_SRC = 'https://cdn.jsdelivr.net/npm/nsfwjs@4.2.1/dist/browser/nsfwjs.min.js';
const OCR_SRC = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';

const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);

function loadScript(src, ms = 25000) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    s.src = src; s.async = true; s.crossOrigin = 'anonymous';
    s.onload = () => { clearTimeout(t); resolve(); };
    s.onerror = () => { clearTimeout(t); reject(new Error('load failed')); };
    document.head.appendChild(s);
  });
}

let nsfwP = null;
const getNsfw = () => {
  if (!nsfwP) {
    nsfwP = (async () => {
      if (!window.tf) await loadScript(TF_SRC);
      if (!window.nsfwjs) await loadScript(NSFW_SRC);
      return window.nsfwjs.load();
    })().catch((e) => { nsfwP = null; throw e; });
  }
  return nsfwP;
};

let ocrP = null;
const getOcr = () => {
  if (!ocrP) {
    ocrP = (async () => {
      if (!window.Tesseract) await loadScript(OCR_SRC);
      return window.Tesseract;
    })().catch((e) => { ocrP = null; throw e; });
  }
  return ocrP;
};

const loadImage = (dataUrl) => new Promise((resolve, reject) => { const i = new Image(); i.onload = () => resolve(i); i.onerror = reject; i.src = dataUrl; });

function canvasOf(img, max) {
  const k = Math.min(1, max / Math.max(img.naturalWidth || img.width, img.naturalHeight || img.height));
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round((img.naturalWidth || img.width) * k));
  c.height = Math.max(1, Math.round((img.naturalHeight || img.height) * k));
  c.getContext('2d', { willReadFrequently: true }).drawImage(img, 0, 0, c.width, c.height);
  return c;
}

// ── 1. skin colour maths ────────────────────────────────────────────────────
export function skinStats(rgba, w, h) {
  const G = 24; // grid of blocks, to find one big connected skin area
  const cell = new Uint16Array(G * G);
  const tot = new Uint16Array(G * G);
  let skin = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = rgba[i], g = rgba[i + 1], b = rgba[i + 2];
      const Y = 0.299 * r + 0.587 * g + 0.114 * b;
      const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
      const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
      const isSkin = cb >= 77 && cb <= 127 && cr >= 133 && cr <= 173 && Y > 40 && r > 90 && r > g && r > b && (r - Math.min(g, b)) > 15;
      const gi = Math.min(G - 1, Math.floor((y / h) * G)) * G + Math.min(G - 1, Math.floor((x / w) * G));
      tot[gi]++;
      if (isSkin) { skin++; cell[gi]++; }
    }
  }
  const on = Array.from(cell, (c, i) => c / (tot[i] || 1) > 0.6);
  const seen = new Array(G * G).fill(false);
  let biggest = 0;
  for (let s = 0; s < G * G; s++) {
    if (!on[s] || seen[s]) continue;
    let n = 0; const st = [s]; seen[s] = true;
    while (st.length) {
      const c = st.pop(); n++;
      const cx = c % G, cy = (c / G) | 0;
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
        const nx = cx + dx, ny = cy + dy;
        if (nx < 0 || ny < 0 || nx >= G || ny >= G) return;
        const ni = ny * G + nx;
        if (on[ni] && !seen[ni]) { seen[ni] = true; st.push(ni); }
      });
    }
    biggest = Math.max(biggest, n);
  }
  return { ratio: skin / (w * h), blob: biggest / (G * G) };
}

const skinVerdict = (st) => (st.ratio > 0.78 && st.blob > 0.65 ? 'strong' : st.ratio > 0.38 && st.blob > 0.25 ? 'moderate' : 'low');

// ── the check ───────────────────────────────────────────────────────────────
export async function scanImage(dataUrl) {
  let img;
  try { img = await loadImage(dataUrl); } catch { return { state: 'unchecked', reason: 'unreadable', text: '' }; }

  let skin = 'low';
  try {
    const c = canvasOf(img, 160);
    skin = skinVerdict(skinStats(c.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, c.width, c.height).data, c.width, c.height));
  } catch { /* the other checks still run */ }
  if (skin === 'strong') return { state: 'flagged', reason: 'adult', text: '' };

  let nsfwOk = false;
  try {
    const model = await withTimeout(getNsfw(), 35000);
    const preds = await withTimeout(model.classify(canvasOf(img, 480)), 20000);
    const p = Object.fromEntries(preds.map((x) => [x.className, x.probability]));
    nsfwOk = true;
    if ((p.Porn || 0) > 0.5 || (p.Hentai || 0) > 0.55 || (p.Sexy || 0) > 0.8 || (skin === 'moderate' && ((p.Porn || 0) + (p.Sexy || 0) + (p.Hentai || 0)) > 0.45)) return { state: 'flagged', reason: 'adult', text: '' };
  } catch { /* model unavailable */ }

  let text = '';
  let ocrOk = false;
  try {
    const T = await withTimeout(getOcr(), 30000);
    const res = await withTimeout(T.recognize(canvasOf(img, 1100), 'eng'), 45000);
    text = String((res && res.data && res.data.text) || '').replace(/\s+/g, ' ').trim().slice(0, 1500);
    ocrOk = true;
  } catch { /* OCR unavailable */ }
  if (text) {
    const g = checkText(text, { mode: 'image' });
    if (!g.ok) return { state: 'flagged', reason: g.flag === 'explicit' ? 'adult' : 'scam', text };
  }
  if (skin === 'moderate' && !nsfwOk) return { state: 'unchecked', reason: 'skin', text };
  return { state: nsfwOk && ocrOk ? 'clean' : 'unchecked', reason: '', text };
}

export const flaggedMessage = (r) => (r && r.reason === 'scam'
  ? 'That photo has words that look like a money, betting or exam-leak offer. It can\'t be posted.'
  : 'That photo can\'t be posted on EliteScholars. Please choose a different one.');

// Tell the server a photo was stopped on the phone, so the admin can review it (who, what, picture). Best effort.
export function reportBlocked(image, sc, where = 'status') {
  try {
    fetch('/api/status/blocked', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image, reason: sc && sc.reason, ocr: sc && sc.text, where }), keepalive: true }).catch(() => {});
  } catch { /* ignore */ }
}
