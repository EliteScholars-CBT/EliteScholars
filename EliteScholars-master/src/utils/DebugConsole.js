// DebugConsole.js
import React, { useEffect, useRef, useState, useCallback } from "react";
import { subscribe, clearLogs, getLogs } from "./debugStore";

// ── Semantic colours ──────────────────────────────────────────────────────────
const COLORS = {
  error:   { fg: "#ff5f57", bg: "rgba(255,95,87,0.08)",   border: "#ff5f57" },
  warn:    { fg: "#ffbd2e", bg: "rgba(255,189,46,0.08)",   border: "#ffbd2e" },
  success: { fg: "#28c840", bg: "rgba(40,200,64,0.08)",    border: "#28c840" },
  info:    { fg: "#5eb4ff", bg: "rgba(94,180,255,0.08)",   border: "#5eb4ff" },
  log:     { fg: "#c8c8c8", bg: "rgba(255,255,255,0.03)",  border: "#444"    },
  network: { fg: "#c792ea", bg: "rgba(199,146,234,0.08)",  border: "#c792ea" },
};

const CATEGORY_COLORS = {
  network: "#c792ea",
  console: "#5eb4ff",
  runtime: "#ff5f57",
  promise: "#ff5f57",
  react:   "#61dafb",
  log:     "#888",
};

const TABS = ["ALL", "LOG", "ERROR", "WARN", "NETWORK", "INFO"];

function getColor(type, category) {
  if (category === "network") return COLORS.network;
  return COLORS[type] || COLORS.log;
}

function Badge({ label, color }) {
  return (
    <span style={{
      fontSize: 9,
      fontFamily: "monospace",
      padding: "1px 5px",
      borderRadius: 3,
      background: color + "22",
      color: color,
      border: `1px solid ${color}44`,
      textTransform: "uppercase",
      letterSpacing: 1,
    }}>
      {label}
    </span>
  );
}

function LogEntry({ log, onCopy }) {
  const [expanded, setExpanded] = useState(false);
  const c = getColor(log.type, log.category);
  const catColor = CATEGORY_COLORS[log.category] || "#888";

  return (
    <div
      style={{
        marginBottom: 6,
        borderLeft: `3px solid ${c.border}`,
        background: c.bg,
        padding: "6px 8px",
        borderRadius: "0 4px 4px 0",
        cursor: log.data ? "pointer" : "default",
        boxSizing: "border-box",
      }}
      onClick={() => log.data && setExpanded(e => !e)}
    >
      {/* Top row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 3,
        flexWrap: "wrap",
      }}>
        <span style={{ color: "#555", fontSize: 10, fontFamily: "monospace" }}>
          {log.time}
        </span>
        <Badge label={log.category || "log"} color={catColor} />
        {log.type !== "log" && (
          <Badge label={log.type} color={c.fg} />
        )}
        {log.data && (
          <span style={{ color: "#555", fontSize: 10, marginLeft: "auto" }}>
            {expanded ? "▲" : "▼"}
          </span>
        )}
      </div>

      {/* Message */}
      <div style={{
        color: c.fg,
        fontSize: 12,
        fontFamily: "monospace",
        wordBreak: "break-all",
        lineHeight: 1.5,
      }}>
        {log.message}
      </div>

      {/* Expanded data */}
      {expanded && log.data && (
        <pre style={{
          marginTop: 6,
          fontSize: 11,
          fontFamily: "monospace",
          color: "#aaa",
          background: "#0a0a0a",
          padding: 8,
          borderRadius: 4,
          overflow: "auto",
          maxHeight: 200,
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          boxSizing: "border-box",
          width: "100%",
        }}>
          {typeof log.data === "string"
            ? log.data
            : JSON.stringify(log.data, null, 2)}
        </pre>
      )}

      {/* Copy button */}
      <button
        onClick={e => { e.stopPropagation(); onCopy(log); }}
        style={{
          marginTop: 4,
          fontSize: 10,
          fontFamily: "monospace",
          background: "transparent",
          border: "1px solid #333",
          color: "#666",
          padding: "1px 6px",
          borderRadius: 3,
          cursor: "pointer",
        }}
      >
        copy
      </button>
    </div>
  );
}

