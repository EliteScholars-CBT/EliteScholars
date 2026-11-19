import React, { useState, useMemo } from 'react';

export const fmtN = (n) => Number(n || 0).toLocaleString('en-NG');
export const fmtNaira = (n) => '₦' + fmtN(n);
export const COLORS = ['#8b5cf6', '#f5b400', '#22d3ee', '#f472b6', '#34d399', '#fb923c', '#94a3b8'];
const short = (t) => (t >= 1e6 ? `${+(t / 1e6).toFixed(1)}M` : t >= 1000 ? `${+(t / 1000).toFixed(1)}k` : `${Math.round(t * 10) / 10}`);
const uid = () => 'c' + Math.random().toString(36).slice(2, 8);

function niceMax(v) {
  if (v <= 4) return 4;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const m = v / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
}

// Smooth curve through the points that never overshoots (monotone cubic), so a quiet day never dips below zero.
function smoothPath(pts) {
  const n = pts.length;
  if (n < 2) return n ? `M${pts[0][0]},${pts[0][1]}` : '';
  const dx = [], m = [];
  for (let i = 0; i < n - 1; i++) { dx[i] = pts[i + 1][0] - pts[i][0]; m[i] = dx[i] ? (pts[i + 1][1] - pts[i][1]) / dx[i] : 0; }
  const t = [m[0]];
  for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  t[n - 1] = m[n - 2];
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) { t[i] = 0; t[i + 1] = 0; continue; }
    const a = t[i] / m[i], b = t[i + 1] / m[i], s = a * a + b * b;
    if (s > 9) { const k = 3 / Math.sqrt(s); t[i] = k * a * m[i]; t[i + 1] = k * b * m[i]; }
  }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += ` C${(pts[i][0] + h).toFixed(1)},${(pts[i][1] + t[i] * h).toFixed(1)} ${(pts[i + 1][0] - h).toFixed(1)},${(pts[i + 1][1] - t[i + 1] * h).toFixed(1)} ${pts[i + 1][0].toFixed(1)},${pts[i + 1][1].toFixed(1)}`;
  }
  return d;
}

/* ── Line / area chart: smooth curve, glow, peak marker, crosshair tooltip, optional previous-period overlay ── */
export function TrendChart({ labels, values, prev, fmt = fmtN, color = '#8b5cf6' }) {
  const [hover, setHover] = useState(null);
  const W = 640, H = 240, L = 40, R = 16, T = 22, B = 28;
  const n = values.length;
  const max = niceMax(Math.max(1, ...values, ...(prev || [0])));
  const x = (i) => L + (n <= 1 ? (W - L - R) / 2 : (i * (W - L - R)) / (n - 1));
  const y = (v) => T + (1 - v / max) * (H - T - B);
  const pts = values.map((v, i) => [x(i), y(v)]);
  const curve = smoothPath(pts);
  const area = n > 1 ? `${curve} L${x(n - 1).toFixed(1)},${H - B} L${x(0).toFixed(1)},${H - B} Z` : '';
  const prevCurve = prev ? smoothPath(prev.slice(0, n).map((v, i) => [x(i), y(v)])) : '';
  const ticks = [0, 1, 2, 3, 4].map((k) => (k / 4) * max);
  const every = Math.ceil(n / 7);
  const peak = values.indexOf(Math.max(...values));
  const showPeak = n > 3 && values[peak] > 0;
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const cx = (((e.touches ? e.touches[0].clientX : e.clientX) - r.left) / r.width) * W;
    const i = Math.round(((cx - L) / (W - L - R)) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };
  const gid = useMemo(uid, []);
  const total = values.reduce((a, b) => a + b, 0);
  return (
    <div className="adm-chart">
      <svg viewBox={`0 0 ${W} ${H}`} onMouseMove={onMove} onTouchStart={onMove} onTouchMove={onMove} onMouseLeave={() => setHover(null)} role="img" aria-label={`Trend, total ${fmt(total)}`}>
        <defs>
          <linearGradient id={`${gid}a`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity=".38" /><stop offset=".7" stopColor={color} stopOpacity=".07" /><stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id={`${gid}g`} x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className={i === 0 ? 'adm-base-line' : 'adm-grid-line'} />
            <text x={L - 8} y={y(t) + 3} textAnchor="end" className="adm-axis">{short(t)}</text>
          </g>
        ))}
        {labels.map((l, i) => (i % every === 0 ? <text key={i} x={x(i)} y={H - 8} textAnchor="middle" className="adm-axis">{l}</text> : null))}
        {area && <path d={area} fill={`url(#${gid}a)`} className="adm-area-in" />}
        {prevCurve && <path d={prevCurve} className="adm-prev-line" />}
        {n > 1 && <path d={curve} fill="none" stroke={color} strokeWidth="6" strokeOpacity=".35" filter={`url(#${gid}g)`} />}
        {n > 1 && <path d={curve} fill="none" stroke={color} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" pathLength="1" className="adm-line-draw" />}
        {n <= 31 && values.map((v, i) => (v > 0 ? <circle key={i} cx={x(i)} cy={y(v)} r="2.4" fill="#0f0b1f" stroke={color} strokeWidth="1.6" /> : null))}
        {showPeak && hover === null && (
          <g className="adm-peak">
            <rect x={Math.min(W - R - 40, Math.max(L, x(peak) - 20))} y={y(values[peak]) - 24} width="40" height="16" rx="8" fill={color} />
            <text x={Math.min(W - R - 20, Math.max(L + 20, x(peak)))} y={y(values[peak]) - 12.5} textAnchor="middle" className="adm-peak-t">{short(values[peak])}</text>
          </g>
        )}
        {n > 0 && hover === null && (
          <g>
            <circle cx={x(n - 1)} cy={y(values[n - 1])} r="9" fill={color} opacity=".18" className="adm-pulse" />
            <circle cx={x(n - 1)} cy={y(values[n - 1])} r="4.5" fill="#fff" stroke={color} strokeWidth="2.5" />
          </g>
        )}
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={T - 6} y2={H - B} className="adm-hover-line" />
            <circle cx={x(hover)} cy={y(values[hover])} r="9" fill={color} opacity=".2" />
            <circle cx={x(hover)} cy={y(values[hover])} r="5" fill="#fff" stroke={color} strokeWidth="2.5" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div className="adm-tip" style={{ left: `${Math.min(84, Math.max(16, (x(hover) / W) * 100))}%` }}>
          <b>{labels[hover]}</b>
          <span style={{ color }}>{fmt(values[hover])}</span>
          {prev && <em>before: {fmt(prev[hover] || 0)}</em>}
        </div>
      )}
    </div>
  );
}

