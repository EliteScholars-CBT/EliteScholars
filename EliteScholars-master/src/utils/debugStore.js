// debugStore.js
let logs = [];
let listeners = [];

export function addLog(entry) {
  const log = {
    id: crypto.randomUUID(),
    time: new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    }),
    ...entry,
  };
  logs = [log, ...logs].slice(0, 500);
  listeners.forEach(fn => fn([...logs]));
}

export function subscribe(fn) {
  listeners.push(fn);
  fn([...logs]);
  return () => {
    listeners = listeners.filter(l => l !== fn);
  };
}

export function clearLogs() {
  logs = [];
  listeners.forEach(fn => fn([]));
}

export function getLogs() {
  return [...logs];
}