(function () {
  const header = document.querySelector(".site-header");
  const spacer = document.querySelector(".header-spacer");
  if (!header) return;

  // Active nav link
  const page = document.body.getAttribute("data-page");
  if (page) {
    document.querySelectorAll(".main-nav a").forEach((a) => {
      if (a.getAttribute("data-nav") === page) a.classList.add("active");
    });
  }

  const STICKY_AT = 6;
  const COLLAPSE_AT = 160;
  const EXPAND_AT = 90;

  let isCollapsed = false;
  let ticking = false;

  const syncSpacer = () => {
    if (!spacer) return;
    spacer.style.height = header.offsetHeight + "px";
  };

  const update = () => {
    const y = window.scrollY || document.documentElement.scrollTop;

    header.classList.toggle("is-sticky", y > STICKY_AT);

    // Toggle collapsed state
    if (!isCollapsed && y > COLLAPSE_AT) {
      isCollapsed = true;
      header.classList.add("is-collapsed");
    } else if (isCollapsed && y < EXPAND_AT) {
      isCollapsed = false;
      header.classList.remove("is-collapsed");
    }

    // After classes apply, measure the new header height and set spacer
    requestAnimationFrame(syncSpacer);

    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  // Initial paint + keep spacer correct on resize/load
  syncSpacer();
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => requestAnimationFrame(syncSpacer));
  window.addEventListener("load", () => requestAnimationFrame(syncSpacer));
})();
