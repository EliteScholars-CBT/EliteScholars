// debugError.js
import { addLog } from "./debugStore";

export function installGlobalErrorDebugger() {

  // Runtime errors
  window.onerror = (msg, src, line, col, err) => {
    addLog({
      type: "error",
      category: "runtime",
      message: String(msg),
      data: {
        source: src,
        line,
        column: col,
        stack: err?.stack,
      },
    });
    return false;
  };

  // Unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    addLog({
      type: "error",
      category: "promise",
      message: "Unhandled Promise Rejection",
      data: {
        reason: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
      },
    });
  });

  // Intercept console methods
  const methods = {
    log:   "log",
    warn:  "warn",
    error: "error",
    info:  "info",
  };

  Object.entries(methods).forEach(([method, type]) => {
    const original = console[method].bind(console);
    console[method] = (...args) => {
      original(...args);
      const message = args
        .map(a => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" ");
      addLog({
        type: method === "warn" ? "warn" : method === "error" ? "error" : method === "info" ? "info" : "log",
        category: "console",
        message,
        data: args.length > 1 ? args : undefined,
      });
    };
  });

  // React error boundary events
  window.addEventListener("error", (event) => {
    if (event.error && event.error.stack?.includes("react")) {
      addLog({
        type: "error",
        category: "react",
        message: event.error.message,
        data: { stack: event.error.stack },
      });
    }
  });
}