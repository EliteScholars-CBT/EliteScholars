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
    postutme: { bg: '#FEF3C7', color: '#B45309', label: 'Post UTME' },
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

    renderAdPublisher() {
      return `<div class="blog-ad blog-ad-publisher">
        <p class="blog-ad-label">Advertisement</p>
        <div class="blog-ad-slot" id="pub-ad-slot">
          <span class="blog-ad-placeholder">Publisher Ad Space</span>
        </div>
      </div>`;
    },

    renderAdAffiliate(item) {
      return `<div class="blog-ad blog-ad-affiliate">
        <p class="blog-ad-label">Sponsored</p>
        <a href="${item.link}" target="_blank" rel="noopener" class="blog-aff-card">
          <div class="blog-aff-icon">${item.icon}</div>
          <div class="blog-aff-body">
            <div class="blog-aff-title">${item.title}</div>
            <div class="blog-aff-desc">${item.desc}</div>
          </div>
          <div class="blog-aff-cta">${item.cta}</div>
        </a>
      </div>`;
    },

    renderAdPartner(item) {
      return `<div class="blog-ad blog-ad-partner">
        <p class="blog-ad-label">Partner</p>
        <a href="${item.link}" target="_blank" rel="noopener" class="blog-partner-card">
          <div class="blog-partner-logo">${item.logo}</div>
          <div class="blog-partner-body">
            <div class="blog-partner-title">${item.title}</div>
            <div class="blog-partner-desc">${item.desc}</div>
          </div>
        </a>
      </div>`;
    },

    injectAdsIntoContent(html, affiliateAd, partnerAd) {
      const paragraphs = html.split(/<\/p>/i);
      let result = '';
      paragraphs.forEach((para, i) => {
        result += para + (para.trim() ? '</p>' : '');
        if (i === 2) result += this.renderAdPublisher();
        if (i === 5 && affiliateAd) result += this.renderAdAffiliate(affiliateAd);
        if (i === 8 && partnerAd) result += this.renderAdPartner(partnerAd);
      });
      return result;
    },
  };
})();
