// ============================================================================
// AuthScreen.js
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/elite-scholars-logo.png';

import {
  registerProfile,
  loginProfile,
  requestPasswordReset,
  confirmPasswordReset,
  checkUsernameAvailable,
} from '../utils/profileApi';

import { logSessionToSheet } from '../utils/auth';
import { saveUser } from '../utils/storage';

const EXAM_TYPES = [
  { id: 'jamb', label: 'JAMB UTME', icon: '📝' },
  { id: 'waec', label: 'WAEC', icon: '📋' },
  { id: 'neco', label: 'NECO', icon: '📄' },
  { id: 'postutme', label: 'POST UTME', icon: '🎓' },
  { id: 'gst', label: 'GST (Uni)', icon: '🏛️' },
];

const STUDENT_TYPES = [
  {
    id: 'senior_school',
    label: 'Senior School Student',
    desc: 'SS1 – SS3 • WAEC • NECO • GCE',
    icon: '🏫',
  },
  { id: 'aspirant', label: 'Aspirant', desc: 'Preparing for JAMB & Post-UTME', icon: '🎯' },
  {
    id: 'university',
    label: 'University Student',
    desc: '100L – 500L • GST / GNS Courses',
    icon: '🎓',
  },
];

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;

function validate(fields) {
  if (fields.firstName !== undefined && !fields.firstName.trim()) return 'Enter your first name.';
  if (fields.lastName !== undefined && !fields.lastName.trim()) return 'Enter your last name.';
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    return 'Enter a valid email address.';
  if (fields.password !== undefined && fields.password.length < 8)
    return 'Password must be at least 8 characters.';
  if (fields.confirm !== undefined && fields.password !== fields.confirm)
    return 'Passwords do not match.';
  if (fields.username !== undefined) {
    if (!fields.username.trim()) return 'Choose a username.';
    if (!USERNAME_REGEX.test(fields.username.trim()))
      return 'Username must be 3-20 characters, start with a letter, and contain only letters, numbers, or underscores.';
  }
  if (fields.studentType !== undefined && !fields.studentType) return 'Select your student type.';
  if (fields.selectedExams !== undefined && fields.selectedExams.length === 0)
    return 'Select at least one exam.';
  return null;
}

function getNetworkError(e) {
  if (!navigator.onLine) return 'No internet connection. Please check your network and try again.';
  if (e?.message === 'Failed to fetch' || e?.message?.includes('fetch') || e?.name === 'TypeError')
    return 'Network error. Please check your connection and try again.';
  return e?.message || 'Something went wrong. Please try again.';
}

