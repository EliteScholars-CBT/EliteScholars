import React from 'react';

// Small dependency-free SVG charts for the school portal.
const C = { acc: '#7C3AED', acc2: '#C4B5FD', green: '#10B981', amber: '#F59E0B', red: '#EF4444', grid: '#E5E0F7', ink: '#6B6490' };
export const colorFor = (v) => (v >= 70 ? C.green : v >= 50 ? C.amber : C.red);

// Line / area chart. data: [{ label, value }] (value may be null = gap). Optional second series.
export function LineChart({ data, data2, height = 150, max, unit = '', color = C.acc, color2 = C.green, ticks = 4 }) {
  const W = 320, H = height, L = 30, R = 8, T = 10, B = 22;
  const vals = [...data, ...(data2 || [])].map((d) => d.value).filter((v) => v !== null && v !== undefined);
  const top = max || Math.max(5, Math.ceil(Math.max(1, ...vals) / 5) * 5);
  const x = (i) => L + (data.length <= 1 ? (W - L - R) / 2 : (i * (W - L - R)) / (data.length - 1));
  const y = (v) => T + (H - T - B) * (1 - v / top);
  const path = (arr) => { let d = ''; let pen = false; arr.forEach((p, i) => { if (p.value === null || p.value === undefined) { pen = false; return; } d += `${pen ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.value).toFixed(1)} `; pen = true; }); return d; };
  const area = (arr) => { const pts = arr.map((p, i) => [x(i), y(p.value || 0)]); return pts.length > 1 ? `M${pts[0][0]},${H - B} ` + pts.map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + ` L${pts[pts.length - 1][0]},${H - B} Z` : ''; };
  const step = Math.max(1, Math.ceil(data.length / 6));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ptc" role="img" aria-label="Line chart">
      {Array.from({ length: ticks + 1 }, (_, i) => { const v = (top * i) / ticks; return <g key={i}><line x1={L} x2={W - R} y1={y(v)} y2={y(v)} stroke={C.grid} strokeWidth="1" /><text x={L - 5} y={y(v) + 3} fontSize="9" fill={C.ink} textAnchor="end">{Math.round(v)}{unit}</text></g>; })}
      <path d={area(data)} fill={color} opacity="0.12" />
      <path d={path(data)} fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      {data2 && <path d={path(data2)} fill="none" stroke={color2} strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />}
      {data.map((p, i) => (i % step === 0 || i === data.length - 1) && <text key={i} x={x(i)} y={H - 6} fontSize="9" fill={C.ink} textAnchor="middle">{p.label}</text>)}
      {data.length <= 14 && data.map((p, i) => p.value !== null && p.value !== undefined && <circle key={i} cx={x(i)} cy={y(p.value)} r="2.6" fill={color} />)}
    </svg>
  );
}

// Vertical bars. data: [{ label, value, color? }]
export function BarChart({ data, height = 150, max, unit = '', color = C.acc }) {
  const W = 320, H = height, L = 30, R = 6, T = 14, B = 24;
  const top = max || Math.max(5, Math.ceil(Math.max(1, ...data.map((d) => d.value || 0)) / 5) * 5);
  const bw = (W - L - R) / Math.max(1, data.length);
  const y = (v) => T + (H - T - B) * (1 - v / top);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ptc" role="img" aria-label="Bar chart">
      {[0, 0.5, 1].map((f) => <g key={f}><line x1={L} x2={W - R} y1={y(top * f)} y2={y(top * f)} stroke={C.grid} /><text x={L - 5} y={y(top * f) + 3} fontSize="9" fill={C.ink} textAnchor="end">{Math.round(top * f)}{unit}</text></g>)}
      {data.map((d, i) => { const h = H - B - y(d.value || 0); const bx = L + i * bw + bw * 0.18; return (
        <g key={i}><rect x={bx} y={y(d.value || 0)} width={bw * 0.64} height={Math.max(0, h)} rx="4" fill={d.color || color} /><text x={bx + bw * 0.32} y={y(d.value || 0) - 3} fontSize="9" fontWeight="700" fill={C.ink} textAnchor="middle">{d.value}{unit}</text><text x={bx + bw * 0.32} y={H - 8} fontSize="9" fill={C.ink} textAnchor="middle">{String(d.label).slice(0, 8)}</text></g>
      ); })}
    </svg>
  );
}

// Horizontal bars with labels. data: [{ label, value, note?, color? }]
export function HBars({ data, max = 100, unit = '%' }) {
  return (
    <div className="ptc-h">
      {data.map((d, i) => (
        <div className="ptc-hrow" key={i}>
          <div className="ptc-hlab"><span>{d.label}</span><b>{d.value}{unit}</b></div>
          <div className="ptc-htrack"><div className="ptc-hfill" style={{ width: `${Math.max(2, Math.min(100, (d.value / max) * 100))}%`, background: d.color || colorFor(d.value) }} /></div>
          {d.note && <small>{d.note}</small>}
        </div>
      ))}
    </div>
  );
}

// Donut with a centre label.
export function Donut({ value, total, label, color = C.acc, size = 120 }) {
  const r = 46, c = 2 * Math.PI * r, f = total > 0 ? Math.min(1, value / total) : 0;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={`${Math.round(f * 100)} percent`}>
      <circle cx="60" cy="60" r={r} fill="none" stroke={C.grid} strokeWidth="13" />
      <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="13" strokeLinecap="round" strokeDasharray={`${c * f} ${c}`} transform="rotate(-90 60 60)" />
      <text x="60" y="58" textAnchor="middle" fontSize="22" fontWeight="800" fill="#1B1340">{Math.round(f * 100)}%</text>
      <text x="60" y="75" textAnchor="middle" fontSize="9.5" fill={C.ink}>{label}</text>
    </svg>
  );
}

// Tiny trend arrow with the change.
export function Delta({ now, before, unit = '', invert }) {
  if (before === null || before === undefined) return null;
  const d = Math.round((now - before) * 10) / 10;
  if (d === 0) return <span className="ptc-delta flat">no change</span>;
  const good = invert ? d < 0 : d > 0;
  return <span className={`ptc-delta ${good ? 'up' : 'down'}`}>{d > 0 ? '▲' : '▼'} {Math.abs(d)}{unit} vs before</span>;
}
