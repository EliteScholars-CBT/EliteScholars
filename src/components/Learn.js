import { reserve } from '../utils/entitlement';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WAEC_SUBJECTS } from '../data/waec/index';
import { WAEC_LEARN } from '../data/waec/learn/index';
import { GST_LEARN } from '../data/gst/index';
import { GST_SUBJECTS } from '../data/gst/index';
import { NECO_SUBJECTS } from '../data/neco/index';
import AdSection from './AdSection';
import { useAdsConfig, adsOn } from '../utils/adsConfig';
import { SFX, stopSpeech, getVoicesCached, warmVoices, unlockAudio } from '../utils/sounds';
import BackButton from './BackButton';
import { mapToCharacterVoices, getVoiceForCharacter, getCharacter } from '../utils/voices';
import VoicePicker from './VoicePicker';
import {
  startStudySession,
  endStudySession,
  trackTopicOpened,
  trackTopicComplete,
} from '../analytics/studyAnalytics';
import Icon, { EmojiIcon } from './Icon';
import { normalizeForSpeech } from '../utils/ttsNormalize';
import { wrapWords, unwrapWords, buildChunks, mapIndex, markChunk, clearChunk, keepInView, keepWordInView, resetManualScroll, tapPosition, wordAtPosition } from '../utils/ttsHighlight';

const FONT_SIZES = [13, 15, 17, 19, 21];
const STORAGE_KEY = (examType, subjectId) => `es_learn_${examType}_${subjectId}`;

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

