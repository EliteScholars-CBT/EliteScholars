// ============================================================================
// api/auth/verify.js — POST /api/auth/verify
// Silent auto-login token verification
// ============================================================================

import {
  sendOk,
  sendErr,
  sendMethodNotAllowed,
  setCors
} from "../_helpers/response.js";

import { sheetsGet } from "../_helpers/sheets.js";

export default async function handler(req, res) {
  try {
    setCors(res);

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (req.method !== "POST") {
      return sendMethodNotAllowed(res);
    }

    const body = req.body || {};

    if (!body.email || !body.passwordHash) {
      return sendErr(res, "Missing credentials.");
    }

    const email = body.email.toLowerCase().trim();

    const result = await sheetsGet({
      action: "loginProfile",
      email,
      passwordHash: body.passwordHash,
    });

    if (!result || !result.success) {
      return res.status(401).json({
        success: false,
        stage: "verify_failed",
        message: "Session expired. Please log in again.",
      });
    }

    return sendOk(res, {
      stage: "verify_success",
      profile: result.profile,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      stage: "verify_error",
      message: err.message,
    });
  }
}