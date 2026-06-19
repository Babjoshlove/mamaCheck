document.addEventListener("DOMContentLoaded", () => {
    // Initialize all modular dashboard components
    initializeGreeting();
    initializeDate();
    initializeSearch();
    initializeViewButtons();
    initializeSidebarNavigation();
    initializeEnrollment();
    initializeAlertCards();
    updateStatistics();
});

/* ==========================================================================
   Greeting Component
   ========================================================================== */
function initializeGreeting() {
    const greetingElement = document.querySelector(".top-bar p");
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greeting = "Good evening";

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    }

    greetingElement.textContent = `${greeting}, Nurse Sumayyah`;
}

/* ==========================================================================
   Date Component
   ========================================================================== */
function initializeDate() {
    // Checks for both the .inputDate structure and fallback ID 'date'
    const dateElement = document.querySelector(".inputDate p") || document.getElementById("date");
    if (!dateElement) return;

    const options = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
    };

    // Formats uniformly as 'Fri, Jun 19, 2026' using en-US
    dateElement.textContent = new Date().toLocaleDateString("en-US", options);
}

/* ==========================================================================
   Search Functionality (Filters Patient Table Rows)
   ========================================================================== */
function initializeSearch() {
    const searchInput = document.querySelector(".input-container input");
    const tableRows = document.querySelectorAll("tbody tr");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        console.log("Searching for:", searchTerm);

        tableRows.forEach(row => {
            // Evaluates text inside matching semantic tags safely
            const patientName = row.querySelector("h5")?.textContent.toLowerCase() || 
                                row.querySelector("td h5")?.innerText.toLowerCase() || "";
            
            const location = row.querySelector("td span")?.textContent.toLowerCase() || "";

            const isMatch = patientName.includes(searchTerm) || location.includes(searchTerm);
            row.style.display = isMatch ? "" : "none";
        });
    });
}

/* ==========================================================================
   Table Action Buttons (Patient Profile Views)
   ========================================================================== */
function initializeViewButtons() {
    const viewButtons = document.querySelectorAll(".view-btn");

    viewButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            const patientName = row?.querySelector("h5")?.textContent || 
                                row?.querySelector("td h5")?.innerText;

            if (patientName) {
                alert(`Opening profile for ${patientName}`);
                // Future navigation link:
                // window.location.href = `/patient.html?name=${encodeURIComponent(patientName)}`;
            }
        });
    });
}

/* ==========================================================================
   Sidebar Navigation Controls
   ========================================================================== */
function initializeSidebarNavigation() {
    // Unifies structural elements and semantic sidebar anchors
    const links = document.querySelectorAll("nav .sub, aside nav a");

    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });
}

/* ==========================================================================
   Mama Enrollment Controls
   ========================================================================== */
function initializeEnrollment() {
    const enrollBtn = document.querySelector(".enroll-btn");
    if (!enrollBtn) return;

    enrollBtn.addEventListener("click", () => {
        alert("Redirecting to Mama Enrollment Form");
        window.location.href = "/registeration1.html";
    });
}

/* ==========================================================================
   Alert Card Interaction
   ========================================================================== */
function initializeAlertCards() {
    const alertCards = document.querySelectorAll(".alert-card");

    alertCards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("expanded");
            console.log("Alert toggled");
        });
    });
}

/* ==========================================================================
   Dashboard Statistics Debugger
   ========================================================================== */
function updateStatistics() {
    const registeredWomen = document.querySelector(".stat-card.black h1");
    const dueThisWeek = document.querySelector(".stat-card.green h1");
    const missedVisits = document.querySelector(".stat-card.orange h1");
    const redFlags = document.querySelector(".stat-card.red h1");

    console.log("Dashboard Loaded");
    console.log({
        registeredWomen: registeredWomen?.textContent || "N/A",
        dueThisWeek: dueThisWeek?.textContent || "N/A",
        missedVisits: missedVisits?.textContent || "N/A",
        redFlags: redFlags?.textContent || "N/A"
    });
}