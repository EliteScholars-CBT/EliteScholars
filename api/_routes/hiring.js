// Hiring: /api/hire/{job,apply,research} (public) and /api/admin/hiring{,-save,-delete,-app,-job-action} (admin, perm: partners)
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { checkRateLimit } from "../_helpers/rateLimit.js";
import { adminFromToken } from "./admin.js";
import { sendHtml, notifyAdmin } from "../_helpers/mail.js";
import { newToken, processDue, sendInvite, sendApproval, rejectedEmail, applicationReceivedEmail, sendWithCopy } from "../_helpers/hiring.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ip = (req) => req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
const clean = (v, n) => String(v || "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, n);
const isoOrNull = (v) => { if (!v) return null; const t = new Date(v).getTime(); return Number.isFinite(t) ? new Date(t).toISOString() : null; };
const slugify = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50);
const URL_RE = /^https?:\/\/[^\s]+$/i;

function phase(job) {
  const now = Date.now();
  if (!job.open) return "closed";
  if (job.apply_deadline && new Date(job.apply_deadline).getTime() <= now) return "applications_closed";
  return "applying";
}
const pubJob = (j) => ({ slug: j.slug, title: j.title, description: j.description, commissionPct: j.commission_pct, applyDeadline: j.apply_deadline, phase: phase(j) });

