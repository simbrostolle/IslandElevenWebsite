(function () {
  const header = document.querySelector('.site-header');
  const spacer = document.querySelector('.header-spacer');
  if (!header) return;

  // Active nav link
  const page = document.body.getAttribute('data-page');
  if (page) {
    document.querySelectorAll('.main-nav a').forEach(a => {
      if (a.getAttribute('data-nav') === page) a.classList.add('active');
    });
  }

  // Keep spacer height synced to header height (prevents mobile "jump")
  const syncSpacer = () => {
    if (!spacer) return;
    spacer.style.height = header.offsetHeight + 'px';
  };

  // Collapse logic with hysteresis (prevents desktop flicker)
  let collapsed = false;
  const COLLAPSE_AT = 60;   // collapse quickly
  const EXPAND_AT = 10;     // expand only very near top

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;

    header.classList.toggle('is-sticky', y > 2);

    if (!collapsed && y > COLLAPSE_AT) collapsed = true;
    if (collapsed && y < EXPAND_AT) collapsed = false;

    header.classList.toggle('is-collapsed', collapsed);

    // spacer must update when header changes size
    syncSpacer();
  };

  // Initial
  syncSpacer();
  onScroll();

  // Events
  window.addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  window.addEventListener('resize', () => requestAnimationFrame(() => { syncSpacer(); onScroll(); }), { passive: true });
})();
