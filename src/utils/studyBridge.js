// studyBridge.js — the small script that is added to the Study Engine file when the app loads it in the background.
// It does NOT change the engine's own solvers. It (1) turns many question-paper layouts into the numbered form the
// engine splits on, (2) lets the engine look answers up on more than Wikipedia (through /api/study/web), and
// (3) exposes a few plain functions the app calls: analyse, solve, notes, notesFromAsk, extract.
// It is kept as a plain string (not compiled) so it runs exactly as written inside the engine's page.
export const BRIDGE_SRC = String.raw`
(function () {
  var B = (window.__es = {});
  var api = function (u) { return (window.__apiFetch || window.fetch)(u); };

  /* -- 1. question-paper layouts -> "1. text" ------------------------------------------------ */
  var MARK = '(?:(?:question|qn|ques|q)\\.?\\s*(\\d{1,3})\\s*[:.)\\-\\u2013\\u2014]?|no\\.?\\s*(\\d{1,3})\\s*[:.)\\-\\u2013\\u2014]?|[(\\[](\\d{1,3})[)\\]]|#(\\d{1,3})\\b[:.)]?|(\\d{1,3})\\s*[:)\\-\\u2013\\u2014]|(\\d{1,3})\\.(?!\\d))';
  function pickNum(m) { for (var i = 2; i < 8; i++) if (m[i]) return +m[i]; return 0; }
  function options(seg) {
    var lines = seg.split('\n'), hits = 0, seen = {};
    lines.forEach(function (l) { var m = l.match(/^\s*[(\[]?([A-E])[)\].:]\s+\S/); if (m && !seen[m[1]]) { seen[m[1]] = 1; hits++; } });
    if (hits < 3) return seg;
    return lines.map(function (l) { return l.replace(/^(\s*)[(\[]?([A-E])[)\].:]\s+(?=\S)/, '$1$2. '); }).join('\n');
  }
  function normQ(raw) {
    var t = String(raw || '').replace(/\r\n?/g, '\n').replace(/\f/g, '\n').replace(/[   ]/g, ' ');
    t = t.replace(/^\s*(?:page\s+)?\d+\s*(?:of|\/)\s*\d+\s*$/gim, '').replace(/^\s*page\s+\d+\s*$/gim, '');
    function pass(re, strongOnly) {
      var out = [], last = 0, exp = 1, n = 0, m, pieces = [];
      re.lastIndex = 0;
      while ((m = re.exec(t))) {
        var num = pickNum(m);
        if (!num) continue;
        if (strongOnly && !/^\s*(?:q|ques|qn|question)/i.test(m[0].replace(/^\s+/, ''))) continue;
        var ok = num === exp || (exp > 1 && num === 1) || (num === exp + 1);
        if (!ok) continue;
        var start = m.index + (m[1] !== undefined && m[1] !== '' ? m[1].length : 0);
        pieces.push({ at: start, end: re.lastIndex });
        exp = num + 1; n++;
      }
      return { pieces: pieces, n: n };
    }
    var lineRe = new RegExp('(^|\\n)[ \\t]*' + MARK + '[ \\t]*', 'gi');
    var r = pass(lineRe, false);
    if (r.n < 3) {
      var inl = new RegExp('(^|\\s)(?:question|qn|ques|q)\\.?\\s*(\\d{1,3})\\s*[:.)\\-\\u2013\\u2014]?[ \\t]*', 'gi');
      var inlPieces = [], exp2 = 1, mm; inl.lastIndex = 0;
      while ((mm = inl.exec(t))) { var nn = +mm[2]; if (nn === exp2 || (exp2 > 1 && nn === 1) || nn === exp2 + 1) { inlPieces.push({ at: mm.index + mm[1].length, end: inl.lastIndex }); exp2 = nn + 1; } }
      if (inlPieces.length >= 3) r = { pieces: inlPieces, n: inlPieces.length };
    }
    if (r.n < 2) return String(raw || '');
    var res = t.slice(0, r.pieces[0].at).replace(/\s+$/, '') + '\n\n';
    r.pieces.forEach(function (p, i) {
      var next = i + 1 < r.pieces.length ? r.pieces[i + 1].at : t.length;
      var body = t.slice(p.end, next).replace(/^\n+/, '').replace(/\s+$/, '');
      body = options(body).replace(/\[(\d{1,2})\]\s*$/gm, '[$1 marks]');
      var c = body.charAt(0);
      if (/[a-z]/.test(c)) body = c.toUpperCase() + body.slice(1);
      else if (c && !/[A-Z\[(]/.test(c)) body = 'Q: ' + body;
      res += (i + 1) + '. ' + body + '\n\n';
    });
    return res.trim() + '\n';
  }
  B.normQ = normQ;
  var _sp = window.splitPaper;
  if (typeof _sp === 'function') window.splitPaper = function (raw) { return _sp(normQ(raw)); };

  /* -- 2. answers from many sites, not only Wikipedia --------------------------------------- */
  var _af = window.articlesFor, extraCache = {};
  // The engine builds a source link from host + title, so a page from anywhere on the web carries its real address
  // inside "host" and it is unpacked again when the answer is collected.
  var PFX = '/__es?u=';
  function packUrl(a) { return 'es.local' + PFX + encodeURIComponent(a.url) + '#'; }
  function realUrl(u) { var m = String(u || '').match(/^https?:\/\/[^\/?#]+\/__es\?u=([^#]+)#/); if (!m) return u; try { return decodeURIComponent(m[1]); } catch (e) { return u; } }
  function extra(query, chars) {
    var k = query + '|' + chars;
    if (extraCache[k]) return extraCache[k];
    return (extraCache[k] = api('/api/study/web?q=' + encodeURIComponent(String(query).slice(0, 200))).then(function (r) { return r.json(); }).then(function (j) {
      return ((j && j.articles) || []).filter(function (a) { return a && a.url; }).map(function (a) { return { title: a.title, host: packUrl(a), label: a.label, url: a.url, text: String(a.text || '').slice(0, chars) }; });
    }).catch(function () { return []; }));
  }
  B.extra = extra;
  if (typeof _af === 'function') window.articlesFor = function (query, first, want, chars) {
    want = want || 3; chars = chars || 6000;
    return Promise.all([
      _af(query, false, want, chars).catch(function () { return null; }),
      extra(query, Math.min(chars, 6000))
    ]).then(function (r) {
      var base = r[0] || [], more = r[1] || [];
      if (!base.length && !more.length && r[0] === null && first) throw new Error('offline');
      var list = base.slice(0, want), seen = {};
      list.forEach(function (a) { seen[a.host + a.title] = 1; });
      more.forEach(function (a) { if (!seen[a.host + a.title] && list.length < want + 3) { seen[a.host + a.title] = 1; list.push(a); } });
      return list;
    });
  };

  /* -- 3. the functions the app calls --------------------------------------------------------- */
  var plain = function (o) { return JSON.parse(JSON.stringify(o)); };
  var NOTE_REQ = /^\s*(?:please\s+)?(?:(?:can|could|will|would) you\s+)?(?:make|create|write|generate|prepare|give|draft|build|produce)\s+(?:me\s+)?(?:some\s+|a\s+|an\s+|the\s+)?(?:(?:detailed|short|simple|full|complete|brief|study|revision|easy|quick)\s+)*(?:notes?|summary|summaries|lesson|study guide|revision(?:\s+notes)?)\s*(?:on|about|for|of|covering|regarding)?\s+(.{3,})$/i;
  var TEACH = /^\s*(?:teach me|tell me about|i want to learn|help me (?:learn|understand|revise)|notes on|revise)\s+(.{3,})$/i;
  function topicOf(raw) {
    var s = String(raw || '').trim();
    if (s.length > 220 || s.split(/\n/).length > 2) return null;
    var m = s.match(NOTE_REQ) || s.match(TEACH);
    return m ? m[m.length - 1].replace(/[.?!]+$/, '').trim() : null;
  }
  B.topicOf = topicOf;

  B.analyse = function (raw) {
    var t = topicOf(raw);
    if (t) return { intent: 'ask-notes', conf: 0.95, topic: t, items: [] };
    var A = analyse(raw);
    var items = (A.items || []).map(function (q) { return { n: q.n, text: q.text, marks: q.marks, kind: q.kind }; });
    return { intent: A.intent, conf: A.conf, note: A.note || '', items: items };
  };

  B.extract = function (file, cb) { return window.__SE.math.extractTextFromFile(file, cb).then(plain); };

  function settle(boxes, ms) {
    var t0 = Date.now();
    return new Promise(function (res) {
      (function tick() {
        var busy = (window.__seBusy || 0) > 0 || boxes.some(function (b) { return /Searching the web|Looking for a formula on the web/.test(b.textContent); });
        if (!busy || Date.now() - t0 > ms) return res();
        setTimeout(tick, 250);
      })();
    });
  }
  var GENERIC_H = /^(Chemistry|Physics|Maths?|Mathematics|Biology|General|Worked solution|Unit conversion)$/i;
  function clean(box, srcs) {
    box.querySelectorAll('.fb, .fbb, button, .srcend, .actions, script').forEach(function (e) { e.remove(); });
    box.querySelectorAll('.status').forEach(function (s) {
      if (!/^\s*Sources?:/i.test(s.textContent)) return;
      var txt = s.textContent;
      s.querySelectorAll('a[href]').forEach(function (a) {
        var t = a.textContent.trim(), at = txt.indexOf(t), after = at >= 0 ? txt.slice(at + t.length, at + t.length + 60) : '', lm = after.match(/^\s*\(([^)]+)\)/);
        srcs.push({ title: t, url: realUrl(a.getAttribute('href')), label: lm ? lm[1] : '' });
      });
      s.remove();
    });
    box.querySelectorAll('.wk-h').forEach(function (h) { if (GENERIC_H.test(h.textContent.trim())) h.remove(); });
    return box.innerHTML.replace(/I could not reach the web from this page\.[^<]*/g, 'I could not reach the web just now. Check your connection and try again.');
  }
  B.solve = function (raw) {
    var A = analyse(raw);
    var items = (A.items && A.items.length) ? A.items : [mkItem(1, clean1(raw))];
    var rows = items.map(function (q) {
      var r = solveItem(q), box = document.createElement('div');
      box.innerHTML = r.html; fillWebSlots(box); fillLearnSlots(box);
      return { q: q, st: r.st, box: box };
    });
    return settle(rows.map(function (r) { return r.box; }), 40000).then(function () {
      var srcs = [], seen = {};
      var out = rows.map(function (r) {
        var mine = [];
        var html = clean(r.box, mine);
        mine.forEach(function (s) { if (s.url && !seen[s.url]) { seen[s.url] = 1; srcs.push(s); } });
        return { n: r.q.n, text: r.q.text, marks: r.q.marks || null, st: r.st, html: html };
      });
      return plain({ items: out, sources: srcs, intent: A.intent });
    });
  };

  function engineFor(text) { var k = rank(text).top; return window.__SE[k === 'general' ? 'math' : k]; }
  function sourcesOfPack(pack, extraList) {
    var seen = {}, out = [];
    var add = function (title, url, label) { if (!url || seen[url]) return; seen[url] = 1; out.push({ title: title || url, url: url, label: label || '' }); };
    ((pack.notes) || []).forEach(function (n) {
      ['what', 'how', 'why', 'example'].forEach(function (k) { ((n.items && n.items[k]) || []).forEach(function (x) { if (x.src !== 'notes' && x.url) add(x.term || n.title, x.url, x.src); }); });
      (n.wordHelp || []).forEach(function (w) { add(w.word, w.url, 'dictionary'); });
    });
    var w = pack.web || {};
    Object.keys(w.terms || {}).forEach(function (t) { var v = w.terms[t]; if (v.wiki) add(v.wiki.title || t, v.wiki.url, 'Wikipedia'); if (v.article && v.article.url) add(v.article.title || t, v.article.url, 'Wikipedia'); });
    (extraList || []).forEach(function (a) { add(a.title, a.url, a.label); });
    return out;
  }
  function slim(p) {
    var keep = ['v', 'engine', 'title', 'topics', 'summary', 'sections', 'cards', 'questions', 'stats', 'notes', 'sources'];
    var o = {}; keep.forEach(function (k) { if (p[k] !== undefined) o[k] = p[k]; });
    var strip = function (x) { if (Array.isArray(x)) return x.map(strip); if (x && typeof x === 'object') { var r = {}; Object.keys(x).forEach(function (k) { if (!/Original$/.test(k)) r[k] = strip(x[k]); }); return r; } return x; };
    return strip(o);
  }
  B.notes = function (text, name, opts) {
    opts = opts || {};
    var E2 = engineFor(text), learned = { blockTerms: [], goodTerms: [], blockDefs: [] };
    try { var l = JSON.parse(localStorage.getItem('lab_learned') || 'null'); if (l) learned = l; } catch (e) {}
    var pack = E2.buildStudyPack(text, name || 'Study notes', { params: Object.assign({}, E2.DEFAULT_PARAMS), learned: learned });
    var extraP = opts.skipExtra ? Promise.resolve([]) : extra(pack.title, 3000);
    return Promise.all([
      E2.enrichWeb(pack, { sources: ['wikibooks', 'wikiversity', 'duckduckgo'] }).catch(function () { return pack; }),
      extraP
    ]).then(function (r) {
      var p = r[0] || pack;
      try { p.notes = E2.buildNotes(p); } catch (e) { p.notes = []; }
      p.sources = sourcesOfPack(p, (opts.sources || []).concat(r[1] || []));
      return plain(slim(p));
    });
  };

  B.notesFromAsk = function (topic) {
    var q = String(topic || '').trim();
    var gather = window.articlesFor;
    var jobs = [gather(q, true, 5, 12000)];
    var key = (typeof phrases === 'function' && phrases(q)[0]) || '';
    if (key && key.toLowerCase() !== q.toLowerCase()) jobs.push(gather(key, false, 4, 12000));
    return Promise.all(jobs).then(function (r) {
      var arts = [], seen = {};
      r.forEach(function (l) { (l || []).forEach(function (a) { if (!seen[a.host + a.title]) { seen[a.host + a.title] = 1; arts.push(a); } }); });
      if (!arts.length) throw new Error('nothing found');
      var text = arts.map(function (a) { return String(a.title).replace(/\s+[-–—|·]\s+[^-–—|·]{2,40}$/, '') + '\n\n' + a.text.replace(/==+\s*([^=\n]+?)\s*==+/g, '\n$1\n'); }).join('\n\n');
      var title = q.replace(/^\s*(?:what is|what are|explain|define|describe|the)\s+/i, '').replace(/[?.]+$/, '');
      title = title.charAt(0).toUpperCase() + title.slice(1);
      return B.notes(text, title, { skipExtra: true, sources: arts.map(function (a) { return { title: a.title, url: a.url ? a.url : realUrl('https://' + a.host + '/wiki/' + encodeURIComponent(String(a.title).replace(/ /g, '_'))), label: a.label }; }) });
    });
  };
  B.ready = true;
})();
`;
