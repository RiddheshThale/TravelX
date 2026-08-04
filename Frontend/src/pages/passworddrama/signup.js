document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('signupForm');
  const submitBtn = document.getElementById('submitBtn');
  const toast = document.getElementById('toast');
  const confettiLayer = document.getElementById('confetti');

  const fields = {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword')
  };

  /* ---------- Password show/hide toggle ---------- */
  document.querySelectorAll('.toggle-eye').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      const isHidden = target.type === 'password';
      target.type = isHidden ? 'text' : 'password';
      btn.textContent = isHidden ? '🙈' : '👁';
    });
  });

  /* ---------- Password strength meter ---------- */
  const strengthBar = document.querySelector('.strength-bar span');
  const strengthLabel = document.getElementById('strengthLabel');

  function scorePassword(pwd) {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  }

  fields.password.addEventListener('input', () => {
    const score = scorePassword(fields.password.value);
    const pct = (score / 4) * 100;
    const colors = ['#ff5c5c', '#ff5c5c', '#f4c92c', '#37c987', '#37c987'];
    const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
    strengthBar.style.width = pct + '%';
    strengthBar.style.background = colors[score];
    strengthLabel.textContent = fields.password.value
      ? `Password strength: ${labels[score]}`
      : 'Password strength';
  });

  /* ---------- Validation helpers ---------- */
  function setError(input, show) {
    const wrap = input.closest('.field');
    wrap.classList.toggle('show-error', show);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    let valid = true;

    if (fields.fullName.value.trim().length < 2) {
      setError(fields.fullName, true);
      valid = false;
    } else {
      setError(fields.fullName, false);
    }

    if (!isValidEmail(fields.email.value.trim())) {
      setError(fields.email, true);
      valid = false;
    } else {
      setError(fields.email, false);
    }

    if (fields.password.value.length < 8) {
      setError(fields.password, true);
      valid = false;
    } else {
      setError(fields.password, false);
    }

    if (fields.confirmPassword.value !== fields.password.value || !fields.confirmPassword.value) {
      setError(fields.confirmPassword, true);
      valid = false;
    } else {
      setError(fields.confirmPassword, false);
    }

    if (!document.getElementById('terms').checked) {
      valid = false;
      showToast('Please accept the Terms of Service', true);
    }

    return valid;
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function showToast(message, isError = false) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  /* ---------- Confetti burst ---------- */
  function launchConfetti() {
    const colors = ['#f4c92c', '#37c987', '#ffffff', '#d9ad1a'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = 2 + Math.random() * 1.5 + 's';
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      confettiLayer.appendChild(piece);
      setTimeout(() => piece.remove(), 3600);
    }
  }

  /* ---------- Submit handling ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validate()) {
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 500);
      return;
    }

    submitBtn.classList.add('loading');

    // Simulate an API call
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      showToast(`Welcome aboard, ${fields.fullName.value.split(' ')[0]}! Account created.`);
      launchConfetti();
      form.reset();
      strengthBar.style.width = '0%';
      strengthLabel.textContent = 'Password strength';
    }, 1400);
  });

  /* ---------- Clear inline error as the user fixes it ---------- */
  Object.values(fields).forEach((input) => {
    input.addEventListener('input', () => setError(input, false));
  });

});
