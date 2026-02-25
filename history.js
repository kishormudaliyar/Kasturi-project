/* =====================================
   HISTORY MANAGEMENT (Firestore)
===================================== */

auth.onAuthStateChanged((user) => {
    if (user) {
        loadHistory(user.uid);
    }
});

function loadHistory(userId) {
    const tableBody = document.querySelector("#historyTable tbody");
    if (!tableBody) return;

    db.collection("scans")
        .where("userId", "==", userId)
        .orderBy("timestamp", "desc")
        .onSnapshot((querySnapshot) => {
            tableBody.innerHTML = "";
            querySnapshot.forEach((doc) => {
                const item = doc.data();
                const date = item.timestamp ? item.timestamp.toDate().toLocaleString() : "Processing...";
                
                let riskClass = "low";
                if (item.riskLevel.includes("HIGH")) riskClass = "high";
                else if (item.riskLevel.includes("MEDIUM")) riskClass = "medium";

                const row = `
                    <tr>
                        <td>${item.message}</td>
                        <td class="${riskClass}">${item.riskLevel}</td>
                        <td>${item.score}%</td>
                        <td>${date}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }, (error) => {
            console.error("Firestore Load Error:", error);
        });
}

function clearHistory() {
    const user = auth.currentUser;
    if (!user) return;

    const confirmClear = confirm("Are you sure you want to delete all scan records?");
    if (confirmClear) {
        db.collection("scans")
            .where("userId", "==", user.uid)
            .get()
            .then((querySnapshot) => {
                const batch = db.batch();
                querySnapshot.forEach((doc) => {
                    batch.delete(doc.ref);
                });
                return batch.commit();
            })
            .then(() => {
                alert("Records deleted successfully.");
            })
            .catch((error) => {
                console.error("Error deleting records:", error);
            });
    }
}

function goanalytics() {
    window.location.href = "analytics.html";
}
