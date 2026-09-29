// ============================================================================
// api/constants/shop.js — Shop items (server-side)
// Images live in /public/shop/ and are referenced by filename only.
// The frontend constructs the full URL as /shop/<filename>
// ============================================================================

export const SHOP_ITEMS = [
  {
    id: 'premium',
    title: '⭐ EliteScholars Premium',
    description: 'No ads · Unlimited topics · Unlimited sessions · All subjects unlocked',
    price: '₦9,000/mo',
    image: null,
    link: null,
    category: 'Premium',
    isPremium: true,
  },
  {
    id: 'shop_1',
    title: 'JAMB Key Points',
    description: 'Condensed notes covering all JAMB topics. Perfect last-minute revision.',
    price: '₦1,500',
    image: 'jamb-key-points.jpg',
    link: 'https://elitescholars.site/shop/jamb-key-points',
    category: 'Notes',
    badge: 'Bestseller',
  },
  {
    id: 'shop_2',
    title: 'Maths Formula Sheet',
    description: 'All JAMB & WAEC maths formulas on one printable sheet.',
    price: '₦500',
    image: 'maths-formula.jpg',
    link: 'https://elitescholars.site/shop/maths-formula',
    category: 'Cheat Sheet',
    badge: null,
  },
  {
    id: 'shop_3',
    title: 'POST UTME Bundle',
    description: 'Past questions & answers for 11 top universities.',
    price: '₦2,000',
    image: 'postutme-bundle.jpg',
    link: 'https://elitescholars.site/shop/postutme',
    category: 'Bundle',
    badge: 'Popular',
  },
  {
    id: 'shop_4',
    title: 'WAEC Geography Notes',
    description: 'Complete geography notes with maps & diagrams.',
    price: '₦800',
    image: 'waec-geography.jpg',
    link: 'https://elitescholars.site/shop/geography',
    category: 'Notes',
    badge: null,
  },
  {
    id: 'shop_5',
    title: 'Exam Success Blueprint',
    description: 'A proven study strategy guide for Nigerian students.',
    price: '₦1,000',
    image: 'exam-blueprint.jpg',
    link: 'https://elitescholars.site/shop/blueprint',
    category: 'Guide',
    badge: 'New',
  },
];
