// Moves the general-audience (career, money, work, life skills) posts that were not live on 22 Nov 2026 into the
// "Career & Life" category. Posts already live keep their old category so their web addresses do not change.
// Future general posts can simply be written with category: "career", categoryLabel: "Career & Life".
(function () {
  var ids = [
    "how-to-write-a-cv-that-gets-interviews-for-nigerian-graduates",
    "job-interview-questions-and-how-to-answer-them",
    "how-to-write-professional-emails-and-workplace-messages",
    "how-to-learn-a-new-skill-fast-as-an-adult",
    "critical-thinking-how-to-spot-fake-news-and-misleading-claims-online",
    "how-to-save-budget-and-avoid-get-rich-quick-schemes-in-nigeria",
    "christmas-and-new-year-how-to-enjoy-without-derailing-your-goals",
    "how-to-start-a-small-business-with-little-capital-in-nigeria",
    "public-speaking-and-presentation-skills-for-nervous-beginners",
    "why-you-should-learn-to-type-and-use-computers",
    "healthy-habits-for-energy-and-focus-a-practical-guide-for-nigerians",
    "spreadsheet-basics-for-work-and-study-excel-and-google-sheets-made-simple",
    "how-to-review-your-year-and-set-goals-for-the-next",
    "networking-and-linkedin-for-nigerian-graduates-a-practical-guide",
    "freelancing-for-beginners-how-to-find-your-first-clients-safely",
    "how-to-succeed-in-your-first-job-the-first-90-days-and-beyond"
  ];
  ids.forEach(function (id) {
    var p = BLOG_POSTS.find(function (x) { return x.id === id; });
    if (p && new Date(p.publishAt) >= new Date('2026-11-23T00:00:00+01:00')) { p.category = 'career'; p.categoryLabel = 'Career & Life'; }
  });
})();
