import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TEMPLATES, EMOJI, TAGS, TEXT_COLORS, tagColor } from '../utils/stickers';
import { loadImageFromFile, canvasToDataUrl } from '../utils/media';
import '../styles/studio.css';

// Sticker studio: pick a template or a photo, drop text and Gen-Z stickers on it
// (drag to move), then export one small JPEG. Used for statuses and squad chat.
const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
let uid = 1;
const nid = () => `l${uid++}`;

// deterministic scatter for template decorations
const DECO_POS = [[.12, .14], [.84, .1], [.5, .06], [.9, .42], [.1, .5], [.78, .78], [.22, .86], [.55, .9], [.38, .3], [.66, .24], [.3, .64], [.7, .58]];

function drawBase(ctx, W, H, tpl, photo) {
  if (photo) {
    const k = Math.max(W / photo.width, H / photo.height);
    const w = photo.width * k, h = photo.height * k;
    ctx.drawImage(photo, (W - w) / 2, (H - h) / 2, w, h);
    return;
  }
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, tpl.a); g.addColorStop(1, tpl.b);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (tpl.deco.length) {
    ctx.save(); ctx.globalAlpha = 0.16; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    DECO_POS.forEach((p, i) => { ctx.font = `${W * (0.12 + (i % 3) * 0.03)}px ${FONT}`; ctx.fillText(tpl.deco[i % tpl.deco.length], p[0] * W, p[1] * H); });
    ctx.restore();
  }
}

function drawLayer(ctx, l, W, H) {
  const px = l.s * W;
  ctx.save();
  ctx.translate(l.x * W, l.y * H);
  ctx.rotate((l.rot * Math.PI) / 180);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  if (l.kind === 'emoji') {
    ctx.font = `${px}px ${FONT}`; ctx.fillText(l.v, 0, 0);
  } else if (l.kind === 'tag') {
    ctx.font = `800 ${px}px ${FONT}`;
    const tw = ctx.measureText(l.v).width, padX = px * 0.7, padY = px * 0.35, w = tw + padX * 2, h = px + padY * 2, r = h / 2;
    ctx.fillStyle = l.color;
    ctx.beginPath(); ctx.moveTo(-w / 2 + r, -h / 2); ctx.arcTo(w / 2, -h / 2, w / 2, h / 2, r); ctx.arcTo(w / 2, h / 2, -w / 2, h / 2, r); ctx.arcTo(-w / 2, h / 2, -w / 2, -h / 2, r); ctx.arcTo(-w / 2, -h / 2, w / 2, -h / 2, r); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.fillText(l.v, 0, px * 0.04);
  } else {
    ctx.font = `800 ${px}px ${FONT}`;
    ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = px * 0.18; ctx.shadowOffsetY = px * 0.05;
    ctx.fillStyle = l.color;
    const lines = String(l.v).split('\n'); const lh = px * 1.25;
    lines.forEach((ln, i) => ctx.fillText(ln, 0, (i - (lines.length - 1) / 2) * lh));
  }
  ctx.restore();
}

