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

  // active menu item follows the section currently in view
  var links = Array.prototype.slice.call(header.querySelectorAll('.nx-nav a[href^="#"]'));
  var targets = ['solutions', 'services', 'footprint', 'projects', 'careers', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  function updateActive() {
    var probe = header.offsetHeight + window.innerHeight * 0.25;
    var current = null;
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top <= probe) current = el.id;
    });
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + current;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  }

  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 0);
    updateActive();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
