import React from 'react';
import { BG, PURPLE, GOLD, WHITE } from '../utils/colors';

export default function TermsOfService() {

  return (
    <div className="scr fd terms-page">
      {/* Header */}
      <div className="legal-header-section">
        <button className="legal-back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
        <div className="legal-header-content">
          <div className="legal-icon">📜</div>
          <h1>Terms of <span style={{ color: GOLD }}>Service</span></h1>
          <p>Last updated: April 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="legal-content">
        <div className="legal-card">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing or using EliteScholars CBT ("the App"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the App.</p>
        </div>

        <div className="legal-card">
          <h3>2. Description of Service</h3>
          <p>EliteScholars CBT provides a Computer-Based Test preparation platform for JAMB candidates, including practice questions, quizzes, flashcards, performance tracking, and study tools. The App is offered free of charge with optional ad-supported content.</p>
        </div>

        <div className="legal-card">
          <h3>3. User Accounts</h3>
          <p>To use certain features of the App, you must create an account using your name and email address. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
          <ul>
            <li>You must provide accurate and complete information</li>
            <li>You are responsible for all activity under your account</li>
            <li>Notify us immediately of any unauthorized use</li>
            <li>We reserve the right to suspend or terminate accounts</li>
          </ul>
        </div>

        <div className="legal-card">
          <h3>4. User Conduct</h3>
          <p>You agree to use the App only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the App. Prohibited behavior includes:</p>
          <ul>
            <li>Attempting to gain unauthorized access to any part of the App</li>
            <li>Using the App for any fraudulent or malicious purpose</li>
            <li>Interfering with the proper functioning of the App</li>
            <li>Sharing answers or cheating in any form</li>
            <li>Reverse engineering or copying any part of the App</li>
          </ul>
        </div>

        <div className="legal-card">
          <h3>5. Intellectual Property</h3>
          <p>The App and its original content, features, and functionality are owned by Elite JAMB &amp; PUTME Clinic and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.</p>
        </div>

        <div className="legal-card">
          <h3>6. User Data and Privacy</h3>
          <p>Your use of the App is also governed by our Privacy Policy. By using the App, you consent to the collection and use of your information as described in the Privacy Policy.</p>
        </div>

        <div className="legal-card">
          <h3>7. Advertisements</h3>
          <p>The App displays advertisements from third-party ad networks. These ads help keep the App free for all users. We do not endorse the products or services advertised unless explicitly stated.</p>
        </div>

        <div className="legal-card">
          <h3>8. Disclaimer of Warranties</h3>
          <p>The App is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the operation or availability of the App, or the accuracy or reliability of any content.</p>
        </div>

        <div className="legal-card">
          <h3>9. Limitation of Liability</h3>
          <p>To the fullest extent permitted by law, Elite JAMB &amp; PUTME Clinic shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the App.</p>
        </div>

        <div className="legal-card">
          <h3>10. Modifications to Terms</h3>
          <p>We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms in the App. Your continued use of the App after any such changes constitutes your acceptance of the new Terms.</p>
        </div>

        <div className="legal-card">
          <h3>11. Governing Law</h3>
          <p>These Terms shall be governed and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.</p>
        </div>

        <div className="legal-card">
          <h3>12. Contact Information</h3>
          <p>If you have any questions about these Terms, please contact us at: <a href="mailto:elitescholars.site@gmail.com" className="legal-link">elitescholars.site@gmail.com</a></p>
        </div>
      </div>

      {/* Footer */}
      <div className="legal-footer">
        <p>© 2026 EliteScholars CBT. All rights reserved.</p>
      </div>
    </div>
  );
}
