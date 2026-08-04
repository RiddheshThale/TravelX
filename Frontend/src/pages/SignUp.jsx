import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function scorePassword(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const STRENGTH_COLORS = ["#ff5c5c", "#ff5c5c", "#f4c92c", "#37c987", "#37c987"];
const STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const CONFETTI_COLORS = ["#f4c92c", "#37c987", "#ffffff", "#d9ad1a"];

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", isError: false });
  const [confetti, setConfetti] = useState([]);
  const toastTimer = useRef(null);

  const strengthScore = scorePassword(password);
  const strengthPct = password ? (strengthScore / 4) * 100 : 0;

  function clearError(field) {
    setErrors((er) => ({ ...er, [field]: false }));
  }

  function showToast(message, isError = false) {
    clearTimeout(toastTimer.current);
    setToast({ show: true, message, isError });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 3200);
  }

  function launchConfetti() {
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      left: Math.random() * 100,
      background: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      duration: 2 + Math.random() * 1.5,
      rotate: Math.random() * 360,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 3600);
  }

  function validate() {
    const nextErrors = {
      fullName: fullName.trim().length < 2,
      email: !isValidEmail(email.trim()),
      password: password.length < 8,
      confirmPassword: confirmPassword !== password || !confirmPassword,
    };
    setErrors(nextErrors);

    if (!terms) {
      showToast("Please accept the Terms of Service", true);
    }

    return !Object.values(nextErrors).some(Boolean) && terms;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(`Welcome aboard, ${fullName.split(" ")[0]}! Account created.`);
      launchConfetti();
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTerms(false);
    }, 1400);
  }

  return (
    <div className="auth-page">
      <aside className="auth-visual">
        <div className="visual-overlay"></div>
        <div className="visual-clouds">
          <span className="cloud c1"></span>
          <span className="cloud c2"></span>
          <span className="cloud c3"></span>
        </div>
        <svg className="flight-path" viewBox="0 0 500 700" preserveAspectRatio="none">
          <path id="flightPathLine" d="M 40 640 C 180 520, 60 380, 220 300 C 360 230, 300 100, 460 40" />
          <g id="plane" className="plane">
            <text x="0" y="0" fontSize="26">✈</text>
          </g>
        </svg>

        <Link to="/" className="visual-logo">
          <img src="/images/logo.png" alt="TravelX logo" className="logo-icon-img" /> TravelX
        </Link>

        <div className="visual-copy">
          <h2>Your next journey<br />starts with an account.</h2>
          <p>Save trips, unlock member fares, and pick up your search on any device.</p>
        </div>

        <div className="visual-stats">
          <div><strong>50+</strong><span>Destinations</span></div>
          <div><strong>200k</strong><span>Travellers</span></div>
          <div><strong>4.7★</strong><span>Rated</span></div>
        </div>
      </aside>

      <main className="auth-form-panel">
        <div className="form-wrap">
          <div className="mobile-logo">
            <img src="/images/logo.png" alt="TravelX logo" className="logo-icon-img" /> TravelGo
          </div>

          <h1>Create your account</h1>
          <p className="subtext">Join thousands of travelers exploring the world with us.</p>

          <div className="social-row">
            <button type="button" className="social-btn">
              <span className="g-icon">G</span> Continue with Google
            </button>
            <button type="button" className="social-btn">
              <span className="f-icon">f</span> Continue with Facebook
            </button>
          </div>

          <div className="divider"><span>or sign up with email</span></div>

          <form id="signupForm" noValidate className={shake ? "shake" : ""} onSubmit={handleSubmit}>
            <div className={`field${errors.fullName ? " show-error" : ""}`}>
              <input
                type="text"
                id="fullName"
                placeholder=" "
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  clearError("fullName");
                }}
              />
              <label htmlFor="fullName">Full name</label>
              <span className="error-msg">Please enter your name</span>
            </div>

            <div className={`field${errors.email ? " show-error" : ""}`}>
              <input
                type="email"
                id="email"
                placeholder=" "
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
              />
              <label htmlFor="email">Email address</label>
              <span className="error-msg">Enter a valid email address</span>
            </div>

            <div className={`field${errors.password ? " show-error" : ""}`}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder=" "
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError("password");
                }}
              />
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="toggle-eye"
                aria-label="Show password"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
              <span className="error-msg">Minimum 8 characters</span>
            </div>

            <div className="strength-meter" id="strengthMeter">
              <div className="strength-bar">
                <span style={{ width: `${strengthPct}%`, background: STRENGTH_COLORS[strengthScore] }}></span>
              </div>
              <small id="strengthLabel">
                {password ? `Password strength: ${STRENGTH_LABELS[strengthScore]}` : "Password strength"}
              </small>
            </div>

            <div className={`field${errors.confirmPassword ? " show-error" : ""}`}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder=" "
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearError("confirmPassword");
                }}
              />
              <label htmlFor="confirmPassword">Confirm password</label>
              <button
                type="button"
                className="toggle-eye"
                aria-label="Show password"
                onClick={() => setShowConfirmPassword((s) => !s)}
              >
                {showConfirmPassword ? "🙈" : "👁"}
              </button>
              <span className="error-msg">Passwords do not match</span>
            </div>

            <label className="checkbox-row">
              <input
                type="checkbox"
                id="terms"
                required
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
              <span className="custom-check"></span>
              I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
            </label>

            <button type="submit" className={`submit-btn${loading ? " loading" : ""}`} id="submitBtn">
              <span className="btn-text">Create Account</span>
              <span className="btn-spinner"></span>
            </button>
          </form>

          <p className="switch-link">Already have an account? <Link to="/signin">Sign in</Link></p>
        </div>
      </main>

      <div className={`toast${toast.show ? " show" : ""}${toast.isError ? " error" : ""}`}>{toast.message}</div>

      <div className="confetti-layer" id="confetti">
        {confetti.map((p) => (
          <div
            key={p.id}
            className="confetti-piece"
            style={{
              left: `${p.left}vw`,
              background: p.background,
              animationDuration: `${p.duration}s`,
              transform: `rotate(${p.rotate}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
