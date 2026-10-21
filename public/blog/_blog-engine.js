(function () {
  const AVATARS = {
    avatar_1: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#8B5CF6"/><circle cx="24" cy="19" r="8" fill="#C4B5FD"/><ellipse cx="24" cy="38" rx="13" ry="8" fill="#C4B5FD"/><circle cx="24" cy="19" r="6" fill="#fff"/><path d="M20 18 Q24 14 28 18" stroke="#8B5CF6" stroke-width="1.5" fill="none"/></svg>`,
    avatar_2: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#0369A1"/><circle cx="24" cy="19" r="8" fill="#BAE6FD"/><ellipse cx="24" cy="38" rx="13" ry="8" fill="#BAE6FD"/><circle cx="24" cy="19" r="6" fill="#fff"/><rect x="17" y="16" width="14" height="2" rx="1" fill="#0369A1"/></svg>`,
    avatar_3: `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#065F46"/><circle cx="24" cy="19" r="8" fill="#A7F3D0"/><ellipse cx="24" cy="38" rx="13" ry="8" fill="#A7F3D0"/><circle cx="24" cy="19" r="6" fill="#fff"/><path d="M21 17 L24 14 L27 17" stroke="#065F46" stroke-width="1.5" fill="none"/></svg>`,
  };

  const CATEGORY_COLORS = {
    jamb: { bg: '#EDE9FE', color: '#8B5CF6', label: 'JAMB' },
    'study-tips': { bg: '#DBEAFE', color: '#1D4ED8', label: 'Study Tips' },
    waec: { bg: '#DCFCE7', color: '#065F46', label: 'WAEC' },
    gst: { bg: '#FEE2E2', color: '#DC2626', label: 'GST' },
  };

  window.BlogEngine = {
    AVATARS,
    CATEGORY_COLORS,

    isLive(post) {
      return new Date(post.publishAt) <= new Date();
    },

    formatDate(iso) {
      return new Date(iso).toLocaleDateString('en-NG', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    },

    getAvatar(key) {
      return AVATARS[key] || AVATARS['avatar_1'];
    },

    getCategoryStyle(cat) {
      return CATEGORY_COLORS[cat] || { bg: '#F3F4F6', color: '#374151', label: cat };
    },

    // Ads are only empty containers here; _blog-ads.js fills them in the visitor's
    // browser (Adsterra after consent, otherwise our own ads). Keeping them out of
    // the article HTML means they never count as page content for search engines.
    adSlot(slot, house) {
      return `<div class="es-ad" data-slot="${slot}"${house ? ` data-house="${house}"` : ''} aria-label="Advertisement"></div>`;
    },

    injectAdsIntoContent(html) {
      const paragraphs = html.split(/<\/p>/i);
      const n = paragraphs.filter((x) => x.trim()).length;
      let result = '';
      paragraphs.forEach((para, i) => {
        result += para + (para.trim() ? '</p>' : '');
        if (!para.trim()) return;
        if (i === 1 && n >= 4) result += this.adSlot('inline-1');
        if (i === 3 && n >= 6) result += this.adSlot('inline-2');
        if (i === 5 && n >= 8) result += this.adSlot('inline-3');
      });
      return result;
    },
  };
})();
