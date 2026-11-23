// Sample data for demo schools (Makzo Schools). Read-only and generated in memory on every request, so nothing
// fake is ever written to the database and the public leaderboards stay clean.
// Add more ids with the DEMO_SCHOOL_IDS env var (comma separated).
const DAY = 86400000;
const BUILT_IN = ["dfa0691b-07a6-4a25-897c-f033d262a851"];
export const isDemoSchool = (id) => BUILT_IN.concat(String(process.env.DEMO_SCHOOL_IDS || "").split(",").map((s) => s.trim()).filter(Boolean)).includes(String(id));

const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const mean = (a) => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0);
const dayKey = (t) => new Date(t + 3600000).toISOString().slice(0, 10);

const FIRST = ["Chinedu", "Aisha", "Tunde", "Ngozi", "Ibrahim", "Funke", "Emeka", "Zainab", "Seyi", "Amaka", "Yusuf", "Bisi", "Obinna", "Hauwa", "Kemi", "Daniel", "Halima", "Chidi", "Temitope", "Blessing", "Musa", "Ifeoma", "Segun", "Fatima", "Uche", "Rukayat", "David", "Nkechi", "Samuel", "Joy", "Abdul", "Folake", "Victor", "Mercy", "Tobi", "Gift", "Sade", "Peter", "Khadija", "Ebuka", "Precious", "Femi", "Adaeze", "Ahmed", "Titi", "Ikenna", "Lara", "Kunle", "Esther", "Bashir", "Dami", "Oluchi"];
const LAST = ["Okafor", "Bello", "Adeyemi", "Eze", "Abubakar", "Balogun", "Nwosu", "Lawal", "Ogunleye", "Okonkwo", "Danjuma", "Adebayo", "Ibe", "Sani", "Afolabi", "Obi", "Musa", "Ojo", "Umar", "Chukwu", "Ali", "Salami", "Nnamdi", "Yakubu", "Olawale"];
const SUBJECTS = [["mathematics", 61], ["english", 68], ["physics", 54], ["chemistry", 58], ["biology", 72], ["economics", 66], ["government", 70], ["literature", 64]];
const CLASSES = [["JSS 3 Gold", "KOLA"], ["SS 1 Science", "MZK21"], ["SS 2 Science", "PHX4T"], ["SS 2 Arts", "LRN8Q"], ["SS 3 Science A", "WAEC7"], ["SS 3 Commercial", "JMB55"]].map(([name, code], i) => ({ id: `demo-class-${i + 1}`, name, code: code.padEnd(6, "X").slice(0, 6), teacher: `teacher${(i % 4) + 1}@makzo.demo`, created_at: "2026-09-01T08:00:00Z" }));
const TEACHERS = [["Mrs. Adaobi Nwankwo", "teacher1@makzo.demo"], ["Mr. Ahmed Garba", "teacher2@makzo.demo"], ["Miss Titilayo Bakare", "teacher3@makzo.demo"], ["Mr. Emmanuel Udo", "teacher4@makzo.demo"]];
const ASG = [
  ["Quadratic equations: exercise 4", 0, 3, "Solve questions 1 to 12 and show every step."],
  ["Essay: My school in 20 years", 1, 5, "Write 300 words. Plan before you write."],
  ["Newton's laws worksheet", 2, 2, "Complete the worksheet and attach working."],
  ["Organic chemistry: naming alkanes", 2, 6, "Name the 15 compounds on page 82."],
  ["Past question practice: Biology 2023", 4, 1, "Answer all 40 questions in 35 minutes."],
  ["Supply and demand chart", 5, 4, "Draw the chart from the table and explain the shift."],
  ["Comprehension passage 7", 0, 8, "Read the passage and answer questions A to F."],
  ["Cell division summary", 4, 9, "One page summary with a labelled diagram."],
  ["Government: separation of powers", 3, 7, "Write five points with Nigerian examples."],
  ["Mock exam revision plan", 4, 10, "Make a two-week revision timetable."],
].map(([title, ci, ago, body], i) => ({ id: `demo-asg-${i + 1}`, class_id: CLASSES[ci].id, title, body, ago, due_ago: ago - 4 }));

