document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const toggleBtn = document.querySelector(".toggle-pass");
    const errorMsg = document.querySelector(".error-msg");

    /* Toggle Password */
    toggleBtn?.addEventListener("click", () => {

        const isPassword = passwordInput.type === "password";

        passwordInput.type = isPassword ? "text" : "password";
        toggleBtn.textContent = isPassword ? "🙈" : "👁️";
    });

    /* Login */
    form?.addEventListener("submit", loginUser);

    function loginUser(e) {

        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            return showError("Please fill in all fields.");
        }

        // Centralized Credentials
        const USERS = [
            {
                email: "admin@voyageora.com",
                password: "admin123",
                role: "admin",
                name: "Administrator",
                redirect: "admin-dashboard.html"
            },
            {
                email: "user@voyageora.com",
                password: "user123",
                role: "user",
                name: "Guest",
                redirect: "index.html"
            }
        ];

        const user = USERS.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            return showError("Invalid email or password.");
        }

        // Store Login Session
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userName", user.name);
        sessionStorage.setItem("userRole", user.role);
        sessionStorage.setItem("userEmail", user.email);

        window.location.href = user.redirect;
    }

    function showError(message) {

        errorMsg.textContent = message;
        errorMsg.classList.add("show");

        setTimeout(() => {
            errorMsg.classList.remove("show");
        }, 4000);
    }

    emailInput?.focus();

});