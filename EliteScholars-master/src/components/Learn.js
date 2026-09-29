import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WAEC_SUBJECTS } from '../data/waec/index';
import { WAEC_LEARN } from '../data/waec/learn/index';
import { GST_LEARN } from '../data/gst/index';
import { GST_SUBJECTS } from '../data/gst/index';
import { NECO_SUBJECTS } from '../data/neco/index';
import {
  AD_EVERY_NTH_SUBHEADING,
  MAX_ADS_PER_PAGE,
  PUBLISHER_AD_ENABLED,
} from '../utils/constants';
import AdSection from './AdSection';
import { SFX, stopSpeech } from '../utils/sounds';
import BackButton from './BackButton';
import { mapToCharacterVoices, getVoiceForCharacter } from '../utils/voices';
import {
  startStudySession,
  endStudySession,
  trackTopicOpened,
  trackLearnQuizComplete,
  trackTopicComplete,
} from '../analytics/studyAnalytics';
import Icon, { EmojiIcon } from './Icon';

const FONT_SIZES = [13, 15, 17, 19, 21];
const STORAGE_KEY = (examType, subjectId) => `es_learn_${examType}_${subjectId}`;
const MIN_CORRECT_ANSWERS = 3;

function stripHtml(html = '') {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function injectAds(html, adEvery, maxAds, topicIdx, adSequence) {
  if (!html || adEvery <= 0) return [{ type: 'html', content: html }];
  const parts = html.split(/(?=<h3[\s>])/i);
  const blocks = [];
  let adCount = 0,
    h3Count = 0;
  parts.forEach((part) => {
    blocks.push({ type: 'html', content: part });
    if (/^<h3/i.test(part)) {
      h3Count++;
      if (h3Count % adEvery === 0 && adCount < maxAds) {
        const slot = (topicIdx * 100 + adCount + adSequence) % 100;
        blocks.push({ type: 'ad', slot });
        adCount++;
      }
    }
  });
  return blocks;
}

function ContentBlock({ block, refreshTrigger, examType, email }) {
  if (block.type === 'ad')
    return (
      <AdSection
        slot={block.slot}
        refreshTrigger={refreshTrigger}
        showPublisher={PUBLISHER_AD_ENABLED}
        examType={examType}
        email={email}
      />
    );

  let html = block.content;
  if (examType === 'jamb' || examType === 'postutme') {
    html = html.replace(/\bWAEC\b/gi, 'JAMB');
  } else if (examType === 'neco') {
    html = html.replace(/\bWAEC\b/gi, 'NECO');
  }
  return <div className="learn-content-html" dangerouslySetInnerHTML={{ __html: html }} />;
}

function CircleProgress({ pct = 0, color = '#8B5CF6', size = 36 }) {
  const r = size / 2 - 4;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(108,63,201,0.12)"
        strokeWidth={3}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.5s ease' }}
      />
    </svg>
  );
}

