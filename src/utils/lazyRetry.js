import React, { lazy } from 'react';

// Route code is downloaded on demand. On a weak connection a download can fail part-way, so each one is retried a few
// times (and once more when the network comes back) before the page gives up and offers a retry button.
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const online = () => new Promise((resolve) => {
  if (typeof navigator === 'undefined' || navigator.onLine !== false) return resolve();
  const on = () => { window.removeEventListener('online', on); resolve(); };
  window.addEventListener('online', on);
});

async function load(factory) {
  const delays = [700, 1800, 4000];
  for (let i = 0; ; i++) {
    try { return await factory(); } catch (err) {
      if (i >= delays.length) {
        await online();
        return factory(); // one last try, now that the network is back
      }
      await wait(delays[i]);
      await online();
    }
  }
}

export const lazyRetry = (factory) => lazy(() => load(factory));

// Starts a download quietly in the background once the page is idle (skipped on slow or data-saver connections)
export function prefetchWhenIdle(factory) {
  try {
    const c = navigator.connection;
    if (c && (c.saveData || /(^|-)2g/.test(c.effectiveType || '') || c.effectiveType === '3g')) return;
    const go = () => { factory().catch(() => {}); };
    if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(go, { timeout: 6000 });
    else setTimeout(go, 3000);
  } catch { /* optional */ }
}

// A light placeholder that needs no stylesheet, so it shows even before the app's CSS has arrived
export function RouteFallback() {
  return (
    <div role="status" aria-label="Loading" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'linear-gradient(160deg,#1B0A47,#7C3AED,#1B0A47)' }}>
      <style>{'@keyframes esr{to{transform:rotate(360deg)}}'}</style>
      <div style={{ width: 44, height: 44, borderRadius: '50%', border: '4px solid rgba(255,255,255,.25)', borderTopColor: '#fff', animation: 'esr .8s linear infinite' }} />
    </div>
  );
}

// If a page could not be downloaded, say so plainly and bring it back by itself when the connection returns
export class RouteBoundary extends React.Component {
  constructor(p) { super(p); this.state = { failed: false }; this.back = () => window.location.reload(); }
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidMount() { window.addEventListener('online', this.back); }
  componentWillUnmount() { window.removeEventListener('online', this.back); }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center', background: '#1B0A47', color: '#fff', fontFamily: 'system-ui,sans-serif' }}>
        <div>
          <h2 style={{ margin: '0 0 8px' }}>Slow connection</h2>
          <p style={{ margin: '0 0 18px', opacity: 0.8 }}>This page could not finish loading. It will open by itself when your network is back.</p>
          <button onClick={this.back} style={{ padding: '12px 22px', border: 0, borderRadius: 14, background: '#fff', color: '#4C1D95', fontWeight: 800, fontSize: 16 }}>Try again</button>
        </div>
      </div>
    );
  }
}
