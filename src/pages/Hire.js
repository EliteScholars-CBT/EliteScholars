import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/hire.css';
import logo from '../assets/elite-scholars-logo.png';

async function call(path, { method = 'GET', body, query } = {}) {
  const qs = query ? `?${new URLSearchParams(query)}` : '';
  const r = await fetch(`/api/hire/${path}${qs}`, { method, headers: body ? { 'Content-Type': 'application/json' } : undefined, body: body ? JSON.stringify(body) : undefined });
  const d = await r.json().catch(() => ({}));
  return { status: r.status, ...d };
}
const when = (s) => (s ? new Date(s).toLocaleString('en-NG', { weekday: 'short', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Africa/Lagos' }) + ' (Lagos time)' : '');

function Stepper({ at }) {
  const steps = ['Apply', 'Research', 'Join'];
  return (
    <ol className="hire-stepper" aria-label="Hiring steps">
      {steps.map((t, i) => (<li key={t} className={i + 1 === at ? 'on' : i + 1 < at ? 'done' : ''}><span>{i + 1 < at ? '✓' : i + 1}</span>{t}</li>))}
    </ol>
  );
}

function Shell({ children, step }) {
  return (
    <div className="hire-page">
      <div className="hire-card">
        <header className="hire-head">
          <a href="/" className="hire-logo"><img src={logo} alt="" width="32" height="32" /><span>EliteScholars</span></a>
        </header>
        {step ? <Stepper at={step} /> : null}
        {children}
      </div>
    </div>
  );
}

// Public application page: /hire/<slug>
export function HireApply() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [err, setErr] = useState('');
  const [f, setF] = useState({ name: '', email: '', whatsapp: '', why: '', accept: false });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState('');
  const [cv, setCv] = useState(null); // { name, data(base64) }

  useEffect(() => {
    let first = '1'; try { if (localStorage.getItem(`hire_seen_${slug}`)) first = '0'; else localStorage.setItem(`hire_seen_${slug}`, '1'); } catch { /* ignore */ }
    call('job', { query: { slug, f: first } }).then((d) => { if (d.success) setJob(d.job); else setErr(d.error || 'This job link is not valid.'); }); }, [slug]);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const pickCv = (e) => {
    const file = e.target.files && e.target.files[0];
    setErr('');
    if (!file) { setCv(null); return; }
    if (!/\.(pdf|docx?)$/i.test(file.name)) { setErr('Upload your CV as a PDF or Word file.'); e.target.value = ''; setCv(null); return; }
    if (file.size > 2.5 * 1024 * 1024) { setErr('Your CV must be smaller than 2.5 MB.'); e.target.value = ''; setCv(null); return; }
    const rd = new FileReader();
    rd.onload = () => setCv({ name: file.name, data: String(rd.result).split(',')[1] || '' });
    rd.onerror = () => setErr('Could not read that file.');
    rd.readAsDataURL(file);
  };
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setErr('');
    const d = await call('apply', { method: 'POST', body: { slug, ...f, cv } });
    setBusy(false);
    if (!d.success) { setErr(d.error || 'Something went wrong.'); return; }
    setDone(d.message);
  };

  if (!job && !err) return <Shell><p className="hire-mute">Loading…</p></Shell>;
  if (!job) return <Shell><h1>Link not valid</h1><p className="hire-mute">{err}</p></Shell>;
  if (done) return <Shell step={2}><div className="hire-big">✅</div><h1>Application received</h1><p className="hire-mute">{done}</p><div className="hire-closed">Next: open the email we sent and complete your task.</div></Shell>;
  const open = job.phase === 'applying';
  const vid = job.kind === 'video_editor';
  return (
    <Shell step={1}>
      <div className="hire-tagrow"><span className="hire-tag">{vid ? 'Volunteer role' : 'We are hiring'}</span></div>
      <h1>{job.title}</h1>
      {job.description && <p className="hire-desc">{job.description}</p>}
      <ul className="hire-facts">
        {vid ? <li><i>🤝</i><span><b>Volunteer role.</b> Unpaid, but you build your portfolio and join a creative team</span></li> : <li><i>💰</i><span><b>{job.commissionPct}% commission</b> on every paying student you bring</span></li>}
        <li><i>{vid ? '🎬' : '📝'}</i><span>{vid ? `Apply here. We email you a short video task straight away, and you have ${job.taskHours % 24 === 0 ? `${job.taskHours / 24} days` : `${job.taskHours} hours`} to send it` : 'Apply here, then complete a short research task we email you'}</span></li>
        {job.applyDeadline && <li><i>⏰</i><span>Applications {open ? 'close' : 'closed'}: <b>{when(job.applyDeadline)}</b></span></li>}
      </ul>
      {!open ? <div className="hire-closed">Applications for this role are closed.</div> : (
        <form onSubmit={submit} className="hire-form">
          <label>Full name<input value={f.name} onChange={set('name')} autoComplete="name" required /></label>
          <label>Email<input type="email" value={f.email} onChange={set('email')} autoComplete="email" required /></label>
          <label>WhatsApp number<input type="tel" value={f.whatsapp} onChange={set('whatsapp')} placeholder="e.g. 0803 000 0000" autoComplete="tel" required /></label>
          <label>{vid ? 'Tell us about your editing experience and why we should choose you' : 'Why should we choose you?'}<textarea rows={5} value={f.why} onChange={set('why')} maxLength={1500} required /><small>{f.why.length}/1500</small></label>
          <label>Your CV (PDF or Word only, up to 2.5 MB)<input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={pickCv} />{cv && <small className="hire-file">✓ {cv.name}</small>}</label>
          <label className="hire-check"><input type="checkbox" checked={f.accept} onChange={set('accept')} /> {vid ? 'I understand this is a volunteer (unpaid) role' : `I accept the ${job.commissionPct}% commission`}</label>
          {err && <div className="hire-err">{err}</div>}
          <button className="hire-btn" disabled={busy}>{busy ? 'Sending…' : 'Submit application'}</button>
        </form>
      )}
    </Shell>
  );
}

// Research page sent by email: /hire/r/<token>
export function HireResearch() {
  const { token } = useParams();
  const [d, setD] = useState(null);
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () => call('research', { query: { t: token } }).then((r) => { if (r.success) { setD(r); setText((t) => t || r.research || ''); } else setErr(r.error || 'This link is not valid.'); });
  useEffect(() => { load(); }, [token]); // eslint-disable-line

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setErr(''); setMsg('');
    const r = await call('research', { method: 'POST', body: { t: token, text } });
    setBusy(false);
    if (!r.success) { setErr(r.error || 'Something went wrong.'); return; }
    setMsg(r.message); load();
  };

  if (!d && !err) return <Shell><p className="hire-mute">Loading…</p></Shell>;
  if (!d) return <Shell><h1>Link not valid</h1><p className="hire-mute">{err}</p></Shell>;
  if (d.kind === 'video_editor') return <VideoTask d={d} token={token} reload={load} />;
  const can = ['invited', 'submitted'].includes(d.status) && !d.closed;
  return (
    <Shell step={['approved', 'joined'].includes(d.status) ? 3 : 2}>
      <h1>Research task</h1>
      <p className="hire-mute">Hi {d.name.split(' ')[0]}, for <b>{d.job.title}</b>.</p>
      {d.status === 'applied' && <div className="hire-closed">This stage has not opened for you yet. We will email you when it does.</div>}
      {['approved', 'joined'].includes(d.status) && <div className="hire-ok">You passed. Check your email for your partner signup link.</div>}
      {d.status === 'rejected' && <div className="hire-closed">Thank you for applying. We are not taking you forward this time.</div>}
      {['invited', 'submitted'].includes(d.status) && (
        <>
          <ol className="hire-steps">
            <li>Spend time on <a href="/" target="_blank" rel="noreferrer">elitescholars.site</a> and <a href="/partner" target="_blank" rel="noreferrer">elitescholars.site/partner</a>.</li>
            <li>Write what you found: what it offers, who it helps and what stood out.</li>
            <li>Say how you would promote it, and why we should choose you.</li>
          </ol>
          <div className="hire-warn">Write it yourself. Do not paste AI-written text. We can tell.</div>
          {d.job.researchDeadline && <p className="hire-mute">{d.closed ? 'The deadline has passed:' : 'Send it in before'} <b>{when(d.job.researchDeadline)}</b></p>}
          {d.status === 'submitted' && !msg && <div className="hire-ok">You have submitted. You can still edit it until the deadline.</div>}
          {can ? (
            <form onSubmit={submit} className="hire-form">
              <label>Your research<textarea rows={12} value={text} onChange={(e) => setText(e.target.value)} maxLength={8000} required /><small>{text.length}/8000 · at least 300</small></label>
              {err && <div className="hire-err">{err}</div>}
              {msg && <div className="hire-ok">{msg}</div>}
              <button className="hire-btn" disabled={busy}>{busy ? 'Sending…' : d.status === 'submitted' ? 'Update my research' : 'Submit research'}</button>
            </form>
          ) : <div className="hire-closed">Submissions are closed.</div>}
        </>
      )}
    </Shell>
  );
}


