

const { createStore, combineReducers } = Redux;
const { Provider, useSelector, useDispatch } = ReactRedux;
const { useEffect } = React;

/* ---------------------- Data ---------------------- */

const DESTINATIONS = [
  {
    id: "turkey",
    name: "Turkey",
    rating: 5,
    img: "https://picsum.photos/seed/turkey-travel/500/650",
    desc: "Turkey is where ancient history meets modern charm. From the colorful streets of Istanbul to the surreal landscapes of Cappadocia, Turkey offers a rich blend of culture, architecture, and flavors. It's perfect for travelers who love heritage, vibrant markets, and breathtaking views in one destination."
  },
  {
    id: "bali",
    name: "Bali",
    rating: 5,
    img: "https://picsum.photos/seed/bali-travel/500/650",
    desc: "Bali is a tropical paradise known for its serene beaches, lush rice terraces, and spiritual vibes. With stunning sunsets, traditional temples, and a relaxed lifestyle, Bali is ideal for both adventure seekers and those looking for peace and rejuvenation."
  },
  {
    id: "thailand",
    name: "Thailand",
    rating: 5,
    img: "https://picsum.photos/seed/thailand-travel/500/650",
    desc: "Thailand is famous for its lively cities, golden temples, and crystal-clear beaches. From the bustling streets of Bangkok to the calm islands and rich street food culture, Thailand delivers an unforgettable mix of excitement, beauty, and warm hospitality."
  },
  {
    id: "japan",
    name: "Japan",
    rating: 5,
    img: "https://picsum.photos/seed/japan-travel/500/650",
    desc: "Japan blends centuries-old tradition with futuristic energy. From cherry blossoms and quiet temples to neon-lit cityscapes, it's a destination that rewards curious, respectful travelers with unforgettable contrasts."
  }
];

const REVIEWS = [
  "Amazing travel experience! Everything from trip planning to hotel bookings and local guidance was perfectly managed. The team was responsive, professional, and made our international trip completely stress-free. Highly recommended for anyone looking for reliable travel services.",
  "One of the best travel platforms I've used. The itinerary was well-planned, accommodations were excellent, and support was available throughout the journey. They truly understand customer needs and deliver memorable travel experiences.",
  "Fantastic service and great attention to detail. From visa assistance to destination planning, everything was handled smoothly. The trip exceeded our expectations, and we will definitely book our future travels through this website again."
];

const INDIA_FEATURED = [
  { name: "Coorg", img: "https://picsum.photos/seed/coorg-temple/700/500" },
  { name: "Kerala", img: "https://picsum.photos/seed/kerala-backwaters/700/500" },
  { name: "Kashmir", img: "https://picsum.photos/seed/kashmir-valley/700/500" }
];

const INDIA_MINI = [
  { name: "LADAKH", img: "https://picsum.photos/seed/ladakh-hills/500/300" },
  { name: "RAJASTHAN", img: "https://picsum.photos/seed/rajasthan-desert/500/300" },
  { name: "SPITI", img: "https://picsum.photos/seed/spiti-valley/500/300" },
  { name: "MEGHALAYA", img: "https://picsum.photos/seed/meghalaya-bridge/500/300" }
];

/* ---------------------- Redux: slices ---------------------- */

// International destinations carousel
const destInitial = { index: 0 };
function destinationsReducer(state = destInitial, action) {
  switch (action.type) {
    case "DEST_NEXT":
      return { index: (state.index + 1) % DESTINATIONS.length };
    case "DEST_PREV":
      return { index: (state.index - 1 + DESTINATIONS.length) % DESTINATIONS.length };
    default:
      return state;
  }
}

// Google reviews carousel
const reviewInitial = { index: 0 };
function reviewsReducer(state = reviewInitial, action) {
  switch (action.type) {
    case "REVIEW_NEXT":
      return { index: (state.index + 1) % REVIEWS.length };
    case "REVIEW_PREV":
      return { index: (state.index - 1 + REVIEWS.length) % REVIEWS.length };
    default:
      return state;
  }
}

// India featured image carousel
const indiaInitial = { index: 0 };
function indiaReducer(state = indiaInitial, action) {
  switch (action.type) {
    case "INDIA_NEXT":
      return { index: (state.index + 1) % INDIA_FEATURED.length };
    case "INDIA_PREV":
      return { index: (state.index - 1 + INDIA_FEATURED.length) % INDIA_FEATURED.length };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  destinations: destinationsReducer,
  reviews: reviewsReducer,
  india: indiaReducer
});

const store = createStore(rootReducer);

/* ---------------------- Components ---------------------- */

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🌍</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#international">International</a></li>
        <li><a href="#india">India</a></li>
        <li><a href="#about">About US</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#login">Login In</a></li>
      </ul>
      <button className="signup-btn">Sign UP</button>
    </nav>
  );
}

function Hero() {
  return (
    <header
      className="hero"
      style={{
        backgroundImage:
          "url('https://picsum.photos/seed/mountain-trek-hero/1400/900')"
      }}
    >
      <div className="hero-content">
        <h1>Travel Beyond Boundaries</h1>
        <div className="hero-actions">
          <button className="btn-primary">Discover more</button>
          <div className="watch-video">
            <span className="play-circle">▶</span>
            <span>Watch our video</span>
          </div>
        </div>
      </div>

      <div className="floating-circles">
        <img className="float-img one" src="https://picsum.photos/seed/aurora-sky/160/160" alt="Aurora" />
        <img className="float-img two" src="https://picsum.photos/seed/snow-temple/200/200" alt="Temple" />
        <img className="float-img three" src="https://picsum.photos/seed/asian-pagoda/180/180" alt="Pagoda" />
        <div className="float-line a"></div>
        <div className="float-line b"></div>
      </div>

      <div className="search-bar-wrap">
        <span className="tours-tab">Tours</span>
        <div className="search-bar">
          <div className="search-field">
            Choosen destination <span className="arrow">▾</span>
          </div>
          <div className="search-field">
            Select dates <span className="arrow">▾</span>
          </div>
          <div className="search-field">
            Add members <span className="arrow">▾</span>
          </div>
          <div className="search-field">
            pick up locations <span className="arrow">▾</span>
          </div>
          <button className="search-go">▶</button>
        </div>
      </div>
    </header>
  );
}

