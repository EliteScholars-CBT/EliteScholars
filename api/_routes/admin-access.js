// Admin: free limits, trial switch and free-access grants.
// /api/admin/access (GET ?search=)   /api/admin/access-action (POST)
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { tokenOk } from "./admin.js";
import { getAccessConfig, saveAccessConfig, entitlementFor } from "../_helpers/access.js";

const DAY = 86400000;
const isEmail = (s) => /^[^\s@,()"']+@[^\s@,()"']+\.[^\s@,()"']+$/.test(s);
const cleanNote = (s) => String(s || "").slice(0, 200);

function untilFrom(b) {
  if (b.forever) return { forever: true, until: null };
  const days = Math.floor(Number(b.days));
  if (b.until) { const t = new Date(b.until).getTime(); if (Number.isFinite(t) && t > Date.now()) return { forever: false, until: new Date(t).toISOString() }; }
  if (Number.isFinite(days) && days >= 1 && days <= 3650) return { forever: false, until: new Date(Date.now() + days * DAY).toISOString() };
  return null;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!tokenOk(token, "access")) return res.status(401).json({ success: false, error: "Session expired. Please sign in again." });
  if (!supabaseEnabled()) return sendErr(res, "Database not configured.", 503);
  const sb = getSupabase();
  const op = req.query.op;

  try {
    if (op === "access") {
      if (req.method !== "GET") return sendMethodNotAllowed(res);
      const cfg = await getAccessConfig();
      const cols = "email,username,first_name,last_name,created_at,is_premium,expires_at,trial_ends_at,free_access_until,free_access_forever,free_access_note,free_access_granted_at";

      const { data: gifted } = await sb.from("profiles").select(cols).or("free_access_forever.eq.true,free_access_until.not.is.null").limit(500);
      const { data: trials } = await sb.from("profiles").select(cols).not("trial_ends_at", "is", null).limit(500);
      const shape = (r) => {
        const e = entitlementFor(r, { ...cfg, global: { active: false } });
        return {
          email: r.email, name: [r.first_name, r.last_name].filter(Boolean).join(" ") || r.username || "",
          username: r.username || "", joined: r.created_at,
          paid: !!(r.is_premium && r.expires_at && new Date(r.expires_at) > new Date()),
          giftForever: !!r.free_access_forever, giftUntil: r.free_access_until, note: r.free_access_note || "",
          grantedAt: r.free_access_granted_at, trialEndsAt: r.trial_ends_at,
          giftActive: !!(r.free_access_forever || (r.free_access_until && new Date(r.free_access_until) > new Date())),
          trialActive: !!(r.trial_ends_at && new Date(r.trial_ends_at) > new Date()),
          effective: e.tier,
        };
      };
      let found = [];
      const q = String(req.query.search || "").trim().toLowerCase();
      if (q.length >= 2 && !/[,()"']/.test(q)) {
        const { data } = await sb.from("profiles").select(cols).or(`email.ilike.%${q}%,username.ilike.%${q}%`).limit(10);
        found = (data || []).map(shape);
      }
      const g = (gifted || []).map(shape).sort((a, b) => (b.giftForever ? 1 : 0) - (a.giftForever ? 1 : 0) || new Date(a.giftUntil || 0) - new Date(b.giftUntil || 0));
      const t = (trials || []).map(shape).sort((a, b) => new Date(b.trialEndsAt) - new Date(a.trialEndsAt));
      return sendOk(res, {
        config: cfg,
        gifts: g,
        trials: t,
        counts: {
          giftsActive: g.filter((x) => x.giftActive).length,
          trialsActive: t.filter((x) => x.trialActive).length,
          trialsEver: t.length,
        },
        found,
      });
    }

    if (op === "access-action") {
      if (req.method !== "POST") return sendMethodNotAllowed(res);
      const b = readBody(req);
      const cfg = await getAccessConfig();

      if (b.action === "set-config") {
        if (b.trialEnabled !== undefined) cfg.trialEnabled = !!b.trialEnabled;
        if (b.trialDays !== undefined) {
          const d = Math.floor(Number(b.trialDays));
          if (!Number.isFinite(d) || d < 1 || d > 90) return sendErr(res, "Trial length must be 1 to 90 days.");
          cfg.trialDays = d;
        }
        for (const [k, hi, label] of [["sessionMinutes", 600, "Session length (minutes)"], ["cooldownMinutes", 4320, "Cooldown (minutes)"]]) {
          if (b[k] === undefined) continue;
          const n = Math.floor(Number(b[k]));
          if (!Number.isFinite(n) || n < 0 || n > hi) return sendErr(res, `${label} must be 0 to ${hi}.`);
          cfg[k] = n;
        }
        if (b.limits && typeof b.limits === "object") {
          for (const k of ["topics", "cbt", "games", "fileStudy"]) {
            if (b.limits[k] === undefined) continue;
            const n = Math.floor(Number(b.limits[k]));
            if (!Number.isFinite(n) || n < 0 || n > 100) return sendErr(res, `${k} limit must be 0 to 100.`);
            cfg.limits[k] = n;
          }
        }
        await saveAccessConfig(cfg);
        return sendOk(res, { config: cfg });
      }

      if (b.action === "grant") {
        const email = String(b.email || "").toLowerCase().trim();
        if (!isEmail(email)) return sendErr(res, "Valid student email required.");
        const u = untilFrom(b);
        if (!u) return sendErr(res, "Choose a number of days, an end date in the future, or forever.");
        const { data } = await sb.from("profiles").update({
          free_access_forever: u.forever, free_access_until: u.until, free_access_note: cleanNote(b.note), free_access_granted_at: new Date().toISOString(),
        }).eq("email", email).select("email");
        if (!data?.length) return sendErr(res, "No student with that email.", 404);
        return sendOk(res, { email, ...u });
      }

      if (b.action === "revoke") {
        const email = String(b.email || "").toLowerCase().trim();
        if (!isEmail(email)) return sendErr(res, "Valid student email required.");
        const { data } = await sb.from("profiles").update({
          free_access_forever: false, free_access_until: null, free_access_note: null, free_access_granted_at: null,
        }).eq("email", email).select("email");
        if (!data?.length) return sendErr(res, "No student with that email.", 404);
        return sendOk(res, { email });
      }

      if (b.action === "end-trial") {
        const email = String(b.email || "").toLowerCase().trim();
        if (!isEmail(email)) return sendErr(res, "Valid student email required.");
        await sb.from("profiles").update({ trial_ends_at: new Date().toISOString() }).eq("email", email);
        return sendOk(res, { email });
      }

      if (b.action === "grant-all") {
        const u = untilFrom(b);
        if (!u) return sendErr(res, "Choose a number of days, an end date in the future, or forever.");
        cfg.global = { active: true, forever: u.forever, until: u.until, note: cleanNote(b.note) };
        await saveAccessConfig(cfg);
        return sendOk(res, { config: cfg });
      }

      if (b.action === "revoke-all") {
        cfg.global = { active: false, forever: false, until: null, note: "" };
        await saveAccessConfig(cfg);
        return sendOk(res, { config: cfg });
      }
      return sendErr(res, "Unknown action.");
    }
    return sendErr(res, "Unknown op.");
  } catch (e) {
    console.error("[admin-access]", op, e.message);
    return sendErr(res, "Could not complete that.", 500);
  }
}
