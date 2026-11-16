// /api/admin/activity wrapper. Normal calls go straight to admin-ops. With ?squads=1 it returns
// squad NUMBERS only (never chat text): totals, today's messages, busiest squads, per-squad sizes.
import adminOps from "./admin-ops.js";
import { adminFromToken } from "./admin.js";
import { sendOk, sendErr, setCors } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";

export default async function handler(req, res) {
  if (String(req.query.squads || "") !== "1") return adminOps(req, res);
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  const who = adminFromToken((req.headers.authorization || "").replace(/^Bearer\s+/i, ""));
  if (!who) return sendErr(res, "Session expired. Please sign in again.", 401);
  if (!who.owner && !(who.perms || []).includes("students")) return sendErr(res, "You don't have access to that.", 403);
  if (!supabaseEnabled()) return sendErr(res, "Supabase is not configured.", 503);
  try {
    const sb = getSupabase();
    const LAGOS = 3600000, dayStart = new Date(Math.floor((Date.now() + LAGOS) / 86400000) * 86400000 - LAGOS).toISOString();
    const [{ data: sqs }, { data: mem }, { data: today }] = await Promise.all([
      sb.from("squads").select("id,name").limit(2000),
      sb.from("squad_members").select("squad_id,email").limit(20000),
      sb.from("squad_messages").select("squad_id,email").gte("created_at", dayStart).limit(20000),
    ]);
    const size = {}, msgs = {}, per = {}, talkers = new Set(), nm = {};
    for (const s of sqs || []) nm[s.id] = s.name;
    for (const r of mem || []) size[r.squad_id] = (size[r.squad_id] || 0) + 1;
    for (const r of today || []) { msgs[r.squad_id] = (msgs[r.squad_id] || 0) + 1; talkers.add(r.email); per[r.email] = (per[r.email] || 0) + 1; }
    const n = (sqs || []).length;
    return sendOk(res, { squadStats: {
      squads: n, members: new Set((mem || []).map((r) => r.email)).size,
      avgSize: n ? Math.round(((mem || []).length / n) * 10) / 10 : 0,
      messagesToday: (today || []).length, chattersToday: talkers.size,
      nearCap: Object.values(per).filter((c) => c >= 90).length,
      top: Object.entries(msgs).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id, c]) => ({ name: nm[id] || "?", messages: c, members: size[id] || 0 })),
    } });
  } catch (e) { console.error("[admin squads]", e && e.message); return sendErr(res, "Could not load squad numbers.", 500); }
}
