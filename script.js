(function () {
  // Active nav link
  const page = document.body.getAttribute('data-page');
  if (page) {
    document.querySelectorAll('.main-nav a').forEach(a => {
      if (a.getAttribute('data-nav') === page) a.classList.add('active');
    });
  }
})();
