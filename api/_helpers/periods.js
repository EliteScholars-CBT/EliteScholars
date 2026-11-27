// One set of time ranges for every dashboard: today, week, month, lastmonth, year, all.
// All boundaries follow Nigerian time (UTC+1, no daylight saving). "This week" runs Monday to today.
const H = 3600000, D = 86400000;
export const PERIODS = ["today", "week", "month", "lastmonth", "year", "all"];
export const ALL_FROM = "2026-10-01"; // the database started recording in October 2026

const lagosISO = (ms) => new Date(ms + H).toISOString();
const dayStart = (ms) => Math.floor((ms + H) / D) * D - H;       // Lagos midnight as UTC ms
const parseDay = (s) => { const [y, m, d] = String(s).split("-").map(Number); return Date.UTC(y, m - 1, d) - H; };

// Lagos calendar days (YYYY-MM-DD) from `from` to `to`, oldest first (capped so a huge range stays light)
function dayKeys(from, to, cap = 400) {
  const out = [];
  for (let t = dayStart(from); t <= to && out.length < cap; t += D) out.push(lagosISO(t).slice(0, 10));
  return out;
}

export function resolvePeriod(key, now = Date.now()) {
  const k = PERIODS.includes(String(key)) ? String(key) : "month";
  const today0 = dayStart(now), t = lagosISO(now);
  let from = today0, to = now, label = "Today";
  if (k === "week") { const dow = (new Date(today0 + H).getUTCDay() + 6) % 7; from = today0 - dow * D; label = "This week (Mon to today)"; }
  else if (k === "month") { from = parseDay(`${t.slice(0, 7)}-01`); label = "This month"; }
  else if (k === "lastmonth") {
    const first = parseDay(`${t.slice(0, 7)}-01`);
    const prev = new Date(Date.UTC(Number(t.slice(0, 4)), Number(t.slice(5, 7)) - 2, 1));
    from = Date.UTC(prev.getUTCFullYear(), prev.getUTCMonth(), 1) - H; to = first - 1; label = "Last month";
  }
  else if (k === "year") { from = parseDay(`${t.slice(0, 4)}-01-01`); label = "This year"; }
  else if (k === "all") { from = parseDay(ALL_FROM); label = "All time"; }
  if (from > to) from = to - D;
  // the period to compare with (same days last week, same days of last month, ...). None for This year and All time.
  let prev = null;
  const span = to - from;
  if (k === "today") prev = [from - D, to - D];
  else if (k === "week") prev = [from - 7 * D, to - 7 * D];
  else if (k === "month" || k === "lastmonth") {
    const m0 = new Date(Date.UTC(Number(t.slice(0, 4)), Number(t.slice(5, 7)) - (k === "month" ? 2 : 3), 1));
    const pf = Date.UTC(m0.getUTCFullYear(), m0.getUTCMonth(), 1) - H;
    prev = [pf, k === "month" ? Math.min(pf + span, from - 1) : from - 1];
  }
  return { key: k, label, from, to, since: new Date(from).toISOString(), until: new Date(to).toISOString(), prev: prev && { from: prev[0], to: prev[1], since: new Date(prev[0]).toISOString(), until: new Date(prev[1]).toISOString() }, keys: dayKeys(from, to), lagosDay: (iso) => lagosISO(new Date(iso).getTime()).slice(0, 10) };
}