function ContentBlock({ block, examType, email }) {
  if (block.type === 'ad')
    return (
      <AdSection
        slot={block.slot}
        placement="learn"
        examType={examType}
        email={email}
      />
    );

  let html = block.content;
  if (examType === 'jamb') {
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

export default function Learn({ subjectId, onBack, onTopicComplete, examType = 'waec', email, onLimit }) {
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
  const curChunkRef = useRef(null);
  const estTimerRef = useRef(null);
  const sentenceQueueRef = useRef([]);
  const stoppedRef = useRef(true);
  const pauseTimerRef = useRef(null);
  const [adSequence, setAdSequence] = useState(() => Math.floor(Math.random() * 100));

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
    const apply = (raw) => {
      const mapped = mapToCharacterVoices(raw || []);
      if (!mapped.length) return;
      setCharVoices(mapped);
      const firstAvail = mapped.find((c) => c.voice);
      if (firstAvail) setSelectedCharId((cur) => (mapped.find((c) => c.id === cur && c.voice) ? cur : firstAvail.id));
    };
    unlockAudio(); // wakes the speech engine now, so the first sentence is not delayed
    apply(getVoicesCached()); // instant when voices were already warmed at app start
    warmVoices(apply);
    const syn = window.speechSynthesis;
    const onChange = () => apply(getVoicesCached());
    if (syn && syn.addEventListener) syn.addEventListener('voiceschanged', onChange);
    return () => { if (syn && syn.removeEventListener) syn.removeEventListener('voiceschanged', onChange); stopSpeech(); };
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

  const fullStopSpeech = useCallback(() => {
    stoppedRef.current = true;
    sentenceQueueRef.current = [];
    clearTimeout(pauseTimerRef.current);
    clearInterval(estTimerRef.current);
    stopSpeech();
    clearChunk(curChunkRef.current);
    curChunkRef.current = null;
    unwrapWords();
    setSpeaking(false);
    setPaused(false);
  }, []);

  // Speak one chunk of the page, lighting up its words in place as the voice moves along.
  const speakNextSentence = () => {
    if (stoppedRef.current) return;
    clearChunk(curChunkRef.current);
    clearInterval(estTimerRef.current);
    const chunk = sentenceQueueRef.current.shift();
    if (chunk === undefined) {
      fullStopSpeech();
      return;
    }
    curChunkRef.current = chunk;
    const shown = chunk.map((w) => w.text).join(' ');
    const spoken = normalizeForSpeech(shown) || shown;
    markChunk(chunk, 0);
    keepInView(chunk, scrollRef.current);
    const utter = new SpeechSynthesisUtterance(spoken);
    const voice = getVoiceForCharacter(selectedCharId, characterVoices);
    if (voice) utter.voice = voice;
    utter.lang = (voice && voice.lang) || 'en-GB'; // always an English voice: stops phones reading English topics with another language's sounds
    const ch = getCharacter(selectedCharId);
    utter.rate = 0.8 * ch.rate;
    utter.pitch = ch.pitch;
    let gotBoundary = false;
    utter.onboundary = (e) => {
      if (e.name === 'sentence') return;
      gotBoundary = true;
      clearInterval(estTimerRef.current);
      const wi = mapIndex(spoken, e.charIndex || 0, chunk.length);
      markChunk(chunk, wi);
      keepWordInView(chunk[wi] && chunk[wi].el, scrollRef.current);
    };
    // Some phones never report word positions: estimate them from the speaking pace instead.
    utter.onstart = () => {
      const t0 = Date.now();
      clearInterval(estTimerRef.current);
      estTimerRef.current = setInterval(() => {
        if (gotBoundary || stoppedRef.current) { clearInterval(estTimerRef.current); return; }
        if (Date.now() - t0 < 700) return;
        const wi = Math.min(chunk.length - 1, Math.floor((Date.now() - t0 - 300) / 430));
        markChunk(chunk, wi);
        keepWordInView(chunk[wi] && chunk[wi].el, scrollRef.current);
      }, 160);
    };
    const advance = () => {
      clearInterval(estTimerRef.current);
      if (stoppedRef.current) return;
      pauseTimerRef.current = setTimeout(speakNextSentence, 200);
    };
    utter.onend = advance;
    utter.onerror = advance;
    window.speechSynthesis.speak(utter);
  };

  const speakContent = (from) => {
    if (activeIdx === null) return;
    fullStopSpeech();
    const roots = Array.from(document.querySelectorAll('.learn-content-html'));
    if (!roots.length) return;
    const words = wrapWords(roots);
    let chunks = buildChunks(words);
    if (!chunks.length) return;
    // Tapped a word: start from that word (the rest of its sentence, then everything after it)
    if (from && from.offset !== undefined) {
      const wi = wordAtPosition(words, roots, from);
      const target = words[wi];
      const ci = chunks.findIndex((c) => c.includes(target));
      if (ci > 0) chunks = chunks.slice(ci);
      if (ci >= 0) chunks[0] = chunks[0].slice(chunks[0].indexOf(target));
    }
    sentenceQueueRef.current = chunks;
    stoppedRef.current = false; resetManualScroll();
    setSpeaking(true);
    setPaused(false);
    speakNextSentence();
  };

  // Start reading the moment a topic opens (the tap that opened it counts as the user gesture phones need).
  const speakRef = useRef(null);
  speakRef.current = speakContent;
  useEffect(() => {
    if (activeIdx === null) return undefined;
    let tries = 0;
    const tryStart = () => {
      if (document.querySelector('.learn-content-html')) speakRef.current && speakRef.current();
      else if (tries++ < 12) timer = setTimeout(tryStart, 60);
    };
    let timer = setTimeout(tryStart, 30);
    return () => clearTimeout(timer);
  }, [activeIdx]); // eslint-disable-line

  // Tap any sentence of the lesson and the voice carries on from there.
  const onLessonTap = (e) => {
    if (activeIdx === null || quizMode) return;
    if (e.target.closest && e.target.closest('button,a,input,select,textarea,label,.learn-ad,.learn-tts-btn,.learn-quiz-overlay')) return;
    const sel = window.getSelection && window.getSelection();
    if (sel && !sel.isCollapsed) return;
    const roots = Array.from(document.querySelectorAll('.learn-content-html'));
    if (!e.target.closest('.learn-content-html') || !roots.length) return;
    const pos = tapPosition(e, roots);
    if (pos) speakContent(pos);
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
    fullStopSpeech();
  };

  // Free students get a few new topics a day. Reopening one already counted is free.
  const openTopic = async (idx) => {
    const slot = await reserve(email, 'topic', `${examType}:${subjectId}:${topics[idx]?.topic || idx}`);
    if (!slot.allowed) { if (onLimit) onLimit('topics'); return; }
    openTopicNow(idx);
  };

  const openTopicNow = (idx) => {
    fullStopSpeech();
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
    fullStopSpeech();
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
      if (examType === 'jamb') {
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

  const adsCfg = useAdsConfig();
  const learnAds = adsOn(adsCfg, 'app') && adsCfg.app.learn && adsCfg.app.learn.enabled;
  const learnAdEvery = learnAds ? adsCfg.app.learn.everySections : 0;
  const learnAdMax = learnAds ? adsCfg.app.learn.max : 0;
  const topic = activeIdx !== null ? topics[activeIdx] : null;
  // Phone/system back: mirror the on-screen back button (topic -> topic list -> subjects).
  const phoneBackRef = useRef(null);
  phoneBackRef.current = () => {
    if (activeIdx !== null) { closeTopic(); return; }
    endStudySession(email); fullStopSpeech(); onBack();
  };
  useEffect(() => {
    window.__esLearnBack = () => { try { phoneBackRef.current && phoneBackRef.current(); return true; } catch { return false; } };
    return () => { if (window.__esLearnBack) delete window.__esLearnBack; };
  }, []);
  const contentBlocks = topic
    ? injectAds(
        topic.contentHTML || `<p class="learn-p">${topic.content || ''}</p>`,
        learnAdEvery,
        learnAdMax,
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
                fullStopSpeech();
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
              const isLocked = false; // no pass mark: every topic is open
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
              <VoicePicker voices={characterVoices.filter((c) => c.voice)} value={selectedCharId} onChange={setSelectedCharId} />
              {!speaking ? (
                <button className="learn-tts-btn" onClick={() => speakContent()}>
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
                  : quizScore >= 1
                    ? '👍 Well done!'
                    : `📚 Keep going, you will get it!`}
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
                      fullStopSpeech();
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
          onClick={onLessonTap}
          style={{ flex: 1, overflowY: 'auto', padding: '0 0 24px' }}
        >
          <div style={{ padding: '12px 16px 0', fontSize: fSize }}>
            {contentBlocks.map((block, bi) => (
              <ContentBlock
                key={bi}
                block={block}
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
                      fullStopSpeech();
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
                disabled={activeIdx === topics.length - 1}
                style={isDoneNow ? { borderColor: meta.color, color: meta.color } : {}}
              >
                Next →
              </button>
            </div>
            <p className="learn-keyboard-hint">{`⌨️ Arrow keys to navigate · Take the quiz to finish a topic`}</p>
          </div>
        </div>
      )}
    </div>
  );
}
