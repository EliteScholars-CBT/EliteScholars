// Runs after `react-scripts build` (npm "postbuild"). Makes the finished site load faster on weak connections
// without changing what it does:
//   1. the Google Fonts @import is taken out of the CSS (it blocked the whole stylesheet until the font file list
//      arrived) and the font is requested from index.html instead, in the background, with the system font showing first
//   2. a small loading screen is put inside index.html so something appears the moment the page arrives
//   3. the offline downloader in the service worker waits a few seconds, downloads fewer files at once, and only
//      saves the basic pages on 2G / data-saver connections (the rest is still saved as it is used)
// Every step is skipped quietly if its target text is not found.
const fs = require('fs');
const path = require('path');
const BUILD = path.join(__dirname, '..', 'build');
const rd = (p) => fs.readFileSync(p, 'utf8');
const note = (m) => console.log('[optimize-build] ' + m);

const FONT = 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500&display=swap';

// 1. fonts out of the CSS
const cssDir = path.join(BUILD, 'static', 'css');
let stripped = 0;
if (fs.existsSync(cssDir)) {
  fs.readdirSync(cssDir).filter((f) => f.endsWith('.css')).forEach((f) => {
    const p = path.join(cssDir, f), css = rd(p);
    const out = css.replace(/@import\s+url\(\s*["']?https:\/\/fonts\.googleapis\.com[^)]*\)\s*;?/g, '');
    if (out !== css) { fs.writeFileSync(p, out); stripped++; }
  });
}
note(`font @import removed from ${stripped} stylesheet(s)`);

// 2. index.html: background font + instant loading screen
const idx = path.join(BUILD, 'index.html');
if (fs.existsSync(idx)) {
  let h = rd(idx);
  if (!h.includes('es-font')) {
    const link = `<link id="es-font" rel="stylesheet" href="${FONT}" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="${FONT}"></noscript>`;
    h = h.replace('</head>', `${link}<style>body{margin:0;font-family:Poppins,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}#es-boot{min-height:100vh;display:grid;place-items:center;background:linear-gradient(160deg,#1B0A47,#7C3AED,#1B0A47)}#es-boot i{width:44px;height:44px;border-radius:50%;border:4px solid rgba(255,255,255,.25);border-top-color:#fff;animation:esb .8s linear infinite}@keyframes esb{to{transform:rotate(360deg)}}</style></head>`);
  }
  if (!h.includes('id="es-boot"')) h = h.replace('<div id="root"></div>', '<div id="root"><div id="es-boot" role="status" aria-label="Loading"><i></i></div></div>');
  fs.writeFileSync(idx, h);
  note('index.html updated');
}

// 3. service worker: gentler offline download
const swp = path.join(BUILD, 'sw.js');
if (fs.existsSync(swp)) {
  let s = rd(swp), n = 0;
  const swap = (a, b) => { if (s.includes(a)) { s = s.split(a).join(b); n++; } else note('service worker text not found: ' + a.slice(0, 40)); };
  swap('async function precacheApp() {', 'async function precacheApp() {\n  await new Promise((r) => setTimeout(r, 4000)); // let the page that is open finish loading first');
  swap('const todo = [...urls].filter(', "const _cn = self.navigator && self.navigator.connection;\n  const _slow = !!(_cn && (_cn.saveData || /(^|-)2g/.test(_cn.effectiveType || '')));\n  const todo = [...urls].filter((u) => !_slow || SHELL.includes(u)).filter(");
  swap('i += 6) {', 'i += 3) {');
  swap('todo.slice(i, i + 6)', 'todo.slice(i, i + 3)');
  fs.writeFileSync(swp, s);
  note(`service worker: ${n}/4 changes applied`);
}
