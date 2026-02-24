/* =====================================
   SESSION PROTECTION
===================================== */

window.onload = function () {
    // Check if we are on dashboard or detection pages
    const protectedPages = ["dashboard.html", "detection-1.html", "scan-history.html", "analytics.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (protectedPages.includes(currentPage)) {
        let loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn !== "true") {
            window.location.href = "login.html";
        }
    }

    // Show welcome message if exists
    let user = localStorage.getItem("username");
    let welcomeElement = document.getElementById("welcomeUser");
    if (user && welcomeElement) {
        welcomeElement.innerHTML = "Welcome, " + user + " 👋";
    }
};

/* =====================================
   WINDOW 1 - INDEX (Start Demo)
===================================== */

function startDemo() {
    window.location.href = "login.html";
}

/* =====================================
   WINDOW 2 - LOGIN VALIDATION
===================================== */

function loginUser() {
    let nameInput = document.getElementById("nameInput");
    let phoneInput = document.getElementById("phoneInput");
    
    if (!nameInput || !phoneInput) return;

    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim();

    // Check empty fields
    if (name === "" || phone === "") {
        alert("❌ Please fill all fields.");
        return;
    }

    // Validate phone (10 digits only)
    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("❌ Enter valid 10-digit phone number.");
        return;
    }

    // Save login session
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", name);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
}

/* =====================================
   LOGOUT FUNCTION
===================================== */

function logoutUser() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "index.html";
}

/* ===========================
   MULTI LANGUAGE SYSTEM
=========================== */

const translations = {
    en: {
        title: "Login / Register",
        name: "Enter your name",
        phone: "Enter 10-digit phone number",
        button: "Login"
    },
    hi: {
        title: "लॉगिन / रजिस्टर",
        name: "अपना नाम दर्ज करें",
        phone: "10 अंकों का मोबाइल नंबर दर्ज करें",
        button: "लॉगिन करें"
    },
    mr: {
        title: "लॉगिन / नोंदणी",
        name: "तुमचे नाव टाका",
        phone: "10 अंकी मोबाईल नंबर टाका",
        button: "लॉगिन करा"
    }
};

function changeLanguage() {
    let langSelect = document.getElementById("languageSelect");
    if (!langSelect) return;
    
    let selectedLang = langSelect.value;
    
    const title = document.getElementById("loginTitle");
    const name = document.getElementById("nameInput");
    const phone = document.getElementById("phoneInput");
    const btn = document.getElementById("loginBtn");

    if (title) title.innerText = translations[selectedLang].title;
    if (name) name.placeholder = translations[selectedLang].name;
    if (phone) phone.placeholder = translations[selectedLang].phone;
    if (btn) btn.innerText = translations[selectedLang].button;
}

// Attach event listener for login button if it exists
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", loginUser);
    }
    
    const langSelect = document.getElementById("languageSelect");
    if (langSelect) {
        langSelect.addEventListener("change", changeLanguage);
    }
});
