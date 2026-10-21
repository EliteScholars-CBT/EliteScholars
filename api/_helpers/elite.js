// Which of these accounts have an active PAID Premium plan? (Trials and admin
// free-access grants do not earn the Elite badge.) Returns a Set of emails.
import { getSupabase, supabaseEnabled } from "./supabase.js";

export async function eliteEmails(emails) {
  const out = new Set();
  const list = [...new Set((emails || []).filter(Boolean))];
  if (!list.length || !supabaseEnabled()) return out;
  try {
    const { data } = await getSupabase().from("profiles").select("email,expires_at,subscription_plan").in("email", list);
    const now = Date.now();
    (data || []).forEach((r) => {
      if (r.subscription_plan && r.expires_at && new Date(r.expires_at).getTime() > now) out.add(r.email);
    });
  } catch { /* badge is cosmetic: fail quiet */ }
  return out;
}
