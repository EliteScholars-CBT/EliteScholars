import PremiumModal from './PremiumModal';
import { getPremiumData, cancelPremium } from '../utils/premium';
import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid,
} from 'recharts';
import { DPURP, PURPLE, BG, WHITE, GRAY, GOLD, LGOLD } from '../utils/colors';
import { ROUND_SIZE, ACHIEVEMENTS } from '../utils/constants';
import { loadAchievements, loadSubjectPerformance } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import { updateGuardianEmail, fetchGuardianEmail } from '../utils/profileApi';
import { EmojiIcon } from './Icon';

export default function Profile({
  name,
  email,
  sessions,
  streak,
  allScores,
  bestScore,
  onBack,
  onSignOut,
  premiumUser = false,
  onPremiumActivated,
}) {
  const [activeTab, setActiveTab]                   = useState('stats');
  const [achievements, setAchievements]             = useState([]);
  const [allAchievements, setAllAchievements]       = useState([]);
  const [subjectPerformance, setSubjectPerformance] = useState({});
  const [performanceData, setPerformanceData]       = useState([]);
  const [subjectChartData, setSubjectChartData]     = useState([]);
  const [showPremiumModal, setShowPremiumModal]     = useState(false);
  const [localPremium, setLocalPremium]             = useState(premiumUser);
  const premData = getPremiumData(email);
  const { theme, toggleTheme } = useTheme();
  const tabsContainerRef = useRef(null);

  // Guardian state
  const [guardianEmail, setGuardianEmail]   = useState('');
  const [guardianInput, setGuardianInput]   = useState('');
  const [guardianSaving, setGuardianSaving] = useState(false);
  const [guardianSaved, setGuardianSaved]   = useState(false);
  const [guardianError, setGuardianError]   = useState('');

  const initials = name ? name.slice(0, 2).toUpperCase() : 'ME';
  const avg = allScores.length
    ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
    : 0;
  const rank =
    bestScore >= 38 ? '🏆 Elite Scholar' :
    bestScore >= 30 ? '⭐ Rising Star'   :
    bestScore >= 20 ? '📚 Sharp Guy'     : '🌱 Beginner';

  // Scroll to active tab
  useEffect(() => {
    if (tabsContainerRef.current) {
      const el = tabsContainerRef.current.querySelector('.profile-tab.active');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  // Load achievements + subject performance
  useEffect(() => {
    const userAchievements = loadAchievements(email);

    // IDs the user has earned
    const earnedIds = new Set(
      userAchievements.map((a) => (typeof a === 'string' ? a : a?.id)).filter(Boolean)
    );

    // Build full list: all achievements, marking earned vs locked
    // SORTED: earned first (true comes before false)
    const full = Object.values(ACHIEVEMENTS).map((a) => ({
      ...a,
      earned: earnedIds.has(a.id),
    })).sort((a, b) => {
      // Sort by earned status: earned (true) first, then locked (false)
      if (a.earned === b.earned) return 0;
      return a.earned ? -1 : 1;
    });

    // Earned count for tab label
    const earned = full.filter((a) => a.earned);
    setAchievements(earned);
    setAllAchievements(full);

    const perf = loadSubjectPerformance(email);
    setSubjectPerformance(perf);

    const timer = setTimeout(() => {
      const lastTenScores = allScores.slice(-10);
      setPerformanceData(lastTenScores.map((score, index) => ({ quiz: index + 1, score })));
      setSubjectChartData(
        Object.keys(perf)
          .filter((sub) => (perf[sub]?.total || 0) > 0)
          .map((sub) => {
            const perfData = perf[sub];
            const label    = sub.replace(/_/g, ' ');
            return {
              subject:      label.charAt(0).toUpperCase() + label.slice(1),
              bestScore:    perfData.bestScore || 0,
              averageScore: Math.round(perfData.averageScore || 0),
              attempts:     perfData.total || 0,
            };
          })
          .sort((a, b) => b.attempts - a.attempts)
      );
    }, 50);

    return () => clearTimeout(timer);
  }, [email, allScores]);

  // Load guardian email for premium users
  useEffect(() => {
    if (!email || !localPremium) return;
    fetchGuardianEmail(email).then(result => {
      if (result?.profile?.guardianEmail) {
        setGuardianEmail(result.profile.guardianEmail);
        setGuardianInput(result.profile.guardianEmail);
      }
    });
  }, [email, localPremium]);

  const handleSaveGuardian = async () => {
    const val = guardianInput.trim().toLowerCase();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setGuardianError('Enter a valid email address.');
      return;
    }
    if (val === email.toLowerCase()) {
      setGuardianError('Cannot use your own email.');
      return;
    }
    setGuardianSaving(true);
    setGuardianError('');
    const result = await updateGuardianEmail({ email, guardianEmail: val });
    setGuardianSaving(false);
    if (result?.success) {
      setGuardianEmail(val);
      setGuardianSaved(true);
      setTimeout(() => setGuardianSaved(false), 3000);
    } else {
      setGuardianError(result?.error || 'Failed to save. Try again.');
    }
  };

  return (
    <>
      <div className="scr fd profile-page">
        <div
          className="profile-header"
          style={{ background: `linear-gradient(135deg,${DPURP},${PURPLE})` }}
        >
          <div style={{
            position: 'absolute', bottom: -20, left: 0, right: 0,
            height: 40, background: BG, borderRadius: '24px 24px 0 0',
          }} />
          <div className="profile-back" onClick={onBack}>← Back</div>
          <div className="profile-avatar">{initials}</div>
          <div className="profile-name">{name || 'Student'}</div>
          <div className="profile-email">{email}</div>
          <div className="profile-badges">
            <div className="profile-streak-badge">
              🔥 {streak} Day{streak !== 1 ? 's' : ''} Streak
            </div>
            <div className="profile-rank-badge">{rank}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs-wrapper">
          <div className="profile-tabs-scroll" ref={tabsContainerRef}>
            {[
              ['stats',        '📊 Stats'],
              ['subjects',     '📚 Subjects'],
              ['achievements', `🏆 Achievements (${achievements.length})`],
              ['settings',     '⚙️ Settings'],
            ].map(([id, label]) => (
              <button
                key={id}
                className={`profile-tab ${activeTab === id ? 'active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="profile-content-area">

          {/* ── STATS TAB ── */}
          {activeTab === 'stats' && (
            <div className="profile-stats-section">
              <div className="profile-stats-title">Your Stats</div>
              <div className="profile-stats-grid">
                {[
                  ['Quizzes Done', sessions || 0],
                  ['Avg Score',    avg + '%'],
                  ['Best Score',   bestScore + '/' + ROUND_SIZE],
                  ['Streak',       streak + ' days'],
                ].map(([l, v]) => (
                  <div key={l} className="profile-stat-card">
                    <div className="profile-stat-value">{v}</div>
                    <div className="profile-stat-label">{l}</div>
                  </div>
                ))}
              </div>

              {performanceData.length > 0 && (
                <div className="profile-chart-section">
                  <div className="profile-stats-title"><EmojiIcon emoji="📈" size="1.15em" /> Performance Trend</div>
                  <div className="profile-chart-container">
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={performanceData}>
                        <XAxis dataKey="quiz" stroke="#6B7280" fontSize={10} />
                        <YAxis
                          domain={[0, 100]} stroke="#6B7280" fontSize={10}
                          tickFormatter={(v) => `${v}%`}
                        />
                        <Tooltip
                          contentStyle={{ background: '#1B0A47', border: '1px solid #7C3AED', borderRadius: 8 }}
                          labelStyle={{ color: '#FFC53D' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Line
                          type="monotone" dataKey="score" stroke="#FFC53D"
                          strokeWidth={2} dot={{ fill: '#FFC53D', r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── SUBJECTS TAB ── */}
          {activeTab === 'subjects' && (
            <div className="profile-stats-section">
              <div className="profile-stats-title">Subject Performance</div>
              {subjectChartData.length > 0 ? (
                <>
                  <div className="profile-chart-section">
                    <div className="profile-chart-container">
                      <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={subjectChartData} layout="vertical" margin={{ left: 10, right: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis type="number" domain={[0, 100]} stroke="#6B7280" fontSize={9} tickFormatter={(v) => `${v}%`} />
                          <YAxis type="category" dataKey="subject" stroke="#6B7280" fontSize={9} width={70} />
                          <Tooltip
                            contentStyle={{ background: '#1B0A47', border: '1px solid #7C3AED', borderRadius: 8 }}
                            labelStyle={{ color: '#FFC53D' }}
                            itemStyle={{ color: '#fff' }}
                          />
                          <Bar dataKey="bestScore"    fill="#FFC53D" name="Best Score" radius={[0,4,4,0]} />
                          <Bar dataKey="averageScore" fill="#8B5CF6" name="Avg Score"  radius={[0,4,4,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  {subjectChartData.map((s) => (
                    <div key={s.subject} className="profile-stat-card" style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{s.subject}</div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                        {s.attempts} attempt{s.attempts !== 1 ? 's' : ''} · Best: {s.bestScore}% · Avg: {s.averageScore}%
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="profile-empty-state">
                  <div className="profile-empty-icon"><EmojiIcon emoji="📚" size="1.1em" /></div>
                  <div className="profile-empty-text">No subject data yet. Complete some quizzes!</div>
                </div>
              )}
            </div>
          )}

          {/* ── ACHIEVEMENTS TAB ── */}
          {activeTab === 'achievements' && (
            <div className="profile-stats-section">
              <div className="profile-stats-title">
                🏆 Achievements ({achievements.length}/{allAchievements.length})
              </div>
              {allAchievements.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {allAchievements.map((a) => (
                    <div key={a.id} className={`achievement-card${a.earned ? '' : ' locked'}`}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>
                        {a.earned ? a.icon : '🔒'}
                      </div>
                      <div className="achievement-card-name">
                        {a.earned ? a.name : '???'}
                      </div>
                      <div className="achievement-card-desc">
                        {a.earned ? a.desc : a.desc}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="profile-empty-state">
                  <div className="profile-empty-icon"><EmojiIcon emoji="🏆" size="1.1em" /></div>
                  <div className="profile-empty-text">No achievements yet. Keep practising!</div>
                </div>
              )}
            </div>
          )}
          {/* ── SETTINGS TAB ── */}
          {activeTab === 'settings' && (
            <div className="profile-stats-section">

              <div className="profile-stats-title"><EmojiIcon emoji="⚙️" size="1.15em" /> Appearance</div>
              <div className="settings-card" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
                <div className="settings-item">
                  <div className="settings-icon">{theme === 'light' ? '🌙' : '☀️'}</div>
                  <div className="settings-info">
                    <div className="settings-name">Dark Mode</div>
                    <div className="settings-desc">Switch between light and dark theme</div>
                  </div>
                  <div className="settings-toggle">
                    <div className={`toggle-switch ${theme === 'dark' ? 'active' : ''}`}>
                      <div className="toggle-slider" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Guardian / Parent Email ── */}
              <div className="profile-stats-title" style={{ marginTop: 20 }}>
                👨‍👩‍👧 Parent / Guardian
              </div>

              {!localPremium ? (
                <div className="settings-card guardian-card" style={{ opacity: 0.65 }}>
                  <div className="settings-item">
                    <div className="settings-icon"><EmojiIcon emoji="🔒" size="1.1em" /></div>
                    <div className="settings-info">
                      <div className="settings-name">Guardian Weekly Report</div>
                      <div className="settings-desc">
                        Upgrade to Premium to add a parent or guardian. They'll receive a weekly academic report card every Sunday.
                      </div>
                    </div>
                    <div className="guardian-locked-badge">PRO</div>
                  </div>
                </div>
              ) : (
                <div className="settings-card guardian-card">
                  <div className="settings-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="settings-icon"><EmojiIcon emoji="📧" size="1.1em" /></div>
                      <div className="settings-info">
                        <div className="settings-name">Guardian Weekly Report</div>
                        <div className="settings-desc">
                          Your guardian receives a report card every Sunday at 6AM covering your week's activity.
                        </div>
                      </div>
                    </div>
                    <div className="guardian-input-row">
                      <input
                        type="email"
                        placeholder="guardian@email.com"
                        value={guardianInput}
                        onChange={e => {
                          setGuardianInput(e.target.value);
                          setGuardianSaved(false);
                          setGuardianError('');
                        }}
                        className={`guardian-input ${guardianError ? 'error' : guardianSaved ? 'saved' : ''}`}
                      />
                      <button
                        onClick={handleSaveGuardian}
                        disabled={guardianSaving || guardianInput.trim() === guardianEmail}
                        className={`guardian-save-btn ${guardianSaved ? 'saved' : ''}`}
                      >
                        {guardianSaving ? '...' : guardianSaved ? '✓ Saved' : 'Save'}
                      </button>
                    </div>
                    {guardianError && (
                      <div className="guardian-error-text">{guardianError}</div>
                    )}
                    {guardianEmail && !guardianError && (
                      <div className="guardian-success-text">
                        ✓ Reports sending to {guardianEmail} every Sunday
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="profile-stats-title" style={{ marginTop: 20 }}>
                ℹ️ Information
              </div>

              <div className="settings-card about-settings-card" style={{ cursor: 'pointer' }}>
                <div className="settings-item">
                  <div className="settings-icon"><EmojiIcon emoji="🎓" size="1.1em" /></div>
                  <div className="settings-info">
                    <div className="settings-name">About EliteScholars CBT</div>
                    <div className="settings-desc">Learn about our mission and features</div>
                  </div>
                  <div className="settings-arrow">→</div>
                </div>
              </div>

              <div className="settings-card terms-settings-card" style={{ cursor: 'pointer' }}>
                <div className="settings-item">
                  <div className="settings-icon">📜</div>
                  <div className="settings-info">
                    <div className="settings-name">Terms of Service</div>
                    <div className="settings-desc">Rules and guidelines for using EliteScholars</div>
                  </div>
                  <div className="settings-arrow">→</div>
                </div>
              </div>

              <div className="settings-card privacy-settings-card" style={{ cursor: 'pointer' }}>
                <div className="settings-item">
                  <div className="settings-icon"><EmojiIcon emoji="🔒" size="1.1em" /></div>
                  <div className="settings-info">
                    <div className="settings-name">Privacy Policy</div>
                    <div className="settings-desc">How we protect your data and privacy</div>
                  </div>
                  <div className="settings-arrow">→</div>
                </div>
              </div>

              <div
                className="settings-card"
                onClick={() => window.open('/blog/', '_blank')}
                style={{ cursor: 'pointer' }}
              >
                <div className="settings-item">
                  <div className="settings-icon">✍️</div>
                  <div className="settings-info">
                    <div className="settings-name">EliteScholars Blog</div>
                    <div className="settings-desc">Study tips, JAMB updates and exam guides</div>
                  </div>
                  <div className="settings-arrow">→</div>
                </div>
              </div>

              <div className="settings-card guardian-card">
                <div className="settings-item">
                  <div className="settings-icon"><EmojiIcon emoji="📧" size="1.1em" /></div>
                  <div className="settings-info">
                    <div className="settings-name">Contact Support</div>
                    <div className="settings-desc">elitescholars.site@gmail.com</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ── Premium / Upgrade section ── */}
          <div style={{ margin: '20px 0 8px' }}>
            {localPremium ? (
              <div className="premium-active-box">
                <div className="premium-badge"><EmojiIcon emoji="⭐" size="1.15em" /> Premium Active</div>
                <div className="premium-active-title" style={{ marginTop: 8 }}>
                  {premData?.plan === 'annual' ? '👑 Annual Plan' : '💎 Monthly Plan'}
                </div>
                {premData?.expiresDateStr && (
                  <div className="premium-active-expiry">Expires: {premData.expiresDateStr}</div>
                )}
              </div>
            ) : (
              <button
                className="premium-cta-btn"
                style={{ width: '100%', marginBottom: 12 }}
                onClick={() => setShowPremiumModal(true)}
              >
                ⭐ Upgrade to Premium
              </button>
            )}

            <button
              className="profile-signout-btn"
              style={{ width: '100%', display: 'block', textAlign: 'center', cursor: 'pointer' }}
              onClick={onSignOut}
            >
              🚪 Sign Out
            </button>
          </div>

        </div>
      </div>

      {showPremiumModal && (
        <PremiumModal
          email={email}
          onClose={() => setShowPremiumModal(false)}
          onActivated={() => {
            setLocalPremium(true);
            setShowPremiumModal(false);
            if (onPremiumActivated) onPremiumActivated();
          }}
        />
      )}
    </>
  );
}