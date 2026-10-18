// Appends posts from scripts/blog-queue/*.js into public/blog/posts.js (idempotent by id).
const fs = require('fs'), path = require('path');
const file = path.join(__dirname, '..', 'public', 'blog', 'posts.js');
const LABEL = { jamb: 'JAMB', 'study-tips': 'Study Tips', waec: 'WAEC', gst: 'GST', postutme: 'Post UTME' };
let src = fs.readFileSync(file, 'utf8');
const have = new Set([...src.matchAll(/^\s{4}id: "([^"]+)"/gm)].map(m => m[1]));
const esc = s => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const q = s => JSON.stringify(s);
let out = '', n = 0, i = 0;
for (const f of fs.readdirSync(path.join(__dirname, 'blog-queue')).sort()) {
  for (const [id, cat, md, title, excerpt, tags, secs] of require('./blog-queue/' + f)) {
    i++;
    if (have.has(id)) continue;
    if (!/^[a-z0-9-]+$/.test(id)) throw new Error('bad id ' + id);
    if (!LABEL[cat]) throw new Error('bad cat ' + cat);
    const html = secs.map(([h, body]) => `<h2>${h}</h2>\n` + body.split('|').map(p => `<p>${p}</p>`).join('\n\n')).join('\n\n');
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const tagArr = tags.split(',');
    out += `,\n  {
    id: ${q(id)},
    title: ${q(title)},
    category: ${q(cat)},
    categoryLabel: ${q(LABEL[cat])},
    author: "Michael Joseph",
    authorAvatar: "avatar_${(i % 3) + 1}",
    publishAt: "2026-${md}T06:00:00+01:00",
    readTime: ${Math.max(2, Math.round(words / 200))},
    tags: ${JSON.stringify(tagArr)},
    excerpt: ${q(excerpt)},
    seo: {
      title: ${q(title.length > 60 ? title.slice(0, 57) + '...' : title)},
      description: ${q(excerpt.length > 158 ? excerpt.slice(0, 155) + '...' : excerpt)},
      keywords: ${q(tagArr.join(', '))}
    },
    content: \`
${esc(html)}
    \`
  }`;
    n++;
  }
}
if (!n) { console.log('nothing to add'); process.exit(0); }
src = src.replace(/\n\];\s*$/, out + '\n];\n');
fs.writeFileSync(file, src);
console.log('added', n);
