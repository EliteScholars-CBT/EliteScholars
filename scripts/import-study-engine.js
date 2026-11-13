#!/usr/bin/env node
// Import (or update) the Study Engine page.
//   node scripts/import-study-engine.js path/to/study-engine.html
// Takes the standalone Study Engine HTML, removes the temporary test section, applies the EliteScholars theme and
// top bar, and writes public/study-engine/index.html (served at /study-engine). Run it again for every new upload:
// the engine itself is never edited here, only wrapped, so new versions drop straight in.
const fs = require('fs');
const path = require('path');

const src = process.argv[2];
if (!src || !fs.existsSync(src)) { console.error('Usage: node scripts/import-study-engine.js <study-engine.html>'); process.exit(1); }
let html = fs.readFileSync(src, 'utf8');
const origBytes = Buffer.byteLength(html);

// 1. The temporary "test comparison" block (auto-runs a challenge paper) is for development only.
const t0 = html.indexOf('<section id="testCompare"');
let removedTest = false;
if (t0 > -1) { const t1 = html.lastIndexOf('</body>'); html = html.slice(0, t0) + (t1 > -1 ? html.slice(t1) : '</body></html>'); removedTest = true; }

// 2. Title and head tags
html = html.replace(/<title>[^<]*<\/title>/, '<title>Study Engine · EliteScholars</title>');
html = html.replace(/<meta name="claude:viewport-fit-sides"[^>]*>\s*/g, '');
const HEAD = `
<meta name="robots" content="noindex">
<meta name="theme-color" content="#6D28D9">
<link rel="icon" href="/favicon-32x32.png">
<style id="es-theme">
/* EliteScholars theme: only colours and the top bar. The engine's own layout is untouched. */
:root{--bg:#f6f3ff;--accent:#6d28d9;--accent-ink:#ffffff;--accent-soft:#ede9fe;--line:#e0d8f5}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#120a2e;--panel:#1c1245;--line:#33266b;--accent:#a78bfa;--accent-ink:#1b0a47;--accent-soft:#2b1f63}}
:root[data-theme="dark"]{--bg:#120a2e;--panel:#1c1245;--line:#33266b;--accent:#a78bfa;--accent-ink:#1b0a47;--accent-soft:#2b1f63}
#esbar{position:sticky;top:0;z-index:50;margin:-20px calc(-1 * max(16px,env(safe-area-inset-left,0px))) 14px;padding:10px max(16px,env(safe-area-inset-left,0px));display:flex;align-items:center;gap:10px;background:var(--panel);border-bottom:1px solid var(--line)}
#esbar a{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--ink);font-weight:600}
#esbar img{width:28px;height:28px;border-radius:7px}
#esbar .esback{margin-left:auto;padding:7px 12px;border-radius:8px;background:var(--accent);color:var(--accent-ink);font-weight:700;font-size:14px}
</style>`;
// The source page has no explicit </head> or <body> tag, so anchor on the end of its main <style> block instead.
if (html.includes('</head>')) html = html.replace('</head>', HEAD + '\n</head>'); else html = html.replace('</style>', '</style>' + HEAD);

// 3. Top bar with a way back to the app
const BAR = `
<div id="esbar"><a href="/app" aria-label="EliteScholars"><img src="/android-chrome-192x192.png" alt="">EliteScholars</a><a class="esback" href="/app" onclick="if(history.length>1&&document.referrer.indexOf(location.origin)===0){history.back();return false}">← Back to app</a></div>`;
if (/<body[^>]*>/.test(html)) html = html.replace(/<body([^>]*)>/, (m) => m + BAR); else html = html.replace('<div class="wrap">', BAR + '\n<div class="wrap">');

const out = path.join(__dirname, '..', 'public', 'study-engine');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'index.html'), html);
fs.writeFileSync(path.join(out, 'version.json'), JSON.stringify({ importedAt: new Date().toISOString(), sourceBytes: origBytes, outputBytes: Buffer.byteLength(html), removedTestSection: removedTest }, null, 2));
console.log(`Wrote public/study-engine/index.html (${(Buffer.byteLength(html) / 1048576).toFixed(2)} MB)${removedTest ? ', removed the temporary test section' : ''}.`);
