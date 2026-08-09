// Voyageora — Company pages shared JS
// Used by reviews.html, our-team.html, careers.html

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- shared: nav toggle ---------------- */
  const navToggle = document.querySelector('.cp-nav-toggle');
  const navLinks = document.querySelector('.cp-links');
  navToggle?.addEventListener('click', () => navLinks?.classList.toggle('open'));
  navLinks?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---------------- shared: modal helpers ---------------- */
  window.openModal = (id) => {
    document.getElementById(id)?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeModal = (id) => {
    document.getElementById(id)?.classList.remove('open');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('.modal-overlay').forEach((ov) => {
    ov.addEventListener('click', (e) => {
      if (e.target === ov) { ov.classList.remove('open'); document.body.style.overflow = ''; }
    });
  });

  /* ================= reviews.html ================= */
  const reviewsPage = document.getElementById('reviewsPage');
  if (reviewsPage) {
    // Filter by star rating
    const chips = document.querySelectorAll('.review-filter-bar .chip');
    const cards = document.querySelectorAll('.review-card');

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const rating = chip.dataset.rating;
        cards.forEach((card) => {
          const show = rating === 'all' || card.dataset.rating === rating;
          card.classList.toggle('hidden', !show);
        });
      });
    });

    // Load more (reveals extra reviews marked data-extra)
    document.getElementById('loadMoreBtn')?.addEventListener('click', (e) => {
      document.querySelectorAll('.review-card.extra-hidden').forEach((c) => c.classList.remove('extra-hidden'));
      e.target.style.display = 'none';
    });

    // Star rating input in "write a review" modal
    const starInput = document.getElementById('starInput');
    let selectedRating = 5;
    if (starInput) {
      const stars = starInput.querySelectorAll('span');
      stars.forEach((star) => {
        star.addEventListener('click', () => {
          selectedRating = Number(star.dataset.value);
          stars.forEach((s) => s.classList.toggle('filled', Number(s.dataset.value) <= selectedRating));
        });
      });
    }

    document.getElementById('reviewForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reviewerName').value.trim() || 'Anonymous Traveller';
      const text = document.getElementById('reviewText').value.trim() || 'Great experience overall!';
      const grid = document.querySelector('.review-grid');
      if (grid) {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.dataset.rating = String(selectedRating);
        card.innerHTML = `
          <div class="review-card-top">
            <div class="review-avatar">${name.charAt(0).toUpperCase()}</div>
            <div>
              <div class="review-name">${name}</div>
              <div class="review-date">Just now</div>
            </div>
          </div>
          <div class="review-stars">${'★'.repeat(selectedRating)}${'☆'.repeat(5 - selectedRating)}</div>
          <p class="review-text">${text}</p>`;
        grid.prepend(card);
      }
      e.target.reset();
      closeModal('writeReviewModal');
      alert('Thank you! Your review has been submitted.');
    });
  }

  /* ================= our-team.html ================= */
  const teamPage = document.getElementById('teamPage');
  if (teamPage) {
    const tabs = document.querySelectorAll('.dept-tabs button');
    const cards = document.querySelectorAll('.team-card');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const dept = tab.dataset.dept;
        cards.forEach((card) => {
          card.classList.toggle('hidden', !(dept === 'all' || card.dataset.dept === dept));
        });
      });
    });
  }

  /* ================= careers.html ================= */
  const careersPage = document.getElementById('careersPage');
  if (careersPage) {
    const jobs = document.querySelectorAll('.job-card');
    const emptyState = document.getElementById('jobsEmpty');

    function applyJobFilters() {
      const q = (document.getElementById('jobsSearch')?.value || '').toLowerCase();
      const dept = document.getElementById('deptSelect')?.value || 'all';
      const loc = document.getElementById('locSelect')?.value || 'all';
      let visible = 0;

      jobs.forEach((job) => {
        const matchesQuery = job.textContent.toLowerCase().includes(q);
        const matchesDept = dept === 'all' || job.dataset.dept === dept;
        const matchesLoc = loc === 'all' || job.dataset.location === loc;
        const show = matchesQuery && matchesDept && matchesLoc;
        job.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
    }

    document.getElementById('jobsSearch')?.addEventListener('input', applyJobFilters);
    document.getElementById('deptSelect')?.addEventListener('change', applyJobFilters);
    document.getElementById('locSelect')?.addEventListener('change', applyJobFilters);

    // Job detail modal
    document.querySelectorAll('.btn-view-job').forEach((btn) => {
      btn.addEventListener('click', () => {
        const job = btn.closest('.job-card');
        document.getElementById('jobModalTitle').textContent = job.querySelector('h3')?.textContent || '';
        document.getElementById('jobModalMeta').innerHTML = job.querySelector('.job-meta')?.innerHTML || '';
        const desc = job.dataset.description || 'No description provided.';
        document.getElementById('jobModalDesc').textContent = desc;
        openModal('jobDetailModal');
      });
    });

    document.getElementById('applyForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thanks for applying! Our talent team will be in touch soon.');
      e.target.reset();
      closeModal('jobDetailModal');
    });
  }
});
