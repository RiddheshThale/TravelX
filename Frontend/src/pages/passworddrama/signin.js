document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('signinForm');
  const submitBtn = document.getElementById('submitBtn');
  const toast = document.getElementById('toast');

  const fields = {
    email: document.getElementById('email'),
    password: document.getElementById('password')
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

  /* ---------- Validation helpers ---------- */
  function setError(input, show) {
    input.closest('.field').classList.toggle('show-error', show);
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    let valid = true;

    if (!isValidEmail(fields.email.value.trim())) {
      setError(fields.email, true);
      valid = false;
    } else {
      setError(fields.email, false);
    }

    if (fields.password.value.length < 1) {
      setError(fields.password, true);
      valid = false;
    } else {
      setError(fields.password, false);
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

  /* ---------- Restore remembered email ---------- */
  const savedEmail = sessionStorage.getItem('travelgo_remember_email');
  if (savedEmail) {
    fields.email.value = savedEmail;
    document.getElementById('remember').checked = true;
  }

  /* ---------- Submit handling ---------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validate()) {
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 500);
      showToast('Please check your details and try again', true);
      return;
    }

    submitBtn.classList.add('loading');

    setTimeout(() => {
      submitBtn.classList.remove('loading');

      if (document.getElementById('remember').checked) {
        sessionStorage.setItem('travelgo_remember_email', fields.email.value);
      } else {
        sessionStorage.removeItem('travelgo_remember_email');
      }

      showToast(`Welcome back! Signed in as ${fields.email.value}`);
    }, 1200);
  });

  /* ---------- Clear inline error as the user fixes it ---------- */
  Object.values(fields).forEach((input) => {
    input.addEventListener('input', () => setError(input, false));
  });

});
