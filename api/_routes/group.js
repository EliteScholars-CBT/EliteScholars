// Group plans: the owner who paid manages their members.
//   GET  /api/group/get      -> { groups: [{ id, seats, used, expiresAt, active, members: [{email,name}] }] }
//   POST /api/group/add      { groupId, email }   (the person must already have an EliteScholars account)
//   POST /api/group/remove   { groupId, email }
// Members get Pro until the group's expiry date; removing someone ends the Pro that group gave them.
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { rateLimitOk } from "../_helpers/guard.js";

const tag = (id) => `group:${id}`;

async function load(sb, owner) {
  const { data: gs } = await sb.from("group_plans").select("id,seats,plan,expires_at,created_at").eq("owner_email", owner).order("created_at", { ascending: false });
  const out = [];
  for (const g of gs || []) {
    const { data: ms } = await sb.from("group_members").select("email").eq("group_id", g.id).order("created_at", { ascending: true });
    const emails = (ms || []).map((m) => m.email);
    let names = {};
    if (emails.length) {
      const { data: ps } = await sb.from("profiles").select("email,first_name").in("email", emails);
      names = Object.fromEntries((ps || []).map((p) => [p.email, p.first_name || ""]));
    }
    out.push({ id: g.id, seats: g.seats, used: emails.length, expiresAt: g.expires_at, active: new Date(g.expires_at) > new Date(), members: emails.map((e) => ({ email: e, name: names[e] || "" })) });
  }
  return out;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (!supabaseEnabled()) return sendErr(res, "Not configured.", 503);
  const email = await requireUser(req, res);
  if (!email) return;
  const sb = getSupabase();
  const op = String(req.query.op || "get");

  if (op === "get") {
    if (req.method !== "GET") return sendMethodNotAllowed(res);
    return sendOk(res, { groups: await load(sb, email) });
  }
  if (req.method !== "POST") return sendMethodNotAllowed(res);
  if (!(await rateLimitOk(req, res, "groupops", 60, 3600, email))) return;
  const b = readBody(req);
  const target = String(b.email || "").toLowerCase().trim();
  const { data: g } = await sb.from("group_plans").select("id,seats,expires_at,owner_email").eq("id", String(b.groupId || "")).maybeSingle();
  if (!g || g.owner_email !== email) return sendErr(res, "That group is not yours.", 403);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target)) return sendErr(res, "Enter a valid email address.");

  if (op === "add") {
    if (new Date(g.expires_at) <= new Date()) return sendErr(res, "This group plan has expired. Buy a new one to add members.");
    const { count } = await sb.from("group_members").select("id", { count: "exact", head: true }).eq("group_id", g.id);
    if ((count || 0) >= g.seats) return sendErr(res, `All ${g.seats} seats are used. Remove someone first.`);
    const { data: ex } = await sb.from("group_members").select("id").eq("group_id", g.id).eq("email", target).maybeSingle();
    if (ex) return sendErr(res, "They are already in your group.");
    const { data: p } = await sb.from("profiles").select("email,expires_at").eq("email", target).maybeSingle();
    if (!p) return sendErr(res, "No EliteScholars account uses that email yet. Ask them to sign up first, then add them.");
    const { error } = await sb.from("group_members").insert({ group_id: g.id, email: target });
    if (error) return sendErr(res, "Could not add them. Try again.");
    // never shorten a longer plan the person already paid for
    if (!p.expires_at || new Date(p.expires_at) < new Date(g.expires_at)) {
      await sb.from("profiles").update({ is_premium: true, subscription_plan: "annual", subscribed_at: new Date().toISOString(), expires_at: g.expires_at, subscription_tx_ref: tag(g.id) }).eq("email", target);
    }
    return sendOk(res, { groups: await load(sb, email) });
  }
  if (op === "remove") {
    await sb.from("group_members").delete().eq("group_id", g.id).eq("email", target);
    // end only the Pro this group gave them
    await sb.from("profiles").update({ is_premium: false, expires_at: new Date().toISOString() }).eq("email", target).eq("subscription_tx_ref", tag(g.id));
    return sendOk(res, { groups: await load(sb, email) });
  }
  return sendErr(res, "Unknown action.");
}
