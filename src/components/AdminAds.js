import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { makeApi } from './adminApi';
import { fmtN, TrendChart } from './AdminCharts';

const Check = ({ label, hint, checked, onChange, disabled }) => (
  <label className="adm-check adm-check-row">
    <input type="checkbox" checked={!!checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
    <span><b>{label}</b>{hint && <small>{hint}</small>}</span>
  </label>
);

export default function AdminAds({ token, onAuthFail, only }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [ads, setAds] = useState(null);
  const [stats, setStats] = useState(null);
  const [days, setDays] = useState(30);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [view, setView] = useState(only === 'earnings' ? 'adsterra' : 'own');
  const [ast, setAst] = useState(null);
  const [agb, setAgb] = useState('date');

  const load = useCallback(async () => {
    try { const d = await api('ads'); setAds(d.ads); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
  }, [api]);
  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    let on = true;
    api('ads-stats', { query: { days } }).then((d) => on && setStats(d.stats)).catch((e) => e.message !== 'auth' && on && setErr(e.message));
    return () => { on = false; };
  }, [api, days]);

  useEffect(() => {
    if (view !== 'adsterra') return undefined;
    let on = true; setAst(null);
    api('ads-adsterra', { query: { days, group_by: agb } }).then((d) => on && setAst(d.adsterra)).catch((e) => e.message !== 'auth' && on && setAst({ error: e.message }));
    return () => { on = false; };
  }, [api, days, agb, view]);

  const set = (path, val) => setAds((a) => {
    const n = JSON.parse(JSON.stringify(a)); let o = n; const k = path.split('.');
    k.slice(0, -1).forEach((x) => { o = o[x]; }); o[k[k.length - 1]] = val; return n;
  });
  const save = async () => {
    setBusy(true); setMsg(''); setErr('');
    try { const d = await api('ads-save', { method: 'POST', body: { ads } }); setAds(d.ads); setMsg('Saved. Changes reach visitors within about a minute.'); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(false);
  };
  if (!ads && !only) return <div className="adm-card">{err || 'Loading…'}</div>;
  const off = ads ? !ads.master : false;

  return (
    <div>
      {err && <div className="adm-error">{err}</div>}
      {msg && <div className="adm-ok">{msg}</div>}
      {!only && (<>

      <section className="adm-card">
        <h2>Ads on or off</h2>
        <Check label="Show ads at all" hint="Master switch. Off = no ads anywhere (blog and app)." checked={ads.master} onChange={(v) => set('master', v)} />
        <Check label="Hide ads from Pro students" hint="Recommended: it is one of the reasons to go Pro." checked={ads.hideForPremium} onChange={(v) => set('hideForPremium', v)} disabled={off} />
      </section>

      <section className="adm-card">
        <h2>Blog</h2>
        <Check label="Show ads on the blog" checked={ads.blog.enabled} onChange={(v) => set('blog.enabled', v)} disabled={off} />
        <div className="adm-sub">
          <Check label="Top of the post" checked={ads.blog.slots.top} onChange={(v) => set('blog.slots.top', v)} disabled={off || !ads.blog.enabled} />
          <Check label="Inside the article" checked={ads.blog.slots.inline} onChange={(v) => set('blog.slots.inline', v)} disabled={off || !ads.blog.enabled} />
          <Check label="End of the article" checked={ads.blog.slots.end} onChange={(v) => set('blog.slots.end', v)} disabled={off || !ads.blog.enabled} />
          <Check label="Sidebar (desktop)" checked={ads.blog.slots.sidebar} onChange={(v) => set('blog.slots.sidebar', v)} disabled={off || !ads.blog.enabled} />
          <Check label="Between posts on the blog list" checked={ads.blog.slots.feed} onChange={(v) => set('blog.slots.feed', v)} disabled={off || !ads.blog.enabled} />
          <Check label="Social bar" hint="Small slide-in from Adsterra." checked={ads.blog.socialBar} onChange={(v) => set('blog.socialBar', v)} disabled={off || !ads.blog.enabled} />
          <Check label="Fill empty spots with our own promos" hint="Otherwise spots with no ad stay hidden." checked={ads.blog.house} onChange={(v) => set('blog.house', v)} disabled={off || !ads.blog.enabled} />
        </div>
      </section>

      <section className="adm-card">
        <h2>App</h2>
        <Check label="Show ads in the app" checked={ads.app.enabled} onChange={(v) => set('app.enabled', v)} disabled={off} />
        <div className="adm-sub">
          <Check label="Learn mode: under the text sections" checked={ads.app.learn.enabled} onChange={(v) => set('app.learn.enabled', v)} disabled={off || !ads.app.enabled} />
          <div className="adm-form two">
            <label>Show after every … sections
              <input type="number" min="1" max="10" value={ads.app.learn.everySections} onChange={(e) => set('app.learn.everySections', Number(e.target.value))} disabled={off || !ads.app.enabled || !ads.app.learn.enabled} /></label>
            <label>At most … ads per topic
              <input type="number" min="1" max="10" value={ads.app.learn.max} onChange={(e) => set('app.learn.max', Number(e.target.value))} disabled={off || !ads.app.enabled || !ads.app.learn.enabled} /></label>
          </div>
          <Check label="After a quiz result" checked={ads.app.results} onChange={(v) => set('app.results', v)} disabled={off || !ads.app.enabled} />
          <Check label="Social bar" hint="Loads after about 45 seconds, never during a quiz or game." checked={ads.app.socialBar} onChange={(v) => set('app.socialBar', v)} disabled={off || !ads.app.enabled} />
          <Check label="Fill empty spots with our own promos" checked={ads.app.house} onChange={(v) => set('app.house', v)} disabled={off || !ads.app.enabled} />
        </div>
      </section>

      <section className="adm-card">
        <h2>Our own ads</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>Promos we run ourselves (affiliate marketing, Resumify and so on). Switch one on and it joins the rotation in the app. Views and clicks come from the last {days} days.</p>
        {(ads.ownAds || []).map((o, i) => {
          const st = (stats ? stats.placements : []).filter((x) => String(x.name).endsWith(`own-${o.id}`));
          const views = st.reduce((a, x) => a + x.views, 0), clicks = st.reduce((a, x) => a + x.clicks, 0);
          const upd = (k, v) => set(`ownAds.${i}.${k}`, v);
          return (
            <div key={o.id} className="adm-ownad">
              <div className="adm-ownad-top">
                {o.image ? <img src={o.image} alt="" /> : <span className="adm-ownad-ph">📣</span>}
                <div><b>{o.title || 'Untitled'}</b><small>{views} views · {clicks} clicks</small></div>
                <label className="adm-switch"><input type="checkbox" checked={!!o.enabled} onChange={(e) => upd('enabled', e.target.checked)} disabled={off} /><span>{o.enabled ? 'On' : 'Off'}</span></label>
              </div>
              <div className="adm-form">
                <label>Headline<input value={o.title} maxLength={80} onChange={(e) => upd('title', e.target.value)} /></label>
                <label>Short text<input value={o.desc} maxLength={200} onChange={(e) => upd('desc', e.target.value)} /></label>
                <label>Button words<input value={o.cta} maxLength={40} onChange={(e) => upd('cta', e.target.value)} /></label>
                <label>Link (WhatsApp or website)<input value={o.link} onChange={(e) => upd('link', e.target.value)} placeholder="https://…" /></label>
                <label>Picture (address)<input value={o.image} onChange={(e) => upd('image', e.target.value)} placeholder="/images/ads/name.jpg" /></label>
              </div>
              <button type="button" className="adm-link-danger" onClick={() => set('ownAds', ads.ownAds.filter((_, k) => k !== i))}>Remove this ad</button>
            </div>
          );
        })}
        {(ads.ownAds || []).length < 12 && <button type="button" className="adm-btn-ghost" onClick={() => set('ownAds', [...(ads.ownAds || []), { id: `ad${Date.now().toString(36)}`, enabled: false, title: 'New promo', desc: '', cta: 'Open →', image: '', link: 'https://' }])}>＋ Add an ad</button>}
      </section>

      <section className="adm-card">
        <h2>Adsterra units</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>Paste the address inside <code>src="…"</code> from each Adsterra code. Leave a unit off or empty to skip it.</p>
        <Check label="Native banner" checked={ads.units.native.enabled} onChange={(v) => set('units.native.enabled', v)} />
        <div className="adm-form">
          <label>Native script address
            <input value={ads.units.native.src} onChange={(e) => set('units.native.src', e.target.value)} placeholder="https://…/invoke.js" /></label>
          <label>Native container id
            <input value={ads.units.native.containerId} onChange={(e) => set('units.native.containerId', e.target.value)} placeholder="container-xxxxxxxx" /></label>
        </div>
        <Check label="Social bar" checked={ads.units.socialBar.enabled} onChange={(v) => set('units.socialBar.enabled', v)} />
        <div className="adm-form">
          <label>Social bar script address
            <input value={ads.units.socialBar.src} onChange={(e) => set('units.socialBar.src', e.target.value)} placeholder="https://…" /></label>
        </div>
      </section>

      <div className="adm-savebar"><button disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save ad settings'}</button></div>

      </>)}
      <section className="adm-controls">
        {!only && <div className="adm-pills">{[['own', 'Our views'], ['adsterra', 'Adsterra earnings']].map(([k, l]) => <button key={k} className={view === k ? 'on' : ''} onClick={() => setView(k)}>{l}</button>)}</div>}
        <div className="adm-pills">{[1, 7, 30, 90].map((d) => <button key={d} className={days === d ? 'on' : ''} onClick={() => setDays(d)}>{d} days</button>)}</div>
      </section>
      {view === 'adsterra' && (
        <>
          <section className="adm-controls"><div className="adm-pills">{[['date', 'By day'], ['country', 'Country'], ['placement', 'Placement'], ['domain', 'Domain'], ['device_type', 'Device']].map(([k, l]) => <button key={k} className={agb === k ? 'on' : ''} onClick={() => setAgb(k)}>{l}</button>)}</div></section>
          {!ast && <div className="adm-card">Loading Adsterra…</div>}
          {ast && ast.configured === false && <div className="adm-error">{ast.message}</div>}
          {ast && ast.error && <div className="adm-error">{ast.error}</div>}
          {ast && ast.totals && (
            <>
              <section className="adm-grid adm-stats">
                <div className="adm-stat"><div className="adm-stat-val">${ast.totals.revenue.toFixed(2)}</div><div className="adm-stat-label">Earned</div></div>
                <div className="adm-stat"><div className="adm-stat-val">{fmtN(ast.totals.impressions)}</div><div className="adm-stat-label">Impressions</div></div>
                <div className="adm-stat"><div className="adm-stat-val">{fmtN(ast.totals.clicks)}</div><div className="adm-stat-label">Clicks · {ast.totals.ctr.toFixed(2)}% CTR</div></div>
                <div className="adm-stat"><div className="adm-stat-val">${ast.totals.cpm.toFixed(2)}</div><div className="adm-stat-label">Average CPM</div></div>
              </section>
              {ast.groupBy === 'date' && ast.items.length > 1 && <section className="adm-card"><h2>Earnings per day ($)</h2><TrendChart labels={ast.items.map((x) => x.label.slice(5))} values={ast.items.map((x) => x.revenue)} fmt={(v) => `$${Number(v).toFixed(2)}`} /></section>}
              <section className="adm-card">
                <h2>Breakdown</h2>
                <div className="adm-list tight">
                  {[...ast.items].sort((a, b) => (ast.groupBy === 'date' ? 0 : b.revenue - a.revenue)).slice(0, 60).map((x) => (
                    <div className="adm-item" key={x.label}><div className="adm-item-head static">
                      <span className="adm-item-main"><b>{x.label}</b><small>{fmtN(x.impressions)} impressions · {fmtN(x.clicks)} clicks</small></span>
                      <span className="adm-item-side"><b>${x.revenue.toFixed(2)}</b><small>CPM ${x.cpm.toFixed(2)}</small></span>
                    </div></div>
                  ))}
                </div>
                {!ast.items.length && <p className="adm-empty">Adsterra has no data for this period yet.</p>}
              </section>
            </>
          )}
        </>
      )}
      {view === 'own' && stats && (
        <>
          <section className="adm-grid adm-stats">
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(stats.appViews)}</div><div className="adm-stat-label">App ad views</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(stats.blogViews)}</div><div className="adm-stat-label">Blog ad views</div></div>
            <div className="adm-stat"><div className="adm-stat-val">{fmtN(stats.clicks)}</div><div className="adm-stat-label">Clicks on our own promos</div></div>
          </section>
          <section className="adm-card"><h2>Ad views per day</h2><TrendChart labels={stats.series.labels} values={stats.series.app.map((v, i) => v + stats.series.blog[i])} fmt={fmtN} /></section>
          <section className="adm-card">
            <h2>By spot</h2>
            {stats.placements.length ? (
              <div className="adm-list tight">
                {stats.placements.slice(0, 30).map((p) => (
                  <div className="adm-item" key={`${p.surface}${p.name}${p.kind}`}>
                    <div className="adm-item-head static">
                      <span className="adm-item-main"><b>{p.surface}: {p.name}</b><small>{p.kind}</small></span>
                      <span className="adm-item-side"><b>{fmtN(p.views)} views</b>{p.clicks > 0 && <small>{fmtN(p.clicks)} clicks</small>}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="adm-empty">No ad views recorded yet in this period.</p>}
            <p className="adm-note">Views are counted when an ad is on screen. Earnings and clicks on Adsterra ads are only in your Adsterra dashboard.</p>
          </section>
        </>
      )}
      {view === 'own' && stats && stats.truncated && <div className="adm-error">Very high traffic: figures may be slightly understated. Try a shorter range.</div>}
    </div>
  );
}
