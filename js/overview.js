// ==========================================================================
// CONFIGURATION: API Endpoint Settings
// ==========================================================================
const API_BASE_URL = "https://mama-check.onrender.com/api/v1"; 
const ENDPOINTS = {
    getOverview: `${API_BASE_URL}/dashboard/overview` // Adjust the exact path if needed by your API
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Instantly pull and update user metadata from LocalStorage
    initializeUserProfile();
    initializeDate();
    initializeSidebarNavigation();
    initializeAlertCards();
    initializeEnrollment();

    // 2. Fetch authenticated data from your GET endpoint
    fetchDashboardData();
});

/* ==========================================================================
   Profile Management (Populates from LocalStorage Session)
   ========================================================================== */
function initializeUserProfile() {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    const phcName = localStorage.getItem("phcName") || "Central PHC";

    const fullName = firstName && lastName ? `${firstName} ${lastName}` : "Nurse";
    
    // Update Greeting Header
    const greetingElement = document.getElementById("main-greeting");
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = "Good evening";
        if (hour < 12) greeting = "Good morning";
        else if (hour < 18) greeting = "Good afternoon";
        
        greetingElement.textContent = `${greeting}, ${fullName}`;
    }

    // Update Sidebar Avatar Details
    const profileNameEl = document.getElementById("profile-name");
    const profilePhcEl = document.getElementById("profile-phc");
    const profileAvatarEl = document.getElementById("profile-avatar");

    if (profileNameEl) profileNameEl.textContent = `Nurse ${fullName}`;
    if (profilePhcEl) profilePhcEl.textContent = phcName;
    
    // Generate simple profile initials (e.g., "NK")
    if (profileAvatarEl && firstName && lastName) {
        profileAvatarEl.textContent = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
}

/* ==========================================================================
   API Integration: Fetch Authenticated Overview Data (GET)
   ========================================================================== */
async function fetchDashboardData() {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
        console.warn("No access token found. Redirecting to login/registration...");
        window.location.href = "registration1.html"; // <-- FIXED SPELLING HERE
        return;
    }

    try {
        const response = await fetch(ENDPOINTS.getOverview, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.status === 401 || response.status === 403) {
            localStorage.clear();
            window.location.href = "registration1.html"; // <-- FIXED SPELLING HERE
            return;
        }

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        updateStatistics(data.stats);
        populatePatientTable(data.patients);
        
    } catch (error) {
        console.error("Failed to load authenticated dashboard data:", error);
    }
}

/* ==========================================================================
   DOM Elements Render Controllers
   ========================================================================== */
function updateStatistics(stats) {
    if (!stats) return;

    const registeredWomen = document.querySelector(".stat-card.black h1");
    const dueThisWeek = document.querySelector(".stat-card.green h1");
    const missedVisits = document.querySelector(".stat-card.orange h1");
    const redFlags = document.querySelector(".stat-card.red h1");

    if (registeredWomen) registeredWomen.textContent = stats.registeredWomen ?? "0";
    if (dueThisWeek) dueThisWeek.textContent = stats.dueThisWeek ?? "0";
    if (missedVisits) missedVisits.textContent = stats.missedVisits ?? "0";
    if (redFlags) redFlags.textContent = stats.redFlags ?? "0";
}

function populatePatientTable(patients) {
    const tbody = document.querySelector("table tbody");
    if (!tbody || !patients) return;

    tbody.innerHTML = ""; // Wipe original static elements cleanly

    patients.forEach(patient => {
        const row = document.createElement("tr");
        
        let badgeClass = "green-badge";
        const statusLower = patient.status?.toLowerCase() || "";
        if (statusLower.includes("red") || statusLower.includes("alert")) {
            badgeClass = "red-badge";
        } else if (statusLower.includes("missed") || statusLower.includes("caution")) {
            badgeClass = "yellow-badge";
        }

        row.innerHTML = `
            <td>
                <h5>${patient.name}</h5>
                <span>${patient.location}</span>
            </td>
            <td><span class="week-badge">wk ${patient.week}</span></td>
            <td>
                <div class="progress-bar">
                    <div class="progress-fill ${patient.progressColor || 'green'}" style="width: ${patient.progressPercent || '0'}%"></div>
                </div>
            </td>
            <td><span class="${badgeClass}"><span>•</span>${patient.status}</span></td>
            <td><button class="view-btn" data-id="${patient.id}">view</button></td>
        `;
        tbody.appendChild(row);
    });

    // Rebind newly established dynamic DOM node controls
    initializeViewButtons();
    initializeSearch(); 
}

/* ==========================================================================
   Search Functionality (Instant Patient Context Row Filter)
   ========================================================================== */
function initializeSearch() {
    const searchInput = document.querySelector(".input-container input");
    const tableRows = document.querySelectorAll("tbody tr");
    if (!searchInput) return;

    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);

    newSearchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        tableRows.forEach(row => {
            const patientName = row.querySelector("h5")?.textContent.toLowerCase() || "";
            const location = row.querySelector("td span")?.textContent.toLowerCase() || "";

            const isMatch = patientName.includes(searchTerm) || location.includes(searchTerm);
            row.style.display = isMatch ? "" : "none";
        });
    });
}

/* ==========================================================================
   Static Helper Controls
   ========================================================================== */
function initializeDate() {
    const dateElement = document.getElementById("date");
    if (!dateElement) return;

    const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
    dateElement.textContent = new Date().toLocaleDateString("en-US", options);
}

function initializeViewButtons() {
    const viewButtons = document.querySelectorAll(".view-btn");
    viewButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            const patientName = row.querySelector("h5")?.textContent || "Patient";
            const patientId = e.target.getAttribute("data-id") || "";

            alert(`Opening profile for ${patientName}`);
            // window.location.href = `patient.html?id=${patientId}`;
        });
    });
}

function initializeSidebarNavigation() {
    const links = document.querySelectorAll("nav .sub");
    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });
}

function initializeEnrollment() {
    const enrollBtn = document.querySelector(".enroll-btn");
    if (!enrollBtn) return;

    enrollBtn.addEventListener("click", () => {
        window.location.href = "registration1.html"; // <-- FIXED SPELLING HERE
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