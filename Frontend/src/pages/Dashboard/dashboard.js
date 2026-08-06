/* TravelX — light JS */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  window.addEventListener('load', () => {
    const l = $('#loader');
    if (l) setTimeout(() => l.classList.add('hide'), 200);
  });

  const bar = $('#progressBar');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (bar) {
          const h = document.documentElement;
          const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
          bar.style.width = pct + '%';
        }
        const top = $('#topBtn');
        if (top) top.classList.toggle('show', window.scrollY > 400);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  const topBtn = $('#topBtn');
  if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const menuBtn = $('.menu-btn');
  const mobile = $('.mobile-menu');
  if (menuBtn && mobile) {
    menuBtn.addEventListener('click', () => mobile.classList.toggle('open'));
    $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => mobile.classList.remove('open')));
  }

  $$('.booking-tabs button').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.booking-tabs button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const destInput = $('.booking-box input[type="text"]');
  $$('.popular-search button').forEach(b => {
    b.addEventListener('click', () => {
      if (destInput) destInput.value = b.textContent.trim();
    });
  });
})();
