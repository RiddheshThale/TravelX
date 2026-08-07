/* ================= TravelX — frontend interactions ================= */
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

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

const FLIGHTS = [
  { r: "Mumbai → Dubai", a: "Emirates · Non-stop", p: "₹18,499" },
  { r: "Delhi → Bali", a: "Singapore Airlines · 1 stop", p: "₹32,900" },
  { r: "Kolkata → Goa", a: "IndiGo · Non-stop", p: "₹4,299" },
  { r: "Bengaluru → Male", a: "Air India · Non-stop", p: "₹22,750" },
  { r: "Chennai → Singapore", a: "Scoot · Non-stop", p: "₹19,200" },
  { r: "Delhi → Srinagar", a: "Vistara · Non-stop", p: "₹5,850" },
];

const HOTELS = [
  { t: "Ocean Pearl Resort", s: "Candolim, Goa", p: "₹6,499", r: "4.8", img: "photo-1566073771259-6a8506099945" },
  { t: "Snow Ridge Chalet", s: "Old Manali", p: "₹5,200", r: "4.7", img: "photo-1520250497591-112f2f40a3f4" },
  { t: "Palm Grand Dubai", s: "Palm Jumeirah", p: "₹19,900", r: "4.9", img: "photo-1571003123894-1f0594d2b5d9" },
];

const OFFERS = [
  { t: "Monsoon Sale", d: "Flat 25% off on all domestic packages.", c: "MONSOON25" },
  { t: "First Flight", d: "₹1,500 off your first flight booking.", c: "FLYNEW" },
  { t: "Weekend Stays", d: "Up to 40% off hotels booked Fri–Sun.", c: "WEEKEND40" },
];

const REVIEWS = [
  { q: "TravelX planned our Bali honeymoon down to the last detail. Zero stress, pure magic.", n: "Ananya & Rohit", l: "Kolkata" },
  { q: "Cheapest Dubai fare I found anywhere, and support answered at 2am. Genuinely impressed.", n: "Vikram Sethi", l: "Mumbai" },
  { q: "Booked Manali three days before travel — hotel, cab and permits all sorted.", n: "Meera Nair", l: "Bengaluru" },
];

const FAQS = [
  ["Can I cancel my booking for free?", "Yes — most packages and hotels allow free cancellation up to 48 hours before check-in."],
  ["Do you offer EMI payments?", "Absolutely. No-cost EMI is available on bookings above ₹10,000 with major credit cards."],
  ["Are visas included in international packages?", "Visa assistance is included; government fees are billed separately at actual cost."],
  ["How do I contact support?", "Call +91 98765 43210 or email hello@travelx.com — we answer 24×7."],
];

const PARTNERS = ["Emirates", "IndiGo", "Marriott", "Taj Hotels", "Booking Pay", "Visa", "Airbnb", "Qatar Airways"];

/* ---------------- render ---------------- */
const stars = (r) => `<span class="stars">★ ${r}</span>`;

$("#destGrid").innerHTML = DESTINATIONS.map((d) => `
  <article class="card reveal">
    <div class="thumb"><span class="tag">${d.tag}</span><img src="${img(d.img)}" alt="${d.name}, ${d.country}" loading="lazy"></div>
    <div class="card-body">
      <h3>${d.name}</h3><p class="sub">${d.country}</p>
      <div class="card-row"><span class="price">${d.price}</span><button class="btn-ghost">Explore</button></div>
    </div>
  </article>`).join("");

$("#whyGrid").innerHTML = WHY.map((w) => `
  <div class="feature reveal"><div class="ico">${w.ico}</div><h3>${w.t}</h3><p>${w.d}</p></div>`).join("");

function renderPackages(filter = "all") {
  $("#pkgGrid").innerHTML = PACKAGES.filter((p) => filter === "all" || p.c.includes(filter))
    .map((p) => `
      <article class="card reveal visible">
        <div class="thumb"><span class="tag">${p.s}</span><img src="${img(p.img)}" alt="${p.t}" loading="lazy"></div>
        <div class="card-body">
          <h3>${p.t}</h3><p class="sub">${stars(p.r)} · Flights + Hotel + Meals</p>
          <div class="card-row"><span class="price">${p.p}</span><button class="btn-gold">Book Now</button></div>
        </div>
      </article>`).join("") || `<p class="sub">No packages in this category yet.</p>`;
}
renderPackages();

