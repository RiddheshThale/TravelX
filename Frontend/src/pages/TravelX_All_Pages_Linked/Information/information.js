// Voyageora — Information pages shared JS
// Used by travel-guide.html, blogs.html, blog-details.html, faq.html

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- shared: nav toggle ---------------- */
  const navToggle = document.querySelector('.cp-nav-toggle');
  const navLinks = document.querySelector('.cp-links');
  navToggle?.addEventListener('click', () => navLinks?.classList.toggle('open'));
  navLinks?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---------------- shared: accordion (guide tips + FAQ) ---------------- */
  document.querySelectorAll('.acc-trigger, .faq-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.acc-item, .faq-item');
      const wasOpen = item.classList.contains('open');
      // Close siblings within the same list for a clean single-open accordion
      const list = item.parentElement;
      list.querySelectorAll('.acc-item.open, .faq-item.open').forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove('open');
      });
      item.classList.toggle('open', !wasOpen);
    });
  });

  /* ================= travel-guide.html ================= */
  const guidePage = document.getElementById('guidePage');
  if (guidePage) {
    const chips = document.querySelectorAll('.chip-row .chip');
    const cards = document.querySelectorAll('.guide-card');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.category;
        cards.forEach((card) => card.classList.toggle('hidden', !(cat === 'all' || card.dataset.category === cat)));
      });
    });
  }

  /* ================= blogs.html ================= */
  const blogsPage = document.getElementById('blogsPage');
  if (blogsPage) {
    const chips = document.querySelectorAll('.chip-row .chip');
    const cards = document.querySelectorAll('.blog-card');
    const emptyState = document.getElementById('blogsEmpty');

    function applyFilters() {
      const activeChip = document.querySelector('.chip-row .chip.active');
      const cat = activeChip ? activeChip.dataset.category : 'all';
      const q = (document.getElementById('blogSearch')?.value || '').toLowerCase();
      let visible = 0;
      cards.forEach((card) => {
        const matchesCat = cat === 'all' || card.dataset.category === cat;
        const matchesQuery = card.textContent.toLowerCase().includes(q);
        const show = matchesCat && matchesQuery;
        card.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
    }

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        applyFilters();
      });
    });
    document.getElementById('blogSearch')?.addEventListener('input', applyFilters);

    document.getElementById('loadMoreBtn')?.addEventListener('click', (e) => {
      document.querySelectorAll('.blog-card.extra-hidden').forEach((c) => c.classList.remove('extra-hidden'));
      e.target.style.display = 'none';
    });
  }

  /* ================= blog-details.html ================= */
  const articlePage = document.getElementById('articlePage');
  if (articlePage) {
    document.querySelectorAll('.share-row a[data-share]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = link.dataset.share;
        alert(`Demo: this would open a share dialog for ${platform}.`);
      });
    });
  }

  /* ================= faq.html ================= */
  const faqPage = document.getElementById('faqPage');
  if (faqPage) {
    const tabs = document.querySelectorAll('.faq-tabs button');
    const items = document.querySelectorAll('.faq-item');
    const emptyState = document.getElementById('faqEmpty');

    function applyFaqFilters() {
      const activeTab = document.querySelector('.faq-tabs button.active');
      const cat = activeTab ? activeTab.dataset.category : 'all';
      const q = (document.getElementById('faqSearch')?.value || '').toLowerCase();
      let visible = 0;
      items.forEach((item) => {
        const matchesCat = cat === 'all' || item.dataset.category === cat;
        const matchesQuery = item.textContent.toLowerCase().includes(q);
        const show = matchesCat && matchesQuery;
        item.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        applyFaqFilters();
      });
    });
    document.getElementById('faqSearch')?.addEventListener('input', applyFaqFilters);
  }
});
