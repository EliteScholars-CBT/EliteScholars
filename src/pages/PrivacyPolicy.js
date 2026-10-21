import React from 'react';
import SiteShell from '../components/SiteShell';

const TOC = [['collect', 'What we collect'], ['use', 'How we use it'], ['storage', 'Storage & security'], ['partners', 'Service providers'], ['ads', 'Advertising'], ['cookies', 'Cookies & storage'], ['children', 'Children'], ['rights', 'Your rights'], ['contact', 'Contact']];

export default function PrivacyPolicy() {
  return (
    <SiteShell eyebrow="Legal" title="Privacy Policy" intro="Plain-language explanation of what EliteScholars collects, why, and the choices you have." updated="October 2026">
      <section className="sp-card"><div className="sp-toc">{TOC.map(([id, l]) => <a key={id} href={'#' + id}>{l}</a>)}</div></section>

      <section className="sp-card" id="collect">
        <h2>1. What we collect</h2>
        <p>EliteScholars ("we", "us") operates the EliteScholars website, blog and app (the "Service"). We collect:</p>
        <ul>
          <li><strong>Account details:</strong> name, email address and a securely hashed password or sign-in token.</li>
          <li><strong>Study data:</strong> quiz and CBT results, streaks, XP, challenges, squad activity and settings.</li>
          <li><strong>Status updates:</strong> text you choose to post as a 24-hour status, with the audience you pick (only you, your squad, or everyone). Public statuses show your username to other students; your email is never shown.</li>
          <li><strong>Payment records:</strong> plan, amount, reference and status. Card or bank details are entered on our payment provider's page and never reach our servers.</li>
          <li><strong>Technical data:</strong> browser, device type and basic usage events used to keep the Service working and secure.</li>
        </ul>
      </section>

      <section className="sp-card" id="use">
        <h2>2. How we use it</h2>
        <ul>
          <li>To create and run your account, save your progress and show leaderboards.</li>
          <li>To process payments, unlock Premium and prevent fraud.</li>
          <li>To send essential emails such as password resets and receipts.</li>
          <li>To understand which features work and improve the Service.</li>
          <li>To show advertising on our blog, as described in section 5.</li>
        </ul>
      </section>

      <section className="sp-card" id="storage">
        <h2>3. Storage &amp; security</h2>
        <p>Account and progress data is stored with our database provider (Supabase) and accessed only through our secured servers. Some preferences and a sign-in token are also kept in your browser so you stay logged in. We use reasonable technical measures to protect your data, but no system is perfectly secure.</p>
        <p>We keep your data while your account is active. You can ask us to delete it at any time.</p>
      </section>

      <section className="sp-card" id="partners">
        <h2>4. Service providers</h2>
        <ul>
          <li><strong>Supabase:</strong> database hosting.</li>
          <li><strong>Vercel:</strong> website and server hosting.</li>
          <li><strong>Flutterwave:</strong> payment processing.</li>
          <li><strong>Email delivery provider:</strong> transactional email.</li>
          <li><strong>AI service provider:</strong> when you use "Study from your files", short text excerpts from your document are sent to an AI provider to be rewritten into simple study notes. We do not store your document on our servers, and the provider is instructed to use it only to produce your results.</li>
        </ul>
        <p>These providers process data on our behalf. We do not sell your personal information.</p>
      </section>

      <section className="sp-card" id="ads">
        <h2>5. Advertising</h2>
        <p>The free blog displays advertising to fund the Service. Ads are always labelled "Advertisement" or "Sponsored".</p>
        <ul>
          <li><strong>Our own ads:</strong> promotions for EliteScholars, such as Premium or our WhatsApp Channel. These need no third-party cookies.</li>
          <li><strong>Third-party ads:</strong> served by advertising partners such as Adsterra. These partners may use cookies or similar technologies and may collect your IP address, device and browsing information to show and measure ads.</li>
        </ul>
        <p><strong>Your choice:</strong> where a cookie choice banner is shown, your selection is respected and can be changed from the blog footer. You can also limit ad tracking through your browser settings, by blocking third-party cookies, or by enabling the Global Privacy Control signal, which we honour by showing only our own ads.</p>
        <p>Sponsored links carry <code>rel="sponsored nofollow"</code>. We never ask you to click ads, and ads are not shown inside the practice app's quizzes. Please read your ad partner's own privacy policy for how they handle data.</p>
      </section>

      <section className="sp-card" id="cookies">
        <h2>6. Cookies &amp; local storage</h2>
        <p>We use essential storage (cookies and localStorage) to keep you signed in and remember settings. Advertising cookies may be set by our ad partners on the blog.</p>
      </section>

      <section className="sp-card" id="children">
        <h2>7. Children</h2>
        <p>Many of our students are teenagers. If you are under 18, please use the Service with a parent or guardian's awareness. We do not knowingly collect more data than needed from children and do not use ad targeting beyond what our ad partners provide. If you believe a child's data should be removed, contact us.</p>
      </section>

      <section className="sp-card" id="rights">
        <h2>8. Your rights</h2>
        <p>Under the Nigeria Data Protection Act 2023 and similar laws you may request access to, correction of, or deletion of your personal data, and may withdraw consent at any time. Email us and we will respond within a reasonable time.</p>
        <p>We may update this policy; the date above shows the latest version.</p>
      </section>

      <section className="sp-card" id="contact">
        <h2>9. Contact</h2>
        <p>Privacy questions or requests: <a href="mailto:elitescholars.site@gmail.com">elitescholars.site@gmail.com</a></p>
      </section>
    </SiteShell>
  );
}
