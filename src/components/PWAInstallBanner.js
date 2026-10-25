import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import logo from '../assets/elite-scholars-logo.png';
import { sendAnalytics } from '../utils/referral';
import '../utils/installApp';

// ============================================================================
// PWAInstallBanner — install nudge with a 3-strike rule.
//
// Shown up to 3 times (counted in localStorage). After the 3rd dismissal,
// the banner retires for good and a one-time "did you install it?" yes/no
// modal takes its place instead of nagging further. Every meaningful step
// (shown, dismissed, native prompt result, yes/no answer, detected install)
// sends an analytics event — the Apps Script doesn't recognise these
// `action`/`event` values yet, that's a deliberate next step, not a bug.
//
// NOTE ON VISUAL DESIGN: this ships with a reasonable default look so the
// underlying logic (3-strike counting, iOS fallback, analytics) is fully
// working now. Swap the markup/styles in the "Banner" section below once
// reference screenshots are available — the behavior won't need to change.
// ============================================================================

const DISMISS_KEY   = 'es_pwa_dismiss_count';
const ASKED_KEY      = 'es_pwa_asked';
const INSTALLED_KEY  = 'es_pwa_installed';
const MAX_DISMISSALS = 3;
const SHOW_DELAY_MS  = 3500;

const getCount = () => parseInt(localStorage.getItem(DISMISS_KEY) || '0', 10) || 0;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
const isStandalone = () =>
  window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;

export default function PWAInstallBanner() {
  const [mode, setMode] = useState(null); // null | 'banner' | 'ask' | 'ios-help'
  const [iosTip, setIosTip] = useState(false);
  const deferredPrompt = useRef(null);
  const shownAnalyticsSent = useRef(false);

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(INSTALLED_KEY) === 'true') return undefined;

    const alreadyAsked = localStorage.getItem(ASKED_KEY) === 'true';
    const dismissCount = getCount();

    const onBeforeInstall = (e) => {
      e.preventDefault();
      deferredPrompt.current = e;
    };
    const onInstalled = () => {
      localStorage.setItem(INSTALLED_KEY, 'true');
      sendAnalytics('pwa_installed', { method: 'native_event' });
      setMode(null);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);

    let timer;
    if (dismissCount >= MAX_DISMISSALS) {
      if (!alreadyAsked) timer = setTimeout(() => setMode('ask'), SHOW_DELAY_MS);
    } else {
      timer = setTimeout(() => setMode('banner'), SHOW_DELAY_MS);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  useEffect(() => {
    if (mode === 'banner' && !shownAnalyticsSent.current) {
      shownAnalyticsSent.current = true;
      sendAnalytics('pwa_banner_shown', { dismiss_count: getCount(), platform: isIOS() ? 'ios' : 'other' });
    }
    if (mode === 'ask') {
      sendAnalytics('pwa_ask_modal_shown', {});
    }
  }, [mode]);

  const dismiss = () => {
    const next = getCount() + 1;
    localStorage.setItem(DISMISS_KEY, String(next));
    sendAnalytics('pwa_banner_dismissed', { dismiss_count: next });
    setMode(null);
  };

  const install = async () => {
    if (isIOS()) { setIosTip(true); return; }
    const evt = deferredPrompt.current;
    if (!evt) { dismiss(); return; }
    evt.prompt();
    try {
      const choice = await evt.userChoice;
      sendAnalytics('pwa_native_prompt_result', { outcome: choice.outcome });
      if (choice.outcome === 'accepted') {
        localStorage.setItem(INSTALLED_KEY, 'true');
        setMode(null);
      } else {
        dismiss();
      }
    } catch {
      dismiss();
    }
    deferredPrompt.current = null;
  };

  const answerAsk = (yes) => {
    localStorage.setItem(ASKED_KEY, 'true');
    sendAnalytics('pwa_install_response', { answer: yes ? 'yes' : 'no' });
    if (yes) { localStorage.setItem(INSTALLED_KEY, 'true'); setMode(null); }
    else { setMode('ios-help'); } // show a quick "here's how" instead of just closing
  };

  if (mode === 'banner') {
    return (
      <div className="pwa-banner" role="dialog" aria-label="Install EliteScholars">
        <button className="pwa-banner-close" onClick={dismiss} aria-label="Dismiss"><Icon name="x" size={16} /></button>
        <img src={logo} alt="" className="pwa-banner-icon" />
        <div className="pwa-banner-text">
          <div className="pwa-banner-title">Get the EliteScholars App</div>
          <div className="pwa-banner-sub">
            {iosTip ? 'Tap Share, then "Add to Home Screen"' : 'Loads instantly \u2022 Works offline'}
          </div>
        </div>
        <button className="pwa-banner-install" onClick={iosTip ? dismiss : install}>{iosTip ? 'Got it' : 'Install'}</button>
      </div>
    );
  }

  if (mode === 'ask') {
    return (
      <div className="pwa-ask-backdrop">
        <div className="pwa-ask-card">
          <div className="pwa-ask-icon"><Icon name="gift" size={28} /></div>
          <div className="pwa-ask-title">Have you installed the app yet?</div>
          <div className="pwa-ask-sub">Installing EliteScholars to your home screen makes it load instantly and work even with poor data.</div>
          <div className="pwa-ask-actions">
            <button className="pwa-ask-no" onClick={() => answerAsk(false)}>Not yet</button>
            <button className="pwa-ask-yes" onClick={() => answerAsk(true)}><Icon name="check" size={16} /> Yes, I have it</button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'ios-help') {
    return (
      <div className="pwa-ask-backdrop">
        <div className="pwa-ask-card">
          <div className="pwa-ask-icon"><Icon name="upload" size={26} /></div>
          <div className="pwa-ask-title">Here's how</div>
          <div className="pwa-ask-sub">
            {isIOS()
              ? 'Tap the Share icon in your browser, then choose "Add to Home Screen".'
              : 'Open your browser menu and choose "Install app" or "Add to Home Screen".'}
          </div>
          <button className="pwa-ask-yes" style={{ width: '100%' }} onClick={() => setMode(null)}>Got it</button>
        </div>
      </div>
    );
  }

  return null;
}
