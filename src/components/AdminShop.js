import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { makeApi } from './adminApi';
import { fmtNaira } from './AdminCharts';
import { compressPhoto } from '../utils/media';

const EMPTY = { id: '', title: '', description: '', price: '', category: 'Notes', badge: '', link: '', showApp: true, showBlog: false, showLanding: true, active: true, sort: 0, image: '', preview: '' };
const imgOf = (i) => (i.imageUrl || (i.image ? `/shop/${i.image}` : ''));

export default function AdminShop({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [items, setItems] = useState(null);
  const [f, setF] = useState(null);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => { try { setItems((await api('shop-list')).items); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); } }, [api]);
  useEffect(() => { load(); }, [load]);

  const flags = async (it, patch) => {
    const next = { showApp: it.show.app, showBlog: it.show.blog, showLanding: it.show.landing, active: it.active, ...patch };
    setBusy(true); setErr('');
    try {
      if (it.builtin) await api('shop-flags', { method: 'POST', body: { id: it.id, ...next } });
      else await api('shop-save', { method: 'POST', body: { id: it.id, title: it.title, description: it.description, price: it.priceNGN, category: it.category, badge: it.badge || '', link: it.link || '', sort: it.sort, ...next } });
      await load();
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  };

  const pick = async (file) => {
    if (!file) return;
    try { const d = await compressPhoto(file, 900, 190); setF((x) => ({ ...x, image: d, preview: d })); setErr(''); } catch { setErr('That picture could not be read. Try a JPG or PNG.'); }
  };
  const edit = (it) => { setMsg(''); setErr(''); setF({ ...EMPTY, builtin: !!it.builtin, id: it.id, title: it.title, description: it.description, price: String(it.priceNGN), category: it.category, badge: it.badge || '', link: it.link || '', showApp: it.show.app, showBlog: it.show.blog, showLanding: it.show.landing, active: it.active, sort: it.sort || 0, preview: imgOf(it) }); };
  const save = async () => {
    setBusy(true); setErr(''); setMsg('');
    try {
      await api('shop-save', { method: 'POST', body: { id: f.id, title: f.title, description: f.description, price: Number(f.price), category: f.category, badge: f.badge, link: f.link, showApp: f.showApp, showBlog: f.showBlog, showLanding: f.showLanding, active: f.active, sort: Number(f.sort) || 0, image: f.image || undefined } });
      setF(null); setMsg('Saved.'); await load();
    } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  };
  const del = async (it) => {
    if (!window.confirm(`Delete "${it.title}"? Students who already bought it keep their receipt.`)) return;
    try { await api('shop-delete', { method: 'POST', body: { id: it.id } }); await load(); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  };

  if (!items) return <div className="adm-card">{err || 'Loading…'}</div>;
  return (
    <div>
      {err && <div className="adm-error">{err}</div>}
      {msg && <div className="adm-ok">{msg}</div>}

      {!f && <div className="adm-savebar" style={{ position: 'static' }}><button onClick={() => setF({ ...EMPTY })}>+ Add an item</button></div>}

      {f && (
        <section className="adm-card">
          <h2>{f.id ? 'Edit item' : 'New item'}</h2>
          {f.builtin && <p className="adm-note" style={{ marginTop: 0 }}>Built-in item: you can change its picture, title, description and price here. The delivery link stays as set in the app.</p>}
          <div className="adm-form">
            <label>Picture {f.id ? '(leave as it is to keep the current one)' : ''}
              <input type="file" accept="image/*" onChange={(e) => pick(e.target.files && e.target.files[0])} /></label>
            {f.preview && <img className="adm-thumb" style={{ width: 120, height: 120 }} src={f.preview} alt="Preview" />}
            <label>Title<input value={f.title} maxLength={90} onChange={(e) => setF({ ...f, title: e.target.value })} /></label>
            <label>Short description<textarea rows={3} maxLength={400} value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} /></label>
            <div className="adm-form two">
              <label>Price (₦)<input type="number" inputMode="numeric" min="100" value={f.price} onChange={(e) => setF({ ...f, price: e.target.value })} /></label>
              <label>Category<input value={f.category} maxLength={30} onChange={(e) => setF({ ...f, category: e.target.value })} /></label>
              <label>Badge (optional)<input value={f.badge} maxLength={20} placeholder="Bestseller" onChange={(e) => setF({ ...f, badge: e.target.value })} /></label>
              <label>Order (small first)<input type="number" min="0" max="999" value={f.sort} onChange={(e) => setF({ ...f, sort: e.target.value })} /></label>
            </div>
            {!f.builtin && (<>
              <label>Link the buyer receives after paying (https://…)
                <input value={f.link} placeholder="Google Drive, Selar or download link" onChange={(e) => setF({ ...f, link: e.target.value })} /></label>
              <p className="adm-note" style={{ margin: 0 }}>This link is emailed to the buyer after payment and is never shown publicly.</p>
            </>)}
            <label className="adm-check"><input type="checkbox" checked={f.showApp} onChange={(e) => setF({ ...f, showApp: e.target.checked })} /> Show in the app shop</label>
            <label className="adm-check"><input type="checkbox" checked={f.showBlog} onChange={(e) => setF({ ...f, showBlog: e.target.checked })} /> Show on the blog</label>
            <label className="adm-check"><input type="checkbox" checked={f.showLanding} onChange={(e) => setF({ ...f, showLanding: e.target.checked })} /> Show on the landing page</label>
            <label className="adm-check"><input type="checkbox" checked={f.active} onChange={(e) => setF({ ...f, active: e.target.checked })} /> Available for sale</label>
            <div className="adm-inline">
              <button disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save item'}</button>
              <button className="adm-ghost" disabled={busy} onClick={() => setF(null)}>Cancel</button>
            </div>
          </div>
        </section>
      )}

      <section className="adm-card">
        <h2>Shop items</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>Built-in items keep their prices in the Prices tab. Switch where each item shows with the boxes.</p>
        <div className="adm-list tight">
          {items.map((it) => (
            <div className="adm-item" key={it.id}>
              <div className="adm-item-head static">
                {imgOf(it) ? <img className="adm-thumb" src={imgOf(it)} alt="" loading="lazy" /> : <span className="adm-thumb" />}
                <span className="adm-item-main"><b>{it.title} {!it.active && <span className="adm-chip ended">Hidden</span>}</b><small>{it.category} · {fmtNaira(it.priceNGN)}{it.builtin ? ' · built-in' : ''}</small></span>
              </div>
              <div className="adm-inline pad" style={{ flexWrap: 'wrap', gap: 12 }}>
                <label className="adm-check"><input type="checkbox" disabled={busy} checked={it.show.app} onChange={(e) => flags(it, { showApp: e.target.checked })} /> App</label>
                <label className="adm-check"><input type="checkbox" disabled={busy} checked={it.show.blog} onChange={(e) => flags(it, { showBlog: e.target.checked })} /> Blog</label>
                <label className="adm-check"><input type="checkbox" disabled={busy} checked={it.show.landing} onChange={(e) => flags(it, { showLanding: e.target.checked })} /> Landing</label>
                <label className="adm-check"><input type="checkbox" disabled={busy} checked={it.active} onChange={(e) => flags(it, { active: e.target.checked })} /> For sale</label>
                <button className="adm-small" onClick={() => edit(it)}>Edit</button>
                {!it.builtin && <button className="adm-small danger" onClick={() => del(it)}>Delete</button>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
