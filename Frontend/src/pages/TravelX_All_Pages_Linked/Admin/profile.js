
document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // PROFILE ELEMENTS
  // ==============================

  const profileForm = document.getElementById("profileForm");
  const passwordForm = document.getElementById("passwordForm");

  const fullName = document.getElementById("fullName");
  const role = document.getElementById("role");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const department = document.getElementById("department");
  const location = document.getElementById("location");

  const sideName = document.getElementById("sideName");
  const sideRole = document.getElementById("sideRole");
  const sideEmail = document.getElementById("sideEmail");
  const avatarInitials = document.getElementById("avatarInitials");

  const profileMessage = document.getElementById("profileMessage");
  const passwordMessage = document.getElementById("passwordMessage");

  // ==============================
  // DEFAULT PROFILE DATA
  // ==============================

  const defaultProfile = {
    fullName: "Laksh Surve",
    role: "Super Administrator",
    email: "laksh@travelx.com",
    phone: "+91 98765 43210",
    department: "Administration",
    location: "Mumbai, India"
  };

  let profileData = JSON.parse(
    localStorage.getItem("travelXAdminProfile")
  ) || defaultProfile;

  // ==============================
  // GENERATE AVATAR INITIALS
  // ==============================

  function getInitials(name) {
    return name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join("");
  }

  // ==============================
  // UPDATE PROFILE UI
  // ==============================

  function updateProfileUI() {

    sideName.textContent = profileData.fullName;
    sideRole.textContent = profileData.role;
    sideEmail.textContent = profileData.email;

    avatarInitials.textContent = getInitials(profileData.fullName);

    fullName.value = profileData.fullName;
    role.value = profileData.role;
    email.value = profileData.email;
    phone.value = profileData.phone;
    department.value = profileData.department;
    location.value = profileData.location;

    // Update topbar avatar
    const miniAvatar = document.querySelector(".avatar-mini");

    if (miniAvatar) {
      miniAvatar.textContent = getInitials(profileData.fullName);
    }
  }

  updateProfileUI();

  // ==============================
  // SHOW MESSAGE
  // ==============================

  function showMessage(element, message, type) {

    element.textContent = message;

    element.style.color =
      type === "success" ? "#16a34a" : "#dc2626";

    element.style.fontWeight = "500";
  }

  // ==============================
  // SAVE PROFILE
  // ==============================

  profileForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nameValue = fullName.value.trim();
    const roleValue = role.value.trim();
    const emailValue = email.value.trim();

    if (!nameValue || !roleValue || !emailValue) {
      showMessage(
        profileMessage,
        "Please fill all required fields.",
        "error"
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      showMessage(
        profileMessage,
        "Please enter a valid email address.",
        "error"
      );
      return;
    }

    profileData = {
      fullName: nameValue,
      role: roleValue,
      email: emailValue,
      phone: phone.value.trim(),
      department: department.value,
      location: location.value.trim()
    };

    localStorage.setItem(
      "travelXAdminProfile",
      JSON.stringify(profileData)
    );

    updateProfileUI();

    showMessage(
      profileMessage,
      "✓ Profile updated successfully!",
      "success"
    );

  });

  // ==============================
  // PASSWORD CHANGE
  // ==============================

  passwordForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const currentPassword =
      document.getElementById("currentPassword").value;

    const newPassword =
      document.getElementById("newPassword").value;

    const confirmPassword =
      document.getElementById("confirmPassword").value;

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage(
        passwordMessage,
        "All password fields are required.",
        "error"
      );
      return;
    }

    if (newPassword.length < 8) {
      showMessage(
        passwordMessage,
        "Password must contain at least 8 characters.",
        "error"
      );
      return;
    }

    if (newPassword === currentPassword) {
      showMessage(
        passwordMessage,
        "New password must be different from current password.",
        "error"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage(
        passwordMessage,
        "New password and confirmation do not match.",
        "error"
      );
      return;
    }

    // Frontend demonstration only
    showMessage(
      passwordMessage,
      "✓ Password validation successful! Connect your backend to update it securely.",
      "success"
    );

    passwordForm.reset();

  });

  // ==============================
  // CLEAR MESSAGES WHILE TYPING
  // ==============================

  profileForm.addEventListener("input", () => {
    profileMessage.textContent = "";
  });

  passwordForm.addEventListener("input", () => {
    passwordMessage.textContent = "";
  });

});