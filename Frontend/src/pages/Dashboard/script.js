/* ================= TravelX — frontend interactions ================= */
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const img = (id, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

/* ---------------- data ---------------- */
const DESTINATIONS = [
  { name: "Goa", country: "India", price: "₹12,999", img: "photo-1512343879784-a960bf40e7f2", tag: "Beach" },
  { name: "Manali", country: "India", price: "₹9,499", img: "photo-1626621341517-bbf3d9990a23", tag: "Mountain" },
  { name: "Dubai", country: "UAE", price: "₹38,999", img: "photo-1512453979798-5ea266f8880c", tag: "Luxury" },
  { name: "Bali", country: "Indonesia", price: "₹44,500", img: "photo-1537996194471-e657df975ab4", tag: "Island" },
  { name: "Kashmir", country: "India", price: "₹15,999", img: "photo-1595815771614-ade9d652a65d", tag: "Snow" },
  { name: "Jaipur", country: "India", price: "₹7,299", img: "photo-1477587458883-47145ed94245", tag: "Heritage" },
  { name: "Singapore", country: "Singapore", price: "₹52,000", img: "photo-1525625293386-3f8f99389edd", tag: "City" },
  { name: "Maldives", country: "Maldives", price: "₹68,999", img: "photo-1514282401047-d79a71a590e8", tag: "Honeymoon" },
];

const WHY = [
  { ico: "💰", t: "Best Price Guarantee", d: "Found it cheaper? We match the price instantly." },
  { ico: "🛡", t: "Secure Payments", d: "256-bit encrypted checkout with every major method." },
  { ico: "☎", t: "24×7 Support", d: "Real humans on call wherever you are in the world." },
  { ico: "✅", t: "Free Cancellation", d: "Plans change. Cancel free up to 48 hours before." },
];

const PACKAGES = [
  { t: "Goa Beach Escape", s: "4 Days · 3 Nights", p: "₹12,999", r: "4.8", c: "beach", img: "photo-1512343879784-a960bf40e7f2" },
  { t: "Manali Snow Trip", s: "5 Days · 4 Nights", p: "₹14,499", r: "4.7", c: "mountain", img: "photo-1626621341517-bbf3d9990a23" },
  { t: "Dubai Luxury Tour", s: "6 Days · 5 Nights", p: "₹58,999", r: "4.9", c: "luxury international", img: "photo-1512453979798-5ea266f8880c" },
  { t: "Bali Honeymoon", s: "7 Days · 6 Nights", p: "₹64,500", r: "4.9", c: "beach international", img: "photo-1537996194471-e657df975ab4" },
  { t: "Kashmir Valley", s: "6 Days · 5 Nights", p: "₹21,999", r: "4.8", c: "mountain", img: "photo-1595815771614-ade9d652a65d" },
  { t: "Maldives Villa Stay", s: "5 Days · 4 Nights", p: "₹89,000", r: "5.0", c: "luxury international", img: "photo-1514282401047-d79a71a590e8" },
];

const FILTERS = [
  { k: "all", l: "All" },
  { k: "beach", l: "Beach" },
  { k: "mountain", l: "Mountain" },
  { k: "luxury", l: "Luxury" },
  { k: "international", l: "International" },
];

const CATEGORIES = [
  { ico: "🏖", t: "Beach Holidays", d: "Sun, sand and slow mornings." },
  { ico: "🏔", t: "Mountain Treks", d: "Peaks, passes and pine trails." },
  { ico: "🛕", t: "Heritage Tours", d: "Forts, temples and old cities." },
  { ico: "🪂", t: "Adventure", d: "Dive, ski, raft and fly." },
];

const INTERNATIONAL = [
  { n: "Turkey", d: "Turkey is where ancient history meets modern charm. From the colourful streets of Istanbul to the surreal landscapes of Cappadocia, it blends culture, architecture and flavour.", img: "photo-1541432901042-2d8bd64b4a9b" },
  { n: "Bali", d: "A tropical paradise known for serene beaches, lush rice terraces and a spiritual vibe — ideal for adventure seekers and peace seekers alike.", img: "photo-1537996194471-e657df975ab4" },
  { n: "Thailand", d: "Lively cities, golden temples and crystal-clear beaches. From Bangkok's buzz to calm islands and legendary street food.", img: "photo-1528181304800-259b08848526" },
  { n: "Japan", d: "Ancient temples meet futuristic cities. Cherry blossoms in Kyoto, neon streets in Tokyo, and unmatched hospitality.", img: "photo-1492571350019-22de08371fd3" },
  { n: "Italy", d: "A dream for history and food lovers — Rome's ruins, Venice's canals and Tuscany's vineyards, with pasta and gelato throughout.", img: "photo-1523906834658-6e24ef2386f9" },
];

const FEATURED_INDIA = [
  { n: "Coorg", img: "photo-1585320806297-9794b3e4eeae" },
  { n: "Kerala", img: "photo-1602216056096-3b40cc0c9944" },
  { n: "Andaman", img: "photo-1544644181-1484b3fdfc62" },
  { n: "Udaipur", img: "photo-1477587458883-47145ed94245" },
];

const INDIA_GRID = [
  { n: "Ladakh", img: "photo-1581793745862-99fde7fa73d2" },
  { n: "Rajasthan", img: "photo-1477587458883-47145ed94245" },
  { n: "Spiti", img: "photo-1626621341517-bbf3d9990a23" },
  { n: "Meghalaya", img: "photo-1595815771614-ade9d652a65d" },
];

const COUNTRIES = [
  { n: "United Arab Emirates", s: "Visa on arrival", img: "photo-1512453979798-5ea266f8880c" },
  { n: "Thailand", s: "e-Visa in 72 hrs", img: "photo-1528181304800-259b08848526" },
  { n: "Singapore", s: "Visa assistance", img: "photo-1525625293386-3f8f99389edd" },
  { n: "Switzerland", s: "Schengen support", img: "photo-1530122037265-a5f1f91d3b99" },
];

const TESTIMONIALS = [
  { q: "Booked our Bali honeymoon in 10 minutes. The itinerary was perfect and the support team answered at 2 AM.", n: "Ananya & Rohit", r: "Mumbai" },
  { q: "Best price on our Dubai package by a clear margin, and free cancellation saved us when plans changed.", n: "Karan Mehta", r: "Delhi" },
  { q: "The Kashmir trip was flawless — great hotels, thoughtful drivers and zero hidden charges.", n: "Sneha Iyer", r: "Bengaluru" },
];

const GALLERY = [
  "photo-1512343879784-a960bf40e7f2",
  "photo-1537996194471-e657df975ab4",
  "photo-1528181304800-259b08848526",
  "photo-1492571350019-22de08371fd3",
  "photo-1523906834658-6e24ef2386f9",
  "photo-1514282401047-d79a71a590e8",
  "photo-1525625293386-3f8f99389edd",
  "photo-1477587458883-47145ed94245",
];

const BLOG = [
  { t: "10 underrated beaches in India", s: "5 min read · Beaches", img: "photo-1512343879784-a960bf40e7f2" },
  { t: "A first-timer's guide to Bali", s: "8 min read · Guides", img: "photo-1537996194471-e657df975ab4" },
  { t: "How to pack for a snow trip", s: "4 min read · Tips", img: "photo-1626621341517-bbf3d9990a23" },
];

const FAQS = [
  { q: "How do I book a package?", a: "Pick a package, choose your dates and travellers, then pay securely online. You'll get a confirmation email with the full itinerary within minutes." },
  { q: "Can I cancel for free?", a: "Yes — most bookings can be cancelled free of charge up to 48 hours before departure. The exact policy is shown before payment." },
  { q: "Do you help with visas?", a: "We provide documentation checklists and end-to-end visa assistance for all featured countries." },
  { q: "Are flights included in packages?", a: "Packages marked 'with flights' include return airfare. Others cover stays, transfers and activities only." },
  { q: "What payment methods are accepted?", a: "UPI, all major credit and debit cards, net banking and EMI options on select banks." },
];

const PARTNERS = ["Emirates", "IndiGo", "Marriott", "Taj Hotels", "Qatar Airways", "Oberoi", "Visa", "Razorpay"];

/* ---------------- render helpers ---------------- */
const stars = (r) => "★".repeat(Math.round(Number(r) || 5));

function renderDestinations() {
  const el = $("#destGrid");
  if (!el) return;
  el.innerHTML = DESTINATIONS.map(
    (d) => `
    <article class="card reveal">
      <div class="thumb"><img loading="lazy" src="${img(d.img)}" alt="${d.name}" /><span class="tag">${d.tag}</span></div>
      <div class="card-body">
        <h3>${d.name}</h3>
        <p class="sub">${d.country}</p>
        <div class="card-row"><span class="stars">★★★★★</span><span class="price">${d.price}</span></div>
      </div>
    </article>`
  ).join("");
}

function renderWhy() {
  const el = $("#whyGrid");
  if (!el) return;
  el.innerHTML = WHY.map(
    (w) => `<div class="feature reveal"><div class="ico">${w.ico}</div><h3>${w.t}</h3><p>${w.d}</p></div>`
  ).join("");
}

function renderPackages(filter = "all") {
  const el = $("#pkgGrid");
  if (!el) return;
  const list = filter === "all" ? PACKAGES : PACKAGES.filter((p) => p.c.includes(filter));
  el.innerHTML = list
    .map(
      (p) => `
    <article class="card reveal">
      <div class="thumb"><img loading="lazy" src="${img(p.img)}" alt="${p.t}" /><span class="tag">${p.s.split("·")[0].trim()}</span></div>
      <div class="card-body">
        <h3>${p.t}</h3>
        <p class="sub">${p.s}</p>
        <div class="card-row">
          <span class="stars">${stars(p.r)} ${p.r}</span>
          <span class="price">${p.p}</span>
        </div>
        <div class="card-row" style="margin-top:14px">
          <button class="btn-ghost">Details</button>
          <button class="btn-gold">Book Now</button>
        </div>
      </div>
    </article>`
    )
    .join("");
  revealInit();
}

function renderFilters() {
  const el = $("#pkgFilters");
  if (!el) return;
  el.innerHTML = FILTERS.map(
    (f, i) => `<button class="filter ${i === 0 ? "active" : ""}" data-filter="${f.k}">${f.l}</button>`
  ).join("");
  el.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter", el).forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderPackages(btn.dataset.filter);
  });
}

