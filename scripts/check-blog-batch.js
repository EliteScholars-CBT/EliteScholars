// Usage: node scripts/check-blog-batch.js content/blog/<file>.js
// Validates a batch of posts WITHOUT writing anything to public/.
const fs = require('fs'), path = require('path'), vm = require('vm');
const Fig = require('./blog-figures.js');
const file = process.argv[2];
if (!file) { console.error('usage: node scripts/check-blog-batch.js content/blog/<file>.js'); process.exit(2); }
const ctx = { console, Date }; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext('const BLOG_POSTS = [];', ctx);
let err = 0;
try { vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file }); } catch (e) { console.error('SYNTAX/RUNTIME ERROR:', e.message); process.exit(1); }
const posts = vm.runInContext('BLOG_POSTS', ctx);
const CATS = ['jamb', 'waec', 'neco', 'study-tips', 'gst', 'lessons'];
const ids = new Set();
for (const p of posts) {
  const bad = (m) => { err++; console.error(`✗ ${p.id}: ${m}`); };
  for (const k of ['id', 'title', 'category', 'categoryLabel', 'author', 'authorAvatar', 'publishAt', 'readTime', 'tags', 'excerpt', 'seo', 'content', 'faq']) if (p[k] == null || p[k] === '') bad(`missing ${k}`);
  if (!/^[a-z0-9-]+$/.test(p.id || '')) bad('id must be lowercase-kebab');
  if (ids.has(p.id)) bad('duplicate id in file'); ids.add(p.id);
  if (!CATS.includes(p.category)) bad(`category must be one of ${CATS.join(', ')}`);
  if (isNaN(new Date(p.publishAt))) bad('publishAt invalid');
  if (p.seo && (!p.seo.title || p.seo.title.length > 70)) bad('seo.title missing or > 70 chars');
  if (p.seo && (!p.seo.description || p.seo.description.length > 165)) bad('seo.description missing or > 165 chars');
  if (!Array.isArray(p.faq) || p.faq.length < 3) bad('need 3-6 faq items');
  let html = '';
  try { html = Fig.addToc(Fig.expandShortcodes(p.content || '', p.category)); } catch (e) { bad(e.message); }
  const words = String(p.content || '').replace(/\[\[[\s\S]*?\]\]/g, (m) => m.replace(/\[\[\w+/, '')).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const h2 = (String(p.content).match(/<h2>/g) || []).length;
  const sc = (String(p.content).match(/\[\[\w+ /g) || []).length;
  if (words < 950) bad(`only ${words} words (need 1000-1800)`);
  if (words > 2300) bad(`${words} words is too long`);
  if (h2 < 4) bad(`only ${h2} <h2> sections (need 4-8)`);
  if (sc < 3) bad(`only ${sc} illustration shortcodes (need 3-6)`);
  if (!/\[\[qa /.test(p.content) && ['jamb', 'waec', 'neco', 'lessons'].includes(p.category)) bad('exam/lesson posts need at least one [[qa ...]] worked example');
  if (/post-?utme/i.test(p.content + p.title + (p.excerpt || ''))) bad('do not mention Post-UTME');
  if (/<h1/i.test(p.content)) bad('no <h1> in content');
  if (/\$\{|`/.test(p.content.replace(/^\s+|\s+$/g, '')) ) bad('stray backtick or ${ in content');
  const rt = Math.round(words / 220);
  if (Math.abs(rt - p.readTime) > 3) console.warn(`~ ${p.id}: readTime ${p.readTime} but ~${rt} min`);
  console.log(`${err ? '' : '✓'} ${p.id}: ${words} words, ${h2} sections, ${sc} figures, ${p.faq ? p.faq.length : 0} FAQs`);
}
if (err) { console.error(`\n${err} problem(s).`); process.exit(1); }
console.log(`\nOK: ${posts.length} post(s).`);
