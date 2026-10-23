(() => {
  const current = document.currentScript;
  if (!current || document.getElementById('travelx-global-nav')) return;

  const pagesRoot = new URL('.', current.src);
  const route = p => new URL(p, pagesRoot).href;

  // ========== LINKS ==========
  const mainLinks = [
    { label: '🏠 Home',         href: 'Dashboard/index.html' },
    { label: '🌐 Destinations', href: 'Travel/destinations.html', dropdown: [
        ['India', 'Travel/destinations.html'],
        ['International', 'Travel/destinations.html'],
        ['Weekend Trips', 'Travel/packages.html'],
        ['Beach', 'Travel/destinations.html'],
        ['Mountains', 'Travel/destinations.html'],
        ['Adventure', 'Travel/destinations.html'],
        ['Honeymoon', 'Travel/packages.html'],
        ['Family', 'Travel/packages.html'],
        ['Solo', 'Travel/packages.html']
      ]},
    { label: '📦 Packages',     href: 'Travel/packages.html', dropdown: [
        ['Family', 'Travel/packages.html'],
        ['Luxury', 'Travel/packages.html'],
        ['Budget', 'Travel/packages.html'],
        ['Adventure', 'Travel/packages.html'],
        ['Honeymoon', 'Travel/packages.html'],
        ['Group Tours', 'Travel/packages.html']
      ]},
    { label: '🏨 Hotels',       href: 'Travel/hotels.html' },
    { label: '✈ Flights',       href: 'Travel/flights.html' },
    { label: '📰 Travel Guide', href: 'Information/travel-guide.html' },
    { label: '🎁 Offers',       href: 'Travel/packages.html' },
    { label: '📞 Contact',      href: 'legal_footer/contact.html' }
  ];

  // ========== BUILD NAV ==========
  const nav = document.createElement('header');
  nav.id = 'travelx-global-nav';

  const wrap = document.createElement('div');
  wrap.className = 'tx-wrap';

  // Brand
  const brand = document.createElement('a');
  brand.className = 'tx-brand';
  brand.href = route('Dashboard/index.html');
  brand.innerHTML = `
    <div class="nav-logo">
      <img src="/Frontend/public/images/logo.png" alt="TravelX" />
    </div>
    <span class="gold-text">TravelX</span>
  `;
  wrap.appendChild(brand);

  // Links
  const links = document.createElement('nav');
  links.className = 'tx-links';
  links.id = 'txLinks';

  mainLinks.forEach(item => {
    if (item.dropdown) {
      const details = document.createElement('details');
      details.className = 'tx-drop';
      const sum = document.createElement('summary');
      sum.textContent = item.label + ' ▾';
      details.appendChild(sum);

      const menu = document.createElement('div');
      menu.className = 'tx-menu';
      item.dropdown.forEach(([text, path]) => {
        const a = document.createElement('a');
        a.href = route(path);
        a.textContent = text;
        menu.appendChild(a);
      });
      details.appendChild(menu);
      links.appendChild(details);
    } else {
      const a = document.createElement('a');
      a.href = route(item.href);
      a.textContent = item.label;
      links.appendChild(a);
    }
  });
  wrap.appendChild(links);

  // Actions
  const actions = document.createElement('div');
  actions.className = 'tx-actions';

  // Search button
  const searchBtn = document.createElement('button');
  searchBtn.className = 'icon-btn tx-icon-btn';
  searchBtn.id = 'searchToggle';
  searchBtn.setAttribute('aria-label', 'Search');
  searchBtn.innerHTML = '🔍';
  actions.appendChild(searchBtn);

  // Language
  const lang = document.createElement('select');
  lang.className = 'tx-lang';
  lang.innerHTML = `
    <option value="en">🌐 EN</option>
    <option value="hi">🌐 HI</option>
    <option value="fr">🌐 FR</option>
  `;
  actions.appendChild(lang);

  // Theme
  const themeBtn = document.createElement('button');
  themeBtn.className = 'tx-icon-btn';
  themeBtn.id = 'tx-theme-toggle';
  themeBtn.title = 'Toggle theme';
  themeBtn.innerHTML = '🌙';
  themeBtn.onclick = () => {
    document.body.classList.toggle('light');
    themeBtn.innerHTML = document.body.classList.contains('light') ? '☀️' : '🌙';
    localStorage.setItem('travelx-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  };
  actions.appendChild(themeBtn);

  // Notifications
const notifWrap = document.createElement('div');
notifWrap.className = 'tx-notif-wrap';
notifWrap.style.position = 'relative';

const notif = document.createElement('button');
notif.className = 'tx-icon-btn has-badge';
notif.id = 'notifToggle';
notif.title = 'Notifications';
notif.innerHTML = '🔔<span class="tx-badge">3</span>';
notifWrap.appendChild(notif);

// Notification dropdown
const notifDropdown = document.createElement('div');
notifDropdown.className = 'tx-notif-dropdown';
notifDropdown.id = 'notifDropdown';
notifDropdown.innerHTML = `
  <div class="tx-notif-header">
    <strong>Notifications</strong>
    <button class="tx-notif-clear" id="notifClear">Clear all</button>
  </div>
  <div class="tx-notif-list">
    <div class="tx-notif-item unread">
      <div class="tx-notif-icon">✈️</div>
      <div class="tx-notif-content">
        <p>Your flight to <strong>Goa</strong> is confirmed</p>
        <span>2 hours ago</span>
      </div>
    </div>
    <div class="tx-notif-item unread">
      <div class="tx-notif-icon">🏨</div>
      <div class="tx-notif-content">
        <p>Hotel booking at <strong>Taj Resort</strong> is successful</p>
        <span>5 hours ago</span>
      </div>
    </div>
    <div class="tx-notif-item unread">
      <div class="tx-notif-icon">💰</div>
      <div class="tx-notif-content">
        <p>Special offer: 20% off on <strong>Manali packages</strong></p>
        <span>1 day ago</span>
      </div>
    </div>
    <div class="tx-notif-item">
      <div class="tx-notif-icon">⭐</div>
      <div class="tx-notif-content">
        <p>Rate your recent trip to <strong>Jaipur</strong></p>
        <span>3 days ago</span>
      </div>
    </div>
  </div>
  <a href="#" class="tx-notif-footer">View all notifications</a>
`;
notifWrap.appendChild(notifDropdown);
actions.appendChild(notifWrap);

// Toggle notifications
notif.addEventListener('click', (e) => {
  e.stopPropagation();
  notifDropdown.classList.toggle('open');
  // close search if open
  const searchBar = document.getElementById('navSearch');
  if (searchBar) searchBar.classList.remove('open');
});

  // Wishlist
  const wish = document.createElement('button');
  wish.className = 'tx-icon-btn has-badge';
  wish.title = 'Wishlist';
  wish.innerHTML = '🤍<span class="tx-badge">7</span>';
  wish.onclick = () => location.href = route('User/wishlist.html');
  actions.appendChild(wish);

  // User
  const user = document.createElement('details');
  user.className = 'tx-user';
  user.innerHTML = `
    <summary class="tx-user-chip">
      <span class="tx-avatar">A</span>
      <span class="tx-username">Aarav</span> ▾
    </summary>
    <div class="tx-menu tx-user-menu">
      <a href="${route('User/profile.html')}">My Profile</a>
      <a href="${route('Booking/booking-history.html')}">My Bookings</a>
      <a href="${route('User/wishlist.html')}">Wishlist</a>
      <a href="${route('passworddrama/signout.html')}">Sign Out</a>
    </div>
  `;
  actions.appendChild(user);

  // Book Now
  const bookBtn = document.createElement('a');
  bookBtn.className = 'tx-book-btn';
  bookBtn.href = route('Booking/booking.html');
  bookBtn.textContent = 'Book Now';
  actions.appendChild(bookBtn);

  wrap.appendChild(actions);
    wrap.appendChild(actions);

  // Burger
  const burger = document.createElement('button');
  burger.className = 'tx-burger';
  burger.innerHTML = '☰';
  burger.onclick = () => links.classList.toggle('open');
  wrap.appendChild(burger);

  nav.appendChild(wrap);
  document.body.insertBefore(nav, document.body.firstChild);   // ← after this line

  // ========== 1. LOAD CSS ==========
  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = route('travelx-global-nav.css');
  document.head.appendChild(style);

  // ========== 2. CREATE SEARCH BAR ==========
  if (!document.getElementById('navSearch')) {
    const searchBar = document.createElement('div');
    searchBar.className = 'nav-search';
    searchBar.id = 'navSearch';
    searchBar.innerHTML = `
      <div style="max-width:1400px; margin:0 auto; padding:0 18px;">
        <input type="text" id="navSearchInput" placeholder="Search destinations, hotels, packages…" />
        <ul class="search-results" id="navSearchResults"></ul>
      </div>
    `;
    nav.appendChild(searchBar);
  }

  // ========== 3. TOGGLE SEARCH ==========
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const bar = document.getElementById('navSearch');
    if (bar) {
      bar.classList.toggle('open');
      if (bar.classList.contains('open')) {
        setTimeout(() => {
          const input = document.getElementById('navSearchInput');
          if (input) input.focus();
        }, 50);
      }
    }
  });

  // ========== 4. CLOSE ON OUTSIDE CLICK ==========
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      nav.querySelectorAll('details[open]').forEach(d => d.removeAttribute('open'));
      links.classList.remove('open');
      const bar = document.getElementById('navSearch');
      if (bar) bar.classList.remove('open');
    }
  });

  // ========== 5. RESTORE THEME ==========
  if (localStorage.getItem('travelx-theme') === 'light') {
    document.body.classList.add('light');
    themeBtn.innerHTML = '☀️';
  }
  document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) {
    nav.querySelectorAll('details[open]').forEach(d => d.removeAttribute('open'));
    links.classList.remove('open');
    const bar = document.getElementById('navSearch');
    if (bar) bar.classList.remove('open');
    const notifDrop = document.getElementById('notifDropdown');
    if (notifDrop) notifDrop.classList.remove('open');
  }
});
})();