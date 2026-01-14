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

  // Cache heights so collapsing doesn't change layout (prevents mobile jump)
  let expandedH = 0;
  let collapsedH = 0;

  const measureHeights = () => {
    const prevSticky = header.classList.contains('is-sticky');
    const prevCollapsed = header.classList.contains('is-collapsed');

    // Measure expanded
    header.classList.remove('is-collapsed');
    header.classList.add('is-sticky');
    expandedH = header.offsetHeight;

    // Measure collapsed
    header.classList.add('is-collapsed');
    collapsedH = header.offsetHeight;

    // Restore previous state
    header.classList.toggle('is-sticky', prevSticky);
    header.classList.toggle('is-collapsed', prevCollapsed);
  };

  const setSpacer = (h) => {
    if (!spacer) return;
    spacer.style.height = (h || header.offsetHeight) + 'px';
  };

  // Collapse logic (no flicker, no jump)
  let collapsed = false;
  const COLLAPSE_AT = 60; // when to collapse
  const EXPAND_AT = 10;   // when to expand (near top)

  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;

    header.classList.toggle('is-sticky', y > 2);

    // Decide state using hysteresis
    if (!collapsed && y > COLLAPSE_AT) collapsed = true;
    if (collapsed && y < EXPAND_AT) collapsed = false;

    // Apply state
    header.classList.toggle('is-collapsed', collapsed);

    // Keep spacer constant to expanded height so content never "jumps"
    // (while header visually collapses over it)
    setSpacer(expandedH);

    ticking = false;
  };

  const requestTick = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  };

  // Init
  measureHeights();
  setSpacer(expandedH);
  onScroll();

  // Events
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', () => {
    requestAnimationFrame(() => {
      measureHeights();
      setSpacer(expandedH);
      onScroll();
    });
  }, { passive: true });
})();
