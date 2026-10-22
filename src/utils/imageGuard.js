// Checks a photo on the student's own phone before it is posted as a status, so explicit pictures are
// stopped before they leave the device. Uses TensorFlow.js + NSFWJS, loaded only when needed (the
// first scan downloads the model, a few MB). If the check cannot run (offline, slow, blocked), the post
// goes ahead marked "not scanned" and is visible to the admin in Admin → Status.
const TF_SRC = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js';
const NSFW_SRC = 'https://cdn.jsdelivr.net/npm/nsfwjs@4.2.1/dist/browser/nsfwjs.min.js';

let modelPromise = null;

function loadScript(src, ms = 20000) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    const t = setTimeout(() => { reject(new Error('timeout')); }, ms);
    s.src = src; s.async = true; s.crossOrigin = 'anonymous';
    s.onload = () => { clearTimeout(t); resolve(); };
    s.onerror = () => { clearTimeout(t); reject(new Error('load failed')); };
    document.head.appendChild(s);
  });
}

function getModel() {
  if (!modelPromise) {
    modelPromise = (async () => {
      if (!window.tf) await loadScript(TF_SRC);
      if (!window.nsfwjs) await loadScript(NSFW_SRC);
      return window.nsfwjs.load();
    })().catch((e) => { modelPromise = null; throw e; });
  }
  return modelPromise;
}

const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);

// Returns 'clean' | 'flagged' | 'skipped'.
export async function scanImage(dataUrl) {
  try {
    const img = await new Promise((resolve, reject) => { const i = new Image(); i.onload = () => resolve(i); i.onerror = reject; i.src = dataUrl; });
    const model = await withTimeout(getModel(), 30000);
    const preds = await withTimeout(model.classify(img), 15000);
    const p = Object.fromEntries(preds.map((x) => [x.className, x.probability]));
    if ((p.Porn || 0) > 0.55 || (p.Hentai || 0) > 0.6 || (p.Sexy || 0) > 0.85) return 'flagged';
    return 'clean';
  } catch {
    return 'skipped';
  }
}
