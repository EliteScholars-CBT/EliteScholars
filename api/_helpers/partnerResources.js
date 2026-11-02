// Promo material partners can open and download (files live in /public/partner-resources).
const f = (file, title, audience, note) => ({ id: file.replace(/\.png$/, ""), file: `/partner-resources/${file}`, title, audience, note });
export const RESOURCES = [
  f("01_GST_a.png", "GST flyer (A)", "University students", "Share in course groups and class WhatsApp groups."),
  f("02_GST_b.png", "GST flyer (B)", "University students", "Alternative design for status posts."),
  f("03_GAME_a.png", "Games flyer (A)", "Students", "Shows the study games."),
  f("04_GAME_b.png", "Games flyer (B)", "Students", "Alternative design."),
  f("05_JAMBITES_a.png", "JAMB flyer (A)", "JAMB candidates", "Good for JAMB and CBT-centre groups."),
  f("06_JAMBITES_b.png", "JAMB flyer (B)", "JAMB candidates", "Alternative design."),
  f("07_PARENTS_a.png", "Parents flyer (A)", "Parents", "Share with parents' groups."),
  f("08_PARENTS_b.png", "Parents flyer (B)", "Parents", "Alternative design."),
  f("09_CENTRES_a.png", "Tutorial centres flyer (A)", "Centre owners", "Use with your centre link."),
  f("10_CENTRES_b.png", "Tutorial centres flyer (B)", "Centre owners", "Alternative design."),
  f("11_SCHOOLS_a.png", "Schools flyer (A)", "School owners", "Use with your school link."),
  f("12_SCHOOLS_b.png", "Schools flyer (B)", "School owners", "Alternative design."),
];
