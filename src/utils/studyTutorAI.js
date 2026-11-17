// Asks the AI tutor (server side, through /api/study/rewrite with mode "tutor") to explain or check one question.
// → { steps: [..], answer, tip }  or throws an Error with a message that is safe to show.
export async function askTutor(question, attempt) {
  let r;
  try {
    r = await fetch('/api/study/rewrite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'tutor', question: String(question || '').slice(0, 1500), attempt: String(attempt || '').slice(0, 1500) }),
    });
  } catch { throw new Error('No connection right now. Check your network and try again.'); }
  const d = await r.json().catch(() => ({}));
  if (r.status === 401) throw new Error('Sign in to use the AI tutor.');
  if (r.status === 429) throw new Error('You have asked a lot of questions. Please try again a little later.');
  if (d.code === 'NO_AI') throw new Error('The AI tutor is not available right now.');
  if (!d.success && !d.steps) throw new Error(d.error || 'The AI tutor could not answer that. Please try again.');
  const t = d.data || d;
  if (!t.steps || !t.answer) throw new Error('The AI tutor could not answer that. Please try again.');
  return t;
}
