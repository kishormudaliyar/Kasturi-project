// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkHHhbzpEfwU0iauxjQedLqXiLDah3yWo",
  authDomain: "cybersecurityx-358c2.firebaseapp.com",
  projectId: "cybersecurityx-358c2",
  storageBucket: "cybersecurityx-358c2.firebasestorage.app",
  messagingSenderId: "1065963580714",
  appId: "1:1065963580714:web:c5f6f4db566f3395384253",
  measurementId: "G-7G35TZ7Q0E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

/* =====================================
   SESSION PROTECTION
===================================== */

auth.onAuthStateChanged((user) => {
    const protectedPages = ["dashboard.html", "detection-1.html", "scan-history.html", "analytics.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (user) {
        // User is signed in
        if (currentPage === "login.html" || currentPage === "index.html") {
            window.location.href = "dashboard.html";
        }
        
        // Show welcome message and profile pic
        const welcomeElement = document.getElementById("welcomeUser");
        if (welcomeElement) {
            welcomeElement.innerHTML = `Welcome, ${user.displayName || "User"} 👋`;
        }

        const profilePic = document.getElementById("userProfilePic");
        if (profilePic && user.photoURL) {
            profilePic.src = user.photoURL;
            profilePic.style.display = "block";
        }
    } else {
        // User is signed out
        if (protectedPages.includes(currentPage)) {
            window.location.href = "login.html";
        }
    }
});

/* =====================================
   WINDOW 1 - INDEX (Start Demo)
===================================== */

function startDemo() {
    window.location.href = "login.html";
}

/* =====================================
   WINDOW 2 - LOGIN VALIDATION
===================================== */

async function loginUser() {
    let nameInput = document.getElementById("nameInput");
    let phoneInput = document.getElementById("phoneInput");
    
    if (!nameInput || !phoneInput) return;

    let name = nameInput.value.trim();
    let phone = phoneInput.value.trim();

    if (name === "" || phone === "") {
        alert("❌ Please fill all fields.");
        return;
    }

    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("❌ Enter valid 10-digit phone number.");
        return;
    }

    try {
        // Sign in anonymously with Firebase
        const userCredential = await auth.signInAnonymously();
        const user = userCredential.user;

        // Update profile with name
        await user.updateProfile({
            displayName: name
        });

        // Store user data in Firestore
        await db.collection("users").doc(user.uid).set({
            name: name,
            phone: phone,
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Login Error:", error);
        alert("Login failed: " + error.message);
    }
}

async function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await auth.signInWithPopup(provider);
        const user = result.user;

        // Store user data in Firestore
        await db.collection("users").doc(user.uid).set({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Google Login Error:", error);
        alert("Google Sign-In failed: " + error.message);
    }
}

/* =====================================
   LOGOUT FUNCTION
===================================== */

function logoutUser() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
}

/* ===========================
   MULTI LANGUAGE SYSTEM
=========================== */

const translations = {
    en: { title: "Login / Register", name: "Enter your name", phone: "Enter 10-digit phone number", button: "Login" },
    hi: { title: "लॉगिन / रजिस्टर", name: "अपना नाम दर्ज करें", phone: "10 अंकों का मोबाइल नंबर दर्ज करें", button: "लॉगिन करें" },
    mr: { title: "लॉगिन / नोंदणी", name: "तुमचे नाव टाका", phone: "10 अंकी मोबाईल नंबर टाका", button: "लॉगिन करा" }
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
