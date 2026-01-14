(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;

  // Active nav link
  const page = document.body.getAttribute("data-page");
  if (page) {
    document.querySelectorAll(".main-nav a").forEach((a) => {
      if (a.getAttribute("data-nav") === page) a.classList.add("active");
    });
  }

  // --- Sticky + collapse with hysteresis (prevents flicker) ---
  const STICKY_AT = 6;

  // Collapse when scrolling DOWN past this
  const COLLAPSE_AT = 160;

  // Expand when scrolling UP above this (lower than collapse threshold)
  const EXPAND_AT = 90;

  let isCollapsed = false;
  let ticking = false;

  const update = () => {
    const y = window.scrollY || document.documentElement.scrollTop;

    header.classList.toggle("is-sticky", y > STICKY_AT);

    if (!isCollapsed && y > COLLAPSE_AT) {
      isCollapsed = true;
      header.classList.add("is-collapsed");
    } else if (isCollapsed && y < EXPAND_AT) {
      isCollapsed = false;
      header.classList.remove("is-collapsed");
    }

    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  // Initial paint
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
