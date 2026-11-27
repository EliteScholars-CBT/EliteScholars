import React, { useState, useEffect, useMemo } from 'react';
import { makeApi, fmtDT } from './adminApi';
import { fmtN, TrendChart, Donut, Bars, ColumnChart } from './AdminCharts';
import { compressPhoto } from '../utils/media';
import Fold from './AdminFold';

const mins = (s) => (s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`);
const hh = (h) => `${h % 12 || 12}${h < 12 ? 'am' : 'pm'}`;
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const pct = (cur, prev) => (prev > 0 ? Math.round(((cur - prev) / prev) * 100) : null);
// posts-index.json writes some dates without a time zone: those are Nigerian time
const pubMs = (s) => { const t = /Z$|[+-]\d\d:\d\d$/.test(String(s)) ? s : `${s}+01:00`; return new Date(t).getTime(); };
const fmtPub = (ms) => new Date(ms).toLocaleString('en-NG', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Africa/Lagos' });
const ago = (iso) => {
  const s = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  return `${Math.floor(s / 86400)} d ago`;
};
const inDays = (ms) => { const d = Math.ceil((ms - Date.now()) / 86400000); return d <= 0 ? 'today' : d === 1 ? 'tomorrow' : `in ${d} days`; };
const Change = ({ cur, prev, unit = 'before' }) => { const d = pct(cur, prev); return d === null ? <>{prev === 0 && cur > 0 ? 'new' : `${unit}: ${fmtN(prev)}`}</> : <>{d > 0 ? 'up' : d < 0 ? 'down' : 'same as'} {d !== 0 ? `${Math.abs(d)}%` : unit}</>; };

function CoverManager({ api, posts }) {
  const [covers, setCovers] = useState({});
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState('');
  const [err, setErr] = useState('');
  const load = () => api('blog-covers').then((d) => setCovers(d.covers || {})).catch((e) => e.message !== 'auth' && setErr(e.message));
  useEffect(() => { load(); }, []);
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
    <div>
      <p className="adm-note">Every post already has a designed cover. Upload your own picture (about 1200 × 630, landscape) to replace it. It shows within a minute, no redeploy needed.</p>
      {err && <div className="adm-error">{err}</div>}
      <input className="adm-search" placeholder="Search posts…" value={q} onChange={(e) => setQ(e.target.value)} style={{ marginBottom: 10, width: '100%', boxSizing: 'border-box' }} />
      <div className="adm-list tight adm-cols2">
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
    </div>
  );
}

function PostDetail({ p }) {
  if (!p) return <div className="adm-detail"><p className="adm-note" style={{ margin: 0 }}>No reads recorded for this post in this period.</p></div>;
  return (
    <div className="adm-detail">
      <div className="adm-facts">
        <div><span>Reads</span><b>{fmtN(p.views)}</b></div>
        <div><span>Avg time</span><b>{mins(p.avgSeconds)}</b></div>
        <div><span>Avg scroll depth</span><b>{p.avgScroll}%</b></div>
        <div><span>Finished reading</span><b>{p.finishRate}%</b></div>
        <div><span>Last read</span><b>{fmtDT(p.last)}</b></div>
      </div>
      {p.days.length > 1 && <><h3 className="adm-h3">Reads by day</h3><ColumnChart values={p.days.map((d) => d.views)} labels={p.days.map((d) => d.day.slice(5))} /></>}
      <div className="adm-grid adm-two" style={{ marginTop: 12 }}>
        <div><h3 className="adm-h3">Sources</h3><Bars data={p.referrers} /></div>
        <div><h3 className="adm-h3">Devices</h3><Bars data={p.devices} /></div>
      </div>
    </div>
  );
}

export default function AdminBlog({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [days, setDays] = useState(30);
  const [b, setB] = useState(null);
  const [index, setIndex] = useState([]);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState('');
  const [sort, setSort] = useState('new');
  const [q, setQ] = useState('');
  const [tick, setTick] = useState(0);

  useEffect(() => { fetch('/blog/posts-index.json').then((r) => r.json()).then((j) => setIndex(Array.isArray(j) ? j : [])).catch(() => {}); }, []);
  useEffect(() => {
    let on = true; setBusy(true);
    api('blog', { query: { days } }).then((d) => { if (on) { setB(d.blog); setErr(''); } }).catch((e) => e.message !== 'auth' && on && setErr(e.message)).finally(() => on && setBusy(false));
    return () => { on = false; };
  }, [api, days, tick]);

  const posts = useMemo(() => index.map((p) => ({ ...p, at: pubMs(p.publishAt), live: pubMs(p.publishAt) <= Date.now() })), [index]);
  const live = useMemo(() => posts.filter((p) => p.live), [posts]);
  const scheduled = useMemo(() => posts.filter((p) => !p.live).sort((a, c) => a.at - c.at), [posts]);
  const stats = useMemo(() => Object.fromEntries(((b && b.posts) || []).map((p) => [p.id, p])), [b]);

  const bestH = b ? b.hours.indexOf(Math.max(...b.hours)) : 0, bestD = b ? b.weekdays.indexOf(Math.max(...b.weekdays)) : 0;
  const haveTimes = b && b.totalViews >= 3;
  const liveShown = useMemo(() => {
    const t = q.trim().toLowerCase();
    const list = live.filter((p) => !t || p.title.toLowerCase().includes(t) || p.category.includes(t));
    return sort === 'reads' ? [...list].sort((a, c) => ((stats[c.id] || {}).views || 0) - ((stats[a.id] || {}).views || 0)) : [...list].sort((a, c) => c.at - a.at);
  }, [live, q, sort, stats]);

  return (
    <div>
      <section className="adm-controls">
        <div className="adm-pills">
          {[7, 30, 90].map((d) => <button key={d} className={days === d ? 'on' : ''} onClick={() => setDays(d)}>{d} days</button>)}
          <button onClick={() => setTick(tick + 1)} disabled={busy}>{busy ? 'Loading…' : 'Refresh'}</button>
        </div>
      </section>
      {err && <div className="adm-error">{err}</div>}
      {!b && busy && <div className="adm-card">Loading blog stats…</div>}
      {b && (
        <div className={busy ? 'adm-dim' : ''}>
          {b.truncated && <div className="adm-error">Very high traffic: figures may be slightly understated. Try a shorter range.</div>}
          <section className="adm-grid adm-stats">
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(b.totalViews)}</div><div className="adm-stat-label">Blog reads</div><div className="adm-stat-sub">last {b.days} days · <Change cur={b.totalViews} prev={b.prevViews} unit="before" /></div></div>
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(b.today)}</div><div className="adm-stat-label">Reads today</div><div className="adm-stat-sub">yesterday: {fmtN(b.yesterday)}</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{mins(b.avgSeconds)}</div><div className="adm-stat-label">Average time on a post</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{b.finishRate}%</div><div className="adm-stat-label">Read to the end</div><div className="adm-stat-sub">scrolled past 80%</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(live.length)}</div><div className="adm-stat-label">Posts published</div><div className="adm-stat-sub">{fmtN(scheduled.length)} scheduled</div></div>
          </section>

          <section className="adm-card"><h2>Reads per day</h2><TrendChart labels={b.series.labels} values={b.series.values} fmt={fmtN} /></section>

          <Fold title="When people read" hint={haveTimes ? `Busiest: ${hh(bestH)} · ${DAYS[bestD]}s` : 'Not enough reads yet'}>
            <p className="adm-note">Reads by hour of the day (Nigerian time) and by day of the week, over the last {b.days} days. Post just before the busy times.</p>
            <div className="adm-grid adm-two">
              <div><h3 className="adm-h3">By hour</h3><ColumnChart values={b.hours} labels={Array.from({ length: 24 }, (_, h) => `${h % 12 || 12}${h < 12 ? 'a' : 'p'}`)} /></div>
              <div><h3 className="adm-h3">By day</h3><ColumnChart values={b.weekdays} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} /></div>
            </div>
          </Fold>

          <Fold title="Latest reads" count={b.recent.length || undefined} hint={b.recent[0] ? `Last one ${ago(b.recent[0].at)}` : 'Nothing yet'}>
            {b.recent.map((r, i) => (
              <div className="adm-feed-row" key={i}>
                <span><b>{r.title}</b><small>{r.source} · {r.device}</small></span>
                <span><b style={{ fontSize: '.8rem' }}>{fmtDT(r.at)}</b><small>{r.seconds !== null ? `${mins(r.seconds)} · ${r.scroll}% read` : ago(r.at)}</small></span>
              </div>
            ))}
            {!b.recent.length && <p className="adm-empty">No blog reads recorded in this period.</p>}
          </Fold>

          <Fold title="Where readers come from" hint={b.referrers[0] ? `Top: ${b.referrers[0].name}` : ''}>
            <div className="adm-grid adm-two">
              <div><h3 className="adm-h3">Sources</h3><Bars data={b.referrers} /></div>
              <div><h3 className="adm-h3">Devices</h3><Donut data={b.devices} /></div>
            </div>
            {b.categories.length > 0 && <><h3 className="adm-h3">Categories</h3><Bars data={b.categories} /></>}
          </Fold>

          <Fold title="Published posts" count={live.length} hint={live.length ? 'Tap a post for its reads' : ''}>
            <div className="adm-inline" style={{ marginTop: 12 }}>
              <input className="adm-search" placeholder="Search posts…" value={q} onChange={(e) => setQ(e.target.value)} style={{ flex: 1, minWidth: 0 }} />
              <button className={`adm-small ${sort === 'new' ? '' : 'adm-ghost'}`} onClick={() => setSort('new')}>Newest</button>
              <button className={`adm-small ${sort === 'reads' ? '' : 'adm-ghost'}`} onClick={() => setSort('reads')}>Most read</button>
            </div>
            <div className="adm-list tight adm-cols2" style={{ marginTop: 10 }}>
              {liveShown.map((p) => {
                const s = stats[p.id];
                return (
                  <div key={p.id} className={`adm-item ${open === p.id ? 'open' : ''}`}>
                    <button className="adm-item-head" onClick={() => setOpen(open === p.id ? '' : p.id)} aria-expanded={open === p.id}>
                      <span className="adm-item-main"><b>{p.title}</b><small>{p.category} · published {fmtPub(p.at)}</small></span>
                      <span className="adm-item-side"><b>{fmtN(s ? s.views : 0)} reads</b><small>{s ? `${mins(s.avgSeconds)} avg · ${s.finishRate}% finished` : `none in ${b.days} days`}</small></span>
                    </button>
                    {open === p.id && <PostDetail p={s} />}
                  </div>
                );
              })}
              {!liveShown.length && <p className="adm-empty">No published posts match.</p>}
            </div>
          </Fold>

          <Fold title="Scheduled posts" count={scheduled.length} hint={scheduled[0] ? `Next: ${inDays(scheduled[0].at)}` : 'Nothing scheduled'}>
            <div className="adm-list tight adm-cols2" style={{ marginTop: 12 }}>
              {scheduled.map((p) => (
                <div key={p.id} className="adm-item">
                  <div className="adm-item-head static">
                    <span className="adm-item-main"><b>{p.title}</b><small>{p.category}</small></span>
                    <span className="adm-item-side"><b>{inDays(p.at)}</b><small>{fmtPub(p.at)}</small></span>
                  </div>
                </div>
              ))}
              {!scheduled.length && <p className="adm-empty">Nothing is scheduled. Every post is already published.</p>}
            </div>
          </Fold>
        </div>
      )}

      <Fold title="Cover pictures" hint="Replace a post's designed cover">
        <CoverManager api={api} posts={posts} />
      </Fold>
    </div>
  );
}
