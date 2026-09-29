import React from 'react';
import { GOLD } from '../utils/colors';
import { EmojiIcon } from '../components/Icon';

// ============================================================================
// About — SEO-updated. Reflects all 5 exam types, not just JAMB.
// ============================================================================

export default function About() {

  return (
    <div className="scr fd about-page">
      {/* Header */}
      <div className="about-header-section">
        <button className="about-back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
        <div className="about-header-content">
          <div className="about-logo"><EmojiIcon emoji="🎓" size="1.1em" /></div>
          <h1>
            Elite<span style={{ color: GOLD }}>Scholars</span> CBT
          </h1>
          <p>Nigeria's All-in-One Exam Preparation Platform</p>
        </div>
      </div>

      {/* Content */}
      <div className="about-content scroll">
        <div className="about-card">
          <div className="about-card-icon"><EmojiIcon emoji="📖" size="1.1em" /></div>
          <div className="about-card-content">
            <h3>About Us</h3>
            <p>
              EliteScholars CBT is a comprehensive Computer-Based Test preparation platform built
              for every Nigerian student — from JAMB UTME candidates to POST UTME applicants, WAEC
              and NECO students, and university undergraduates studying GST. Our mission: make
              quality exam preparation accessible, affordable, and effective for every student
              regardless of location or background.
            </p>
          </div>
        </div>

        <div className="about-card">
          <div className="about-card-icon"><EmojiIcon emoji="✨" size="1.1em" /></div>
          <div className="about-card-content">
            <h3>What You Can Do Here</h3>
            <ul className="about-features-list">
              <li><EmojiIcon emoji="✅" size="1.15em" /> Practise 5,000+ questions across 5 exam types</li>
              <li><EmojiIcon emoji="✅" size="1.15em" /> Simulate real JAMB, WAEC, NECO & POST UTME CBT exams</li>
              <li><EmojiIcon emoji="✅" size="1.15em" /> Learn topics with rich notes, illustrations & SVG diagrams</li>
              <li><EmojiIcon emoji="✅" size="1.15em" /> Listen to content read aloud with text-to-speech</li>
              <li><EmojiIcon emoji="✅" size="1.15em" /> Challenge friends and compare scores</li>
              <li><EmojiIcon emoji="✅" size="1.15em" /> Track streaks, earn XP and unlock achievements</li>
              <li><EmojiIcon emoji="✅" size="1.15em" /> Browse the shop for premium study materials</li>
              <li><EmojiIcon emoji="✅" size="1.15em" /> Works as a PWA — installable and fast</li>
            </ul>
          </div>
        </div>

        <div className="about-card">
          <div className="about-card-icon"><EmojiIcon emoji="📚" size="1.1em" /></div>
          <div className="about-card-content">
            <h3>Exams & Subjects Covered</h3>
            <div className="about-exam-tags">
              <span className="about-exam-tag jamb-tag"><EmojiIcon emoji="📝" size="1.15em" /> JAMB UTME</span>
              <span className="about-exam-tag postutme-tag"><EmojiIcon emoji="🎓" size="1.15em" /> POST UTME</span>
              <span className="about-exam-tag waec-tag"><EmojiIcon emoji="🏫" size="1.15em" /> WAEC SSCE</span>
              <span className="about-exam-tag neco-tag"><EmojiIcon emoji="📋" size="1.15em" /> NECO</span>
              <span className="about-exam-tag gst-tag"><EmojiIcon emoji="🎓" size="1.15em" /> GST</span>
            </div>
            <div className="about-subjects-grid" style={{ marginTop: 12 }}>
              {[
                'English',
                'Mathematics',
                'Physics',
                'Chemistry',
                'Biology',
                'Economics',
                'Government',
                'Accounting',
                'Literature',
                'Geography',
                'Use of English',
                'Critical Thinking',
                'Nigerian Studies',
              ].map((s) => (
                <span key={s} className="about-subject-tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="about-card">
          <div className="about-card-icon"><EmojiIcon emoji="🏆" size="1.1em" /></div>
          <div className="about-card-content">
            <h3>Why EliteScholars?</h3>
            <ul className="about-features-list">
              <li><EmojiIcon emoji="🎯" size="1.15em" /> Built specifically for Nigerian exam formats</li>
              <li>📱 Mobile-first — practise anywhere, anytime</li>
              <li><EmojiIcon emoji="🔥" size="1.15em" /> Gamified: streaks, XP, leaderboards, challenges</li>
              <li><EmojiIcon emoji="💡" size="1.15em" /> Every question has a full explanation</li>
              <li><EmojiIcon emoji="📖" size="1.15em" /> Learn Mode with accordion topics & TTS reading</li>
              <li><EmojiIcon emoji="🛍️" size="1.15em" /> Shop for curated premium study materials</li>
              <li><EmojiIcon emoji="⚔️" size="1.15em" /> Challenge a classmate and compare scores</li>
            </ul>
          </div>
        </div>

        <div className="about-card">
          <div className="about-card-icon">📞</div>
          <div className="about-card-content">
            <h3>Contact Us</h3>
            <p>
              Have feedback or a question? Reach us at{' '}
              <a href="mailto:support@elitescholars.site" style={{ color: GOLD }}>
                support@elitescholars.site
              </a>{' '}
              or join our WhatsApp community.
            </p>
          </div>
        </div>

        <div style={{ padding: '0 0 32px', textAlign: 'center' }}>
          <p style={{ fontSize: 10, color: '#9CA3AF' }}>
            © {new Date().getFullYear()} EliteScholars. All rights reserved.
            <br />
            Not affiliated with JAMB, WAEC, or NECO.
          </p>
        </div>
      </div>
    </div>
  );
}
