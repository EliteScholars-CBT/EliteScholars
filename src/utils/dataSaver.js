// Data Saver: no sounds, no confetti/animations, lighter effects. Stored per device.
const KEY = 'es_data_saver';
export const isDataSaver = () => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } };
export function applyDataSaver() {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('data-saver', isDataSaver());
}
export function setDataSaver(on) {
  try { localStorage.setItem(KEY, on ? '1' : '0'); } catch { /* ignore */ }
  applyDataSaver();
}
