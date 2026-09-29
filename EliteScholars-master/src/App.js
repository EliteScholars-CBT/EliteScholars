import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';

import { SHEETS_URL } from './utils/constants';

import { verifyProfile, syncProfileToSheet, pullProfileFromSheet } from './utils/profileApi';

import DebugConsole from "./utils/DebugConsole";

import { installGlobalErrorDebugger } from "./utils/debugError";

import Toast from './components/Toast';

import AchievementPopup from './components/AchievementPopup';

import AuthScreen from './components/AuthScreen';

import GameMode from './components/GameMode';

import ExamTypeSelect from './components/ExamTypeSelect';

import UniversitySelect from './components/UniversitySelect';

import Flashcards from './components/Flashcards';

import BottomNav from './components/BottomNav';

import Leaderboard from './components/Leaderboard';

import Challenges from './components/Challenges';

import Shop from './components/Shop';

import FreeLimitGate from './components/FreeLimitGate';

import {

  SHOW_ADS, SHOW_POPOVER_AD, SHARE_GATE_EVERY, ACHIEVEMENTS, XP_REWARDS, REMINDER_TIMES,

} from './utils/constants';

import {

  loadUser, loadStats, saveStats, saveUser,

  loadSubjectPerformance, saveSubjectPerformance,

  loadAchievements, saveAchievements,

  mergeStats, mergeAchievements, mergeSubjectPerformance,

} from './utils/storage';

import {

  trackEvent, trackSessionStart, trackSessionEnd, getDeviceInfo, fmtTimestamp,

} from './analytics/quizAnalytics';

import { flushStudyAnalytics } from './analytics/studyAnalytics';

import { stopSpeech } from './utils/sounds';

import {

  calculateQuizXP, addXP, awardDailyLoginXP, awardTopicXP,

} from './utils/xpManager';

import {

  isPremium, isSessionExpired, startSession, startCooldown,

  canUseTopic, incrementTopicsToday, resetSession, syncPremiumFromServer,

} from './utils/premium';

import { registerSW, requestNotificationPermission, scheduleDailyReminder, listenForSWMessages } from './utils/notifications';

import { applySecurityMeasures } from './utils/security';

import './styles/base.css';

import './styles/components.css';

import './styles/learn.css';

import './styles/quiz.css';

import './styles/result.css';

import './styles/shop.css';

import './styles/ads.css';

import './styles/premium.css';

import './styles/theme.css';

import './styles/auth.css';

import './styles/polish.css';



// Lazy loaded pages/components

const Splash    = lazy(() => import('./components/Splash'));

const Subjects  = lazy(() => import('./components/Subjects'));  // now handles ALL exam types

const Ready     = lazy(() => import('./components/Ready'));

const Quiz      = lazy(() => import('./components/Quiz'));

const Result    = lazy(() => import('./components/Result'));

const Profile   = lazy(() => import('./components/Profile'));

const Learn     = lazy(() => import('./components/Learn')); // still used for learn screen

const ShareGate = lazy(() => import('./components/ShareGate'));

const AdGate    = lazy(() => import('./components/AdGate'));



import appLogo from './assets/elite-scholars-logo.png';



class ErrorBoundary extends React.Component {

  constructor(props) {

    super(props);

    this.state = { hasError: false, error: null };

  }

  static getDerivedStateFromError(error) {

    return { hasError: true, error };

  }

  componentDidCatch(error, info) {

    console.error('App crashed:', error, info);

  }

  render() {

    if (this.state.hasError) {

      return (

        <div style={{ color: 'white', background: '#1B0A47', padding: 24, minHeight: '100vh' }}>

          <h2>Something went wrong</h2>

          <pre style={{ fontSize: 12 }}>{this.state.error?.message}</pre>

          <button onClick={() => this.setState({ hasError: false, error: null })}>

            Retry

          </button>

        </div>

      );

    }

    return this.props.children;

  }

}



const LoadingScreen = () => (

  <div className="loading-screen" style={{ background: 'linear-gradient(160deg, #1B0A47, #7C3AED, #1B0A47)' }}>

    <div className="loading-spinner" />

  </div>

);



// ── Achievement checker ───────────────────────────────────────────────────────