$("#flightGrid").innerHTML = FLIGHTS.map((f) => `
  <div class="card reveal"><div class="card-body">
    <h3>✈ ${f.r}</h3><p class="sub">${f.a}</p>
    <div class="card-row"><span class="price">${f.p}</span><button class="btn-ghost">View Fare</button></div>
  </div></div>`).join("");

$("#hotelGrid").innerHTML = HOTELS.map((h) => `
  <article class="card reveal">
    <div class="thumb"><img src="${img(h.img)}" alt="${h.t}" loading="lazy"></div>
    <div class="card-body">
      <h3>${h.t}</h3><p class="sub">${h.s} · ${stars(h.r)}</p>
      <div class="card-row"><span class="price">${h.p}<small> / night</small></span><button class="btn-gold">Book</button></div>
    </div>
  </article>`).join("");

$("#offerGrid").innerHTML = OFFERS.map((o) => `
  <div class="offer reveal"><h3>${o.t}</h3><p class="sub">${o.d}</p><div class="code">${o.c}</div></div>`).join("");

$("#slides").innerHTML = REVIEWS.map((r) => `
  <div class="slide"><p>“${r.q}”</p><h4 class="gold-text">${r.n}</h4><p class="sub">${r.l}</p></div>`).join("");

$("#faq").innerHTML = FAQS.map(([q, a]) => `
  <div class="faq-item"><button class="faq-q">${q}<span>+</span></button><div class="faq-a">${a}</div></div>`).join("");

$("#marquee").innerHTML = [...PARTNERS, ...PARTNERS].map((p) => `<span>${p}</span>`).join("");

/* ---------------- navbar ---------------- */
const navbar = $("#navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
  $("#toTop").classList.toggle("show", window.scrollY > 500);
});
$("#burger").onclick = () => $("#navLinks").classList.toggle("open");
$$("#navLinks a").forEach((a) => a.addEventListener("click", () => {
  $("#navLinks").classList.remove("open");
  $$("#navLinks a").forEach((x) => x.classList.remove("active"));
  a.classList.add("active");
}));
$("#toTop").onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

/* theme toggle */
$("#themeToggle").onclick = (e) => {
  document.body.classList.toggle("light");
  e.target.textContent = document.body.classList.contains("light") ? "☀" : "🌙";
};

/* global search */
$("#searchToggle").onclick = () => {
  $("#navSearch").classList.toggle("open");
  $("#globalSearch").focus();
};
const ALL = [...DESTINATIONS.map((d) => d.name), ...PACKAGES.map((p) => p.t), ...HOTELS.map((h) => h.t)];
$("#globalSearch").addEventListener("input", (e) => {
  const v = e.target.value.trim().toLowerCase();
  $("#searchResults").innerHTML = !v ? "" :
    ALL.filter((x) => x.toLowerCase().includes(v)).slice(0, 6).map((x) => `<li>🔎 ${x}</li>`).join("")
    || "<li>No matches found</li>";
});

/* ---------------- hero tabs + destination autocomplete ---------------- */
$$(".tab").forEach((t) => t.addEventListener("click", () => {
  $$(".tab").forEach((x) => x.classList.remove("active"));
  t.classList.add("active");
}));

const destInput = $("#destInput"), destBox = $("#destSuggestions");
destInput.addEventListener("input", () => {
  const v = destInput.value.trim().toLowerCase();
  const hits = v ? DESTINATIONS.filter((d) => d.name.toLowerCase().startsWith(v)) : [];
  destBox.innerHTML = hits.map((d) => `<li>${d.name} · ${d.country}</li>`).join("");
  $$("li", destBox).forEach((li, i) => li.onclick = () => { destInput.value = hits[i].name; destBox.innerHTML = ""; });
});
document.addEventListener("click", (e) => { if (!e.target.closest(".search-field")) destBox.innerHTML = ""; });

$("#bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert(`Searching ${$(".tab.active").textContent.trim()} for "${destInput.value || "anywhere"}"…`);
});

/* ---------------- package filters ---------------- */
$$(".filter").forEach((b) => b.addEventListener("click", () => {
  $$(".filter").forEach((x) => x.classList.remove("active"));
  b.classList.add("active");
  renderPackages(b.dataset.f);
}));

