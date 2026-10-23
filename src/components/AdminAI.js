import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { makeApi, ago } from './adminApi';
import { fmtN } from './AdminCharts';

const NAMES = { gemini: 'Gemini', anthropic: 'Anthropic', openai: 'OpenAI' };
const EXAMPLE = `[
  {"name":"gemini-a","provider":"gemini","key":"AIza…","model":"gemini-2.5-flash","weight":3},
  {"name":"claude-a","provider":"anthropic","key":"sk-ant-…","weight":2},
  {"name":"gpt-a","provider":"openai","key":"sk-…","model":"gpt-4o-mini","weight":1}
]`;

export default function AdminAI({ token, onAuthFail }) {
  const api = useMemo(() => makeApi(token, onAuthFail), [token, onAuthFail]);
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const [res, setRes] = useState({});
  const [busy, setBusy] = useState('');

  const load = useCallback(async () => { try { setD(await api('ai-status')); setErr(''); } catch (e) { if (e.message !== 'auth') setErr(e.message); } }, [api]);
  useEffect(() => { load(); }, [load]);

  const test = async (name) => {
    setBusy(name);
    try { const r = await api('ai-test', { method: 'POST', body: { name } }); setRes((x) => ({ ...x, [name]: r })); } catch (e) { if (e.message !== 'auth') setErr(e.message); }
    setBusy(''); load();
  };

  if (!d) return <div className="adm-card">{err || 'Loading…'}</div>;
  const totalW = d.keys.filter((k) => k.enabled).reduce((a, k) => a + k.weight, 0) || 1;
  return (
    <div>
      {err && <div className="adm-error">{err}</div>}
      {d.problem && <div className="adm-error">{d.problem}</div>}
      <section className="adm-card">
        <h2>AI keys for uploaded files</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>
          Every upload is rewritten by one of these keys, picked in rotation by weight. If one is rate-limited or fails, the next takes over automatically.
          {d.source === 'none' ? ' No keys are set, so the app is using its built-in on-device engine.' : ` Loaded from ${d.source}.`}
        </p>
        <div className="adm-list tight">
          {d.keys.map((k) => (
            <div className="adm-item" key={k.name}>
              <div className="adm-item-head static">
                <span className="adm-item-main"><b>{k.name} {!k.enabled && <span className="adm-chip ended">Off</span>}{k.resting && <span className="adm-chip pending">Resting</span>}</b>
                  <small>{NAMES[k.provider]} · {k.model} · key {k.masked}</small></span>
                <span className="adm-item-side"><b>{Math.round((k.enabled ? k.weight / totalW : 0) * 100)}% of uploads</b><small>weight {k.weight}</small></span>
              </div>
              <div className="adm-facts pad">
                <div><span>Calls (7 days)</span><b>{fmtN(k.calls)}</b></div>
                <div><span>Failed</span><b>{fmtN(k.failed)}</b></div>
                <div><span>Avg speed</span><b>{k.avgMs ? `${(k.avgMs / 1000).toFixed(1)}s` : '—'}</b></div>
                <div><span>Last used</span><b>{k.last ? ago(k.last) : '—'}</b></div>
              </div>
              <div className="adm-inline pad">
                <button className="adm-small" disabled={busy === k.name} onClick={() => test(k.name)}>{busy === k.name ? 'Testing…' : 'Test this key'}</button>
                {res[k.name] && (res[k.name].ok ? <span className="adm-chip active">Works · {(res[k.name].ms / 1000).toFixed(1)}s</span> : <span className="adm-chip ended" title={res[k.name].detail || ''}>{res[k.name].error}{res[k.name].detail ? ` (${res[k.name].detail.slice(0, 140)})` : ''}</span>)}
              </div>
            </div>
          ))}
          {!d.keys.length && <p className="adm-empty">No keys loaded yet.</p>}
        </div>
      </section>
      <section className="adm-card">
        <h2>How to add or change keys</h2>
        <p className="adm-note" style={{ marginTop: 0 }}>Keys live in one Vercel environment variable called <b>AI_KEYS</b> (so they never appear in the app or in code). Paste a JSON list — each key carries its own settings — then redeploy.</p>
        <pre className="adm-code">{EXAMPLE}</pre>
        <p className="adm-note">Optional per key: <b>model</b>, <b>weight</b> (higher = used more), <b>enabled</b> (false to pause), <b>maxTokens</b>, <b>temperature</b>, <b>timeoutMs</b>, <b>baseUrl</b> (any OpenAI-compatible service).</p>
      </section>
    </div>
  );
}
