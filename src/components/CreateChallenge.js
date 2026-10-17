import React, { useState, useEffect } from 'react';
import {
  createChallenge,
  getChallengeMessages,
  checkUserExists,
  checkUserByUsername,
} from '../utils/challengeApi';
import Quiz from './Quiz';
import Icon, { EmojiIcon } from './Icon';
import BackButton from './BackButton';
import { WAEC_SUBJECTS } from '../data/waec/index';
import { NECO_SUBJECTS } from '../data/neco/index';
import { GST_SUBJECTS } from '../data/gst/index';
import { SUBJ } from '../data/subjects';

const EXAM_OPTIONS = [
  { id: 'jamb',     label: 'JAMB' },
  // { id: 'postutme', label: 'POST UTME' },
  { id: 'waec',     label: 'WAEC' },
  { id: 'neco',     label: 'NECO' },
  { id: 'gst',      label: 'GST' },
];

// Subject options per exam type — sourced from the same data files
// the app uses, so they stay in sync automatically.
const SUBJECT_OPTIONS_BY_EXAM = {
  jamb: Object.entries(SUBJ)
    .filter(([id]) => id !== 'novel')
    .map(([id, meta]) => ({ id, label: meta.label })),

  postutme: Object.entries(SUBJ)
    .filter(([id]) => id !== 'novel')
    .map(([id, meta]) => ({ id, label: meta.label })),

  waec: WAEC_SUBJECTS
    .filter(s => !['further_maths','crs','visual_arts','food_nutrition','marketing','digital_tech','agric_science','citizenship'].includes(s.id))
    .map(s => ({ id: s.id, label: s.label })),

  neco: NECO_SUBJECTS
    .map(s => ({ id: s.id, label: s.label })),

  gst: GST_SUBJECTS
    .map(s => ({ id: s.id, label: s.label })),
};

const NUM_QUESTIONS = 5;
const TIME_LIMIT    = 60;

