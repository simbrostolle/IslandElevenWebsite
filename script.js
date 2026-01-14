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

  // --- Helper: lock layout so header collapse doesn't "jump" content ---
  const setBodyPadToHeader = () => {
    // Use getBoundingClientRect for more reliable current height
    const h = Math.round(header.getBoundingClientRect().height);
    document.body.style.paddingTop = h + "px";
  };

  // Initial: lock to current header height
  setBodyPadToHeader();

  // Recompute on resize/orientation change (mobile)
  window.addEventListener("resize", () => {
    // Let the browser finish layout first
    requestAnimationFrame(setBodyPadToHeader);
  });

  // Sticky + collapse (stable thresholds, no flicker)
  const STICKY_AT = 2;
  const COLLAPSE_AT = 80; // collapse a bit later to avoid instant jump feeling
  const EXPAND_AT = 10;

  let isCollapsed = false;
  let ticking = false;

  const update = () => {
    const y = window.scrollY || document.documentElement.scrollTop;

    header.classList.toggle("is-sticky", y > STICKY_AT);

    let changed = false;

    if (!isCollapsed && y > COLLAPSE_AT) {
      isCollapsed = true;
      header.classList.add("is-collapsed");
      changed = true;
    } else if (isCollapsed && y < EXPAND_AT) {
      isCollapsed = false;
      header.classList.remove("is-collapsed");
      changed = true;
    }

    // If header height changed, update body padding after class applies
    if (changed) requestAnimationFrame(setBodyPadToHeader);

    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  // Run once more after everything loads (images/fonts can affect height)
  window.addEventListener("load", () => requestAnimationFrame(setBodyPadToHeader));

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
