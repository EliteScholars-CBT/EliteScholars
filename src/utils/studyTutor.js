// studyTutor.js — extra teaching skills added to the Study Engine page, after the bridge. Plain string, runs as written.
export const TUTOR_SRC = String.raw`
(function () {
  /* -- 4. repeated coin tosses / dice: the engine reads "a coin tossed twice" as one toss, so these are worked here ----- */
  (function () {
    var _si = window.solveItem;
    if (typeof _si !== 'function') return;
    var W = { once: 1, twice: 2, thrice: 3, two: 2, three: 3, four: 4, five: 5 };
    function fr(n, d) { function g(a, b) { return b ? g(b, a % b) : a; } var k = g(n, d); return (n / k) + '/' + (d / k); }
    function C(n, k) { var r = 1; for (var i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); }
    function out(title, lines, ans) {
      return { st: 'ok', html: '<div class="worked"><div class="wk-h">' + title + '</div><div class="wk-s">' + lines.map(function (l) { return '<div class="wk-l">' + l + '</div>'; }).join('') + '</div><div class="wk-a">' + ans + '</div></div>' };
    }
    function coin(t) {
      var m = t.match(/(?:coin|coins)[^.?]*?(?:tossed|flipped|thrown)\s+(\d+|twice|thrice|two|three|four|five)(?:\s+times)?/i);
      if (!m) return null;
      var n = isNaN(+m[1]) ? W[m[1].toLowerCase()] : +m[1];
      if (!n || n < 2 || n > 12) return null;
      var face = /tail/i.test(t) && !/head/i.test(t) ? 'tail' : 'head', total = Math.pow(2, n), hdr = 'Repeated coin tosses';
      var base = ['A fair coin has 2 equally likely outcomes each toss, so ' + n + ' tosses give 2<sup>' + n + '</sup> = ' + total + ' equally likely outcomes.'];
      var ex = t.match(/exactly\s+(\d+|one|two|three|four|five)/i);
      if (ex) { var k = isNaN(+ex[1]) ? W[ex[1].toLowerCase()] : +ex[1]; if (k > n) return null; return out(hdr, base.concat(['Ways to get exactly ' + k + ' ' + face + (k === 1 ? '' : 's') + ': C(' + n + ',' + k + ') = ' + C(n, k)]), 'P = ' + C(n, k) + '/' + total + ' = ' + fr(C(n, k), total)); }
      if (/at least (?:one|1)|one or more|\bany\b/i.test(t)) return out(hdr, base.concat(['Only "no ' + face + ' at all" fails, and that is 1 outcome.', 'So P(at least one ' + face + ') = 1 − 1/' + total]), 'P = ' + fr(total - 1, total));
      if (/\ball\b|\bboth\b|every|only\s+(?:head|tail)s?/i.test(t)) return out(hdr, base.concat(['Only 1 outcome has every toss a ' + face + '.']), 'P = 1/' + total);
      if (/\ba\s+(?:head|tail)\b/i.test(t)) return out(hdr, base.concat(['"Getting a ' + face + '" in ' + n + ' tosses means at least one ' + face + '. Only "no ' + face + ' at all" fails: 1 outcome.']), 'P = ' + fr(total - 1, total));
      return null;
    }
    function dice(t) {
      var m = t.match(/(?:two|2)\s+(?:fair\s+|six-sided\s+)?dice[\s\S]{0,80}?sum\s+(?:of|is|equal(?:s)?(?:\s+to)?|to)?\s*(\d{1,2})/i) || t.match(/sum\s+(?:of\s+)?(\d{1,2})[^.?]*?(?:two|2)\s+(?:fair\s+)?dice/i);
      if (!m) return null;
      var s = +m[1]; if (s < 2 || s > 12) return null;
      var ways = s <= 7 ? s - 1 : 13 - s;
      return out('Two dice', ['Two dice give 6 × 6 = 36 equally likely outcomes.', 'Pairs that add up to ' + s + ': ' + ways], 'P(sum = ' + s + ') = ' + fr(ways, 36));
    }
    function nf(x) { var r = Math.round(x * 10000) / 10000; return String(r).replace('-', '−'); }
    function cf(t) { t = String(t).replace(/\s/g, ''); return t === '' || t === '+' ? 1 : t === '-' ? -1 : parseFloat(t); }
    function sim(t) {
      var re = /([+-]?\s*\d*\.?\d*)\s*x\s*([+-]\s*\d*\.?\d*)\s*y\s*=\s*([+-]?\s*\d+\.?\d*)/gi, m, E = [];
      while ((m = re.exec(t))) E.push([cf(m[1]), cf(m[2]), parseFloat(m[3].replace(/\s/g, ''))]);
      if (E.length < 2) return null;
      var a1 = E[0][0], b1 = E[0][1], c1 = E[0][2], a2 = E[1][0], b2 = E[1][1], c2 = E[1][2], D = a1 * b2 - a2 * b1;
      var co = function (a) { return a === 1 ? '' : a === -1 ? '−' : nf(a); };
      var eq = function (a, b, c) { return co(a) + 'x ' + (b < 0 ? '−' : '+') + ' ' + (Math.abs(b) === 1 ? '' : nf(Math.abs(b))) + 'y = ' + nf(c); };
      var L = ['Label the equations: (1) ' + eq(a1, b1, c1) + '   (2) ' + eq(a2, b2, c2)];
      if (Math.abs(D) < 1e-9) return out('Simultaneous equations', L.concat(['The x and y parts are in the same ratio in both equations, so the lines are parallel (no solution) or the same line (infinitely many solutions).']), 'No single solution');
      var x = (c1 * b2 - c2 * b1) / D, y = (a1 * c2 - a2 * c1) / D;
      L.push('Make the y coefficients equal: multiply (1) by ' + nf(b2) + ' and (2) by ' + nf(b1) + '.');
      L.push('(1) × ' + nf(b2) + ': ' + eq(a1 * b2, b1 * b2, c1 * b2) + '   (2) × ' + nf(b1) + ': ' + eq(a2 * b1, b1 * b2, c2 * b1));
      L.push('Subtract the second from the first so y disappears: ' + nf(a1 * b2 - a2 * b1) + 'x = ' + nf(c1 * b2 - c2 * b1));
      L.push('Divide: x = ' + nf(x));
      L.push('Put x = ' + nf(x) + ' into (1): ' + nf(a1) + '(' + nf(x) + ') + ' + nf(b1) + 'y = ' + nf(c1) + ', so y = ' + nf(y));
      L.push('Check in (2): ' + nf(a2) + '(' + nf(x) + ') + ' + nf(b2) + '(' + nf(y) + ') = ' + nf(a2 * x + b2 * y) + ' ✓');
      return out('Simultaneous equations', L, 'x = ' + nf(x) + ', y = ' + nf(y));
    }
    function stdForm(t) {
      if (!/standard form|scientific notation/i.test(t)) return null;
      var m = t.match(/(\d[\d,]*\.?\d*(?:e[+-]?\d+)?)/i); if (!m) return null;
      var n = parseFloat(m[1].replace(/,/g, '')); if (!isFinite(n) || n === 0) return null;
      var e = Math.floor(Math.log10(Math.abs(n))), mant = Math.round(n / Math.pow(10, e) * 1e10) / 1e10;
      var dir = e < 0 ? 'right ' + (-e) + ' place' + (e === -1 ? '' : 's') + ' to make a number between 1 and 10' : e > 0 ? 'left ' + e + ' place' + (e === 1 ? '' : 's') + ' to make a number between 1 and 10' : 'nowhere: it is already between 1 and 10';
      return out('Standard form', ['Standard form is A × 10<sup>n</sup> with 1 ≤ A &lt; 10.', 'Move the decimal point ' + dir + ': A = ' + mant, e < 0 ? 'Moving it right makes the power negative: n = ' + nf(e) : e > 0 ? 'Moving it left makes the power positive: n = ' + e : 'n = 0'], m[1] + ' = ' + mant + ' × 10<sup>' + nf(e) + '</sup>');
    }
    function index(t) {
      var m = t.match(/(\d+|[a-z])\s*\^\s*\(?(-?\d+)\)?\s*([x×*÷\/])\s*(\d+|[a-z])\s*\^\s*\(?(-?\d+)\)?/i);
      if (!m || m[1].toLowerCase() !== m[4].toLowerCase()) return null;
      var b = m[1], p = +m[2], q = +m[5], mul = /[x×*]/i.test(m[3]), r = mul ? p + q : p - q;
      var lines = ['Same base (' + b + '), so use the index law: ' + (mul ? 'a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup>' : 'a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup>'), 'Powers: ' + nf(p) + (mul ? ' + ' : ' − ') + nf(q) + ' = ' + nf(r)];
      var ans = b + '<sup>' + nf(r) + '</sup>';
      if (/^\d+$/.test(b)) { var v = Math.pow(+b, r); lines.push('Work it out: ' + b + '<sup>' + nf(r) + '</sup> = ' + (Math.abs(v) < 1e12 ? nf(v) : v.toExponential(3))); ans += ' = ' + (Math.abs(v) < 1e12 ? nf(v) : v.toExponential(3)); }
      return out('Laws of indices', lines, ans);
    }
    function pct(t) {
      var m = t.match(/(increase|decrease|change|profit|loss)[^.?]*?(?:from\s+)?(-?\d+\.?\d*)\s*(?:to|becomes|changes to|goes to|rises to|falls to|drops to)\s+(-?\d+\.?\d*)/i)
        || t.match(/(?:from\s+)(-?\d+\.?\d*)\s*to\s+(-?\d+\.?\d*)[^.?]*?(increase|decrease|change)/i);
      if (!m) return null;
      var o, n; if (/^\d|^-/.test(m[1])) { o = +m[1]; n = +m[2]; } else { o = +m[2]; n = +m[3]; }
      if (!o) return null;
      var ch = n - o, p = ch / o * 100, w = ch >= 0 ? 'increase' : 'decrease';
      return out('Percentage change', ['Percentage change = (new − old) ÷ old × 100. The old value is the one you start from: ' + nf(o) + '; the new value is ' + nf(n) + '.', 'Change = ' + nf(n) + ' − ' + nf(o) + ' = ' + nf(ch), nf(ch) + ' ÷ ' + nf(o) + ' × 100 = ' + nf(p) + '%'], 'A ' + nf(Math.abs(p)) + '% ' + w);
    }
    window.solveItem = function (q) {
      try { var t = String((q && q.text) || ''), r = coin(t) || dice(t) || pct(t) || sim(t) || stdForm(t) || index(t); if (r) return r; } catch (e) { /* fall through to the engine */ }
      return _si.apply(this, arguments);
    };
  })();
})();
`;