export default function CreateChallenge({ userEmail, userName, userUsername, onClose, onCreated }) {
  const [step, setStep]                   = useState('setup');
  const [opponentInput, setOpponentInput] = useState('');
  const [opponentEmail, setOpponentEmail] = useState('');
  const [opponentName, setOpponentName]   = useState('');
  const [examType, setExamType]           = useState('jamb');
  const [university, setUniversity]       = useState('');
  const [subject, setSubject]             = useState('mathematics');
  const [messageTemplate, setMsgTpl]      = useState('');
  const [customMessage, setCustomMsg]     = useState('');
  const [messages, setMessages]           = useState([]);
  const [inputError, setInputError]       = useState('');
  const [sendError, setSendError]         = useState('');

  const [checkingUser, setCheckingUser]   = useState(false);
  const [userChecked, setUserChecked]     = useState(false);

  const [finalCorrect, setFinalCorrect]   = useState(0);
  const [finalTotal, setFinalTotal]       = useState(0);
  const [finalScore, setFinalScore]       = useState(0);

  const [score, setScore]     = useState(0);
  const [correct, setCorrect] = useState(0);
  const [totalQ, setTotalQ]   = useState(0);

  useEffect(() => {
    getChallengeMessages().then((msgs) => {
      setMessages(msgs);
      if (msgs.length) setMsgTpl(msgs[0].message_id);
    });
  }, []);

  // When exam type changes, reset subject to first available for that exam type
  useEffect(() => {
    const options = SUBJECT_OPTIONS_BY_EXAM[examType] || [];
    if (options.length > 0) {
      setSubject(options[0].id);
    }
  }, [examType]);

  const subjectOptions = SUBJECT_OPTIONS_BY_EXAM[examType] || [];

  const isEmailFormat = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validateInput = (val) => {
    if (!val) return 'Enter an email address or username';
    if (val.includes('@')) {
      if (!isEmailFormat(val)) return 'Enter a valid email address';
      if (val.toLowerCase() === userEmail?.toLowerCase()) return 'You cannot challenge yourself';
    } else {
      if (val.length < 3) return 'Username is too short';
      if (userUsername && val.toLowerCase() === userUsername.toLowerCase()) return 'You cannot challenge yourself';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const v = e.target.value;
    setOpponentInput(v);
    setUserChecked(false);
    setOpponentEmail('');
    setOpponentName('');
    setInputError(validateInput(v));
  };

  const handleInputBlur = async () => {
    const error = validateInput(opponentInput);
    if (error) { setInputError(error); return; }
    setCheckingUser(true);
    setInputError('');
    if (opponentInput.includes('@')) {
      const result = await checkUserExists(opponentInput);
      setCheckingUser(false);
      if (!result.exists) { setInputError('No account found with this email.'); setUserChecked(false); return; }
      const name = result.firstName ? `${result.firstName} ${result.lastName}`.trim() : opponentInput.split('@')[0];
      setOpponentEmail(opponentInput.toLowerCase().trim());
      setOpponentName(name);
      setUserChecked(true);
    } else {
      const result = await checkUserByUsername(opponentInput);
      setCheckingUser(false);
      if (!result.exists) { setInputError('No account found with this username.'); setUserChecked(false); return; }
      const name = result.firstName ? `${result.firstName} ${result.lastName}`.trim() : `@${result.username}`;
      setOpponentEmail(result.email.toLowerCase().trim());
      setOpponentName(name);
      setUserChecked(true);
    }
  };

  const handleStartPlay = () => {
    const error = validateInput(opponentInput);
    if (error) { setInputError(error); return; }
    if (!userChecked || !opponentEmail) { setInputError('Please wait — verifying opponent account...'); return; }
    setScore(0); setCorrect(0); setTotalQ(0);
    setFinalCorrect(0); setFinalTotal(0); setFinalScore(0);
    setStep('play');
  };

  const handleQuizDone = async () => {
  const fc = correct;
  const ft = totalQ;
  const fs = score;  // this can be 0

  setFinalCorrect(fc); setFinalTotal(ft); setFinalScore(fs);
  setStep('sending'); setSendError('');

  try {
    const result = await createChallenge(
      userEmail, userName,
      opponentEmail, opponentName || opponentEmail.split('@')[0],
      examType, university, subject,
      NUM_QUESTIONS, TIME_LIMIT,
      messageTemplate, customMessage,
      fc,   // ← send correct count as the "score" (number of correct answers)
      fc,
      ft,
    );
    if (result.success) {
      setStep('sent');
      setTimeout(() => { onCreated(); }, 2200);
    } else {
      setSendError(result.error || 'Failed to send.');
      setStep('error');
    }
  } catch {
    setSendError('Network error. Please try again.');
    setStep('error');
  }
};

  // ── STEP: SETUP ────────────────────────────────────────────────────────────
  if (step === 'setup') {
    return (
      <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="create-challenge-modal">
          <div className="modal-header">
            <div className="modal-title"><EmojiIcon emoji="⚔️" size="1.15em" /> Create Challenge</div>
            <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
          </div>

          <div className="modal-body">

            {/* Opponent */}
            <div className="form-group">
              <label>Opponent Email or Username</label>
              <input
                type="text"
                placeholder="opponent@email.com or @username"
                value={opponentInput}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={inputError ? 'input-error' : userChecked ? 'input-success' : ''}
              />
              {checkingUser && <div className="checking-text"><EmojiIcon emoji="🔍" size="1.15em" /> Checking account...</div>}
              {!checkingUser && inputError && <div className="error-text">{inputError}</div>}
              {!checkingUser && userChecked && !inputError && (
                <div className="success-text">✅ Found: {opponentName}</div>
              )}
            </div>

            {/* Exam Type */}
            <div className="form-group">
              <label>Exam Type</label>
              <div className="radio-group">
                {EXAM_OPTIONS.map((opt) => (
                  <label key={opt.id}>
                    <input
                      type="radio" value={opt.id}
                      checked={examType === opt.id}
                      onChange={(e) => setExamType(e.target.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {examType === 'postutme' && (
              <div className="form-group">
                <label>University (e.g. unilag)</label>
                <input
                  type="text" placeholder="e.g. unilag" value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>
            )}

            {/* Subject — dynamically filtered by exam type */}
            <div className="form-group">
              <label>Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                {subjectOptions.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="challenge-info-box">
              <div className="info-row">
                <span><EmojiIcon emoji="📚" size="1.15em" /> Questions:</span>
                <span><strong>{NUM_QUESTIONS}</strong></span>
              </div>
              <div className="info-row">
                <span><EmojiIcon emoji="⏱️" size="1.15em" /> Time/question:</span>
                <span><strong>{TIME_LIMIT}s</strong></span>
              </div>
            </div>

            <div className="form-group">
              <label>Challenge Message</label>
              <select value={messageTemplate} onChange={(e) => setMsgTpl(e.target.value)}>
                <option value="custom">Custom message…</option>
                {messages.map((m) => (
                  <option key={m.message_id} value={m.message_id}>{m.message_text}</option>
                ))}
              </select>
            </div>

            {messageTemplate === 'custom' && (
              <div className="form-group">
                <input
                  type="text" placeholder="Your message (max 100 chars)"
                  value={customMessage}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  maxLength="100"
                />
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button
              className="send-btn"
              onClick={handleStartPlay}
              disabled={!!inputError || !opponentInput || checkingUser || !userChecked}
            >
              {checkingUser ? 'Checking...' : '▶ Play'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STEP: PLAY ─────────────────────────────────────────────────────────────
  if (step === 'play') {
    return (
      <div className="challenge-play-overlay">
        <div className="challenge-play-banner">
          <BackButton onClick={() => setStep('setup')} light label="Setup" />
        </div>
        <Quiz
          subjectId={subject}
          onAllDone={handleQuizDone}
          setQuizTimeRemaining={() => {}}
          score={score}     setScore={setScore}
          correct={correct} setCorrect={setCorrect}
          totalQ={totalQ}   setTotalQ={setTotalQ}
          onHome={() => setStep('setup')}
          triggerAdRefresh={() => {}} adRefresh={0}
          email={userEmail} name={userName}
          onFiftyUsed={() => {}} onHintUsed={() => {}}
          onLogQuestion={() => {}}
          isChallengeMode
          roundSize={NUM_QUESTIONS}
          examType={examType}
        />
      </div>
    );
  }

  // ── STEP: SENDING ──────────────────────────────────────────────────────────
  if (step === 'sending') {
    return (
      <div className="modal-overlay">
        <div className="create-challenge-modal" style={{ textAlign: 'center', padding: 44 }}>
          <div className="loading-spinner" style={{ margin: '0 auto 16px' }} />
          <div style={{ fontWeight: 700, fontSize: 15, color: '#1B0A47' }}>Sending challenge…</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>
            Your score: <strong>{correct}/{totalQ}</strong> — {opponentName} will need to beat it!
          </div>
        </div>
      </div>
    );
  }

  // ── STEP: SENT ─────────────────────────────────────────────────────────────
  if (step === 'sent') {
    return (
      <div className="modal-overlay">
        <div className="create-challenge-modal" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 52 }}>🎉</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#1B0A47', margin: '12px 0 6px' }}>
            Challenge Sent!
          </div>
          <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
            Your score <strong>{finalCorrect}/{finalTotal}</strong> has been sent to{' '}
            <strong>{opponentName}</strong>. They have 24 hours to accept and play.
          </div>
        </div>
      </div>
    );
  }

  // ── STEP: ERROR ────────────────────────────────────────────────────────────
  return (
    <div className="modal-overlay">
      <div className="create-challenge-modal" style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 40 }}><EmojiIcon emoji="⚠️" size="1.1em" /></div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#DC2626', margin: '10px 0 6px' }}>
          Could Not Send
        </div>
        <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6, marginBottom: 18 }}>
          {sendError}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button className="cancel-btn" onClick={onClose}>Discard</button>
          <button className="send-btn" onClick={handleQuizDone}>Retry →</button>
        </div>
      </div>
    </div>
  );
}