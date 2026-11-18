// studyMore.js — more teaching skills for the Study Engine page (no AI): like terms, gradient of a curve at a point,
// equation of a line, uniform motion, mass-to-mass and concentration in chemistry, arrangements, inequalities, surds,
// LCM and HCF. Some are tried before the engine (where the engine is known to answer wrongly), the rest only when the
// engine could not solve the question. Plain string, runs as written.
export const MORE_SRC = String.raw`
(function () {
  var _prev = window.solveItem;
  if (typeof _prev !== 'function') return;
  function out(title, lines, ans) {
    return { st: 'ok', html: '<div class="worked"><div class="wk-h">' + title + '</div><div class="wk-s">' + lines.map(function (l) { return '<div class="wk-l">' + l + '</div>'; }).join('') + '</div><div class="wk-a">' + ans + '</div></div>' };
  }
  function nf(x) { var r = Math.round(x * 10000) / 10000; return String(r).replace('-', '−'); }
  function cf(t) { t = String(t).replace(/\s/g, ''); return t === '' || t === '+' ? 1 : t === '-' ? -1 : parseFloat(t); }
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  function sgn(x) { return x < 0 ? '−' : '+'; }
  function after(t, re) { var m = t.match(re); return m ? t.slice(m.index + m[0].length) : null; }

  /* collecting like terms: "Simplify 3a + 2b - a + 5b" */
  function likeTerms(t) {
    var e = after(t, /simplify\s*[:,]?\s*/i); if (!e) return null;
    e = e.replace(/[.?!]+\s*$/, '').replace(/−|–/g, '-').replace(/\s+/g, '');
    if (!e || /[()=√\/]/.test(e) || !/[a-z]/i.test(e)) return null;
    var re = /([+-]?)(\d*\.?\d*)([a-z](?:\^\d)?)?/gi, m, groups = {}, order = [], used = 0, n = 0;
    while ((m = re.exec(e)) && m[0] !== '') {
      var c = m[2] === '' ? (m[3] ? 1 : null) : parseFloat(m[2]); if (c === null) return null;
      c *= m[1] === '-' ? -1 : 1; var k = (m[3] || '').toLowerCase();
      if (!(k in groups)) { groups[k] = []; order.push(k); }
      groups[k].push(c); used += m[0].length; n++;
    }
    if (used !== e.length || n < 3 || order.length === n) return null;
    order.sort(function (a, b) { return (a === '') - (b === '') || (a < b ? -1 : 1); });
    var show = function (c, k) { var a = Math.abs(c); return (k && a === 1 ? '' : nf(a)) + k; };
    var lines = ['Like terms have exactly the same letters. Add or subtract the numbers in front of each kind of term.'], res = [];
    order.forEach(function (k) {
      var g = groups[k], s = g.reduce(function (a, b) { return a + b; }, 0);
      if (g.length > 1) lines.push((k || 'numbers') + ' terms: ' + g.map(function (c, i) { return (i === 0 ? (c < 0 ? '−' : '') : ' ' + sgn(c) + ' ') + show(c, k); }).join('') + ' = ' + (s < 0 ? '−' : '') + show(s, k));
      if (s !== 0) res.push({ s: s, k: k });
    });
    var ans = res.length ? res.map(function (r, i) { return (i === 0 ? (r.s < 0 ? '−' : '') : ' ' + sgn(r.s) + ' ') + show(r.s, r.k); }).join('') : '0';
    return out('Simplifying an expression', lines, ans);
  }

  /* gradient of a curve at a point (the engine reads this as a straight line, so it is worked here first) */
  function poly(src) {
    var e = String(src).replace(/\s+/g, '').replace(/−/g, '-').replace(/²/g, '^2').replace(/³/g, '^3');
    var re = /([+-]?)(\d*\.?\d*)(x(?:\^(-?\d+))?)?/gi, m, terms = [], used = 0;
    while ((m = re.exec(e)) && m[0] !== '') {
      var hasX = !!m[3]; if (m[2] === '' && !hasX) return null;
      var c = m[2] === '' ? 1 : parseFloat(m[2]); if (m[1] === '-') c = -c;
      terms.push({ c: c, n: hasX ? (m[4] !== undefined ? +m[4] : 1) : 0 }); used += m[0].length;
    }
    return used === e.length && terms.length ? terms : null;
  }
  function pstr(ts) { var s = ts.filter(function (x) { return x.c !== 0; }).map(function (x, i) { var a = Math.abs(x.c), body = x.n === 0 ? nf(a) : (a === 1 ? '' : nf(a)) + 'x' + (x.n === 1 ? '' : '<sup>' + x.n + '</sup>'); return (i === 0 ? (x.c < 0 ? '−' : '') : ' ' + sgn(x.c) + ' ') + body; }).join(''); return s || '0'; }
  function gradientAt(t) {
    if (!/gradient|slope|rate of change|dy\/dx/i.test(t)) return null;
    var f = t.match(/(?:y|f\(x\))\s*=\s*([^,;?]*?)(?:\s+at\b|\s+when\b|\s*,|\s*\?|$)/i), at = t.match(/(?:at|when)\s*(?:the point\s*)?(?:\(\s*)?x\s*=\s*(-?\d+\.?\d*)/i);
    if (!f || !at) return null;
    var ts = poly(f[1]); if (!ts || ts.every(function (x) { return x.n <= 1; }) && ts.some(function (x) { return x.n === 1; }) && ts.length <= 2 && !ts.some(function (x) { return x.n > 1; })) return null;
    var xv = parseFloat(at[1]), d = ts.filter(function (x) { return x.n !== 0; }).map(function (x) { return { c: x.c * x.n, n: x.n - 1 }; });
    var val = d.reduce(function (a, x) { return a + x.c * Math.pow(xv, x.n); }, 0);
    return out('Gradient of a curve at a point', ['The gradient of a curve at a point is the value of dy/dx there.', 'y = ' + pstr(ts), 'Differentiate (multiply by the power, then lower the power by 1): dy/dx = ' + pstr(d), 'Put x = ' + nf(xv) + ': dy/dx = ' + d.map(function (x) { return nf(x.c) + '(' + nf(xv) + ')' + (x.n > 1 ? '<sup>' + x.n + '</sup>' : ''); }).join(' + ') + ' = ' + nf(val)], 'Gradient = ' + nf(val));
  }

  /* straight line through a point with a gradient, or through two points */
  function lineEq(t) {
    if (!/equation of (?:the |a )?(?:straight )?line/i.test(t)) return null;
    var pts = [], re = /\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)/g, m; while ((m = re.exec(t))) pts.push([+m[1], +m[2]]);
    var g = t.match(/(?:gradient|slope)\s*(?:of|=|is)?\s*(-?\d+\.?\d*)/i), x1, y1, mm, lines = [];
    if (pts.length >= 2) { x1 = pts[0][0]; y1 = pts[0][1]; var x2 = pts[1][0], y2 = pts[1][1]; if (x2 === x1) return out('Equation of a line', ['Both points have x = ' + nf(x1) + ', so the line is vertical.'], 'x = ' + nf(x1)); mm = (y2 - y1) / (x2 - x1); lines.push('Gradient m = (y₂ − y₁) ÷ (x₂ − x₁) = (' + nf(y2) + ' − ' + nf(y1) + ') ÷ (' + nf(x2) + ' − ' + nf(x1) + ') = ' + nf(mm)); }
    else if (pts.length === 1 && g) { x1 = pts[0][0]; y1 = pts[0][1]; mm = +g[1]; lines.push('The gradient is m = ' + nf(mm) + '.'); }
    else return null;
    var c = y1 - mm * x1;
    lines.push('Use y − y₁ = m(x − x₁) with the point (' + nf(x1) + ', ' + nf(y1) + '): y − ' + (y1 < 0 ? '(' + nf(y1) + ')' : nf(y1)) + ' = ' + nf(mm) + '(x − ' + (x1 < 0 ? '(' + nf(x1) + ')' : nf(x1)) + ')');
    lines.push('Multiply out and make y the subject: y = ' + nf(mm) + 'x ' + sgn(c) + ' ' + nf(Math.abs(c)));
    return out('Equation of a line', lines, 'y = ' + (mm === 1 ? '' : mm === -1 ? '−' : nf(mm)) + 'x' + (c === 0 ? '' : ' ' + sgn(c) + ' ' + nf(Math.abs(c))));
  }

  /* uniform motion that ends at rest, or starts from rest (average velocity), which the engine's simple speed formula gets wrong */
  function motion(t) {
    var stop = /(decelerat|retard|brought to rest|comes? to rest|come to rest|to rest)/i.test(t) && /uniform|decelerat|retard|constant/i.test(t);
    var start = /from rest/i.test(t) && /(reach|attain|acquire|gain|velocity of|speed of)/i.test(t);
    if (!stop && !start) return null;
    var v = t.match(/(\d+\.?\d*)\s*m\/s/i), tm = t.match(/(\d+\.?\d*)\s*(?:s|seconds?)\b/i);
    if (!v || !tm) return null;
    var V = +v[1], T = +tm[1], wantD = /distance|how far|displacement/i.test(t), wantA = /decelerat|retard|acceleration/i.test(t) && /(find|calculate|determine|what is)[^.?]*?(decelerat|retard|acceleration)/i.test(t);
    var u = stop ? V : 0, w = stop ? 0 : V, a = (w - u) / T, s = (u + w) / 2 * T, L = [stop ? 'It starts at ' + nf(V) + ' m/s and ends at rest, so u = ' + nf(V) + ', v = 0, t = ' + nf(T) + ' s.' : 'It starts from rest and reaches ' + nf(V) + ' m/s, so u = 0, v = ' + nf(V) + ', t = ' + nf(T) + ' s.'];
    if (wantD) { L.push('Speed changes steadily, so use the average speed: s = (u + v)/2 × t'); L.push('s = (' + nf(u) + ' + ' + nf(w) + ')/2 × ' + nf(T) + ' = ' + nf(s)); return out('Uniform motion', L, 'Distance = ' + nf(s) + ' m'); }
    if (wantA) { L.push('a = (v − u) ÷ t = (' + nf(w) + ' − ' + nf(u) + ') ÷ ' + nf(T) + ' = ' + nf(a)); return out('Uniform motion', L, (a < 0 ? 'Deceleration = ' + nf(-a) + ' m/s² (acceleration = ' + nf(a) + ' m/s²)' : 'Acceleration = ' + nf(a) + ' m/s²')); }
    return null;
  }

  /* chemistry: formula masses, mass-to-mass and concentration */
  var AM = { H: 1, He: 4, Li: 7, Be: 9, B: 11, C: 12, N: 14, O: 16, F: 19, Ne: 20, Na: 23, Mg: 24, Al: 27, Si: 28, P: 31, S: 32, Cl: 35.5, Ar: 40, K: 39, Ca: 40, Mn: 55, Fe: 56, Ni: 59, Cu: 64, Zn: 65, Br: 80, Ag: 108, I: 127, Ba: 137, Pb: 207, Hg: 201, Sn: 119 };
  function atoms(f) {
    var s = String(f).replace(/\./g, ''), i = 0;
    function grp() { var r = {}; while (i < s.length && s[i] !== ')') { if (s[i] === '(') { i++; var g = grp(); i++; var n = num(); for (var k in g) r[k] = (r[k] || 0) + g[k] * n; } else { var m = s.slice(i).match(/^([A-Z][a-z]?)/); if (!m) throw 0; i += m[1].length; var c = num(); r[m[1]] = (r[m[1]] || 0) + c; } } return r; }
    function num() { var m = s.slice(i).match(/^\d+/); if (!m) return 1; i += m[0].length; return +m[0]; }
    var a = grp(); if (i < s.length) throw 0; for (var e in a) if (!(e in AM)) throw 0; return a;
  }
  function mass(f) { var a = atoms(f), t = 0; for (var e in a) t += a[e] * AM[e]; return t; }
  var FORM = '[A-Z][A-Za-z0-9()]*';
  function stoich(t) {
    var q = t.match(new RegExp('(?:mass|grams?|amount)\\s+of\\s+(' + FORM + ')[^?]*?(\\d+\\.?\\d*)\\s*g(?:rams?)?\\s+of\\s+(' + FORM + ')', 'i'));
    var ai = t.search(/->|→|=>/), eqm = ai < 0 ? null : [0, t.slice(0, ai).split(/[:;?]\s*|\.\s+/).pop().trim() + ' -> ' + t.slice(ai).replace(/^(->|→|=>)\s*/, '').replace(/[.?]\s*$/, '')];
    if (!q || !eqm) return null;
    var X = q[1], G = +q[2], Y = q[3], sides = eqm[1].split(/->|→|=>/); if (sides.length !== 2) return null;
    var sp = function (side) { return side.split('+').map(function (x) { var m = x.trim().match(/^(\d*)\s*([A-Z][A-Za-z0-9()]*)/); return m ? { c: m[1] === '' ? 1 : +m[1], f: m[2] } : null; }); };
    var all = sp(sides[0]).concat(sp(sides[1])); if (all.some(function (x) { return !x; })) return null;
    var cx = all.filter(function (x) { return x.f === X; })[0], cy = all.filter(function (x) { return x.f === Y; })[0];
    if (!cx || !cy) return null;
    try {
      var bal = function (side) { var r = {}; sp(side).forEach(function (x) { var a = atoms(x.f); for (var e in a) r[e] = (r[e] || 0) + a[e] * x.c; }); return r; }, l = bal(sides[0]), r2 = bal(sides[1]);
      for (var e in l) if (l[e] !== r2[e]) return null;
      for (var e2 in r2) if (l[e2] !== r2[e2]) return null;
      var mx = mass(X), my = mass(Y), ny = G / my, nx = ny * cx.c / cy.c, gx = nx * mx;
      return out('Mass-to-mass calculation', ['Equation: ' + eqm[1].trim() + ' (balanced). Atomic masses used: ' + Object.keys(atoms(X)).concat(Object.keys(atoms(Y))).filter(function (v, i, a) { return a.indexOf(v) === i; }).map(function (e) { return e + ' = ' + AM[e]; }).join(', '), 'Molar mass of ' + Y + ' = ' + nf(my) + ' g/mol; molar mass of ' + X + ' = ' + nf(mx) + ' g/mol', 'Moles of ' + Y + ' = mass ÷ molar mass = ' + nf(G) + ' ÷ ' + nf(my) + ' = ' + nf(ny) + ' mol', 'From the equation ' + cy.c + ' mol ' + Y + ' gives ' + cx.c + ' mol ' + X + ', so moles of ' + X + ' = ' + nf(ny) + ' × ' + cx.c + '/' + cy.c + ' = ' + nf(nx) + ' mol', 'Mass of ' + X + ' = moles × molar mass = ' + nf(nx) + ' × ' + nf(mx) + ' = ' + nf(gx) + ' g'], 'Mass of ' + X + ' = ' + nf(gx) + ' g');
    } catch (err) { return null; }
  }
  function concentration(t) {
    if (!/concentration|molarity|molar\b|mol\/dm|g\/dm/i.test(t)) return null;
    var g = t.match(new RegExp('(\\d+\\.?\\d*)\\s*g(?:rams?)?\\s+of\\s+(' + FORM + ')')), v = t.match(/(\d+\.?\d*)\s*(cm3|cm\^3|cm³|dm3|dm\^3|dm³|ml|litres?|liters?|l)\b/i);
    if (!g || !v) return null;
    var f = g[2], M; try { M = mass(f); } catch (e) { return null; }
    var m = +g[1], vol = +v[1], dm = /^(cm|ml)/i.test(v[2]) ? vol / 1000 : vol, n = m / M;
    return out('Concentration', ['Molar mass of ' + f + ' = ' + nf(M) + ' g/mol', 'Moles = mass ÷ molar mass = ' + nf(m) + ' ÷ ' + nf(M) + ' = ' + nf(n) + ' mol', 'Volume = ' + nf(vol) + ' ' + v[2] + (dm !== vol ? ' = ' + nf(dm) + ' dm³ (divide cm³ by 1000)' : ''), 'Concentration (mol/dm³) = moles ÷ volume = ' + nf(n) + ' ÷ ' + nf(dm) + ' = ' + nf(n / dm), 'Concentration (g/dm³) = mass ÷ volume = ' + nf(m) + ' ÷ ' + nf(dm) + ' = ' + nf(m / dm)], nf(n / dm) + ' mol/dm³  (' + nf(m / dm) + ' g/dm³)');
  }

  /* arrangements, linear inequalities, surds, LCM and HCF */
  function fact(n) { var r = 1; for (var i = 2; i <= n; i++) r *= i; return r; }
  function perms(t) {
    if (!/arrang|permut|in how many ways|seated|queue/i.test(t)) return null;
    var w = t.match(/letters of the word\s+["'“]?([A-Za-z]{2,12})/i) || t.match(/arrangements? of (?:the letters (?:in|of) )?(?:the word )?["'“]?([A-Z]{3,12})\b/);
    if (w) {
      var word = w[1].toUpperCase(), cnt = {}; word.split('').forEach(function (c) { cnt[c] = (cnt[c] || 0) + 1; });
      var reps = Object.keys(cnt).filter(function (c) { return cnt[c] > 1; }), n = word.length, den = reps.reduce(function (a, c) { return a * fact(cnt[c]); }, 1);
      var L = ['The word ' + word + ' has ' + n + ' letters.', reps.length ? 'Repeated letters: ' + reps.map(function (c) { return c + ' appears ' + cnt[c] + ' times'; }).join(', ') + '. Divide by the arrangements of each repeated letter.' : 'No letter repeats, so all ' + n + '! orders are different.', 'Number of arrangements = ' + n + '!' + (reps.length ? ' ÷ (' + reps.map(function (c) { return cnt[c] + '!'; }).join(' × ') + ')' : '') + ' = ' + fact(n) + (reps.length ? ' ÷ ' + den : '') + ' = ' + (fact(n) / den)];
      return out('Arrangements', L, (fact(n) / den) + ' ways');
    }
    var m = t.match(/(\d+)\s+(?:\w+\s+){0,3}?(?:are\s+)?(?:arranged|seated|queue|line up|lined up|placed)/i) || t.match(/arrange\s+(\d+)/i);
    if (!m) return null;
    var k = +m[1]; if (k < 1 || k > 15) return null;
    return out('Arrangements', ['Choose who goes in the first place: ' + k + ' ways; the second: ' + (k - 1) + ' ways; and so on down to 1.', 'Total = ' + k + '! = ' + Array.apply(null, Array(k)).map(function (_, i) { return k - i; }).join(' × ') + ' = ' + fact(k)], fact(k) + ' ways');
  }
  function inequality(t) {
    var t2 = t.replace(/\s+/g, '').replace(/−/g, '-'), lead = t2.match(/(-?\d+\.?\d*)([+-]\d*\.?\d*)x(>=|<=|>|<|≥|≤)(-?\d+\.?\d*)(?![x\d])/i);
    if (lead && /inequalit|solve|find the (?:range|values?|solution)/i.test(t)) t = lead[2] + 'x' + (lead[1].charAt(0) === '-' ? '' : '+') + lead[1] + lead[3] + lead[4];
    var m = t.replace(/\s+/g, '').replace(/−/g, '-').match(/(-?\d*\.?\d*)x([+-]\d+\.?\d*)?(>=|<=|>|<|≥|≤)(-?\d+\.?\d*)(?![x\d])/i);
    if (!m || !/inequalit|solve|find the (?:range|values?|solution)/i.test(t)) return null;
    var a = cf(m[1]), b = m[2] ? parseFloat(m[2]) : 0, op = m[3].replace('>=', '≥').replace('<=', '≤'), c = parseFloat(m[4]);
    if (!a) return null;
    var flip = { '>': '<', '<': '>', '≥': '≤', '≤': '≥' }, rhs = c - b, final = rhs / a, op2 = a < 0 ? flip[op] : op;
    var L = ['Treat it like an equation, but remember: multiplying or dividing by a negative number reverses the inequality sign.'];
    if (b) L.push((b > 0 ? 'Subtract ' + nf(b) + ' from' : 'Add ' + nf(-b) + ' to') + ' both sides: ' + nf(a) + 'x ' + op + ' ' + nf(rhs));
    L.push('Divide both sides by ' + nf(a) + (a < 0 ? ' (negative, so the sign flips)' : '') + ': x ' + op2 + ' ' + nf(final));
    return out('Linear inequality', L, 'x ' + op2 + ' ' + nf(final));
  }
  function surd(t) {
    var m = t.match(/(?:simplify|express)[^√\d]*(?:√|sqrt)\s*\(?\s*(\d+)\s*\)?/i);
    if (!m) return null;
    var n = +m[1], best = 1; for (var i = 2; i * i <= n; i++) if (n % (i * i) === 0) best = i;
    if (best === 1) return out('Simplifying a surd', ['Look for the largest square number (4, 9, 16, 25, 36, …) that divides ' + n + '.', 'None divides ' + n + ', so √' + n + ' is already in its simplest form.'], '√' + n);
    var r = n / (best * best);
    return out('Simplifying a surd', ['Find the largest square number that divides ' + n + ': ' + (best * best) + ' (' + n + ' = ' + (best * best) + ' × ' + r + ').', '√' + n + ' = √(' + (best * best) + ' × ' + r + ') = √' + (best * best) + ' × √' + r, '√' + (best * best) + ' = ' + best], best + (r === 1 ? '' : '√' + r));
  }
  function pf(n) { var f = [], d = 2; while (n > 1 && d * d <= n) { while (n % d === 0) { f.push(d); n /= d; } d++; } if (n > 1) f.push(n); return f; }
  function lcmHcf(t) {
    var wantL = /lcm|lowest common multiple|least common multiple/i.test(t), wantH = /hcf|gcd|highest common factor|greatest common (?:factor|divisor)/i.test(t);
    if (!wantL && !wantH) return null;
    var nums = (t.match(/\d+/g) || []).map(Number).filter(function (x) { return x > 0; }); if (nums.length < 2 || nums.length > 4) return null;
    var fs = nums.map(pf), L = nums.map(function (n, i) { return n + ' = ' + (fs[i].length ? fs[i].join(' × ') : '1'); });
    var all = {}; fs.forEach(function (f) { var c = {}; f.forEach(function (p) { c[p] = (c[p] || 0) + 1; }); for (var p in c) all[p] = all[p] ? { lo: Math.min(all[p].lo, c[p]), hi: Math.max(all[p].hi, c[p]) } : { lo: c[p], hi: c[p] }; });
    fs.forEach(function (f, i) { var c = {}; f.forEach(function (p) { c[p] = 1; }); }); 
    var have = function (p) { return fs.filter(function (f) { return f.indexOf(+p) > -1; }).length; };
    var lcm = 1, hcf = 1, lp = [], hp = [];
    Object.keys(all).forEach(function (p) { lcm *= Math.pow(+p, all[p].hi); for (var i = 0; i < all[p].hi; i++) lp.push(p); if (have(p) === nums.length) { hcf *= Math.pow(+p, all[p].lo); for (var j = 0; j < all[p].lo; j++) hp.push(p); } });
    var lines = ['Write each number as a product of prime factors:'].concat(L);
    if (wantL) lines.push('LCM: take every prime factor the greatest number of times it appears: ' + lp.join(' × ') + ' = ' + lcm);
    if (wantH) lines.push('HCF: take only the prime factors common to all the numbers, the fewest times they appear: ' + (hp.length ? hp.join(' × ') + ' = ' + hcf : 'none, so the HCF is 1'));
    return out(wantL && wantH ? 'LCM and HCF' : wantL ? 'Lowest common multiple' : 'Highest common factor', lines, (wantL ? 'LCM = ' + lcm : '') + (wantL && wantH ? ',  ' : '') + (wantH ? 'HCF = ' + hcf : ''));
  }

  var BEFORE = [gradientAt, motion], AFTER = [likeTerms, lineEq, stoich, concentration, perms, inequality, surd, lcmHcf];
  window.solveItem = function (q) {
    var t = String((q && q.text) || '');
    try { for (var i = 0; i < BEFORE.length; i++) { var b = BEFORE[i](t); if (b) return b; } } catch (e) { /* use the engine */ }
    var res = _prev.apply(this, arguments);
    if (res && (res.st === 'fail' || res.st === 'low' || res.st === 'theory')) {
      try { for (var j = 0; j < AFTER.length; j++) { var a = AFTER[j](t); if (a) return a; } } catch (e) { /* keep the engine's answer */ }
    }
    return res;
  };
})();
`;
