import React from 'react';
import SiteShell from '../components/SiteShell';

export default function TermsOfService() {
  return (
    <SiteShell eyebrow="Legal" title="Terms of Service" intro="The rules for using EliteScholars. Short, fair and readable." updated="October 2026">
      <section className="sp-card">
        <h2>1. Acceptance</h2>
        <p>By using the EliteScholars website, blog or app (the "Service") you agree to these Terms and our <a href="/app/privacy">Privacy Policy</a>. If you disagree, please do not use the Service.</p>
      </section>
      <section className="sp-card">
        <h2>2. The Service</h2>
        <p>EliteScholars provides exam practice for JAMB, WAEC, NECO and GST, including questions, CBT simulations, study notes, games and challenges. Some features are free with daily limits; EliteScholars Premium is a paid yearly plan that removes those limits.</p>
      </section>
      <section className="sp-card">
        <h2>3. Accounts</h2>
        <ul>
          <li>Give accurate information and keep your login private.</li>
          <li>You are responsible for activity on your account.</li>
          <li>We may suspend accounts that abuse the Service.</li>
        </ul>
      </section>
      <section className="sp-card">
        <h2>4. Payments</h2>
        <p>Premium is billed once per year through Flutterwave and unlocks on successful payment. Because access is digital and immediate, payments are generally non-refundable, except where the law requires otherwise or a payment error occurred on our side. If you were charged and did not receive access, email us with your payment reference.</p>
      </section>
      <section className="sp-card">
        <h2>5. Acceptable use</h2>
        <ul>
          <li>No hacking, scraping, or interfering with the Service.</li>
          <li>No cheating the leaderboard, abusing referrals or creating fake accounts.</li>
          <li>No copying or reselling our content without written permission.</li>
        </ul>
      </section>
      <section className="sp-card">
        <h2>6. Content &amp; accuracy</h2>
        <p>Our content is for study practice. We work hard to keep it accurate but cannot guarantee any exam result or that content matches any future exam. We are not affiliated with JAMB, WAEC or NECO. Everything on the Service is owned by or licensed to EliteScholars.</p>
      </section>
      <section className="sp-card">
        <h2>7. Advertising &amp; third-party links</h2>
        <p>The blog shows advertising and sponsored links, which are labelled. We do not control or endorse advertisers, and your dealings with them are your own. See the <a href="/app/privacy#ads">advertising policy</a>.</p>
      </section>
      <section className="sp-card">
        <h2>8. Disclaimer &amp; liability</h2>
        <p>The Service is provided "as is" and "as available". To the extent allowed by law, EliteScholars is not liable for indirect or consequential loss arising from use of the Service.</p>
      </section>
      <section className="sp-card">
        <h2>9. Changes &amp; governing law</h2>
        <p>We may update these Terms; continued use means you accept the changes. These Terms are governed by the laws of the Federal Republic of Nigeria.</p>
      </section>
      <section className="sp-card">
        <h2>10. Contact</h2>
        <p><a href="mailto:elitescholars.site@gmail.com">elitescholars.site@gmail.com</a></p>
      </section>
    </SiteShell>
  );
}
