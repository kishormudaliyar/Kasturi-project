// SESSION PROTECTION
window.onload = function () {
    let loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn !== "true") {
        window.location.href = "login.html";
    }
};

function goDashboard() {
    window.location.href = "dashboard.html";
}

document.getElementById("scanBtn").addEventListener("click", function () {

    const input = document.getElementById("aiInput").value.toLowerCase();

    if (input.trim() === "") {
        alert("Please enter a message to scan.");
        return;
    }

    document.getElementById("scanText").classList.remove("hidden");

    setTimeout(function () {

        document.getElementById("scanText").classList.add("hidden");

        let risk = "LOW RISK";
        let score = "20%";
        let explanation = "No major suspicious elements detected.";
        let safety = "Stay cautious and verify sender details.";

        if (input.includes("bank") || input.includes("otp") || input.includes("http") || input.includes("click")) {
            risk = "HIGH RISK";
            score = "75%";
            explanation = "Detected suspicious keywords like bank, OTP, or suspicious link.";
            safety = "Do NOT click any links. Do NOT share OTP. Report immediately!";
        }

        document.getElementById("riskTitle").innerText = risk;
        document.getElementById("riskScore").innerText = "AI Risk Score: " + score;
        document.getElementById("explanationText").innerText = explanation;
        document.getElementById("safetyText").innerText = safety;

        document.getElementById("resultCard").classList.remove("hidden");
        document.getElementById("explanationCard").classList.remove("hidden");
        document.getElementById("safetyCard").classList.remove("hidden");

    }, 1500);

});
