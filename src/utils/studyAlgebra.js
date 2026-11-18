// studyAlgebra.js — a small algebra engine for the Study Engine page: changes the subject of a formula, step by step
// (parses the formula, finds the letter, undoes each operation on it in reverse order). Runs after studyTutor.js and is
// only tried when the engine could not solve the question itself. Plain string, runs as written.
export const ALGEBRA_SRC = String.raw`
(function () {
  var _prev = window.solveItem;
  if (typeof _prev !== 'function') return;
  function out(title, lines, ans) {
    return { st: 'ok', html: '<div class="worked"><div class="wk-h">' + title + '</div><div class="wk-s">' + lines.map(function (l) { return '<div class="wk-l">' + l + '</div>'; }).join('') + '</div><div class="wk-a">' + ans + '</div></div>' };
  }
    /* -- change the subject of a formula: a small algebra engine (parse -> find the letter -> undo operations one by one) -- */
    function parseExpr(src) {
      var s = String(src).replace(/\s+/g, '').replace(/×|·/g, '*').replace(/÷/g, '/').replace(/−|–/g, '-').replace(/½/g, '#h').replace(/²/g, '^2').replace(/³/g, '^3').replace(/π/g, 'pi').replace(/√/g, 'sqrt');
      var toks = [], i = 0, m;
      while (i < s.length) {
        var rest = s.slice(i);
        if ((m = rest.match(/^\d+\.?\d*/))) { toks.push({ k: 'n', v: parseFloat(m[0]) }); i += m[0].length; }
        else if (rest.indexOf('#h') === 0) { toks.push({ k: 'n', v: 0.5, s: '½' }); i += 2; }
        else if ((m = rest.match(/^sqrt/))) { toks.push({ k: 'f' }); i += 4; }
        else if ((m = rest.match(/^pi/))) { toks.push({ k: 'v', v: 'π' }); i += 2; }
        else if (/^[a-zA-Z]/.test(rest)) { toks.push({ k: 'v', v: rest[0] }); i++; }
        else if (/^[-+*\/^()]/.test(rest)) { toks.push({ k: rest[0] }); i++; }
        else return null;
      }
      var p = 0;
      function peek() { return toks[p]; }
      function startsAtom(t) { return t && (t.k === 'n' || t.k === 'v' || t.k === '(' || t.k === 'f'); }
      function sum() { var a = prod(); while (peek() && (peek().k === '+' || peek().k === '-')) { var o = toks[p++].k; a = { t: o, a: a, b: prod() }; } return a; }
      function prod() { var a = unary(); for (;;) { var t = peek(); if (t && (t.k === '*' || t.k === '/')) { p++; a = { t: t.k, a: a, b: unary() }; } else if (startsAtom(t)) a = { t: '*', a: a, b: pw() }; else return a; } }
      function unary() { if (peek() && peek().k === '-') { p++; return { t: 'neg', a: unary() }; } if (peek() && peek().k === '+') { p++; return unary(); } return pw(); }
      function pw() { var a = atom(); if (peek() && peek().k === '^') { p++; var e = unary(); a = { t: '^', a: a, b: e }; } return a; }
      function atom() {
        var t = toks[p++]; if (!t) throw 0;
        if (t.k === 'n') return { t: 'n', v: t.v, s: t.s };
        if (t.k === 'v') return { t: 'v', n: t.v };
        if (t.k === 'f') { var x = atom(); return { t: 'sqrt', a: x }; }
        if (t.k === '(') { var e = sum(); if (!toks[p] || toks[p++].k !== ')') throw 0; return e; }
        throw 0;
      }
      try { var r = sum(); return p === toks.length ? r : null; } catch (e) { return null; }
    }
    function has(n, v) { return n.t === 'v' ? n.n === v : n.t === 'n' ? false : (n.a && has(n.a, v)) || (n.b && has(n.b, v)); }
    function count(n, v) { return n.t === 'v' ? (n.n === v ? 1 : 0) : n.t === 'n' ? 0 : (n.a ? count(n.a, v) : 0) + (n.b ? count(n.b, v) : 0); }
    var PREC = { '+': 1, '-': 1, '*': 2, '/': 2, neg: 3, '^': 4 };
    function show(n, parent, right, pop) {
      var s;
      if (n.t === 'n') return n.s || String(n.v);
      if (n.t === 'v') return n.n;
      if (n.t === 'sqrt') return '√(' + show(n.a, 0) + ')';
      if (n.t === 'neg') s = '−' + show(n.a, 3);
      else if (n.t === '^') s = show(n.a, 4, false) + '<sup>' + show(n.b, 0) + '</sup>';
      else {
        var l = show(n.a, PREC[n.t], false, n.t), r = show(n.b, PREC[n.t], true, n.t);
        if (n.t === '*') s = (n.b.t === 'n' || n.b.t === '/' || n.a.t === '/' || (n.a.t === 'n' && n.b.t === 'n')) ? l + ' × ' + r : l + r;
        else if (n.t === '/') s = (n.a.t === '/' ? '(' + l + ')' : l) + '/' + r;
        else s = l + ' ' + (n.t === '-' ? '−' : '+') + ' ' + r;
      }
      var need = parent && PREC[n.t] !== undefined && (PREC[n.t] < parent || (right && PREC[n.t] === parent && (pop === '-' || pop === '/')));
      if (n.t === '^') need = false;
      return need ? '(' + s + ')' : s;
    }
    function subject(t) {
      var m = t.match(/(?:make|express|change)\s+([a-zA-Z])\s+(?:the\s+)?subject(?:\s+of)?(?:\s+the)?(?:\s+(?:formula|equation))?\s*[:,]?\s*/i);
      var tv, eqText;
      if (m) { tv = m[1]; eqText = t.slice(m.index + m[0].length); }
      else { m = t.match(/(?:make|express|solve for|find)\s+([a-zA-Z])\s+in\s+terms\s+of\s+[a-zA-Z,\s and]+?[:,]?\s+(?:given\s+(?:that\s+)?)?(?=[^=]*=)/i); if (!m) return null; tv = m[1]; eqText = t.slice(m.index + m[0].length); }
      eqText = eqText.replace(/[.?!]+\s*$/, '');
      var parts = eqText.split('=');
      if (parts.length !== 2) return null;
      var L = parseExpr(parts[0]), R = parseExpr(parts[1]);
      if (!L || !R) return null;
      var inL = has(L, tv), inR = has(R, tv);
      if (inL === inR || count(L, tv) + count(R, tv) !== 1) return null;
      var E = inL ? L : R, O = inL ? R : L, lines = [], first = true;
      lines.push('Start with ' + show(L) + ' = ' + show(R) + '. Aim: get ' + tv + ' alone on one side, undoing each operation on ' + tv + ' in reverse order, and doing the same to both sides.');
      for (var guard = 0; guard < 12 && !(E.t === 'v' && E.n === tv); guard++) {
        var step, nxt;
        if (E.t === '+') { if (has(E.a, tv)) { step = 'Subtract ' + show(E.b, 2) + ' from both sides'; nxt = { E: E.a, O: { t: '-', a: O, b: E.b } }; } else { step = 'Subtract ' + show(E.a, 2) + ' from both sides'; nxt = { E: E.b, O: { t: '-', a: O, b: E.a } }; } }
        else if (E.t === '-') { if (has(E.a, tv)) { step = 'Add ' + show(E.b, 2) + ' to both sides'; nxt = { E: E.a, O: { t: '+', a: O, b: E.b } }; } else { step = 'Subtract ' + show(E.a, 2) + ' from both sides, then change the sign'; nxt = { E: E.b, O: { t: '-', a: E.a, b: O } }; } }
        else if (E.t === '*') { if (has(E.a, tv)) { step = 'Divide both sides by ' + show(E.b, 3); nxt = { E: E.a, O: { t: '/', a: O, b: E.b } }; } else { step = 'Divide both sides by ' + show(E.a, 3); nxt = { E: E.b, O: { t: '/', a: O, b: E.a } }; } }
        else if (E.t === '/') { if (has(E.a, tv)) { step = 'Multiply both sides by ' + show(E.b, 3); nxt = { E: E.a, O: { t: '*', a: O, b: E.b } }; } else { step = 'Multiply both sides by ' + show(E.b, 3) + ' and divide by ' + show(O, 3); nxt = { E: E.b, O: { t: '/', a: E.a, b: O } }; } }
        else if (E.t === '^' && E.b.t === 'n' && E.b.v === 2) { step = 'Take the square root of both sides (use the positive root for a length or size)'; nxt = { E: E.a, O: { t: 'sqrt', a: O } }; }
        else if (E.t === 'sqrt') { step = 'Square both sides'; nxt = { E: E.a, O: { t: '^', a: O, b: { t: 'n', v: 2 } } }; }
        else if (E.t === 'neg') { step = 'Multiply both sides by −1'; nxt = { E: E.a, O: { t: 'neg', a: O } }; }
        else return null;
        E = nxt.E; O = nxt.O;
        lines.push(step + ': ' + show(E) + ' = ' + show(O));
      }
      if (!(E.t === 'v' && E.n === tv)) return null;
      return out('Changing the subject', lines, tv + ' = ' + show(O));
    }
  window.solveItem = function (q) {
    var res = _prev.apply(this, arguments);
    if (res && (res.st === 'fail' || res.st === 'low' || res.st === 'theory')) {
      try { var r = subject(String((q && q.text) || '')); if (r) return r; } catch (e) { /* keep the engine's answer */ }
    }
    return res;
  };
})();
`;
