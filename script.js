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

  // Collapse quickly, expand only when near the top (prevents flicker)
  const STICKY_AT = 2;
  const COLLAPSE_AT = 20;
  const EXPAND_AT = 5;

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

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
