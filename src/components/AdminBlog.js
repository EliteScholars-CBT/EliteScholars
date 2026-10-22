import React, { useState, useEffect, useMemo } from 'react';
import { makeApi } from './adminApi';
import { fmtN, TrendChart, Donut, Bars, ColumnChart } from './AdminCharts';
import { compressPhoto } from '../utils/media';

const mins = (s) => (s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`);

function CoverManager({ api }) {
  const [posts, setPosts] = useState([]);
  const [covers, setCovers] = useState({});
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState('');
  const [err, setErr] = useState('');
  const load = () => api('blog-covers').then((d) => setCovers(d.covers || {})).catch((e) => e.message !== 'auth' && setErr(e.message));
  useEffect(() => {
    fetch('/blog/posts-index.json').then((r) => r.json()).then((j) => setPosts(Array.isArray(j) ? j : [])).catch(() => {});
    load();
  }, []);
  const upload = async (p, file) => {
    if (!file) return;
    setBusy(p.id); setErr('');
    try {
      const image = await compressPhoto(file, 1200, 210);
      await api('blog-cover-save', { method: 'POST', body: { postId: p.id, image } });
      await load();
    } catch (e) { if (e.message !== 'auth') setErr(e.message || 'Could not upload that picture.'); }
    setBusy('');
  };
  const clear = async (p) => { setBusy(p.id); try { await api('blog-cover-clear', { method: 'POST', body: { postId: p.id } }); await load(); } catch (e) { if (e.message !== 'auth') setErr(e.message); } setBusy(''); };
  const shown = posts.filter((p) => !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.category.includes(q.toLowerCase())).slice(0, 60);
  return (
    <section className="adm-card">
      <h2>Cover pictures</h2>
      <p className="adm-note" style={{ marginTop: 0 }}>Every post already has a designed cover. Upload your own picture (about 1200 × 630, landscape) to replace it. It shows within a minute, no redeploy needed.</p>
      {err && <div className="adm-error">{err}</div>}
      <input className="adm-search" placeholder="Search posts…" value={q} onChange={(e) => setQ(e.target.value)} style={{ marginBottom: 10, width: '100%', boxSizing: 'border-box' }} />
      <div className="adm-list tight">
        {shown.map((p) => (
          <div className="adm-item" key={p.id}>
            <div className="adm-item-head static">
              <img className="adm-thumb" style={{ width: 84, height: 44 }} src={covers[p.id] || `/blog/covers/${p.id}.svg`} alt="" loading="lazy" />
              <span className="adm-item-main"><b>{p.title}</b><small>{p.category} · {p.live ? 'live' : 'scheduled'}{covers[p.id] ? ' · your picture' : ''}</small></span>
            </div>
            <div className="adm-inline pad">
              <label className="adm-small" style={{ cursor: 'pointer' }}>{busy === p.id ? 'Uploading…' : (covers[p.id] ? 'Change picture' : 'Upload picture')}
                <input type="file" accept="image/*" hidden disabled={busy === p.id} onChange={(e) => { upload(p, e.target.files && e.target.files[0]); e.target.value = ''; }} /></label>
              {covers[p.id] && <button className="adm-small" disabled={busy === p.id} onClick={() => clear(p)}>Use designed cover</button>}
            </div>
          </div>
        ))}
        {!shown.length && <p className="adm-empty">No posts found.</p>}
      </div>
    </section>
  );
}

export default function AdminBlog({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [days, setDays] = useState(30);
  const [b, setB] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState('');

  useEffect(() => {
    let on = true; setBusy(true);
    api('blog', { query: { days } }).then((d) => { if (on) { setB(d.blog); setErr(''); } }).catch((e) => e.message !== 'auth' && on && setErr(e.message)).finally(() => on && setBusy(false));
    return () => { on = false; };
  }, [api, days]);

  return (
    <div>
      <section className="adm-controls"><div className="adm-pills">{[7, 30, 90].map((d) => <button key={d} className={days === d ? 'on' : ''} onClick={() => setDays(d)}>{d} days</button>)}</div></section>
      {err && <div className="adm-error">{err}</div>}
      {!b && busy && <div className="adm-card">Loading blog stats…</div>}
      {b && (
        <div className={busy ? 'adm-dim' : ''}>
          {b.truncated && <div className="adm-error">Very high traffic: figures may be slightly understated. Try a shorter range.</div>}
          <section className="adm-grid adm-stats">
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(b.totalViews)}</div><div className="adm-stat-label">Blog reads</div><div className="adm-stat-sub">last {b.days} days</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{mins(b.avgSeconds)}</div><div className="adm-stat-label">Average time on a post</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{b.finishRate}%</div><div className="adm-stat-label">Read to the end</div><div className="adm-stat-sub">scrolled past 80%</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(b.posts.length)}</div><div className="adm-stat-label">Posts read</div></div>
          </section>
          <section className="adm-card"><h2>Reads per day</h2><TrendChart labels={b.series.labels} values={b.series.values} fmt={fmtN} /></section>
          <section className="adm-grid adm-two">
            <div className="adm-card"><h2>Where readers come from</h2><Bars data={b.referrers} /></div>
            <div className="adm-card"><h2>Devices</h2><Donut data={b.devices} /></div>
          </section>
          {b.categories.length > 0 && <section className="adm-card"><h2>Categories</h2><Bars data={b.categories} /></section>}
          <section className="adm-card">
            <h2>Posts — tap one for details</h2>
            <div className="adm-list tight">
              {b.posts.map((p) => (
                <div key={p.id} className={`adm-item ${open === p.id ? 'open' : ''}`}>
                  <button className="adm-item-head" onClick={() => setOpen(open === p.id ? '' : p.id)} aria-expanded={open === p.id}>
                    <span className="adm-item-main"><b>{p.title}</b><small>{p.category || 'Uncategorised'}</small></span>
                    <span className="adm-item-side"><b>{fmtN(p.views)} reads</b><small>{mins(p.avgSeconds)} avg · {p.finishRate}% finished</small></span>
                    <span className="adm-caret">{open === p.id ? '▴' : '▾'}</span>
                  </button>
                  {open === p.id && (
                    <div className="adm-detail">
                      <div className="adm-facts">
                        <div><span>Reads</span><b>{fmtN(p.views)}</b></div>
                        <div><span>Avg time</span><b>{mins(p.avgSeconds)}</b></div>
                        <div><span>Avg scroll depth</span><b>{p.avgScroll}%</b></div>
                        <div><span>Finished reading</span><b>{p.finishRate}%</b></div>
                      </div>
                      {p.days.length > 1 && <><h3 className="adm-h3">Reads by day</h3><ColumnChart values={p.days.map((d) => d.views)} labels={p.days.map((d) => d.day.slice(5))} /></>}
                      <div className="adm-grid adm-two" style={{ marginTop: 12 }}>
                        <div><h3 className="adm-h3">Sources</h3><Bars data={p.referrers} /></div>
                        <div><h3 className="adm-h3">Devices</h3><Bars data={p.devices} /></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {!b.posts.length && <p className="adm-empty">No blog reads recorded in this period.</p>}
            </div>
          </section>
        </div>
      )}
      <CoverManager api={api} />
    </div>
  );
}
