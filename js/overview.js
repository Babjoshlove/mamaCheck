// // document.addEventListener("DOMContentLoaded", () => {
// //     initializeGreeting();
// //     initializeDate();
// //     initializeSearch();
// //     initializeViewButtons();
// //     initializeSidebarNavigation();
// //     updateStatistics();
// // });

// // /* ==========================
// //    Greeting
// // ========================== */
// // function initializeGreeting() {
// //     const greetingElement = document.querySelector(".top-bar p");

// //     if (!greetingElement) return;

// //     const hour = new Date().getHours();

// //     let greeting = "Good evening";

// //     if (hour < 12) {
// //         greeting = "Good morning";
// //     } else if (hour < 18) {
// //         greeting = "Good afternoon";
// //     }

// //     greetingElement.textContent = `${greeting}, Nurse Sumayyah`;
// // }

// // /* ==========================
// //    Date
// // ========================== */
// // function initializeDate() {
// //     const dateElement = document.querySelector(".inputDate p");

// //     if (!dateElement) return;

// //     const options = {
// //         weekday: "short",
// //         day: "numeric",
// //         month: "short",
// //         year: "numeric"
// //     };

// //     dateElement.textContent = new Date().toLocaleDateString(
// //         "en-GB",
// //         options
// //     );
// // }

// // /* ==========================
// //    Search Patients
// // ========================== */
// // function initializeSearch() {
// //     const searchInput = document.querySelector(
// //         '.input-container input'
// //     );

// //     const tableRows = document.querySelectorAll(
// //         "tbody tr"
// //     );

// //     if (!searchInput) return;

// //     searchInput.addEventListener("input", () => {
// //         const searchTerm = searchInput.value
// //             .toLowerCase()
// //             .trim();

// //         tableRows.forEach(row => {
// //             const patientName = row
// //                 .querySelector("h5")
// //                 ?.textContent.toLowerCase() || "";

// //             const location = row
// //                 .querySelector("td span")
// //                 ?.textContent.toLowerCase() || "";

// //             const isMatch =
// //                 patientName.includes(searchTerm) ||
// //                 location.includes(searchTerm);

// //             row.style.display = isMatch ? "" : "none";
// //         });
// //     });
// // }

// // /* ==========================
// //    View Buttons
// // ========================== */
// // function initializeViewButtons() {
// //     const viewButtons =
// //         document.querySelectorAll(".view-btn");

// //     viewButtons.forEach(button => {
// //         button.addEventListener("click", () => {
// //             const row = button.closest("tr");

// //             const patientName =
// //                 row.querySelector("h5")?.textContent;

// //             alert(`Opening profile for ${patientName}`);
            
// //             // Future navigation:
// //             // window.location.href =
// //             // `patient.html?name=${encodeURIComponent(patientName)}`;
// //         });
// //     });
// // }

// // /* ==========================
// //    Sidebar Active Links
// // ========================== */
// // function initializeSidebarNavigation() {
// //     const links =
// //         document.querySelectorAll("nav .sub");

// //     links.forEach(link => {
// //         link.addEventListener("click", () => {
// //             links.forEach(item =>
// //                 item.classList.remove("active")
// //             );

// //             link.classList.add("active");
// //         });
// //     });
// // }

// // /* ==========================
// //    Dashboard Statistics
// // ========================== */
// // function updateStatistics() {
// //     const registeredWomen =
// //         document.querySelector(".stat-card.black h1");

// //     const dueThisWeek =
// //         document.querySelector(".stat-card.green h1");

// //     const missedVisits =
// //         document.querySelector(".stat-card.orange h1");

// //     const redFlags =
// //         document.querySelector(".stat-card.red h1");

// //     console.log("Dashboard Loaded");

// //     console.log({
// //         registeredWomen: registeredWomen?.textContent,
// //         dueThisWeek: dueThisWeek?.textContent,
// //         missedVisits: missedVisits?.textContent,
// //         redFlags: redFlags?.textContent
// //     });
// // }

// // /* ==========================
// //    Enroll Mama Button
// // ========================== */
// // const enrollButton =
// //     document.querySelector(".enroll-btn");

// // if (enrollButton) {
// //     enrollButton.addEventListener("click", () => {
// //         alert("Redirecting to Mama Enrollment Form");

