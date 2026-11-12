// Hiring: /api/hire/{job,apply,research} (public) and /api/admin/hiring{,-save,-delete,-app,-job-action} (admin, perm: partners)
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { checkRateLimit } from "../_helpers/rateLimit.js";
import { adminFromToken } from "./admin.js";
import { sendHtml, notifyAdmin } from "../_helpers/mail.js";
import { VIDEO_TOPICS, VIDEO_DIRECTION, BRAND_ASSETS, isVideoJob, onGroupClick, newToken, processDue, sendInvite, sendApproval, rejectedEmail, applicationReceivedEmail, sendWithCopy, logEvent } from "../_helpers/hiring.js";

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
const pubJob = (j) => ({ slug: j.slug, title: j.title, description: j.description, commissionPct: j.commission_pct, applyDeadline: j.apply_deadline, phase: phase(j), kind: j.kind || "promoter", taskHours: j.task_duration_h || 48 });
const VIDEO_BUCKET = "hiring-videos";
const MAX_VIDEO = 100 * 1024 * 1024;
const THUMB_EXT = /\.(jpe?g|png|webp)$/i;

export default async function handler(req, res) {
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!supabaseEnabled()) return sendErr(res, "Not configured yet.", 503);
  const sb = getSupabase();
  const op = String(req.query.op || "");

  // ───────────── public ─────────────
  if (op === "job") {
    let { data: j } = await sb.from("hiring_jobs").select("*").eq("slug", clean(req.query.slug, 60)).maybeSingle();
    if (!j) return sendErr(res, "This job link is not valid.", 404);
    // The timer starts the first time anyone opens the link, so nothing needs doing by hand.
    if (!j.opened_at) {
      const now = new Date();
      const upd = { opened_at: now.toISOString() };
      if (j.apply_duration_h) {
        upd.apply_deadline = new Date(now.getTime() + j.apply_duration_h * 3600000).toISOString();
        if (j.research_duration_h) upd.research_deadline = new Date(new Date(upd.apply_deadline).getTime() + j.research_duration_h * 3600000).toISOString();
      }
      const claim = await sb.from("hiring_jobs").update(upd).eq("id", j.id).is("opened_at", null).select("*");
      if (claim.data && claim.data.length) {
        j = claim.data[0];
        await logEvent(sb, j.id, null, "link_opened", j.apply_deadline ? `Link opened for the first time. Timer started: applications close ${new Date(j.apply_deadline).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Lagos" })}` : "Link opened for the first time");
      } else { const again = await sb.from("hiring_jobs").select("*").eq("id", j.id).maybeSingle(); if (again.data) j = again.data; }
    }
    if (String(req.query.f) === "1") await logEvent(sb, j.id, null, "view", "Page viewed");
    return sendOk(res, { job: pubJob(j) });
  }

  // Tracked links from the emails: ?to=signup → partner signup, otherwise the team group chat.
  if (op === "go") {
    const t = clean(req.query.t, 60);
    const bot = /bot|crawl|spider|preview|scanner|curl|facebookexternalhit|slurp/i.test(String(req.headers["user-agent"] || ""));
    const { data: a } = await sb.from("hiring_applications").select("*").eq("token", t).maybeSingle();
    const go = (url) => { res.statusCode = 302; res.setHeader("Location", url); res.end(); };
    if (!a) return go("https://elitescholars.site/");
    const { data: j } = await sb.from("hiring_jobs").select("*").eq("id", a.job_id).maybeSingle();
    if (String(req.query.to) === "signup") {
      if (!bot && j && !a.signup_clicked_at) {
        await sb.from("hiring_applications").update({ signup_clicked_at: new Date().toISOString() }).eq("id", a.id);
        await logEvent(sb, j.id, a.id, "signup_click", `${a.name} opened the partner signup link`);
      }
      return go(`https://elitescholars.site/partner?hire=${encodeURIComponent(a.token)}`);
    }
    if (!j || !j.group_url) return go(j && isVideoJob(j) ? "https://elitescholars.site/" : "https://elitescholars.site/partner");
    if (isVideoJob(j)) {
      const expired = a.status === "expired" || (!a.group_clicked_at && a.group_deadline_at && new Date(a.group_deadline_at).getTime() < Date.now());
      if (expired) { res.statusCode = 410; res.setHeader("Content-Type", "text/html; charset=utf-8"); return res.end("<!doctype html><meta name=viewport content='width=device-width,initial-scale=1'><body style='font-family:sans-serif;text-align:center;padding:48px 20px;color:#1B0A47'><h1>This invitation has expired</h1><p>The time to join the group has passed.</p><p><a href='https://elitescholars.site/'>Go to EliteScholars</a></p>"); }
      if (!["approved", "joined"].includes(a.status)) return go("https://elitescholars.site/");
      if (!bot) await onGroupClick(sb, j, a);
      return go(j.group_url);
    }
    if (!bot && ["joined"].includes(a.status)) await onGroupClick(sb, j, a);
    return go(j.group_url);
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
    if (b.accept !== true) return sendErr(res, isVideoJob(j) ? "Please confirm that you understand this is a volunteer (unpaid) role." : `Please confirm that you accept the ${j.commission_pct}% commission.`);
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
    const { error } = await sb.from("hiring_applications").insert({ job_id: j.id, name, email, whatsapp, why, accepts_commission: !isVideoJob(j), token, cv_path: cvPath, cv_name: cvName });
    if (error) return sendErr(res, "Could not save your application. Try again.", 500);
    { const { data: na } = await sb.from("hiring_applications").select("id").eq("job_id", j.id).eq("email", email).maybeSingle(); await logEvent(sb, j.id, na && na.id, "apply", `${name} applied${cvName ? " (CV attached)" : ""}`); }
    // Automatic: the research task goes out straight away (no waiting for the deadline) when auto-email is on.
    const { data: na2 } = await sb.from("hiring_applications").select("*").eq("job_id", j.id).eq("email", email).maybeSingle();
    if (j.auto_email && na2) {
      const sent = await sendInvite(sb, j, na2);
      return sendOk(res, { message: sent ? "Application received. We have emailed you your research task. Check your inbox and spam folder." : "Application received. Check your email for what happens next.", taskSent: !!sent });
    }
    await sendWithCopy(email, `We received your application: ${j.title}`, applicationReceivedEmail({ name, job: j }));
    return sendOk(res, { message: "Application received. Check your email for what happens next." });
  }

  if (op === "research") {
    const t = clean(req.query.t || readBody(req).t, 60);
    const { data: a } = await sb.from("hiring_applications").select("*").eq("token", t).maybeSingle();
    if (!a) return sendErr(res, "This link is not valid.", 404);
    const { data: j } = await sb.from("hiring_jobs").select("*").eq("id", a.job_id).maybeSingle();
    if (!j) return sendErr(res, "This role no longer exists.", 404);
    const video = isVideoJob(j);
    const closed = video ? (a.status === "expired" || !!(a.task_due_at && new Date(a.task_due_at).getTime() <= Date.now())) : !!(j.research_deadline && new Date(j.research_deadline).getTime() <= Date.now());
    if (video && req.method === "GET") {
      return sendOk(res, { kind: "video_editor", name: a.name, status: a.status, closed, job: { title: j.title }, dueAt: a.task_due_at, topic: a.topic || "", videoName: a.video_name || "", groupDeadline: a.group_deadline_at,
        brief: { topics: VIDEO_TOPICS, direction: VIDEO_DIRECTION, assets: BRAND_ASSETS.map((x) => ({ label: x.label, url: x.url, bg: x.bg })) } });
    }
    if (video && op === "research" && req.method === "POST") return sendErr(res, "Use the upload page to send your video.");
    if (req.method === "GET") {
      return sendOk(res, { kind: "promoter", name: a.name, status: a.status, job: { title: j.title, researchDeadline: j.research_deadline, commissionPct: j.commission_pct }, closed, research: a.status === "submitted" || a.status === "approved" || a.status === "joined" ? a.research : "" });
    }
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    if (!["invited", "submitted"].includes(a.status)) return sendErr(res, a.status === "applied" ? "The research stage has not opened for you yet. We will email you." : "You can no longer change this.");
    if (closed) return sendErr(res, "The deadline has passed.");
    const text = clean(readBody(req).text, 8000);
    if (text.length < 300) return sendErr(res, "Write a little more. Aim for at least 300 characters.");
    await sb.from("hiring_applications").update({ research: text, status: "submitted", submitted_at: new Date().toISOString() }).eq("id", a.id);
    await logEvent(sb, j.id, a.id, "research", `${a.name} ${a.status === "submitted" ? "updated" : "submitted"} their research`);
    await notifyAdmin("New hiring research submitted", `${a.name} sent in their research for ${j.title}.`, { emoji: "📝", heading: "Research submitted", rows: [["Name", a.name], ["Role", j.title]], cta: { label: "Review in admin", url: "https://elitescholars.site/admin" } });
    return sendOk(res, { message: "Received. We will email you after we have read everything." });
  }

  // Volunteer video: the file goes straight to private storage through signed upload links (the video is too big for a normal request).
  if (op === "upload-url" || op === "video-submit") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const bb = readBody(req);
    const t = clean(bb.t, 60);
    const { data: a } = await sb.from("hiring_applications").select("*").eq("token", t).maybeSingle();
    if (!a) return sendErr(res, "This link is not valid.", 404);
    const { data: j } = await sb.from("hiring_jobs").select("*").eq("id", a.job_id).maybeSingle();
    if (!j || !isVideoJob(j)) return sendErr(res, "This link is not valid.", 404);
    if (!["invited", "submitted"].includes(a.status)) return sendErr(res, "You can no longer send a video.");
    if (a.task_due_at && new Date(a.task_due_at).getTime() <= Date.now()) return sendErr(res, "The deadline has passed.");
    const vPath = `${a.job_id}/${a.token}-video.mp4`;
    const tExt = ((String(bb.thumbName || "").toLowerCase().match(THUMB_EXT) || [])[1] || "jpg").toLowerCase().replace("jpeg", "jpg");
    const tPath = `${a.job_id}/${a.token}-thumb.${tExt}`;
    if (op === "upload-url") {
      if (!/\.mp4$/i.test(String(bb.videoName || ""))) return sendErr(res, "Only MP4 videos are accepted.");
      if (!THUMB_EXT.test(String(bb.thumbName || ""))) return sendErr(res, "Add your thumbnail as a JPG, PNG or WEBP image.");
      const [v, th] = await Promise.all([
        sb.storage.from(VIDEO_BUCKET).createSignedUploadUrl(vPath, { upsert: true }),
        sb.storage.from(VIDEO_BUCKET).createSignedUploadUrl(tPath, { upsert: true }),
      ]);
      if (v.error || th.error) { console.error("[hiring] upload url", (v.error || th.error).message); return sendErr(res, "Could not start the upload. Try again.", 500); }
      return sendOk(res, { video: v.data.signedUrl, thumb: th.data.signedUrl, thumbExt: tExt });
    }
    // video-submit: check both files really arrived and the video is within the limit, then record the submission
    const topic = clean(bb.topic, 160);
    if (!VIDEO_TOPICS.includes(topic)) return sendErr(res, "Choose the topic you made your video about.");
    const info = async (path) => {
      const dir = path.split("/")[0], file = path.split("/")[1];
      const { data: ls } = await sb.storage.from(VIDEO_BUCKET).list(dir, { search: file, limit: 5 });
      return (ls || []).find((x) => x.name === file) || null;
    };
    const [vi, ti] = await Promise.all([info(vPath), info(tPath)]);
    const size = vi && vi.metadata ? Number(vi.metadata.size) : 0;
    if (!vi || !size) return sendErr(res, "We did not receive your video. Please upload it again.");
    if (size > MAX_VIDEO) { await sb.storage.from(VIDEO_BUCKET).remove([vPath]); return sendErr(res, "That video is larger than 100 MB. Please compress it, then upload it again."); }
    if (!ti) return sendErr(res, "We did not receive your thumbnail. Please upload it again.");
    const first = a.status !== "submitted";
    await sb.from("hiring_applications").update({ status: "submitted", submitted_at: new Date().toISOString(), video_path: vPath, thumb_path: tPath, video_name: clean(bb.videoName, 120).replace(/[^\w .()\-]/g, "_"), video_size: size, topic }).eq("id", a.id);
    await logEvent(sb, j.id, a.id, "research", `${a.name} ${first ? "submitted" : "re-submitted"} their video`);
    await notifyAdmin("New volunteer video submitted", `${a.name} sent in their video for ${j.title}.`, { emoji: "🎬", heading: "Video submitted", rows: [["Name", a.name], ["Role", j.title], ["Topic", topic]], cta: { label: "Watch it in admin", url: "https://elitescholars.site/admin" } });
    if (j.auto_approve && first) await sendApproval(sb, j, { ...a, status: "submitted" });
    return sendOk(res, { message: j.auto_approve ? "Received. Check your email for what happens next." : "Received. We will watch it and email you." });
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
      sb.from("hiring_applications").select("id,job_id,name,email,whatsapp,why,accepts_commission,status,research,cv_name,invited_at,submitted_at,approved_at,joined_at,group_sent_at,group_clicked_at,welcomed_at,signup_clicked_at,task_due_at,group_deadline_at,topic,video_name,video_size,created_at").order("created_at", { ascending: false }).limit(1500),
    ]);
    const since = new Date(Date.now() - 60 * 86400000).toISOString();
    const [{ data: evs }, { data: vws }] = await Promise.all([
      sb.from("hiring_events").select("id,job_id,app_id,type,text,created_at").neq("type", "view").order("created_at", { ascending: false }).limit(400),
      sb.from("hiring_events").select("job_id,created_at").eq("type", "view").gte("created_at", since).order("created_at", { ascending: false }).limit(5000),
    ]);
    const views = {};
    for (const v of vws || []) { const o = (views[v.job_id] = views[v.job_id] || { total: 0, byDay: {} }); o.total++; const d = String(v.created_at).slice(0, 10); o.byDay[d] = (o.byDay[d] || 0) + 1; }
    return sendOk(res, { jobs: jobs || [], applications: apps || [], events: evs || [], views, now: new Date().toISOString() });
  }

  if (op === "admin-save") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const title = clean(b.title, 80);
    if (title.length < 3) return sendErr(res, "Give the job a title.");
    const groupUrl = clean(b.group_url, 300);
    if (groupUrl && !URL_RE.test(groupUrl)) return sendErr(res, "The group chat link must start with https://");
    const pct = b.kind === "video_editor" ? 0 : Math.min(90, Math.max(1, Math.round(Number(b.commission_pct) || 40)));
    const durH = (v) => { const n = Math.round(Number(v)); return Number.isFinite(n) && n > 0 && n <= 24 * 365 ? n : null; };
    const row = {
      apply_duration_h: durH(b.apply_duration_h), research_duration_h: durH(b.research_duration_h),
      kind: b.kind === "video_editor" ? "video_editor" : "promoter", task_duration_h: durH(b.task_duration_h), join_duration_h: durH(b.join_duration_h),
      title, description: clean(b.description, 3000), commission_pct: pct, open: b.open !== false,
      apply_deadline: isoOrNull(b.apply_deadline), research_deadline: isoOrNull(b.research_deadline),
      auto_email: b.auto_email !== false, auto_approve: !!b.auto_approve, group_url: groupUrl,
    };
    if (row.kind === "video_editor") { row.research_deadline = null; row.research_duration_h = null; row.task_duration_h = row.task_duration_h || 48; row.join_duration_h = row.join_duration_h || 48; }
    if (row.apply_deadline && row.research_deadline && row.research_deadline <= row.apply_deadline) return sendErr(res, "The research deadline must be after the application deadline.");
    // timer mode: the deadlines are worked out from the moment the link is first opened
    if (row.apply_duration_h) { row.apply_deadline = null; row.research_deadline = null; } else row.research_duration_h = null;
    if (b.id) {
      const upd = { ...row };
      if (row.apply_duration_h) {
        const { data: cur } = await sb.from("hiring_jobs").select("opened_at").eq("id", b.id).maybeSingle();
        if (cur && cur.opened_at) {
          upd.apply_deadline = new Date(new Date(cur.opened_at).getTime() + row.apply_duration_h * 3600000).toISOString();
          if (row.research_duration_h) upd.research_deadline = new Date(new Date(upd.apply_deadline).getTime() + row.research_duration_h * 3600000).toISOString();
        }
      }
      // changing a deadline re-arms the automatic step for it
      const { data: old } = await sb.from("hiring_jobs").select("apply_deadline,research_deadline").eq("id", b.id).maybeSingle();
      if (old && old.apply_deadline !== row.apply_deadline) upd.invites_sent_at = null;
      if (old && old.research_deadline !== row.research_deadline) upd.approvals_run_at = null;
      const { error } = await sb.from("hiring_jobs").update(upd).eq("id", b.id);
      if (error) return sendErr(res, "Could not save.", 500);
      await logEvent(sb, b.id, null, "job", `Job "${title}" edited`);
      return sendOk(res, { message: "Saved." });
    }
    let slug = slugify(b.slug) || slugify(title) || "job";
    for (let i = 0; i < 6; i++) {
      const { data: ins, error } = await sb.from("hiring_jobs").insert({ ...row, slug }).select("id").maybeSingle();
      if (!error) { await logEvent(sb, ins && ins.id, null, "job", `Job "${title}" created${row.apply_duration_h ? `. Timer starts when the link is first opened (applications ${row.apply_duration_h}h${row.research_duration_h ? `, research ${row.research_duration_h}h after` : ""})` : ""}`); return sendOk(res, { message: "Job created.", slug }); }
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

  if (op === "admin-video") {
    const { data: a } = await sb.from("hiring_applications").select("video_path,thumb_path,video_name,video_size,topic").eq("id", clean(req.query.id || b.id, 60)).maybeSingle();
    if (!a || !a.video_path) return sendErr(res, "No video on file.", 404);
    const [v, th] = await Promise.all([sb.storage.from(VIDEO_BUCKET).createSignedUrl(a.video_path, 7200), a.thumb_path ? sb.storage.from(VIDEO_BUCKET).createSignedUrl(a.thumb_path, 7200) : Promise.resolve({})]);
    if (v.error || !v.data) return sendErr(res, "Could not open the video.", 500);
    return sendOk(res, { url: v.data.signedUrl, thumb: th.data ? th.data.signedUrl : "", name: a.video_name, size: a.video_size, topic: a.topic });
  }

  if (op === "admin-cv") {
    const { data: a } = await sb.from("hiring_applications").select("cv_path,cv_name").eq("id", clean(req.query.id || b.id, 60)).maybeSingle();
    if (!a || !a.cv_path) return sendErr(res, "No CV on file.", 404);
    const { data: u, error } = await sb.storage.from("hiring-cvs").createSignedUrl(a.cv_path, 3600);
    if (error || !u) return sendErr(res, "Could not open the CV.", 500);
    const kind = /\.pdf$/i.test(a.cv_path) ? "pdf" : "doc";
    return sendOk(res, { url: u.signedUrl, kind, name: a.cv_name || "CV" });
  }

  if (op === "admin-app") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const { data: a } = await sb.from("hiring_applications").select("*").eq("id", clean(b.id, 60)).maybeSingle();
    if (!a) return sendErr(res, "Application not found.", 404);
    const { data: j } = await sb.from("hiring_jobs").select("*").eq("id", a.job_id).maybeSingle();
    if (!j) return sendErr(res, "Job not found.", 404);
    const act = String(b.action || "");
    if (act === "invite") { const ok = await sendInvite(sb, j, a); return sendOk(res, { message: ok ? "Research brief emailed." : "Moved on, but the email could not be sent." }); }
    if (act === "approve") { const ok = await sendApproval(sb, j, a); return sendOk(res, { message: ok ? `Approved. They were emailed ${isVideoJob(j) ? "the group chat link, with a join deadline." : "the partner signup link. The group chat link follows automatically when they register."}` : "Approved, but the email could not be sent." }); }
    if (act === "reject") {
      await sb.from("hiring_applications").update({ status: "rejected" }).eq("id", a.id);
      await logEvent(sb, j.id, a.id, "rejected", `${a.name} not taken forward`);
      if (b.email !== false) await sendWithCopy(a.email, `Update on your ${j.title} application`, rejectedEmail({ name: a.name, job: j }));
      return sendOk(res, { message: "Marked as not taken forward." });
    }
    if (act === "reset") { await sb.from("hiring_applications").update({ status: "applied" }).eq("id", a.id); return sendOk(res, { message: "Moved back to applied." }); }
    return sendErr(res, "Unknown action.");
  }

  return sendErr(res, "Unknown operation.", 404);
}
