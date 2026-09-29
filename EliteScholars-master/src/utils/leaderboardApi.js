// leaderboardApi.js
// FIX (Issue 11): getLeaderboard now maps API response fields correctly per timeframe.
//   - daily:   fields are date, rank, rank_display, email, name, xp_earned, level, quizzes
//   - weekly:  fields are week_start, week_end, rank, rank_display, email, name, xp_earned, level, quizzes
//   - monthly: fields are month, rank, rank_display, email, name, xp_earned, level, quizzes
//   - alltime: fields are rank, rank_display, email, name, total_xp, level, avg_score, total_quizzes
// The API already returns named objects so we just pass them through; the UI
// must use the correct field names (see Leaderboard.js getXP helper).
import { SHEETS_URL } from './constants';

// Fetch leaderboard data
export const getLeaderboard = async (type = 'alltime', examType = 'all', university = null, subject = null, limit = 50) => {
  try {
    const params = new URLSearchParams({
      action: 'getLeaderboard',
      type: type,
      exam_type: examType,
      university: university || '',
      subject: subject || '',
      limit: limit,
    });

    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return [];
  }
};

// Get user's rank
export const getUserRank = async (email, type = 'alltime') => {
  try {
    const params = new URLSearchParams({
      action: 'getUserRank',
      email: email,
      type: type,
    });

    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    if (data && data.rank_display) {
      return { rank: data.rank, rank_display: data.rank_display };
    }
    return data.rank || 0;
  } catch (error) {
    console.error('Failed to get user rank:', error);
    return 0;
  }
};

// Get available users for challenges (from register sheet, excluding self)
export const getAvailableUsers = async (currentUserEmail) => {
  try {
    const params = new URLSearchParams({
      action: 'getAvailableUsers',
      current_email: currentUserEmail,
    });

    const response = await fetch(`${SHEETS_URL}?${params}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Failed to get available users:', error);
    return [];
  }
};
