// Hiring (promoter roles): emails and the automatic steps that run when a deadline passes.
//   applied → (apply deadline) invited → submitted (research) → approved (admin) → joined (signed up as partner)
import crypto from "crypto";
import { layout, esc } from "./emailTemplates.js";
import { sendHtml } from "./mail.js";

const APP = "https://elitescholars.site";
// Activity log shown in the admin Hiring tab.
export async function logEvent(sb, jobId, appId, type, text) {
  try { await sb.from("hiring_events").insert({ job_id: jobId || null, app_id: appId || null, type, text: String(text || "").slice(0, 300) }); } catch { /* logging must never break the flow */ }
}
export const newToken = () => crypto.randomBytes(18).toString("base64url");
const fmtWhen = (iso) => (iso ? new Date(iso).toLocaleString("en-NG", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Africa/Lagos" }) + " (Lagos time)" : "");

// ── building blocks for the hiring emails ──
const PURPLE = "#6d28d9";
// 1 Apply → 2 Research → 3 Join, with the current step lit
const progress = (n) => {
  const steps = ["Apply", "Research", "Join the team"];
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px"><tr>${steps.map((t, i) => {
    const on = i + 1 === n, done = i + 1 < n;
    const bg = on ? "linear-gradient(135deg,#f5b400,#f59e0b)" : done ? "#22c55e" : "#ece7fb";
    const fg = on ? "#1a1433" : done ? "#ffffff" : "#8a83ad";
    return `<td align="center" style="width:33%"><div style="display:inline-block;width:30px;height:30px;line-height:30px;border-radius:50%;background:${bg};color:${fg};font-weight:800;font-size:14px">${done ? "✓" : i + 1}</div><div style="font-size:12px;margin-top:5px;font-weight:${on ? 800 : 600};color:${on ? "#1a1433" : "#8a83ad"}">${t}</div></td>`;
  }).join("")}</tr></table>`;
};
const callout = (html, color = "#f5b400", bg = "#fffbeb") => `<div style="margin:16px 0;padding:14px 16px;border-radius:14px;background:${bg};border-left:5px solid ${color};color:#1a1433;font-size:14px;line-height:1.6">${html}</div>`;
const stepCards = (items) => items.map((t, i) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 10px;background:#faf8ff;border:1px solid #ece7fb;border-radius:14px"><tr><td style="width:46px;padding:12px 0 12px 14px;vertical-align:top"><div style="width:30px;height:30px;line-height:30px;text-align:center;border-radius:50%;background:${PURPLE};color:#fff;font-weight:800">${i + 1}</div></td><td style="padding:12px 14px 12px 8px;font-size:14px;line-height:1.55;color:#1a1433">${t}</td></tr></table>`).join("");
const hi = (name) => `<p style="margin:0 0 14px;font-size:16px">Hi <b>${esc(String(name).split(" ")[0])}</b>,</p>`;
const bigPct = (pct) => `<div style="text-align:center;margin:18px 0"><div style="display:inline-block;padding:14px 28px;border-radius:18px;background:linear-gradient(135deg,#2e1065,#6d28d9);color:#fff"><div style="font-size:34px;font-weight:900;color:#fcd34d;line-height:1">${esc(pct)}%</div><div style="font-size:12px;letter-spacing:.08em;margin-top:4px">COMMISSION ON EVERY PAYING STUDENT</div></div></div>`;

export const applicationReceivedEmail = ({ name, job }) => layout({
  preheader: `We received your application for ${job.title}`, emoji: "📨", heading: "Application received",
  body: `${progress(1)}${hi(name)}<p style="margin:0 0 6px">Thank you for applying for <b>${esc(job.title)}</b>. Your application is in.</p>
${bigPct(job.commission_pct)}
${callout(job.apply_deadline ? `<b>What happens next</b><br>Applications close on <b>${esc(fmtWhen(job.apply_deadline))}</b>. Straight after, we email you a short research task. Keep an eye on your inbox (and your spam folder).` : `<b>What happens next</b><br>We will email you a short research task soon. Keep an eye on your inbox (and your spam folder).`)}`,
  note: "You applied through the EliteScholars hiring page.",
});

export const researchBriefEmail = ({ name, job, link }) => layout({
  preheader: "Your next step: a short research task", emoji: "🔎", heading: "Next step: your research task",
  body: `${progress(2)}${hi(name)}<p style="margin:0 0 14px">You are through to the next stage for <b>${esc(job.title)}</b>. Here is your task:</p>
${stepCards([
    `Spend time on <a href="${APP}" style="color:${PURPLE};font-weight:700">elitescholars.site</a> and <a href="${APP}/partner" style="color:${PURPLE};font-weight:700">elitescholars.site/partner</a>. Open the app, try a quiz, look around.`,
    "Write what you found: what EliteScholars offers, who it helps, and what stood out to you.",
    "Tell us how you would promote it, and why we should choose you.",
  ])}
${callout("<b>Write it yourself.</b> We can tell AI-written answers, and they count against you.", "#ef4444", "#fef2f2")}
${job.research_deadline ? callout(`⏰ <b>Deadline:</b> ${esc(fmtWhen(job.research_deadline))}<br><span style="color:#6b6490">Late submissions are not accepted.</span>`) : ""}`,
  cta: { label: "Write my research", url: link },
});

