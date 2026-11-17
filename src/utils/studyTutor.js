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
    window.solveItem = function (q) {
      try { var t = String((q && q.text) || ''), r = coin(t) || dice(t); if (r) return r; } catch (e) { /* fall through to the engine */ }
      return _si.apply(this, arguments);
    };
  })();
})();
`;
