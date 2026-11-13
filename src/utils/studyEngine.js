// studyEngine.js — the app's study engine.
//
// The engine itself is the self-contained file at /study-engine/index.html (the one that is kept up to date by
// uploading a newer version over it). It runs on the device, with no AI. It is loaded once in a hidden frame and used
// for everything on the "Study from your own files" screen:
//   • reading files (PDF, Word, PowerPoint, photos, text)
//   • deciding if what was given is a question, a whole question paper, or notes to study
//   • solving / answering questions (maths, sciences and written questions), looking answers up across the web
//   • turning notes (or a topic the student asks about) into a study pack: notes, summary, flashcards, CBT
// The app never shows the engine's own page. Nothing here is specific to a subject.
import { BRIDGE_SRC } from './studyBridge';

export const SUPPORTED_HINT = 'PDF, Word, PowerPoint, photos or text';
const ENGINE_URL = '/study-engine/index.html';

/* ── loading the engine ─────────────────────────────────────────────────────────────────── */
let enginePromise = null;

function patchEngine(html) {
  let h = html;
  // the engine's own test block and its sample paper that runs on load are for development only
  const t0 = h.indexOf('<section id="testCompare"');
  if (t0 > -1) { const t1 = h.lastIndexOf('</body>'); h = h.slice(0, t0) + (t1 > -1 ? h.slice(t1) : ''); }
  h = h.replace(/\$\('paste'\)\.value = SAMPLES\[0\]\.text;[^\n]*?setTimeout\(\(\) => go\(false\), 30\);/, '');
  const tag = `<script>${BRIDGE_SRC.replace(/<\/script/gi, '<\\/script')}</script>`;
  return h.includes('</body>') ? h.replace('</body>', `${tag}</body>`) : `${h}\n${tag}`;
}

export function loadEngine() {
  if (enginePromise) return enginePromise;
  enginePromise = (async () => {
    const res = await fetch(ENGINE_URL, { cache: 'default' });
    if (!res.ok) throw new Error('The study engine could not be loaded. Check your connection and try again.');
    const html = patchEngine(await res.text());
    const frame = document.createElement('iframe');
    frame.setAttribute('aria-hidden', 'true');
    frame.setAttribute('tabindex', '-1');
    frame.title = 'Study engine';
    frame.style.cssText = 'position:fixed;left:-10000px;top:0;width:900px;height:700px;border:0;opacity:0;pointer-events:none;';
    const ready = new Promise((resolve, reject) => {
      frame.onload = () => {
        const w = frame.contentWindow;
        w.__apiFetch = (u, o) => window.fetch(u, o); // keeps the signed-in session on /api calls
        const t0 = Date.now();
        (function wait() {
          if (w.__es && w.__es.ready) return resolve(w.__es);
          if (Date.now() - t0 > 20000) return reject(new Error('The study engine did not start. Please try again.'));
          setTimeout(wait, 100);
        })();
      };
    });
    frame.srcdoc = html;
    document.body.appendChild(frame);
    return ready;
  })().catch((e) => { enginePromise = null; throw e; });
  return enginePromise;
}

/* ── reading a file ───────────────────────────────────────────────────────────────────── */
export async function extractTextFromFile(file, onProgress) {
  const name = (file.name || '').toLowerCase();
  if (/\.(txt|md|markdown|text|csv)$/.test(name) || (file.type || '').startsWith('text/')) {
    const text = await file.text();
    if (text.replace(/\s+/g, '').length < 20) throw new Error('That file has no readable text in it.');
    return { text, kind: 'text' };
  }
  const E = await loadEngine();
  let r;
  try { r = await E.extract(file, onProgress); } catch (e) { throw new Error(cleanErr(e) || `We can read ${SUPPORTED_HINT}. Try one of those.`); }
  if (!r || (r.text || '').replace(/\s+/g, '').length < 20) throw new Error('There isn’t enough readable text in this file. If it’s a scan, try a clearer photo or a text-based version.');
  return r;
}

const cleanErr = (e) => (e && e.message ? String(e.message) : '');

/* ── what the engine does with the text ───────────────────────────────────────────────── */
// → { intent: 'solve' | 'paper' | 'notes' | 'ask-notes', conf, items: [{ n, text, marks, kind }], topic? }
export async function analyse(text) {
  const E = await loadEngine();
  return E.analyse(text);
}

// Answers every question found in the text → { items: [{ n, text, marks, st, html }], sources: [{ title, url, label }] }
export async function solve(text) {
  const E = await loadEngine();
  return E.solve(text);
}

// Notes / study pack from the given text → pack (title, summary, sections, cards, questions, stats, notes, sources)
export async function makeNotes(text, name) {
  const E = await loadEngine();
  return E.notes(text, name);
}

// Looks a topic up across the web and builds notes on it
export async function notesFromAsk(topic) {
  const E = await loadEngine();
  return E.notesFromAsk(topic);
}

// Plain text of an answered set (used to make notes from answers, and for Copy)
export function answersToText(items) {
  const div = typeof document !== 'undefined' ? document.createElement('div') : null;
  return items.map((it) => {
    let a = '';
    if (div) { div.innerHTML = it.html; a = div.innerText || div.textContent || ''; }
    return `${it.n}. ${it.text}\n${a.replace(/\n{3,}/g, '\n\n').trim()}`;
  }).join('\n\n');
}

// The engine builds its answers from escaped text, but they are still cleaned before being shown.
export function sanitizeHtml(html) {
  if (typeof document === 'undefined') return '';
  const doc = new DOMParser().parseFromString(`<div>${html || ''}</div>`, 'text/html');
  doc.querySelectorAll('script,style,iframe,object,embed,link,meta,form,input,textarea,select').forEach((n) => n.remove());
  doc.querySelectorAll('*').forEach((el) => {
    [...el.attributes].forEach((a) => {
      if (/^on/i.test(a.name) || /^(srcdoc|formaction)$/i.test(a.name)) el.removeAttribute(a.name);
      else if (/^(href|src|xlink:href)$/i.test(a.name) && /^\s*(javascript|data):/i.test(a.value)) el.removeAttribute(a.name);
    });
    if (el.tagName === 'A') { el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener noreferrer'); }
  });
  return doc.body.firstChild ? doc.body.firstChild.innerHTML : '';
}

/* ── small helpers ───────────────────────────────────────────────────────────────────── */
export function prettyTitle(fileName) {
  return String(fileName || 'Study file').replace(/\.[a-z0-9]{2,5}$/i, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()).slice(0, 70) || 'Study file';
}

export const hashText = (s) => {
  let h = 5381;
  const t = String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  for (let i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) | 0;
  return `t${(h >>> 0).toString(36)}${t.length}`;
};

/* ── library: everything the student has made, saved on this device ─────── */
const KEY = 'es_study_files_v1';

export function loadLibrary() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}

function persist(list) {
  // If storage is full, drop the oldest items until it fits.
  let items = list.slice();
  for (;;) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); return items; } catch (e) {
      if (items.length <= 1) throw new Error('Your device storage is full. Delete an older item and try again.');
      items = items.slice(0, -1);
    }
  }
}

export function saveToLibrary(entry) {
  return persist([entry, ...loadLibrary().filter((f) => f.id !== entry.id)].slice(0, 30));
}

export function updateInLibrary(id, patch) {
  return persist(loadLibrary().map((f) => (f.id === id ? { ...f, ...patch } : f)));
}

export function removeFromLibrary(id) {
  return persist(loadLibrary().filter((f) => f.id !== id));
}

export const newFileId = () => `f${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