function renderCategories() {
  const el = $("#catGrid");
  if (!el) return;
  el.innerHTML = CATEGORIES.map(
    (c) => `<div class="feature reveal"><div class="ico">${c.ico}</div><h3>${c.t}</h3><p>${c.d}</p></div>`
  ).join("");
}

function renderCountries() {
  const el = $("#countryGrid");
  if (!el) return;
  el.innerHTML = COUNTRIES.map(
    (c) => `
    <article class="card reveal">
      <div class="thumb"><img loading="lazy" src="${img(c.img)}" alt="${c.n}" /></div>
      <div class="card-body"><h3>${c.n}</h3><p class="sub">${c.s}</p></div>
    </article>`
  ).join("");
}

function renderGallery() {
  const el = $("#galleryGrid");
  if (!el) return;
  el.innerHTML = GALLERY.map(
    (g, i) => `<div class="gallery-item reveal"><img loading="lazy" src="${img(g, 600)}" alt="Traveller photo ${i + 1}" /></div>`
  ).join("");
}

function renderBlog() {
  const el = $("#blogGrid");
  if (!el) return;
  el.innerHTML = BLOG.map(
    (b) => `
    <article class="card reveal">
      <div class="thumb"><img loading="lazy" src="${img(b.img)}" alt="${b.t}" /></div>
      <div class="card-body"><h3>${b.t}</h3><p class="sub">${b.s}</p><a class="btn-ghost" href="#blog">Read story →</a></div>
    </article>`
  ).join("");
}

