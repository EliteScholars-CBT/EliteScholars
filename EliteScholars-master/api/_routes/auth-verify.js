// POST /api/auth/verify — silent auto-login.
// Accepts a signed session token, or (once, for installs from before this
// update) the old stored password hash, and answers with a fresh token.
import { sendOk, sendMethodNotAllowed, setCors } from "../_helpers/response.js";
import { selectOne, supabaseEnabled } from "../_helpers/supabase.js";
import { sessionMatchesRow, isSessionToken } from "../_helpers/session.js";
import { legacyHashMatches } from "../_helpers/hash.js";
import { legacyLoginWithHash } from "../_helpers/legacy.js";
import { backfillProfile } from "../_helpers/backfill.js";
import { profileOut } from "../_helpers/profileOut.js";
import { rateLimitOk } from "../_helpers/guard.js";

const EXPIRED = { success: false, stage: "verify_failed", message: "Session expired. Please log in again." };

export default async function handler(req, res) {
  try {
    setCors(res);
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return sendMethodNotAllowed(res);
    if (!supabaseEnabled()) return res.status(503).json({ success: false, message: "Service unavailable." });
    if (!(await rateLimitOk(req, res, "verify", 60, 900))) return;

    const { email: rawEmail, passwordHash } = req.body || {};
    if (typeof rawEmail !== "string" || typeof passwordHash !== "string" || !rawEmail || !passwordHash) {
      return res.status(400).json({ success: false, message: "Missing credentials." });
    }
    const email = rawEmail.toLowerCase().trim();

    const found = await selectOne("profiles", { email });
    let row = found.ok ? found.row : null;
    let ok = false;

    if (row) {
      ok = isSessionToken(passwordHash)
        ? sessionMatchesRow(passwordHash, row)
        : legacyHashMatches(passwordHash, row.password_hash);
    } else if (found.ok && !isSessionToken(passwordHash)) {
      const legacy = await legacyLoginWithHash(email, passwordHash);
      if (legacy && (await backfillProfile(email, legacy, passwordHash)).ok) {
        const again = await selectOne("profiles", { email });
        row = again.ok ? again.row : null;
        ok = !!row;
      }
    }

    if (!ok || !row) return res.status(401).json(EXPIRED);
    return sendOk(res, { stage: "verify_success", profile: profileOut(row) });
  } catch (err) {
    console.error("[verify]", err?.message);
    return res.status(500).json({ success: false, stage: "verify_error", message: "Something went wrong." });
  }
}
