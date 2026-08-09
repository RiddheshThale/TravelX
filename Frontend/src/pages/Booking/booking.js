// Voyageora — Booking flow shared JS
// Used by booking.html, checkout.html, payment.html, booking-confirmation.html, booking-history.html

const VG_BOOKING_KEY = 'vg_current_booking';

function vgGetBooking() {
  try { return JSON.parse(sessionStorage.getItem(VG_BOOKING_KEY)) || {}; }
  catch { return {}; }
}
function vgSaveBooking(data) {
  sessionStorage.setItem(VG_BOOKING_KEY, JSON.stringify({ ...vgGetBooking(), ...data }));
}
function vgFormatINR(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN');
}

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- generic: modal helpers ---------------- */
  window.openModal = (id) => {
    document.getElementById(id)?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeModal = (id) => {
    document.getElementById(id)?.classList.remove('open');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('.modal-overlay').forEach((ov) => {
    ov.addEventListener('click', (e) => {
      if (e.target === ov) { ov.classList.remove('open'); document.body.style.overflow = ''; }
    });
  });

  /* ================= booking.html — trip details step ================= */
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    const travellersEl = document.getElementById('travellerCount');
    const basePricePerPerson = Number(bookingForm.dataset.pricePerPerson || 14200);

    function updateSummary() {
      const count = Number(travellersEl?.textContent || 1);
      const subtotal = basePricePerPerson * count;
      const taxes = Math.round(subtotal * 0.05);
      const total = subtotal + taxes;
      document.getElementById('sumTravellers') && (document.getElementById('sumTravellers').textContent = count);
      document.getElementById('sumSubtotal') && (document.getElementById('sumSubtotal').textContent = vgFormatINR(subtotal));
      document.getElementById('sumTaxes') && (document.getElementById('sumTaxes').textContent = vgFormatINR(taxes));
      document.getElementById('sumTotal') && (document.getElementById('sumTotal').textContent = vgFormatINR(total));
      return { count, subtotal, taxes, total };
    }

    document.getElementById('travellerMinus')?.addEventListener('click', () => {
      const v = Math.max(1, Number(travellersEl.textContent) - 1);
      travellersEl.textContent = v;
      updateSummary();
    });
    document.getElementById('travellerPlus')?.addEventListener('click', () => {
      const v = Math.min(10, Number(travellersEl.textContent) + 1);
      travellersEl.textContent = v;
      updateSummary();
    });

    updateSummary();

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      ['travellerName', 'travellerEmail', 'travellerPhone', 'travelDate'].forEach((id) => {
        const input = document.getElementById(id);
        const group = input?.closest('.form-group');
        const ok = input && input.value.trim().length > 2;
        group?.classList.toggle('show-error', !ok);
        if (!ok) valid = false;
      });
      if (!valid) return;

      const { count, subtotal, taxes, total } = updateSummary();
      vgSaveBooking({
        tripName: bookingForm.dataset.tripName || 'Manali Snow Trek',
        tripImage: bookingForm.dataset.tripImage || 'https://picsum.photos/seed/manali-snow/200/200',
        travellerName: document.getElementById('travellerName').value,
        travellerEmail: document.getElementById('travellerEmail').value,
        travellerPhone: document.getElementById('travellerPhone').value,
        travelDate: document.getElementById('travelDate').value,
        travellers: count,
        subtotal, taxes, total,
        discount: 0,
        promo: '',
      });
      window.location.href = 'checkout.html';
    });
  }

  /* ================= checkout.html — review + promo ================= */
  const checkoutPage = document.getElementById('checkoutPage');
  if (checkoutPage) {
    const b = vgGetBooking();
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    set('coTripName', b.tripName || 'Manali Snow Trek');
    set('coTravellerName', b.travellerName || '—');
    set('coTravelDate', b.travelDate || '—');
    set('coTravellers', b.travellers || 1);
    const tripImg = document.getElementById('coTripImage');
    if (tripImg && b.tripImage) tripImg.src = b.tripImage;

    function renderTotals() {
      const cur = vgGetBooking();
      set('coSubtotal', vgFormatINR(cur.subtotal));
      set('coTaxes', vgFormatINR(cur.taxes));
      const discountLine = document.getElementById('coDiscountLine');
      if (cur.discount > 0) {
        discountLine && (discountLine.style.display = 'flex');
        set('coDiscount', '- ' + vgFormatINR(cur.discount));
      } else if (discountLine) {
        discountLine.style.display = 'none';
      }
      const total = (cur.subtotal || 0) + (cur.taxes || 0) - (cur.discount || 0);
      set('coTotal', vgFormatINR(total));
    }
    renderTotals();

    document.getElementById('promoForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('promoInput').value.trim().toUpperCase();
      const msg = document.getElementById('promoMsg');
      const known = { VOYAGE10: 0.10, WELCOME500: 500, GOLD15: 0.15 };
      const cur = vgGetBooking();

      if (code === 'WELCOME500') {
        vgSaveBooking({ discount: 500, promo: code });
        msg.textContent = '🎉 Promo applied: ₹500 off';
        msg.className = 'promo-applied';
      } else if (known[code]) {
        const discount = Math.round((cur.subtotal || 0) * known[code]);
        vgSaveBooking({ discount, promo: code });
        msg.textContent = `🎉 Promo applied: ${Math.round(known[code] * 100)}% off`;
        msg.className = 'promo-applied';
      } else {
        msg.textContent = 'Invalid promo code';
        msg.className = 'promo-applied';
        msg.style.color = 'var(--danger)';
      }
      renderTotals();
    });

    document.getElementById('goToPayment')?.addEventListener('click', () => {
      window.location.href = 'payment.html';
    });
  }

  /* ================= payment.html ================= */
  const paymentPage = document.getElementById('paymentPage');
  if (paymentPage) {
    const b = vgGetBooking();
    const total = (b.subtotal || 0) + (b.taxes || 0) - (b.discount || 0);
    const totalEl = document.getElementById('payTotal');
    if (totalEl) totalEl.textContent = vgFormatINR(total);

    // Tab switching
    const tabs = document.querySelectorAll('.pay-tab');
    const panels = document.querySelectorAll('.pay-panel');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.panel)?.classList.add('active');
      });
    });

    // UPI app chips
    document.querySelectorAll('.upi-apps button').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.upi-apps button').forEach((b2) => b2.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Card number formatting (spaces every 4 digits)
    const cardNumber = document.getElementById('cardNumber');
    cardNumber?.addEventListener('input', () => {
      cardNumber.value = cardNumber.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    });
    const cardExpiry = document.getElementById('cardExpiry');
    cardExpiry?.addEventListener('input', () => {
      let v = cardExpiry.value.replace(/\D/g, '').slice(0, 4);
      if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
      cardExpiry.value = v;
    });

    document.getElementById('payNowBtn')?.addEventListener('click', () => {
      const overlay = document.getElementById('payOverlay');
      overlay?.classList.add('open');
      setTimeout(() => {
        const bookingId = 'VG-' + Math.floor(30000 + Math.random() * 9000);
        vgSaveBooking({ bookingId, status: 'Confirmed', paidAt: new Date().toISOString() });
        window.location.href = 'booking-confirmation.html';
      }, 1800);
    });
  }

  /* ================= booking-confirmation.html ================= */
  const confirmPage = document.getElementById('confirmPage');
  if (confirmPage) {
    const b = vgGetBooking();
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('confBookingId', b.bookingId || 'VG-30021');
    set('confTripName', b.tripName || 'Manali Snow Trek');
    set('confTravelDate', b.travelDate || '—');
    set('confTravellers', b.travellers || 1);
    const total = (b.subtotal || 0) + (b.taxes || 0) - (b.discount || 0);
    set('confTotal', vgFormatINR(total));

    document.getElementById('downloadInvoiceBtn')?.addEventListener('click', () => {
      alert('Demo: your invoice would download here.');
    });
  }

  /* ================= booking-history.html ================= */
  const historyPage = document.getElementById('historyPage');
  if (historyPage) {
    const tabs = document.querySelectorAll('.history-tabs button');
    const cards = document.querySelectorAll('.booking-card');
    const emptyState = document.getElementById('historyEmpty');

    function applyFilter(status) {
      let visible = 0;
      cards.forEach((card) => {
        const match = status === 'all' || card.dataset.status === status;
        card.style.display = match ? 'grid' : 'none';
        if (match) visible++;
      });
      if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        applyFilter(tab.dataset.status);
      });
    });

    document.getElementById('historySearch')?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      let visible = 0;
      cards.forEach((card) => {
        const show = card.textContent.toLowerCase().includes(q);
        card.style.display = show ? 'grid' : 'none';
        if (show) visible++;
      });
      if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
    });

    document.querySelectorAll('.btn-view-details').forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.booking-card');
        document.getElementById('detailBookingId').textContent = card.dataset.id || '';
        document.getElementById('detailTripName').textContent = card.querySelector('h3')?.textContent || '';
        document.getElementById('detailMeta').textContent = card.querySelector('.meta')?.textContent || '';
        document.getElementById('detailPrice').textContent = card.querySelector('.price')?.textContent || '';
        openModal('bookingDetailModal');
      });
    });

    document.querySelectorAll('.btn-cancel-booking').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (confirm('Cancel this booking? This cannot be undone.')) {
          const card = btn.closest('.booking-card');
          const badge = card.querySelector('.status');
          if (badge) { badge.textContent = 'Cancelled'; badge.className = 'status cancelled'; }
          card.dataset.status = 'cancelled';
        }
      });
    });
  }
});
