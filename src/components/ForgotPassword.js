import React, { useState } from 'react';

// "Forgot password?" for the partner and admin sign-in screens.
// kind="partner": email → emailed 6-digit code + new password.
// kind="admin" with an email (team member): same. Without an email (owner): the code signs you in.
export default function ForgotPassword({ kind, email: initialEmail = '', owner = false, onBack, onSignedIn }) {
  const [email, setEmail] = useState(initialEmail);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [done, setDone] = useState(false);

  const call = async (path, body) => {
    setBusy(true); setError('');
    try {
      const r = await fetch(`/api/data?route=recovery/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const d = await r.json().catch(() => ({}));
      if (!d.success) { setError(d.error || 'Something went wrong. Try again.'); return null; }
      return d;
    } catch { setError('Network error. Check your connection and try again.'); return null; }
    finally { setBusy(false); }
  };

  const send = async (e) => {
    if (e) e.preventDefault();
    const d = await call('forgot', { kind, email: owner ? '' : email.trim() });
    if (d) { setInfo(d.message || 'Code sent.'); setStep(2); }
  };
  const finish = async (e) => {
    e.preventDefault();
    const d = await call('reset', { kind, email: owner ? '' : email.trim(), code: code.trim(), password: pw });
    if (!d) return;
    if (d.token) { onSignedIn && onSignedIn(d); return; }
    setDone(true); setInfo(d.message || 'Password changed.');
  };

  if (done) {
    return (
      <div className="adm-fp">
        <p className="adm-ok">{info}</p>
        <button type="button" onClick={onBack}>Back to sign in</button>
      </div>
    );
  }
  return (
    <form className="adm-fp" onSubmit={step === 1 ? send : finish}>
      <h2 style={{ margin: '0 0 4px', fontSize: '1.1rem' }}>{owner ? 'Sign in with an emailed code' : 'Reset your password'}</h2>
      {step === 1 ? (
        <>
          <p style={{ margin: 0, opacity: .8, fontSize: '.9rem' }}>{owner ? 'We will email a one-time sign-in code to the owner address set up for this site.' : 'Enter your account email and we will send you a 6-digit code.'}</p>
          {!owner && <input type="email" autoComplete="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />}
          {error && <div className="adm-error">{error}</div>}
          <button type="submit" disabled={busy || (!owner && !email.trim())}>{busy ? 'Sending…' : 'Send code'}</button>
        </>
      ) : (
        <>
          {info && <div className="adm-ok">{info}</div>}
          <input inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="6-digit code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} autoFocus />
          {!owner && <input type="password" autoComplete="new-password" placeholder="New password (8+ characters)" value={pw} onChange={(e) => setPw(e.target.value)} />}
          {error && <div className="adm-error">{error}</div>}
          <button type="submit" disabled={busy || code.length !== 6 || (!owner && pw.length < 8)}>{busy ? 'Checking…' : owner ? 'Sign in' : 'Change password'}</button>
          <button type="button" className="adm-ghost adm-link" disabled={busy} onClick={() => send()}>Send a new code</button>
        </>
      )}
      <button type="button" className="adm-ghost adm-link" onClick={onBack}>Back to sign in</button>
    </form>
  );
}
