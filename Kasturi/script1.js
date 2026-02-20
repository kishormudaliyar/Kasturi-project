/* ================================
   0️⃣ SESSION PROTECTION
================================ */

window.onload = function () {
    let loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
        window.location.href = "login.html";
        return;
    }

    let user = localStorage.getItem("username");
    let welcomeElement = document.getElementById("welcomeUser");
    if (user && welcomeElement) {
        welcomeElement.innerHTML = "Welcome, " + user + " 👋";
    }
};

/* ================================
   1️⃣ ADVANCED FRAUD MESSAGE CHECK
================================ */

function checkMessage() {

    let text = document.getElementById("fraudText").value.toLowerCase().trim();
    let result = document.getElementById("fraudResult");

    if (text === "") {
        result.innerHTML = "Please enter a message.";
        result.style.color = "orange";
        return;
    }

    const highRiskWords = [
        "otp", "verify", "bank", "account suspended",
        "lottery", "winner", "claim now", "urgent",
        "immediately", "click here", "limited time",
        "reward", "investment", "crypto", "free money"
    ];

    const moneyWords = [
        "money", "cash", "prize", "bonus", "offer"
    ];

    let score = 0;

    highRiskWords.forEach(word => {
        if (text.includes(word)) score += 2;
    });

    moneyWords.forEach(word => {
        if (text.includes(word)) score += 1;
    });

    // Detect suspicious links
    if (text.includes("http") || text.includes("www") || text.includes(".com")) {
        score += 2;
    }

    // Detect urgency + money combo
    if ((text.includes("urgent") || text.includes("immediately")) &&
        (text.includes("money") || text.includes("prize"))) {
        score += 3;
    }

    // Final decision
    if (score >= 6) {
        result.innerHTML = "🚨 HIGH RISK SCAM DETECTED!";
        result.style.color = "red";
    }
    else if (score >= 3) {
        result.innerHTML = "⚠️ Suspicious message. Be careful.";
        result.style.color = "orange";
    }
    else {
        result.innerHTML = "✅ Message appears safe.";
        result.style.color = "green";
    }
}



/* ================================
   2️⃣ ADVANCED LINK CHECK
================================ */

function checkLink() {

    let link = document.getElementById("linkInput").value.toLowerCase().trim();
    let result = document.getElementById("linkResult");

    if (link === "") {
        result.innerHTML = "Please enter a link.";
        result.style.color = "orange";
        return;
    }

    let score = 0;

    // Shortened links
    if (link.includes("bit.ly") || link.includes("tinyurl") || link.includes("t.co")) {
        score += 3;
    }

    // Suspicious characters
    if (link.includes("@") || link.includes("-secure") || link.includes("verify")) {
        score += 2;
    }

    // Too many numbers in URL
    let numberCount = (link.match(/\d/g) || []).length;
    if (numberCount > 5) score += 2;

    // Not https
    if (!link.startsWith("https")) score += 1;

    if (score >= 5) {
        result.innerHTML = "🚨 Dangerous Link Detected!";
        result.style.color = "red";
    }
    else if (score >= 2) {
        result.innerHTML = "⚠️ Suspicious link. Verify before opening.";
        result.style.color = "orange";
    }
    else {
        result.innerHTML = "✅ Link looks safe.";
        result.style.color = "green";
    }
}



/* ================================
   3️⃣ SMART DIGITAL ASSISTANT
================================ */

function askAssistant() {

    let question = document.getElementById("assistantInput").value.toLowerCase().trim();
    let result = document.getElementById("assistantResult");

    if (question === "") {
        result.innerHTML = "Ask something about online safety.";
        result.style.color = "orange";
        return;
    }

    if (question.includes("otp")) {
        result.innerHTML = "Never share OTP with anyone, even bank officials.";
    }
    else if (question.includes("hack")) {
        result.innerHTML = "Use strong passwords and enable 2-factor authentication.";
    }
    else if (question.includes("scam")) {
        result.innerHTML = "Scams often create urgency and request personal details.";
    }
    else if (question.includes("password")) {
        result.innerHTML = "Use a mix of letters, numbers & symbols for strong passwords.";
    }
    else {
        result.innerHTML = "Stay alert. Avoid suspicious links and unknown calls.";
    }

    result.style.color = "lightblue";
}



/* ================================
   4️⃣ FAKE PROFILE DETECTOR
================================ */

function checkProfile() {

    let text = document.getElementById("profileInput").value.toLowerCase().trim();
    let result = document.getElementById("profileResult");

    if (text === "") {
        result.innerHTML = "Enter profile details.";
        result.style.color = "orange";
        return;
    }

    let score = 0;

    const scamIndicators = [
        "investment", "crypto", "quick money",
        "guaranteed return", "urgent", "dm me",
        "business opportunity"
    ];

    scamIndicators.forEach(word => {
        if (text.includes(word)) score += 2;
    });

    if (text.includes("model") && text.includes("dm")) score += 2;

    if (score >= 4) {
        result.innerHTML = "🚨 High probability fake/scam profile!";
        result.style.color = "red";
    }
    else if (score >= 2) {
        result.innerHTML = "⚠️ Profile seems suspicious.";
        result.style.color = "orange";
    }
    else {
        result.innerHTML = "✅ Profile appears normal.";
        result.style.color = "green";
    }
}



/* ================================
   5️⃣ SMART PERSONAL DATA MASKING
================================ */

function maskPersonalData() {

    let text = document.getElementById("maskInput").value;
    let result = document.getElementById("maskResult");

    if (text.trim() === "") {
        result.innerHTML = "Please enter text.";
        result.style.color = "orange";
        return;
    }

    // Mask phone numbers
    text = text.replace(/\b\d{10}\b/g, "**********");

    // Mask OTP
    text = text.replace(/\b\d{4,6}\b/g, "****");

    // Mask email
    text = text.replace(
        /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
        "[email hidden]"
    );

    // Mask card numbers
    text = text.replace(/\b\d{16}\b/g, "****************");

    result.innerHTML = text;
    result.style.color = "yellow";
}
function goToDetection() {
    window.location.href = "detection.html";
}