let cache = null;
function build() {
  if (cache) return cache;
  const students = [];
  for (let i = 0; i < 52; i++) {
    const r = rng(1000 + i);
    const cls = CLASSES[i % CLASSES.length];
    const name = `${FIRST[i % FIRST.length]} ${LAST[(i * 7 + 3) % LAST.length]}`;
    const profile = r(); // 0..1 decides a strong, middling or struggling student
    const ability = profile > 0.8 ? 80 : profile > 0.5 ? 70 : profile > 0.2 ? 58 : 42;
    const activity = i % 13 === 5 ? 0.04 : i % 9 === 4 ? 0.12 : 0.35 + r() * 0.6; // chance of a quiz on a day
    const trend = (r() - 0.35) * 14; // improving or slipping over the quarter
    const events = [];
    const er = rng(5000 + i);
    for (let d = 89; d >= 0; d--) {
      if (er() < activity) {
        const n = er() < 0.3 ? 2 : 1;
        for (let k = 0; k < n; k++) {
          const sub = SUBJECTS[Math.floor(er() * SUBJECTS.length)];
          const base = ability + (sub[1] - 62) * 0.4 + trend * ((89 - d) / 89 - 0.5);
          const score = Math.max(8, Math.min(100, Math.round(base + (er() - 0.5) * 26)));
          events.push({ subject: sub[0], score, ago: d + er() * 0.9 });
        }
      }
    }
    const lastAgo = events.length ? Math.min(...events.map((e) => e.ago)) : 40;
    students.push({ key: `${name.toLowerCase().replace(/\s+/g, ".")}@students.makzo.demo`, name, username: name.toLowerCase().replace(/\s+/g, "") + (i + 11), class_id: cls.id, class_name: cls.name, events, streak: Math.max(0, Math.round((8 - lastAgo) * (activity > 0.5 ? 1.2 : 0.6))), xp: 200 + Math.round(events.length * 38 + r() * 300), level: 2 + Math.floor(events.length / 14), lastAgo });
  }
  const done = new Set();
  ASG.forEach((a, ai) => students.forEach((s, si) => { if (s.class_id === a.class_id && rng(900 + ai * 97 + si)() < (a.ago > 5 ? 0.82 : 0.58) * (s.events.length ? 1 : 0.3)) done.add(a.id + "|" + s.key); }));
  cache = { students, done };
  return cache;
}
const at = (ago) => new Date(Date.now() - ago * DAY).toISOString();
const inWin = (e, from, to) => e.ago >= from && e.ago < to;

export function demoClasses() {
  const { students } = build();
  return CLASSES.map((c) => ({ id: c.id, name: c.name, code: c.code, teacher: c.teacher, teacher_name: (TEACHERS.find((t) => t[1] === c.teacher) || [""])[0], students: students.filter((s) => s.class_id === c.id).length }));
}
export function demoStaff(ownerEmail) {
  return [{ email: ownerEmail, role: "admin", owner: true, name: "Makzo (Owner)", registered: true }, ...TEACHERS.map(([name, email]) => ({ email, role: "teacher", owner: false, name, registered: true }))];
}
export function demoTotals() { return { classes: CLASSES.length, students: build().students.length, staff: TEACHERS.length + 1, unassigned: 0 }; }

export function demoStudents(classId) {
  const { students } = build();
  return students.filter((s) => !classId || s.class_id === classId).map((s) => ({ email: "", username: s.username, name: s.name, classes: [{ id: s.class_id, name: s.class_name }], xp: s.xp, streak: s.streak, quizzes: s.events.length, avg: mean(s.events.map((e) => e.score)), last_active: at(s.lastAgo), created: false, key: s.key })).sort((a, b) => a.name.localeCompare(b.name));
}

export function demoReports(days, classId) {
  const { students: all, done } = build();
  const students0 = all.filter((s) => !classId || s.class_id === classId);
  const cur = (s) => s.events.filter((e) => inWin(e, 0, days));
  const prev = (s) => s.events.filter((e) => inWin(e, days, days * 2));
  const asgFor = (cid) => ASG.filter((a) => a.class_id === cid);
  const rows = students0.map((s) => {
    const mine = cur(s), before = prev(s);
    const myAsg = asgFor(s.class_id), hw = myAsg.filter((a) => done.has(a.id + "|" + s.key)).length;
    const avg = mean(mine.map((e) => e.score)), pavg = mean(before.map((e) => e.score));
    const idle = Math.floor(s.lastAgo);
    const risk = idle >= 14 || (mine.length >= 3 && avg < 40) ? "high" : idle >= 7 || (mine.length >= 3 && avg < 50) ? "watch" : "ok";
    return { key: s.key, name: s.name, username: s.username, classes: [s.class_name], quizzes: mine.length, avg, trend: mine.length && before.length ? avg - pavg : null, streak: s.streak, xp: s.xp, last_active: at(s.lastAgo), idle_days: idle, homework: myAsg.length ? `${hw}/${myAsg.length}` : "-", hw_pct: myAsg.length ? Math.round((hw * 100) / myAsg.length) : null, risk };
  }).sort((a, b) => a.name.localeCompare(b.name));
  const classes = CLASSES.filter((c) => !classId || c.id === classId).map((c) => {
    const ss = students0.filter((s) => s.class_id === c.id);
    const ev = ss.flatMap(cur);
    const ids = asgFor(c.id);
    const possible = ids.length * ss.length, got = ids.reduce((n, a) => n + ss.filter((s) => done.has(a.id + "|" + s.key)).length, 0);
    return { id: c.id, name: c.name, teacher: c.teacher, students: ss.length, quizzes: ev.length, avg: mean(ev.map((e) => e.score)), participation: ss.length ? Math.round((ss.filter((s) => cur(s).length).length * 100) / ss.length) : 0, homework: possible ? Math.round((got * 100) / possible) : null, assignments: ids.length };
  });
  const sub = {};
  students0.forEach((s) => cur(s).forEach((e) => { const o = (sub[e.subject] = sub[e.subject] || { subject: e.subject, scores: [], who: new Set() }); o.scores.push(e.score); o.who.add(s.key); }));
  const subjects = Object.values(sub).map((o) => ({ subject: o.subject, avg: mean(o.scores), attempts: o.scores.length, students: o.who.size })).sort((a, b) => b.attempts - a.attempts);
  const distribution = [["0-39", 0, 39], ["40-49", 40, 49], ["50-59", 50, 59], ["60-69", 60, 69], ["70-79", 70, 79], ["80-100", 80, 100]].map(([label, lo, hi]) => ({ label, count: rows.filter((s) => s.quizzes > 0 && s.avg >= lo && s.avg <= hi).length }));
  const series = [];
  for (let i = days - 1; i >= 0; i--) {
    const ev = students0.map((s) => ({ s, n: s.events.filter((e) => inWin(e, i, i + 1)).length }));
    series.push({ day: dayKey(Date.now() - i * DAY), quizzes: ev.reduce((a, x) => a + x.n, 0), active: ev.filter((x) => x.n).length });
  }
  const withQ = rows.filter((s) => s.quizzes > 0);
  const curAll = students0.flatMap(cur), prevAll = students0.flatMap(prev);
  return {
    days, generated: new Date().toISOString(), sample: true,
    summary: { students: rows.length, active: withQ.length, participation: rows.length ? Math.round((withQ.length * 100) / rows.length) : 0, quizzes: curAll.length, avg: mean(curAll.map((e) => e.score)), prevAvg: prevAll.length ? mean(prevAll.map((e) => e.score)) : null, prevQuizzes: prevAll.length, atRisk: rows.filter((s) => s.risk === "high").length, watch: rows.filter((s) => s.risk === "watch").length },
    series, classes, subjects, distribution, students: rows,
    top: [...withQ].sort((a, b) => b.avg - a.avg || b.quizzes - a.quizzes).slice(0, 10),
    improvers: withQ.filter((s) => s.trend !== null && s.trend > 0).sort((a, b) => b.trend - a.trend).slice(0, 5),
    needsHelp: rows.filter((s) => s.risk !== "ok").sort((a, b) => (a.risk === b.risk ? (b.idle_days || 0) - (a.idle_days || 0) : a.risk === "high" ? -1 : 1)).slice(0, 30),
  };
}