function renderMarquee() {
  const el = $("#marquee");
  if (!el) return;
  const row = PARTNERS.map((p) => `<span>${p}</span>`).join("");
  el.innerHTML = row + row;
}

/* ---------------- FAQ ---------------- */
function renderFaq() {
  const el = $("#faqList");
  if (!el) return;
  el.innerHTML = FAQS.map(
    (f) => `
    <div class="faq-item">
      <button class="faq-q" type="button">${f.q}<span>+</span></button>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>`
  ).join("");
  el.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq-q");
    if (!btn) return;
    const item = btn.parentElement;
    const wasOpen = item.classList.contains("open");
    $$(".faq-item", el).forEach((i) => i.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
}

/* ---------------- International slider ---------------- */
function initIntl() {
  const track = $("#intlTrack");
  if (!track) return;
  track.innerHTML = INTERNATIONAL.map(
    (c) => `
    <div class="intl-card">
      <div class="intl-img"><img loading="lazy" src="${img(c.img)}" alt="${c.n}" /></div>
      <h3>${c.n} <span>★★★★★</span></h3>
      <p>${c.d}</p>
    </div>`
  ).join("");

  const step = () => track.clientWidth * 0.6;
  $("#intlNext")?.addEventListener("click", () => {
    const max = track.scrollWidth - track.clientWidth - 4;
    track.scrollLeft = track.scrollLeft >= max ? 0 : track.scrollLeft + step();
  });
  $("#intlPrev")?.addEventListener("click", () => {
    track.scrollLeft = track.scrollLeft <= 4 ? track.scrollWidth : track.scrollLeft - step();
  });
}

/* ---------------- India explorations ---------------- */
function initIndia() {
  const slidesEl = $("#featuredSlides");
  const gridEl = $("#indiaGrid");
  if (!slidesEl || !gridEl) return;

  slidesEl.innerHTML = FEATURED_INDIA.map(
    (f, i) => `<div class="featured-slide ${i === 0 ? "active" : ""}"><img loading="lazy" src="${img(f.img, 1000)}" alt="${f.n}" /></div>`
  ).join("");

  gridEl.innerHTML = INDIA_GRID.map(
    (d) => `
    <a class="dest-card" href="#packages">
      <img loading="lazy" src="${img(d.img, 600)}" alt="${d.n}" />
      <span class="overlay"><span class="label">${d.n}</span></span>
    </a>`
  ).join("");

  let idx = 0;
  const slides = $$(".featured-slide", slidesEl);
  const nameEl = $("#featuredName");
  const show = (n) => {
    idx = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === idx));
    if (nameEl) nameEl.textContent = FEATURED_INDIA[idx].n;
  };
  $("#featNext")?.addEventListener("click", () => show(idx + 1));
  $("#featPrev")?.addEventListener("click", () => show(idx - 1));
  setInterval(() => show(idx + 1), 5000);
}

