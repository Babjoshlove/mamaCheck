// // ==========================================================================
// // CONFIGURATION: API Endpoint Settings
// // ==========================================================================
// const API_BASE_URL = "https://mama-check.onrender.com/api/v1"; 
// const ENDPOINTS = {
//     getOverview: `${API_BASE_URL}/dashboard/overview` // Adjust the exact path if needed by your API
// };

// document.addEventListener("DOMContentLoaded", () => {
//     // 1. Instantly pull and update user metadata from LocalStorage
//     initializeUserProfile();
//     initializeDate();
//     initializeSidebarNavigation();
//     initializeAlertCards();
//     initializeEnrollment();

//     // 2. Fetch authenticated data from your GET endpoint
//     fetchDashboardData();
// });

// /* ==========================================================================
//    Profile Management (Populates from LocalStorage Session)
//    ========================================================================== */
// function initializeUserProfile() {
//     const firstName = localStorage.getItem("firstName") || "";
//     const lastName = localStorage.getItem("lastName") || "";
//     const phcName = localStorage.getItem("phcName") || "Central PHC";

//     const fullName = firstName && lastName ? `${firstName} ${lastName}` : "Nurse";
    
//     // Update Greeting Header
//     const greetingElement = document.getElementById("main-greeting");
//     if (greetingElement) {
//         const hour = new Date().getHours();
//         let greeting = "Good evening";
//         if (hour < 12) greeting = "Good morning";
//         else if (hour < 18) greeting = "Good afternoon";
        
//         greetingElement.textContent = `${greeting}, ${fullName}`;
//     }

//     // Update Sidebar Avatar Details
//     const profileNameEl = document.getElementById("profile-name");
//     const profilePhcEl = document.getElementById("profile-phc");
//     const profileAvatarEl = document.getElementById("profile-avatar");

//     if (profileNameEl) profileNameEl.textContent = `Nurse ${fullName}`;
//     if (profilePhcEl) profilePhcEl.textContent = phcName;
    
//     // Generate simple profile initials (e.g., "NK")
//     if (profileAvatarEl && firstName && lastName) {
//         profileAvatarEl.textContent = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
//     }
// }

// /* ==========================================================================
//    API Integration: Fetch Authenticated Overview Data (GET)
//    ========================================================================== */
// async function fetchDashboardData() {
//     const token = localStorage.getItem("accessToken");
    
//     if (!token) {
//         console.warn("No access token found. Redirecting to login/registration...");
//         window.location.href = "registration1.html"; // <-- FIXED SPELLING HERE
//         return;
//     }

//     try {
//         const response = await fetch(ENDPOINTS.getOverview, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             }
//         });

//         if (response.status === 401 || response.status === 403) {
//             localStorage.clear();
//             window.location.href = "registration1.html"; // <-- FIXED SPELLING HERE
//             return;
//         }

//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
//         const data = await response.json();
//         updateStatistics(data.stats);
//         populatePatientTable(data.patients);
        
//     } catch (error) {
//         console.error("Failed to load authenticated dashboard data:", error);
//     }
// }

// /* ==========================================================================
//    DOM Elements Render Controllers
//    ========================================================================== */
// function updateStatistics(stats) {
//     if (!stats) return;

//     const registeredWomen = document.querySelector(".stat-card.black h1");
//     const dueThisWeek = document.querySelector(".stat-card.green h1");
//     const missedVisits = document.querySelector(".stat-card.orange h1");
//     const redFlags = document.querySelector(".stat-card.red h1");

//     if (registeredWomen) registeredWomen.textContent = stats.registeredWomen ?? "0";
//     if (dueThisWeek) dueThisWeek.textContent = stats.dueThisWeek ?? "0";
//     if (missedVisits) missedVisits.textContent = stats.missedVisits ?? "0";
//     if (redFlags) redFlags.textContent = stats.redFlags ?? "0";
// }

// function populatePatientTable(patients) {
//     const tbody = document.querySelector("table tbody");
//     if (!tbody || !patients) return;

//     tbody.innerHTML = ""; // Wipe original static elements cleanly

//     patients.forEach(patient => {
//         const row = document.createElement("tr");
        
