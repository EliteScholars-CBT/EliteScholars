#!/usr/bin/env node
/* scripts/build-blog.js
 *
 * Turns public/blog/posts.js (the single place you write posts) into real,
 * crawlable HTML so Google sees the article text without running any
 * JavaScript:
 *   - public/blog/<category>/<id>.html   one page per LIVE post (publishAt <= now)
 *   - public/blog/index.html             post list with real links
 *   - public/sitemap.xml, public/robots.txt
 *
 * Runs automatically before every build (npm run build). Posts dated in the
 * future are NOT published or listed until a build happens on/after their date
 * (the daily cron triggers that rebuild; see api/cron).
 *
 * Page markup is produced by the SAME renderer the blog already used
 * (_render-post.js / _blog-render.js), run here instead of in the browser.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const Fig = require('./blog-figures.js');

const ROOT = path.join(__dirname, '..');
const BLOG = path.join(ROOT, 'public', 'blog');
const SITE = process.env.SITE_URL || 'https://elitescholars.site';
const NOW = process.env.BLOG_NOW ? new Date(process.env.BLOG_NOW) : new Date();

const read = (f) => fs.readFileSync(path.join(BLOG, f), 'utf8');
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ── Load posts + engine in a sandbox ─────────────────────────────────────────
function sandbox(extra) {
  const ctx = { console, Date, ...extra };
  ctx.window = ctx;
  vm.createContext(ctx);
  return ctx;
}
const base = sandbox({});
vm.runInContext(read('posts.js') + '\n;this.BLOG_POSTS = BLOG_POSTS;', base);
// Extra posts and rewrites live in content/blog/*.js as  BLOG_POSTS.push({...}, {...});
// A post with the same id as an earlier one REPLACES it (this is how old posts get expanded).
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
if (fs.existsSync(CONTENT_DIR)) {
  for (const f of fs.readdirSync(CONTENT_DIR).filter((x) => x.endsWith('.js')).sort()) {
    try { vm.runInContext(fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8'), base, { filename: f }); }
    catch (e) { throw new Error(`content/blog/${f}: ${e.message}`); }
  }
  const byId = new Map();
  for (const p of base.BLOG_POSTS) byId.set(p.id, p); // later wins
  base.BLOG_POSTS.splice(0, base.BLOG_POSTS.length, ...byId.values());
}
vm.runInContext(read('_blog-engine.js'), base);
const POSTS = base.BLOG_POSTS;
const Engine = base.BlogEngine;
Engine.isLive = (p) => new Date(p.publishAt) <= NOW; // honour the build clock

const live = POSTS.filter(Engine.isLive).sort((a, b) => new Date(b.publishAt) - new Date(a.publishAt));
// Turn shortcodes into designed illustrations, add a table of contents and the FAQ block.
for (const p of POSTS) {
  if (typeof p.content !== 'string') continue;
  try { p.content = Fig.addToc(Fig.expandShortcodes(p.content, p.category)); } catch (e) { throw new Error(`Post ${p.id}: ${e.message}`); }
  p.faqHtml = Fig.faqHtml(p.faq);
  p.coverUrl = `covers/${p.id}.svg`;
}
const seen = new Set();
for (const p of POSTS) {
  if (!p.id || !p.category || !p.content) throw new Error(`Post missing id/category/content: ${p.id}`);
  if (seen.has(p.id)) throw new Error(`Duplicate post id: ${p.id}`);
  seen.add(p.id);
  if (!/^[a-z0-9-]+$/.test(p.id)) throw new Error(`Bad post id (use lowercase letters, numbers, hyphens): ${p.id}`);
}

const postUrl = (p) => `${SITE}/blog/${p.category}/${p.id}.html`;

// ── Render a post body with the existing browser renderer ────────────────────
function renderPostBody(post) {
  const root = { innerHTML: '' };
  const ctx = sandbox({
    BLOG_POSTS: live, BlogEngine: Engine,
    location: { pathname: `/blog/${post.category}/${post.id}.html`, href: postUrl(post) },
    document: { getElementById: () => root },
  });
  ctx.window.location = ctx.location;
  vm.runInContext(read('_render-post.js'), ctx);
  return root.innerHTML;
}

const topbar = (up) => `<nav class="blog-topbar">
  <a href="${up}../" class="blog-topbar-logo">
    <img src="${up}elite-scholars-logo.png" alt="EliteScholars" width="32" height="32" style="border-radius:50%;object-fit:cover;border:2px solid rgba(255, 197, 61,0.5);" />
    EliteScholars
  </a>
  <div class="blog-topbar-nav">
    <a href="${up}../">App</a>
    <a href="${up}index.html">Blog</a>
    <a href="${up}../" class="blog-topbar-cta">Practice Free →</a>
  </div>
</nav>`;

const footer = (up) => `<footer class="blog-footer">
  <div class="blog-footer-links">
    <a href="${up}../">Home</a>
    <a href="${up}index.html">Blog</a>
    <a href="/app/privacy">Privacy</a>
    <a href="/app/terms">Terms</a>
    <a href="/app/privacy#ads">Advertising policy</a>
  </div>
  <div>© ${NOW.getFullYear()} EliteScholars. Free exam prep for every Nigerian student.</div>
</footer>`;

const pageScript = `<script>
(function(){
  var bar=document.getElementById('blog-progress-bar'), btn=document.getElementById('back-top');
  window.addEventListener('scroll',function(){
    var el=document.documentElement, max=el.scrollHeight-el.clientHeight;
    if(bar&&max>0) bar.style.width=Math.min((el.scrollTop/max)*100,100)+'%';
    if(btn){ if(el.scrollTop>400) btn.classList.add('visible'); else btn.classList.remove('visible'); }
  },{passive:true});
})();
</script>`;

function postPage(post) {
  const seo = post.seo || {};
  const title = seo.title || post.title;
  const desc = seo.description || post.excerpt;
  const url = postUrl(post);
  const body = renderPostBody(post);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: desc,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'EliteScholars', url: SITE, logo: { '@type': 'ImageObject', url: `${SITE}/android-chrome-512x512.png` } },
    datePublished: new Date(post.publishAt).toISOString(),
    dateModified: new Date(post.updatedAt || post.publishAt).toISOString(),
    mainEntityOfPage: url,
    image: `${SITE}/android-chrome-512x512.png`,
    keywords: seo.keywords || (post.tags || []).join(', '),
  };
  const crumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'EliteScholars', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };
  const small = { id: post.id, title: post.title, category: post.category, author: post.author, readTime: post.readTime };
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)} | EliteScholars</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="keywords" content="${esc(seo.keywords || (post.tags || []).join(', '))}" />
  <meta name="author" content="${esc(post.author)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${url}" />
  <meta property="og:site_name" content="EliteScholars" />
  <meta property="og:image" content="${SITE}/android-chrome-512x512.png" />
  <meta property="article:published_time" content="${new Date(post.publishAt).toISOString()}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content="#7C3AED" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" href="../../favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../blog-style.css" />
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
  <script type="application/ld+json">${JSON.stringify(crumbs)}</script>
  ${Fig.faqLd(post.faq) ? `<script type="application/ld+json">${JSON.stringify(Fig.faqLd(post.faq))}</script>` : ''}
</head>
<body>
<div id="blog-progress-bar"></div>
${topbar('../')}
<div id="post-root">${body}</div>
<button class="blog-back-top" id="back-top" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑</button>
${footer('../')}
<script>window.__BLOG_POST=${JSON.stringify(small)};</script>
<script src="../_blog-analytics.js" defer></script>
<script src="../ads-config.js"></script>
<script src="../_blog-ads.js" defer></script>
${pageScript}
</body>
</html>
`;
}

const CARD_SVGS = {
  jamb: '<svg width="100%" height="100%" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#EDE9FE"/><rect x="40" y="32" width="180" height="16" rx="8" fill="#C4B5FD"/><rect x="40" y="58" width="140" height="10" rx="5" fill="#DDD6FE"/><rect x="40" y="76" width="160" height="10" rx="5" fill="#DDD6FE"/><rect x="40" y="94" width="120" height="10" rx="5" fill="#DDD6FE"/><circle cx="256" cy="130" r="32" fill="#8B5CF6"/><text x="256" y="138" text-anchor="middle" fill="#fff" font-size="22" font-weight="900" font-family="sans-serif">J</text></svg>',
  'study-tips': '<svg width="100%" height="100%" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#DBEAFE"/><rect x="80" y="20" width="160" height="140" rx="12" fill="#BFDBFE"/><rect x="100" y="40" width="120" height="10" rx="5" fill="#1D4ED8"/><rect x="100" y="58" width="90" height="8" rx="4" fill="#93C5FD"/><rect x="100" y="72" width="100" height="8" rx="4" fill="#93C5FD"/><rect x="100" y="86" width="80" height="8" rx="4" fill="#93C5FD"/><circle cx="228" cy="148" r="26" fill="#1D4ED8"/><text x="228" y="156" text-anchor="middle" fill="#fff" font-size="16" font-weight="900" font-family="sans-serif">✓</text></svg>',
};
const cardSvg = (cat) => {
  if (CARD_SVGS[cat]) return CARD_SVGS[cat];
  const c = Engine.getCategoryStyle(cat);
  return `<svg width="100%" height="100%" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="${c.bg}"/><rect x="40" y="32" width="180" height="16" rx="8" fill="${c.color}" opacity=".35"/><rect x="40" y="58" width="140" height="10" rx="5" fill="${c.color}" opacity=".2"/><rect x="40" y="76" width="160" height="10" rx="5" fill="${c.color}" opacity=".2"/><circle cx="256" cy="130" r="32" fill="${c.color}"/><text x="256" y="138" text-anchor="middle" fill="#fff" font-size="20" font-weight="900" font-family="sans-serif">${esc(c.label.slice(0, 1))}</text></svg>`;
};

function indexPage() {
  const cards = live.map((post) => {
    const cs = Engine.getCategoryStyle(post.category);
    return `<a href="${post.category}/${post.id}.html" class="blog-card">
<div class="blog-card-img"><img src="covers/${post.id}.svg" data-cover-for="${post.id}" alt="" width="1200" height="630" loading="lazy" decoding="async" /></div>
<div class="blog-card-body">
<span class="blog-card-cat" style="background:${cs.bg};color:${cs.color}">${esc(cs.label)}</span>
<h2 class="blog-card-title">${esc(post.title)}</h2>
<p class="blog-card-excerpt">${esc(post.excerpt)}</p>
<div class="blog-card-footer">
<div class="blog-card-author"><div class="blog-card-avatar">${Engine.getAvatar(post.authorAvatar)}</div><span class="blog-card-author-name">${esc(post.author)}</span></div>
<div class="blog-card-meta"><span>${Engine.formatDate(post.publishAt)}</span><span>${post.readTime} min</span></div>
</div></div></a>`;
  });
  // full-width in-feed ad slots after the 3rd and 9th card (never before content)
  const feedAd = (n, house) => `<div class="blog-feed-ad">${Engine.adSlot(n, house)}</div>`;
  if (cards.length > 3) cards.splice(3, 0, feedAd('feed', 'premium'));
  if (cards.length > 10) cards.splice(10, 0, feedAd('feed-2', 'whatsapp'));
  const cardsHtml = cards.join('\n') || '<div style="padding:60px 0;text-align:center;color:#9CA3AF;grid-column:1/-1;">No posts published yet. Check back soon!</div>';

  // Keep the existing sidebar/hero from the current index.html where possible.
  const side = `<div class="blog-index-sidebar-col">
    ${Engine.adSlot('side-1')}
    ${Engine.adSlot('side-2', 'premium')}
    ${Engine.adSlot('side-3', 'partner')}
    ${Engine.adSlot('side-4')}
  </div>
</div>
${footer('./')}`;
  const itemList = {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'EliteScholars Blog', url: `${SITE}/blog/`,
    hasPart: live.slice(0, 50).map((p) => ({ '@type': 'Article', headline: p.title, url: postUrl(p), datePublished: new Date(p.publishAt).toISOString() })),
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EliteScholars Blog: JAMB, WAEC, GST & Study Tips for Nigerian Students</title>
  <meta name="description" content="JAMB updates, WAEC and NECO strategies, university life and study tips for Nigerian students. New posts every day." />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${SITE}/blog/" />
  <meta property="og:title" content="EliteScholars Blog" />
  <meta property="og:description" content="JAMB updates, study strategies, university tips and real talk. No fluff." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${SITE}/blog/" />
  <meta property="og:image" content="${SITE}/android-chrome-512x512.png" />
  <meta name="theme-color" content="#7C3AED" />
  <link rel="icon" href="../favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="./blog-style.css" />
  <script type="application/ld+json">${JSON.stringify(itemList)}</script>
</head>
<body>
<div id="blog-progress-bar"></div>
<nav class="blog-topbar">
  <a href="../" class="blog-topbar-logo">
    <img src="elite-scholars-logo.png" alt="EliteScholars" width="32" height="32" style="border-radius:50%;object-fit:cover;border:2px solid rgba(255, 197, 61,0.5);" />
    EliteScholars
  </a>
  <div class="blog-topbar-nav">
    <a href="../">App</a>
    <a href="index.html">Blog</a>
    <a href="../" class="blog-topbar-cta">Practice Free →</a>
  </div>
</nav>
<div class="blog-index-hero">
  <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.5);margin-bottom:12px;">EliteScholars Blog</div>
  <h1 class="blog-index-title">Built for the Student Who Refuses to Fail</h1>
  <p class="blog-index-sub">JAMB updates, study strategies, university tips and real talk. No fluff.</p>
</div>
<div class="blog-index-main">
  <div class="blog-index-posts-col">
    <div class="blog-index-grid" id="blog-grid">
${cardsHtml}
    </div>
  </div>
  ${side}
<script src="./ads-config.js"></script>
<script src="./_blog-ads.js" defer></script>
${pageScript}
</body>
</html>
`;
}

// ── Write everything ─────────────────────────────────────────────────────────
// Clear previously generated post pages (category folders only), then rewrite.
const cats = new Set(POSTS.map((p) => p.category));
for (const c of cats) {
  const dir = path.join(BLOG, c);
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) if (f.endsWith('.html')) fs.unlinkSync(path.join(dir, f));
  fs.mkdirSync(dir, { recursive: true });
}
for (const p of live) fs.writeFileSync(path.join(BLOG, p.category, `${p.id}.html`), postPage(p));
fs.writeFileSync(path.join(BLOG, 'index.html'), indexPage());

// Cover images (designed SVGs). Rebuilt every time so they always match the post.
const COVERS = path.join(BLOG, 'covers');
fs.mkdirSync(COVERS, { recursive: true });
for (const f of fs.readdirSync(COVERS)) if (f.endsWith('.svg')) fs.unlinkSync(path.join(COVERS, f));
for (const p of POSTS) fs.writeFileSync(path.join(COVERS, `${p.id}.svg`), Fig.coverSvg(p));
// List for Admin → Blog (cover uploads): every post, live or scheduled.
fs.writeFileSync(path.join(BLOG, 'posts-index.json'), JSON.stringify(POSTS.map((p) => ({ id: p.id, title: p.title, category: p.category, publishAt: p.publishAt, live: Engine.isLive(p) }))));

// Small feed for the landing page's blog cards (latest 8).
fs.writeFileSync(path.join(BLOG, 'latest.json'), JSON.stringify(live.slice(0, 8).map((p) => ({
  id: p.id, title: p.title, excerpt: p.excerpt, category: p.category, readTime: p.readTime, cover: `/blog/covers/${p.id}.svg`, url: `/blog/${p.category}/${p.id}.html`,
}))));

const day = (d) => new Date(d).toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE}/`, lastmod: day(NOW), pr: '1.0' },
  { loc: `${SITE}/about`, lastmod: day(NOW), pr: '0.7' },
  { loc: `${SITE}/school`, lastmod: day(NOW), pr: '0.8' },
  { loc: `${SITE}/terms`, lastmod: day(NOW), pr: '0.3' },
  { loc: `${SITE}/privacy`, lastmod: day(NOW), pr: '0.3' },
  { loc: `${SITE}/blog/`, lastmod: live[0] ? day(live[0].publishAt) : day(NOW), pr: '0.9' },
  ...live.map((p) => ({ loc: postUrl(p), lastmod: day(p.updatedAt || p.publishAt), pr: '0.8' })),
];
fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.pr}</priority></url>`).join('\n') + `\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT, 'public', 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\nDisallow: /partner\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`[blog] ${live.length} live post(s), ${POSTS.length - live.length} scheduled. sitemap + robots written.`);