export const approvedEmail = ({ name, job, signupLink }) => layout({
  preheader: "You passed. Next: create your partner account", emoji: "🎉", heading: "You passed. Welcome aboard!",
  body: `${progress(3)}${hi(name)}<p style="margin:0 0 6px">We read your research and we would like you on the team as a <b>${esc(job.title)}</b>. Well done.</p>
${bigPct(job.commission_pct)}
${stepCards([
    "Create your partner account with the button below. <b>Use the same email you applied with</b> and it activates straight away.",
    job.group_url ? `Join the team group chat: <a href="${esc(job.group_url)}" style="color:${PURPLE};font-weight:700">${esc(job.group_url)}</a>` : "Join the team group chat (we will send you the link shortly).",
    "Copy your partner link, share it, and watch your earnings grow in your partner dashboard.",
  ])}`,
  cta: { label: "Create my partner account", url: signupLink },
});

export const rejectedEmail = ({ name, job }) => layout({
  preheader: `Update on your ${job.title} application`, emoji: "💌", heading: "Thank you for applying",
  body: `${hi(name)}<p style="margin:0 0 12px">Thank you for the time and effort you put into applying for <b>${esc(job.title)}</b>.</p><p style="margin:0 0 12px">We are not taking you forward this time. This is not a judgement of your potential, and you are welcome to apply again when we open new roles.</p><p style="margin:0">In the meantime, keep studying and keep growing. 💜</p>`,
});

// Every hiring email is also copied to the owner so you can see exactly what applicants received.
export const COPY_TO = () => process.env.HIRING_COPY_EMAIL || process.env.ADMIN_NOTIFY_EMAIL || "elitescholars.site@gmail.com";
export const sendWithCopy = (to, subject, html) => sendHtml(to, subject, html, { bcc: COPY_TO() });

export async function sendInvite(sb, job, app) {
  const link = `${APP}/hire/r/${app.token}`;
  const ok = await sendWithCopy(app.email, `Next step for ${job.title}: your research task`, researchBriefEmail({ name: app.name, job, link }));
  await sb.from("hiring_applications").update({ status: "invited", invited_at: new Date().toISOString() }).eq("id", app.id);
  await logEvent(sb, job.id, app.id, "invite", `Research task ${ok ? "emailed to" : "could not be emailed to"} ${app.name}`);
  return ok;
}

export async function sendApproval(sb, job, app) {
  const signupLink = `${APP}/partner?hire=${app.token}`;
  const ok = await sendWithCopy(app.email, `You passed: welcome to the EliteScholars team 🎉`, approvedEmail({ name: app.name, job, signupLink }));
  await sb.from("hiring_applications").update({ status: "approved", approved_at: new Date().toISOString() }).eq("id", app.id);
  await logEvent(sb, job.id, app.id, "approved", `${app.name} approved, partner signup link ${ok ? "emailed" : "could not be emailed"}`);
  return ok;
}

// Called from the cron and whenever the admin opens Hiring (so it also works between cron runs).
export async function processDue(sb) {
  const now = new Date().toISOString();
  const out = { invited: 0, approved: 0 };
  try {
    const { data: jobs } = await sb.from("hiring_jobs").select("*").eq("open", true);
    for (const job of jobs || []) {
      if (job.auto_email && job.apply_deadline && job.apply_deadline <= now && !job.invites_sent_at) {
        const claim = await sb.from("hiring_jobs").update({ invites_sent_at: now }).eq("id", job.id).is("invites_sent_at", null).select("id");
        if (claim.data && claim.data.length) {
          const { data: apps } = await sb.from("hiring_applications").select("*").eq("job_id", job.id).eq("status", "applied");
          for (const a of apps || []) { if (await sendInvite(sb, job, a)) out.invited++; }
          await logEvent(sb, job.id, null, "auto", `Applications closed. Research task sent automatically to ${out.invited} of ${(apps || []).length} applicant(s)`);
        }
      }
      if (job.auto_approve && job.research_deadline && job.research_deadline <= now && !job.approvals_run_at) {
        const claim = await sb.from("hiring_jobs").update({ approvals_run_at: now }).eq("id", job.id).is("approvals_run_at", null).select("id");
        if (claim.data && claim.data.length) {
          const { data: apps } = await sb.from("hiring_applications").select("*").eq("job_id", job.id).eq("status", "submitted");
          for (const a of apps || []) { if (await sendApproval(sb, job, a)) out.approved++; }
          await logEvent(sb, job.id, null, "auto", `Research deadline passed. ${out.approved} submission(s) approved automatically`);
        }
      }
    }
  } catch (e) { console.error("[hiring processDue]", e && e.message); }
  return out;
}
