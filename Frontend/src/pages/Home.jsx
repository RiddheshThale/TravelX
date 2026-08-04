import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  destinationsActions,
  reviewsActions,
  indiaActions,
} from "../store.js";
import { DESTINATIONS, REVIEWS, INDIA_FEATURED, INDIA_MINI } from "../data/travelData.js";
import "./Home.css";

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
        <li><Link to="/signin">Login In</Link></li>
      </ul>
      <Link to="/signup" className="signup-btn">Sign UP</Link>
    </nav>
  );
}

function Hero() {
  return (
    <header
      className="hero"
      style={{
        backgroundImage: "url('https://picsum.photos/seed/mountain-trek-hero/1400/900')",
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

  const visible = [0, 1, 2].map((offset) => DESTINATIONS[(index + offset) % DESTINATIONS.length]);

  return (
    <section className="intl-section" id="international">
      <div className="section-inner intl-grid">
        <div className="carousel">
          <button className="carousel-arrow" onClick={() => dispatch(destinationsActions.prev())}>
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
          <button className="carousel-arrow" onClick={() => dispatch(destinationsActions.next())}>
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
          <button className="carousel-arrow" onClick={() => dispatch(reviewsActions.prev())}>
            ◀
          </button>
          {visible.map((text, i) => (
            <div className="review-card" key={i}>
              {text}
            </div>
          ))}
          <button className="carousel-arrow" onClick={() => dispatch(reviewsActions.next())}>
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
              <button onClick={() => dispatch(indiaActions.prev())}>◀</button>
              <span>{featured.name}</span>
              <button onClick={() => dispatch(indiaActions.next())}>▶</button>
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

export default function Home() {
  // Auto-advance the India featured carousel every 5s, like a hero slider
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setInterval(() => dispatch(indiaActions.next()), 5000);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Hero />
      <InternationalSection />
      <GoogleReviews />
      <IndiaExplorations />
      <Footer />
    </>
  );
}
