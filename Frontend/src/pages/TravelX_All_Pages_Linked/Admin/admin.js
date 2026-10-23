// Shared Admin Panel JS
document.addEventListener('DOMContentLoaded', () => {
  // Auth check
  if (!sessionStorage.getItem('adminLoggedIn') && !window.location.pathname.includes('admin-login')) {
    // Allow demo without strict redirect for static preview
    // window.location.href = 'admin-login.html';
  }

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

  // Logout
  document.querySelectorAll('.logout-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem('adminLoggedIn');
      sessionStorage.removeItem('adminName');
      window.location.href = 'admin-login.html';
    });
  });

  // Modal helpers
  window.openModal = (id) => {
    document.getElementById(id)?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = (id) => {
    document.getElementById(id)?.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Simple search filter for tables
  const searchInput = document.querySelector('.table-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll('tbody tr').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // Animate chart bars if present
  document.querySelectorAll('.chart-bar').forEach(bar => {
    const target = bar.dataset.height || '50%';
    bar.style.height = '0';
    setTimeout(() => {
      bar.style.height = target;
    }, 200);
  });

  // Confirm delete
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!confirm('Are you sure you want to delete this item?')) {
        e.preventDefault();
      }
    });
  });
});