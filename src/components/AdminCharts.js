import React, { useState, useMemo } from 'react';

export const fmtN = (n) => Number(n || 0).toLocaleString('en-NG');
export const fmtNaira = (n) => '₦' + fmtN(n);
export const COLORS = ['#8b5cf6', '#f5b400', '#22d3ee', '#f472b6', '#34d399', '#fb923c', '#94a3b8'];


function niceMax(v) {
  if (v <= 4) return 4;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const m = v / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
}

/* ── Line / area chart with tooltip + optional previous-period overlay ───── */
export function TrendChart({ labels, values, prev, fmt, color = '#8b5cf6' }) {
  const [hover, setHover] = useState(null);
  const W = 640, H = 220, L = 44, R = 12, T = 12, B = 26;
  const n = values.length;
  const max = niceMax(Math.max(1, ...values, ...(prev || [0])));
  const x = (i) => L + (n <= 1 ? (W - L - R) / 2 : (i * (W - L - R)) / (n - 1));
  const y = (v) => T + (1 - v / max) * (H - T - B);
  const line = (arr) => arr.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = `${line(values)} L${x(n - 1).toFixed(1)},${H - B} L${x(0).toFixed(1)},${H - B} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
  const every = Math.ceil(n / 7);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const cx = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) / r.width * W;
    const i = Math.round(((cx - L) / (W - L - R)) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };
  const gid = useMemo(() => 'g' + Math.random().toString(36).slice(2, 7), []);
  return (
    <div className="adm-chart">
      <svg viewBox={`0 0 ${W} ${H}`} onMouseMove={onMove} onTouchStart={onMove} onTouchMove={onMove} onMouseLeave={() => setHover(null)} role="img">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity=".45" /><stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} className="adm-grid-line" />
            <text x={L - 6} y={y(t) + 3} textAnchor="end" className="adm-axis">{t >= 1000 ? `${+(t / 1000).toFixed(1)}k` : Math.round(t * 10) / 10}</text>
          </g>
        ))}
        {labels.map((l, i) => (i % every === 0 ? <text key={i} x={x(i)} y={H - 8} textAnchor="middle" className="adm-axis">{l}</text> : null))}
        <path d={area} fill={`url(#${gid})`} />
        {prev && <path d={line(prev.slice(0, n))} className="adm-prev-line" />}
        <path d={line(values)} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {n <= 40 && values.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="2.6" fill={color} />)}
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} className="adm-hover-line" />
            <circle cx={x(hover)} cy={y(values[hover])} r="5" fill="#fff" stroke={color} strokeWidth="2.5" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div className="adm-tip" style={{ left: `${Math.min(82, Math.max(18, (x(hover) / W) * 100))}%` }}>
          <b>{labels[hover]}</b>
          <span>{fmt(values[hover])}</span>
          {prev && <em>before: {fmt(prev[hover] || 0)}</em>}
        </div>
      )}
    </div>
  );
}

/* ── Vertical bars (hour of day / weekday) ───────────────────────────────── */
export function ColumnChart({ values, labels, highlight }) {
  const max = Math.max(1, ...values);
  const W = 640, H = 150, B = 22, gap = 3;
  const bw = (W - gap * values.length) / values.length;
  const peak = values.indexOf(Math.max(...values));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="adm-cols" role="img">
      {values.map((v, i) => {
        const h = Math.max(2, (v / max) * (H - B - 8));
        return (
          <g key={i}>
            <rect x={i * (bw + gap)} y={H - B - h} width={bw} height={h} rx="3" fill={i === (highlight ?? peak) ? '#f5b400' : '#8b5cf6'} opacity={v ? 1 : 0.25}>
              <title>{`${labels[i]}: ${v}`}</title>
            </rect>
            {(values.length <= 8 || i % 3 === 0) && <text x={i * (bw + gap) + bw / 2} y={H - 6} textAnchor="middle" className="adm-axis">{labels[i]}</text>}
          </g>
        );
      })}
    </svg>
  );
}

export function Donut({ data }) {
  const total = data.reduce((a, d) => a + d.count, 0);
  if (!total) return <p className="adm-empty">No data in this period.</p>;
  const R = 46, C = 2 * Math.PI * R;
  let off = 0;
  return (
    <div className="adm-donut">
      <svg viewBox="0 0 120 120" role="img">
        <circle cx="60" cy="60" r={R} fill="none" stroke="#261e47" strokeWidth="16" />
        {data.map((d, i) => {
          const len = (d.count / total) * C;
          const el = <circle key={d.name} cx="60" cy="60" r={R} fill="none" stroke={COLORS[i % COLORS.length]} strokeWidth="16"
            strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} transform="rotate(-90 60 60)"><title>{`${d.name}: ${d.count}`}</title></circle>;
          off += len; return el;
        })}
        <text x="60" y="58" textAnchor="middle" className="adm-donut-n">{fmtN(total)}</text>
        <text x="60" y="73" textAnchor="middle" className="adm-axis">total</text>
      </svg>
      <ul>
        {data.map((d, i) => (
          <li key={d.name}><i style={{ background: COLORS[i % COLORS.length] }} />{d.name}<b>{fmtN(d.count)} · {Math.round((d.count / total) * 100)}%</b></li>
        ))}
      </ul>
    </div>
  );
}

export function Bars({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  if (!data.length) return <p className="adm-empty">No data in this period.</p>;
  return (
    <div className="adm-bars">
      {data.map((d) => (
        <div className="adm-bar-row" key={d.name}>
          <span className="adm-bar-label">{d.name}</span>
          <span className="adm-bar-track"><span className="adm-bar-fill" style={{ width: `${(d.count / max) * 100}%` }} /></span>
          <span className="adm-bar-val">{fmtN(d.count)}</span>
        </div>
      ))}
    </div>
  );
}

export function Funnel({ steps }) {
  const max = Math.max(1, steps[0].count);
  return (
    <div className="adm-funnel">
      {steps.map((s, i) => {
        const drop = i > 0 && steps[i - 1].count > 0 ? Math.round((s.count / steps[i - 1].count) * 100) : null;
        return (
          <div key={s.name} className="adm-funnel-row">
            <div className="adm-funnel-bar" style={{ width: `${Math.max(6, (s.count / max) * 100)}%` }}><span>{s.name}</span><b>{fmtN(s.count)}</b></div>
            {drop !== null && <em>{drop}% of previous step</em>}
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

