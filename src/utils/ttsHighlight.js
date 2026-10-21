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

// Keep the sentence being read comfortably on screen (only scrolls when it drifts out of the middle band).
export function keepInView(chunk, scroller) {
  const el = chunk[0] && chunk[0].el;
  if (!el || !el.isConnected) return;
  const r = el.getBoundingClientRect();
  const box = scroller ? scroller.getBoundingClientRect() : { top: 0, bottom: window.innerHeight };
  if (r.top < box.top + 90 || r.bottom > box.bottom - 120) {
    try { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch { el.scrollIntoView(); }
  }
}
