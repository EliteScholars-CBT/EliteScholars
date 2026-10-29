// /api/entitlement/get (GET)   /api/entitlement/use (POST { kind, ref })
// Tells the app what this student may do, and counts free-tier usage on the server
// so clearing the browser doesn't reset the limits.
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { getSupabase } from "../_helpers/supabase.js";
import { getAccessConfig, entitlementFor, shareClaimsToday, KINDS, lagosDay } from "../_helpers/access.js";

// Limit = the admin's daily limit + whatever the student earned today by sharing.
const effLimit = (cfg, meta, claims) => cfg.limits[meta.key] + (claims?.[meta.key]?.claims || 0) * cfg.shareBonus.amount;

async function usageFor(sb, email, cfg, claims) {
  const day = lagosDay();
  const { data } = await sb.from("usage_counters").select("kind,period,count").eq("email", email).in("period", [day, "lifetime"]);
  const out = {};
  for (const [kind, meta] of Object.entries(KINDS)) {
    const row = (data || []).find((r) => r.kind === kind && r.period === (meta.daily ? day : "lifetime"));
    out[meta.key] = { used: row?.count || 0, limit: effLimit(cfg, meta, claims) };
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
    const claims = ent.unlimited ? {} : await shareClaimsToday(sb, email);
    const limits = {};
    for (const meta of Object.values(KINDS)) limits[meta.key] = effLimit(cfg, meta, claims);
    const sb2 = cfg.shareBonus;
    const share = { enabled: sb2.enabled, amount: sb2.amount, maxClaims: sb2.maxClaimsPerDay, verifySeconds: sb2.verifySeconds, claims: Object.fromEntries(Object.entries(claims).map(([k, v]) => [k, v.claims])) };
    return sendOk(res, { entitlement: ent, limits, share, session: { minutes: cfg.sessionMinutes, cooldownMinutes: cfg.cooldownMinutes }, usage: ent.unlimited ? null : await usageFor(sb, email, cfg, claims), day: lagosDay() });
  }

  if (op === "use") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const b = readBody(req);
    const meta = KINDS[b.kind];
    if (!meta) return sendErr(res, "Unknown kind.");
    if (ent.unlimited) return sendOk(res, { allowed: true, unlimited: true, tier: ent.tier });

    const ref = String(b.ref || "").slice(0, 120);
    const claims = await shareClaimsToday(sb, email);
    const limit = effLimit(cfg, meta, claims);
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

  // Share to a WhatsApp group, wait the admin's verify time, then claim extra uses for that kind.
  if (op === "share-start" || op === "share-claim") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const b = readBody(req);
    const meta = KINDS[b.kind];
    if (!meta || !meta.daily) return sendErr(res, "Unknown kind.");
    if (ent.unlimited) return sendOk(res, { unlimited: true });
    const sbc = cfg.shareBonus;
    if (!sbc.enabled) return sendErr(res, "Sharing for extra uses is switched off right now.", 403);
    const day = lagosDay();
    const rowKind = `share:${b.kind}`;
    const { data: cur } = await sb.from("usage_counters").select("count,refs").eq("email", email).eq("kind", rowKind).eq("period", day).maybeSingle();
    const claimsMade = cur?.count || 0;
    if (claimsMade >= sbc.maxClaimsPerDay) return res.status(403).json({ success: false, code: "SHARE_MAX", error: "You have used all your share bonuses for today. They come back tomorrow." });
    const save = (count, refs) => sb.from("usage_counters").upsert({ email, kind: rowKind, period: day, count, refs, updated_at: new Date().toISOString() }, { onConflict: "email,kind,period" });

    if (op === "share-start") {
      await save(claimsMade, [Date.now()]);
      return sendOk(res, { verifySeconds: sbc.verifySeconds, amount: sbc.amount });
    }
    const startedAt = Array.isArray(cur?.refs) && cur.refs[0] ? Number(cur.refs[0]) : 0;
    if (!startedAt) return sendErr(res, "Tap Share first, then come back to claim.", 400);
    const waited = (Date.now() - startedAt) / 1000;
    if (waited < sbc.verifySeconds - 1) return res.status(400).json({ success: false, code: "SHARE_WAIT", error: "Give your friends a moment to see it, then claim.", waitSeconds: Math.ceil(sbc.verifySeconds - waited) });
    if (waited > 3600) return sendErr(res, "That share expired. Tap Share again.", 400);
    await save(claimsMade + 1, []);
    return sendOk(res, { granted: sbc.amount, kind: b.kind });
  }
  return sendErr(res, "Unknown op.");
}
