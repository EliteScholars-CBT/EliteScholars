/* EliteScholars blog ads loader.
   Reads window.ES_ADS_CONFIG (see ads-config.js), shows the consent choice, and
   fills every <div class="es-ad" data-slot="..."> either with an Adsterra unit
   (only when enabled AND the visitor accepted) or with one of our own ads.
   Plain ES5 on purpose: it must run on any phone. */
(function () {
  'use strict';
  var CFG = window.ES_ADS_CONFIG || {};
  var AS = CFG.adsterra || {};
  var UNITS = AS.units || {};
  var CONSENT_KEY = 'es_consent_v1';
  var HOUSE = (CFG.houseAds || []).filter(function (a) { return a && a.link && a.title; });
  var REMOTE = { show: true, house: true, slots: {} };
  var houseIdx = 0, nativeUsed = false, socialDone = false, popDone = false, stickyDone = false;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function gpc() { try { return navigator.globalPrivacyControl === true; } catch (e) { return false; } }

  function consent() {
    var v = store(CONSENT_KEY);
    if (v === 'all' || v === 'essential') return v;
    return gpc() ? 'essential' : null;
  }
  function thirdPartyAllowed() {
    if (!AS.enabled) return false;
    if (CFG.consentRequired === false) return !gpc();
    return consent() === 'all';
  }

  function track(type, extra) {
    try {
      var body = JSON.stringify(Object.assign({ type: type, page: location.pathname }, extra || {}));
      fetch('/api/events/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
    } catch (e) { /* analytics must never break the page */ }
  }

  function absUrl(u) { return /^\/\//.test(u) ? 'https:' + u : u; }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }


  // ── Where did this reader come from? (same rules as the app) ──────────────
  var SRC_ALIAS = { wa: 'whatsapp', whatsapp: 'whatsapp', 'wa.me': 'whatsapp', 'api.whatsapp.com': 'whatsapp', 'web.whatsapp.com': 'whatsapp', fb: 'facebook', facebook: 'facebook', 'l.facebook.com': 'facebook', 'm.facebook.com': 'facebook', 'lm.facebook.com': 'facebook', ig: 'instagram', instagram: 'instagram', 'l.instagram.com': 'instagram', tw: 'x', twitter: 'x', x: 'x', 't.co': 'x', 'x.com': 'x', tiktok: 'tiktok', 'vm.tiktok.com': 'tiktok', tg: 'telegram', telegram: 'telegram', 't.me': 'telegram', youtube: 'youtube', yt: 'youtube', 'youtu.be': 'youtube', 'm.youtube.com': 'youtube', google: 'google', bing: 'bing', linkedin: 'linkedin', 'lnkd.in': 'linkedin', email: 'email', sms: 'sms' };
  function sourceTrack() {
    try {
      if (sessionStorage.getItem('es_source_sent')) return;
      var q = {}, parts = (location.search || '').replace(/^\?/, '').split('&'), i;
      for (i = 0; i < parts.length; i++) { var kv = parts[i].split('='); if (kv[0]) q[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' ')); }
      var clean = function (v) { return String(v || '').toLowerCase().replace(/^www\./, '').replace(/[^a-z0-9.\-_]/g, '').slice(0, 40); };
      var utm = clean(q.utm_source), tag = utm || clean(q.src || q.source), source = '';
      if (tag && SRC_ALIAS[tag]) source = SRC_ALIAS[tag]; else if (utm) source = utm;
      if (!source) {
        var host = '';
        try { host = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '').toLowerCase() : ''; } catch (e) { host = ''; }
        if (host && host === location.hostname.replace(/^www\./, '')) return;
        source = !host ? 'direct' : SRC_ALIAS[host] ? SRC_ALIAS[host] : /google\./.test(host) ? 'google' : /facebook\./.test(host) ? 'facebook' : /instagram\./.test(host) ? 'instagram' : 'other';
      }
      sessionStorage.setItem('es_source_sent', '1');
      var ref = String(q.ref || '').trim().toUpperCase().slice(0, 32);
      var first = null; try { first = JSON.parse(localStorage.getItem('es_first_source') || 'null'); } catch (e) { first = null; }
      var fresh = !first || (Date.now() - first.at) / 86400000 > 60 || (ref && !first.ref);
      if (fresh) localStorage.setItem('es_first_source', JSON.stringify({ source: source, ref: ref, at: Date.now() }));
      if (ref) localStorage.setItem('es_referral_attribution', JSON.stringify({ code: ref, capturedAt: Date.now() }));
      track('visit_source', { source: source, ref: ref, page: 'blog', returning: !fresh });
    } catch (e) { /* never break the page */ }
  }


  // ── Settings from Admin → Ads (so no redeploy is needed) ──────────────────
  function applyRemote(c) {
    if (!c) return;
    var b = c.blog || {};
    REMOTE.show = !!(c.master && b.enabled);
    REMOTE.house = b.house !== false;
    REMOTE.slots = b.slots || {};
    AS.enabled = REMOTE.show;
    var u = c.units || {};
    if (u.native && u.native.enabled && u.native.src) UNITS.native = { src: u.native.src, containerId: u.native.containerId }; else UNITS.native = {};
    if (u.socialBar && u.socialBar.enabled && u.socialBar.src && b.socialBar) UNITS.socialBar = { src: u.socialBar.src }; else UNITS.socialBar = {};
    CFG.consentRequired = false;
    AS.units = UNITS;
  }
  function loadRemote(done) {
    var finished = false;
    function fin() { if (!finished) { finished = true; done(); } }
    var timer = setTimeout(fin, 2200);
    try {
      fetch('/api/site/config').then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
        if (j && j.success && j.ads) applyRemote(j.ads);
        clearTimeout(timer); fin();
      }).catch(function () { clearTimeout(timer); fin(); });
    } catch (e) { clearTimeout(timer); fin(); }
  }


  // ── Admin-uploaded cover images replace the generated ones ────────────────
  function applyCovers() {
    try {
      fetch('/api/site/blog-covers').then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
        if (!j || !j.covers) return;
        var imgs = document.querySelectorAll('img[data-cover-for]');
        for (var i = 0; i < imgs.length; i++) { var u = j.covers[imgs[i].getAttribute('data-cover-for')]; if (u) imgs[i].src = u; }
      }).catch(function () {});
    } catch (e) { /* cosmetic only */ }
  }
  // ── Shop items the admin chose to show on the blog ────────────────────────
  function applyShop() {
    var slot = document.getElementById('es-shop-slot');
    if (!slot) return;
    try {
      fetch('/api/site/shop?where=blog').then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
        if (!j || !j.items || !j.items.length) return;
        var wrap = el('section', 'es-shop'); wrap.appendChild(el('h3', '', 'Study materials from the EliteScholars shop'));
        var grid = el('div', 'es-shop-grid');
        j.items.slice(0, 4).forEach(function (it) {
          var a = el('a', 'es-shop-card'); a.href = '/app?src=blog-shop'; a.addEventListener('click', function () { try { sessionStorage.setItem('es_open_shop', '1'); } catch (e) {} });
          var src = it.imageUrl || (it.image ? '/shop/' + it.image : '');
          if (src) { var im = document.createElement('img'); im.src = src; im.alt = ''; im.loading = 'lazy'; a.appendChild(im); }
          var d = el('div'); d.appendChild(el('b', '', String(it.title || '').replace(/^[^A-Za-z0-9]+/, ''))); d.appendChild(el('span', '', it.price || '')); a.appendChild(d);
          grid.appendChild(a);
        });
        wrap.appendChild(grid); slot.appendChild(wrap);
        track('blog_shop_view', { items: j.items.length });
      }).catch(function () {});
    } catch (e) { /* optional block */ }
  }

  // ── Which Adsterra unit does a slot use? ──────────────────────────────────
  function bannerReady(name) { var u = UNITS[name]; return !!(u && u.key && u.src); }
  function nativeReady() { var u = UNITS.native; return !!(u && u.src && u.containerId); }
  function unitFor(slot) {
    var wide = window.innerWidth >= 768, pick = null;
    switch (slot) {
      case 'top': pick = wide ? ['leaderboard728x90', 728, 90] : ['mobile320x50', 320, 50]; break;
      case 'inline-1': case 'end': case 'side-1': pick = ['rect300x250', 300, 250]; break;
      case 'side-4': pick = [bannerReady('rect300x250b') ? 'rect300x250b' : 'rect300x250', 300, 250]; break;
      case 'inline-3': case 'feed': return ['native', 0, 0];
      default: return null; // inline-2, side-2, side-3 → always our own ads
    }
    // No banner unit set up? Use the native unit instead (never at the very top, so the title stays clear).
    if (!bannerReady(pick[0]) && nativeReady() && slot !== 'top') return ['native', 0, 0];
    return pick;
  }
  function slotGroup(slot) {
    if (slot === 'top') return 'top';
    if (/^inline/.test(slot)) return 'inline';
    if (slot === 'end') return 'end';
    if (/^side/.test(slot)) return 'sidebar';
    if (slot === 'feed') return 'feed';
    return 'inline';
  }

  // ── Our own ads ──────────────────────────────────────────────────────────
  function houseFor(slot, want) {
    if (!HOUSE.length) return null;
    if (want) { for (var i = 0; i < HOUSE.length; i++) if (HOUSE[i].id === want) return HOUSE[i]; }
    var ad = HOUSE[houseIdx % HOUSE.length]; houseIdx++; return ad;
  }
  function withUtm(link, slot) {
    if (/[?&]utm_source=/.test(link) || link.indexOf('elitescholars.site') === -1) return link;
    return link + (link.indexOf('?') === -1 ? '?' : '&') + 'utm_source=blog&utm_medium=house_ad&utm_campaign=' + encodeURIComponent(slot);
  }
  function renderHouse(box, slot, want) {
    var ad = houseFor(slot, want);
    box.innerHTML = '';
    if (!ad) { box.style.display = 'none'; return; }
    var label = el('p', 'es-ad-label', ad.tag || 'Sponsored');
    var a = el('a', 'es-house');
    a.href = withUtm(ad.link, slot);
    a.target = '_blank';
    a.rel = (/elitescholars\.site/.test(ad.link) ? 'noopener' : 'sponsored nofollow noopener');
    a.appendChild(el('span', 'es-house-icon', ad.icon || '★'));
    var body = el('span', 'es-house-body');
    body.appendChild(el('b', 'es-house-title', ad.title));
    if (ad.desc) body.appendChild(el('span', 'es-house-desc', ad.desc));
    a.appendChild(body);
    a.appendChild(el('span', 'es-house-cta', (ad.cta || 'Learn more') + ' →'));
    a.addEventListener('click', function () { track('blog_ad_click', { ad: ad.id, slot: slot, kind: 'house' }); });
    box.appendChild(label); box.appendChild(a);
    box.setAttribute('data-kind', 'house');
  }

  // ── Adsterra units ───────────────────────────────────────────────────────
  function renderBanner(box, slot, name, w, h) {
    var u = UNITS[name];
    if (!u || !u.key || !u.src) return false;
    var label = el('p', 'es-ad-label', 'Advertisement');
    var frame = document.createElement('iframe');
    frame.width = w; frame.height = h; frame.setAttribute('scrolling', 'no'); frame.setAttribute('frameborder', '0');
    frame.setAttribute('title', 'Advertisement'); frame.setAttribute('loading', 'lazy');
    frame.className = 'es-ad-frame';
    frame.style.maxWidth = '100%';
    // Each banner lives in its own iframe so several can share a page without
    // fighting over Adsterra's global "atOptions" variable.
    frame.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><base target="_blank"></head><body style="margin:0;background:transparent">' +
      '<script>atOptions={"key":"' + String(u.key).replace(/[^A-Za-z0-9]/g, '') + '","format":"iframe","height":' + h + ',"width":' + w + ',"params":{}};<\/script>' +
      '<script src="' + absUrl(u.src).replace(/"/g, '') + '"><\/script></body></html>';
    box.innerHTML = '';
    box.appendChild(label); box.appendChild(frame);
    box.style.minHeight = (h + 28) + 'px';
    box.setAttribute('data-kind', 'adsterra');
    track('blog_ad_view', { slot: slot, kind: 'adsterra', unit: name });
    return true;
  }
  function renderNative(box, slot) {
    var u = UNITS.native;
    if (!u || !u.src || !u.containerId) return false;
    var cid = String(u.containerId).replace(/[^A-Za-z0-9_-]/g, '');
    var label = el('p', 'es-ad-label', 'Advertisement');
    // Its own little page, so the same container id can be used in several spots.
    var frame = document.createElement('iframe');
    frame.setAttribute('title', 'Advertisement'); frame.setAttribute('scrolling', 'no'); frame.setAttribute('frameborder', '0');
    frame.className = 'es-ad-frame'; frame.style.width = '100%'; frame.style.height = '160px';
    frame.srcdoc = '<!doctype html><html><head><meta charset="utf-8"><base target="_blank"><style>html,body{margin:0;background:transparent;font-family:system-ui,sans-serif}</style></head><body>' +
      '<script async="async" data-cfasync="false" src="' + absUrl(u.src).replace(/"/g, '') + '"><\/script><div id="' + cid + '"></div></body></html>';
    box.innerHTML = ''; box.appendChild(label); box.appendChild(frame);
    box.style.minHeight = '120px';
    box.setAttribute('data-kind', 'adsterra');
    var n = 0, t = setInterval(function () {
      n++;
      try { var d = frame.contentDocument, c = d && d.getElementById(cid); if (c && c.scrollHeight > 40) frame.style.height = Math.min(420, Math.max(120, c.scrollHeight + 8)) + 'px'; } catch (e) { /* keep default */ }
      if (n > 24) clearInterval(t);
    }, 500);
    track('blog_ad_view', { slot: slot, kind: 'adsterra', unit: 'native' });
    return true;
  }

  function fillSlot(box) {
    var slot = box.getAttribute('data-slot') || 'x';
    var want = box.getAttribute('data-house') || '';
    // Admin → Ads can switch ads off for the whole blog or for one kind of spot.
    if (!REMOTE.show || REMOTE.slots[slotGroup(slot)] === false) { box.style.display = 'none'; box.setAttribute('data-filled', '1'); return; }
    var ok = false;
    if (thirdPartyAllowed()) {
      var u = unitFor(slot);
      if (u) ok = u[0] === 'native' ? renderNative(box, slot) : renderBanner(box, slot, u[0], u[1], u[2]);
    }
    if (!ok) {
      if (REMOTE.house === false) { box.style.display = 'none'; } else renderHouse(box, slot, want);
    }
    box.setAttribute('data-filled', '1');
  }

  var io = null;
  function observeSlots() {
    var boxes = document.querySelectorAll('.es-ad[data-slot]');
    var i;
    if (!('IntersectionObserver' in window)) { for (i = 0; i < boxes.length; i++) fillSlot(boxes[i]); return; }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { io.unobserve(en.target); fillSlot(en.target); }
        });
      }, { rootMargin: '350px 0px' });
    }
    for (i = 0; i < boxes.length; i++) { boxes[i].removeAttribute('data-filled'); io.observe(boxes[i]); }
  }

  // ── Page-level units (only after consent) ─────────────────────────────────
  function pageLevel() {
    if (!thirdPartyAllowed()) return;
    var sb = UNITS.socialBar;
    if (!socialDone && sb && sb.src) {
      socialDone = true;
      var s = document.createElement('script'); s.async = true; s.src = absUrl(sb.src); document.body.appendChild(s);
    }
    var pop = UNITS.popunder;
    if (!popDone && pop && pop.enabled && pop.src) {
      popDone = true;
      var last = parseInt(store('es_pop_ts') || '0', 10), gap = (pop.everyHours || 24) * 3600000;
      if (!last || Date.now() - last > gap) {
        store('es_pop_ts', String(Date.now()));
        var p = document.createElement('script'); p.async = true; p.src = absUrl(pop.src); document.body.appendChild(p);
      }
    }
    var m = UNITS.mobile320x50;
    if (!stickyDone && CFG.mobileStickyBar !== false && window.innerWidth < 768 && m && m.key && m.src && !store('es_sticky_closed_' + new Date().toDateString())) {
      stickyDone = true;
      var bar = el('div', 'es-sticky');
      var close = el('button', 'es-sticky-x', '×'); close.setAttribute('aria-label', 'Close ad');
      close.addEventListener('click', function () { store('es_sticky_closed_' + new Date().toDateString(), '1'); bar.parentNode && bar.parentNode.removeChild(bar); document.body.classList.remove('es-has-sticky'); });
      var holder = el('div', 'es-sticky-slot');
      bar.appendChild(el('span', 'es-sticky-lbl', 'Advertisement')); bar.appendChild(close); bar.appendChild(holder);
      document.body.appendChild(bar); document.body.classList.add('es-has-sticky');
      renderBanner(holder, 'sticky-mobile', 'mobile320x50', 320, 50);
    }
  }

  // ── Consent banner ───────────────────────────────────────────────────────
  function closeBanner() { var b = document.getElementById('es-consent'); if (b && b.parentNode) b.parentNode.removeChild(b); }
  function choose(v) {
    store(CONSENT_KEY, v); closeBanner();
    track('blog_consent', { choice: v });
    observeSlots(); pageLevel();
    if (CFG.consentRequired !== false) {
      var fl = document.querySelector('.blog-footer-links');
      if (fl) { var a = document.createElement('a'); a.href = '#'; a.setAttribute('data-es-consent-open', ''); a.textContent = 'Cookie & ad settings'; fl.appendChild(a); }
    }
  }
  function showBanner() {
    if (document.getElementById('es-consent')) return;
    var b = el('div', 'es-consent'); b.id = 'es-consent'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Cookie and ads choices');
    var t = el('p', 'es-consent-text');
    t.innerHTML = 'We show ads to keep EliteScholars free. With <b>Accept all</b>, our ad partner (Adsterra) may use cookies and device data to show ads. With <b>Essential only</b> you only see our own promotions. By accepting you confirm you are 18+ or have a parent or guardian\'s permission. <a href="/app/privacy#ads">Learn more</a>';
    var row = el('div', 'es-consent-row');
    var no = el('button', 'es-consent-btn ghost', 'Essential only'); no.addEventListener('click', function () { choose('essential'); });
    var yes = el('button', 'es-consent-btn', 'Accept all'); yes.addEventListener('click', function () { choose('all'); });
    row.appendChild(no); row.appendChild(yes); b.appendChild(t); b.appendChild(row);
    document.body.appendChild(b);
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    while (t && t !== document) { if (t.getAttribute && t.getAttribute('data-es-consent-open') !== null) { e.preventDefault(); showBanner(); return; } t = t.parentNode; }
  });

  function start() {
    sourceTrack(); applyCovers(); applyShop();
    loadRemote(boot);
  }
  function boot() {
    observeSlots(); pageLevel();
    if (CFG.consentRequired !== false) {
      var fl = document.querySelector('.blog-footer-links');
      if (fl) { var a = document.createElement('a'); a.href = '#'; a.setAttribute('data-es-consent-open', ''); a.textContent = 'Cookie & ad settings'; fl.appendChild(a); }
    }
    var needBanner = AS.enabled && CFG.consentRequired !== false && !consent();
    if (needBanner) setTimeout(showBanner, 800);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