export function demoStudentReport(key, days) {
  const { students, done } = build();
  const s = students.find((x) => x.key === key);
  if (!s) return null;
  const ev = s.events.filter((e) => e.ago < days).sort((a, b) => a.ago - b.ago);
  const by = {}; ev.forEach((e) => { (by[e.subject] = by[e.subject] || []).push(e); });
  const subjects = Object.entries(by).map(([sb, a]) => ({ subject: sb, avg: mean(a.map((r) => r.score)), attempts: a.length, best: Math.max(...a.map((r) => r.score)), last: a[0].score })).sort((x, y) => y.avg - x.avg);
  const weekly = []; for (let i = 11; i >= 0; i--) { const w = ev.filter((e) => inWin(e, i * 7, (i + 1) * 7)); weekly.push({ label: `W${12 - i}`, avg: w.length ? mean(w.map((r) => r.score)) : null, quizzes: w.length }); }
  const half = ev.filter((e) => e.ago < days / 2), older = ev.filter((e) => e.ago >= days / 2);
  const sd = Math.min(days, 30), series = [];
  for (let i = sd - 1; i >= 0; i--) series.push({ day: dayKey(Date.now() - i * DAY), quizzes: ev.filter((e) => inWin(e, i, i + 1)).length, active: 0 });
  return {
    student: { name: s.name, username: s.username, classes: [s.class_name], level: s.level, xp: s.xp, streak: s.streak, last_active: at(s.lastAgo), overall: mean(s.events.map((e) => e.score)), quizzes_all: s.events.length },
    days, quizzes: ev.length, avg: mean(ev.map((r) => r.score)), trend: half.length && older.length ? mean(half.map((r) => r.score)) - mean(older.map((r) => r.score)) : null,
    series, weekly, subjects, strengths: subjects.filter((x) => x.attempts >= 2).slice(0, 3), weak: [...subjects].filter((x) => x.attempts >= 2).sort((x, y) => x.avg - y.avg).slice(0, 3),
    recent: ev.slice(0, 15).map((e) => ({ subject: e.subject, score: e.score, at: at(e.ago) })),
    homework: ASG.filter((a) => a.class_id === s.class_id).map((a) => ({ title: a.title, due_at: at(a.due_ago), done: done.has(a.id + "|" + s.key) })),
  };
}

export function demoAssignments() {
  const { students, done } = build();
  return ASG.map((a) => {
    const c = CLASSES.find((x) => x.id === a.class_id);
    const total = students.filter((s) => s.class_id === a.class_id).length;
    const n = students.filter((s) => s.class_id === a.class_id && done.has(a.id + "|" + s.key)).length;
    return { id: a.id, class_id: a.class_id, class_name: c.name, title: a.title, preview: a.body, due_at: at(a.due_ago), created_at: at(a.ago), done_count: n, total, images: 0 };
  }).sort((x, y) => (x.created_at < y.created_at ? 1 : -1));
}