const checkAchievements = (userStats, email, current, showToast, showAch, subjPerf) => {

  const ids = current.map((a) => a?.id).filter(Boolean);

  const newIds = [];

  const add = (id, cond) => { if (!ids.includes(id) && cond) newIds.push(id); };



  add('firstQuiz',      userStats.totalQuizzes >= 1);

  add('fiveQuizzes',    userStats.totalQuizzes >= 5);

  add('tenQuizzes',     userStats.totalQuizzes >= 10);

  add('twentyQuizzes',  userStats.totalQuizzes >= 20);

  add('fiftyQuizzes',   userStats.totalQuizzes >= 50);

  add('perfectScore',   userStats.perfectScores >= 1);

  add('threePerfects',  userStats.perfectScores >= 3);

  add('ninetyPlus',     userStats.ninetyPlusCount >= 1);

  add('streak3',        userStats.streak >= 3);

  add('streak7',        userStats.streak >= 7);

  add('streak30',       userStats.streak >= 30);

  add('speedDemon',     userStats.speedDemonCount >= 1);



  const h = new Date().getHours();

  add('nightOwl',  h >= 22 || h < 1);

  add('earlyBird', h >= 5 && h < 7);



  if (!ids.includes('allSubjects')) {

    const attempted = Object.keys(subjPerf || {}).filter((s) => subjPerf[s]?.total > 0).length;

    if (attempted >= 9) newIds.push('allSubjects');

  }



  const masteryMap = {

    mathematics: 'mathematician', physics: 'physicist', chemistry: 'chemist',

    biology: 'biologist', economics: 'economist', accounting: 'accountant',

    literature: 'literatureLover', government: 'governmentGuru',

    english: 'englishExpert', novel: 'novelReader',

  };

  Object.entries(masteryMap).forEach(([subj, key]) => {

    if (!ids.includes(key) && (subjPerf?.[subj]?.bestScore || 0) >= 80) newIds.push(key);

  });



  if (newIds.length > 0) {

    const objs = newIds.map((id) => ACHIEVEMENTS[id]).filter(Boolean);

    const updated = [...current, ...objs];

    saveAchievements(updated, email);

    objs.forEach((a) => { showToast(`${a.name} unlocked!`, 'achievement'); showAch(a); });

  }

  return newIds;

};



let syncTimer = null;



function debouncedSync(payload, delay = 5000) {

  if (syncTimer) clearTimeout(syncTimer);

  syncTimer = setTimeout(() => {

    syncProfileToSheet(payload);

    syncTimer = null;

  }, delay);

}



// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {

  const [screen, setScreen] = useState('splash');

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [username, setUsername] = useState('');

  const [studentType, setStudentType] = useState('');

  const [selectedExams, setSelectedExams] = useState([]);

  const [subject, setSubject] = useState('english');

  const [score, setScore] = useState(0);

  const [correct, setCorrect] = useState(0);

  const [totalQ, setTotalQ] = useState(0);

  const [sessions, setSessions] = useState(0);

  const [allScores, setAllScores] = useState([]);

  const [bestScore, setBestScore] = useState(0);

  const [roundsPlayed, setRoundsPlayed] = useState(0);

  const [pendingSubject, setPendingSubject] = useState('english');

  const [streak, setStreak] = useState(1);

  const [lastDate, setLastDate] = useState('');

  const [adRefresh, setAdRefresh] = useState(0);

  const [showAdGate, setShowAdGate] = useState(false);

  const [adGateCallback, setAdGateCallback] = useState(null);

  const [totalSessionsForAd, setTSFAd] = useState(0);

  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const [achPopup, setAchPopup] = useState({ show: false, achievement: null });

  const [achievements, setAchievements] = useState([]);

  const [quizTimeLeft, setQuizTimeLeft] = useState(null);

  const [subjPerf, setSubjPerf] = useState({});

  const [examType, setExamType] = useState(null);

  const [selectedUni, setSelectedUni] = useState(null);

  const [sessionStart, setSessionStart] = useState(null);

  const [usedFifty, setUsedFifty] = useState(false);

  const [usedHint, setUsedHint] = useState(false);

  const [learnSubject, setLearnSubject] = useState(null);

  const [questionLog, setQuestionLog] = useState([]);

  const [premiumUser, setPremiumUser] = useState(false);

  const [showLimitGate, setShowLimitGate] = useState(false);

  const [limitReason, setLimitReason] = useState('session');

  const [flashcardSubject, setFlashSub] = useState(null);

  const [paymentModal, setPaymentModal] = useState(null);



  const showToast = (message, type = 'info') => setToast({ show: true, message, type });

  const showAch = (achievement) => setAchPopup({ show: true, achievement });

  const triggerAdRefresh = () => setAdRefresh((p) => p + 1);



  // ── Startup ─────────────────────────────────────────────────────────────────

  useEffect(() => {

    installGlobalErrorDebugger();

    applySecurityMeasures();



    // ── Read payment result from URL ──────────────────────────────────────────

    const params = new URLSearchParams(window.location.search);

    const paymentStatus = params.get('payment');



    if (paymentStatus === 'success') {

      const plan = params.get('plan') || '';

      const expiry = params.get('expiry') || '';

      const name = params.get('name') || '';

      setPaymentModal({ plan, expiry, name });

      // Clean URL so refresh doesn't retrigger

      window.history.replaceState({}, '', window.location.pathname);

    }



    registerSW().then((reg) => {

      if (reg) {

        requestNotificationPermission().then((perm) => {

          if (perm === 'granted') {

            const u = loadUser();

            if (u.name) scheduleDailyReminder(REMINDER_TIMES, u.name);

          }

        });

      }

    });

    const unsub = listenForSWMessages((data) => {

      if (data.type === 'challenge') setScreen('challenges');

    });

    return unsub;

  }, []);



  // ── Session end tracking ─────────────────────────────────────────────────────

  useEffect(() => {

    if (!email || !sessionStart) return;



    const doSync = () => {

      const stats = loadStats(email);

      const ach = loadAchievements(email);

      const subjPrf = loadSubjectPerformance(email);

      const payload = JSON.stringify({

        action: 'syncProfile',

        email,

        stats: JSON.stringify(stats),

        achievements: JSON.stringify(ach),

        subjectPerformance: JSON.stringify(subjPrf),

      });

      try {

        navigator.sendBeacon

          ? navigator.sendBeacon(`${SHEETS_URL}`, new Blob([payload], { type: 'application/json' }))

          : syncProfileToSheet({ email, stats, achievements: ach, subjectPerformance: subjPrf });

      } catch {}

    };



    const handleEnd = () => {

      trackSessionEnd(email, Date.now() - sessionStart);

      flushStudyAnalytics();

      doSync();

    };



    const handleVisibility = () => {

      if (document.visibilityState === 'hidden') {

        trackSessionEnd(email, Date.now() - sessionStart);

        flushStudyAnalytics();

        doSync();

      }

    };



    // Periodic safety-net flush — ensures topic progress / study sessions

    // reach the sheet even during a long, uninterrupted session where the

    // queue never hits MAX_QUEUED and the tab is never hidden.

    const flushInterval = setInterval(() => {

      flushStudyAnalytics();

    }, 60000); // every 60 seconds



    window.addEventListener('beforeunload', handleEnd);

    document.addEventListener('visibilitychange', handleVisibility);



    return () => {

      window.removeEventListener('beforeunload', handleEnd);

      document.removeEventListener('visibilitychange', handleVisibility);

      clearInterval(flushInterval);

    };

  }, [email, sessionStart]);



  // ── Load user data ───────────────────────────────────────────────────────────

  const loadUserData = useCallback((u) => {

    setName(u.name);

    setEmail(u.email || '');

    setUsername(u.username || '');

    setStudentType(u.studentType || '');

    setSelectedExams(u.selectedExams || []);

    setPremiumUser(isPremium(u.email));

    const s = loadStats(u.email);

    if (s.sessions) setSessions(s.sessions);

    if (s.allScores) setAllScores(s.allScores);

    if (s.bestScore) setBestScore(s.bestScore);

    if (s.streak) setStreak(s.streak);

    if (s.lastDate) setLastDate(s.lastDate);

    setSubjPerf(loadSubjectPerformance(u.email));

    setAchievements(loadAchievements(u.email));

    awardDailyLoginXP(u.email, u.name);

    startSession(u.email);

    setSessionStart(Date.now());

    trackSessionStart(u.email, u.name);

  }, []);



  const handleSplash = async () => {

    try {

      const u = loadUser();

      if (u.email && u.passwordHash) {

        // Log in immediately with local data

        loadUserData(u);

        setScreen('examType');



        // Background: verify + pull latest from server

        setTimeout(async () => {

          try {

            const result = await verifyProfile({ email: u.email, passwordHash: u.passwordHash });

            if (result.success) {

              const p = result.profile;



              // ── Sync premium status from server into localStorage ──────────

              if (p.premiumPlan && p.premiumExpiresAt) {

                syncPremiumFromServer(u.email, p.premiumPlan, p.premiumExpiresAt);

                const expiresAt = new Date(p.premiumExpiresAt).getTime();

                if (!isNaN(expiresAt) && Date.now() < expiresAt) {

                  setPremiumUser(true);

                }

              }



              // Keep username in sync with server in case it was changed elsewhere

              if (p.username) setUsername(p.username);



              // Grab local data

              const localStats = loadStats(u.email);

              const localAch = loadAchievements(u.email);

              const localSubjPerf = loadSubjectPerformance(u.email);



              // Merge server + local (instead of blindly overwriting with server)

              const mergedStats = mergeStats(localStats, p.stats || {});

              const mergedAch = mergeAchievements(localAch, p.achievements || []);

              const mergedPerf = mergeSubjectPerformance(localSubjPerf, p.subjectPerformance || {});



              // Save merged locally

              saveStats(mergedStats, u.email);

              saveAchievements(mergedAch, u.email);

              saveSubjectPerformance(mergedPerf, u.email);



              // Update React state silently in the background

              setSessions(mergedStats.sessions || 0);

              setAllScores(mergedStats.allScores || []);

              setBestScore(mergedStats.bestScore || 0);

              setStreak(mergedStats.streak || 1);

              setLastDate(mergedStats.lastDate || '');

              setAchievements(mergedAch);

              setSubjPerf(mergedPerf);



              // Push merged (not stale local) back to server

              syncProfileToSheet({

                email: u.email,

                stats: mergedStats,

                achievements: mergedAch,

                subjectPerformance: mergedPerf,

              });



              localStorage.setItem(`ep_verified_${u.email}`, String(Date.now()));

            }

          } catch {}

        }, 0);

      } else if (u.email && !u.passwordHash) {

        localStorage.removeItem('ep_user');

        setScreen('onboard');

      } else {

        setScreen('onboard');

      }

    } catch {

      setScreen('onboard');

    }

  };



  const handleOnboard = (userData) => {

    const n = userData.name;

    const e = userData.email;

    setName(n);

    setEmail(e);

    setUsername(userData.username || '');

    setStudentType(userData.studentType || '');

    setSelectedExams(userData.selectedExams || []);

    setPremiumUser(isPremium(e));



    // Grab local data

    const localStats = loadStats(e);

    const localAch = loadAchievements(e);

    const localSubjPerf = loadSubjectPerformance(e);



    // Merge server + local instead of picking one side

    const mergedStats = mergeStats(localStats, userData.serverStats || {});

    const mergedAch = mergeAchievements(localAch, userData.serverAchievements || []);

    const mergedPerf = mergeSubjectPerformance(localSubjPerf, userData.serverSubjectPerf || {});



    // Save merged locally

    saveStats(mergedStats, e);

    saveAchievements(mergedAch, e);

    saveSubjectPerformance(mergedPerf, e);



    // Hydrate state from merged data

    if (mergedStats.sessions) setSessions(mergedStats.sessions);

    if (mergedStats.allScores) setAllScores(mergedStats.allScores);

    if (mergedStats.bestScore) setBestScore(mergedStats.bestScore);

    if (mergedStats.streak) setStreak(mergedStats.streak);

    if (mergedStats.lastDate) setLastDate(mergedStats.lastDate);

    setAchievements(mergedAch);

    setSubjPerf(mergedPerf);



    startSession(e);

    setSessionStart(Date.now());

    trackSessionStart(e, n);

    awardDailyLoginXP(e, n);

    saveUser({

      name: n,

      email: e,

      studentType: userData.studentType,

      selectedExams: userData.selectedExams,

      firstName: userData.firstName,

      lastName: userData.lastName,

      passwordHash: userData.passwordHash,

      username: userData.username || '',

    });



    // Push merged to server

    syncProfileToSheet({

      email: e,

      stats: mergedStats,

      achievements: mergedAch,

      subjectPerformance: mergedPerf,

    });



    setScreen('examType');

  };



  // ── Session expiry check ─────────────────────────────────────────────────────

  const checkSessionLimit = useCallback(() => {

    if (!email || premiumUser) return false;

    if (isSessionExpired(email)) {

      startCooldown(email);

      setLimitReason('session');

      setShowLimitGate(true);

      return true;

    }

    return false;

  }, [email, premiumUser]);



  // ── Navigation ───────────────────────────────────────────────────────────────

  const goHome = () => {

    if (SHOW_ADS) triggerAdRefresh();

    stopSpeech();

    setFlashSub(null);

    setExamType(null);

    setSelectedUni(null);

    setScreen('examType');

  };



  const handleExamTypeSelect = (type) => {

    setExamType(type);

    if (type === 'postutme') setScreen('universitySelect');

    else setScreen('subjects');

  };



  // ── CBT start ────────────────────────────────────────────────────────────────

  const startQuiz = (sel) => {

    if (checkSessionLimit()) return;

    if (SHOW_ADS) triggerAdRefresh();

    try {

      const pending = localStorage.getItem(`ep_sharepending_${email}`);

      if (pending && !SHOW_POPOVER_AD) {

        setPendingSubject(sel);

        setScreen('sharegate');

        return;

      }

    } catch {}

    setSubject(sel);

    setScore(0);

    setCorrect(0);

    setTotalQ(0);

    setRoundsPlayed(0);

    setUsedFifty(false);

    setUsedHint(false);

    setQuestionLog([]);

    trackEvent('quiz_start', {

      name,

      email,

      subject: sel,

      examType,

      timestamp2: fmtTimestamp(),

      ...getDeviceInfo(),

    });

    setScreen('ready');

  };



  // ── Learn start ───────────────────────────────────────────────────────────────

  const startLearn = (subjectId) => {

    if (!canUseTopic(email) && !premiumUser) {

      setLimitReason('topics');

      setShowLimitGate(true);

      return;

    }

    setLearnSubject(subjectId);

    setScreen('learn');

  };



  // ── Flashcard start ───────────────────────────────────────────────────────────

  const startFlashcard = (subjectId) => {

    setFlashSub(subjectId);

    setScreen('flashcards');

  };



  // ── Quiz complete ─────────────────────────────────────────────────────────────

  const handleAllDone = (finalRounds) => {

    const pct = totalQ ? Math.round((correct / totalQ) * 100) : 0;

    const xp = calculateQuizXP(correct, totalQ, quizTimeLeft || 0, streak, usedFifty, usedHint);

    if (email && name && xp > 0) addXP(email, name, xp, 'quiz_complete');



    const ns = sessions + 1;

    const nsc = [...allScores, pct];

    const nb = Math.max(bestScore, score);

    const today = new Date().toDateString();

    const yst = new Date(Date.now() - 86400000).toDateString();

    const newStreak = !lastDate

      ? 1

      : lastDate === today

        ? streak

        : lastDate === yst

          ? streak + 1

          : 1;



    const perf = subjPerf[subject] || { bestScore: 0, averageScore: 0, total: 0, scores: [] };

    const newScores = [...(perf.scores || []), pct];

    const newBest = Math.max(perf.bestScore || 0, pct);

    const newAvg = newScores.reduce((a, b) => a + b, 0) / newScores.length;

    const newPerf = {

      ...subjPerf,

      [subject]: {

        bestScore: newBest,

        averageScore: newAvg,

        total: (perf.total || 0) + 1,

        scores: newScores,

      },

    };

    setSubjPerf(newPerf);

    saveSubjectPerformance(newPerf, email);



    setSessions(ns);

    setAllScores(nsc);

    setBestScore(nb);

    setStreak(newStreak);

    setLastDate(today);

    saveStats(

      { sessions: ns, allScores: nsc, bestScore: nb, streak: newStreak, lastDate: today },

      email

    );



    debouncedSync({

      email,

      stats: { sessions: ns, allScores: nsc, bestScore: nb, streak: newStreak, lastDate: today },

      achievements,

      subjectPerformance: newPerf,

    });



    const perfectScores = allScores.filter((s) => s === 100).length + (pct === 100 ? 1 : 0);

    const ninetyPlusCount = allScores.filter((s) => s >= 90).length + (pct >= 90 ? 1 : 0);

    checkAchievements(

      {

        totalQuizzes: ns,

        perfectScores,

        ninetyPlusCount,

        streak: newStreak,

        speedDemonCount: (quizTimeLeft || 0) > 10 ? 1 : 0,

      },

      email,

      achievements,

      showToast,

      showAch,

      newPerf

    );



    if (ns % SHARE_GATE_EVERY === 0 && !SHOW_POPOVER_AD) {

      try {

        localStorage.setItem(`ep_sharepending_${email}`, ns.toString());

      } catch {}

    }



    if (pct === 100) showToast('Perfect score! 🎯', 'success');

    else if (pct >= 90) showToast(`Excellent! ${pct}% ⭐`, 'success');

    else if (pct >= 70) showToast(`Good job! ${pct}% 📈`, 'success');

    else if (pct >= 50) showToast(`Keep going! ${pct}% 💪`, 'info');

    else showToast('Review the explanations and try again! 📚', 'warning');



    trackEvent('quiz_complete', {

      name,

      email,

      subject,

      score,

      correct,

      totalQ,

      pct: pct + '%',

      rounds: finalRounds,

      ns,

      xpEarned: xp,

      examType,

      timestamp2: fmtTimestamp(),

    });

    setRoundsPlayed(finalRounds);

    setScreen('result');

  };



  const handleNavigate = (newScreen) => {

    if (SHOW_ADS) triggerAdRefresh();

    stopSpeech();

    if (newScreen === 'subjects') setScreen('examType');

    else setScreen(newScreen);

  };



  const handlePremiumActivated = () => {

    setPremiumUser(true);

    resetSession(email);

    setShowLimitGate(false);

    showToast('⭐ Premium activated! Enjoy unlimited access.', 'success');

    const updated = [...achievements, ACHIEVEMENTS.premiumMember].filter(

      (a, i, arr) => arr.findIndex((x) => x?.id === a?.id) === i

    );

    setAchievements(updated);

    saveAchievements(updated, email);

    showAch(ACHIEVEMENTS.premiumMember);

  };



  const NAV_SCREENS = new Set([

    'subjects',

    'leaderboard',

    'challenges',

    'profile',

    'shop',

    'universitySelect',

    'examType',

  ]);

  const showBottomNav = name && email && NAV_SCREENS.has(screen);



  return (

    <>

      {/* <DebugConsole /> */}

      <div className="phone">

        <div className="phone-content">

          <ErrorBoundary>

            <Suspense fallback={<LoadingScreen />}>

              {screen === 'splash' && <Splash onDone={handleSplash} />}



              {screen === 'onboard' && <AuthScreen onDone={handleOnboard} />}



              {screen === 'examType' && (

                <ExamTypeSelect

                  onSelectExam={handleExamTypeSelect}

                  onBack={() => {

                    if (window.confirm('Log out of EliteScholars?')) {

                      localStorage.removeItem('ep_user');

                      setName('');

                      setEmail('');

                      setUsername('');

                      setScreen('onboard');

                    }

                  }}

                />

              )}



              {screen === 'universitySelect' && (

                <UniversitySelect

                  onSelectUniversity={(u) => {

                    setSelectedUni(u);

                    setScreen('subjects');

                  }}

                  onBack={() => setScreen('examType')}

                />

              )}



              {/* ── Unified subjects screen — handles ALL exam types ── */}

              {screen === 'subjects' && (

                <Subjects

                  name={name}

                  examType={examType}

                  university={selectedUni}

                  email={email}

                  premiumUser={premiumUser}

                  refreshTrigger={adRefresh}

                  onStartCBT={startQuiz}

                  onStartLearn={startLearn}

                  onStartFlashcard={startFlashcard}

                  onStartGame={() => setScreen('game')}

                  onProfile={() => setScreen('profile')}

                  onBack={examType === 'postutme' ? () => setScreen('universitySelect') : null}

                />

              )}



              {/* ── Flashcards ── */}

              {screen === 'flashcards' && (

                <Flashcards subjectId={flashcardSubject} onBack={() => setScreen('subjects')} />

              )}



              {/* ── Learn mode ── */}

              {screen === 'learn' && (

                <Learn

                  subjectId={learnSubject}

                  onBack={() => setScreen('subjects')}

                  examType={examType}

                  email={email}

                  onTopicComplete={() => {

                    incrementTopicsToday(email);

                    awardTopicXP(email, name);

                    showToast('Topic completed! +75 XP 📖', 'success');



                    let updatedAch = achievements;

                    if (!achievements.some((a) => a?.id === 'learnMode')) {

                      updatedAch = [...achievements, ACHIEVEMENTS.learnMode];

                      setAchievements(updatedAch);

                      saveAchievements(updatedAch, email);

                      showAch(ACHIEVEMENTS.learnMode);

                    }



                    debouncedSync({

                      email,

                      stats: { sessions, allScores, bestScore, streak, lastDate },

                      achievements: updatedAch,

                      subjectPerformance: subjPerf,

                    });



                    if (!canUseTopic(email) && !premiumUser) {

                      setLimitReason('topics');

                      setShowLimitGate(true);

                    }

                  }}

                />

              )}



              {screen === 'leaderboard' && <Leaderboard userEmail={email} userName={name} />}

              {screen === 'challenges' && (

                <Challenges userEmail={email} userName={name} userUsername={username} />

              )}



              {screen === 'shop' && (

                <Shop

                  userEmail={email}

                  name={name}

                  premiumUser={premiumUser}

                  onPremiumActivated={handlePremiumActivated}

                />

              )}



              {screen === 'profile' && (

                <Profile

                  name={name}

                  email={email}

                  sessions={sessions}

                  streak={streak}

                  allScores={allScores}

                  bestScore={bestScore}

                  premiumUser={premiumUser}

                  onPremiumActivated={handlePremiumActivated}

                  onBack={() => setScreen('subjects')}

                  onSignOut={() => {

                    stopSpeech();

                    // Sync before clearing

                    const stats = loadStats(email);

                    const ach = loadAchievements(email);

                    const subjPrf = loadSubjectPerformance(email);

                    syncProfileToSheet({

                      email,

                      stats,

                      achievements: ach,

                      subjectPerformance: subjPrf,

                    });

                    localStorage.removeItem('ep_user');

                    setName('');

                    setEmail('');

                    setUsername('');

                    setSessions(0);

                    setAllScores([]);

                    setBestScore(0);

                    setStreak(1);

                    setLastDate('');

                    setPremiumUser(false);

                    setScreen('onboard');

                  }}

                />

              )}



              {screen === 'sharegate' && (

                <ShareGate

                  name={name}

                  email={email}

                  onUnlocked={() => {

                    setSubject(pendingSubject);

                    setScore(0);

                    setCorrect(0);

                    setTotalQ(0);

                    setUsedFifty(false);

                    setUsedHint(false);

                    setQuestionLog([]);

                    trackEvent('quiz_start', {

                      name,

                      email,

                      subject: pendingSubject,

                      examType,

                      timestamp2: fmtTimestamp(),

                      ...getDeviceInfo(),

                    });

                    setScreen('ready');

                  }}

                />

              )}



              {screen === 'adgate' && (

                <AdGate

                  name={name}

                  email={email}

                  totalSessions={totalSessionsForAd}

                  onUnlocked={() => {

                    setShowAdGate(false);

                    if (adGateCallback) {

                      adGateCallback();

                      setAdGateCallback(null);

                    }

                  }}

                />

              )}



              {screen === 'ready' && (

                <Ready subjectId={subject} onGo={() => setScreen('quiz')} onBack={goHome} />

              )}



              {screen === 'quiz' && (

                <Quiz

                  subjectId={subject}

                  onAllDone={handleAllDone}

                  setQuizTimeRemaining={setQuizTimeLeft}

                  score={score}

                  setScore={setScore}

                  correct={correct}

                  setCorrect={setCorrect}

                  totalQ={totalQ}

                  setTotalQ={setTotalQ}

                  onHome={goHome}

                  triggerAdRefresh={triggerAdRefresh}

                  adRefresh={adRefresh}

                  email={email}

                  name={name}

                  examType={examType}

                  onFiftyUsed={setUsedFifty}

                  onHintUsed={setUsedHint}

                  onLogQuestion={(entry) => setQuestionLog((l) => [...l, entry])}

                />

              )}



              {screen === 'game' && (

                <GameMode onBack={() => setScreen('subjects')} email={email} name={name} />

              )}



              {screen === 'result' && (

                <Result

                  name={name}

                  subjectId={subject}

                  score={score}

                  correct={correct}

                  totalQ={totalQ}

                  totalSessions={sessions}

                  onHome={goHome}

                  onProfile={() => setScreen('profile')}

                  onAdGateComplete={(cb) => {

                    setTSFAd(sessions + 1);

                    setAdGateCallback(() => cb);

                    setShowAdGate(true);

                  }}

                  questionLog={questionLog}

                  userEmail={email}

                  studentType={studentType}

                  selectedExams={selectedExams}

                />

              )}

            </Suspense>

          </ErrorBoundary>

        </div>

      </div>



      {showBottomNav && (

        <BottomNav currentScreen={screen} onNavigate={handleNavigate} userEmail={email} />

      )}



      {showLimitGate && (

        <FreeLimitGate

          email={email}

          name={name}

          reason={limitReason}

          onClose={() => setShowLimitGate(false)}

          onPremiumActivated={handlePremiumActivated}

        />

      )}



      {toast.show && (

        <Toast

          message={toast.message}

          type={toast.type}

          onClose={() => setToast({ show: false, message: '', type: 'info' })}

        />

      )}

      {achPopup.show && achPopup.achievement && (

        <AchievementPopup

          achievement={achPopup.achievement}

          onClose={() => setAchPopup({ show: false, achievement: null })}

        />

      )}



      {paymentModal && (

        <div

          style={{

            position: 'fixed',

            inset: 0,

            background: 'rgba(0,0,0,0.85)',

            zIndex: 999998,

            display: 'flex',

            alignItems: 'center',

            justifyContent: 'center',

            padding: 20,

          }}

        >

          <div

            style={{

              background: 'linear-gradient(160deg,#1B0A47,#2a0050)',

              border: '1px solid #7C3AED',

              borderRadius: 20,

              padding: '40px 32px',

              maxWidth: 360,

              width: '100%',

              textAlign: 'center',

              fontFamily: 'inherit',

            }}

          >

            <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>

            <h2 style={{ color: '#fff', fontSize: 22, margin: '0 0 8px' }}>You're Premium!</h2>

            <p style={{ color: '#9090b0', fontSize: 14, margin: '0 0 24px', lineHeight: 1.6 }}>

              Hey {paymentModal.name || name} 👋 Your{' '}

              <strong style={{ color: '#c8b4f0' }}>

                {paymentModal.plan === 'annual'

                  ? 'Premium Annual'

                  : paymentModal.plan === 'pro'

                    ? 'Pro Monthly'

                    : 'Premium Monthly'}

              </strong>{' '}

              plan is now active. Go crush those exams! 🚀

            </p>



            {paymentModal.expiry && (

              <div

                style={{

                  background: 'rgba(255,189,46,0.08)',

                  border: '1px solid rgba(255,189,46,0.25)',

                  borderRadius: 10,

                  padding: '12px 16px',

                  marginBottom: 24,

                }}

              >

                <p style={{ margin: 0, color: '#ffbd2e', fontSize: 12 }}>

                  ⏳ Expires:{' '}

                  {new Date(paymentModal.expiry).toLocaleDateString('en-GB', {

                    day: 'numeric',

                    month: 'long',

                    year: 'numeric',

                  })}

                </p>

              </div>

            )}



            <button

              onClick={() => {

                setPaymentModal(null);

                handlePremiumActivated();

              }}

              style={{

                width: '100%',

                padding: '14px 0',

                background: 'linear-gradient(135deg,#7C3AED,#7B2FBE)',

                border: 'none',

                borderRadius: 10,

                color: '#fff',

                fontSize: 16,

                fontWeight: 700,

                cursor: 'pointer',

              }}

            >

              Start Studying

            </button>

          </div>

        </div>

      )}

    </>

  );

}