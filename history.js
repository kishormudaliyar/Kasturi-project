const tableBody = document.querySelector("#historyTable tbody");

// Load history when page loads
window.onload = function () {

    const history = JSON.parse(localStorage.getItem("scanHistory")) || [];
    const tableBody = document.getElementById("historyTable");

    tableBody.innerHTML = "";

    history.forEach(item => {

        const row = `
            <tr>
                <td>${item.message}</td>
                <td>${item.riskLevel}</td>
                <td>${item.score}%</td>
                <td>${item.date}</td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });

};
function clearHistory() {

    const confirmClear = confirm("Are you sure you want to clear scan history?");

    if (confirmClear) {
        localStorage.removeItem("scanHistory");

        alert("Scan history cleared successfully ✅");

        // If you are on history page, refresh table
        if (document.getElementById("historyTable")) {
            document.getElementById("historyTable").innerHTML = "";
        }
    }
}
function goanalytics() {
    window.location.href = "analytics.html";
}