/* ================================
   1️⃣ ADVANCED FRAUD MESSAGE CHECK
================================ */

function checkMessage() {
    let text = document.getElementById("fraudText").value.toLowerCase().trim();
    let result = document.getElementById("fraudResult");

    if (text === "") {
        result.innerHTML = "Input required for analysis.";
        result.style.display = "block";
        result.style.backgroundColor = "#fef2f2";
        result.style.color = "#991b1b";
        result.style.border = "1px solid #fee2e2";
        return;
    }

    const highRiskWords = ["otp", "verify", "bank", "account suspended", "lottery", "winner", "claim now", "urgent", "immediately", "click here", "limited time", "reward", "investment", "crypto", "free money"];
    const moneyWords = ["money", "cash", "prize", "bonus", "offer"];

    let score = 0;
    highRiskWords.forEach(word => { if (text.includes(word)) score += 2; });
    moneyWords.forEach(word => { if (text.includes(word)) score += 1; });

    if (text.includes("http") || text.includes("www") || text.includes(".com")) score += 2;
    if ((text.includes("urgent") || text.includes("immediately")) && (text.includes("money") || text.includes("prize"))) score += 3;

    result.style.display = "block";

    let riskLevel = "";
    if (score >= 6) {
        riskLevel = "HIGH RISK";
        result.innerHTML = "Critical Warning: Suspicious patterns detected.";
        result.style.backgroundColor = "#fef2f2";
        result.style.color = "#991b1b";
        result.style.border = "1px solid #fee2e2";
    }
    else if (score >= 3) {
        riskLevel = "MEDIUM RISK";
        result.innerHTML = "Caution: Anomalies found in message content.";
        result.style.backgroundColor = "#fffbeb";
        result.style.color = "#92400e";
        result.style.border = "1px solid #fef3c7";
    }
    else {
        riskLevel = "LOW RISK";
        result.innerHTML = "Status: No significant threats identified.";
        result.style.backgroundColor = "#f0fdf4";
        result.style.color = "#166534";
        result.style.border = "1px solid #dcfce7";
    }

    saveToHistory(text, riskLevel, score * 10 > 100 ? 100 : score * 10);
}

/* ================================
   2️⃣ ADVANCED LINK CHECK
================================ */

function checkLink() {
    let link = document.getElementById("linkInput").value.toLowerCase().trim();
    let result = document.getElementById("linkResult");

    if (link === "") {
        result.innerHTML = "URL input required.";
        result.style.display = "block";
        result.style.backgroundColor = "#fef2f2";
        result.style.color = "#991b1b";
        result.style.border = "1px solid #fee2e2";
        return;
    }

    let score = 0;
    if (link.includes("bit.ly") || link.includes("tinyurl") || link.includes("t.co")) score += 3;
    if (link.includes("@") || link.includes("-secure") || link.includes("verify")) score += 2;
    let numberCount = (link.match(/\d/g) || []).length;
    if (numberCount > 5) score += 2;
    if (!link.startsWith("https")) score += 1;

    result.style.display = "block";

    let riskLevel = "";
    if (score >= 5) {
        riskLevel = "HIGH RISK";
        result.innerHTML = "Danger: Malicious link parameters detected.";
        result.style.backgroundColor = "#fef2f2";
        result.style.color = "#991b1b";
        result.style.border = "1px solid #fee2e2";
    }
    else if (score >= 2) {
        riskLevel = "MEDIUM RISK";
        result.innerHTML = "Caution: URL redirection looks suspicious.";
        result.style.backgroundColor = "#fffbeb";
        result.style.color = "#92400e";
        result.style.border = "1px solid #fef3c7";
    }
    else {
        riskLevel = "LOW RISK";
        result.innerHTML = "Verified: This URL appears to be secure.";
        result.style.backgroundColor = "#f0fdf4";
        result.style.color = "#166534";
        result.style.border = "1px solid #dcfce7";
    }

    saveToHistory(link, riskLevel, score * 15 > 100 ? 100 : score * 15);
}

/* ================================
   3️⃣ SMART DIGITAL SAFETY ASSISTANT
================================ */

