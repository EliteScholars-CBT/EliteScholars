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
const progress = (n, steps = ["Apply", "Research", "Join the team"]) => {
  if (n > steps.length) n = steps.length;
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
    "As soon as your account is created, we email you the link to the team group chat.",
    "Copy your partner link, share it, and watch your earnings grow in your partner dashboard.",
  ])}`,
  cta: { label: "Create my partner account", url: signupLink },
});

export const groupEmail = ({ name, job, link }) => layout({
  preheader: "Your account is ready. Join the team group chat", emoji: "💬", heading: "Your account is ready",
  body: `${progress(4)}${hi(name)}<p style="margin:0 0 12px">Your partner account is active. One last step: join the team group chat, where announcements and tips are shared.</p>
${callout("Tap the button below to join. Please join today so we know you are in.", "#22c55e", "#f0fdf4")}`,
  cta: { label: "Join the group chat", url: link },
});

export const welcomeEmail = ({ name, job }) => layout({
  preheader: "Welcome to the team. Here is how we work", emoji: "🤝", heading: "Welcome to the team!",
  body: `${hi(name)}<p style="margin:0 0 12px">You are officially part of the EliteScholars team as a <b>${esc(job.title)}</b>. We are glad to have you.</p>
${stepCards([
    "Open your <a href=\"" + APP + "/partner\" style=\"color:" + PURPLE + ";font-weight:700\">partner dashboard</a>, copy your link and start sharing.",
    "<b>Stay active.</b> We do not chase partners one by one. Partners who go inactive are suspended automatically.",
    "Have a question about your own account? Send the admin a direct message (DM).",
    "Have a general question? Ask it in the group chat so everyone can learn from the answer.",
  ])}
${callout("<b>Please note:</b> we will not message you individually to remind you to work. Everything runs automatically, so keep your activity up.", "#f5b400", "#fffbeb")}`,
  cta: { label: "Open my dashboard", url: `${APP}/partner` },
});


// ───────── Volunteer video editor ─────────
export const VIDEO_TOPICS = [
  "3 study techniques that actually work (and one that does not)",
  "The agony of a student: exam week, told in under a minute",
  "How to stop procrastinating and start studying tonight",
  "What nobody tells you about your first week in a new class or school",
  "One simple habit that saves a student time, money or stress",
];
export const VIDEO_DIRECTION = [
  "Make it <b>vertical (9:16)</b>, about <b>30 to 60 seconds</b>, in <b>MP4</b> format.",
  "Grab attention in the <b>first 2 seconds</b> with a bold line, a question or a funny moment.",
  "Put <b>captions on screen</b>. Most people watch with the sound off.",
  "Use our colours: <b>purple</b> and <b>gold</b> on dark. Keep the text big and easy to read on a phone.",
  "Show the EliteScholars logo at the start or the end (use the files below).",
  "Use music and clips you are allowed to use. Original work scores best.",
  "End with a clear line: <b>\"Study smarter on EliteScholars\"</b>.",
  "Also send a <b>thumbnail</b> (JPG or PNG) with a short, bold title.",
];
export const BRAND_ASSETS = [
  { label: "Logo (transparent background)", url: `${APP}/brand/elitescholars-logo-transparent.png`, bg: "#9ca3af" },
  { label: "Logo (black background)", url: `${APP}/brand/elitescholars-logo-black-background.png`, bg: "#000000" },
];
export const isVideoJob = (job) => job && job.kind === "video_editor";
const VSTEPS = ["Apply", "Task", "Join the group"];
const hoursText = (h) => (h % 24 === 0 ? `${h / 24} day${h / 24 === 1 ? "" : "s"}` : `${h} hours`);
const volunteer = callout("<b>This is a volunteer role.</b> It is unpaid. You will build experience, a portfolio piece and a place on our team.", "#6d28d9", "#f5f3ff");
const assetsHtml = () => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px"><tr>${BRAND_ASSETS.map((a) => `<td align="center" style="width:50%;padding:4px"><a href="${a.url}" style="text-decoration:none"><div style="background:${a.bg};border-radius:14px;padding:10px"><img src="${a.url}" alt="${esc(a.label)}" width="120" style="display:block;margin:0 auto;max-width:100%;height:auto"></div><div style="font-size:12px;color:${PURPLE};font-weight:700;margin-top:6px">${esc(a.label)}<br>Tap to download</div></a></td>`).join("")}</tr></table>`;

