// Hiring (promoter roles): emails and the automatic steps that run when a deadline passes.
//   applied → (apply deadline) invited → submitted (research) → approved (admin) → joined (signed up as partner)
import crypto from "crypto";
import { layout, esc } from "./emailTemplates.js";
import { sendHtml } from "./mail.js";

const APP = "https://elitescholars.site";
export const newToken = () => crypto.randomBytes(18).toString("base64url");
const fmtWhen = (iso) => (iso ? new Date(iso).toLocaleString("en-NG", { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Africa/Lagos" }) + " (Lagos time)" : "");

export const applicationReceivedEmail = ({ name, job }) => layout({
  preheader: `We received your application for ${job.title}`, emoji: "📨", heading: "Application received",
  body: `<p style="margin:0 0 12px">Hi ${esc(name.split(" ")[0])}, thank you for applying for <b>${esc(job.title)}</b>.</p><p style="margin:0">${job.apply_deadline ? `Applications close on <b>${esc(fmtWhen(job.apply_deadline))}</b>. After that we email everyone the next step, a short research task. Keep an eye on your inbox (and spam folder).` : "We will email you the next step soon."}</p>`,
});

export const researchBriefEmail = ({ name, job, link }) => layout({
  preheader: "Your next step: a short research task", emoji: "🔎", heading: "Next step: your research task",
  body: `<p style="margin:0 0 12px">Hi ${esc(name.split(" ")[0])}, you are through to the next stage for <b>${esc(job.title)}</b>.</p>
<p style="margin:0 0 12px"><b>Your task:</b> spend time on <a href="${APP}" style="color:#7c3aed">elitescholars.site</a> and <a href="${APP}/partner" style="color:#7c3aed">elitescholars.site/partner</a>, then write in your own words:</p>
<ol style="margin:0 0 12px;padding-left:20px"><li>What you found on EliteScholars (what it offers, who it helps, what stood out).</li><li>How you would promote it to students, parents or schools.</li><li>Why we should choose you.</li></ol>
<p style="margin:0 0 12px"><b>Please write it yourself.</b> We can tell AI-written answers, and they count against you.</p>
${job.research_deadline ? `<p style="margin:0">Send it in before <b>${esc(fmtWhen(job.research_deadline))}</b>. Late submissions are not accepted.</p>` : ""}`,
  cta: { label: "Write my research", url: link },
});

export const approvedEmail = ({ name, job, signupLink }) => layout({
  preheader: "You passed. Next: create your partner account", emoji: "🎉", heading: "You passed. Welcome aboard!",
  body: `<p style="margin:0 0 12px">Hi ${esc(name.split(" ")[0])}, we read your research and we would like you on the team as a <b>${esc(job.title)}</b>.</p>
<p style="margin:0 0 12px">You earn <b>${esc(job.commission_pct)}% commission</b> on every student you bring who pays.</p>
<p style="margin:0">Step 1: create your partner account with the button below (use this same email). Step 2: join the team group chat${job.group_url ? "" : " (we will send the link shortly)"}.</p>`,
  rows: job.group_url ? [["Team group chat", job.group_url]] : null,
  cta: { label: "Create my partner account", url: signupLink },
});

export const rejectedEmail = ({ name, job }) => layout({
  preheader: `Update on your ${job.title} application`, emoji: "💌", heading: "Thank you for applying",
  body: `<p style="margin:0 0 12px">Hi ${esc(name.split(" ")[0])}, thank you for the time you put into applying for <b>${esc(job.title)}</b>.</p><p style="margin:0">We are not taking you forward this time, but you are welcome to keep using EliteScholars and apply again when we open new roles.</p>`,
});

export async function sendInvite(sb, job, app) {
  const link = `${APP}/hire/r/${app.token}`;
  const ok = await sendHtml(app.email, `Next step for ${job.title}: your research task`, researchBriefEmail({ name: app.name, job, link }));
  await sb.from("hiring_applications").update({ status: "invited", invited_at: new Date().toISOString() }).eq("id", app.id);
  return ok;
}

export async function sendApproval(sb, job, app) {
  const signupLink = `${APP}/partner?hire=${app.token}`;
  const ok = await sendHtml(app.email, `You passed: welcome to the EliteScholars team 🎉`, approvedEmail({ name: app.name, job, signupLink }));
  await sb.from("hiring_applications").update({ status: "approved", approved_at: new Date().toISOString() }).eq("id", app.id);
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
        }
      }
      if (job.auto_approve && job.research_deadline && job.research_deadline <= now && !job.approvals_run_at) {
        const claim = await sb.from("hiring_jobs").update({ approvals_run_at: now }).eq("id", job.id).is("approvals_run_at", null).select("id");
        if (claim.data && claim.data.length) {
          const { data: apps } = await sb.from("hiring_applications").select("*").eq("job_id", job.id).eq("status", "submitted");
          for (const a of apps || []) { if (await sendApproval(sb, job, a)) out.approved++; }
        }
      }
    }
  } catch (e) { console.error("[hiring processDue]", e && e.message); }
  return out;
}
