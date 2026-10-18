// /api/entitlement/get (GET)   /api/entitlement/use (POST { kind, ref })
// Tells the app what this student may do, and counts free-tier usage on the server
// so clearing the browser doesn't reset the limits.
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase } from "../_helpers/supabase.js";
import { getAccessConfig, entitlementFor, KINDS, lagosDay } from "../_helpers/access.js";

async function usageFor(sb, email, cfg) {
  const day = lagosDay();
  const { data } = await sb.from("usage_counters").select("kind,period,count").eq("email", email).in("period", [day, "lifetime"]);
  const out = {};
  for (const [kind, meta] of Object.entries(KINDS)) {
    const row = (data || []).find((r) => r.kind === kind && r.period === (meta.daily ? day : "lifetime"));
    out[meta.key] = { used: row?.count || 0, limit: cfg.limits[meta.key] };
  }
  return out;
}

async function profileRow(sb, email) {
  const { data } = await sb.from("profiles")
    .select("is_premium,expires_at,trial_ends_at,free_access_until,free_access_forever").eq("email", email).maybeSingle();
  return data;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  const op = req.query.op;
  const email = await requireUser(req, res);
  if (!email) return;
  if (!(await rateLimitOk(req, res, "ent", 120, 60, email))) return;
  const sb = getSupabase();
  const cfg = await getAccessConfig();
  const row = await profileRow(sb, email);
  const ent = entitlementFor(row, cfg);

  if (op === "get") {
    if (req.method !== "GET") return sendMethodNotAllowed(res);
    return sendOk(res, { entitlement: ent, limits: cfg.limits, usage: ent.unlimited ? null : await usageFor(sb, email, cfg), day: lagosDay() });
  }

  if (op === "use") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const b = readBody(req);
    const meta = KINDS[b.kind];
    if (!meta) return sendErr(res, "Unknown kind.");
    if (ent.unlimited) return sendOk(res, { allowed: true, unlimited: true, tier: ent.tier });

    const ref = String(b.ref || "").slice(0, 120);
    const limit = cfg.limits[meta.key];
    const period = meta.daily ? lagosDay() : "lifetime";
    const { data: cur } = await sb.from("usage_counters").select("count,refs").eq("email", email).eq("kind", b.kind).eq("period", period).maybeSingle();
    const count = cur?.count || 0;
    const refs = Array.isArray(cur?.refs) ? cur.refs : [];

    // Reopening something already counted today (same topic, same file) is free.
    if (ref && refs.includes(ref)) return sendOk(res, { allowed: true, used: count, limit, repeat: true });

    if (count >= limit) {
      return res.status(403).json({ success: false, code: "LIMIT", kind: b.kind, used: count, limit, daily: meta.daily });
    }
    const next = ref ? [...refs, ref].slice(-200) : refs;
    await sb.from("usage_counters").upsert(
      { email, kind: b.kind, period, count: count + 1, refs: next, updated_at: new Date().toISOString() },
      { onConflict: "email,kind,period" }
    );
    return sendOk(res, { allowed: true, used: count + 1, limit });
  }
  return sendErr(res, "Unknown op.");
}