// //         // Future route
// //         // window.location.href = "enroll.html";
// //     });
// // }

// document.addEventListener("DOMContentLoaded", () => {
//     // =========================
//     // ELEMENT SELECTORS
//     // =========================
//     const searchInput = document.querySelector(".input-container input");
//     const enrollBtn = document.querySelector(".enroll-btn");
//     const sidebarLinks = document.querySelectorAll("aside nav a");
//     const viewButtons = document.querySelectorAll(".view-btn");
//     const alertCards = document.querySelectorAll(".alert-card");

//     // =========================
//     // SIDEBAR ACTIVE STATE
//     // =========================
//     sidebarLinks.forEach(link => {
//         link.addEventListener("click", () => {
//             sidebarLinks.forEach(l => l.classList.remove("active"));
//             link.classList.add("active");
//         });
//     });

//     // =========================
//     // SEARCH FUNCTION (UI ONLY)
//     // =========================
//     if (searchInput) {
//         searchInput.addEventListener("input", (e) => {
//             const value = e.target.value.toLowerCase().trim();

//             console.log("Searching for:", value);

//             // You can later connect this to API filtering
//             // Example: filter table rows
//         });
//     }

//     // =========================
//     // ENROLL BUTTON ACTION
//     // =========================
//     if (enrollBtn) {
//         enrollBtn.addEventListener("click", () => {
//             // Redirect to registration page
//             window.location.href = "/registeration1.html";
//         });
//     }

//     // =========================
//     // TABLE VIEW BUTTONS
//     // =========================
//     viewButtons.forEach(btn => {
//         btn.addEventListener("click", (e) => {
//             const row = e.target.closest("tr");

//             const name = row?.querySelector("td h5")?.innerText;

//             if (name) {
//                 alert(`Opening profile for ${name}`);
//                 // Later: navigate to patient details page
//                 // window.location.href = `/patient/${id}`;
//             }
//         });
//     });

//     // =========================
//     // ALERT CARD INTERACTION
//     // =========================
//     alertCards.forEach(card => {
//         card.addEventListener("click", () => {
//             card.classList.toggle("expanded");
//             console.log("Alert toggled");
//         });
//     });

//     // =========================
//     // OPTIONAL: LIVE DATE UPDATE
//     // =========================
//     const dateElement = document.querySelector(".inputDate p");

//     function updateDate() {
//         const now = new Date();
//         const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
//         if (dateElement) {
//             dateElement.textContent = now.toLocaleDateString("en-US", options);
//         }
//     }

//     updateDate();
// });



// const dateElement = document.getElementById("date");

// function formatDate() {
//   const options = {
//     weekday: "short",
//     day: "2-digit",
//     month: "short",
//     year: "numeric"
//   };

//   const today = new Date();
//   return today.toLocaleDateString("en-US", options);
// }

// dateElement.textContent = formatDate();


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
    // Read the explicit keys provided during registration from localStorage
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    const phcName = localStorage.getItem("phcName") || "";
    
    // Combine names cleanly
    const fullTitle = `Nurse ${firstName} ${lastName}`;

    // 1. Update Top-Bar Greeting (Replaces static "Nurse Sumayyah")
    const greetingElement = document.querySelector(".top-bar p");
    if (greetingElement) {
        const hour = new Date().getHours();
        let greetingTime = "Good evening";
        if (hour < 12) greetingTime = "Good morning";
        else if (hour < 18) greetingTime = "Good afternoon";

        greetingElement.textContent = `${greetingTime}, Nurse ${firstName}`;
    }

    // 2. Update Sidebar Profile Section (Replaces static "Nurse Ngozi Kalu" and "Awka Central PHC")
    const profileHeaderName = document.querySelector(".user-profile .info h5");
    const profileSubText = document.querySelector(".user-profile .info p");
    const profileAvatar = document.querySelector(".user-profile .profile h3");

    if (profileHeaderName) profileHeaderName.textContent = fullTitle;
    if (profileSubText) profileSubText.textContent = phcName;

    // 3. Generate initials badge dynamically (e.g., "John Smith" -> "JS")
    if (profileAvatar) {
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
        profileAvatar.textContent = initials || "NK";
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

        // Dynamically assign keys returned from your endpoint payload
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