/* ---------------- testimonials slider ---------------- */
let idx = 0;
const move = () => $("#slides").style.transform = `translateX(-${idx * 100}%)`;
$("#next").onclick = () => { idx = (idx + 1) % REVIEWS.length; move(); };
$("#prev").onclick = () => { idx = (idx - 1 + REVIEWS.length) % REVIEWS.length; move(); };
setInterval(() => { idx = (idx + 1) % REVIEWS.length; move(); }, 6000);

/* ---------------- FAQ accordion ---------------- */
$$(".faq-q").forEach((q) => q.onclick = () => {
  const item = q.parentElement;
  $$(".faq-item").forEach((f) => f !== item && f.classList.remove("open"));
  item.classList.toggle("open");
});

/* ---------------- newsletter ---------------- */
$("#newsletter").addEventListener("submit", (e) => {
  e.preventDefault();
  $("#nlNote").textContent = "🎉 You're subscribed! Deals are on the way.";
  e.target.reset();
});

/* ---------------- scroll reveal ---------------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
$$(".reveal").forEach((el) => io.observe(el));

/* ---------------- animated counters ---------------- */
const counters = $$("[data-count]");
const cio = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target, target = +el.dataset.count;
    let cur = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = cur.toLocaleString("en-IN") + "+";
    }, 24);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach((c) => cio.observe(c));

/* ---------------- offer countdown ---------------- */
const end = new Date().getTime() + 5 * 24 * 60 * 60 * 1000;
setInterval(() => {
  const t = Math.max(0, end - Date.now());
  const pad = (n) => String(n).padStart(2, "0");
  $("#cd-d").textContent = pad(Math.floor(t / 86400000));
  $("#cd-h").textContent = pad(Math.floor(t / 3600000) % 24);
  $("#cd-m").textContent = pad(Math.floor(t / 60000) % 60);
  $("#cd-s").textContent = pad(Math.floor(t / 1000) % 60);
}, 1000);




/* =====================================================================
   Scoped JS — only runs inside .trips, safe for the rest of the site
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('.trips');
  if (!root) return;

  /* ---------- INTERNATIONAL carousel ---------- */
  const track = root.querySelector('#intlTrack');
  const prevIntl = root.querySelector('#intlPrev');
  const nextIntl = root.querySelector('#intlNext');
  const cards = track ? track.querySelectorAll('.intl-card') : [];

  let intlIndex = 0;

  function getVisible() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateIntl() {
    if (!track || !cards.length) return;
    const visible = getVisible();
    const maxIndex = Math.max(0, cards.length - visible);
    if (intlIndex > maxIndex) intlIndex = maxIndex;
    const cardWidth = cards[0].offsetWidth + 16;
    track.scrollTo({ left: intlIndex * cardWidth, behavior: 'smooth' });
  }

  if (nextIntl) {
    nextIntl.addEventListener('click', () => {
      const visible = getVisible();
      const maxIndex = Math.max(0, cards.length - visible);
      intlIndex = Math.min(intlIndex + 1, maxIndex);
      updateIntl();
    });
  }

  if (prevIntl) {
    prevIntl.addEventListener('click', () => {
      intlIndex = Math.max(intlIndex - 1, 0);
      updateIntl();
    });
  }

  window.addEventListener('resize', updateIntl);

  /* ---------- INDIA featured carousel ---------- */
  const slides = root.querySelectorAll('.featured-slide');
  const nameEl = root.querySelector('#featuredName');
  const prevBtn = root.querySelector('#prevBtn');
  const nextBtn = root.querySelector('#nextBtn');

  let current = 0;
  let autoTimer = null;
  const AUTO_MS = 4500;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    if (nameEl) nameEl.textContent = slides[index]?.dataset.name || '';
    current = index;
  }

  function next() {
    if (!slides.length) return;
    showSlide((current + 1) % slides.length);
  }

  function prev() {
    if (!slides.length) return;
    showSlide((current - 1 + slides.length) % slides.length);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, AUTO_MS);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  const card = root.querySelector('.featured-card');
  if (card) {
    card.addEventListener('mouseenter', stopAuto);
    card.addEventListener('mouseleave', startAuto);
  }

  let touchStartX = 0;
  if (card) {
    card.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) next();
        else prev();
        startAuto();
      }
    }, { passive: true });
  }

  if (slides.length) {
    showSlide(0);
    startAuto();
  }
});