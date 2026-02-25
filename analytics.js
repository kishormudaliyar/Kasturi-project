/* =====================================
   ANALYTICS MANAGEMENT (Firestore)
===================================== */

auth.onAuthStateChanged((user) => {
    if (user) {
        loadAnalytics(user.uid);
    }
});

function loadAnalytics(userId) {
    db.collection("scans")
        .where("userId", "==", userId)
        .onSnapshot((querySnapshot) => {
            let total = querySnapshot.size;
            let high = 0;
            let medium = 0;
            let low = 0;

            querySnapshot.forEach((doc) => {
                const item = doc.data();
                if (item.riskLevel.includes("HIGH")) high++;
                else if (item.riskLevel.includes("MEDIUM")) medium++;
                else if (item.riskLevel.includes("LOW")) low++;
            });

            // Update DOM
            if (document.getElementById("totalScans")) document.getElementById("totalScans").innerText = total;
            if (document.getElementById("highCount")) document.getElementById("highCount").innerText = high;
            if (document.getElementById("mediumCount")) document.getElementById("mediumCount").innerText = medium;
            if (document.getElementById("lowCount")) document.getElementById("lowCount").innerText = low;

            // Percentages
            let highPercent = total ? Math.round((high / total) * 100) : 0;
            let mediumPercent = total ? Math.round((medium / total) * 100) : 0;
            let lowPercent = total ? Math.round((low / total) * 100) : 0;

            if (document.getElementById("highBar")) document.getElementById("highBar").style.width = highPercent + "%";
            if (document.getElementById("mediumBar")) document.getElementById("mediumBar").style.width = mediumPercent + "%";
            if (document.getElementById("lowBar")) document.getElementById("lowBar").style.width = lowPercent + "%";

            if (document.getElementById("highPerc")) document.getElementById("highPerc").innerText = highPercent + "%";
            if (document.getElementById("mediumPerc")) document.getElementById("mediumPerc").innerText = mediumPercent + "%";
            if (document.getElementById("lowPerc")) document.getElementById("lowPerc").innerText = lowPercent + "%";
        });
}

function goDashboard() {
    window.location.href = "dashboard.html";
}
