window.onload = function () {

    const history = JSON.parse(localStorage.getItem("scanHistory")) || [];

    let total = history.length;
    let high = 0;
    let medium = 0;
    let low = 0;

    history.forEach(item => {

        if (!item.riskLevel) return;

        if (item.riskLevel.includes("HIGH")) {
            high++;
        } 
        else if (item.riskLevel.includes("MEDIUM")) {
            medium++;
        } 
        else if (item.riskLevel.includes("LOW")) {
            low++;
        }
    });

    // Update numbers
    document.getElementById("totalScans").innerText = total;
    document.getElementById("highCount").innerText = high;
    document.getElementById("mediumCount").innerText = medium;
    document.getElementById("lowCount").innerText = low;

    // Calculate percentages for bars
    let highPercent = total ? (high / total) * 100 : 0;
    let mediumPercent = total ? (medium / total) * 100 : 0;
    let lowPercent = total ? (low / total) * 100 : 0;

    document.getElementById("highBar").style.width = highPercent + "%";
    document.getElementById("mediumBar").style.width = mediumPercent + "%";
    document.getElementById("lowBar").style.width = lowPercent + "%";
};


/* Back Button */
function goDashboard() {
    window.location.href = "dashboard.html";
}