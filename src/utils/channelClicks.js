import { WA_CHANNEL } from './constants/links';

// Counts taps on the WhatsApp Channel links (anywhere on the site) so the admin can see them.
// Works for normal links and for buttons that call window.open. Never blocks the tap.
const MARK = 'whatsapp.com/channel';
function send() {
  try {
    fetch('/api/events/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true, body: JSON.stringify({ type: 'whatsapp_channel_click', where: String(window.location.pathname || '/').slice(0, 60) }) }).catch(() => {});
  } catch { /* analytics only */ }
}
export function installChannelClicks() {
  if (typeof window === 'undefined' || window.__esChannelClicks) return;
  window.__esChannelClicks = true;
  document.addEventListener('click', (e) => {
    try {
      const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (a && String(a.getAttribute('href')).indexOf(MARK) !== -1) send();
    } catch { /* ignore */ }
  }, true);
  const open = window.open;
  window.open = function (url, ...rest) {
    try { if (typeof url === 'string' && (url === WA_CHANNEL || url.indexOf(MARK) !== -1)) send(); } catch { /* ignore */ }
    return open.call(window, url, ...rest);
  };
}
