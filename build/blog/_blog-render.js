(function() {
  var grid = document.getElementById('blog-grid');
  var livePosts = BLOG_POSTS.filter(function(p){ return BlogEngine.isLive(p); });

  if (livePosts.length === 0) {
    grid.innerHTML = '<div style="padding:60px 0;text-align:center;color:#9CA3AF;grid-column:1/-1;">No posts published yet. Check back soon!</div>';
    return;
  }

  var CARD_SVGS = {
    jamb: '<svg width="100%" height="100%" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#EDE9FE"/><rect x="40" y="32" width="180" height="16" rx="8" fill="#C4B5FD"/><rect x="40" y="58" width="140" height="10" rx="5" fill="#DDD6FE"/><rect x="40" y="76" width="160" height="10" rx="5" fill="#DDD6FE"/><rect x="40" y="94" width="120" height="10" rx="5" fill="#DDD6FE"/><circle cx="256" cy="130" r="32" fill="#8B5CF6"/><text x="256" y="138" text-anchor="middle" fill="#fff" font-size="22" font-weight="900" font-family="sans-serif">J</text></svg>',
    'study-tips': '<svg width="100%" height="100%" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="180" fill="#DBEAFE"/><rect x="80" y="20" width="160" height="140" rx="12" fill="#BFDBFE"/><rect x="100" y="40" width="120" height="10" rx="5" fill="#1D4ED8"/><rect x="100" y="58" width="90" height="8" rx="4" fill="#93C5FD"/><rect x="100" y="72" width="100" height="8" rx="4" fill="#93C5FD"/><rect x="100" y="86" width="80" height="8" rx="4" fill="#93C5FD"/><circle cx="228" cy="148" r="26" fill="#1D4ED8"/><text x="228" y="156" text-anchor="middle" fill="#fff" font-size="16" font-weight="900" font-family="sans-serif">✓</text></svg>',
  };

  function getCardSvg(cat) { return CARD_SVGS[cat] || CARD_SVGS['study-tips']; }

  grid.innerHTML = livePosts.map(function(post) {
    var catStyle = BlogEngine.getCategoryStyle(post.category);
    var postUrl  = post.category + '/' + post.id + '.html';
    return '<a href="' + postUrl + '" class="blog-card">' +
      '<div class="blog-card-img">' + getCardSvg(post.category) + '</div>' +
      '<div class="blog-card-body">' +
        '<span class="blog-card-cat" style="background:' + catStyle.bg + ';color:' + catStyle.color + '">' + catStyle.label + '</span>' +
        '<h2 class="blog-card-title">' + post.title + '</h2>' +
        '<p class="blog-card-excerpt">' + post.excerpt + '</p>' +
        '<div class="blog-card-footer">' +
          '<div class="blog-card-author">' +
            '<div class="blog-card-avatar">' + BlogEngine.getAvatar(post.authorAvatar) + '</div>' +
            '<span class="blog-card-author-name">' + post.author + '</span>' +
          '</div>' +
          '<div class="blog-card-meta"><span>' + BlogEngine.formatDate(post.publishAt) + '</span><span>' + post.readTime + ' min</span></div>' +
        '</div>' +
      '</div>' +
    '</a>';
  }).join('');

  var bar = document.getElementById('blog-progress-bar');
  window.addEventListener('scroll', function(){
    var el = document.documentElement;
    var pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, {passive: true});
})();