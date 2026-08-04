import { useState } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const KNOWN_DESTINATIONS = [
  "Turkey", "Bali", "Thailand", "Japan", "Ladakh", "Rajasthan", "Spiti", "Meghalaya", "Coorg", "Kerala",
];

export default function NotFound() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [cloudOffsets, setCloudOffsets] = useState([0, 0, 0, 0]);

  function handleMouseMove(e) {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    setCloudOffsets(cloudOffsets.map((_, i) => (i + 1) * 8).map((depth) => ({ x: x * depth, y: y * depth })));
  }

  function runSearch() {
    const q = query.trim();
    if (!q) {
      setMessage("");
      return;
    }

    const match = KNOWN_DESTINATIONS.find((d) => d.toLowerCase() === q.toLowerCase());
    const partial = KNOWN_DESTINATIONS.filter((d) => d.toLowerCase().includes(q.toLowerCase()));

    if (match) {
      setMessage(`Great choice — redirecting you to ${match}…`);
      setTimeout(() => {
        // In a real site this would route to a destination page.
        setMessage(`(Demo) Would navigate to /destinations/${match.toLowerCase()}`);
      }, 900);
    } else if (partial.length) {
      setMessage(`Did you mean: ${partial.join(", ")}?`);
    } else {
      setMessage(`No matches for "${q}" — try Bali, Turkey, or Ladakh.`);
    }
  }

  return (
    <div className="notfound-page" id="notfoundPage" onMouseMove={handleMouseMove}>
      <Link to="/" className="nf-logo">
        <img src="/images/logo.png" alt="TravelX logo" className="logo-icon-img" /> TravelX
      </Link>

      <div className="sky-layer" id="skyLayer">
        {cloudOffsets.map((offset, i) => (
          <span
            key={i}
            className={`cloud c${i + 1}`}
            style={{ transform: `translate(${offset.x || 0}px, ${offset.y || 0}px)` }}
          />
        ))}
      </div>

      <svg className="dashed-route" viewBox="0 0 900 300" preserveAspectRatio="none">
        <path id="routePath" d="M 40 220 Q 250 60 450 180 T 860 100" />
      </svg>

      <div className="plane-wrap" id="planeWrap">✈</div>

      <main className="nf-content">
        <h1 className="nf-number">
          <span>4</span><span className="nf-globe">0</span><span>4</span>
        </h1>
        <h2>Looks like you're off the map</h2>
        <p>The page you're looking for has drifted somewhere we can't find it. Let's get you back on route.</p>

        <div className="nf-search">
          <input
            type="text"
            id="destSearch"
            placeholder="Search a destination instead… (e.g. Bali)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
          />
          <button id="destSearchBtn" type="button" onClick={runSearch}>Search</button>
        </div>
        <p className="nf-suggestions" id="suggestions">{message}</p>

        <div className="nf-actions">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/signin" className="btn-outline">Sign In</Link>
        </div>
      </main>

      <div className="balloon" id="balloon">🧳</div>
    </div>
  );
}