// ── Volunteer video editor: task + upload ──
const stripTags = (h) => String(h).replace(/<[^>]+>/g, '');
const MAX_BYTES = 100 * 1024 * 1024;
function putFile(url, file, onProgress) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.open('PUT', url);
    x.setRequestHeader('x-upsert', 'true');
    x.upload.onprogress = (e) => { if (e.lengthComputable && onProgress) onProgress(e.loaded / e.total); };
    x.onload = () => (x.status >= 200 && x.status < 300 ? resolve() : reject(Object.assign(new Error('upload'), { status: x.status })));
    x.onerror = () => reject(new Error('network'));
    const fd = new FormData(); fd.append('cacheControl', '3600'); fd.append('', file);
    x.send(fd);
  });
}
function VideoTask({ d, token, reload }) {
  const [topic, setTopic] = useState(d.topic || '');
  const [video, setVideo] = useState(null);
  const [thumb, setThumb] = useState(null);
  const [pct, setPct] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const can = ['invited', 'submitted'].includes(d.status) && !d.closed;
  const pickVideo = (e) => {
    const f = e.target.files && e.target.files[0]; setErr('');
    if (!f) { setVideo(null); return; }
    if (!/\.mp4$/i.test(f.name)) { setErr('Only MP4 videos are accepted.'); e.target.value = ''; setVideo(null); return; }
    if (f.size > MAX_BYTES) { setErr('That video is larger than 100 MB. Please compress it, then choose it again.'); e.target.value = ''; setVideo(null); return; }
    setVideo(f);
  };
  const pickThumb = (e) => {
    const f = e.target.files && e.target.files[0]; setErr('');
    if (!f) { setThumb(null); return; }
    if (!/\.(jpe?g|png|webp)$/i.test(f.name)) { setErr('Add your thumbnail as a JPG, PNG or WEBP image.'); e.target.value = ''; setThumb(null); return; }
    setThumb(f);
  };
  const submit = async (e) => {
    e.preventDefault(); setErr(''); setMsg('');
    if (!topic) { setErr('Choose the topic you made your video about.'); return; }
    if (!video) { setErr('Choose your MP4 video.'); return; }
    if (!thumb) { setErr('Add a thumbnail image.'); return; }
    setBusy(true); setPct(0);
    try {
      const u = await call('upload-url', { method: 'POST', body: { t: token, videoName: video.name, thumbName: thumb.name } });
      if (!u.success) throw new Error(u.error || 'Could not start the upload.');
      await putFile(u.thumb, thumb);
      try { await putFile(u.video, video, setPct); }
      catch (ex) { throw new Error(ex.status === 413 ? 'That video is larger than 100 MB. Please compress it, then upload it again.' : 'The upload did not finish. Check your connection and try again.'); }
      const r = await call('video-submit', { method: 'POST', body: { t: token, topic, videoName: video.name, thumbName: thumb.name } });
      if (!r.success) throw new Error(r.error || 'Something went wrong.');
      setMsg(r.message); reload();
    } catch (ex) { setErr(ex.message || 'Something went wrong.'); }
    setBusy(false);
  };
  const b = d.brief || { topics: [], direction: [], assets: [] };
  return (
    <Shell step={['approved', 'joined'].includes(d.status) ? 3 : 2}>
      <div className="hire-tagrow"><span className="hire-tag">Volunteer role</span></div>
      <h1>Your video task</h1>
      <p className="hire-mute">Hi {d.name.split(' ')[0]}, for <b>{d.job.title}</b>. This is a volunteer (unpaid) role.</p>
      {['approved', 'joined'].includes(d.status) && <div className="hire-ok">You passed. Check your email for the group chat link.</div>}
      {d.status === 'rejected' && <div className="hire-closed">Thank you for applying. We are not taking you forward this time.</div>}
      {d.status === 'expired' && <div className="hire-closed">The time for this task has ended.</div>}
      {['invited', 'submitted'].includes(d.status) && (
        <>
          {d.dueAt && <div className={d.closed ? 'hire-closed' : 'hire-warn'}>{d.closed ? 'The deadline has passed: ' : 'Send your video before '}<b>{when(d.dueAt)}</b></div>}
          <h3 className="hire-h3">1. Pick ONE topic</h3>
          <ul className="hire-topics">{b.topics.map((t) => (<li key={t}><label><input type="radio" name="topic" checked={topic === t} onChange={() => setTopic(t)} disabled={!can} /><span>{t}</span></label></li>))}</ul>
          <h3 className="hire-h3">2. Creative direction</h3>
          <ul className="hire-dir">{b.direction.map((t) => <li key={t}>{stripTags(t)}</li>)}</ul>
          <h3 className="hire-h3">3. Our logos and inspiration</h3>
          <div className="hire-assets">{b.assets.map((a) => (<a key={a.url} href={a.url} download target="_blank" rel="noreferrer"><span style={{ background: a.bg }}><img src={a.url} alt="" /></span><em>{a.label}</em><small>Tap to download</small></a>))}</div>
          <p className="hire-mute">For inspiration, explore the website <a href="/" target="_blank" rel="noreferrer">elitescholars.site</a> and open the app <a href="/app" target="_blank" rel="noreferrer">elitescholars.site/app</a>.</p>
          <h3 className="hire-h3">4. Upload</h3>
          {d.status === 'submitted' && !msg && <div className="hire-ok">You have submitted ({d.videoName}). You can send a new one until the deadline.</div>}
          {can ? (
            <form onSubmit={submit} className="hire-form">
              <label>Your video (MP4 only)<input type="file" accept=".mp4,video/mp4" onChange={pickVideo} disabled={busy} />{video && <small className="hire-file">✓ {video.name} · {(video.size / 1048576).toFixed(1)} MB</small>}</label>
              <label>Thumbnail (JPG, PNG or WEBP)<input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" onChange={pickThumb} disabled={busy} />{thumb && <small className="hire-file">✓ {thumb.name}</small>}</label>
              {busy && <div className="hire-prog"><div style={{ width: `${Math.round(pct * 100)}%` }} /><span>{pct ? `Uploading ${Math.round(pct * 100)}%` : 'Starting…'}</span></div>}
              {err && <div className="hire-err">{err}</div>}
              {msg && <div className="hire-ok">{msg}</div>}
              <button className="hire-btn" disabled={busy}>{busy ? 'Uploading, keep this page open…' : d.status === 'submitted' ? 'Send a new video' : 'Submit my video'}</button>
            </form>
          ) : <div className="hire-closed">Submissions are closed.</div>}
        </>
      )}
    </Shell>
  );
}
