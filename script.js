(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Active nav link
  const page = document.body.getAttribute('data-page');
  if (page) {
    document.querySelectorAll('.main-nav a').forEach(a => {
      if (a.getAttribute('data-nav') === page) a.classList.add('active');
    });
  }

  // Simple sticky shadow (no collapsing)
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle('is-sticky', y > 6);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
