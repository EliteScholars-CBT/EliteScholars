// api/_helpers/legacy.js — OPTIONAL read-only bridge to the old Google Sheets data.
// Only active while the SHEETS_URL environment variable is set. It is used for
// ONE thing: when someone who has not been moved to Supabase yet signs in, we
// copy their account across. Remove the SHEETS_URL variable to cut it entirely.
import { hashPassword } from "./hash.js";

export const legacyEnabled = () => !!process.env.SHEETS_URL;

async function sheetsGet(params) {
  try {
    const res = await fetch(`${process.env.SHEETS_URL}?${new URLSearchParams(params)}`);
    return JSON.parse(await res.text());
  } catch { return { success: false }; }
}

// Old-style check with the plain password.
export async function legacyLoginWithPassword(email, password) {
  if (!legacyEnabled()) return null;
  const r = await sheetsGet({ action: "loginProfile", email, passwordHash: hashPassword(password) });
  return r?.success && r.profile ? r.profile : null;
}

// Old-style check with a previously issued legacy credential (auto-login).
export async function legacyLoginWithHash(email, passwordHash) {
  if (!legacyEnabled()) return null;
  const r = await sheetsGet({ action: "loginProfile", email, passwordHash });
  return r?.success && r.profile ? r.profile : null;
}

export async function legacyProfileExists(email) {
  if (!legacyEnabled()) return false;
  const r = await sheetsGet({ action: "getProfile", email });
  return !!r?.success;
}

export async function legacyGetXP(email) {
  if (!legacyEnabled()) return null;
  const r = await sheetsGet({ action: "getXP", email });
  return Number.isFinite(Number(r?.total_xp)) ? Number(r.total_xp) : null;
}

// Full legacy profile (no password check) — used only by password reset.
export async function legacyGetProfile(email) {
  if (!legacyEnabled()) return null;
  const r = await sheetsGet({ action: "getProfile", email });
  return r?.success ? (r.profile || r) : null;
}
