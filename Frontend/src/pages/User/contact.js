// contact.js

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const subject = contactForm.querySelectorAll('input[type="text"]')[1].value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        alert("⚠️ Please fill in all fields.");
        return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("❌ Please enter a valid email address.");
        return;
    }

    // Success
    alert(`✅ Thank you, ${name}!\n\nYour message has been sent successfully.\nWe'll get back to you soon.`);

    // Reset form
    contactForm.reset();
});