export const videoTaskEmail = ({ name, job, link, dueAt, hours }) => layout({
  preheader: `Your screening task is ready. You have ${hoursText(hours)}`, emoji: "🎬", heading: "Your video task is ready",
  body: `${progress(2, VSTEPS)}${hi(name)}<p style="margin:0 0 12px">Thank you for applying to be a <b>${esc(job.title)}</b> at EliteScholars. Here is your screening task.</p>
${volunteer}
${callout(`⏰ <b>You have ${esc(hoursText(hours))}.</b> Send your video before <b>${esc(fmtWhen(dueAt))}</b>. When the time is up, the link closes and we cannot accept it.`, "#ef4444", "#fef2f2")}
<p style="margin:14px 0 6px;font-weight:800">1. Pick ONE topic and make a short video</p>
${stepCards(VIDEO_TOPICS)}
<p style="margin:14px 0 6px;font-weight:800">2. Creative direction</p>
${stepCards(VIDEO_DIRECTION)}
<p style="margin:14px 0 6px;font-weight:800">3. Our logos and inspiration</p>${assetsHtml()}
<p style="margin:8px 0 0;font-size:13px;line-height:1.7;color:#4b4570">Images not showing? Download the logos here: <a href="${BRAND_ASSETS[0].url}" style="color:${PURPLE};font-weight:700">transparent logo</a> · <a href="${BRAND_ASSETS[1].url}" style="color:${PURPLE};font-weight:700">black background logo</a>.<br>For inspiration, look around the website <a href="${APP}" style="color:${PURPLE};font-weight:700">elitescholars.site</a> and open the app <a href="${APP}/app" style="color:${PURPLE};font-weight:700">elitescholars.site/app</a> to see our colours, style and how students use it.</p>
<p style="margin:14px 0 0">When it is ready, upload your video and thumbnail with the button below.</p>`,
  cta: { label: "Submit my video", url: link },
});

export const videoGroupEmail = ({ name, job, link, deadline, hours }) => layout({
  preheader: "You passed. Join the volunteer group chat", emoji: "🎉", heading: "You passed. Welcome aboard!",
  body: `${progress(3, VSTEPS)}${hi(name)}<p style="margin:0 0 12px">We watched your video and we would love to have you as a <b>${esc(job.title)}</b>. Well done.</p>
${volunteer}
${callout(`⏰ <b>Join before ${esc(fmtWhen(deadline))}.</b> You have ${esc(hoursText(hours))}. After that, this invitation expires.`, "#f5b400", "#fffbeb")}`,
  cta: { label: "Join the group chat", url: link },
});

export const videoWelcomeEmail = ({ name, job }) => layout({
  preheader: "Welcome to the team. Here is how we work", emoji: "🤝", heading: "Welcome to the team!",
  body: `${hi(name)}<p style="margin:0 0 12px">You are officially part of EliteScholars as a volunteer <b>${esc(job.title)}</b>. We are glad to have you.</p>
${stepCards([
    "Watch the group chat for video requests and briefs.",
    "<b>Stay active.</b> We do not chase volunteers one by one. Please deliver on time and keep an eye on the group.",
    "Have a question about your own work? Send the admin a direct message (DM).",
    "Have a general question? Ask it in the group chat so everyone can learn from the answer.",
  ])}
${callout("<b>Please note:</b> we will not message you individually to remind you. Everything runs automatically, so stay active.", "#f5b400", "#fffbeb")}`,
});

