// debugFetch.js
import { addLog } from "./debugStore";

export async function debugFetch(url, options = {}) {
  const startTime = performance.now();
  const method = options.method || "GET";

  let parsedBody;
  try {
    parsedBody = options.body ? JSON.parse(options.body) : undefined;
  } catch {
    parsedBody = options.body;
  }

  addLog({
    type: "info",
    category: "network",
    message: `⬆ ${method} ${url}`,
    data: {
      method,
      url,
      headers: options.headers,
      body: parsedBody,
    },
  });

  try {
    const res = await fetch(url, options);
    const duration = Math.round(performance.now() - startTime);
    const text = await res.clone().text();

    let parsed;
    try { parsed = JSON.parse(text); } catch { parsed = text; }

    addLog({
      type: res.ok ? "success" : "error",
      category: "network",
      message: `${res.ok ? "⬇" : "✖"} ${res.status} ${method} ${url} (${duration}ms)`,
      data: {
        status: res.status,
        statusText: res.statusText,
        duration: `${duration}ms`,
        url,
        response: parsed,
      },
    });

    return res;
  } catch (err) {
    const duration = Math.round(performance.now() - startTime);
    addLog({
      type: "error",
      category: "network",
      message: `✖ NETWORK FAIL ${method} ${url} (${duration}ms)`,
      data: {
        error: err.message,
        duration: `${duration}ms`,
      },
    });
    throw err;
  }
}