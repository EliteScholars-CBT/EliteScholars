import React from 'react';
import { BG, PURPLE, GOLD, WHITE } from '../utils/colors';
import { EmojiIcon } from '../components/Icon';

export default function PrivacyPolicy() {

  return (
    <div className="scr fd privacy-page">
      {/* Header */}
      <div className="legal-header-section">
        <button className="legal-back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
        <div className="legal-header-content">
          <div className="legal-icon"><EmojiIcon emoji="🔒" size="1.1em" /></div>
          <h1>Privacy <span style={{ color: GOLD }}>Policy</span></h1>
          <p>Last updated: April 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="legal-content">
        <div className="legal-card">
          <h3>1. Introduction</h3>
          <p>Elite JAMB &amp; PUTME Clinic ("we", "us", "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use EliteScholars CBT ("the App").</p>
        </div>

        <div className="legal-card">
          <h3>2. Information We Collect</h3>
          <p>We collect information that you voluntarily provide to us when you register for an account:</p>
          <ul>
            <li><strong>Personal Information:</strong> Your name and email address</li>
            <li><strong>Quiz Data:</strong> Your quiz scores, answers, progress, and performance statistics</li>
            <li><strong>Usage Data:</strong> Information about how you use the App (features accessed, time spent, etc.)</li>
            <li><strong>Device Information:</strong> Browser type, device type, operating system</li>
          </ul>
        </div>

        <div className="legal-card">
          <h3>3. How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Create and manage your user account</li>
            <li>Track your quiz performance and progress</li>
            <li>Provide personalized recommendations and study insights</li>
            <li>Improve and optimize the App's features and performance</li>
            <li>Send you important updates about the App (if you opt-in)</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Display relevant advertisements</li>
          </ul>
        </div>

        <div className="legal-card">
          <h3>4. Data Storage and Security</h3>
          <p>Your data is stored locally on your device using browser localStorage and may also be transmitted to our analytics service (Google Sheets) for performance tracking. We implement reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.</p>
          <p><strong>Important:</strong> Your quiz data is stored locally on your device. If you clear your browser data, your progress may be lost. We recommend not clearing your browser data if you wish to retain your progress.</p>
        </div>

        <div className="legal-card">
          <h3>5. Third-Party Services</h3>
          <p>The App uses the following third-party services:</p>
          <ul>
            <li><strong>Google Sheets:</strong> Used to collect anonymous usage statistics and performance data to help us improve the App. No personally identifiable information is shared beyond your email address and name.</li>
            <li><strong>Adsterra:</strong> Used to display advertisements. Adsterra may collect device information and usage data to serve relevant ads. Please review Adsterra's privacy policy for more information.</li>
          </ul>
        </div>

        <div className="legal-card">
          <h3>6. Cookies and Local Storage</h3>
          <p>The App uses browser localStorage to store your user preferences, quiz progress, and achievements. This data stays on your device and is not automatically transmitted to our servers. We do not use tracking cookies for marketing purposes.</p>
        </div>

        <div className="legal-card">
          <h3>7. Children's Privacy</h3>
          <p>The App is intended for users who are preparing for JAMB examinations. While there is no age restriction, we do not knowingly collect personal information from children under 13 without parental consent. If you believe we have inadvertently collected such information, please contact us.</p>
        </div>

        <div className="legal-card">
          <h3>8. Your Rights and Choices</h3>
          <p>You have the following rights regarding your information:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the data we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
            <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
            <li><strong>Opt-out:</strong> Disable notifications or decline to provide optional information</li>
          </ul>
          <p>To exercise these rights, please contact us at the email below.</p>
        </div>

        <div className="legal-card">
          <h3>9. Data Retention</h3>
          <p>We retain your personal information for as long as your account is active or as needed to provide you with the App's services. If you request account deletion, we will remove your information from our active systems within a reasonable timeframe.</p>
        </div>

        <div className="legal-card">
          <h3>10. Changes to This Privacy Policy</h3>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in the App and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>
        </div>

        <div className="legal-card">
          <h3>11. Contact Us</h3>
          <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
          <p><EmojiIcon emoji="📧" size="1.1em" /> <a href="mailto:elitescholars.site@gmail.com" className="legal-link">elitescholars.site@gmail.com</a></p>
        </div>
      </div>

      {/* Footer */}
      <div className="legal-footer">
        <p>© 2026 EliteScholars CBT. All rights reserved.</p>
      </div>
    </div>
  );
}
