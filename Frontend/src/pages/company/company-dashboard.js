// Company / Partner Dashboard JS
document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle (mobile)
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay?.classList.toggle('open');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Smooth scroll for in-page sidebar links (Bookings / Listings / etc.)
  document.querySelectorAll('[data-tab-target]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        sidebar?.classList.remove('open');
        overlay?.classList.remove('open');
      }
    });
  });

  // Logout
  document.querySelectorAll('.logout-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem('companyLoggedIn');
      window.location.href = '../Admin_and_legal/admin-login.html';
    });
  });

  // Modal helpers (shared pattern with admin.js)
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
      if (e.target === ov) {
        ov.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Add-listing form: fake submit -> new card
  const addListingForm = document.getElementById('addListingForm');
  if (addListingForm) {
    addListingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('listingName').value.trim() || 'New Listing';
      const price = document.getElementById('listingPrice').value || '0';
      const grid = document.querySelector('.listing-grid');
      if (grid) {
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.innerHTML = `
          <div class="listing-thumb" style="background-image:url('https://picsum.photos/seed/${encodeURIComponent(name)}/400/300')">
            <span class="status review">In Review</span>
          </div>
          <div class="listing-body">
            <h3>${name}</h3>
            <div class="listing-meta">Newly submitted</div>
            <div class="listing-footer">
              <span class="listing-price">₹${Number(price).toLocaleString('en-IN')}</span>
              <div class="row-actions">
                <button class="icon-btn-sm" title="Edit">✏️</button>
                <button class="icon-btn-sm btn-delete" title="Delete">🗑️</button>
              </div>
            </div>
          </div>`;
        grid.prepend(card);
      }
      addListingForm.reset();
      closeModal('addListingModal');
      bindDeleteButtons();
    });
  }

  // Search filter across bookings + listings tables
  const searchInput = document.querySelector('.table-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll('tbody tr').forEach((row) => {
        row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  // Animate chart bars
  document.querySelectorAll('.chart-bar').forEach((bar) => {
    const target = bar.dataset.height || '50%';
    bar.style.height = '0';
    setTimeout(() => { bar.style.height = target; }, 200);
  });

  function bindDeleteButtons() {
    document.querySelectorAll('.btn-delete').forEach((btn) => {
      btn.onclick = () => {
        if (confirm('Remove this listing?')) {
          btn.closest('.listing-card')?.remove();
        }
      };
    });
  }
  bindDeleteButtons();
});