/* ---------------- Testimonials ---------------- */
function initTestimonials() {
  const el = $("#testiSlides");
  if (!el) return;
  el.innerHTML = TESTIMONIALS.map(
    (t) => `
    <div class="slide">
      <span class="stars">★★★★★</span>
      <p>“${t.q}”</p>
      <h4 class="gold-text">${t.n}</h4>
      <p style="font-style:normal;font-size:var(--fs-xs);color:var(--muted)">${t.r}</p>
    </div>`
  ).join("");

  let i = 0;
  const go = (n) => {
    i = (n + TESTIMONIALS.length) % TESTIMONIALS.length;
    el.style.transform = `translateX(-${i * 100}%)`;
  };
  $("#testiNext")?.addEventListener("click", () => go(i + 1));
  $("#testiPrev")?.addEventListener("click", () => go(i - 1));
  setInterval(() => go(i + 1), 6000);
}

/* ---------------- Navbar ---------------- */
function initNav() {
  const navbar = $("#navbar");
  const links = $("#navLinks");

  $("#burger")?.addEventListener("click", () => links?.classList.toggle("open"));
  links?.addEventListener("click", (e) => {
    if (e.target.tagName === "A") links.classList.remove("open");
  });

  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 20);
    $("#toTop")?.classList.toggle("show", window.scrollY > 500);
  });

  $("#toTop")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // theme
  const themeBtn = $("#themeToggle");
  const saved = localStorage.getItem("travelx-theme");
  if (saved === "light") { document.body.classList.add("light"); if (themeBtn) themeBtn.textContent = "☀"; }
  themeBtn?.addEventListener("click", () => {
    const light = document.body.classList.toggle("light");
    themeBtn.textContent = light ? "☀" : "🌙";
    localStorage.setItem("travelx-theme", light ? "light" : "dark");
  });

  // nav search
  const search = $("#navSearch");
  const input = $("#navSearchInput");
  const results = $("#navSearchResults");
  $("#searchToggle")?.addEventListener("click", () => {
    search?.classList.toggle("open");
    if (search?.classList.contains("open")) input?.focus();
  });
  input?.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ""; return; }
    const hits = [
      ...DESTINATIONS.map((d) => `${d.name} — ${d.country}`),
      ...PACKAGES.map((p) => `${p.t} — ${p.p}`),
    ].filter((s) => s.toLowerCase().includes(q)).slice(0, 6);
    results.innerHTML = hits.length
      ? hits.map((h) => `<li>${h}</li>`).join("")
      : `<li>No results for “${input.value}”</li>`;
  });

  // active link on scroll
  const sections = $$("section[id]");
  window.addEventListener("scroll", () => {
    const y = window.scrollY + 120;
    let current = "home";
    sections.forEach((s) => { if (s.offsetTop <= y) current = s.id; });
    $$(".nav-links > a").forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`)
    );
  });
}

/* ---------------- Hero search ---------------- */
function initHeroSearch() {
  $("#heroTabs")?.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    $$("#heroTabs .tab").forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });

  const input = $("#destInput");
  const box = $("#suggestions");
  input?.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const hits = DESTINATIONS.filter((d) => d.name.toLowerCase().includes(q));
    if (!q || !hits.length) { box.hidden = true; return; }
    box.hidden = false;
    box.innerHTML = hits.slice(0, 5).map((d) => `<li>${d.name}, ${d.country}</li>`).join("");
  });
  box?.addEventListener("click", (e) => {
    if (e.target.tagName !== "LI") return;
    input.value = e.target.textContent.split(",")[0];
    box.hidden = true;
  });
  document.addEventListener("click", (e) => {
    if (box && !box.contains(e.target) && e.target !== input) box.hidden = true;
  });

  $("#searchBar")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const where = input?.value.trim();
    const note = $("#searchNote");
    if (note) {
      note.textContent = where
        ? `Searching ${$("#heroTabs .tab.active")?.textContent.trim()} for “${where}”…`
        : "Please enter a destination to search.";
    }
  });

  // popular chips
  $$(".popular span").forEach((chip) =>
    chip.addEventListener("click", () => {
      if (input) input.value = chip.textContent.replace(/[^\p{L}\s]/gu, "").trim();
      input?.focus();
    })
  );
}

/* ---------------- Counters ---------------- */
function initCounters() {
  const counters = $$(".count");
  if (!counters.length) return;
  const run = (el) => {
    const target = Number(el.dataset.target);
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => io.observe(c));
}

/* ---------------- Countdown ---------------- */
function initCountdown() {
  const el = $("#clock");
  if (!el) return;
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const tick = () => {
    let diff = Math.max(0, end - new Date());
    const h = String(Math.floor(diff / 3.6e6)).padStart(2, "0");
    const m = String(Math.floor((diff % 3.6e6) / 6e4)).padStart(2, "0");
    const s = String(Math.floor((diff % 6e4) / 1000)).padStart(2, "0");
    el.textContent = `${h} : ${m} : ${s}`;
  };
  tick();
  setInterval(tick, 1000);
}

/* ---------------- Newsletter ---------------- */
function initNewsletter() {
  $("#newsletterForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#newsletterEmail");
    const note = $("#newsletterNote");
    if (note) note.textContent = `Thanks! We'll send deals to ${email.value}.`;
    e.target.reset();
  });
}

/* ---------------- Reveal on scroll ---------------- */
let revealObserver;
function revealInit() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            revealObserver.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  }
  $$(".reveal:not(.visible)").forEach((el) => revealObserver.observe(el));
}

/* ---------------- boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderDestinations();
  renderWhy();
  renderFilters();
  renderPackages();
  renderCategories();
  renderCountries();
  renderGallery();
  renderBlog();
  renderMarquee();
  renderFaq();
  initIntl();
  initIndia();
  initTestimonials();
  initNav();
  initHeroSearch();
  initCounters();
  initCountdown();
  initNewsletter();
  revealInit();
});
