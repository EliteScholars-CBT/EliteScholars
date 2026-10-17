// ============================================================================
// studyEngine.js — turns any document into a study pack, fully on-device.
//
// No generative AI, no API key, nothing uploaded anywhere: files are read in
// the browser, analysed with classic extractive NLP (term frequency, sentence
// ranking, definition pattern matching, cloze generation) and the resulting
// pack is saved in localStorage.
//
//   extractTextFromFile(file)  → { text, pages }
//   buildStudyPack(text, name) → { summary, sections, cards, questions, stats }
// ============================================================================

/* ── Text extraction ─────────────────────────────────────────────────────── */

const PDFJS_VER = '3.11.174';
const MAMMOTH_VER = '1.6.0';

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded) return resolve();
      existing.addEventListener('load', resolve);
      existing.addEventListener('error', reject);
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.dataset.src = src;
    s.onload = () => { s.dataset.loaded = '1'; resolve(); };
    s.onerror = () => reject(new Error('Could not load the reader for this file type. Check your connection and try again.'));
    document.head.appendChild(s);
  });

async function loadPdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;
  await loadScript(`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VER}/pdf.min.js`);
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VER}/pdf.worker.min.js`;
  return window.pdfjsLib;
}

async function readPdf(file, onProgress) {
  const pdfjs = await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const pages = Math.min(doc.numPages, 200);
  const out = [];
  for (let p = 1; p <= pages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    let lastY = null;
    let line = '';
    const lines = [];
    for (const it of content.items) {
      const y = Math.round(it.transform[5]);
      if (lastY !== null && Math.abs(y - lastY) > 3) {
        lines.push(line.trim());
        line = '';
      }
      line += it.str + (it.str.endsWith(' ') ? '' : ' ');
      lastY = y;
    }
    if (line.trim()) lines.push(line.trim());
    out.push(lines.join('\n'));
    onProgress?.(p / pages);
  }
  return { text: out.join('\n\n'), pages };
}

async function readDocx(file) {
  await loadScript(`https://cdnjs.cloudflare.com/ajax/libs/mammoth/${MAMMOTH_VER}/mammoth.browser.min.js`);
  const res = await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return { text: res.value, pages: 1 };
}

export const SUPPORTED_HINT = 'PDF, DOCX, TXT or MD';

export async function extractTextFromFile(file, onProgress) {
  const name = (file.name || '').toLowerCase();
  let result;
  if (name.endsWith('.pdf') || file.type === 'application/pdf') {
    result = await readPdf(file, onProgress);
  } else if (name.endsWith('.docx')) {
    result = await readDocx(file);
  } else if (/\.(txt|md|markdown|csv|text)$/.test(name) || (file.type || '').startsWith('text/')) {
    result = { text: await file.text(), pages: 1 };
  } else if (/\.(png|jpe?g|gif|webp|heic)$/.test(name)) {
    throw new Error('Images can’t be read yet. Upload a text-based PDF, DOCX, or TXT instead.');
  } else {
    throw new Error(`We can read ${SUPPORTED_HINT} files. Try one of those.`);
  }
  if ((result.text || '').replace(/\s+/g, '').length < 250) {
    throw new Error('There isn’t enough readable text in this file. If it’s a scan or photo, upload a text-based version.');
  }
  return result;
}

/* ── Utilities ───────────────────────────────────────────────────────────── */

const STOP = new Set(('a about above after again against all also am an and any are as at be because been before being below between both but by can could did do does doing down during each few for from further had has have having he her here hers herself him himself his how i if in into is it its itself just me more most my myself no nor not now of off on once only or other our ours ourselves out over own same she should so some such than that the their theirs them themselves then there these they this those through to too under until up very was we were what when where which while who whom why will with would you your yours yourself yourselves may might must shall also however therefore thus hence e.g i.e etc eg ie one two three often usually generally many much several various different called known like used using use include includes including within without whether either neither since upon per via').split(/\s+/));