function Stars({ count }) {
  return <span className="stars">{"★".repeat(count)}</span>;
}

function InternationalSection() {
  const dispatch = useDispatch();
  const index = useSelector((s) => s.destinations.index);

  // Show 3 destinations starting at `index`, wrapping around
  const visible = [0, 1, 2].map((offset) => DESTINATIONS[(index + offset) % DESTINATIONS.length]);

  return (
    <section className="intl-section" id="international">
      <div className="section-inner intl-grid">
        <div className="carousel">
          <button className="carousel-arrow" onClick={() => dispatch({ type: "DEST_PREV" })}>
            ◀
          </button>
          <div className="carousel-track">
            {visible.map((dest) => (
              <div className="dest-card" key={dest.id}>
                <img src={dest.img} alt={dest.name} />
                <div className="dest-name">
                  {dest.name} <Stars count={dest.rating} />
                </div>
                <p className="dest-desc">{dest.desc}</p>
              </div>
            ))}
          </div>
          <button className="carousel-arrow" onClick={() => dispatch({ type: "DEST_NEXT" })}>
            ▶
          </button>
        </div>

        <div className="intl-info">
          <h2>INTERNATIONAL</h2>
          <p>
            An international trip offers a unique opportunity to explore new countries, cultures, and ways of
            life beyond familiar surroundings. From experiencing diverse cuisines and local traditions to
            visiting iconic landmarks and global destinations, international travel enriches perspectives and
            creates lasting memories. With proper planning — including passport validity, visa requirements,
            and travel insurance — every journey can be smooth, safe, and well-organized.
          </p>
          <p>
            More than just travel, international trips contribute to personal growth and global awareness.
            Navigating new environments, understanding different cultures, and adapting to international
            standards build confidence and independence. Whether for leisure, cultural discovery, or
            adventure, an international trip delivers a well-balanced experience of comfort, learning, and
            unforgettable moments — perfectly tailored for today's global traveler.
          </p>

          <div className="intl-stats">
            <strong>50+ Destination*</strong>
            <strong>200k Tourists</strong>
            <strong>200+ Hotels</strong>
          </div>

          <button className="btn-primary">Discover more</button>
        </div>
      </div>
    </section>
  );
}

function GoogleReviews() {
  const dispatch = useDispatch();
  const index = useSelector((s) => s.reviews.index);
  const visible = [0, 1, 2].map((offset) => REVIEWS[(index + offset) % REVIEWS.length]);

  return (
    <section className="reviews-section">
      <div className="section-inner">
        <div className="reviews-header">
          <span className="line"></span>
          <h2>Google Reviews</h2>
          <span className="line"></span>
        </div>

        <div className="reviews-grid">
          <button className="carousel-arrow" onClick={() => dispatch({ type: "REVIEW_PREV" })}>
            ◀
          </button>
          {visible.map((text, i) => (
            <div className="review-card" key={i}>
              {text}
            </div>
          ))}
          <button className="carousel-arrow" onClick={() => dispatch({ type: "REVIEW_NEXT" })}>
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}

function IndiaExplorations() {
  const dispatch = useDispatch();
  const index = useSelector((s) => s.india.index);
  const featured = INDIA_FEATURED[index];

  return (
    <section className="india-section" id="india">
      <div className="section-inner">
        <div className="section-header">
          <h2>INDIA EXPLORATIONS</h2>
          <span className="line"></span>
          <span style={{ fontSize: 18, color: "var(--yellow)" }}>→</span>
        </div>

        <div className="india-grid">
          <div className="india-feature">
            <img src={featured.img} alt={featured.name} />
            <div className="india-feature-caption">
              <button onClick={() => dispatch({ type: "INDIA_PREV" })}>◀</button>
              <span>{featured.name}</span>
              <button onClick={() => dispatch({ type: "INDIA_NEXT" })}>▶</button>
            </div>
          </div>

          <div className="india-mini-grid">
            {INDIA_MINI.map((place) => (
              <div className="india-mini-card" key={place.name}>
                <img src={place.img} alt={place.name} />
                <span>{place.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="india-stats">
          <div className="stat">
            <strong>4.7</strong>
            <span>Google Rating</span>
          </div>
          <div className="stat">
            <strong>200,397</strong>
            <span>Satisfied Travellers</span>
          </div>
          <div className="stat">
            <strong>180+</strong>
            <span>Tour Captains.</span>
          </div>
          <div className="stat">
            <strong>50+</strong>
            <span>Google Ratings</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} Travel Beyond Boundaries. All rights reserved.
    </footer>
  );
}

function App() {
  // Auto-advance the India featured carousel every 5s, like a hero slider
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => dispatch({ type: "INDIA_NEXT" }), 5000);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <React.Fragment>
      <Navbar />
      <Hero />
      <InternationalSection />
      <GoogleReviews />
      <IndiaExplorations />
      <Footer />
    </React.Fragment>
  );
}

/* ---------------------- Mount ---------------------- */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
