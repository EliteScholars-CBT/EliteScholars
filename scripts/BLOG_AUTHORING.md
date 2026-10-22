# Writing blog posts (EliteScholars)

Posts live in `public/blog/posts.js` (or the batch files in `public/blog/posts/`, merged by the build).
Every post is an object:

```js
{
  id: "kebab-case-slug",            // URL: /blog/<category>/<id>.html — never change once live
  title: "…",                        // what people would type into Google (question or clear promise)
  category: "jamb",                  // jamb | waec | neco | study-tips | gst | lessons
  categoryLabel: "JAMB",
  author: "Michael Joseph", authorAvatar: "avatar_1",
  publishAt: "2026-11-05T06:00:00+01:00",
  updatedAt: "2026-10-21T08:00:00+01:00",   // optional
  readTime: 9,                       // minutes (about 220 words per minute)
  scene: "book",                     // optional cover picture: book calculator flask brain clock chart trophy phone pencil school coin globe chat
  tags: ["…"],
  excerpt: "1–2 sentence hook (also the meta description fallback)",
  seo: { title: "≤ 60 chars", description: "≤ 155 chars", keywords: "a, b, c" },
  faq: [ { q: "A real question people search", a: "A direct 1–3 sentence answer." } ],   // 3–6 items; becomes FAQ rich results
  content: `…HTML…`
}
```

## Body HTML
Use `<h2>` for sections (4–8 of them), `<h3>` for sub-points, `<p>`, `<ul>/<ol>`, `<strong>`, `<em>`, `<table>`.
A table of contents is added automatically. Never use `<h1>`.

## Illustration shortcodes (put each on its own line, wrapped in nothing)
Arguments are separated by `|`; list items by `;`; "label::text" pairs inside lists use `::`.
Allowed inline tags inside arguments: `<b> <i> <em> <strong> <sub> <sup> <code>`. Never put `|`, `;` or `]]` inside text.

```
[[callout tip|Short title|One or two sentences.]]            types: tip, warn, key, note, fact
[[qa The question text|Step one ; Step two ; Step three|Final answer]]      a solved example
[[flow Read the question ; Eliminate ; Choose ; Review]]      a process with arrows
[[compare Common mistake|Better way|bad 1 ; bad 2|good 1 ; good 2]]
[[timeline Week 1::Do this ; Week 2::Do that]]
[[steps Step title::detail ; Step title::detail]]             numbered list with detail
[[bars Title|Maths=70 ; English=55 ; Biology=40|%]]           simple bar chart (unit optional)
[[formula Name|v = u + at|What each letter means]]
[[stats 2.2M::candidates wrote UTME ; 150::minimum mark]]     only for facts you are certain of
[[checklist Item one ; Item two ; Item three]]
[[scene brain|Optional caption]]                              flat illustration
```
Use 3–6 shortcodes per post, spread through it. At least one worked example (`qa`) in every lesson/exam post.

## Quality rules
- 1,000–1,800 words. Teach something specific; include a worked example with real numbers or a real exam-style question solved step by step.
- Evergreen: do not state dates, fees, cut-off marks or statistics unless you are certain; say "check the official JAMB/WAEC/NECO portal for the current figure".
- Do NOT promote or mention Post-UTME preparation as something EliteScholars offers.
- Write for a Nigerian SS3 student or university fresher: plain English, short paragraphs, no fluff, no repeated filler openings.
- Finish with a short "What to do today" action list (use `[[checklist …]]`).
- Never invent quotes, studies or numbers.
