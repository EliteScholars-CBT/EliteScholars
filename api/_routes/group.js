// Group plans: the owner who paid manages their members.
//   GET  /api/group/get      -> { groups: [{ id, seats, used, expiresAt, active, members: [{email,name}] }] }
//   POST /api/group/add      { groupId, email }   (the person must already have an EliteScholars account)
//   POST /api/group/remove   { groupId, email }
// Members get Pro until the group's expiry date; removing someone ends the Pro that group gave them.
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { requireUser } from "../_helpers/session.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { rateLimitOk } from "../_helpers/guard.js";
import { GROUP_DEFS } from "../_helpers/plans.js";
import { grantScope } from "../_helpers/premium.js";

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
    out.push({ id: g.id, seats: g.seats, scope: (GROUP_DEFS[g.plan] || GROUP_DEFS.group50).scope, label: (GROUP_DEFS[g.plan] || GROUP_DEFS.group50).label, used: emails.length, expiresAt: g.expires_at, active: new Date(g.expires_at) > new Date(), members: emails.map((e) => ({ email: e, name: names[e] || "" })) });
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
  const { data: g } = await sb.from("group_plans").select("id,seats,plan,expires_at,owner_email").eq("id", String(b.groupId || "")).maybeSingle();
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
    // Pro for this squad's exam only; never shortens time the person already has
    const gd = GROUP_DEFS[g.plan] || GROUP_DEFS.group50;
    const gr = await grantScope(sb, target, gd.scope, g.expires_at, tag(g.id));
    if (gr.error && (!p.expires_at || new Date(p.expires_at) < new Date(g.expires_at))) {
      await sb.from("profiles").update({ is_premium: true, subscription_plan: "annual", subscribed_at: new Date().toISOString(), expires_at: g.expires_at, subscription_tx_ref: tag(g.id) }).eq("email", target);
    }
    return sendOk(res, { groups: await load(sb, email) });
  }
  if (op === "remove") {
    await sb.from("group_members").delete().eq("group_id", g.id).eq("email", target);
    // end only the Pro this group gave them (that exam only)
    const gd = GROUP_DEFS[g.plan] || GROUP_DEFS.group50;
    const { data: pr } = await sb.from("profiles").select("pro_exams,pro_all_until,subscription_tx_ref").eq("email", target).maybeSingle();
    if (pr && pr.subscription_tx_ref === tag(g.id)) {
      const exams = { ...(pr.pro_exams || {}) };
      if (exams[gd.scope] && new Date(exams[gd.scope]).getTime() === new Date(g.expires_at).getTime()) delete exams[gd.scope];
      const now = Date.now();
      const rest = Object.values(exams).some((x) => new Date(x).getTime() > now) || (pr.pro_all_until && new Date(pr.pro_all_until).getTime() > now);
      const upd = { pro_exams: exams };
      if (!rest) { upd.is_premium = false; upd.expires_at = new Date().toISOString(); }
      await sb.from("profiles").update(upd).eq("email", target);
    }
    return sendOk(res, { groups: await load(sb, email) });
  }
  return sendErr(res, "Unknown action.");
}
