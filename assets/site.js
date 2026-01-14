(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  let collapsed = false;

  // Two thresholds prevent rapid flip-flopping (hysteresis)
  const COLLAPSE_AT = 140;  // collapse after scrolling down a bit
  const EXPAND_AT   = 70;   // expand when user scrolls back near top

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;

    header.classList.toggle("is-sticky", y > 6);

    if (!collapsed && y > COLLAPSE_AT) {
      header.classList.add("is-collapsed");
      collapsed = true;
    } else if (collapsed && y < EXPAND_AT) {
      header.classList.remove("is-collapsed");
      collapsed = false;
    }
  };

  // Run once + on scroll (passive for performance)
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
