import { SHEETS_URL } from './constants';

export const checkUserExists = async (email) => {
  try {
    const params = new URLSearchParams({
      action: 'getProfile',
      email: email.toLowerCase().trim(),
    });
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    return {
      exists: data?.success === true,
      firstName: data?.profile?.firstName || '',
      lastName: data?.profile?.lastName || '',
    };
  } catch (error) {
    console.error('Failed to check user:', error);
    return { exists: false, firstName: '', lastName: '' };
  }
};

export const checkUserByUsername = async (username) => {
  try {
    const params = new URLSearchParams({
      action: 'getUserByUsername',
      username: username.trim(),
    });
    const response = await fetch(`${SHEETS_URL}?${params}`);
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
  challengerEmail,
  challengerName,
  opponentEmail,
  opponentName,
  examType,
  university,
  subject,
  numQuestions,
  timeLimit,
  messageTemplate,
  customMessage = null,
  challengerScore = 0,
  challengerCorrect = 0,
  challengerTotal = 0
) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'createChallenge',
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
        challenger_score: Number(challengerScore), // ← explicit Number() so 0 stays 0
        challenger_correct: Number(challengerCorrect),
        challenger_total: Number(challengerTotal),
      }),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to create challenge:', error);
    return { success: false, error: error.message };
  }
};

export const getPendingChallenges = async (email) => {
  try {
    const params = new URLSearchParams({ action: 'getPendingChallenges', email });
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to get pending challenges:', error);
    return [];
  }
};

export const getChallengeHistory = async (email) => {
  try {
    const params = new URLSearchParams({ action: 'getChallengeHistory', email });
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to get challenge history:', error);
    return [];
  }
};

export const acceptChallenge = async (challengeId, opponentEmail) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'acceptChallenge',
        challenge_id: challengeId,
        opponent_email: opponentEmail,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to accept challenge:', error);
    return { success: false };
  }
};

export const declineChallenge = async (challengeId, opponentEmail) => {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'declineChallenge',
        challenge_id: challengeId,
        opponent_email: opponentEmail,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to decline challenge:', error);
    return { success: false };
  }
};

// No 'no-cors' — we need to read { winner, xpAwarded, completed } back.
//
// IMPORTANT: Content-Type must stay 'text/plain' here, NOT 'application/json'.
// 'application/json' is not a CORS-safelisted content type, so the browser
// sends a preflight OPTIONS request first. Google Apps Script web apps don't
// implement doOptions(), so that preflight fails and the browser blocks the
// entire request — fetch() throws, we land in the catch block below, and the
// score never reaches the sheet. That's why a challenge could look like it
// "completes" locally but stays stuck on Pending forever with no winner: the
// opponent's score was silently never submitted. text/plain IS safelisted,
// so no preflight is triggered, and Apps Script still reads the raw JSON via
// e.postData.contents regardless of the declared header — same trick the
// mode:'no-cors' calls above already benefit from (the browser drops any
// non-safelisted header on those instead of sending it).
export const submitChallengeScore = async (challengeId, email, score, timeSpent, _retry = true) => {
  try {
    const response = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'submitChallengeScore',
        challenge_id: challengeId,
        email,
        score,
        time_spent: timeSpent,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch {
      console.warn('submitChallengeScore: could not parse JSON response');
      return { success: true, winner: null, xpAwarded: 0, completed: false };
    }

    console.log('submitChallengeScore response:', data);
    return {
      success: data?.success === true,
      winner: data?.winner ?? null,
      xpAwarded: data?.xpAwarded ?? 0,
      completed: data?.completed ?? false,
    };
  } catch (error) {
    console.error('Failed to submit challenge score:', error);
    // One quiet retry — covers a dropped connection or a cold Apps Script
    // instance on the first hit, so a flaky network doesn't strand the
    // challenge on "pending" forever.
    if (_retry) {
      await new Promise((r) => setTimeout(r, 1200));
      return submitChallengeScore(challengeId, email, score, timeSpent, false);
    }
    return { success: false, winner: null, xpAwarded: 0, completed: false };
  }
};

export const getChallengeMessages = async () => {
  try {
    const params = new URLSearchParams({ action: 'getChallengeMessages' });
    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    return Array.isArray(data) ? data : defaultMessages();
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
