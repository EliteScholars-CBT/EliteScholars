import React, { useState, useEffect, useCallback } from 'react';
import {
  getPendingChallenges,
  getChallengeHistory,
  acceptChallenge,
  declineChallenge,
  submitChallengeScore,
  getChallengeMessages,
} from '../utils/challengeApi';
import CreateChallenge from './CreateChallenge';
import Quiz from './Quiz';
import Toast from './Toast';
import Confetti from './Confetti';
import { EmojiIcon } from './Icon';

export default function Challenges({ userEmail, userName, userUsername }) {
  const [activeTab, setActiveTab]        = useState('pending');
  const [pendingChallenges, setPending]  = useState([]);
  const [history, setHistory]            = useState([]);
  const [messages, setMessages]          = useState([]);
  const [showCreateModal, setShowCreate] = useState(false);
  const [loading, setLoading]            = useState(true);

  const [playingChallenge, setPlaying] = useState(null);
  const [score, setScore]              = useState(0);
  const [correct, setCorrect]          = useState(0);
  const [totalQ, setTotalQ]            = useState(0);

  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const showToast = (message, type = 'info') => setToast({ show: true, message, type });

  const [celebrate, setCelebrate] = useState(false);
  const fireConfetti = () => {
    setCelebrate(false);
    // restart the burst even if one just fired (double-tap replay, quick rematch)
    requestAnimationFrame(() => setCelebrate(true));
    setTimeout(() => setCelebrate(false), 2700);
  };

  const loadChallenges = useCallback(async (silent = false) => {
    if (!userEmail) return;
    if (!silent) setLoading(true);
    try {
      const [pending, hist] = await Promise.all([
        getPendingChallenges(userEmail),
        getChallengeHistory(userEmail),
      ]);
      setPending(Array.isArray(pending) ? pending : []);
      setHistory(Array.isArray(hist)    ? hist    : []);
    } catch (err) {
      console.error('Failed to load challenges:', err);
    }
    setLoading(false);
  }, [userEmail]);

  useEffect(() => {
    getChallengeMessages().then(setMessages);
  }, []);

  useEffect(() => {
    if (userEmail) loadChallenges(false);
  }, [loadChallenges]);

  // Poll every 15s so challenger sees when opponent plays
  useEffect(() => {
    if (!userEmail) return;
    const interval = setInterval(() => loadChallenges(true), 15000);
    return () => clearInterval(interval);
  }, [loadChallenges]);

  // ── Accept ────────────────────────────────────────────────────────────────
  const handleAccept = async (challenge) => {
    await acceptChallenge(challenge.challenge_id, userEmail);
    setScore(0); setCorrect(0); setTotalQ(0);
    setPlaying(challenge);
  };

  const handleDecline = async (challengeId) => {
    await declineChallenge(challengeId, userEmail);
    loadChallenges(true);
  };

  // ── Quiz done — always go to history ──────────────────────────────────────
  const handleQuizDone = async () => {
    if (!playingChallenge) return;

    const result = await submitChallengeScore(
      playingChallenge.challenge_id,
      userEmail,
      correct,
      totalQ,
    );

    console.log('Challenge submit result:', result);

    setPlaying(null);

    // Always switch to history and reload — regardless of result.completed
    setActiveTab('history');
    await loadChallenges(false);

    if (!result?.success) {
      // The score genuinely never reached the server (even after the retry
      // inside submitChallengeScore) — say so plainly instead of a vague
      // "waiting for opponent" that hides a failed submission.
      showToast("Couldn't submit your score — check your connection and reopen this challenge to retry.", 'error');
      return;
    }

    if (result?.xpAwarded > 0) {
      const winnerEmail = result.winner?.toString().toLowerCase().trim();
      const isDraw = result.winner === 'draw';
      const iWon   = !isDraw && winnerEmail === userEmail?.toLowerCase().trim();
      if (result.completed && iWon)        { showToast(`🏆 You won! +${result.xpAwarded} XP`, 'success'); fireConfetti(); }
      else if (result.completed && isDraw) showToast(`🤝 Draw! +${result.xpAwarded} XP`, 'info');
      else if (result.completed)           showToast(`+${result.xpAwarded} XP for playing`, 'info');
      else                                 showToast('Score submitted! Waiting for opponent…', 'info');
    } else if (result?.success) {
      showToast('Score submitted! Waiting for opponent…', 'info');
    }

    // The sheet write can lag a beat behind the read on a cold Apps Script
    // instance — re-sync shortly after so "Victory"/"Defeat" appears without
    // needing a manual refresh.
    setTimeout(() => loadChallenges(true), 2500);
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const getMessageText = (challenge) => {
    if (challenge.custom_message) return challenge.custom_message;
    const found = messages.find(m => m.message_id === challenge.message_template);
    return found?.message_text || '';
  };

  const getStatusBadge = (status) => {
    if (status === 'pending')   return <span className="badge-pending"><EmojiIcon emoji="⏳" size="1.15em" /> Pending</span>;
    if (status === 'accepted')  return <span className="badge-accepted"><EmojiIcon emoji="✅" size="1.15em" /> Accepted</span>;
    if (status === 'completed') return <span className="badge-completed"><EmojiIcon emoji="🏆" size="1.15em" /> Completed</span>;
    if (status === 'declined')  return <span className="badge-declined"><EmojiIcon emoji="🚫" size="1.15em" /> Declined</span>;
    if (status === 'expired')   return <span className="badge-expired"><EmojiIcon emoji="⏰" size="1.15em" /> Expired</span>;
    return null;
  };

  // ── History card ──────────────────────────────────────────────────────────
  const renderHistoryCard = (challenge) => {
    const isChallenger = challenge.challenger_email?.toLowerCase() === userEmail?.toLowerCase();

    const myName  = userName || 'You';
    const oppName = isChallenger
      ? (challenge.opponent_name   || 'Opponent')
      : (challenge.challenger_name || 'Opponent');

    const myScore  = isChallenger
      ? (challenge.challenger_score ?? '?')
      : (challenge.opponent_score   ?? '?');
    const oppScore = isChallenger
      ? (challenge.opponent_score   ?? '?')
      : (challenge.challenger_score ?? '?');

    const status     = (challenge.status || '').toLowerCase();
    const winner     = challenge.winner_email;
    const isDraw     = winner === 'draw';
    const iWon       = !isDraw && winner?.toString().toLowerCase().trim() === userEmail?.toLowerCase().trim();
    const iLost      = !isDraw && winner && winner?.toString().toLowerCase().trim() !== userEmail?.toLowerCase().trim();
    const isDeclined = status === 'declined';
    const isExpired  = status === 'expired';
    const isAccepted = status === 'accepted';

    let resultIcon = '—', resultText = status, resultClass = 'neutral';
    if      (isAccepted)         { resultIcon = '⏳'; resultText = 'Awaiting Opponent'; resultClass = 'pending';  }
    else if (isExpired)          { resultIcon = '⏰'; resultText = 'Expired';           resultClass = 'expired';  }
    else if (isDeclined)         { resultIcon = '🚫'; resultText = 'Declined';          resultClass = 'declined'; }
    else if (isDraw)             { resultIcon = '🤝'; resultText = 'Draw';              resultClass = 'draw';     }
    else if (iWon)               { resultIcon = '🏆'; resultText = 'Victory';           resultClass = 'won';      }
    else if (iLost)              { resultIcon = '❌'; resultText = 'Defeat';            resultClass = 'lost';     }

    // Use completed_at when available; for expired/declined use expires_at - 24h
    // to approximate creation date (since expires_at = created + 24h)
    let rawDate = challenge.completed_at || null;
    if (!rawDate && challenge.expires_at) {
      rawDate = new Date(new Date(challenge.expires_at).getTime() - 24 * 60 * 60 * 1000).toISOString();
    }

    const dateObj       = rawDate ? new Date(rawDate) : null;
    const formattedDate = dateObj
      ? dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      : '--';
    const formattedTime = dateObj
      ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '--';

    const oppScoreDisplay = (isDeclined || isExpired || isAccepted) ? '?' : oppScore;

    return (
      <div key={challenge.challenge_id} className={`challenge-history-card ${resultClass}`}>
        <div className="challenge-history-top">
          <div className="challenge-history-user">
            <div className="challenge-history-opponent">{oppName}</div>
            <div className="challenge-history-meta">
              <span>{challenge.subject}</span>
              <span>•</span>
              <span>{challenge.exam_type || 'JAMB'}</span>
            </div>
          </div>
          <div className={`history-status-badge ${resultClass}`}>
            <span>{resultIcon}</span>
            <span>{resultText}</span>
          </div>
        </div>

        <div className="challenge-scoreboard">
          <div className="challenge-player-side">
            <div className={`challenge-score ${iWon ? 'winner-score' : ''} ${isDraw ? 'draw-score' : ''}`}>
              {myScore}
            </div>
            <div className="challenge-player-name">{myName}</div>
            {iWon && <div className="winner-tag">WINNER</div>}
          </div>
          <div className="challenge-vs">VS</div>
          <div className="challenge-player-side">
            <div className={`challenge-score ${iLost ? 'loser-score' : ''} ${isDraw ? 'draw-score' : ''}`}>
              {oppScoreDisplay}
            </div>
            <div className="challenge-player-name">{oppName}</div>
            {iLost && !isDraw && <div className="winner-tag loser">WINNER</div>}
          </div>
        </div>

        <div className="challenge-history-footer">
          <div className="challenge-history-date-wrap">
            <div className="challenge-history-date">{formattedDate}</div>
            <div className="challenge-history-time">{formattedTime}</div>
          </div>
          <div className="challenge-history-extra">
            <span>{challenge.num_questions || 5} Questions</span>
            <span>•</span>
            <span>{challenge.time_limit || 60}s each</span>
          </div>
        </div>
      </div>
    );
  };

  // ── Playing screen ────────────────────────────────────────────────────────
  if (playingChallenge) {
    return (
      <div className="challenge-play-overlay">
        <div className="challenge-play-banner">
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, padding: '12px 16px' }}>
            ⚔️ Challenge vs {playingChallenge.challenger_name} — Beat {playingChallenge.challenger_score ?? '?'} pts!
          </div>
        </div>
        <Quiz
          subjectId={playingChallenge.subject}
          onAllDone={handleQuizDone}
          setQuizTimeRemaining={() => {}}
          score={score}     setScore={setScore}
          correct={correct} setCorrect={setCorrect}
          totalQ={totalQ}   setTotalQ={setTotalQ}
          onHome={() => setPlaying(null)}
          triggerAdRefresh={() => {}} adRefresh={0}
          email={userEmail} name={userName}
          onFiftyUsed={() => {}} onHintUsed={() => {}}
          onLogQuestion={() => {}}
          isChallengeMode
          roundSize={playingChallenge.num_questions || 5}
          examType={playingChallenge.exam_type}
        />
      </div>
    );
  }

  // ── Pending split ─────────────────────────────────────────────────────────
  const needsMyAction = pendingChallenges.filter(c =>
    c.opponent_email?.toLowerCase() === userEmail?.toLowerCase() &&
    (c.status === 'pending' || c.status === 'accepted')
  );
  const waitingOnOpponent = pendingChallenges.filter(c =>
    c.challenger_email?.toLowerCase() === userEmail?.toLowerCase()
  );

  return (
    <div className="challenges-page">
      {celebrate && <Confetti />}
      <div className="challenges-header">
        <div className="challenges-title"><EmojiIcon emoji="⚔️" size="1.15em" /> Challenges</div>
        <div className="challenges-subtitle">Challenge friends and climb the ranks</div>
        <button className="create-challenge-btn" onClick={() => setShowCreate(true)}>+ New Challenge</button>
      </div>

      <div className="challenges-tabs">
        <button className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
          Pending {needsMyAction.length > 0 ? `(${needsMyAction.length})` : ''}
        </button>
        <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          History
        </button>
      </div>

      {loading ? (
        <div className="challenges-loading">Loading challenges...</div>
      ) : (
        <div className="challenges-list">

          {/* ── PENDING TAB ── */}
          {activeTab === 'pending' && (
            <>
              {needsMyAction.length > 0 && (
                <>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', padding: '8px 4px 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                    Needs your action
                  </div>
                  {needsMyAction.map(challenge => (
                    <div key={challenge.challenge_id} className="challenge-card">
                      <div className="challenge-header">
                        <div className="challenger-info">
                          <span className="challenger-name">From: {challenge.challenger_name}</span>
                          <span className="challenge-subject">{challenge.subject}</span>
                        </div>
                        {getStatusBadge(challenge.status)}
                      </div>
                      <div className="challenge-details">
                        <span>📚 {challenge.num_questions || 5} questions</span>
                        <span>⏱️ {challenge.time_limit || 60}s per question</span>
                      </div>
                      {getMessageText(challenge) && (
                        <div className="challenge-message">"{getMessageText(challenge)}"</div>
                      )}
                      {challenge.status === 'pending' && (
                        <div className="challenge-actions">
                          <button className="decline-btn" onClick={() => handleDecline(challenge.challenge_id)}>Decline</button>
                          <button className="accept-btn"  onClick={() => handleAccept(challenge)}>Accept & Play →</button>
                        </div>
                      )}
                      {challenge.status === 'accepted' && (
                        <div className="challenge-actions">
                          <button className="accept-btn" onClick={() => {
                            setScore(0); setCorrect(0); setTotalQ(0);
                            setPlaying(challenge);
                          }}>▶ Play Now</button>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}

              {waitingOnOpponent.length > 0 && (
                <>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)', padding: '12px 4px 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                    Waiting on opponent
                  </div>
                  {waitingOnOpponent.map(challenge => (
                    <div key={challenge.challenge_id} className="challenge-card" style={{ opacity: 0.8 }}>
                      <div className="challenge-header">
                        <div className="challenger-info">
                          <span className="challenger-name">To: {challenge.opponent_name}</span>
                          <span className="challenge-subject">{challenge.subject}</span>
                        </div>
                        {getStatusBadge(challenge.status)}
                      </div>
                      <div className="challenge-details">
                        <span>📚 {challenge.num_questions || 5} questions</span>
                        <span>⏱️ {challenge.time_limit || 60}s per question</span>
                        <span>🎯 Your score: {challenge.challenger_score != null && challenge.challenger_score !== '' ? challenge.challenger_score : '?'}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 8, fontStyle: 'italic' }}>
                        ⏳ Waiting for {challenge.opponent_name} to {challenge.status === 'pending' ? 'accept' : 'play'}...
                      </div>
                    </div>
                  ))}
                </>
              )}

              {needsMyAction.length === 0 && waitingOnOpponent.length === 0 && (
                <div className="empty-state">
                  <div className="empty-icon"><EmojiIcon emoji="🎯" size="1.1em" /></div>
                  <div>No pending challenges</div>
                  <button className="empty-action" onClick={() => setShowCreate(true)}>Create one</button>
                </div>
              )}
            </>
          )}

          {/* ── HISTORY TAB ── */}
          {activeTab === 'history' && history.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon"><EmojiIcon emoji="📭" size="1.1em" /></div>
              <div>No challenge history yet</div>
            </div>
          )}
          {activeTab === 'history' && [...history].map(renderHistoryCard)}
        </div>
      )}

      {showCreateModal && (
        <CreateChallenge
          userEmail={userEmail}
          userName={userName}
          userUsername={userUsername}
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); loadChallenges(false); }}
        />
      )}

      {toast.show && (
        <Toast message={toast.message} type={toast.type}
          onClose={() => setToast({ ...toast, show: false })} />
      )}
    </div>
  );
}