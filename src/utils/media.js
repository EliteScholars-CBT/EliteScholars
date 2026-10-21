// Image helpers: shrink photos in the browser so they are cheap to send and store.
export function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('bad image')); };
    img.src = url;
  });
}

// Encode a canvas as JPEG, lowering quality until it is under maxKB.
export function canvasToDataUrl(canvas, maxKB = 190) {
  let q = 0.82;
  let out = canvas.toDataURL('image/jpeg', q);
  while (out.length * 0.75 > maxKB * 1024 && q > 0.35) { q -= 0.08; out = canvas.toDataURL('image/jpeg', q); }
  return out;
}

// Scale a photo file down (longest side maxDim) and return a data URL.
export async function compressPhoto(file, maxDim = 960, maxKB = 190) {
  const { img, url } = await loadImageFromFile(file);
  const k = Math.min(1, maxDim / Math.max(img.width, img.height));
  const c = document.createElement('canvas');
  c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  URL.revokeObjectURL(url);
  return canvasToDataUrl(c, maxKB);
}

const cache = new Map();
// Fetch a stored image by id (cached for the session).
export async function fetchMedia(id) {
  if (!id) return '';
  if (cache.has(id)) return cache.get(id);
  try {
    const r = await fetch('/api/media/get', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    const j = await r.json();
    if (j && j.image) { cache.set(id, j.image); return j.image; }
  } catch { /* ignore */ }
  return '';
}
