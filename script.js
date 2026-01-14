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

  // Sticky + collapse on scroll
  let ticking = false;

  const update = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle("is-sticky", y > 6);
    header.classList.toggle("is-collapsed", y > 120);
    ticking = false;
  };

  update();
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
})();
