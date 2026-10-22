# Brief for blog-writing agents (EliteScholars)

EliteScholars (elitescholars.site) is a free exam-prep app for Nigerian students (JAMB, WAEC, NECO, GST).
Repo: /home/claude/elitescholars/EliteScholars-master

You get an assignment file in `content/blog/_assign/` and an output file name. Write genuinely IN-DEPTH posts (1,000-1,800 words each).
REWRITE assignments: the post already exists but is thin. Keep the SAME id, category and publishAt, add `updatedAt: "2026-10-21T08:00:00+01:00"`, you may sharpen the title to match search intent (honest, no clickbait).
NEW assignments: keep the given id, category and publishAt; choose excerpt, tags, SEO, structure. categoryLabel: "NECO" for neco, "Lessons" for lessons.

READ FIRST: `scripts/BLOG_AUTHORING.md` (object format + illustration shortcodes) and the first post in `public/blog/posts.js` (house voice: warm, direct, plain English, Nigerian context).

OUTPUT: ONE file `content/blog/<name>.js` containing `BLOG_POSTS.push({...}, {...});`. Use template literals for `content`; NEVER put a backtick or `${` inside content. author "Michael Joseph", authorAvatar "avatar_1".

QUALITY BAR:
- Teach something specific: concrete examples, worked solutions with real numbers, exam-style questions solved step by step, checklists, common mistakes. Not generic motivation.
- Use WebSearch (mode "standard") briefly per post to see what questions Nigerian students actually search for; answer those directly (section headings + the `faq` array). Verify factual claims.
- EVERGREEN: no exam dates, fees, cut-off marks, registration prices or statistics unless verified this session from an official/reliable source; otherwise say "check the official JAMB/WAEC/NECO portal for the current details".
- Maths/science worked examples must be CORRECT: verify arithmetic with a quick node/python run first. No LaTeX: write x<sup>2</sup>, H<sub>2</sub>O, a/b, sqrt(). For chemistry state the atomic masses used.
- 3-6 illustration shortcodes per post, spread through the article; at least one [[qa ...]] worked example in jamb/waec/neco/lessons posts; end with a short "what to do today" [[checklist ...]].
- Do NOT mention or promote Post-UTME preparation. Never invent quotes, studies or numbers. No filler intros.
- Each post needs: 4-8 <h2> sections, `faq` with 3-6 real questions, `seo.title` (<=60 chars), `seo.description` (<=155 chars), `tags`, 1-2 sentence `excerpt`, `scene` (book calculator flask brain clock chart trophy phone pencil school coin globe chat), accurate `readTime` (~words/220).

VALIDATE: `node scripts/check-blog-batch.js content/blog/<name>.js` until it prints OK. Do NOT run scripts/build-blog.js and do not edit any other file (other agents work in parallel).
FINAL REPLY: 3-5 lines: how many posts written and any fact you were unsure about.
