// /api/admin/activity wrapper. Normal calls go straight to admin-ops. With ?squads=1 it returns
// squad NUMBERS only (never chat text): totals, today's messages, busiest squads, per-squad sizes.
// With ?wa=1 it returns WhatsApp Channel tap counts and the latest taps.
// With ?contact=list / ?contact=act it serves the contact-page messages.
import adminOps from "./admin-ops.js";
import { adminFromToken } from "./admin.js";
import { sendOk, sendErr, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";

export default async function handler(req, res) {
  const wantSquads = String(req.query.squads || "") === "1", wantWa = String(req.query.wa || "") === "1";
  const contactOp = String(req.query.contact || "");
  if (!wantSquads && !wantWa && !contactOp) return adminOps(req, res);
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  const who = adminFromToken((req.headers.authorization || "").replace(/^Bearer\s+/i, ""));
  if (!who) return sendErr(res, "Session expired. Please sign in again.", 401);
  if (!who.owner && !(who.perms || []).includes("students")) return sendErr(res, "You don't have access to that.", 403);
  if (!supabaseEnabled()) return sendErr(res, "Supabase is not configured.", 503);
  if (contactOp) {
    try {
      const sb = getSupabase();
      if (contactOp === "act") {
        if (req.method !== "POST") return sendErr(res, "POST only.", 405);
        const b = readBody(req), id = String(b.id || "");
        if (!/^[0-9a-f-]{36}$/i.test(id)) return sendErr(res, "Bad id.");
        if (b.status === "delete") await sb.from("contact_messages").delete().eq("id", id);
        else if (["new", "read", "done"].includes(b.status)) await sb.from("contact_messages").update({ status: b.status }).eq("id", id);
        else return sendErr(res, "Bad status.");
        return sendOk(res, {});
      }
      const { data } = await sb.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(200);
      const rows = data || [];
      return sendOk(res, { contact: { unread: rows.filter((r) => r.status === "new").length, rows } });
    } catch (e) { console.error("[admin contact]", e && e.message); return sendErr(res, "Could not load messages.", 500); }
  }
  if (wantWa) {
    try {
      const sb = getSupabase(), D = 86400000;
      const { data } = await sb.from("events").select("email,payload,created_at").eq("type", "whatsapp_channel_click").gte("created_at", new Date(Date.now() - 7 * D).toISOString()).order("created_at", { ascending: false }).limit(500);
      const rows = data || [], now = Date.now();
      const emails = [...new Set(rows.slice(0, 15).map((r) => r.email).filter(Boolean))];
      const nm = {};
      if (emails.length) { const { data: ps } = await sb.from("profiles").select("email,username,first_name").in("email", emails); for (const p of ps || []) nm[p.email] = p.username || p.first_name || p.email.split("@")[0]; }
      return sendOk(res, { wa: {
        last24h: rows.filter((r) => now - new Date(r.created_at).getTime() < D).length, last7d: rows.length,
        signedIn7d: rows.filter((r) => r.email).length, guests7d: rows.filter((r) => !r.email).length,
        recent: rows.slice(0, 15).map((r) => ({ at: r.created_at, who: r.email ? nm[r.email] || r.email.split("@")[0] : "Visitor (not signed in)", where: (r.payload && r.payload.where) || "/" })),
      } });
    } catch (e) { console.error("[admin wa]", e && e.message); return sendErr(res, "Could not load WhatsApp clicks.", 500); }
  }
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
      nearCap: Object.values(per).filter((c) => c >= 450).length,
      top: Object.entries(msgs).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id, c]) => ({ name: nm[id] || "?", messages: c, members: size[id] || 0 })),
    } });
  } catch (e) { console.error("[admin squads]", e && e.message); return sendErr(res, "Could not load squad numbers.", 500); }
}
