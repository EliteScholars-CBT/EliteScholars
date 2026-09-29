import { redis } from "./redis.js";

export async function checkRateLimit(key, max, windowSec) {
  try {
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, windowSec);
    }

    const allowed = current <= max;
    const remaining = Math.max(0, max - current);

    return {
      allowed,
      remaining,
      retryAfter: allowed ? 0 : windowSec
    };

  } catch (err) {
    return {
      allowed: true,
      remaining: 1,
      retryAfter: 0
    };
  }
}

export async function clearRateLimit(key) {
  try {
    await redis.del(key);
  } catch {}
}