import { checkRateLimit, clearRateLimit } from "../_helpers/rateLimit.js";
import { hashPassword } from "../_helpers/hash.js";
import { sheetsGet } from "../_helpers/sheets.js";
import { logSecurityEvent } from "../_helpers/security.js";
import { setCors, sendMethodNotAllowed } from "../_helpers/response.js";

export default async function handler(req, res) {
  try {
    setCors(res);

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (req.method !== "POST") {
      return sendMethodNotAllowed(res);
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "unknown";

    const body = req.body || {};

    if (!body.email || !body.password) {
      return res.status(400).json({
        success: false,
        stage: "validation_error",
        message: "Email and password required",
      });
    }

    const email = body.email.toLowerCase().trim();
    const key = `login:${email}:${ip}`;

    const { allowed, retryAfter } =
      await checkRateLimit(key, 10, 900);

    if (!allowed) {
      await logSecurityEvent({
        type: "login_rate_limited",
        email,
        ip,
      });

      return res.status(429).json({
        success: false,
        stage: "rate_limited",
        message: "Too many attempts",
        retryAfter,
      });
    }

    const passwordHash = hashPassword(body.password);

    const result = await sheetsGet({
      action: "loginProfile",
      email,
      passwordHash,
    });

    if (!result || !result.success) {
      await logSecurityEvent({
        type: "login_failed",
        email,
        ip,
      });

      return res.status(401).json({
        success: false,
        stage: "login_failed",
        message: result?.error || "Invalid credentials",
      debug: {
       email,
       ip,
       time: new Date().toISOString()
     }
      });
    }

    await clearRateLimit(key);

    return res.status(200).json({
  success: true,
  stage: "login_success",
  profile: result.profile,
});

  } catch (err) {
    return res.status(500).json({
      success: false,
      stage: "internal_error",
      message: err.message,
    });
  }
}