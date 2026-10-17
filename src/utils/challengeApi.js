const J = { 'Content-Type': 'application/json' };

async function post(path, body) {
  const response = await fetch(`/api/challenges/${path}`, { method: 'POST', headers: J, body: JSON.stringify(body) });
  let data = {};
  try { data = await response.json(); } catch { /* ignore */ }
  return { ok: response.ok && data?.success !== false, data };
}

async function getList(kind, email) {
  const params = new URLSearchParams({ kind });
  if (email) params.set('email', email.toLowerCase().trim());
  const response = await fetch(`/api/challenges/list?${params}`);
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export const checkUserExists = async (email) => {
  try {
    const response = await fetch(`/api/challenges/lookup?email=${encodeURIComponent(email.toLowerCase().trim())}`);
    const data = await response.json();
    return {
      exists: data?.success === true,
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
    };
  } catch (error) {
    console.error('Failed to check user:', error);
    return { exists: false, firstName: '', lastName: '' };
  }
};

export const checkUserByUsername = async (username) => {
  try {
    const response = await fetch(`/api/challenges/lookup?username=${encodeURIComponent(username.trim())}`);
    const data = await response.json();
    return {
      exists: data?.success === true,
      email: data?.email || '',
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      username: data?.username || '',
    };
  } catch (error) {
    console.error('Failed to check username:', error);
    return { exists: false, email: '', firstName: '', lastName: '', username: '' };
  }
};

export const createChallenge = async (
  challengerEmail, challengerName, opponentEmail, opponentName, examType, university,
  subject, numQuestions, timeLimit, messageTemplate, customMessage = null,
  challengerScore = 0, challengerCorrect = 0, challengerTotal = 0
) => {
  try {
    const { ok, data } = await post('create', {
      challenger_email: challengerEmail,
      challenger_name: challengerName,
      opponent_email: opponentEmail,
      opponent_name: opponentName || opponentEmail.split('@')[0],
      exam_type: examType,
      university: university || '',
      subject,
      num_questions: numQuestions,
      time_limit: timeLimit,
      message_template: messageTemplate,
      custom_message: customMessage || '',
      challenger_score: Number(challengerScore),
      challenger_correct: Number(challengerCorrect),
      challenger_total: Number(challengerTotal),
    });
    return ok ? { success: true, challenge_id: data.challenge_id } : { success: false, error: data?.error || 'Could not create challenge.' };
  } catch (error) {
    console.error('Failed to create challenge:', error);
    return { success: false, error: error.message };
  }
};

export const getPendingChallenges = async (email) => {
  try { return await getList('pending', email); }
  catch (error) { console.error('Failed to get pending challenges:', error); return []; }
};

export const getChallengeHistory = async (email) => {
  try { return await getList('history', email); }
  catch (error) { console.error('Failed to get challenge history:', error); return []; }
};

export const acceptChallenge = async (challengeId, opponentEmail) => {
  try {
    const { ok } = await post('accept', { challenge_id: challengeId, opponent_email: opponentEmail });
    return { success: ok };
  } catch (error) {
    console.error('Failed to accept challenge:', error);
    return { success: false };
  }
};

export const declineChallenge = async (challengeId, opponentEmail) => {
  try {
    const { ok } = await post('decline', { challenge_id: challengeId, opponent_email: opponentEmail });
    return { success: ok };
  } catch (error) {
    console.error('Failed to decline challenge:', error);
    return { success: false };
  }
};

// Our own server route: no CORS tricks needed. The server records the score,
// decides the winner once both have played, and awards XP exactly once.
export const submitChallengeScore = async (challengeId, email, score, timeSpent, _retry = true) => {
  try {
    const { ok, data } = await post('submit-score', {
      challenge_id: challengeId, email, score, time_spent: timeSpent,
    });
    return {
      success: ok,
      winner: data?.winner ?? null,
      xpAwarded: data?.xpAwarded ?? 0,
      completed: data?.completed ?? false,
    };
  } catch (error) {
    console.error('Failed to submit challenge score:', error);
    if (_retry) {
      await new Promise((r) => setTimeout(r, 1200));
      return submitChallengeScore(challengeId, email, score, timeSpent, false);
    }
    return { success: false, winner: null, xpAwarded: 0, completed: false };
  }
};

export const getChallengeMessages = async () => {
  try {
    const data = await getList('messages');
    return data.length ? data : defaultMessages();
  } catch (error) {
    console.error('Failed to get challenge messages:', error);
    return defaultMessages();
  }
};

function defaultMessages() {
  return [
    { message_id: 'msg_001', category: 'friendly', message_text: 'Think you can beat me? 😊' },
    {
      message_id: 'msg_002',
      category: 'competitive',
      message_text: "I'm coming for your spot on the leaderboard! 👑",
    },
    {
      message_id: 'msg_003',
      category: 'funny',
      message_text: "Prepare to lose... or maybe win? Let's play! 🎮",
    },
    {
      message_id: 'msg_004',
      category: 'motivational',
      message_text: "Let's help each other improve! Best score wins! 💪",
    },
    {
      message_id: 'msg_005',
      category: 'trash_talk',
      message_text: "You're going down! Hope you've been studying 😤",
    },
    { message_id: 'msg_006', category: 'rematch', message_text: 'Round 2? I want revenge! 🔥' },
    {
      message_id: 'msg_007',
      category: 'daily',
      message_text: 'Daily challenge time! Beat my score! 📅',
    },
    {
      message_id: 'msg_008',
      category: 'weekend',
      message_text: 'Weekend quiz battle! Winner buys lunch? 🍕',
    },
  ];
}