export default async function handler(req, res) {
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!supabaseEnabled()) return sendErr(res, "Not configured yet.", 503);
  const sb = getSupabase();
  const op = String(req.query.op || "");

  // ───────────── public ─────────────
  if (op === "job") {
    const { data: j } = await sb.from("hiring_jobs").select("*").eq("slug", clean(req.query.slug, 60)).maybeSingle();
    if (!j) return sendErr(res, "This job link is not valid.", 404);
    return sendOk(res, { job: pubJob(j) });
  }

  if (op === "apply") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const { allowed } = await checkRateLimit(`hire-apply:${ip(req)}`, 6, 3600);
    if (!allowed) return sendErr(res, "Too many attempts. Try again later.", 429);
    const b = readBody(req);
    const { data: j } = await sb.from("hiring_jobs").select("*").eq("slug", clean(b.slug, 60)).maybeSingle();
    if (!j) return sendErr(res, "This job link is not valid.", 404);
    if (phase(j) !== "applying") return sendErr(res, "Applications for this role are closed.");
    const name = clean(b.name, 80), email = clean(b.email, 120).toLowerCase(), whatsapp = clean(b.whatsapp, 25), why = clean(b.why, 1500);
    if (name.length < 2) return sendErr(res, "Enter your full name.");
    if (!EMAIL_RE.test(email)) return sendErr(res, "Enter a valid email address.");
    if (whatsapp.replace(/\D/g, "").length < 10) return sendErr(res, "Enter a valid WhatsApp number.");
    if (why.length < 30) return sendErr(res, "Tell us a little more about why we should choose you (at least a couple of sentences).");
    if (b.accept !== true) return sendErr(res, `Please confirm that you accept the ${j.commission_pct}% commission.`);
    const { data: ex } = await sb.from("hiring_applications").select("id").eq("job_id", j.id).eq("email", email).maybeSingle();
    if (ex) return sendErr(res, "You have already applied with this email.");
    // Optional CV (PDF / Word, up to 2.5 MB), stored privately
    let cvPath = "", cvName = "";
    const token = newToken();
    if (b.cv && b.cv.data) {
      const ext = (String(b.cv.name || "").toLowerCase().match(/\.(pdf|docx?)$/) || [])[1];
      if (!ext) return sendErr(res, "Upload your CV as a PDF or Word file.");
      let buf;
      try { buf = Buffer.from(String(b.cv.data), "base64"); } catch { return sendErr(res, "That CV file could not be read."); }
      if (!buf.length || buf.length > 2.5 * 1024 * 1024) return sendErr(res, "Your CV must be smaller than 2.5 MB.");
      const head = buf.subarray(0, 4).toString("latin1");
      const okMagic = ext === "pdf" ? head === "%PDF" : (head.startsWith("PK") || buf.subarray(0, 4).toString("hex") === "d0cf11e0");
      if (!okMagic) return sendErr(res, "That file does not look like a real PDF or Word document.");
      cvPath = `${j.id}/${token}.${ext}`; cvName = clean(b.cv.name, 120).replace(/[^\w .()\-]/g, "_");
      const up = await sb.storage.from("hiring-cvs").upload(cvPath, buf, { contentType: ext === "pdf" ? "application/pdf" : ext === "docx" ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/msword", upsert: true });
      if (up.error) { console.error("[hiring] cv upload", up.error.message); return sendErr(res, "Could not upload your CV. Try again, or apply without it.", 500); }
    }
    const { error } = await sb.from("hiring_applications").insert({ job_id: j.id, name, email, whatsapp, why, accepts_commission: true, token, cv_path: cvPath, cv_name: cvName });
    if (error) return sendErr(res, "Could not save your application. Try again.", 500);
    await sendWithCopy(email, `We received your application: ${j.title}`, applicationReceivedEmail({ name, job: j }));
    return sendOk(res, { message: "Application received. Check your email for what happens next." });
  }

  if (op === "research") {
    const t = clean(req.query.t || readBody(req).t, 60);
    const { data: a } = await sb.from("hiring_applications").select("*").eq("token", t).maybeSingle();
    if (!a) return sendErr(res, "This link is not valid.", 404);
    const { data: j } = await sb.from("hiring_jobs").select("*").eq("id", a.job_id).maybeSingle();
    if (!j) return sendErr(res, "This role no longer exists.", 404);
    const closed = !!(j.research_deadline && new Date(j.research_deadline).getTime() <= Date.now());
    if (req.method === "GET") {
      return sendOk(res, { name: a.name, status: a.status, job: { title: j.title, researchDeadline: j.research_deadline, commissionPct: j.commission_pct }, closed, research: a.status === "submitted" || a.status === "approved" || a.status === "joined" ? a.research : "" });
    }
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    if (!["invited", "submitted"].includes(a.status)) return sendErr(res, a.status === "applied" ? "The research stage has not opened for you yet. We will email you." : "You can no longer change this.");
    if (closed) return sendErr(res, "The deadline has passed.");
    const text = clean(readBody(req).text, 8000);
    if (text.length < 300) return sendErr(res, "Write a little more. Aim for at least 300 characters.");
    await sb.from("hiring_applications").update({ research: text, status: "submitted", submitted_at: new Date().toISOString() }).eq("id", a.id);
    await notifyAdmin("New hiring research submitted", `${a.name} sent in their research for ${j.title}.`, { emoji: "📝", heading: "Research submitted", rows: [["Name", a.name], ["Role", j.title]], cta: { label: "Review in admin", url: "https://elitescholars.site/admin" } });
    return sendOk(res, { message: "Received. We will email you after we have read everything." });
  }

  // ───────────── admin ─────────────
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const who = adminFromToken(token);
  if (!who) return sendErr(res, "Session expired. Please sign in again.", 401);
  if (!(who.owner || (who.perms || []).includes("partners"))) return sendErr(res, "You don't have access to that.", 403);
  const b = req.method === "POST" ? readBody(req) : {};

  if (op === "admin-list") {
    await processDue(sb);
    const [{ data: jobs }, { data: apps }] = await Promise.all([
      sb.from("hiring_jobs").select("*").order("created_at", { ascending: false }),
      sb.from("hiring_applications").select("id,job_id,name,email,whatsapp,why,accepts_commission,status,research,cv_name,invited_at,submitted_at,approved_at,created_at").order("created_at", { ascending: false }).limit(1500),
    ]);
    return sendOk(res, { jobs: jobs || [], applications: apps || [], now: new Date().toISOString() });
  }

  if (op === "admin-save") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const title = clean(b.title, 80);
    if (title.length < 3) return sendErr(res, "Give the job a title.");
    const groupUrl = clean(b.group_url, 300);
    if (groupUrl && !URL_RE.test(groupUrl)) return sendErr(res, "The group chat link must start with https://");
    const pct = Math.min(90, Math.max(1, Math.round(Number(b.commission_pct) || 40)));
    const row = {
      title, description: clean(b.description, 3000), commission_pct: pct, open: b.open !== false,
      apply_deadline: isoOrNull(b.apply_deadline), research_deadline: isoOrNull(b.research_deadline),
      auto_email: b.auto_email !== false, auto_approve: !!b.auto_approve, group_url: groupUrl,
    };
    if (row.apply_deadline && row.research_deadline && row.research_deadline <= row.apply_deadline) return sendErr(res, "The research deadline must be after the application deadline.");
    if (b.id) {
      const upd = { ...row };
      // changing a deadline re-arms the automatic step for it
      const { data: old } = await sb.from("hiring_jobs").select("apply_deadline,research_deadline").eq("id", b.id).maybeSingle();
      if (old && old.apply_deadline !== row.apply_deadline) upd.invites_sent_at = null;
      if (old && old.research_deadline !== row.research_deadline) upd.approvals_run_at = null;
      const { error } = await sb.from("hiring_jobs").update(upd).eq("id", b.id);
      if (error) return sendErr(res, "Could not save.", 500);
      return sendOk(res, { message: "Saved." });
    }
    let slug = slugify(b.slug) || slugify(title) || "job";
    for (let i = 0; i < 6; i++) {
      const { error } = await sb.from("hiring_jobs").insert({ ...row, slug });
      if (!error) return sendOk(res, { message: "Job created.", slug });
      if (error.code === "23505") { slug = `${slugify(title).slice(0, 40)}-${newToken().slice(0, 4).toLowerCase().replace(/[^a-z0-9]/g, "x")}`; continue; }
      return sendErr(res, "Could not create the job.", 500);
    }
    return sendErr(res, "Could not create the job.", 500);
  }

  if (op === "admin-delete") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    await sb.from("hiring_jobs").delete().eq("id", clean(b.id, 60));
    return sendOk(res, { message: "Deleted." });
  }

  // job-level actions: send the research brief to everyone now / approve every submission now
  if (op === "admin-job-action") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const { data: j } = await sb.from("hiring_jobs").select("*").eq("id", clean(b.id, 60)).maybeSingle();
    if (!j) return sendErr(res, "Job not found.", 404);
    if (b.action === "invite-all") {
      const { data: apps } = await sb.from("hiring_applications").select("*").eq("job_id", j.id).eq("status", "applied");
      let n = 0; for (const a of apps || []) if (await sendInvite(sb, j, a)) n++;
      await sb.from("hiring_jobs").update({ invites_sent_at: new Date().toISOString() }).eq("id", j.id);
      return sendOk(res, { message: `Research brief sent to ${n} of ${(apps || []).length} applicant(s).` });
    }
    return sendErr(res, "Unknown action.");
  }

  if (op === "admin-cv") {
    const { data: a } = await sb.from("hiring_applications").select("cv_path,cv_name").eq("id", clean(req.query.id || b.id, 60)).maybeSingle();
    if (!a || !a.cv_path) return sendErr(res, "No CV on file.", 404);
    const { data: u, error } = await sb.storage.from("hiring-cvs").createSignedUrl(a.cv_path, 300, { download: a.cv_name || true });
    if (error || !u) return sendErr(res, "Could not open the CV.", 500);
    return sendOk(res, { url: u.signedUrl });
  }

  if (op === "admin-app") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const { data: a } = await sb.from("hiring_applications").select("*").eq("id", clean(b.id, 60)).maybeSingle();
    if (!a) return sendErr(res, "Application not found.", 404);
    const { data: j } = await sb.from("hiring_jobs").select("*").eq("id", a.job_id).maybeSingle();
    if (!j) return sendErr(res, "Job not found.", 404);
    const act = String(b.action || "");
    if (act === "invite") { const ok = await sendInvite(sb, j, a); return sendOk(res, { message: ok ? "Research brief emailed." : "Moved on, but the email could not be sent." }); }
    if (act === "approve") { const ok = await sendApproval(sb, j, a); return sendOk(res, { message: ok ? "Approved. They were emailed the partner signup link and group chat." : "Approved, but the email could not be sent." }); }
    if (act === "reject") {
      await sb.from("hiring_applications").update({ status: "rejected" }).eq("id", a.id);
      if (b.email !== false) await sendWithCopy(a.email, `Update on your ${j.title} application`, rejectedEmail({ name: a.name, job: j }));
      return sendOk(res, { message: "Marked as not taken forward." });
    }
    if (act === "reset") { await sb.from("hiring_applications").update({ status: "applied" }).eq("id", a.id); return sendOk(res, { message: "Moved back to applied." }); }
    return sendErr(res, "Unknown action.");
  }

  return sendErr(res, "Unknown operation.", 404);
}
