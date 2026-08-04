import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sentEmail, setSentEmail] = useState("you@example.com");
  const [cooldown, setCooldown] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", isError: false });
  const toastTimer = useRef(null);
  const cooldownInterval = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(toastTimer.current);
      clearInterval(cooldownInterval.current);
    };
  }, []);

  function showToast(message, isError = false) {
    clearTimeout(toastTimer.current);
    setToast({ show: true, message, isError });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 3200);
  }

  function startResendCooldown() {
    clearInterval(cooldownInterval.current);
    setCooldown(30);
    cooldownInterval.current = setInterval(() => {
      setCooldown((s) => {
        if (s <= 1) {
          clearInterval(cooldownInterval.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValidEmail(email.trim())) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSentEmail(email.trim());
      setSuccess(true);
      startResendCooldown();
    }, 1200);
  }

  function handleResend() {
    if (cooldown > 0) return;
    showToast(`Reset link re-sent to ${sentEmail}`);
    startResendCooldown();
  }

  return (
    <div className="reset-page">
      <div className={`reset-card${success ? " success" : ""}`}>
        <Link to="/signin" className="back-link">← Back to sign in</Link>

        <div className="mobile-logo">
          <img src="/images/logo.png" alt="TravelX logo" className="logo-icon-img" /> TravelX
        </div>

        {/* Step 1: request reset */}
        <div className="step step-request" id="stepRequest">
          <div className="icon-badge">
            <span className="key-icon">🔑</span>
          </div>
          <h1>Forgot your password?</h1>
          <p className="subtext">No worries. Enter the email linked to your account and we'll send you a reset link.</p>

          <form id="resetForm" noValidate className={shake ? "shake" : ""} onSubmit={handleSubmit}>
            <div className={`field${error ? " show-error" : ""}`}>
              <input
                type="email"
                id="email"
                placeholder=" "
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
              />
              <label htmlFor="email">Email address</label>
              <span className="error-msg">Enter a valid email address</span>
            </div>

            <button type="submit" className={`submit-btn${loading ? " loading" : ""}`} id="submitBtn">
              <span className="btn-text">Send Reset Link</span>
              <span className="btn-spinner"></span>
            </button>
          </form>
        </div>

        {/* Step 2: success */}
        <div className="step step-success" id="stepSuccess">
          <div className="check-badge">
            <svg viewBox="0 0 52 52" className="check-svg">
              <circle cx="26" cy="26" r="24" className="check-circle" />
              <path d="M14 27 l8 8 l16 -16" className="check-mark" />
            </svg>
          </div>
          <h1>Check your inbox</h1>
          <p className="subtext">
            We've sent a password reset link to <strong id="sentEmail">{sentEmail}</strong>.
            It expires in 15 minutes.
          </p>

          <button
            type="button"
            className="submit-btn secondary-btn"
            id="resendBtn"
            disabled={cooldown > 0}
            onClick={handleResend}
          >
            Resend link
          </button>
          <p className="resend-timer" id="resendTimer">
            {cooldown > 0 ? `You can resend in ${cooldown}s` : ""}
          </p>

          <Link to="/signin" className="switch-link-btn">Back to sign in</Link>
        </div>
      </div>

      <div className="reset-clouds">
        <span className="cloud c1"></span>
        <span className="cloud c2"></span>
      </div>

      <div className={`toast${toast.show ? " show" : ""}${toast.isError ? " error" : ""}`}>{toast.message}</div>
    </div>
  );
}