//         let badgeClass = "green-badge";
//         const statusLower = patient.status?.toLowerCase() || "";
//         if (statusLower.includes("red") || statusLower.includes("alert")) {
//             badgeClass = "red-badge";
//         } else if (statusLower.includes("missed") || statusLower.includes("caution")) {
//             badgeClass = "yellow-badge";
//         }

//         row.innerHTML = `
//             <td>
//                 <h5>${patient.name}</h5>
//                 <span>${patient.location}</span>
//             </td>
//             <td><span class="week-badge">wk ${patient.week}</span></td>
//             <td>
//                 <div class="progress-bar">
//                     <div class="progress-fill ${patient.progressColor || 'green'}" style="width: ${patient.progressPercent || '0'}%"></div>
//                 </div>
//             </td>
//             <td><span class="${badgeClass}"><span>•</span>${patient.status}</span></td>
//             <td><button class="view-btn" data-id="${patient.id}">view</button></td>
//         `;
//         tbody.appendChild(row);
//     });

//     // Rebind newly established dynamic DOM node controls
//     initializeViewButtons();
//     initializeSearch(); 
// }

// /* ==========================================================================
//    Search Functionality (Instant Patient Context Row Filter)
//    ========================================================================== */
// function initializeSearch() {
//     const searchInput = document.querySelector(".input-container input");
//     const tableRows = document.querySelectorAll("tbody tr");
//     if (!searchInput) return;

//     const newSearchInput = searchInput.cloneNode(true);
//     searchInput.parentNode.replaceChild(newSearchInput, searchInput);

//     newSearchInput.addEventListener("input", (e) => {
//         const searchTerm = e.target.value.toLowerCase().trim();

//         tableRows.forEach(row => {
//             const patientName = row.querySelector("h5")?.textContent.toLowerCase() || "";
//             const location = row.querySelector("td span")?.textContent.toLowerCase() || "";

//             const isMatch = patientName.includes(searchTerm) || location.includes(searchTerm);
//             row.style.display = isMatch ? "" : "none";
//         });
//     });
// }

// /* ==========================================================================
//    Static Helper Controls
//    ========================================================================== */
// function initializeDate() {
//     const dateElement = document.getElementById("date");
//     if (!dateElement) return;

//     const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
//     dateElement.textContent = new Date().toLocaleDateString("en-US", options);
// }

// function initializeViewButtons() {
//     const viewButtons = document.querySelectorAll(".view-btn");
//     viewButtons.forEach(button => {
//         button.addEventListener("click", (e) => {
//             const row = e.target.closest("tr");
//             const patientName = row.querySelector("h5")?.textContent || "Patient";
//             const patientId = e.target.getAttribute("data-id") || "";

//             alert(`Opening profile for ${patientName}`);
//             // window.location.href = `patient.html?id=${patientId}`;
//         });
//     });
// }

// function initializeSidebarNavigation() {
//     const links = document.querySelectorAll("nav .sub");
//     links.forEach(link => {
//         link.addEventListener("click", () => {
//             links.forEach(item => item.classList.remove("active"));
//             link.classList.add("active");
//         });
//     });
// }

// function initializeEnrollment() {
//     const enrollBtn = document.querySelector(".enroll-btn");
//     if (!enrollBtn) return;

//     enrollBtn.addEventListener("click", () => {
//         window.location.href = "registration1.html"; // <-- FIXED SPELLING HERE
//     });
// }

// function initializeAlertCards() {
//     const alertCards = document.querySelectorAll(".alert-card");
//     alertCards.forEach(card => {
//         card.addEventListener("click", () => {
//             card.classList.toggle("expanded");
//         });
//     });
// }


document.addEventListener("DOMContentLoaded", async () => {
    // 1. Setup profile text, live date tracking, and navigation triggers
    await personalizeCHEWProfile();
    initializeDate();
    initializeSidebarNavigation();
    
    // 2. Fetch live metrics from the comprehensive full-dashboard endpoint
    fetchFullDashboardData();

    // 3. Attach interactive UI handlers
    initializeSearch();
    initializeEnrollButton();
    initializeViewButtons();
    initializeAlertCards();
});

/**
 * Personalizes the dashboard UI elements. Fallback fetches from /api/v1/auth/me if local storage is unpopulated.
 */
