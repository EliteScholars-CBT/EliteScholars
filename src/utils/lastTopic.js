// Remembers the Learn topic a student has just finished, so the XP award can say which topic and subject it was for.
let last = null;
export function setLastTopic(info) { last = info ? { ...info, at: Date.now() } : null; }
export function takeLastTopic() {
  const x = last; last = null;
  return x && Date.now() - x.at < 15000 ? x : null; // only if it was just finished
}
const pretty = (s) => String(s || '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).trim();
// "Topic: Photosynthesis (Biology)", kept short because the server stores at most 60 characters of the reason
export function topicReason(info) {
  if (!info || !info.topicName) return 'topic_completed';
  const subj = pretty(info.subjectId);
  const tail = subj ? ` (${subj})` : '';
  const room = Math.max(8, 60 - 7 - tail.length);
  let name = String(info.topicName).trim();
  if (name.length > room) name = name.slice(0, room - 1).trimEnd() + '…';
  return `Topic: ${name}${tail}`;
}