function TopicCard({ topic, index, isActive, isDone, isLocked, color, onClick }) {
  return (
    <div
      className={`learn-topic-card ${isDone ? 'done' : ''} ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
      style={{ '--topic-color': color }}
      onClick={!isLocked ? onClick : undefined}
      role="button"
      tabIndex={isLocked ? -1 : 0}
      onKeyDown={(e) => !isLocked && (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-label={`${topic.topic}${isDone ? ' — completed' : ''}${isLocked ? ' — locked' : ''}`}
    >
      <div className="learn-topic-card-left">
        <div
          className={`learn-topic-num ${isDone ? 'done' : ''}`}
          style={{
            background: isDone ? color : undefined,
            borderColor: isActive ? color : undefined,
          }}
        >
          {isDone ? '✓' : isLocked ? '🔒' : index + 1}
        </div>
        <div className="learn-topic-card-info">
          <div className="learn-topic-title">{topic.topic}</div>
          <div className="learn-topic-status">
            {isDone
              ? '✅ Completed'
              : isActive
                ? '📖 In progress'
                : isLocked
                  ? '🔒 Complete previous first'
                  : 'Not started'}
          </div>
        </div>
      </div>
      <div className="learn-topic-card-right">
        {isDone ? (
          <div className="learn-topic-done-badge">✓</div>
        ) : (
          <CircleProgress pct={isActive ? 30 : 0} color={color} />
        )}
      </div>
    </div>
  );
}

function getLearnData(examType) {
  if (examType === 'gst') return GST_LEARN;
  return WAEC_LEARN;
}

export default function Learn({ subjectId, onBack, onTopicComplete, examType = 'waec', email }) {
  const learnData = getLearnData(examType);
  const topics = learnData[subjectId] || [];

  const allSubjects = [...(WAEC_SUBJECTS || []), ...(GST_SUBJECTS || []), ...(NECO_SUBJECTS || [])];
  const meta = allSubjects.find((s) => s.id === subjectId) || {
    label: subjectId,
    icon: '📖',
    color: '#8B5CF6',
    bg: '#F3F0FF',
  };

  const storageKey = STORAGE_KEY(examType, subjectId);
  const [progress, setProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
      return {};
    }
  });
  const completedTopics = progress.completedTopics || [];
  const lastIdx = progress.lastTopicIdx ?? null;

  const saveProgress = (newCompleted, newLastIdx) => {
    const p = { completedTopics: newCompleted, lastTopicIdx: newLastIdx };
    setProgress(p);
    try {
      localStorage.setItem(storageKey, JSON.stringify(p));
    } catch {}
  };

  const [activeIdx, setActiveIdx] = useState(null);
  const [headerCollapsed, setHeaderCollapsed] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [characterVoices, setCharVoices] = useState([]);
  const [selectedCharId, setSelectedCharId] = useState('sophia');
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [adSequence, setAdSequence] = useState(() => Math.floor(Math.random() * 100));
  const [adRefresh] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setAdSequence((prev) => (prev + 1) % 100), 30000);
    return () => clearInterval(interval);
  }, []);

  const [quizMode, setQuizMode] = useState(false);
  const [quizQs, setQuizQs] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSel, setQuizSel] = useState(-1);
  const [quizAnswered, setAnswered] = useState(false);
  const [quizResults, setResults] = useState([]);
  const [quizDone, setQuizDone] = useState(false);

  // Track whether to auto-advance to next topic after quiz completion
  const [showNextTopicPrompt, setShowNextTopicPrompt] = useState(false);

  const scrollRef = useRef(null);
  const fSize = FONT_SIZES[fontSize];

  useEffect(() => {
    const load = () => {
      const raw = window.speechSynthesis?.getVoices() || [];
      const mapped = mapToCharacterVoices(raw);
      setCharVoices(mapped);
      const firstAvail = mapped.find((c) => c.voice);
      if (firstAvail) setSelectedCharId(firstAvail.id);
    };
    load();
    if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = load;
    return () => stopSpeech();
  }, []);

  useEffect(() => {
    return () => {
      endStudySession(email);
      stopSpeech();
    };
  }, [email]);

  const handleScroll = () => {
    if (scrollRef.current && activeIdx !== null) {
      setHeaderCollapsed(scrollRef.current.scrollTop > 60);
    }
  };

  const speakContent = () => {
    if (activeIdx === null) return;
    const text = stripHtml(topics[activeIdx]?.contentHTML || topics[activeIdx]?.content || '');
    stopSpeech();
    const utter = new SpeechSynthesisUtterance(text);
    const voice = getVoiceForCharacter(selectedCharId, characterVoices);
    if (voice) utter.voice = voice;
    utter.rate = 0.75;
    utter.pitch = 1.0;
    utter.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
    setPaused(false);
  };

  const handlePause = () => {
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  };
  const handleStop = () => {
    stopSpeech();
    setSpeaking(false);
    setPaused(false);
  };

  const openTopic = (idx) => {
    stopSpeech();
    setSpeaking(false);
    if (idx !== activeIdx) endStudySession(email);
    startStudySession({
      email,
      name: '',
      examType,
      subjectId,
      subjectLabel: meta.label,
      topicName: topics[idx]?.topic || '',
    });
    trackTopicOpened({
      email,
      examType,
      subjectId,
      topicName: topics[idx]?.topic,
      topicIndex: idx,
    });
    setActiveIdx(idx);
    setQuizMode(false);
    setShowNextTopicPrompt(false);
    setHeaderCollapsed(false);
    saveProgress(completedTopics, idx);
    setTimeout(() => scrollRef.current?.scrollTo(0, 0), 50);
  };

  const closeTopic = () => {
    endStudySession(email);
    stopSpeech();
    setSpeaking(false);
    setActiveIdx(null);
    setHeaderCollapsed(false);
    setQuizMode(false);
    setShowNextTopicPrompt(false);
  };

  const startQuiz = useCallback(() => {
    const currentTopic = topics[activeIdx];
    const topicQuestions = currentTopic?.questions || [];

    if (topicQuestions.length > 0) {
      const shuffled = [...topicQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(5, topicQuestions.length));
      setQuizQs(shuffled);
      setQuizIdx(0);
      setQuizSel(-1);
      setAnswered(false);
      setResults([]);
      setQuizDone(false);
      setShowNextTopicPrompt(false);
      setQuizMode(true);
      setTimeout(() => scrollRef.current?.scrollTo(0, 0), 50);
      return;
    }

    const getBankPromise = () => {
      if (examType === 'gst') return import('../data/gst/index').then((m) => m.GST_QB);
      if (examType === 'neco') {
        return Promise.all([
          import('../data/neco/index').then((m) => m.NECO_QB),
          import('../data/waec/index').then((m) => m.WAEC_QB),
        ]).then(([necoQB, waecQB]) => ((necoQB[subjectId] || []).length > 0 ? necoQB : waecQB));
      }
      if (examType === 'jamb' || examType === 'postutme') {
        return Promise.all([
          import('../data/jamb/index').then((m) => m.QB),
          import('../data/waec/index').then((m) => m.WAEC_QB),
        ]).then(([jambQB, waecQB]) => ((jambQB[subjectId] || []).length > 0 ? jambQB : waecQB));
      }
      return import('../data/waec/index').then((m) => m.WAEC_QB);
    };

    getBankPromise().then((bank) => {
      const pool = bank[subjectId] || [];
      const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(5, pool.length));
      if (!shuffled.length) {
        markComplete(activeIdx);
        return;
      }
      setQuizQs(shuffled);
      setQuizIdx(0);
      setQuizSel(-1);
      setAnswered(false);
      setResults([]);
      setQuizDone(false);
      setShowNextTopicPrompt(false);
      setQuizMode(true);
      setTimeout(() => scrollRef.current?.scrollTo(0, 0), 50);
    });
  }, [subjectId, examType, activeIdx, topics]);

  const submitAnswer = () => {
    if (quizSel < 0 || quizAnswered) return;
    const q = quizQs[quizIdx];
    const correct = quizSel === q.a;
    if (correct) SFX.correct();
    else SFX.wrong();
    setResults((r) => [...r, { q: q.q, options: q.o, sel: quizSel, ans: q.a, correct, exp: q.e }]);
    setAnswered(true);
  };

  const nextQuestion = () => {
    if (quizIdx >= quizQs.length - 1) {
      setQuizDone(true);
    } else {
      setQuizIdx((i) => i + 1);
      setQuizSel(-1);
      setAnswered(false);
    }
  };

  const markComplete = (idx) => {
    SFX.roundComplete();
    const updated = [...new Set([...completedTopics, idx])];
    saveProgress(updated, idx);
    trackTopicComplete({
      email,
      examType,
      subjectId,
      topicName: topics[idx]?.topic,
      topicIndex: idx,
    });
    if (onTopicComplete) onTopicComplete(idx);
    setQuizMode(false);

    // Check if there's a next topic to go to
    const nextIdx = idx + 1;
    if (nextIdx < topics.length) {
      setShowNextTopicPrompt(true);
    }
  };

  const finishQuiz = () => {
    markComplete(activeIdx);
  };

  const goToNextTopic = () => {
    const nextIdx = (activeIdx ?? 0) + 1;
    if (nextIdx < topics.length) {
      openTopic(nextIdx);
    }
    setShowNextTopicPrompt(false);
  };

  const topic = activeIdx !== null ? topics[activeIdx] : null;
  const contentBlocks = topic
    ? injectAds(
        topic.contentHTML || `<p class="learn-p">${topic.content || ''}</p>`,
        AD_EVERY_NTH_SUBHEADING,
        MAX_ADS_PER_PAGE,
        activeIdx,
        adSequence
      )
    : [];

  const overallPct = topics.length ? Math.round((completedTopics.length / topics.length) * 100) : 0;

  // ── Topic list screen ─────────────────────────────────────────────────────
  if (activeIdx === null) {
    return (
      <div
        className="scr fd learn-page"
        style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}
      >
        <div
          className="learn-header learn-header-full"
          style={{ background: `linear-gradient(135deg,#1A1A2E,${meta.color || '#6C63FF'})` }}
        >
          <div className="learn-header-top-row">
            <BackButton
              onClick={() => {
                endStudySession(email);
                stopSpeech();
                onBack();
              }}
              light
            />
            <div className="learn-font-controls">
              <button
                className="learn-font-btn"
                onClick={() => setFontSize((s) => Math.max(0, s - 1))}
                disabled={fontSize === 0}
              >
                A−
              </button>
              <button
                className="learn-font-btn"
                onClick={() => setFontSize((s) => Math.min(FONT_SIZES.length - 1, s + 1))}
                disabled={fontSize === FONT_SIZES.length - 1}
              >
                A+
              </button>
            </div>
          </div>
          <div className="learn-header-info">
            <div className="learn-subject-icon" style={{ background: meta.bg }}>
              {meta.icon}
            </div>
            <div>
              <div className="learn-subject-name">{meta.label}</div>
              <div className="learn-subject-meta">
                Learn Mode · {topics.length} topics · {completedTopics.length} done
              </div>
            </div>
          </div>
          <div className="learn-header-progress-bar">
            <div
              className="learn-header-progress-fill"
              style={{ width: `${overallPct}%`, background: '#FFC53D' }}
            />
          </div>
          <div className="learn-header-progress-label">{overallPct}% complete</div>
        </div>

        <div className="scroll learn-body" style={{ flex: 1, overflowY: 'auto' }}>
          <div className="learn-topic-list">
            {topics.map((t, i) => {
              const isDone = completedTopics.includes(i);
              const isLocked = i > 0 && !completedTopics.includes(i - 1);
              return (
                <TopicCard
                  key={i}
                  topic={t}
                  index={i}
                  isActive={i === lastIdx}
                  isDone={isDone}
                  isLocked={isLocked}
                  color={meta.color}
                  onClick={() => openTopic(i)}
                />
              );
            })}
            {topics.length === 0 && (
              <div className="learn-empty"><EmojiIcon emoji="📚" size="1.15em" /> Content coming soon for this subject!</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const isDoneNow = completedTopics.includes(activeIdx);
  const isLastTopic = activeIdx === topics.length - 1;
  const quizScore = quizResults.filter((r) => r.correct).length;

  return (
    <div
      className="scr fd learn-page"
      style={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}
    >
      <div
        className={`learn-header ${headerCollapsed ? 'learn-header-collapsed' : 'learn-header-full'}`}
        style={{ background: `linear-gradient(135deg,#1A1A2E,${meta.color || '#6C63FF'})` }}
      >
        <div className="learn-header-top-row">
          <BackButton
            onClick={closeTopic}
            light
            label={topics[activeIdx]?.topic || 'Back'}
            truncate
          />
          {!headerCollapsed && (
            <div className="learn-font-controls">
              <button
                className="learn-font-btn"
                onClick={() => setFontSize((s) => Math.max(0, s - 1))}
                disabled={fontSize === 0}
              >
                A−
              </button>
              <button
                className="learn-font-btn"
                onClick={() => setFontSize((s) => Math.min(FONT_SIZES.length - 1, s + 1))}
                disabled={fontSize === FONT_SIZES.length - 1}
              >
                A+
              </button>
            </div>
          )}
        </div>
        {!headerCollapsed && (
          <>
            <div className="learn-header-info" style={{ paddingTop: 6 }}>
              <div
                className="learn-subject-icon"
                style={{ background: meta.bg, width: 32, height: 32, fontSize: 16 }}
              >
                {meta.icon}
              </div>
              <div>
                <div className="learn-subject-name" style={{ fontSize: 14 }}>
                  {meta.label}
                </div>
                <div className="learn-subject-meta">
                  Topic {activeIdx + 1} of {topics.length}
                  {isDoneNow ? ' · ✅ Completed' : ''}
                </div>
              </div>
            </div>
            <div className="learn-tts-bar learn-tts-compact">
              <select
                className="learn-voice-select"
                value={selectedCharId}
                onChange={(e) => setSelectedCharId(e.target.value)}
              >
                {characterVoices
                  .filter((c) => c.voice)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.gender === 'female' ? '♀' : '♂'})
                    </option>
                  ))}
              </select>
              {!speaking ? (
                <button className="learn-tts-btn" onClick={speakContent}>
                  <Icon name="play" size={14} /> Read
                </button>
              ) : (
                <>
                  <button className="learn-tts-btn" onClick={handlePause} aria-label={paused ? 'Resume reading' : 'Pause reading'}>
                    <Icon name={paused ? 'play' : 'pause'} size={14} />
                  </button>
                  <button className="learn-tts-btn learn-tts-stop" onClick={handleStop} aria-label="Stop reading">
                    <Icon name="stop" size={14} />
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── Quiz mode ── */}
      {quizMode ? (
        <div
          className="scroll learn-quiz-overlay"
          ref={scrollRef}
          style={{ flex: 1, overflowY: 'auto' }}
        >
          <div className="learn-quiz-header">
            <button className="learn-quiz-back-btn" onClick={() => setQuizMode(false)}>
              ← Back to content
            </button>
            <span className="learn-quiz-progress">
              {quizDone ? 'Complete!' : `Q ${quizIdx + 1}/${quizQs.length}`}
            </span>
          </div>

          {!quizDone && quizQs[quizIdx] && (
            <div className="learn-quiz-card">
              <div className="learn-quiz-dots">
                {quizQs.map((_, i) => (
                  <div
                    key={i}
                    className={`learn-quiz-dot ${i < quizIdx ? 'done' : i === quizIdx ? 'active' : ''}`}
                  />
                ))}
              </div>
              <div className="learn-quiz-q">{quizQs[quizIdx].q}</div>
              <div className="learn-quiz-options">
                {quizQs[quizIdx].o.map((opt, i) => {
                  let cls = 'learn-quiz-opt';
                  if (quizAnswered) {
                    if (i === quizQs[quizIdx].a) cls += ' correct';
                    else if (i === quizSel && quizSel !== quizQs[quizIdx].a) cls += ' wrong';
                  } else if (i === quizSel) cls += ' selected';
                  return (
                    <button
                      key={i}
                      className={cls}
                      onClick={() => !quizAnswered && setQuizSel(i)}
                      disabled={quizAnswered}
                    >
                      <span className="learn-quiz-opt-letter">{['A', 'B', 'C', 'D'][i]}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {!quizAnswered ? (
                <button
                  className="learn-quiz-submit"
                  onClick={submitAnswer}
                  disabled={quizSel < 0}
                  style={{ background: meta.color }}
                >
                  Submit Answer →
                </button>
              ) : (
                <div className="learn-quiz-explanation">
                  <div
                    className={`learn-quiz-result ${quizSel === quizQs[quizIdx].a ? 'correct' : 'wrong'}`}
                  >
                    {quizSel === quizQs[quizIdx].a ? '✅ Correct!' : '❌ Incorrect'}
                  </div>
                  <div className="learn-quiz-exp-text">💡 {quizQs[quizIdx].e}</div>
                  <button
                    className="learn-quiz-next"
                    onClick={nextQuestion}
                    style={{ background: meta.color }}
                  >
                    {quizIdx >= quizQs.length - 1 ? '🏁 See Results' : 'Next Question →'}
                  </button>
                </div>
              )}
            </div>
          )}

          {quizDone && (
            <div className="learn-quiz-results">
              <div className="learn-quiz-results-score" style={{ color: meta.color }}>
                {quizScore}/{quizQs.length}
              </div>
              <div className="learn-quiz-results-label">
                {quizScore === quizQs.length
                  ? '🎉 Perfect score!'
                  : quizScore >= MIN_CORRECT_ANSWERS
                    ? '👍 Well done!'
                    : `📚 Keep studying!`}
              </div>
              <div className="learn-quiz-results-list">
                {quizResults.map((r, i) => (
                  <div
                    key={i}
                    className={`learn-quiz-result-row ${r.correct ? 'correct' : 'wrong'}`}
                  >
                    <span>
                      {i + 1}. {r.q?.slice(0, 55)}
                      {r.q?.length > 55 ? '…' : ''}
                    </span>
                    <span>{r.correct ? '✅' : '❌'}</span>
                  </div>
                ))}
              </div>

              {/* After marking complete — show next topic button OR all done */}
              {showNextTopicPrompt ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                  <button
                    className="learn-quiz-finish-btn"
                    onClick={goToNextTopic}
                    style={{ background: meta.color }}
                  >
                    ▶ Continue to Next Topic →
                  </button>
                  <button className="learn-quiz-retry-btn" onClick={closeTopic}>
                    ← Back to Topic List
                  </button>
                </div>
              ) : isLastTopic && isDoneNow ? (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>🎊</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>
                    You've completed all topics!
                  </div>
                  <button
                    className="learn-quiz-retry-btn"
                    onClick={() => {
                      endStudySession(email);
                      stopSpeech();
                      onBack();
                    }}
                  >
                    ← Back to Subjects
                  </button>
                </div>
              ) : (
                <button
                  className="learn-quiz-finish-btn"
                  onClick={finishQuiz}
                  style={{ background: meta.color }}
                >
                  ✅ Mark Topic Complete →
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        /* ── Content view ── */
        <div
          className="scroll"
          ref={scrollRef}
          onScroll={handleScroll}
          style={{ flex: 1, overflowY: 'auto', padding: '0 0 24px' }}
        >
          <div style={{ padding: '12px 16px 0', fontSize: fSize }}>
            {contentBlocks.map((block, bi) => (
              <ContentBlock
                key={bi}
                block={block}
                refreshTrigger={adRefresh}
                examType={examType}
                email={email}
              />
            ))}
          </div>

          <div className="learn-content-footer">
            {/* If topic is done and next topic prompt is showing */}
            {showNextTopicPrompt ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="learn-completed-badge"><EmojiIcon emoji="✅" size="1.15em" /> Topic Completed!</div>
                <button
                  className="learn-quiz-trigger-full"
                  onClick={goToNextTopic}
                  style={{ background: meta.color }}
                >
                  ▶ Continue to Next Topic →
                </button>
                <button
                  className="learn-quiz-retry-btn"
                  style={{ marginTop: 0 }}
                  onClick={closeTopic}
                >
                  ← Back to Topic List
                </button>
              </div>
            ) : isDoneNow ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="learn-completed-badge"><EmojiIcon emoji="✅" size="1.15em" /> Topic Completed</div>
                {!isLastTopic && (
                  <button
                    className="learn-quiz-trigger-full"
                    onClick={() => openTopic(activeIdx + 1)}
                    style={{ background: meta.color }}
                  >
                    ▶ Next Topic →
                  </button>
                )}
                {isLastTopic && (
                  <button
                    className="learn-quiz-retry-btn"
                    onClick={() => {
                      endStudySession(email);
                      stopSpeech();
                      onBack();
                    }}
                  >
                    🎊 All done! Back to Subjects
                  </button>
                )}
              </div>
            ) : (
              <button
                className="learn-quiz-trigger-full"
                onClick={startQuiz}
                style={{ background: meta.color }}
              >
                📝 Take Quiz to Complete This Topic
              </button>
            )}

            <div className="learn-content-nav">
              <button
                className="learn-nav-btn"
                onClick={() => openTopic(Math.max(0, activeIdx - 1))}
                disabled={activeIdx === 0}
              >
                ← Prev
              </button>
              <button
                className="learn-nav-btn learn-nav-next"
                onClick={() => openTopic(Math.min(topics.length - 1, activeIdx + 1))}
                disabled={activeIdx === topics.length - 1 || !isDoneNow}
                style={isDoneNow ? { borderColor: meta.color, color: meta.color } : {}}
              >
                {isDoneNow ? 'Next →' : '🔒 Next'}
              </button>
            </div>
            <p className="learn-keyboard-hint">{`⌨️ Arrow keys to navigate · Complete quiz to unlock next topic`}</p>
          </div>
        </div>
      )}
    </div>
  );
}
