/* ============================================================================
   EliteScholars — ADS CONFIG  (the ONLY file you need to edit to turn ads on)
   ----------------------------------------------------------------------------
   HOW TO TURN ON ADSTERRA
   1. In Adsterra: Websites → add elitescholars.site → wait for approval.
   2. Create ad units (Get code). For each, copy the URL inside  src="..."
      (it ends in /invoke.js or looks like //pl12345.example.com/abc123.js)
      and paste it in the matching "src" below. For Banner units also paste
      the "key" value from the code (the long letters/numbers).
   3. Set  adsterra.enabled  to  true  and redeploy. That's it.
   Anything you leave empty ('') is simply skipped, and that space shows one of
   YOUR OWN ads (houseAds below) instead — so the page never has a blank hole.

   HOW MONEY IS MAXIMISED (already built in)
   • Ads load only when they scroll near the screen (faster pages = better SEO
     and higher viewability, which advertisers pay more for).
   • High-attention spots are used: under the title, inside the article,
     end of article, sticky sidebar, and a small sticky bar on phones.
   • Space is reserved for every ad so the page does not jump (better UX).
   • Banners are NOT auto-refreshed and nothing asks anyone to click — that is
     against Adsterra's rules and can get the account banned.

   LEGAL SET-UP (already built in)
   • Visitors choose "Accept all" or "Essential only". Third-party ads load ONLY
     after "Accept all". With "Essential only" they see your own ads.
   • Every ad is labelled "Advertisement" or "Sponsored"; paid/affiliate links use
     rel="sponsored nofollow".
   • Privacy Policy and Terms explain ads, cookies and affiliate links.
   ============================================================================ */
window.ES_ADS_CONFIG = {
  // Master switch for every third-party ad below.
  adsterra: {
    enabled: false,

    units: {
      // Display banners (Adsterra → Banner). key = the 'key' value, src = the invoke.js URL.
      leaderboard728x90: { key: '', src: '' },   // wide banner under the title (desktop)
      mobile320x50:      { key: '', src: '' },   // small banner (phones) + sticky bottom bar
      rect300x250:       { key: '', src: '' },   // main rectangle: in-article, end, sidebar
      rect300x250b:      { key: '', src: '' },   // optional 2nd rectangle (leave empty to reuse the first)

      // Native Banner (Adsterra → Native Banner). Only ONE per page.
      native: { src: '', containerId: '' },      // containerId looks like  container-xxxxxxxx

      // Social Bar (Adsterra → Social Bar): one script, shows a small slide-in.
      socialBar: { src: '' },

      // Popunder opens a new tab — highest earning but annoying and can hurt
      // trust, so it is OFF by default. Turn on only if you accept that trade-off.
      popunder: { enabled: false, src: '', everyHours: 24 },

      // Direct Link (Adsterra → Direct Link): used for one clearly-labelled
      // "Sponsored" card. Leave '' to hide.
      directLink: '',
    },
  },

  // Show the small sticky ad bar on phones (needs units.mobile320x50).
  mobileStickyBar: true,

  // false = no consent banner; third-party ads load for everyone (except visitors
  // whose browser sends Global Privacy Control). Set true to bring the banner back.
  consentRequired: false,

  // ── YOUR OWN ADS (custom ads) ─────────────────────────────────────────────
  // Shown in the "Sponsored/Partner" spots, and in every spot where an Adsterra
  // unit is empty, declined by the visitor, or switched off. Edit freely.
  houseAds: [
    {
      id: 'premium',
      tag: 'Sponsored',
      icon: '👑',
      title: 'EliteScholars Premium — ₦3,000 for a full year',
      desc: 'Unlimited topics, CBT, games and study-from-file. No daily limits.',
      cta: 'Go Premium',
      link: 'https://elitescholars.site/app?src=blog-premium',
    },
    {
      id: 'study-files',
      tag: 'Sponsored',
      icon: '📄',
      title: 'Turn your own notes into a study pack',
      desc: 'Upload a PDF or DOCX and get lessons, flashcards and quizzes on your phone.',
      cta: 'Try it free',
      link: 'https://elitescholars.site/app?src=blog-files',
    },
    {
      id: 'partner',
      tag: 'Partner',
      icon: '💸',
      title: 'Earn with EliteScholars',
      desc: 'Join the partner programme and earn commission when students you refer go Premium.',
      cta: 'Become a partner',
      link: 'https://elitescholars.site/partner',
    },
    {
      id: 'whatsapp',
      tag: 'Community',
      icon: '💬',
      title: 'Join our WhatsApp channel',
      desc: 'Daily study tips, exam news and free practice questions.',
      cta: 'Join free',
      link: 'https://whatsapp.com/channel/0029Vb6wPv72kNFnjr4FMr24',
    },
  ],
};