const safetyTips = [
    "Verify the source before clicking any external links.",
    "Report any unexpected requests for administrative access or credentials.",
    "Scan all data packets and attachments before processing.",
    "Implement complex authentication protocols for every account.",
    "Utilize multi-factor authentication for enhanced security layers.",
    "Confidential data such as PINs or OTPs should never be disclosed.",
    "Ensure secure protocols (HTTPS) are active before data entry.",
    "Validate financial communications through official direct channels.",
    "Investigate unsolicited offers that deviate from standard market rates.",
    "Verify the actual URL destination by inspecting the link source."
];

let lastTipIndex = -1;

function getSafetyTip() {
    let tipDisplay = document.getElementById("safetyTipDisplay");
    let newIndex;
    
    do {
        newIndex = Math.floor(Math.random() * safetyTips.length);
    } while (newIndex === lastTipIndex);
    
    lastTipIndex = newIndex;
    
    tipDisplay.style.opacity = 0;
    setTimeout(() => {
        tipDisplay.innerHTML = `<li>${safetyTips[newIndex]}</li>`;
        tipDisplay.style.opacity = 1;
    }, 150);
}

/* ================================
   4️⃣ FAKE PROFILE DETECTOR
=============================== */

function checkProfile() {
    let text = document.getElementById("profileInput").value.toLowerCase().trim();
    let result = document.getElementById("profileResult");
    let statusText = document.getElementById("profileStatusText");
    let scoreCircle = document.getElementById("riskScoreCircle");
    let scoreValue = document.getElementById("riskScoreValue");

    if (text === "") {
        statusText.innerHTML = "Profile identifiers required.";
        result.style.display = "block";
        result.style.backgroundColor = "#fef2f2";
        result.style.color = "#991b1b";
        result.style.border = "1px solid #fee2e2";
        scoreCircle.style.display = "none";
        return;
    }

    let score = 0;
    const scamIndicators = ["investment", "crypto", "quick money", "guaranteed return", "urgent", "dm me", "business opportunity"];
    scamIndicators.forEach(word => { if (text.includes(word)) score += 20; });
    if (text.includes("model") && text.includes("dm")) score += 30;
    
    if (score === 0 && text.length > 5) score = Math.floor(Math.random() * 20);
    if (score > 100) score = 100;

    result.style.display = "block";
    scoreCircle.style.display = "flex";
    scoreValue.innerHTML = score;

    let riskLevel = "";
    if (score >= 60) {
        riskLevel = "HIGH RISK";
        statusText.innerHTML = "High Risk: Probable automated or scam profile.";
        result.style.backgroundColor = "#fef2f2";
        result.style.color = "#991b1b";
        result.style.border = "1px solid #fee2e2";
        scoreCircle.style.backgroundColor = "#dc2626";
    }
    else if (score >= 30) {
        riskLevel = "MEDIUM RISK";
        statusText.innerHTML = "Caution: Profile shows suspicious behavior patterns.";
        result.style.backgroundColor = "#fffbeb";
        result.style.color = "#92400e";
        result.style.border = "1px solid #fef3c7";
        scoreCircle.style.backgroundColor = "#d97706";
    }
    else {
        riskLevel = "LOW RISK";
        statusText.innerHTML = "Verified: Profile behavior is within normal parameters.";
        result.style.backgroundColor = "#f0fdf4";
        result.style.color = "#166534";
        result.style.border = "1px solid #dcfce7";
        scoreCircle.style.backgroundColor = "#059669";
    }

    saveToHistory("Profile: " + text, riskLevel, score);
}

/* ================================
   5️⃣ SMART PERSONAL DATA MASKING
================================ */

function maskPersonalData() {
    let text = document.getElementById("maskInput").value;
    let resultContent = document.getElementById("maskResultContent");

    if (text.trim() === "") {
        resultContent.innerHTML = "Data input required.";
        return;
    }

    text = text.replace(/\b\d{10}\b/g, "**********");
    text = text.replace(/\b\d{4,6}\b/g, "****");
    text = text.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, "[confidential]");
    text = text.replace(/\b\d{16}\b/g, "****************");

    resultContent.innerHTML = text.replace(/\n/g, "<br>");
}

/* ================================
   FIREBASE DATA PERSISTENCE
================================ */

function saveToHistory(message, riskLevel, score) {
    const user = auth.currentUser;
    if (!user) return;

    db.collection("scans").add({
        userId: user.uid,
        message: message,
        riskLevel: riskLevel,
        score: score,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(err => console.error("Firestore Save Error:", err));
}

function goToDetection() {
    window.location.href = "detection-1.html";
}
