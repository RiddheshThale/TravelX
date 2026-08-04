import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";

const REMEMBER_KEY = "travelgo_remember_email";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", isError: false });
  const toastTimer = useRef(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(REMEMBER_KEY);
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  function showToast(message, isError = false) {
    clearTimeout(toastTimer.current);
    setToast({ show: true, message, isError });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 3200);
  }

  function validate() {
    const nextErrors = {
      email: !isValidEmail(email.trim()),
      password: password.length < 1,
    };
    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.password;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      showToast("Please check your details and try again", true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (remember) {
        sessionStorage.setItem(REMEMBER_KEY, email);
      } else {
        sessionStorage.removeItem(REMEMBER_KEY);
      }
      showToast(`Welcome back! Signed in as ${email}`);
    }, 1200);
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
          <path id="flightPathLine" d="M 460 640 C 320 520, 440 380, 280 300 C 140 230, 200 100, 40 40" />
          <g className="plane">
            <text x="0" y="0" fontSize="26">✈</text>
          </g>
        </svg>

        <Link to="/" className="visual-logo">
          <img src="/images/logo.png" alt="TravelX logo" className="logo-icon-img" /> TravelX
        </Link>

        <div className="visual-copy">
          <h2>Welcome back,<br />explorer.</h2>
          <p>Sign in to pick up your saved trips, wishlist, and member-only fares.</p>
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
            <img src="/images/logo.png" alt="TravelX logo" className="logo-icon-img" /> TravelX
          </div>

          <h1>Sign in to your account</h1>
          <p className="subtext">Good to see you again — your next trip is waiting.</p>

          <div className="social-row">
            <button type="button" className="social-btn">
              <span className="g-icon">G</span> Continue with Google
            </button>
            <button type="button" className="social-btn">
              <span className="f-icon">f</span> Continue with Facebook
            </button>
          </div>

          <div className="divider"><span>or sign in with email</span></div>

          <form id="signinForm" noValidate className={shake ? "shake" : ""} onSubmit={handleSubmit}>
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
                  setErrors((er) => ({ ...er, email: false }));
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((er) => ({ ...er, password: false }));
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
              <span className="error-msg">Enter your password</span>
            </div>

            <div className="row-between">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  id="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="custom-check"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            <button type="submit" className={`submit-btn${loading ? " loading" : ""}`} id="submitBtn">
              <span className="btn-text">Sign In</span>
              <span className="btn-spinner"></span>
            </button>
          </form>

          <p className="switch-link">New to TravelX? <Link to="/signup">Create an account</Link></p>
        </div>
      </main>

      <div className={`toast${toast.show ? " show" : ""}${toast.isError ? " error" : ""}`}>{toast.message}</div>
    </div>
  );
}
