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

// Deep link into the School screen (from the /school page: /app?school=1).
const SKEY = 'es_open_school';
export function captureSchoolParam() {
  try {
    if (new URLSearchParams(window.location.search).get('school') === '1') {
      sessionStorage.setItem(SKEY, '1');
      const u = new URLSearchParams(window.location.search); u.delete('school');
      const q = u.toString();
      window.history.replaceState({}, '', window.location.pathname + (q ? `?${q}` : ''));
    }
  } catch { /* ignore */ }
}
export function wantsSchool() { try { return sessionStorage.getItem(SKEY) === '1'; } catch { return false; } }
export function clearSchoolWish() { try { sessionStorage.removeItem(SKEY); } catch { /* ignore */ } }

// Deep link into the Shop screen (from the landing-page shop section).
export function wantsShop() { try { return sessionStorage.getItem('es_open_shop') === '1'; } catch { return false; } }
export function clearShopWish() { try { sessionStorage.removeItem('es_open_shop'); } catch { /* ignore */ } }

// Quick jump to the squad tab of the Leaderboard screen (from the home / exam screens).
export function markOpenSquad() { try { sessionStorage.setItem('es_open_squad', '1'); } catch { /* ignore */ } }
export function wantsSquad() { try { return sessionStorage.getItem('es_open_squad') === '1'; } catch { return false; } }
export function clearOpenSquad() { try { sessionStorage.removeItem('es_open_squad'); } catch { /* ignore */ } }
