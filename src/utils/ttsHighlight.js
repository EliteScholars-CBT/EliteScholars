// Read-aloud highlighting that works on the words ALREADY on the page.
// We wrap each word of the lesson in a <span class="tts-w"> (without changing how it looks), group the
// words into short sentences to speak, and toggle classes as the voice moves along. unwrap() puts the page back.
const BLOCK = /^(P|LI|H1|H2|H3|H4|H5|H6|DIV|TD|TH|BLOCKQUOTE|UL|OL|TABLE|TR|SECTION|ARTICLE)$/;

const blockOf = (node, root) => {
  let el = node.parentElement;
  while (el && el !== root && !BLOCK.test(el.tagName)) el = el.parentElement;
  return el || root;
};

// Wrap every word under the given root elements. Returns [{ el, text, block }].
export function wrapWords(roots) {
  const words = [];
  roots.forEach((root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.nodeValue && n.nodeValue.trim() && !n.parentElement.closest('script,style,.tts-w') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => {
      const block = blockOf(n, root);
      const frag = document.createDocumentFragment();
      n.nodeValue.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const span = document.createElement('span');
        span.className = 'tts-w';
        span.textContent = part;
        frag.appendChild(span);
        words.push({ el: span, text: part, block });
      });
      n.parentNode.replaceChild(frag, n);
    });
  });
  return words;
}

export function unwrapWords() {
  const spans = document.querySelectorAll('.tts-w');
  const parents = new Set();
  spans.forEach((s) => {
    parents.add(s.parentNode);
    s.parentNode.replaceChild(document.createTextNode(s.textContent), s);
  });
  parents.forEach((p) => { try { p.normalize(); } catch { /* ignore */ } });
}

// Group words into speakable chunks: end at sentence punctuation, a change of paragraph/list item, or ~24 words.
export function buildChunks(words) {
  const chunks = [];
  let cur = [];
  const flush = () => { if (cur.length) { chunks.push(cur); cur = []; } };
  words.forEach((w, i) => {
    if (cur.length && cur[cur.length - 1].block !== w.block) flush();
    cur.push(w);
    const end = /[.!?]["')\]]?$/.test(w.text) && !/^(e\.g|i\.e|etc|vs|Mr|Mrs|Dr|No|Fig|St)\.$/i.test(w.text);
    const soft = cur.length >= 16 && /[,;:]$/.test(w.text);
    if (end || soft || cur.length >= 26 || i === words.length - 1) flush();
  });
  flush();
  return chunks;
}

// Spoken word index (by character position in the spoken text) → displayed word index
export function mapIndex(spoken, charIndex, shown) {
  if (!shown) return 0;
  const before = spoken.slice(0, Math.max(0, charIndex)).split(/\s+/).filter(Boolean).length;
  const total = spoken.split(/\s+/).filter(Boolean).length || 1;
  return Math.max(0, Math.min(shown - 1, Math.floor((before / total) * shown)));
}

export function markChunk(chunk, idx) {
  chunk.forEach((w, i) => {
    if (!w.el.isConnected) return;
    w.el.classList.toggle('tts-sent', true);
    w.el.classList.toggle('tts-now', i === idx);
    w.el.classList.toggle('tts-read', i < idx);
  });
}

export function clearChunk(chunk) {
  (chunk || []).forEach((w) => { if (w.el.isConnected) w.el.classList.remove('tts-sent', 'tts-now', 'tts-read'); });
}

// Nearest ancestor that actually scrolls (falls back to the page).
function scrollerOf(el, hint) {
  if (hint && hint.scrollHeight > hint.clientHeight + 4) return hint;
  let n = el && el.parentElement;
  while (n && n !== document.body) {
    const oy = getComputedStyle(n).overflowY;
    if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight + 4) return n;
    n = n.parentElement;
  }
  return null; // the window itself
}

// Keep the word being read on screen: when it drifts out of the middle band, glide so it sits about a third from the top.
let lastScrollAt = 0;
export function keepWordInView(el, hint) {
  if (!el || !el.isConnected) return;
  const sc = scrollerOf(el, hint);
  const box = sc ? sc.getBoundingClientRect() : { top: 0, bottom: window.innerHeight, height: window.innerHeight };
  const r = el.getBoundingClientRect();
  const topEdge = box.top + Math.min(110, box.height * 0.18);
  const botEdge = box.bottom - Math.min(150, box.height * 0.28);
  if (r.top >= topEdge && r.bottom <= botEdge) return;
  const now = Date.now();
  if (now - lastScrollAt < 350) return; // let the last glide finish
  lastScrollAt = now;
  const delta = r.top - (box.top + box.height * 0.33);
  try {
    if (sc) sc.scrollTo({ top: sc.scrollTop + delta, behavior: 'smooth' });
    else window.scrollTo({ top: window.scrollY + delta, behavior: 'smooth' });
  } catch {
    if (sc) sc.scrollTop += delta; else window.scrollBy(0, delta);
  }
}

export function keepInView(chunk, scroller) {
  keepWordInView(chunk[0] && chunk[0].el, scroller);
}

// Where did the student tap? Returns { root, offset } — characters from the start of the lesson text — or null.
export function tapPosition(e, roots) {
  let node = null, off = 0;
  const w = e.target && e.target.closest && e.target.closest('.tts-w');
  if (w) { node = w.firstChild; off = 0; }
  else if (document.caretRangeFromPoint) {
    const r = document.caretRangeFromPoint(e.clientX, e.clientY);
    if (r) { node = r.startContainer; off = r.startOffset; }
  } else if (document.caretPositionFromPoint) {
    const r = document.caretPositionFromPoint(e.clientX, e.clientY);
    if (r) { node = r.offsetNode; off = r.offset; }
  }
  if (!node) return null;
  const root = roots.find((x) => x.contains(node));
  if (!root) return null;
  try {
    const rg = document.createRange();
    rg.setStart(root, 0);
    rg.setEnd(node, node.nodeType === 3 ? off : 0);
    return { rootIdx: roots.indexOf(root), offset: rg.toString().length };
  } catch { return null; }
}

// Index (in the wrapped word list) of the word that contains the tapped position.
export function wordAtPosition(words, roots, pos) {
  let best = 0;
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const rootIdx = roots.findIndex((x) => x.contains(w.el));
    if (rootIdx < pos.rootIdx) { best = i; continue; }
    if (rootIdx > pos.rootIdx) break;
    const rg = document.createRange();
    rg.setStart(roots[rootIdx], 0);
    rg.setEnd(w.el, 0);
    const start = rg.toString().length;
    if (start <= pos.offset) best = i; else break;
  }
  return best;
}