function HeaderBtn({ onClick, title, color, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: "transparent",
        border: "1px solid #2a2a2a",
        color: color || "#666",
        borderRadius: 4,
        width: 24,
        height: 24,
        fontSize: 11,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
        padding: 0,
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

export default function DebugConsole() {
  const [logs, setLogs]     = useState([]);
  const [open, setOpen]     = useState(false);
  const [max, setMax]       = useState(false);
  const [tab, setTab]       = useState("ALL");
  const [search, setSearch] = useState("");
  const [counts, setCounts] = useState({});

  const boxRef    = useRef(null);
  const scrollRef = useRef(null);
  const dragRef   = useRef({ dragging: false, ox: 0, oy: 0 });

  // Subscribe to store
  useEffect(() => subscribe(incoming => {
    setLogs(incoming);
    const c = {};
    incoming.forEach(l => { c[l.type] = (c[l.type] || 0) + 1; });
    setCounts(c);
  }), []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, open]);

  // Drag (only when not maximised)
  useEffect(() => {
    const el = boxRef.current;
    if (!el || !open) return;

    const down = (e) => {
      if (max || !e.target.closest("[data-drag]")) return;
      dragRef.current = {
        dragging: true,
        ox: e.clientX - el.offsetLeft,
        oy: e.clientY - el.offsetTop,
      };
      e.preventDefault();
    };
    const move = (e) => {
      if (!dragRef.current.dragging || max) return;
      el.style.left   = `${e.clientX - dragRef.current.ox}px`;
      el.style.top    = `${e.clientY - dragRef.current.oy}px`;
      el.style.right  = "auto";
      el.style.bottom = "auto";
    };
    const up = () => { dragRef.current.dragging = false; };

    window.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [open, max]);

  const copy = useCallback((log) => {
    navigator.clipboard.writeText(JSON.stringify(log, null, 2));
  }, []);

  const copyAll = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(getLogs(), null, 2));
  }, []);

  // Filter logs by tab + search
  const filtered = logs.filter(l => {
    const matchTab =
      tab === "ALL"     ? true :
      tab === "NETWORK" ? l.category === "network" :
      l.type === tab.toLowerCase();
    const matchSearch = !search ||
      l.message?.toLowerCase().includes(search.toLowerCase()) ||
      JSON.stringify(l.data || "").toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const errorCount = counts.error || 0;
  const warnCount  = counts.warn  || 0;

  // ── Minimised FAB ───────────────────────────────────────────────────────────
  if (!open) {
    return (
      <div
        onClick={() => setOpen(true)}
        title="Open Debug Console"
        style={{
          position:       "fixed",
          bottom:         16,
          right:          16,
          width:          44,
          height:         44,
          background:     "#111",
          border:         "1px solid #2a2a2a",
          borderRadius:   "50%",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          cursor:         "pointer",
          zIndex:         999999,
          boxShadow:      "0 4px 20px rgba(0,0,0,0.6)",
          userSelect:     "none",
          flexShrink:     0,
        }}
      >
        <span style={{ fontSize: 20 }}>🐛</span>
        {errorCount > 0 && (
          <span style={{
            position:       "absolute",
            top:            -4,
            right:          -4,
            background:     "#ff5f57",
            color:          "#fff",
            fontSize:       9,
            fontFamily:     "monospace",
            fontWeight:     "bold",
            borderRadius:   "50%",
            width:          16,
            height:         16,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
          }}>
            {errorCount > 9 ? "9+" : errorCount}
          </span>
        )}
      </div>
    );
  }

  // ── Full panel ──────────────────────────────────────────────────────────────
  return (
    <div
      ref={boxRef}
      style={{
        position:        "fixed",
        bottom:          max ? 0 : 10,
        right:           max ? 0 : 10,
        left:            max ? 0 : 10,
        top:             max ? 0 : "auto",
        width:           max ? "100%" : "auto",
        height:          max ? "100%" : "60vh",
        maxHeight:       max ? "100%" : 420,
        background:      "#0d0d0d",
        color:           "#c8c8c8",
        fontFamily:      "monospace",
        zIndex:          999999,
        display:         "flex",
        flexDirection:   "column",
        border:          "1px solid #222",
        borderRadius:    max ? 0 : 8,
        boxShadow:       "0 8px 40px rgba(0,0,0,0.8)",
        overflow:        "hidden",
        userSelect:      "none",
        boxSizing:       "border-box",
      }}
    >

      {/* ── HEADER ── */}
      <div
        data-drag="true"
        style={{
          padding:        "6px 10px",
          background:     "#111",
          borderBottom:   "1px solid #1e1e1e",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          cursor:         max ? "default" : "move",
          flexShrink:     0,
          boxSizing:      "border-box",
          width:          "100%",
          gap:            8,
        }}
      >
        <div style={{
          display:    "flex",
          alignItems: "center",
          gap:        8,
          flexWrap:   "wrap",
          minWidth:   0,
        }}>
          <span style={{
            fontSize:      13,
            color:         "#28c840",
            fontWeight:    "bold",
            letterSpacing: 1,
            fontFamily:    "monospace",
            whiteSpace:    "nowrap",
          }}>
            ▶ DEV
          </span>
          <span style={{ fontSize: 11, color: "#444", fontFamily: "monospace", whiteSpace: "nowrap" }}>
            {filtered.length}/{logs.length}
          </span>
          {errorCount > 0 && (
            <span style={{ fontSize: 10, color: "#ff5f57", fontFamily: "monospace", whiteSpace: "nowrap" }}>
              ✖ {errorCount}
            </span>
          )}
          {warnCount > 0 && (
            <span style={{ fontSize: 10, color: "#ffbd2e", fontFamily: "monospace", whiteSpace: "nowrap" }}>
              ⚠ {warnCount}
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
          <HeaderBtn onClick={copyAll}            title="Copy all logs">📋</HeaderBtn>
          <HeaderBtn onClick={clearLogs}          title="Clear">🧹</HeaderBtn>
          <HeaderBtn onClick={() => setMax(m => !m)} title={max ? "Restore" : "Maximise"}>
            {max ? "⊡" : "⊞"}
          </HeaderBtn>
          <HeaderBtn onClick={() => setOpen(false)} title="Close" color="#ff5f57">✕</HeaderBtn>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{
        display:      "flex",
        background:   "#111",
        borderBottom: "1px solid #1a1a1a",
        flexShrink:   0,
        overflowX:    "auto",
        width:        "100%",
        boxSizing:    "border-box",
      }}>
        {TABS.map(t => {
          const active = tab === t;
          const tColor =
            t === "ERROR"   ? "#ff5f57" :
            t === "WARN"    ? "#ffbd2e" :
            t === "NETWORK" ? "#c792ea" :
            t === "INFO"    ? "#5eb4ff" :
            t === "LOG"     ? "#c8c8c8" : "#28c840";
          return (
            <button key={t} onClick={() => setTab(t)} style={{
              background:    active ? "#0d0d0d" : "transparent",
              color:         active ? tColor : "#555",
              border:        "none",
              borderBottom:  active ? `2px solid ${tColor}` : "2px solid transparent",
              padding:       "5px 10px",
              fontSize:      10,
              fontFamily:    "monospace",
              cursor:        "pointer",
              letterSpacing: 1,
              whiteSpace:    "nowrap",
              flexShrink:    0,
            }}>
              {t}
              {t === "ERROR" && errorCount > 0 && (
                <span style={{ marginLeft: 4, color: "#ff5f57" }}>{errorCount}</span>
              )}
              {t === "WARN" && warnCount > 0 && (
                <span style={{ marginLeft: 4, color: "#ffbd2e" }}>{warnCount}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── SEARCH ── */}
      <div style={{
        padding:      "5px 8px",
        background:   "#0f0f0f",
        borderBottom: "1px solid #1a1a1a",
        flexShrink:   0,
        boxSizing:    "border-box",
        width:        "100%",
      }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 filter logs..."
          style={{
            width:        "100%",
            background:   "#1a1a1a",
            border:       "1px solid #2a2a2a",
            borderRadius: 4,
            color:        "#c8c8c8",
            fontFamily:   "monospace",
            fontSize:     11,
            padding:      "4px 8px",
            outline:      "none",
            boxSizing:    "border-box",
          }}
        />
      </div>

      {/* ── LOG LIST ── */}
      <div
        ref={scrollRef}
        style={{
          flex:      1,
          overflowY: "auto",
          overflowX: "hidden",
          padding:   "8px",
          boxSizing: "border-box",
          width:     "100%",
        }}
      >
        {filtered.length === 0 ? (
          <div style={{
            color:      "#333",
            fontSize:   12,
            fontFamily: "monospace",
            textAlign:  "center",
            marginTop:  40,
          }}>
            {search ? "no matches" : "no logs yet"}
          </div>
        ) : (
          [...filtered].reverse().map((log, i) => (
            <LogEntry key={log.id || i} log={log} onCopy={copy} />
          ))
        )}
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        padding:        "4px 10px",
        background:     "#111",
        borderTop:      "1px solid #1a1a1a",
        fontSize:       9,
        fontFamily:     "monospace",
        color:          "#333",
        display:        "flex",
        justifyContent: "space-between",
        flexShrink:     0,
        boxSizing:      "border-box",
        width:          "100%",
      }}>
        <span>Makzosoft DevTools v1.0</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>

    </div>
  );
}