async function personalizeCHEWProfile() {
    let firstName = localStorage.getItem("firstName");
    let lastName = localStorage.getItem("lastName");
    let phcName = localStorage.getItem("phcName");
    const token = localStorage.getItem("accessToken");

    // Live Handshake: If items are missing or came back as string 'null', hit the profile context endpoint
    if ((!firstName || !lastName || phcName === "null" || !phcName) && token) {
        try {
            const response = await fetch("https://mama-check.onrender.com/api/v1/auth/me", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const user = data.user || data;
                firstName = user.firstName;
                lastName = user.lastName;
                phcName = user.phcName || user.facilityName;

                // Persist securely to prevent redundant profile calls
                localStorage.setItem("firstName", firstName || "");
                localStorage.setItem("lastName", lastName || "");
                localStorage.setItem("phcName", phcName || "");
            }
        } catch (err) {
            console.error("Error retrieving user credentials:", err);
        }
    }

    // Apply defaults if authorization session is fully blank
    const finalFirst = firstName && firstName !== "null" ? firstName : "CHEW";
    const finalLast = lastName && lastName !== "null" ? lastName : "Provider";
    const finalPhc = phcName && phcName !== "null" ? phcName : "Maternal Care Clinic";

    // Update Top-Bar Greeting
    const greetingElement = document.getElementById("main-greeting");
    if (greetingElement) {
        const hour = new Date().getHours();
        let greetingTime = "Good evening";
        if (hour < 12) greetingTime = "Good morning";
        else if (hour < 18) greetingTime = "Good afternoon";

        greetingElement.textContent = `${greetingTime}, Nurse ${finalFirst}`;
    }

    // Update Aside Elements
    const nameEl = document.getElementById("profile-name");
    const phcEl = document.getElementById("profile-phc");
    const avatarEl = document.getElementById("profile-avatar");

    if (nameEl) nameEl.textContent = `Nurse ${finalFirst} ${finalLast}`;
    if (phcEl) phcEl.textContent = finalPhc;
    if (avatarEl) {
        avatarEl.textContent = `${finalFirst.charAt(0)}${finalLast.charAt(0)}`.toUpperCase();
    }
}

/**
 * Pulls analytics data via the integrated /api/v1/dashboard/full-dashboard endpoint
 */
async function fetchFullDashboardData() {
    const registeredWomenEl = document.querySelector(".stat-card.black h1");
    const dueThisWeekEl = document.querySelector(".stat-card.green h1");
    const missedVisitsEl = document.querySelector(".stat-card.orange h1");
    const redFlagsEl = document.querySelector(".stat-card.red h1");

    try {
        const token = localStorage.getItem("accessToken");
        
        // Fetching from the combined full-dashboard platform path
        const response = await fetch("https://mama-check.onrender.com/api/v1/dashboard/full-dashboard?role=chew", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error(`Dashboard payload missing. Code: ${response.status}`);

        const result = await response.json();
        
        if (result.success && result.dashboard) {
            const kpis = result.dashboard.kpis;
            
            // Map JSON properties to your statistical status grids
            if (registeredWomenEl) registeredWomenEl.textContent = kpis.totalWomen ?? 0;
            if (dueThisWeekEl) dueThisWeekEl.textContent = kpis.activePregnancies ?? 0;
            // Fallback parameters map safely if distinct keys return later
            if (missedVisitsEl) missedVisitsEl.textContent = kpis.missedVisits ?? 0;
            if (redFlagsEl) redFlagsEl.textContent = kpis.highRiskWomen ?? result.dashboard.triageDistribution?.RED?.count ?? 0;
        }

    } catch (error) {
        console.error("Failed to load full analytics:", error);
        [registeredWomenEl, dueThisWeekEl, missedVisitsEl, redFlagsEl].forEach(el => {
            if (el) el.textContent = "--";
        });
    }
}

/**
 * Standard utility updates for live clock display tracking
 */
function initializeDate() {
    const dateElement = document.getElementById("date");
    if (!dateElement) return;

    const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
    dateElement.textContent = new Date().toLocaleDateString("en-US", options);
}

/**
 * Filter matching patient table rows dynamically
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