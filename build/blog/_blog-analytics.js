(function () {
  var GAS_URL = 'https://script.google.com/macros/s/AKfycbxmY2qZ-5zexeOLdZba1U6k3Sl7czKLzC0PjW4jP1FSO4P_mMkSWN4fUmmCBPjt09YU/exec';

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function device() {
    var w = window.innerWidth;
    return w < 600 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  }

  function post() {
    if (typeof BLOG_POSTS === 'undefined' || typeof BlogEngine === 'undefined') return null;
    var slug = window.location.pathname.split('/').pop().replace('.html', '');
    return BLOG_POSTS.find(function (p) { return p.id === slug; }) || null;
  }

  function send(payload) {
    try {
      navigator.sendBeacon
        ? navigator.sendBeacon(GAS_URL, JSON.stringify(payload))
        : fetch(GAS_URL, { method: 'POST', body: JSON.stringify(payload), keepalive: true });
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