export default function StickerStudio({ aspect = 9 / 16, initialFile = null, title = 'Design', cta = 'Use this', onDone, onClose }) {
  const [tplId, setTplId] = useState('locked');
  const [photo, setPhoto] = useState(null);
  const [layers, setLayers] = useState([]);
  const [sel, setSel] = useState(null);
  const [tab, setTab] = useState(initialFile ? 'stickers' : 'templates');
  const [W, setW] = useState(320);
  const [busy, setBusy] = useState(false);
  const stageRef = useRef(null);
  const baseRef = useRef(null);
  const drag = useRef(null);
  const tpl = TEMPLATES.find((t) => t.id === tplId) || TEMPLATES[0];
  const H = W / aspect;

  const setPhotoFromFile = useCallback(async (f) => {
    if (!f) return;
    try { const { img } = await loadImageFromFile(f); setPhoto(img); setLayers((ls) => ls.filter((l) => !l.preset)); } catch { /* ignore */ }
  }, []);

  useEffect(() => { if (initialFile) setPhotoFromFile(initialFile); }, [initialFile, setPhotoFromFile]);

  useLayoutEffect(() => {
    const measure = () => { if (stageRef.current) setW(stageRef.current.clientWidth || 320); };
    measure(); window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // start with the template's preset text
  useEffect(() => {
    if (!initialFile) setLayers([{ id: nid(), kind: 'text', v: TEMPLATES[0].text, x: .5, y: .5, s: .085, rot: 0, color: TEMPLATES[0].color, preset: true }]);
  }, [initialFile]);

  useEffect(() => {
    const c = baseRef.current; if (!c) return;
    c.width = Math.round(W * 2); c.height = Math.round(H * 2);
    drawBase(c.getContext('2d'), c.width, c.height, tpl, photo);
  }, [W, H, tpl, photo]);

  const pickTemplate = (t) => {
    setTplId(t.id); setPhoto(null);
    setLayers((ls) => {
      const keep = ls.filter((l) => !l.preset);
      return t.text ? [...keep, { id: nid(), kind: 'text', v: t.text, x: .5, y: .5, s: .085, rot: 0, color: t.color, preset: true }] : keep;
    });
    setSel(null);
  };

  const add = (l) => { const n = { id: nid(), x: .5, y: .5, rot: 0, ...l }; setLayers((ls) => [...ls, n]); setSel(n.id); };
  const upd = (id, patch) => setLayers((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch, preset: patch.v !== undefined ? false : l.preset } : l)));
  const cur = layers.find((l) => l.id === sel);

  const onDown = (e, l) => {
    e.stopPropagation(); setSel(l.id);
    const r = stageRef.current.getBoundingClientRect();
    drag.current = { id: l.id, dx: l.x - (e.clientX - r.left) / r.width, dy: l.y - (e.clientY - r.top) / r.height };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  };
  const onMove = (e) => {
    const d = drag.current; if (!d) return;
    const r = stageRef.current.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width + d.dx));
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height + d.dy));
    upd(d.id, { x, y });
  };
  const onUp = () => { drag.current = null; };

  const finish = async () => {
    if (busy) return; setBusy(true);
    const CW = 720, CH = Math.round(CW / aspect);
    const c = document.createElement('canvas'); c.width = CW; c.height = CH;
    const ctx = c.getContext('2d');
    drawBase(ctx, CW, CH, tpl, photo);
    layers.forEach((l) => drawLayer(ctx, l, CW, CH));
    const url = canvasToDataUrl(c, 190);
    setBusy(false);
    onDone(url);
  };

  const layerStyle = (l) => {
    const px = l.s * W;
    const base = { left: `${l.x * 100}%`, top: `${l.y * 100}%`, fontSize: px, transform: `translate(-50%,-50%) rotate(${l.rot}deg)` };
    if (l.kind === 'tag') return { ...base, background: l.color, color: '#fff', padding: `${px * 0.35}px ${px * 0.7}px`, borderRadius: 999, fontWeight: 800 };
    if (l.kind === 'text') return { ...base, color: l.color, fontWeight: 800, textShadow: `0 ${px * 0.05}px ${px * 0.18}px rgba(0,0,0,.35)`, lineHeight: 1.25 };
    return base;
  };

  return createPortal(
    <div className="ss-wrap" role="dialog" aria-label={title}>
      <div className="ss-top">
        <button className="ss-btn ghost" onClick={onClose}>✕</button>
        <b>{title}</b>
        <button className="ss-btn go" disabled={busy} onClick={finish}>{busy ? '…' : cta}</button>
      </div>
      <div className="ss-stage-box">
        <div className="ss-stage" ref={stageRef} style={{ aspectRatio: String(aspect), maxWidth: `calc((100dvh - 330px) * ${aspect})` }} onPointerDown={() => setSel(null)}>
          <canvas ref={baseRef} className="ss-base" />
          {layers.map((l) => (
            <div key={l.id} className={`ss-layer ${l.kind} ${sel === l.id ? 'sel' : ''}`} style={layerStyle(l)}
              onPointerDown={(e) => onDown(e, l)} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
              {String(l.v).split('\n').map((ln, i) => <div key={i}>{ln || ' '}</div>)}
            </div>
          ))}
        </div>
      </div>

      {cur && (
        <div className="ss-tool">
          {cur.kind === 'text' && <input className="allow-copy ss-in" value={cur.v.replace(/\n/g, ' / ')} maxLength={60} onChange={(e) => upd(cur.id, { v: e.target.value.replace(/ \/ /g, '\n') })} aria-label="Edit text" />}
          <button onClick={() => upd(cur.id, { s: Math.max(.03, cur.s * 0.85) })} aria-label="Smaller">A−</button>
          <button onClick={() => upd(cur.id, { s: Math.min(.4, cur.s * 1.18) })} aria-label="Bigger">A+</button>
          <button onClick={() => upd(cur.id, { rot: (cur.rot + 12) % 360 })} aria-label="Rotate">↻</button>
          {cur.kind === 'text' && <button onClick={() => upd(cur.id, { color: TEXT_COLORS[(TEXT_COLORS.indexOf(cur.color) + 1) % TEXT_COLORS.length] })} aria-label="Colour"><i className="ss-dot" style={{ background: cur.color }} /></button>}
          <button className="del" onClick={() => { setLayers((ls) => ls.filter((l) => l.id !== cur.id)); setSel(null); }} aria-label="Remove">🗑</button>
        </div>
      )}

      <div className="ss-panel">
        <div className="ss-tabs">
          {[['templates', 'Templates'], ['stickers', 'Stickers'], ['text', 'Text'], ['photo', 'Photo']].map(([id, n]) => <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>{n}</button>)}
        </div>
        {tab === 'templates' && (
          <div className="ss-row">
            {TEMPLATES.map((t) => <button key={t.id} className={`ss-tpl ${!photo && tplId === t.id ? 'on' : ''}`} style={{ background: `linear-gradient(135deg,${t.a},${t.b})` }} onClick={() => pickTemplate(t)}><span>{t.deco[0] || '🎨'}</span><small>{t.name}</small></button>)}
          </div>
        )}
        {tab === 'stickers' && (
          <div className="ss-stk">
            <div className="ss-row wrap">{EMOJI.map((e) => <button key={e} className="ss-em" onClick={() => add({ kind: 'emoji', v: e, s: .14 })}>{e}</button>)}</div>
            <div className="ss-row wrap">{TAGS.map((t) => <button key={t.t} className="ss-tag" style={{ background: t.c }} onClick={() => add({ kind: 'tag', v: t.t, s: .05, color: tagColor(t.t), rot: -6 })}>{t.t}</button>)}</div>
          </div>
        )}
        {tab === 'text' && (
          <div className="ss-row">
            <button className="ss-add" onClick={() => add({ kind: 'text', v: 'Your text', s: .08, color: tpl.color || '#fff' })}>＋ Add text</button>
            <button className="ss-add" onClick={() => add({ kind: 'text', v: 'big mood', s: .13, color: '#FDE047' })}>＋ Big title</button>
          </div>
        )}
        {tab === 'photo' && (
          <div className="ss-row">
            <label className="ss-add">🖼 Gallery<input type="file" accept="image/*" hidden onChange={(e) => { setPhotoFromFile(e.target.files && e.target.files[0]); e.target.value = ''; }} /></label>
            <label className="ss-add">📷 Camera<input type="file" accept="image/*" capture="environment" hidden onChange={(e) => { setPhotoFromFile(e.target.files && e.target.files[0]); e.target.value = ''; }} /></label>
            {photo && <button className="ss-add" onClick={() => setPhoto(null)}>Remove photo</button>}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
