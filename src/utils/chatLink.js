// Deep link into squad chat (from a push notification or ?squadchat=1).
const KEY = 'es_open_chat';
export function markOpenChat() { try { sessionStorage.setItem(KEY, '1'); } catch { /* ignore */ } }
export function wantsChat() { try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; } }
export function clearOpenChat() { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } }
export function captureChatParam() {
  try {
    if (new URLSearchParams(window.location.search).get('squadchat') === '1') {
      markOpenChat();
      window.history.replaceState({}, '', window.location.pathname);
    }
  } catch { /* ignore */ }
}
