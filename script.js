// Nexera: mobile menu toggle and sticky header state
(function () {
  var header = document.querySelector('.nx-header');
  var toggle = document.querySelector('.nx-menu-toggle');
  if (!header) return;

  function setMenu(open) {
    header.classList.toggle('is-open', open);
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
  }

  // close the menu after picking an item or pressing Escape
  header.addEventListener('click', function (e) {
    if (e.target.closest('.nx-nav a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('is-open')) {
      setMenu(false);
      if (toggle) toggle.focus();
    }
  });

  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 0);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
