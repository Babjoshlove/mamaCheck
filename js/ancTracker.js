function updateDate() {
    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const currentDate = now.toLocaleDateString("en-US", options);

    document.getElementById("date").textContent = currentDate;
}

// run once on load
updateDate();