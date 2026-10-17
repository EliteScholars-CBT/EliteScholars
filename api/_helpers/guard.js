// api/_helpers/guard.js — request guards (rate limits, size caps)
import { checkRateLimit } from "./rateLimit.js";

export const clientIp = (req) =>
  req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";

// Sends a 429 and returns false when the caller is over the limit.
export async function rateLimitOk(req, res, name, max, windowSec, who) {
  const { allowed, retryAfter } = await checkRateLimit(`rl:${name}:${who || clientIp(req)}`, max, windowSec);
  if (!allowed) {
    res.setHeader("Retry-After", String(retryAfter || windowSec));
    res.status(429).json({ success: false, error: "Too many requests. Please slow down and try again shortly." });
    return false;
  }
  return true;
}

export const jsonSize = (v) => { try { return JSON.stringify(v).length; } catch { return Infinity; } };