export default function AuthScreen({ onDone }) {
  const [view, setView] = useState('login');
  const [step, setStep] = useState(1);
  const [resetStep, setResetStep] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [studentType, setStudentType] = useState('');
  const [selectedExams, setSelectedExams] = useState([]);
  const [username, setUsername] = useState('');

  const [usernameStatus, setUsernameStatus] = useState('idle');
  const usernameCheckTimer = useRef(null);

  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPw, setNewPw] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const err = (msg) => {
    console.warn('⚠️ [AuthScreen] Error shown to user:', msg);
    setError(msg);
    setLoading(false);
  };
  const clear = () => {
    setError('');
    setSuccess('');
  };
  const switchView = (v) => {
    clear();
    setView(v);
    setStep(1);
    setResetStep(1);
  };
  const toggleExam = (id) =>
    setSelectedExams((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));

  // ── Username live availability check ─────────────────────────────────────
  const handleUsernameChange = (value) => {
    const cleaned = value.replace(/\s/g, '');
    setUsername(cleaned);

    if (usernameCheckTimer.current) clearTimeout(usernameCheckTimer.current);

    if (!cleaned) {
      setUsernameStatus('idle');
      return;
    }
    if (!USERNAME_REGEX.test(cleaned)) {
      setUsernameStatus('invalid');
      return;
    }

    setUsernameStatus('checking');
    usernameCheckTimer.current = setTimeout(async () => {
      try {
        console.log('🔍 [AuthScreen] Checking username availability:', cleaned);
        const result = await checkUsernameAvailable(cleaned);
        console.log('🔍 [AuthScreen] Username check result:', result);
        if (result?.error && result.error !== 'INVALID_JSON_RESPONSE') {
          setUsernameStatus('invalid');
        } else if (result?.error === 'INVALID_JSON_RESPONSE') {
          // Can't check — assume available and let backend validate on submit
          console.warn(
            '⚠️ Username check got invalid JSON — assuming available, backend will validate'
          );
          setUsernameStatus('available');
        } else {
          setUsernameStatus(result?.available ? 'available' : 'taken');
        }
      } catch (e2) {
        console.warn('⚠️ [AuthScreen] Username check failed:', e2.message);
        setUsernameStatus('idle');
      }
    }, 500);
  };

  const usernameHint = () => {
    switch (usernameStatus) {
      case 'checking':
        return { text: 'Checking availability…', cls: 'auth-hint-neutral' };
      case 'available':
        return { text: '✓ Username available', cls: 'auth-hint-success' };
      case 'taken':
        return { text: '✕ Username already taken', cls: 'auth-hint-error' };
      case 'invalid':
        return {
          text: '3-20 chars, start with a letter, letters/numbers/underscore only',
          cls: 'auth-hint-error',
        };
      default:
        return null;
    }
  };

  // ── LOGIN ────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    clear();
    const validationError = validate({ email, password });
    if (validationError) return err(validationError);
    if (!navigator.onLine)
      return err('No internet connection. Please check your network and try again.');
    setLoading(true);

    console.group('🔑 [AuthScreen] Login attempt');
    console.log('Email:', email.trim());

    try {
      const result = await loginProfile({ email: email.trim(), password });
      console.log('Login result:', result);
      console.groupEnd();

      if (!result.success) {
        return err(result.message || result.error || 'Invalid email or password.');
      }
      const u = result.profile;
      console.log('✅ Login success, profile:', u);

      saveUser({
        name: `${u.firstName} ${u.lastName}`,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        studentType: u.studentType,
        selectedExams: u.selectedExams || [],
        passwordHash: u.passwordHash,
        username: u.username || '',
      });

      logSessionToSheet(`${u.firstName} ${u.lastName}`, u.email);
      onDone({
        name: `${u.firstName} ${u.lastName}`,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        studentType: u.studentType,
        selectedExams: u.selectedExams || [],
        serverStats: u.stats,
        serverAchievements: u.achievements,
        serverSubjectPerf: u.subjectPerformance,
        passwordHash: u.passwordHash,
        username: u.username || '',
      });
    } catch (e2) {
      console.error('❌ [AuthScreen] Login error:', e2);
      console.groupEnd();
      err(getNetworkError(e2));
    }
  };

  // ── SIGNUP STEP 1 ────────────────────────────────────────────────────────
  const handleSignupStep1 = () => {
    clear();
    console.log('📋 [AuthScreen] Step 1 validation:', {
      firstName,
      lastName,
      email,
      username,
      usernameStatus,
    });
    const validationError = validate({ firstName, lastName, email, password, confirm, username });
    if (validationError) return err(validationError);
    if (usernameStatus === 'taken') return err('Username is already taken. Please choose another.');
    if (usernameStatus === 'checking') return err('Please wait — checking username availability…');
    if (usernameStatus === 'invalid') return err('Please choose a valid username.');
    console.log('✅ Step 1 passed, moving to step 2');
    setStep(2);
  };

  // ── SIGNUP STEP 2 ────────────────────────────────────────────────────────
  const handleSignupStep2 = async () => {
    clear();
    const validationError = validate({ email, studentType, selectedExams });
    if (validationError) return err(validationError);
    if (!navigator.onLine)
      return err('No internet connection. Please check your network and try again.');
    setLoading(true);

    console.group('📝 [AuthScreen] Registration attempt');
    console.log('Fields:', {
      firstName,
      lastName,
      email: email.trim(),
      username: username.trim(),
      studentType,
      selectedExams,
    });

    const payload = {
      firstName,
      lastName,
      email: email.trim(),
      password,
      studentType,
      selectedExams,
      username: username.trim(),
    };
    console.log('📤 Sending payload to registerProfile:', { ...payload, password: '[REDACTED]' });

    try {
      const result = await registerProfile(payload);
      console.log('📨 registerProfile result:', result);

      if (result._bypassed) {
        // Backend had an issue but we're letting the user in anyway for debugging
        console.warn('⚠️ [AuthScreen] Registration bypassed (backend issue). Logging debug info.');
        console.warn('Bypass reason:', result._bypassReason);

        // Still save locally so the user can use the app
        const u = result.profile;
        saveUser({
          name: `${u.firstName} ${u.lastName}`,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          studentType: u.studentType,
          selectedExams: u.selectedExams || [],
          passwordHash: u.passwordHash || '',
          username: u.username || '',
        });

        logSessionToSheet(`${u.firstName} ${u.lastName}`, u.email);
        setLoading(false);
        console.groupEnd();

        onDone({
          name: `${u.firstName} ${u.lastName}`,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          studentType: u.studentType,
          selectedExams: u.selectedExams || [],
          isNew: true,
          passwordHash: u.passwordHash || '',
          username: u.username || '',
        });
        return;
      }

      if (!result.success) {
        console.error('❌ Registration failed:', result.error || result.message);
        console.groupEnd();
        return err(result.message || result.error || 'Registration failed.');
      }

      const u = result.profile;
      console.log('✅ Registration success, profile:', u);
      console.groupEnd();

      saveUser({
        name: `${u.firstName} ${u.lastName}`,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        studentType: u.studentType,
        selectedExams: u.selectedExams || [],
        passwordHash: u.passwordHash,
        username: u.username || '',
      });

      logSessionToSheet(`${u.firstName} ${u.lastName}`, u.email);
      setLoading(false);

      onDone({
        name: `${u.firstName} ${u.lastName}`,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        studentType: u.studentType,
        selectedExams: u.selectedExams || [],
        isNew: true,
        passwordHash: u.passwordHash,
        username: u.username || '',
      });
    } catch (e2) {
      console.error('❌ [AuthScreen] Registration exception:', e2);
      console.groupEnd();
      err(getNetworkError(e2));
    }
  };

  // ── FORGOT PASSWORD ──────────────────────────────────────────────────────
  const handleForgotRequest = async () => {
    clear();
    if (!resetEmail.trim()) return err('Enter your email address.');
    if (!navigator.onLine)
      return err('No internet connection. Please check your network and try again.');
    setLoading(true);
    try {
      const result = await requestPasswordReset(resetEmail.trim());
      console.log('Forgot password result:', result);
      setLoading(false);
      if (!result.success) return err(result.message || result.error || 'Email not found.');
      setSuccess('A reset code has been sent to your email.');
      setResetStep(2);
    } catch (e2) {
      err(getNetworkError(e2));
    }
  };

  // ── RESET PASSWORD ───────────────────────────────────────────────────────
  const handleResetConfirm = async () => {
    clear();
    if (!resetCode.trim()) return err('Enter the reset code.');
    if (newPw.length < 8) return err('New password must be at least 8 characters.');
    if (!navigator.onLine)
      return err('No internet connection. Please check your network and try again.');
    setLoading(true);
    try {
      const result = await confirmPasswordReset({
        email: resetEmail.trim(),
        code: resetCode.trim(),
        newPassword: newPw,
      });
      console.log('Reset confirm result:', result);
      setLoading(false);
      if (!result.success) return err(result.message || result.error || 'Invalid or expired code.');
      setSuccess('Password reset! You can now log in.');
      setResetStep(3);
      setTimeout(() => {
        switchView('login');
      }, 2000);
    } catch (e2) {
      err(getNetworkError(e2));
    }
  };

  // ── FORGOT PASSWORD SCREEN ────────────────────────────────────────────────
  if (view === 'forgot') {
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <img src={logo} alt="EliteScholars" className="auth-logo" />
          <h2 className="auth-title">Reset Password</h2>

          {resetStep === 1 && (
            <>
              <p className="auth-sub">Enter your registered email to receive a reset code.</p>
              <input
                className="auth-input"
                placeholder="Email address"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              {error && <div className="auth-error">{error}</div>}
              {success && <div className="auth-success">{success}</div>}
              <button className="auth-btn" onClick={handleForgotRequest} disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Code'}
              </button>
            </>
          )}

          {resetStep === 2 && (
            <>
              <p className="auth-sub">Enter the code from your email and your new password.</p>
              <input
                className="auth-input"
                placeholder="Reset code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
              />
              <input
                className="auth-input"
                placeholder="New password (min 8 chars)"
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
              />
              {error && <div className="auth-error">{error}</div>}
              {success && <div className="auth-success">{success}</div>}
              <button className="auth-btn" onClick={handleResetConfirm} disabled={loading}>
                {loading ? 'Resetting…' : 'Reset Password'}
              </button>
            </>
          )}

          {resetStep === 3 && (
            <div className="auth-success" style={{ textAlign: 'center', padding: 20 }}>
              ✓ {success}
            </div>
          )}

          <button className="auth-link-btn" onClick={() => switchView('login')}>
            ← Back to Login
          </button>
        </div>
      </div>
    );
  }

  // ── SIGNUP SCREEN ─────────────────────────────────────────────────────────
  if (view === 'signup') {
    const hint = usernameHint();
    return (
      <div className="auth-screen">
        <div className="auth-card">
          <img src={logo} alt="EliteScholars" className="auth-logo" />
          <div className="auth-steps">
            <div className={`auth-step-dot ${step >= 1 ? 'active' : ''}`} />
            <div className="auth-step-line" />
            <div className={`auth-step-dot ${step >= 2 ? 'active' : ''}`} />
          </div>

          {step === 1 && (
            <>
              <h2 className="auth-title">Create Account</h2>
              <p className="auth-sub">Join millions of Nigerian students preparing smarter.</p>
              <div className="auth-row">
                <input
                  className="auth-input"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  maxLength={30}
                />
                <input
                  className="auth-input"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  maxLength={30}
                />
              </div>
              <input
                className="auth-input"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="auth-input"
                placeholder="Username (e.g. johndoe23)"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                maxLength={20}
              />
              {hint && <div className={hint.cls}>{hint.text}</div>}
              <div className="auth-pw-wrap">
                <input
                  className="auth-input"
                  placeholder="Password (min 8 characters)"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="auth-pw-toggle" onClick={() => setShowPw((p) => !p)}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
              <input
                className="auth-input"
                placeholder="Confirm password"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              {error && <div className="auth-error">{error}</div>}
              <button className="auth-btn" onClick={handleSignupStep1}>
                Continue →
              </button>
              <div className="auth-switch">
                Already have an account?{' '}
                <button className="auth-link-btn" onClick={() => switchView('login')}>
                  Log In
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="auth-title">Your Study Profile</h2>
              <p className="auth-sub">This helps us show the right content for you.</p>
              <div className="auth-section-label">I am a:</div>
              <div className="auth-type-grid">
                {STUDENT_TYPES.map((t) => (
                  <button
                    key={t.id}
                    className={`auth-type-card ${studentType === t.id ? 'selected' : ''}`}
                    onClick={() => setStudentType(t.id)}
                  >
                    <span className="auth-type-icon">{t.icon}</span>
                    <span className="auth-type-label">{t.label}</span>
                    <span className="auth-type-desc">{t.desc}</span>
                  </button>
                ))}
              </div>
              <div className="auth-section-label" style={{ marginTop: 18 }}>
                I am preparing for: <span className="auth-required">(select all that apply)</span>
              </div>
              <div className="auth-exam-grid">
                {EXAM_TYPES.map((ex) => (
                  <button
                    key={ex.id}
                    className={`auth-exam-chip ${selectedExams.includes(ex.id) ? 'selected' : ''}`}
                    onClick={() => toggleExam(ex.id)}
                  >
                    <span>{ex.icon}</span> {ex.label}
                    {selectedExams.includes(ex.id) && <span className="auth-exam-check">✓</span>}
                  </button>
                ))}
              </div>
              {error && <div className="auth-error">{error}</div>}
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="auth-btn auth-btn-outline" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button
                  className="auth-btn"
                  onClick={handleSignupStep2}
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  {loading ? 'Creating account…' : 'Get Started'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── LOGIN SCREEN (default) ────────────────────────────────────────────────
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <img src={logo} alt="EliteScholars" className="auth-logo" />
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-sub">Log in to continue your streak and progress.</p>
        <input
          className="auth-input"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="auth-pw-wrap">
          <input
            className="auth-input"
            placeholder="Password"
            type={showPw ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button className="auth-pw-toggle" onClick={() => setShowPw((p) => !p)}>
            {showPw ? '🙈' : '👁️'}
          </button>
        </div>
        <button className="auth-forgot-btn" onClick={() => switchView('forgot')}>
          Forgot password?
        </button>
        {error && <div className="auth-error">{error}</div>}
        <button className="auth-btn" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in…' : 'Log In →'}
        </button>
        <div className="auth-switch">
          New here?{' '}
          <button className="auth-link-btn" onClick={() => switchView('signup')}>
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}
