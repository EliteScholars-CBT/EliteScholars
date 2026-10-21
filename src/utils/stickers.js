// Templates and Gen-Z stickers for the sticker studio.
export const TEMPLATES = [
  { id: 'locked',  name: 'Locked In',   a: '#0F172A', b: '#4C1D95', deco: ['🔒', '⚡', '📚'], text: 'LOCKED IN 🔒', color: '#fff' },
  { id: 'exam',    name: 'Exam Szn',    a: '#B91C1C', b: '#F97316', deco: ['📝', '🔥', '⏰'], text: 'EXAM SZN\nwe ready', color: '#fff' },
  { id: 'nocap',   name: 'No Cap',      a: '#0F766E', b: '#22D3EE', deco: ['🧢', '💯', '✨'], text: 'no cap, I studied', color: '#fff' },
  { id: 'main',    name: 'Main Character', a: '#BE185D', b: '#F9A8D4', deco: ['💅', '✨', '🎀'], text: 'main character\nenergy', color: '#fff' },
  { id: 'cook',    name: 'Let Him Cook', a: '#92400E', b: '#FBBF24', deco: ['🍳', '🔥', '🧠'], text: 'LET HIM COOK', color: '#1F2937' },
  { id: 'win',     name: 'W Result',    a: '#166534', b: '#4ADE80', deco: ['🏆', '💚', '🎉'], text: 'W RESULT 🏆', color: '#fff' },
  { id: 'brain',   name: 'Big Brain',   a: '#4338CA', b: '#A78BFA', deco: ['🧠', '💡', '🚀'], text: 'big brain time', color: '#fff' },
  { id: 'vibes',   name: 'Study Vibes', a: '#1E3A8A', b: '#38BDF8', deco: ['🎧', '☕', '🌙'], text: 'study vibes only', color: '#fff' },
  { id: 'cooked',  name: "I'm Cooked",  a: '#171717', b: '#525252', deco: ['💀', '😭', '🫠'], text: "we're cooked 💀", color: '#fff' },
  { id: 'plain',   name: 'Blank',       a: '#6D28D9', b: '#8B5CF6', deco: [], text: '', color: '#fff' },
];

export const EMOJI = ['🔥', '💀', '😭', '✨', '🫶', '💯', '🧠', '📚', '🏆', '🚀', '👀', '🤝', '😎', '🥹', '🫡', '⚡', '🎯', '💅', '🧃', '🎉', '😤', '🤓', '🙏', '💪', '🌟', '❤️', '😂', '🤯'];

export const TAGS = [
  { t: 'no cap', c: '#0EA5E9' }, { t: 'locked in', c: '#7C3AED' }, { t: 'W', c: '#16A34A' }, { t: 'L', c: '#DC2626' },
  { t: 'slay', c: '#DB2777' }, { t: 'cooked', c: '#EA580C' }, { t: 'bet', c: '#0891B2' }, { t: 'fr fr', c: '#4F46E5' },
  { t: 'big brain', c: '#9333EA' }, { t: 'study era', c: '#059669' }, { t: 'exam szn', c: '#DC2626' }, { t: 'mood', c: '#D97706' },
  { t: 'vibes', c: '#2563EB' }, { t: "it's giving A+", c: '#C026D3' }, { t: 'lowkey genius', c: '#0D9488' }, { t: 'aura +1000', c: '#CA8A04' },
];

// Quick one-tap stickers for chat (sent as a message on their own).
export const CHAT_STICKERS = ['🔥', '💀', '😭', '🫡', '💯', '🏆', '👀', '🤝', 'W', 'L', 'no cap', 'locked in', 'slay', 'cooked', 'bet', 'fr fr', 'GG', 'let him cook'];

export const TEXT_COLORS = ['#FFFFFF', '#111827', '#FDE047', '#F472B6', '#67E8F9', '#86EFAC'];

export const tagColor = (t) => (TAGS.find((x) => x.t === t) || { c: '#7C3AED' }).c;
