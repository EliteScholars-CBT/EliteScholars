// Study reminders sent to everyone who has allowed notifications, twice a day (cron: 08:00 and 17:00 Lagos time).
// Each slot has its own "kind" (study_morning / study_evening) so Admin → Reminders can show, per slot, how many were
// sent, how many phones displayed it and how many were tapped ("Resume learning"). Every run is also logged as a
// `reminder_run` event. Students who already practised today are skipped, and nobody gets the same slot twice in a day.
import { getSupabase, supabaseEnabled } from "./supabase.js";
import { pushToEmails, pushEnabled } from "./push.js";
import { lagosDay } from "./access.js";
import { runEmailNudges } from "./emailNudges.js";

const DAY = 86400000;
const pick = (arr, n) => arr[Math.abs(n) % arr.length];

function message(slot, { name, streak, idle }, seed) {
  if (slot === "morning") {
    if (streak >= 1) return { title: `Good morning, ${name} ☀️`, body: pick([`Your ${streak}-day streak is waiting. Ten minutes now keeps it going.`, `${streak} days in a row. Do one quick quiz before school and make it ${streak + 1}.`], seed) };
    return { title: `Good morning, ${name} ☀️`, body: pick(["A few minutes of practice this morning makes exam day easier.", "Start the day with one quiz. Small steps add up.", "Your next topic is ready. Pick up where you left off."], seed) };
  }
  if (streak >= 1 && idle <= 1) return { title: `🔥 ${streak}-day streak at risk`, body: `${name}, practise for 5 minutes tonight to keep your streak alive.` };
  if (idle >= 3) return { title: "We saved your seat 📚", body: `${name}, one quick quiz gets you back on track.` };
  return { title: `Evening, ${name} 📚`, body: pick(["Finish today strong with one quick quiz.", "Revise one topic before bed. It sticks better.", "Five minutes tonight keeps you ahead."], seed) };
}

// Both slots: first the come-back emails (a second daily chance if the morning run was missed; safe to repeat), then the push reminders.
export async function runStudyReminders(slot) {
  let emailNudges = null;
  { try { emailNudges = await runEmailNudges(); } catch (e) { emailNudges = { error: String(e?.message || e) }; } }
  const r = await runPush(slot);
  return emailNudges ? { ...r, emailNudges } : r;
}

async function runPush(slot) {
  const out = { type: "study_reminders", slot, targeted: 0, sent: 0, failed: 0, removed: 0, skipped: { practisedToday: 0, alreadySent: 0, longIdle: 0 } };
  if (!supabaseEnabled()) return { ...out, skipped: "no database" };
  if (!pushEnabled()) return { ...out, skipped: "push keys not set (VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY)" };
  const sb = getSupabase();
  const today = lagosDay();
  const kind = slot === "morning" ? "study_morning" : "study_evening";
  const tag = `${kind}-${today}`;
  const seed = Math.floor(Date.now() / DAY);

  const { data: subs } = await sb.from("push_subscriptions").select("email");
  const emails = [...new Set((subs || []).map((r) => r.email).filter(Boolean))];

  // who already got this slot today (a cron retry must not double-send)
  const done = new Set();
  try {
    const since = new Date(Date.now() - 20 * 3600000).toISOString();
    for (let i = 0; i < emails.length; i += 200) {
      const { data } = await sb.from("events").select("email").eq("type", "push_sent").gte("created_at", since).filter("payload->>tag", "eq", tag).in("email", emails.slice(i, i + 200));
      (data || []).forEach((r) => done.add(r.email));
    }
  } catch { /* if the check fails we still send; duplicates are better than silence */ }

  for (let i = 0; i < emails.length; i += 200) {
    const batch = emails.slice(i, i + 200);
    const { data: rows } = await sb.from("profiles").select("email,first_name,current_streak,last_active").in("email", batch);
    const byEmail = new Map((rows || []).map((r) => [r.email, r]));
    for (const email of batch) {
      if (done.has(email)) { out.skipped.alreadySent++; continue; }
      const u = byEmail.get(email) || {};
      const last = u.last_active ? lagosDay(new Date(u.last_active).getTime()) : null;
      if (last === today) { out.skipped.practisedToday++; continue; }
      const idle = u.last_active ? Math.floor((Date.now() - new Date(u.last_active).getTime()) / DAY) : 99;
      if (idle > 14 && seed % 3 !== 0) { out.skipped.longIdle++; continue; } // long-gone students: a gentle nudge every third day
      const name = (u.first_name || "Scholar").split(" ")[0];
      const m = message(slot, { name, streak: u.current_streak || 0, idle }, seed + (email.length || 0));
      out.targeted++;
      const r = await pushToEmails([email], { title: m.title, body: m.body, url: "/app", tag, type: kind, actions: [{ action: "resume", title: "Resume learning" }] });
      out.sent += r.sent; out.failed += r.failed; out.removed += r.removed;
    }
  }
  try { await sb.from("events").insert({ type: "reminder_run", payload: { slot, kind, subscribers: emails.length, targeted: out.targeted, sent: out.sent, failed: out.failed, removed: out.removed, skipped: out.skipped } }); } catch { /* log only */ }
  out.subscribers = emails.length;
  return out;
}
