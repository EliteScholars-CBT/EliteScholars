(function() {
  var slug = window.location.pathname.split('/').pop().replace('.html','');
  var post = BLOG_POSTS.find(function(p){ return p.id === slug; });
  var root = document.getElementById('post-root');

  function notFound(msg, sub) {
    root.innerHTML = '<div style="max-width:420px;margin:80px auto;text-align:center;padding:40px 24px;background:#fff;border-radius:16px;box-shadow:0 2px 16px rgba(108,63,201,0.10)">' +
      '<div style="font-size:48px;margin-bottom:16px">' + (msg === 'soon' ? '⏳' : '😕') + '</div>' +
      '<h2 style="font-size:20px;font-weight:800;color:#111827">' + (msg === 'soon' ? 'Coming Soon' : 'Post not found') + '</h2>' +
      '<p style="color:#6B7280;margin-top:8px">' + sub + '</p>' +
      '<a href="../index.html" style="display:inline-block;margin-top:20px;background:#8B5CF6;color:#fff;padding:10px 22px;border-radius:20px;font-weight:700;text-decoration:none">Browse Posts</a>' +
    '</div>';
  }

  if (!post)              return notFound('404', 'This post does not exist.');
  if (!BlogEngine.isLive(post)) return notFound('soon', 'This post publishes on ' + BlogEngine.formatDate(post.publishAt) + '.');

  var catStyle = BlogEngine.getCategoryStyle(post.category);

  var AFFILIATE_AD = {
    icon: '📚',
    title: 'JAMB Masterclass Bundle',
    desc: '5,000+ questions, video solutions and answer keys. Offline access included.',
    link: 'https://elitescholars.site/shop',
    cta: 'Get It Now'
  };

  var PARTNER_AD = {
    logo: '🎯',
    title: 'Score 300+ Coaching',
    desc: '30-day intensive programme with live tutors. Limited spots.',
    link: 'https://elitescholars.site/coaching'
  };

  var contentWithAds = BlogEngine.injectAdsIntoContent(post.content, AFFILIATE_AD, PARTNER_AD);

  var otherPosts = BLOG_POSTS.filter(function(p){ return p.id !== post.id && BlogEngine.isLive(p); }).slice(0,2);

  var relatedHtml = '';
  if (otherPosts.length > 0) {
    relatedHtml = '<div class="blog-related"><div class="blog-related-title">More from EliteScholars</div><div class="blog-related-grid">' +
      otherPosts.map(function(rp) {
        var rs = BlogEngine.getCategoryStyle(rp.category);
        var href = '../' + rp.category + '/' + rp.id + '.html';
        return '<a href="' + href + '" class="blog-related-card">' +
          '<span class="blog-related-cat" style="background:' + rs.bg + ';color:' + rs.color + '">' + rs.label + '</span>' +
          '<div class="blog-related-card-title">' + rp.title + '</div>' +
          '<div class="blog-related-meta">' + rp.readTime + ' min read &middot; ' + BlogEngine.formatDate(rp.publishAt) + '</div>' +
        '</a>';
      }).join('') +
    '</div></div>';
  }

  var shareUrl  = encodeURIComponent(window.location.href);
  var shareText = encodeURIComponent(post.title + ' via EliteScholars');

  var SIDEBAR_HTML =
    '<div class="blog-sidebar">' +
      '<div class="blog-sidebar-sticky">' +
        '<div class="blog-sidebar-ad">' +
          '<div class="blog-sidebar-ad-label">Advertisement</div>' +
          '<div class="blog-sidebar-pub-slot">Publisher Ad Space<br/><span style="font-size:10px;margin-top:4px;display:block">300 × 250</span></div>' +
        '</div>' +
        '<div class="blog-sidebar-ad">' +
          '<div class="blog-sidebar-ad-label">Sponsored</div>' +
          '<a href="' + AFFILIATE_AD.link + '" target="_blank" rel="noopener" class="blog-sidebar-aff">' +
            '<div class="blog-sidebar-aff-icon">' + AFFILIATE_AD.icon + '</div>' +
            '<div class="blog-sidebar-aff-title">' + AFFILIATE_AD.title + '</div>' +
            '<div class="blog-sidebar-aff-desc">' + AFFILIATE_AD.desc + '</div>' +
            '<div class="blog-sidebar-aff-cta">' + AFFILIATE_AD.cta + ' &rarr;</div>' +
          '</a>' +
        '</div>' +
        '<div class="blog-sidebar-ad">' +
          '<div class="blog-sidebar-ad-label">Partner</div>' +
          '<a href="' + PARTNER_AD.link + '" target="_blank" rel="noopener" class="blog-sidebar-partner">' +
            '<div class="blog-sidebar-partner-logo">' + PARTNER_AD.logo + '</div>' +
            '<div class="blog-sidebar-partner-title">' + PARTNER_AD.title + '</div>' +
            '<div class="blog-sidebar-partner-desc">' + PARTNER_AD.desc + '</div>' +
          '</a>' +
        '</div>' +
        '<div class="blog-sidebar-ad">' +
          '<div class="blog-sidebar-ad-label">Advertisement</div>' +
          '<div class="blog-sidebar-pub-slot" style="min-height:160px">Publisher Ad Space<br/><span style="font-size:10px;margin-top:4px;display:block">300 × 160</span></div>' +
        '</div>' +
      '</div>' +
    '</div>';

  root.innerHTML =
    '<div class="blog-hero">' +
      '<div class="blog-container">' +
        '<span class="blog-hero-category" style="background:' + catStyle.bg + ';color:' + catStyle.color + '">' + catStyle.label + '</span>' +
        '<h1 class="blog-hero-title">' + post.title + '</h1>' +
        '<p class="blog-hero-excerpt">' + post.excerpt + '</p>' +
        '<div class="blog-meta">' +
          '<div class="blog-author-row">' +
            '<div class="blog-author-avatar">' + BlogEngine.getAvatar(post.authorAvatar) + '</div>' +
            '<span class="blog-author-name">' + post.author + '</span>' +
          '</div>' +
          '<span class="blog-meta-dot">&middot;</span>' +
          '<span class="blog-meta-item">📅 ' + BlogEngine.formatDate(post.publishAt) + '</span>' +
          '<span class="blog-meta-dot">&middot;</span>' +
          '<span class="blog-read-badge">⏱ ' + post.readTime + ' min read</span>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div class="blog-page-layout">' +
      '<div>' +
        '<div class="blog-body">' +
          '<div class="blog-content">' + contentWithAds + '</div>' +
          '<div class="blog-tags">' + post.tags.map(function(t){ return '<span class="blog-tag">' + t + '</span>'; }).join('') + '</div>' +
          '<div class="blog-cta-box">' +
            '<h3>Practice What You Just Learned 🔥</h3>' +
            '<p>Free CBT — JAMB, WAEC, NECO, Post UTME and GST. No signup, no paywall.</p>' +
            '<a href="../../" class="blog-cta-btn">Start Practising Free &rarr;</a>' +
          '</div>' +
          '<div class="blog-share">' +
            '<div class="blog-share-title">Found this helpful? Share it 👇</div>' +
            '<div class="blog-share-btns">' +
              '<a class="blog-share-btn whatsapp" href="https://wa.me/?text=' + shareText + '%20' + shareUrl + '" target="_blank" rel="noopener">' +
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>' +
                'WhatsApp' +
              '</a>' +
              '<a class="blog-share-btn twitter" href="https://twitter.com/intent/tweet?text=' + shareText + '&url=' + shareUrl + '" target="_blank" rel="noopener">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
                'Twitter' +
              '</a>' +
              '<button class="blog-share-btn copy" onclick="navigator.clipboard.writeText(window.location.href).then(function(){this.textContent=\'Copied!\';}.bind(this))">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>' +
                'Copy Link' +
              '</button>' +
            '</div>' +
          '</div>' +
          relatedHtml +
        '</div>' +
      '</div>' +
      SIDEBAR_HTML +
    '</div>';
})();
