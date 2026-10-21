// Shared helpers for the admin screens.
export function makeApi(token, onAuthFail) {
  return async (path, { method = 'GET', body, query } = {}) => {
    const qs = query ? `?${new URLSearchParams(Object.entries(query).filter(([, v]) => v !== '' && v !== undefined && v !== null))}` : '';
    const r = await fetch(`/api/admin/${path}${qs}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    const d = await r.json().catch(() => ({}));
    if (r.status === 401) { onAuthFail(d.error); throw new Error('auth'); }
    if (!d.success) throw new Error(d.error || 'Something went wrong.');
    return d;
  };
}

const TZ = 'Africa/Lagos';
// "19 Oct, 2:35 PM"
export const fmtDT = (s) => (s ? new Date(s).toLocaleString('en-NG', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: TZ }) : '—');
export const fmtD = (s) => (s ? new Date(s).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', timeZone: TZ }) : '—');
export const fmtT = (s) => (s ? new Date(s).toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: TZ }) : '');
export function ago(s) {
  if (!s) return 'never';
  const m = Math.round((Date.now() - new Date(s).getTime()) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  if (m < 1440) return `${Math.floor(m / 60)}h ago`;
  const d = Math.floor(m / 1440);
  return d < 30 ? `${d}d ago` : `${Math.floor(d / 30)}mo ago`;
}
// value for <input type="datetime-local"> → ISO
export const localToISO = (v) => (v ? new Date(v).toISOString() : '');
