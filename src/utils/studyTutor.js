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
    /* -- tried only when the engine itself could not solve the question ------------------------------------------ */
    function money(t) { var m = t.match(/(?:N|₦|NGN\s*)?\s*(\d[\d,]*\.?\d*)/); return m ? parseFloat(m[1].replace(/,/g, '')) : null; }
    function interest(t) {
      if (!/interest/i.test(t)) return null;
      var P = money(t), r = t.match(/(\d+\.?\d*)\s*%/), n = t.match(/(\d+\.?\d*)\s*(year|yr|month)/i);
      if (!P || !r || !n) return null;
      r = +r[1]; var yrs = /month/i.test(n[2]) ? +n[1] / 12 : +n[1];
      if (/compound/i.test(t)) {
        var A = P * Math.pow(1 + r / 100, yrs), L = ['Compound interest: A = P(1 + r/100)<sup>n</sup>, and interest = A − P.', 'P = ' + nf(P) + ', r = ' + r + '%, n = ' + nf(yrs) + ' years', 'A = ' + nf(P) + ' × (1 + ' + nf(r / 100) + ')<sup>' + nf(yrs) + '</sup> = ' + nf(A), 'Interest = ' + nf(A) + ' − ' + nf(P) + ' = ' + nf(A - P)];
        return out('Compound interest', L, 'Compound interest = ' + nf(A - P) + '  (amount = ' + nf(A) + ')');
      }
      var I = P * r * yrs / 100;
      return out('Simple interest', ['Simple interest: I = P × R × T ÷ 100', 'I = ' + nf(P) + ' × ' + r + ' × ' + nf(yrs) + ' ÷ 100 = ' + nf(I), 'Amount after ' + nf(yrs) + ' years = ' + nf(P) + ' + ' + nf(I) + ' = ' + nf(P + I)], 'Simple interest = ' + nf(I));
    }
    function quad(t) {
      var m = t.replace(/²/g, '^2').replace(/\s+/g, '').match(/([+-]?\d*\.?\d*)x\^2([+-]\d*\.?\d*)x([+-]\d+\.?\d*)?=0/i);
      if (!m) return null;
      var a = cf(m[1]), b = cf(m[2]), c = m[3] ? parseFloat(m[3]) : 0, D = b * b - 4 * a * c;
      var L = ['Write it as ax² + bx + c = 0: a = ' + nf(a) + ', b = ' + nf(b) + ', c = ' + nf(c), 'Use x = (−b ± √(b² − 4ac)) ÷ 2a', 'Discriminant: b² − 4ac = ' + nf(b * b) + ' − ' + (4 * a * c < 0 ? '(' + nf(4 * a * c) + ')' : nf(4 * a * c)) + ' = ' + nf(D)];
      if (D < 0) return out('Quadratic equation', L.concat(['The discriminant is negative, so there are no real roots.']), 'No real roots');
      var sq = Math.sqrt(D), x1 = (-b + sq) / (2 * a), x2 = (-b - sq) / (2 * a);
      if (D === 0) return out('Quadratic equation', L.concat(['The discriminant is 0, so the two roots are equal: x = −b ÷ 2a']), 'x = ' + nf(x1));
      L.push('√' + nf(D) + ' = ' + nf(sq));
      L.push('x = (' + nf(-b) + ' + ' + nf(sq) + ') ÷ ' + nf(2 * a) + ' = ' + nf(x1) + '   or   x = (' + nf(-b) + ' − ' + nf(sq) + ') ÷ ' + nf(2 * a) + ' = ' + nf(x2));
      return out('Quadratic equation', L, 'x = ' + nf(x1) + ' or x = ' + nf(x2));
    }
    var TR = { sin: { 0: [0, '0'], 30: [0.5, '1/2'], 45: [Math.SQRT1_2, '√2/2'], 60: [Math.sqrt(3) / 2, '√3/2'], 90: [1, '1'] }, cos: { 0: [1, '1'], 30: [Math.sqrt(3) / 2, '√3/2'], 45: [Math.SQRT1_2, '√2/2'], 60: [0.5, '1/2'], 90: [0, '0'] }, tan: { 0: [0, '0'], 30: [1 / Math.sqrt(3), '1/√3'], 45: [1, '1'], 60: [Math.sqrt(3), '√3'] } };
    function trig(t) {
      var terms = [], re = /(sin|cos|tan)\s*(\d{1,2})\s*°?/gi, m;
      if (/[a-wyz]\s*=|\bx\b/i.test(t.replace(/(sin|cos|tan)/gi, ''))) return null;
      while ((m = re.exec(t))) { var v = TR[m[1].toLowerCase()][+m[2]]; if (!v) return null; terms.push({ f: m[1].toLowerCase(), a: +m[2], v: v }); }
      if (!terms.length || terms.length > 3) return null;
      var sign = /(\+|plus|and)/i.test(t) ? '+' : /(−|-|minus)/.test(t) ? '−' : /(×|\*|times|product)/i.test(t) ? '×' : (terms.length === 1 ? '' : null);
      if (sign === null) return null;
      var val = terms.reduce(function (acc, x, i) { return i === 0 ? x.v[0] : sign === '+' ? acc + x.v[0] : sign === '−' ? acc - x.v[0] : acc * x.v[0]; }, 0);
      var L = ['Use the exact values of the special angles (0°, 30°, 45°, 60°, 90°):'].concat(terms.map(function (x) { return x.f + ' ' + x.a + '° = ' + x.v[1]; }));
      if (terms.length > 1) L.push('Put them together: ' + terms.map(function (x) { return '(' + x.v[1] + ')'; }).join(' ' + sign + ' ') + ' = ' + nf(val));
      return out('Trigonometric ratios', L, nf(val) + (Math.abs(val - Math.round(val)) < 1e-9 ? '' : '  (≈ ' + nf(val) + ')'));
    }
    function angles(t) {
      var kind = /triangle/i.test(t) ? 180 : /straight line|angles on a line|supplementary/i.test(t) ? 180 : /quadrilateral/i.test(t) ? 360 : /around a point|at a point/i.test(t) ? 360 : /right[- ]angle|complementary/i.test(t) ? 90 : 0;
      if (!kind) return null;
      t = t.split(/\b(?:find|calculate|determine|what|solve)\b/i)[0];
      var re = /(?:^|[\s,(])(\d*\.?\d*)\s*x\b(?:\s*([+-])\s*(\d+\.?\d*))?/gi, m, k = 0, c = 0, n = 0, parts = [];
      while ((m = re.exec(t))) { var co = m[1] === '' ? 1 : parseFloat(m[1]); k += co; if (m[2]) c += (m[2] === '+' ? 1 : -1) * parseFloat(m[3]); n++; parts.push(m[0].trim()); }
      if (n < 2 || !k) return null;
      var x = (kind - c) / k, name = { 180: 'angles in a triangle (or on a straight line) add up to 180°', 360: 'angles in a quadrilateral (or round a point) add up to 360°', 90: 'complementary angles add up to 90°' }[kind];
      return out('Angles', ['The ' + name + '.', 'Add the parts: ' + parts.join(' + ') + ' = ' + kind, 'Collect the x terms: ' + nf(k) + 'x' + (c ? (c > 0 ? ' + ' : ' − ') + nf(Math.abs(c)) : '') + ' = ' + kind, nf(k) + 'x = ' + nf(kind - c), 'x = ' + nf(kind - c) + ' ÷ ' + nf(k) + ' = ' + nf(x)], 'x = ' + nf(x) + '°');
    }
    function base(t) {
      var m = t.match(/(?:convert|change|express|express|what is)?[^0-9a-f]*([0-9a-f]+)\s*(?:in\s+)?(?:base|\(?base)\s*(\d{1,2})\s*(?:to|into|in)\s*(?:base\s*)?(\d{1,2}|binary|decimal|octal|hexadecimal)/i);
      if (!m) return null;
      var NB = { binary: 2, octal: 8, decimal: 10, hexadecimal: 16 }, from = +m[2], to = isNaN(+m[3]) ? NB[m[3].toLowerCase()] : +m[3];
      if (!(from >= 2 && from <= 16 && to >= 2 && to <= 16) || isNaN(parseInt(m[1], from))) return null;
      var n = parseInt(m[1], from), digits = m[1].toUpperCase().split(''), L = [];
      if (from !== 10) { L.push('Change to base 10: add each digit × ' + from + '<sup>place</sup>, counting places from the right starting at 0.'); L.push(digits.map(function (d, i) { return parseInt(d, 16) + '×' + from + '<sup>' + (digits.length - 1 - i) + '</sup>'; }).join(' + ') + ' = ' + n); }
      if (to !== 10) { L.push('Change ' + n + ' to base ' + to + ' by dividing repeatedly by ' + to + ' and reading the remainders from the bottom up:'); var q = n, rs = []; if (q === 0) rs.push('0'); while (q > 0) { rs.push((q % to).toString(16).toUpperCase() + ' (' + q + ' ÷ ' + to + ' = ' + Math.floor(q / to) + ' r ' + (q % to) + ')'); q = Math.floor(q / to); } L = L.concat(rs); }
      return out('Number bases', L, m[1] + '<sub>' + from + '</sub> = ' + n.toString(to).toUpperCase() + '<sub>' + to + '</sub>');
    }
    var FALLBACKS = [interest, quad, trig, angles, base];
    window.solveItem = function (q) {
      try { var t = String((q && q.text) || ''), r = coin(t) || dice(t) || pct(t) || sim(t) || stdForm(t) || index(t); if (r) return r; } catch (e) { /* fall through to the engine */ }
      var res = _si.apply(this, arguments);
      if (res && (res.st === 'fail' || res.st === 'low' || res.st === 'theory')) {
        try { var t2 = String((q && q.text) || ''); for (var i = 0; i < FALLBACKS.length; i++) { var f = FALLBACKS[i](t2); if (f) return f; } } catch (e) { /* keep the engine's answer */ }
      }
      return res;
    };
  })();
})();
`;