/* ── Vertical bars (hour of day / weekday): rounded gradient bars, the busiest one highlighted ── */
export function ColumnChart({ values, labels, highlight }) {
  const [hover, setHover] = useState(null);
  const max = Math.max(1, ...values);
  const W = 640, H = 170, B = 22, T = 18, gap = 4;
  const bw = (W - gap * (values.length - 1)) / values.length;
  const peak = values.indexOf(Math.max(...values));
  const hi = highlight ?? peak;
  const gid = useMemo(uid, []);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="adm-cols" role="img" onMouseLeave={() => setHover(null)}>
      <defs>
        <linearGradient id={`${gid}v`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a78bfa" /><stop offset="1" stopColor="#6d28d9" /></linearGradient>
        <linearGradient id={`${gid}y`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fcd34d" /><stop offset="1" stopColor="#f59e0b" /></linearGradient>
      </defs>
      <line x1="0" x2={W} y1={H - B} y2={H - B} className="adm-base-line" />
      {values.map((v, i) => {
        const h = Math.max(3, (v / max) * (H - B - T));
        const on = hover === i;
        const bx = i * (bw + gap);
        return (
          <g key={i} onMouseEnter={() => setHover(i)} onTouchStart={() => setHover(i)} className="adm-col">
            <rect x={bx} y={0} width={bw} height={H - B} fill="transparent" />
            <rect x={bx} y={H - B - h} width={bw} height={h} rx={Math.min(6, bw / 2)} fill={`url(#${gid}${i === hi ? 'y' : 'v'})`} opacity={v ? (hover === null || on ? 1 : 0.55) : 0.2} className="adm-col-bar" />
            {(on || (hover === null && i === hi && v > 0)) && <text x={bx + bw / 2} y={H - B - h - 6} textAnchor="middle" className="adm-col-v">{short(v)}</text>}
            {(values.length <= 8 || i % 3 === 0) && <text x={bx + bw / 2} y={H - 6} textAnchor="middle" className="adm-axis">{labels[i]}</text>}
            <title>{`${labels[i]}: ${fmtN(v)}`}</title>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Ring chart: thin segments with gaps; hover a slice or a legend row to read it in the middle ── */
export function Donut({ data }) {
  const [hi, setHi] = useState(null);
  const total = data.reduce((a, d) => a + d.count, 0);
  if (!total) return <p className="adm-empty">No data in this period.</p>;
  const R = 46, C = 2 * Math.PI * R;
  let off = 0;
  const cur = hi !== null ? data[hi] : null;
  return (
    <div className="adm-donut">
      <svg viewBox="0 0 120 120" role="img" onMouseLeave={() => setHi(null)}>
        <circle cx="60" cy="60" r={R} fill="none" stroke="#261e47" strokeWidth="12" />
        {data.map((d, i) => {
          const len = (d.count / total) * C;
          const gap = data.length > 1 ? Math.min(3, len * 0.3) : 0;
          const el = <circle key={d.name} cx="60" cy="60" r={R} fill="none" stroke={COLORS[i % COLORS.length]} strokeWidth={hi === i ? 15 : 12} strokeLinecap="butt"
            strokeDasharray={`${Math.max(0, len - gap)} ${C - Math.max(0, len - gap)}`} strokeDashoffset={-off} transform="rotate(-90 60 60)" opacity={hi === null || hi === i ? 1 : 0.35} className="adm-seg"
            onMouseEnter={() => setHi(i)} onTouchStart={() => setHi(i)}><title>{`${d.name}: ${d.count}`}</title></circle>;
          off += len; return el;
        })}
        <text x="60" y="58" textAnchor="middle" className="adm-donut-n">{fmtN(cur ? cur.count : total)}</text>
        <text x="60" y="73" textAnchor="middle" className="adm-axis">{cur ? `${Math.round((cur.count / total) * 100)}% · ${String(cur.name).slice(0, 14)}` : 'total'}</text>
      </svg>
      <ul>
        {data.map((d, i) => (
          <li key={d.name} className={hi === i ? 'on' : ''} onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}><i style={{ background: COLORS[i % COLORS.length] }} />{d.name}<b>{fmtN(d.count)} · {Math.round((d.count / total) * 100)}%</b></li>
        ))}
      </ul>
    </div>
  );
}

/* ── Ranked horizontal bars ── */
export function Bars({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  const total = data.reduce((a, d) => a + d.count, 0) || 1;
  if (!data.length) return <p className="adm-empty">No data in this period.</p>;
  return (
    <div className="adm-bars">
      {data.map((d, i) => (
        <div className="adm-bar-row" key={d.name} title={`${d.name}: ${fmtN(d.count)} (${Math.round((d.count / total) * 100)}%)`}>
          <span className="adm-bar-label"><em>{i + 1}</em>{d.name}</span>
          <span className="adm-bar-track"><span className="adm-bar-fill" style={{ width: `${Math.max(2, (d.count / max) * 100)}%`, animationDelay: `${i * 40}ms` }} /></span>
          <span className="adm-bar-val">{fmtN(d.count)}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Funnel: each step narrows, with the share kept from the step before ── */
export function Funnel({ steps }) {
  const max = Math.max(1, ...steps.map((x) => x.count));
  return (
    <div className="adm-funnel">
      {steps.map((s, i) => {
        const keep = i > 0 && steps[i - 1].count > 0 ? Math.round((s.count / steps[i - 1].count) * 100) : null;
        return (
          <div key={s.name} className="adm-funnel-row">
            <div className="adm-funnel-bar" style={{ width: `${Math.max(8, (s.count / max) * 100)}%`, opacity: 1 - i * 0.07, animationDelay: `${i * 70}ms` }}><span>{s.name}</span><b>{fmtN(s.count)}</b></div>
            {keep !== null && <em><i className={keep >= 50 ? 'ok' : keep >= 20 ? 'mid' : 'low'}>{keep}%</i> kept from the step before</em>}
          </div>
        );
      })}
    </div>
  );
}

export function Delta({ v, prev, money }) {
  if (prev === undefined) return null;
  if (!prev && !v) return <span className="adm-delta flat">no change</span>;
  if (!prev) return <span className="adm-delta up">new</span>;
  const c = Math.round(((v - prev) / prev) * 100);
  return <span className={`adm-delta ${c > 0 ? 'up' : c < 0 ? 'down' : 'flat'}`}>{c > 0 ? '▲' : c < 0 ? '▼' : '•'} {Math.abs(c)}%{money ? '' : ''}</span>;
}

export function Kpi({ label, value, k, compare, money, sub }) {
  return (
    <div className="adm-stat">
      <div className="adm-stat-val">{value}</div>
      <div className="adm-stat-label">{label} {compare && k && <Delta v={k.v} prev={k.prev} money={money} />}</div>
      {sub && <div className="adm-stat-sub">{sub}</div>}
    </div>
  );
}
