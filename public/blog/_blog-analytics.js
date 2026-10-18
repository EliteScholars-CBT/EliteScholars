(function () {
  var TRACK_URL = '/api/events/track';

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function device() {
    var w = window.innerWidth;
    return w < 600 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  }

  function post() {
    // Each page carries its own small post descriptor (no big posts.js download).
    return window.__BLOG_POST || null;
  }

  function send(payload) {
    try {
      (payload.events || []).forEach(function (ev) {
        var body = JSON.stringify(Object.assign({}, ev, { type: 'blog_' + ev.type }));
        if (navigator.sendBeacon) navigator.sendBeacon(TRACK_URL, new Blob([body], { type: 'application/json' }));
        else fetch(TRACK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true });
      });
    } catch (_) {}
  }

  var sessionId   = uid();
  var startIso    = new Date().toISOString();
  var startTime   = Date.now();
  var maxScroll   = 0;
  var sent        = false;

  function scrollPct() {
    var el  = document.documentElement;
    var top = el.scrollTop || document.body.scrollTop;
    var h   = el.scrollHeight - el.clientHeight;
    return h > 0 ? Math.round((top / h) * 100) : 0;
  }

  window.addEventListener('scroll', function () {
    var pct = scrollPct();
    if (pct > maxScroll) maxScroll = pct;
  }, { passive: true });

  function flush(type) {
    if (sent && type !== 'session_end') return;
    var p = post();
    var endIso = new Date().toISOString();
    var durSec = Math.round((Date.now() - startTime) / 1000);

    var readPct = maxScroll;
    var finished = readPct >= 80;

    var payload = {
      action: 'blogAnalytics',
      events: [{
        type:            type,
        postId:          p ? p.id          : '',
        postTitle:       p ? p.title       : document.title,
        category:        p ? p.category    : '',
        author:          p ? p.author      : '',
        readTimeMins:    p ? p.readTime    : '',
        sessionId:       sessionId,
        startIso:        startIso,
        endIso:          endIso,
        durationSec:     durSec,
        maxScrollPct:    maxScroll,
        readPct:         readPct,
        finished:        finished,
        referrer:        document.referrer || 'direct',
        device:          device(),
        pageUrl:         window.location.href,
        clientTimestamp: endIso,
      }]
    };

    send(payload);
    if (type === 'session_end') sent = true;
  }

  window.addEventListener('load', function () {
    flush('page_view');
  });

  window.addEventListener('pagehide', function () {
    flush('session_end');
  });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') flush('session_end');
  });
})();