export const videoExpiredEmail = ({ name, job }) => layout({
  preheader: `Update on your ${job.title} application`, emoji: "⌛", heading: "The task window has closed",
  body: `${hi(name)}<p style="margin:0 0 12px">The time for the <b>${esc(job.title)}</b> screening task has ended, and we did not receive your video, so we cannot take your application further this time.</p><p style="margin:0">You are welcome to apply again when we open new roles. Thank you for your interest. 💜</p>`,
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
  const nowIso = new Date().toISOString();
  if (isVideoJob(job)) {
    const hours = job.task_duration_h || 48;
    const dueAt = new Date(Date.now() + hours * 3600000).toISOString();
    const ok = await sendWithCopy(app.email, `Your volunteer video task (you have ${hoursText(hours)})`, videoTaskEmail({ name: app.name, job, link, dueAt, hours }));
    await sb.from("hiring_applications").update({ status: "invited", invited_at: nowIso, task_due_at: dueAt }).eq("id", app.id);
    await logEvent(sb, job.id, app.id, "invite", `Video task ${ok ? "emailed to" : "could not be emailed to"} ${app.name}. Due in ${hoursText(hours)}`);
    return ok;
  }
  const ok = await sendWithCopy(app.email, `Next step for ${job.title}: your research task`, researchBriefEmail({ name: app.name, job, link }));
  await sb.from("hiring_applications").update({ status: "invited", invited_at: nowIso }).eq("id", app.id);
  await logEvent(sb, job.id, app.id, "invite", `Research task ${ok ? "emailed to" : "could not be emailed to"} ${app.name}`);
  return ok;
}

export async function sendApproval(sb, job, app) {
  if (isVideoJob(job)) {
    // Volunteer editors have no partner account: approval goes straight to the (tracked) group chat link, with a join deadline.
    const hours = job.join_duration_h || 48;
    const deadline = new Date(Date.now() + hours * 3600000).toISOString();
    const link = `${APP}/api/hire/go?t=${app.token}`;
    const ok = await sendWithCopy(app.email, "You passed: join the EliteScholars volunteer group 🎉", videoGroupEmail({ name: app.name, job, link, deadline, hours }));
    await sb.from("hiring_applications").update({ status: "approved", approved_at: new Date().toISOString(), group_deadline_at: deadline, group_sent_at: new Date().toISOString() }).eq("id", app.id);
    await logEvent(sb, job.id, app.id, "approved", `${app.name} approved. Group chat link ${ok ? "emailed" : "could not be emailed"} (join within ${hoursText(hours)})`);
    return ok;
  }
  const signupLink = `${APP}/api/hire/go?t=${app.token}&to=signup`;
  const ok = await sendWithCopy(app.email, `You passed: welcome to the EliteScholars team 🎉`, approvedEmail({ name: app.name, job, signupLink }));
  await sb.from("hiring_applications").update({ status: "approved", approved_at: new Date().toISOString() }).eq("id", app.id);
  await logEvent(sb, job.id, app.id, "approved", `${app.name} approved, partner signup link ${ok ? "emailed" : "could not be emailed"}`);
  return ok;
}

// After they register: send the group chat link through a tracked redirect, so we can see when they open it.
export async function sendGroupInvite(sb, job, app) {
  const link = `${APP}/api/hire/go?t=${app.token}`;
  const ok = await sendWithCopy(app.email, "Your account is ready: join the team group chat", groupEmail({ name: app.name, job, link }));
  await sb.from("hiring_applications").update({ group_sent_at: new Date().toISOString() }).eq("id", app.id);
  await logEvent(sb, job.id, app.id, "group_sent", `Group chat link ${ok ? "emailed to" : "could not be emailed to"} ${app.name}`);
  return ok;
}

// Opening the group link: log it, send the welcome email once, then forward to the group.
export async function onGroupClick(sb, job, app) {
  const now = new Date().toISOString();
  const video = isVideoJob(job);
  const claim = await sb.from("hiring_applications").update({ group_clicked_at: now, welcomed_at: now, ...(video ? { status: "joined", joined_at: now } : {}) }).eq("id", app.id).is("welcomed_at", null).select("id");
  if (claim.data && claim.data.length) {
    await logEvent(sb, job.id, app.id, "group_click", `${app.name} opened the group chat link`);
    if (video) await logEvent(sb, job.id, app.id, "joined", `${app.name} joined the volunteer group`);
    const ok = await sendWithCopy(app.email, "Welcome to the EliteScholars team 🤝", video ? videoWelcomeEmail({ name: app.name, job }) : welcomeEmail({ name: app.name, job }));
    await logEvent(sb, job.id, app.id, "welcomed", `Welcome email ${ok ? "sent to" : "could not be sent to"} ${app.name}`);
  }
}

// Called from the cron and whenever the admin opens Hiring (so it also works between cron runs).
export async function processDue(sb) {
  const now = new Date().toISOString();
  const out = { invited: 0, approved: 0 };
  try {
    // Volunteer video jobs: the task window and the join window close by themselves.
    const { data: vjobs } = await sb.from("hiring_jobs").select("*").eq("kind", "video_editor");
    for (const vj of vjobs || []) {
      const { data: late } = await sb.from("hiring_applications").select("*").eq("job_id", vj.id).eq("status", "invited").lt("task_due_at", now);
      for (const a of late || []) {
        const c = await sb.from("hiring_applications").update({ status: "expired" }).eq("id", a.id).eq("status", "invited").select("id");
        if (c.data && c.data.length) { await sendWithCopy(a.email, `Update on your ${vj.title} application`, videoExpiredEmail({ name: a.name, job: vj })); await logEvent(sb, vj.id, a.id, "expired", `${a.name} did not send the video in time. Closed`); }
      }
      const { data: nojoin } = await sb.from("hiring_applications").select("*").eq("job_id", vj.id).eq("status", "approved").lt("group_deadline_at", now);
      for (const a of nojoin || []) {
        const c = await sb.from("hiring_applications").update({ status: "expired" }).eq("id", a.id).eq("status", "approved").select("id");
        if (c.data && c.data.length) await logEvent(sb, vj.id, a.id, "expired", `${a.name} did not join the group before the deadline. Invitation expired`);
      }
    }
    const { data: jobs } = await sb.from("hiring_jobs").select("*").eq("open", true).neq("kind", "video_editor");
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