const BAD_DEF_START = new Set(['also', 'not', 'very', 'more', 'most', 'mainly', 'often', 'usually', 'then', 'used', 'produced', 'made', 'found', 'given', 'taken', 'caused', 'affected', 'required', 'needed', 'important', 'another', 'able', 'likely', 'only', 'just', 'still', 'even', 'now', 'always', 'never', 'sometimes', 'really', 'quite', 'rather', 'too', 'no', 'called', 'located', 'considered']);
const GENERIC = new Set(['plus', 'mainly', 'process', 'place', 'part', 'parts', 'way', 'ways', 'thing', 'things', 'kind', 'type', 'types', 'form', 'forms', 'result', 'results', 'case', 'cases', 'example', 'examples', 'number', 'time', 'times', 'area', 'areas', 'point', 'points', 'group', 'important', 'available', 'higher', 'lower', 'large', 'small', 'high', 'low', 'main', 'major', 'minor', 'good', 'well', 'able', 'take', 'takes', 'taking', 'make', 'makes', 'made', 'occurs', 'occur', 'produced', 'produce', 'produces', 'stage', 'stages', 'step', 'steps', 'section', 'chapter', 'figure', 'table']);
const PRONOUN_START = new Set(['during', 'after', 'before', 'because', 'since', 'while', 'although', 'though', 'through', 'across', 'among', 'under', 'over', 'between', 'into', 'onto', 'upon', 'about', 'against', 'another', 'every', 'any', 'no', 'not', 'it', 'this', 'that', 'there', 'he', 'she', 'they', 'we', 'these', 'those', 'which', 'what', 'when', 'where', 'who', 'how', 'why', 'if', 'as', 'in', 'on', 'at', 'for', 'by', 'with', 'from', 'one', 'some', 'many', 'each', 'all', 'both', 'such', 'here', 'then', 'so', 'but', 'and', 'or', 'also', 'thus', 'hence', 'however']);

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < Math.min(s.length, 5000); i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function rng(seed) {
  let a = seed || 1;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const shuffle = (arr, rand) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
const words = (s) => s.split(/\s+/).filter(Boolean);
const cap1 = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function trimTo(s, max) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[,;:\s]+$/, '') + '…';
}

/* ── Cleaning & splitting ────────────────────────────────────────────────── */

function cleanText(raw) {
  let t = raw.replace(/\r/g, '').replace(/\u00a0/g, ' ').replace(/[\u2022\u25CF\u25AA\u2023\u25E6]/g, '• ');
  t = t.replace(/(\w)-\n(\w)/g, '$1$2');               // de-hyphenate line wraps
  t = t.replace(/[ \t]+/g, ' ');
  let lines = t.split('\n').map((l) => l.trim());

  // Drop lines that repeat many times (running headers/footers) and bare page numbers.
  const freq = {};
  lines.forEach((l) => { if (l.length > 3 && l.length < 80) freq[l] = (freq[l] || 0) + 1; });
  lines = lines.filter((l) => !(freq[l] >= 4) && !/^(page\s*)?\d{1,4}(\s*(of|\/)\s*\d{1,4})?$/i.test(l));

  // Rejoin wrapped lines: a line that doesn't end a sentence flows into the next
  // one unless the next looks like a heading/bullet.
  const merged = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l) { merged.push(''); continue; }
    const prev = merged[merged.length - 1];
    const startsNew = isHeading(l) || /^(•|[-*]\s|\d+[.)]\s|[a-z][.)]\s)/i.test(l);
    if (prev && !/[.!?:;]$/.test(prev) && !isHeading(prev) && !startsNew && prev.length > 40 && /^[a-z(]/.test(l)) {
      merged[merged.length - 1] = prev + ' ' + l;
    } else merged.push(l);
  }
  return merged.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

const ABBR = /\b(e\.g|i\.e|etc|vs|Fig|Dr|Mr|Mrs|Ms|Prof|No|approx|Eq|Ch|Sec|St|Jr|Sr)\.$/i;

function splitSentences(text) {
  const out = [];
  text.split(/\n+/).forEach((block) => {
    const b = block.replace(/^(•|[-*]|\d+[.)]|[a-z][.)])\s*/i, '').trim();
    if (!b || isHeading(b)) return;
    const parts = b.split(/(?<=[.!?])\s+(?=[A-Z0-9"“(])/);
    let buf = '';
    parts.forEach((p) => {
      buf = buf ? buf + ' ' + p : p;
      if (ABBR.test(buf.trim())) return;      // don't break after an abbreviation
      out.push(buf.trim());
      buf = '';
    });
    if (buf) out.push(buf.trim());
  });
  return out.filter((s) => s.length > 15);
}

function isHeading(line) {
  const l = line.trim();
  if (l.length < 3 || l.length > 72) return false;
  if (/[.!?,;]$/.test(l)) return false;
  const w = words(l);
  if (w.length > 9) return false;
  if (/^(chapter|unit|topic|section|module|lesson|part)\s+\w+/i.test(l)) return true;
  if (/^(\d+(\.\d+)*|[IVX]+)[.)]?\s+[A-Z]/.test(l) && w.length <= 9) return true;
  const letters = l.replace(/[^A-Za-z]/g, '');
  if (letters.length >= 4 && letters === letters.toUpperCase()) return true;
  const capped = w.filter((x) => /^[A-Z0-9]/.test(x) || STOP.has(x.toLowerCase())).length;
  return w.length >= 2 && capped / w.length >= 0.85 && !STOP.has(w[0].toLowerCase());
}

