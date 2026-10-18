// Wraps a serverless handler so an unexpected crash always answers with JSON
// (never Vercel's HTML/plain-text error page, which the app cannot parse).
export function safeHandler(fn, label = "api") {
  return async function safe(req, res) {
    try {
      return await fn(req, res);
    } catch (err) {
      console.error(`[${label}]`, err && err.message);
      if (!res.headersSent) {
        try { return res.status(500).json({ success: false, error: "Something went wrong. Please try again.", message: "Something went wrong. Please try again." }); } catch { /* socket closed */ }
      }
    }
  };
}
