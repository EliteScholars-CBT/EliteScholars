// ============================================================================
// api/_routes/admin-payroll.js — owner-only payroll for the admin dashboard.
//   payroll          GET  ?period=YYYY-MM  → staff, that month's payments, year total
//   payroll-save     POST add / edit a person on payroll
//   payroll-pay      POST mark a person paid for a month (or { undo: true })
//   payroll-delete   POST remove a person (and their payment history)
// ============================================================================
import { sendOk, sendErr, sendMethodNotAllowed, setCors, readBody } from "../_helpers/response.js";
import { getSupabase, supabaseEnabled } from "../_helpers/supabase.js";
import { adminFromToken } from "./admin.js";

const clean = (v, n) => String(v || "").replace(/[\u0000-\u001F]/g, "").trim().slice(0, n);

async function audit(sb, who, action, detail) {
  try { await sb.from("admin_audit").insert({ admin_name: who.name, action, detail: String(detail || "").slice(0, 400) }); } catch { /* best effort */ }
}

export default async function handler(req, res) {
  setCors(res);
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(200).end();
  const op = String(req.query.op || "");
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const who = adminFromToken(token);
  if (!who) return sendErr(res, "Session expired. Please sign in again.", 401);
  if (!who.owner) return sendErr(res, "Only the owner can manage payroll.", 403);
  if (!supabaseEnabled()) return sendErr(res, "Supabase is not configured.", 503);
  const sb = getSupabase();
  const q = req.method === "GET" ? req.query : { ...req.query, ...readBody(req) };
  const b = req.method === "POST" ? readBody(req) : {};

  const money = (v) => { const n = Math.round(Number(v) * 100) / 100; return Number.isFinite(n) && n >= 0 && n < 1e10 ? n : 0; };
  const periodOf = (v) => (/^\d{4}-(0[1-9]|1[0-2])$/.test(String(v || "")) ? String(v) : new Date(Date.now() + 3600000).toISOString().slice(0, 7)); // Lagos is UTC+1
  if (op === "payroll") {
    const period = periodOf(q.period);
    const [st, pay, yr] = await Promise.all([
      sb.from("payroll_staff").select("id,name,role,email,amount,bank_name,account_name,account_number,start_date,active,notes,created_at").order("active", { ascending: false }).order("name"),
      sb.from("payroll_payments").select("id,staff_id,period,amount,bonus,deduction,paid_at,method,note").eq("period", period),
      sb.from("payroll_payments").select("period,amount,bonus,deduction").gte("period", `${period.slice(0, 4)}-01`).lte("period", `${period.slice(0, 4)}-12`),
    ]);
    const yearTotal = (yr.data || []).reduce((a, r) => a + Number(r.amount) + Number(r.bonus) - Number(r.deduction), 0);
    return sendOk(res, { period, staff: st.data || [], payments: pay.data || [], yearTotal });
  }
  if (op === "payroll-save") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const row = {
      name: clean(b.name, 80), role: clean(b.role, 80), email: clean(b.email, 120).toLowerCase(),
      amount: money(b.amount), bank_name: clean(b.bank_name, 60), account_name: clean(b.account_name, 80),
      account_number: clean(b.account_number, 20).replace(/[^0-9A-Za-z-]/g, ""), notes: clean(b.notes, 300),
      start_date: /^\d{4}-\d{2}-\d{2}$/.test(String(b.start_date || "")) ? String(b.start_date) : null,
    };
    if (row.name.length < 2) return sendErr(res, "Enter the person's name.");
    if (typeof b.active === "boolean") row.active = b.active;
    if (b.id) {
      const { data, error } = await sb.from("payroll_staff").update(row).eq("id", String(b.id)).select("id,name");
      if (error || !(data || []).length) return sendErr(res, "Could not update that person.");
      await audit(sb, who, "payroll.staff.update", row.name);
      return sendOk(res, {});
    }
    const { error } = await sb.from("payroll_staff").insert(row);
    if (error) return sendErr(res, "Could not add that person.");
    await audit(sb, who, "payroll.staff.add", row.name);
    return sendOk(res, {});
  }
  if (op === "payroll-pay") {
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    const staffId = String(b.staffId || ""), period = periodOf(b.period);
    const { data: sd } = await sb.from("payroll_staff").select("id,name,amount").eq("id", staffId).limit(1);
    if (!(sd || []).length) return sendErr(res, "Person not found.", 404);
    if (b.undo) {
      await sb.from("payroll_payments").delete().eq("staff_id", staffId).eq("period", period);
      await audit(sb, who, "payroll.unpay", `${sd[0].name} ${period}`);
      return sendOk(res, {});
    }
    const row = { staff_id: staffId, period, amount: b.amount === undefined || b.amount === "" ? Number(sd[0].amount) : money(b.amount), bonus: money(b.bonus), deduction: money(b.deduction), method: clean(b.method, 40), note: clean(b.note, 200), paid_at: new Date().toISOString() };
    const { error } = await sb.from("payroll_payments").upsert(row, { onConflict: "staff_id,period" });
    if (error) return sendErr(res, "Could not record that payment.");
    await audit(sb, who, "payroll.pay", `${sd[0].name} ${period}: ${row.amount + row.bonus - row.deduction}`);
    return sendOk(res, {});
  }
  if (op === "payroll-delete") {
    const { data } = await sb.from("payroll_staff").delete().eq("id", String(b.id || "")).select("name");
    if ((data || []).length) await audit(sb, who, "payroll.staff.delete", data[0].name);
    return sendOk(res, {});
  }
  return sendErr(res, "Unknown payroll action.", 404);
}
