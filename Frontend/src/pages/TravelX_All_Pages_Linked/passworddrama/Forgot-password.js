document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('resetForm');
  const submitBtn = document.getElementById('submitBtn');
  const emailInput = document.getElementById('email');
  const card = document.querySelector('.reset-card');
  const sentEmailEl = document.getElementById('sentEmail');
  const resendBtn = document.getElementById('resendBtn');
  const resendTimer = document.getElementById('resendTimer');
  const toast = document.getElementById('toast');

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setError(show) {
    emailInput.closest('.field').classList.toggle('show-error', show);
  }

  let toastTimer;
  function showToast(message, isError = false) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  emailInput.addEventListener('input', () => setError(false));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!isValidEmail(emailInput.value.trim())) {
      setError(true);
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 500);
      return;
    }

    submitBtn.classList.add('loading');

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      sentEmailEl.textContent = emailInput.value.trim();
      card.classList.add('success');
      startResendCooldown();
    }, 1200);
  });

  /* ---------- Resend cooldown ---------- */
  let cooldownInterval;
  function startResendCooldown() {
    let seconds = 30;
    resendBtn.disabled = true;
    resendTimer.textContent = `You can resend in ${seconds}s`;

    clearInterval(cooldownInterval);
    cooldownInterval = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        clearInterval(cooldownInterval);
        resendBtn.disabled = false;
        resendTimer.textContent = '';
      } else {
        resendTimer.textContent = `You can resend in ${seconds}s`;
      }
    }, 1000);
  }

  resendBtn.addEventListener('click', () => {
    if (resendBtn.disabled) return;
    showToast(`Reset link re-sent to ${sentEmailEl.textContent}`);
    startResendCooldown();
  });

});
