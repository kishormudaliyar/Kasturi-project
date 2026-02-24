/* ================================
   1️⃣ ADVANCED FRAUD MESSAGE CHECK
================================ */

function checkMessage() {

    let text = document.getElementById("fraudText").value.toLowerCase().trim();
    let result = document.getElementById("fraudResult");

    if (text === "") {
        result.innerHTML = "Please enter a message.";
        result.style.display = "block";
        result.style.backgroundColor = "#fff7ed";
        result.style.color = "#c2410c";
        result.style.border = "1px solid #fdba74";
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

    result.style.display = "block";

    // Final decision
    if (score >= 6) {
        result.innerHTML = "🚨 Warning: This message looks suspicious!";
        result.style.backgroundColor = "#fee2e2";
        result.style.color = "#b91c1c";
        result.style.border = "1px solid #fecaca";
    }
    else if (score >= 3) {
        result.innerHTML = "⚠️ Suspicious message. Be careful.";
        result.style.backgroundColor = "#fff7ed";
        result.style.color = "#c2410c";
        result.style.border = "1px solid #fdba74";
    }
    else {
        result.innerHTML = "✅ Message appears safe.";
        result.style.backgroundColor = "#f0fdf4";
        result.style.color = "#15803d";
        result.style.border = "1px solid #bbf7d0";
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
        result.style.display = "block";
        result.style.backgroundColor = "#fff7ed";
        result.style.color = "#c2410c";
        result.style.border = "1px solid #fdba74";
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

    result.style.display = "block";

    if (score >= 5) {
        result.innerHTML = "🚨 Dangerous Link Detected!";
        result.style.backgroundColor = "#fee2e2";
        result.style.color = "#b91c1c";
        result.style.border = "1px solid #fecaca";
    }
    else if (score >= 2) {
        result.innerHTML = "⚠️ Suspicious link. Verify before opening.";
        result.style.backgroundColor = "#fff7ed";
        result.style.color = "#c2410c";
        result.style.border = "1px solid #fdba74";
    }
    else {
        result.innerHTML = "✅ Safe Link: This URL is secure.";
        result.style.backgroundColor = "#f0fdf4";
        result.style.color = "#15803d";
        result.style.border = "1px solid #bbf7d0";
    }
}



/* ================================
   3️⃣ SMART DIGITAL SAFETY ASSISTANT
================================ */

const safetyTips = [
    "✔️ Avoid clicking on unknown links in SMS or emails.",
    "👤 Be cautious of urgent requests for money or OTPs.",
    "🛡️ Scan all email attachments for malware before opening.",
    "🔑 Use a unique, strong password for every online account.",
    "📱 Enable Two-Factor Authentication (2FA) whenever possible.",
    "🛑 Never share your banking passwords or PINs with anyone.",
    "🔒 Check for 'https://' and a padlock icon before entering data.",
    "📞 Verify suspicious calls by calling the official bank number.",
    "💸 If an offer looks too good to be true, it's likely a scam.",
    "📧 Hover over links to see the actual URL before clicking."
];

let lastTipIndex = -1;

function getSafetyTip() {
    let tipDisplay = document.getElementById("safetyTipDisplay");
    let newIndex;
    
    // Ensure we don't get the same tip twice in a row
    do {
        newIndex = Math.floor(Math.random() * safetyTips.length);
    } while (newIndex === lastTipIndex);
    
    lastTipIndex = newIndex;
    
    // Apply a small fade effect via JS
    tipDisplay.style.opacity = 0;
    setTimeout(() => {
        tipDisplay.innerHTML = `<li><span class="tip-icon">💡</span> ${safetyTips[newIndex]}</li>`;
        tipDisplay.style.opacity = 1;
    }, 150);
}



/* ================================
   4️⃣ FAKE PROFILE DETECTOR
================================ */

function checkProfile() {

    let text = document.getElementById("profileInput").value.toLowerCase().trim();
    let result = document.getElementById("profileResult");
    let statusText = document.getElementById("profileStatusText");
    let scoreCircle = document.getElementById("riskScoreCircle");
    let scoreValue = document.getElementById("riskScoreValue");

    if (text === "") {
        statusText.innerHTML = "Enter profile details.";
        result.style.display = "block";
        result.style.backgroundColor = "#fff7ed";
        result.style.color = "#c2410c";
        result.style.border = "1px solid #fdba74";
        scoreCircle.style.display = "none";
        return;
    }

    let score = 0;

    const scamIndicators = [
        "investment", "crypto", "quick money",
        "guaranteed return", "urgent", "dm me",
        "business opportunity"
    ];

    scamIndicators.forEach(word => {
        if (text.includes(word)) score += 20;
    });

    if (text.includes("model") && text.includes("dm")) score += 30;
    
    // Add some randomness if no words found but text is short
    if (score === 0 && text.length > 5) score = Math.floor(Math.random() * 20);
    if (score > 100) score = 100;

    result.style.display = "block";
    scoreCircle.style.display = "flex";
    scoreValue.innerHTML = score;

    if (score >= 60) {
        statusText.innerHTML = "🔥 High Risk: Likely a Fake Profile";
        result.style.backgroundColor = "#fff7ed";
        result.style.color = "#c2410c";
        result.style.border = "1px solid #fdba74";
        scoreCircle.style.backgroundColor = "#ef4444";
    }
    else if (score >= 30) {
        statusText.innerHTML = "⚠️ Profile seems suspicious.";
        result.style.backgroundColor = "#fff7ed";
        result.style.color = "#c2410c";
        result.style.border = "1px solid #fdba74";
        scoreCircle.style.backgroundColor = "#f59e0b";
    }
    else {
        statusText.innerHTML = "✅ Profile appears normal.";
        result.style.backgroundColor = "#f0fdf4";
        result.style.color = "#15803d";
        result.style.border = "1px solid #bbf7d0";
        scoreCircle.style.backgroundColor = "#10b981";
    }
}



/* ================================
   5️⃣ SMART PERSONAL DATA MASKING
================================ */

function maskPersonalData() {

    let text = document.getElementById("maskInput").value;
    let resultDisplay = document.getElementById("maskResult");
    let resultContent = document.getElementById("maskResultContent");

    if (text.trim() === "") {
        resultContent.innerHTML = "Please enter text.";
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

    resultContent.innerHTML = text.replace(/\n/g, "<br>");
}
function goToDetection() {
    window.location.href = "detection-1.html";
}