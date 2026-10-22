import { canvasToDataUrl } from './media';

// Post a picture (for example a share card) as a 24-hour status.
// privacy: 'squad' | 'public'. Returns { ok, error }.
export async function postStatusFromBlob(blob, { text = '', privacy = 'squad' } = {}) {
  try {
    const url = URL.createObjectURL(blob);
    const img = await new Promise((resolve, reject) => { const i = new Image(); i.onload = () => resolve(i); i.onerror = reject; i.src = url; });
    const k = Math.min(1, 960 / Math.max(img.width, img.height));
    const c = document.createElement('canvas');
    c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    const image = canvasToDataUrl(c, 190);
    const r = await fetch('/api/status/post', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: String(text).slice(0, 140), image, privacy }) });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j || j.success === false) return { ok: false, error: (j && j.error) || 'Could not post your status.' };
    return { ok: true };
  } catch {
    return { ok: false, error: 'Could not post your status. Check your connection.' };
  }
}
