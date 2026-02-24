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

    let nameInput = document.getElementById("name");
    let phoneInput = document.getElementById("phone");
    let error = document.getElementById("loginError");

    if (!nameInput || !phoneInput) return;

    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim();

    error.innerHTML = "";

    // Check empty fields
    if (name === "" || phone === "") {
        error.innerHTML = "❌ Please fill all fields.";
        error.style.color = "red";
        return;
    }

    // Validate phone (10 digits only)
    let phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {
        error.innerHTML = "❌ Enter valid 10-digit phone number.";
        error.style.color = "red";
        return;
    }

    // Save login session
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", name);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
}



/* =====================================
   SESSION PROTECTION (Optional but Important)
===================================== */

window.onload = function () {

    // If user tries to open dashboard without login
    if (window.location.pathname.includes("dashboard.html")) {

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
   LOGOUT FUNCTION (Optional)
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

    let selectedLang = document.getElementById("languageSelect").value;

    document.getElementById("loginTitle").innerText =
        translations[selectedLang].title;

    document.getElementById("name").placeholder =
        translations[selectedLang].name;

    document.getElementById("phone").placeholder =
        translations[selectedLang].phone;

    document.getElementById("loginBtn").innerText =
        translations[selectedLang].button;
}
// LOGIN BUTTON CLICK
document.getElementById("loginBtn").addEventListener("click", function () {

    const name = document.getElementById("nameInput").value;
    const phone = document.getElementById("phoneInput").value;

    if (name === "" || phone === "") {
        alert("Please fill all details");
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Enter valid 10-digit phone number");
        return;
    }

    // If everything correct → go to dashboard
    window.location.href = "dashboard.html";
});

            