const tokens = (s) => norm(s).split(' ').filter((t) => t.length > 2 && !STOP.has(t));

/* ── Key terms ───────────────────────────────────────────────────────────── */

function extractDefinitions(lines, sentences) {
  const defs = [];
  const seen = new Set();
  const push = (term, def, src) => {
    term = term.replace(/^(the|a|an)\s+/i, '').replace(/[“”"*]/g, '').trim();
    def = def.replace(/^[,:\s]+/, '').trim();
    // "Respiration: Respiration is the process…" → keep only what follows the repeated term
    const rep = def.match(new RegExp(`^${escRe(term)}\\s+(?:is|are|means|refers to)\\s+(.+)$`, 'i'));
    if (rep) def = rep[1];
    def = def.replace(/^(the|a|an)\s+(?=\w)/i, (m) => m).trim();
    const tw = words(term);
    if (tw.length < 1 || tw.length > 5 || term.length < 3 || term.length > 48) return;
    if (/[,:;]/.test(term)) return;
    if (PRONOUN_START.has(tw[0].toLowerCase())) return;
    if (STOP.has(tw[tw.length - 1].toLowerCase())) return;
    if (/\d{3,}/.test(term)) return;
    const dw = words(def);
    if (def.length < 18 || dw.length < 4) return;
    if (BAD_DEF_START.has(dw[0].toLowerCase())) return;
    const key = norm(term);
    if (seen.has(key)) return;
    seen.add(key);
    defs.push({ term: cap1(term), def: cap1(trimTo(def.replace(/[.;]+$/, ''), 230)), src });
  };

  // "Term: definition" / "Term – definition" (glossary style lines)
  lines.forEach((l) => {
    const m = l.match(/^([A-Za-z][A-Za-z0-9 \-'/()]{2,45}?)\s*(?::|\u2013|\u2014| - )\s+(.{18,260})$/);
    if (m && words(m[1]).length <= 5) push(m[1], m[2], l);
  });

  // "X is/are/means/refers to … Y" sentence patterns
  const pat = /^(.{3,60}?)\s+(?:is defined as|are defined as|can be defined as|is described as|refers to|refer to|means|is called|are called|is known as|are known as|is the|is a|is an|are the|are a|is)\s+(.{18,240})$/i;
  sentences.forEach((s) => {
    const m = s.match(pat);
    if (m && words(m[1]).length <= (/\bis\s*$/i.test(m[0].slice(m[1].length, m[1].length + 5)) ? 3 : 4)) push(m[1], m[2], s);
  });
  return defs;
}

function extractKeyTerms(sentences, defs, limit = 40) {
  const count = new Map();
  const bump = (term, w) => {
    const key = norm(term);
    if (!key || key.length < 3) return;
    const cur = count.get(key) || { term, n: 0, w: 0 };
    cur.n += 1; cur.w += w;
    if (/^[A-Z]/.test(term) && !/^[A-Z]/.test(cur.term)) cur.term = term;
    count.set(key, cur);
  };

  sentences.forEach((s) => {
    // Acronyms & capitalised phrases (not the sentence-initial word alone)
    for (const m of s.matchAll(/\b[A-Z]{2,5}\b/g)) if (s !== s.toUpperCase()) bump(m[0], 1.6);
    for (const m of s.matchAll(/(?<!^)(?<![.!?]\s)\b([A-Z][a-z]{2,}(?:\s+(?:of|and|the)\s+[A-Z][a-z]{2,}|\s+[A-Z][a-z]{2,}){0,3})\b/g)) {
      const t = m[1];
      if (!STOP.has(t.toLowerCase())) bump(t, words(t).length > 1 ? 2.2 : 1.3);
    }
    // Lowercase noun-ish uni/bi-grams
    const ws = norm(s).split(' ');
    for (let i = 0; i < ws.length; i++) {
      const a = ws[i];
      if (a.length < 4 || STOP.has(a) || GENERIC.has(a) || /ly$/.test(a)) continue;
      bump(a, 1);
      const b = ws[i + 1];
      if (b && b.length >= 4 && !STOP.has(b) && !GENERIC.has(b) && !/ly$/.test(b)) bump(a + ' ' + b, 1.8);
    }
  });

  defs.forEach((d) => bump(d.term, 4));

  const relax = count.size < 60 ? 0 : 1;   // tiny documents get a gentler threshold
  const list = [...count.values()]
    .filter((c) => (c.n >= 2 + relax * (words(c.term).length === 1 && !/^[A-Z]/.test(c.term) ? 1 : 0) || c.w >= 3 + relax) && !/^\d+$/.test(c.term))
    .filter((c) => !(words(c.term).length === 1 && GENERIC.has(norm(c.term))))
    .map((c) => ({ ...c, score: c.w * (1 + 0.15 * (words(c.term).length - 1)) }))
    .sort((a, b) => b.score - a.score);

  // Drop unigrams already covered by a stronger phrase
  const picked = [];
  list.forEach((c) => {
    if (picked.length >= limit) return;
    const k = norm(c.term);
    if (picked.some((p) => { const pk = norm(p.term); return pk !== k && (pk.includes(k) || k.includes(pk)) && words(k).length === 1; })) return;
    picked.push(c);
  });
  return picked.map((c) => ({ term: cap1(c.term), score: c.score }));
}

/* ── Sentence ranking / summary ──────────────────────────────────────────── */

function rankSentences(sentences, terms) {
  const tw = new Map(terms.map((t) => [norm(t.term), t.score]));
  const df = new Map();
  const toks = sentences.map((s) => new Set(tokens(s)));
  toks.forEach((set) => set.forEach((t) => df.set(t, (df.get(t) || 0) + 1)));
  const N = sentences.length;
  return sentences.map((s, i) => {
    const words_ = words(s).length;
    let sc = 0;
    toks[i].forEach((t) => { sc += Math.log(1 + N / (df.get(t) || 1)) * (tw.has(t) ? 1.6 : 1); });
    tw.forEach((w, key) => { if (key.includes(' ') && norm(s).includes(key)) sc += Math.min(w, 8); });
    const lenPenalty = words_ < 7 ? 0.5 : words_ > 38 ? 0.7 : 1;
    const posBonus = i < 3 ? 1.25 : 1;
    return { i, s, score: (sc / Math.pow(Math.max(words_, 6), 0.55)) * lenPenalty * posBonus };
  });
}

function pickDiverse(ranked, n) {
  const out = [];
  ranked.slice().sort((a, b) => b.score - a.score).forEach((r) => {
    if (out.length >= n) return;
    const set = new Set(tokens(r.s));
    const clash = out.some((o) => {
      const os = new Set(tokens(o.s));
      let same = 0; set.forEach((t) => os.has(t) && same++);
      return same / Math.max(set.size, 1) > 0.6;
    });
    if (!clash) out.push(r);
  });
  return out.sort((a, b) => a.i - b.i);
}

/* ── Sections (Learn) ────────────────────────────────────────────────────── */

function buildSections(cleaned, terms, rand) {
  const lines = cleaned.split('\n');
  let secs = [];
  let cur = { title: '', lines: [] };
  lines.forEach((l) => {
    if (l && isHeading(l)) {
      if (cur.lines.join(' ').length > 120) secs.push(cur);
      cur = { title: l.replace(/^(\d+(\.\d+)*|[IVX]+)[.)]?\s+/, ''), lines: [] };
    } else if (l) cur.lines.push(l);
  });
  if (cur.lines.join(' ').length > 120) secs.push(cur);

  // Fallback: no usable headings → chunk paragraphs by size
  if (secs.length < 2) {
    const paras = cleaned.split(/\n{2,}|\n/).filter((p) => p.trim());
    secs = [];
    let buf = [];
    let size = 0;
    paras.forEach((p) => {
      buf.push(p); size += p.length;
      if (size > 1400) { secs.push({ title: '', lines: buf }); buf = []; size = 0; }
    });
    if (buf.length) secs.push({ title: '', lines: buf });
  }

  // Merge tiny sections, cap the count so lessons stay digestible
  const merged = [];
  secs.forEach((s) => {
    const len = s.lines.join(' ').length;
    if (len < 220 && merged.length) { merged[merged.length - 1].lines.push(...s.lines); } else merged.push(s);
  });
  let final = merged;
  if (final.length > 24) {
    const step = Math.ceil(final.length / 24);
    final = [];
    for (let i = 0; i < merged.length; i += step) {
      const group = merged.slice(i, i + step);
      final.push({ title: group[0].title, lines: group.flatMap((g) => g.lines) });
    }
  }

  return final.map((sec, idx) => {
    const body = sec.lines.join('\n');
    const sents = splitSentences(body);
    const ranked = rankSentences(sents, terms);
    const pts = pickDiverse(ranked, Math.min(5, Math.max(2, Math.round(sents.length / 4))));
    const local = extractKeyTerms(sents, [], 8).map((t) => t.term);
    const nb = norm(body);
    const inSec = terms
      .map((t) => {
        const k = norm(t.term);
        const c = k ? nb.split(k).length - 1 : 0;
        return { t: t.term, r: c * t.score };
      })
      .filter((x) => x.r > 0)
      .sort((a, b) => b.r - a.r)
      .slice(0, 6)
      .map((x) => x.t);
    const title = sec.title || (local[0] ? `Key ideas: ${local[0]}` : `Part ${idx + 1}`);
    return {
      title: trimTo(cap1(title), 60),
      points: pts.map((p) => trimTo(p.s, 260)),
      terms: (inSec.length ? inSec : local).slice(0, 6),
      _sents: sents,
    };
  }).filter((s) => s.points.length);
}

/* ── Flashcards ──────────────────────────────────────────────────────────── */

function blankOut(sentence, answer) {
  const re = new RegExp(`(?<![A-Za-z0-9])${escRe(answer)}(?![A-Za-z0-9])`, 'i');
  return re.test(sentence) ? sentence.replace(re, '_____') : null;
}

function makeCards(defs, ranked, terms, rand) {
  const cards = defs.slice(0, 40).map((d) => ({ front: d.term, back: d.def, kind: 'def' }));
  if (cards.length < 14) {
    const best = ranked.slice().sort((a, b) => b.score - a.score).slice(0, 60);
    for (const r of best) {
      if (cards.length >= 24) break;
      const t = terms.find((tm) => blankOut(r.s, tm.term) && words(r.s).length <= 32 && words(r.s).length >= 8);
      if (!t) continue;
      const front = blankOut(r.s, t.term);
      if (cards.some((c) => c.front === front)) continue;
      cards.push({ front: trimTo(front, 220), back: t.term, kind: 'cloze' });
    }
  }
  return shuffle(cards, rand);
}

/* ── Questions (CBT + Game) ──────────────────────────────────────────────── */

function kindOf(term) {
  if (/^\d/.test(term)) return 'num';
  if (/^[A-Z]{2,6}$/.test(term)) return 'acr';
  return /^[A-Z]/.test(term) ? 'cap' : 'low';
}

function pickDistractors(answer, pool, exclude, rand, n = 3) {
  const kind = kindOf(answer);
  const aw = words(answer).length;
  const cand = pool.filter((t) => {
    const k = norm(t);
    return k !== norm(answer) && !exclude.has(k) && !k.includes(norm(answer)) && !norm(answer).includes(k);
  });
  const scored = cand.map((t) => ({
    t,
    d: (kindOf(t) === kind ? 0 : 2) + Math.abs(words(t).length - aw) * 0.8 + Math.abs(t.length - answer.length) / 14 + rand() * 1.2,
  })).sort((a, b) => a.d - b.d);
  return scored.slice(0, n).map((x) => x.t);
}

function makeQuestions(sentences, ranked, defs, terms, rand, max = 45) {
  const pool = [...new Set([...terms.map((t) => t.term), ...defs.map((d) => d.term)])];
  const out = [];
  const seenQ = new Set();
  const add = (q) => {
    const key = norm(q.q);
    if (seenQ.has(key)) return;
    seenQ.add(key);
    out.push(q);
  };
  const build = (question, answer, exclude, expl) => {
    const ds = pickDistractors(answer, pool, exclude, rand);
    if (ds.length < 3) return null;
    const opts = shuffle([answer, ...ds], rand);
    return { q: question, o: opts, a: opts.indexOf(answer), e: expl };
  };

  // 1) "Which term is defined as …?"
  shuffle(defs, rand).slice(0, Math.ceil(max * 0.4)).forEach((d) => {
    if (words(d.def).length < 5) return;
    const q = build(`Which term matches this description? “${trimTo(d.def, 190)}”`, d.term, new Set(), `${d.term}: ${d.def}.`);
    if (q) add(q);
  });

  // 2) Fill-in-the-blank from the most informative sentences
  const bySc = ranked.slice().sort((a, b) => b.score - a.score);
  for (const r of bySc) {
    if (out.length >= max) break;
    const wc = words(r.s).length;
    if (wc < 8 || wc > 32 || /\?$/.test(r.s)) continue;
    const inSent = terms.filter((t) => blankOut(r.s, t.term) && words(t.term).length <= 3);
    if (!inSent.length) continue;
    // Prefer a term that isn't the very first word so the blank reads naturally
    const answer = (inSent.find((t) => !new RegExp(`^${escRe(t.term)}\\b`, 'i').test(r.s)) || inSent[0]).term;
    const blanked = blankOut(r.s, answer);
    if (!blanked) continue;
    const exclude = new Set(inSent.map((t) => norm(t.term)));
    const q = build(`Complete the statement: ${trimTo(blanked, 230)}`, answer, exclude, r.s);
    if (q) add(q);
  }

  // 3) "What does X mean?" using other definitions as distractors
  if (defs.length >= 4) {
    shuffle(defs, rand).slice(0, 8).forEach((d) => {
      if (out.length >= max + 6) return;
      const others = shuffle(defs.filter((x) => x.term !== d.term), rand).slice(0, 3);
      if (others.length < 3) return;
      const short = (s) => trimTo(s, 110);
      const opts = shuffle([short(d.def), ...others.map((o) => short(o.def))], rand);
      add({ q: `Which statement best describes “${d.term}”?`, o: opts, a: opts.indexOf(short(d.def)), e: `${d.term}: ${d.def}.` });
    });
  }
  return shuffle(out, rand).slice(0, max + 6);
}

/* ── Public: build the pack ──────────────────────────────────────────────── */

export function prettyTitle(fileName) {
  return cap1(fileName.replace(/\.[^.]+$/, '').replace(/[_\-]+/g, ' ').replace(/\s+/g, ' ').trim()) || 'Study file';
}

export function buildStudyPack(rawText, fileName = 'Study file') {
  let text = rawText.length > 200000 ? rawText.slice(0, 200000) : rawText;
  const cleaned = cleanText(text);
  const rand = rng(hashStr(cleaned));
  const lines = cleaned.split('\n').map((l) => l.trim()).filter(Boolean);
  const sentences = splitSentences(cleaned);
  if (sentences.length < 6) throw new Error('This file has too little text to build a study pack from.');

  const defs = extractDefinitions(lines, sentences);
  const terms = extractKeyTerms(sentences, defs, 40);
  const ranked = rankSentences(sentences, terms);

  const overviewN = Math.min(4, Math.max(2, Math.round(sentences.length / 25)));
  const overview = pickDiverse(ranked, overviewN).map((r) => trimTo(r.s, 260));
  const pointsN = Math.min(14, Math.max(6, Math.round(sentences.length / 10)));
  const points = pickDiverse(ranked, pointsN).map((r) => trimTo(r.s, 260));

  const sections = buildSections(cleaned, terms, rand);
  const cards = makeCards(defs, ranked, terms, rand);
  const questions = makeQuestions(sentences, ranked, defs, terms, rand);

  // A quick self-check question for each lesson section
  sections.forEach((sec) => {
    const sr = rankSentences(sec._sents, terms).sort((a, b) => b.score - a.score);
    for (const r of sr) {
      const wc = words(r.s).length;
      if (wc < 8 || wc > 30) continue;
      const t = terms.find((tm) => blankOut(r.s, tm.term));
      if (!t) continue;
      const ds = pickDistractors(t.term, terms.map((x) => x.term), new Set(), rand);
      if (ds.length < 3) continue;
      const opts = shuffle([t.term, ...ds], rand);
      sec.check = { q: trimTo(blankOut(r.s, t.term), 230), o: opts, a: opts.indexOf(t.term), e: r.s };
      break;
    }
    delete sec._sents;
  });

  const wc = words(cleaned).length;
  return {
    v: 1,
    title: prettyTitle(fileName),
    summary: { overview, points, terms: terms.slice(0, 14).map((t) => t.term) },
    sections,
    cards,
    questions,
    stats: { words: wc, minutes: Math.max(1, Math.round(wc / 220)), terms: terms.length },
  };
}

/* ── Local library (localStorage) ────────────────────────────────────────── */

const KEY = 'es_study_files_v1';

export function loadLibrary() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}

function persist(list) {
  // If storage is full, drop the oldest files until it fits.
  let items = list.slice();
  for (;;) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); return items; } catch (e) {
      if (items.length <= 1) throw new Error('Your device storage is full. Delete an older file and try again.');
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
