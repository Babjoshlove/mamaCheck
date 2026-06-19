document.addEventListener("DOMContentLoaded", () => {
    // 1. Personalize User Profile using Registration Data
    personalizeCHEWProfile();
    initializeDate();
    initializeSidebarNavigation();
    
    // 2. Fetch Live Summary Data from API
    fetchDashboardOverview();

    // 3. Attach Interactive Event Listeners
    initializeSearch();
    initializeEnrollButton();
    initializeViewButtons();
    initializeAlertCards();
});

/**
 * Dynamically updates the greeting, profile name, and initials matching registration values
 */
function personalizeCHEWProfile() {
    // Read keys saved from the /api/v1/auth/register-chew registration response payload
    const firstName = localStorage.getItem("firstName") || "Sumayyah";
    const lastName = localStorage.getItem("lastName") || "Aliyu";
    const phcName = localStorage.getItem("phcName") || "Awka Central PHC";
    
    const fullTitle = `Nurse ${firstName} ${lastName}`;

    // 1. Update Top-Bar Greeting Text using ID
    const greetingElement = document.getElementById("main-greeting");
    if (greetingElement) {
        const hour = new Date().getHours();
        let greetingTime = "Good evening";
        if (hour < 12) greetingTime = "Good morning";
        else if (hour < 18) greetingTime = "Good afternoon";

        greetingElement.textContent = `${greetingTime}, Nurse ${firstName}`;
    }

    // 2. Update Sidebar Profile Text elements using IDs
    const profileHeaderName = document.getElementById("profile-name");
    const profileSubText = document.getElementById("profile-phc");
    const profileAvatar = document.getElementById("profile-avatar");

    if (profileHeaderName) profileHeaderName.textContent = fullTitle;
    if (profileSubText) profileSubText.textContent = phcName;

    // 3. Generate initials badge dynamically (e.g., "Sumayyah Aliyu" -> "SA")
    if (profileAvatar) {
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        profileAvatar.textContent = initials || "SA";
    }
}

/**
 * Updates the UI with the current live formatted date
 */
function initializeDate() {
    const dateElement = document.getElementById("date");
    if (!dateElement) return;

    const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
    dateElement.textContent = new Date().toLocaleDateString("en-US", options);
}

/**
 * Fetches real-time dashboard overview stats from the API endpoint
 */
async function fetchDashboardOverview() {
    const registeredWomenEl = document.querySelector(".stat-card.black h1");
    const dueThisWeekEl = document.querySelector(".stat-card.green h1");
    const missedVisitsEl = document.querySelector(".stat-card.orange h1");
    const redFlagsEl = document.querySelector(".stat-card.red h1");

    try {
        const token = localStorage.getItem("accessToken"); 
        
        const response = await fetch("https://mama-check.onrender.com/api/v1/dashboard/chew/overview", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        // Assign metrics returned from endpoint properties safely
        if (registeredWomenEl) registeredWomenEl.textContent = data.totalPregnancies ?? 0;
        if (dueThisWeekEl) dueThisWeekEl.textContent = data.pendingVisits ?? 0;
        if (missedVisitsEl) missedVisitsEl.textContent = data.activePregnancies ?? 0; 
        if (redFlagsEl) redFlagsEl.textContent = data.redFlagAlerts ?? 0;

    } catch (error) {
        console.error("Failed to load dashboard metrics:", error);
        [registeredWomenEl, dueThisWeekEl, missedVisitsEl, redFlagsEl].forEach(el => {
            if (el) el.textContent = "--";
        });
    }
}

/**
 * Filters the table rows locally based on patient name or location entry
 */
function initializeSearch() {
    const searchInput = document.querySelector(".input-container input");
    const tableRows = document.querySelectorAll("tbody tr");

    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        tableRows.forEach(row => {
            const patientName = row.querySelector("h5")?.textContent.toLowerCase() || "";
            const location = row.querySelector("td span")?.textContent.toLowerCase() || "";

            const isMatch = patientName.includes(searchTerm) || location.includes(searchTerm);
            row.style.display = isMatch ? "" : "none";
        });
    });
}

function initializeSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll("aside nav a");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", () => {
            sidebarLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });
}

function initializeEnrollButton() {
    const enrollBtn = document.querySelector(".enroll-btn");
    if (enrollBtn) {
        enrollBtn.addEventListener("click", () => {
            window.location.href = "/registeration1.html";
        });
    }
}

function initializeViewButtons() {
    const viewButtons = document.querySelectorAll(".view-btn");
    viewButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            const name = row?.querySelector("td h5")?.innerText;
            if (name) alert(`Opening profile for ${name}`);
        });
    });
}

function initializeAlertCards() {
    const alertCards = document.querySelectorAll(".alert-card");
    alertCards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("expanded");
        });
    });
}