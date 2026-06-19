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
    // Initialize standard layout elements
    initializeDate();
    initializeSidebarNavigation();
    
    // Fetch and populate live data from API
    fetchDashboardOverview();

    // Attach interaction listeners
    initializeSearch();
    initializeEnrollButton();
    initializeViewButtons();
    initializeAlertCards();
});

/**
 * Updates the UI with current date
 */
function initializeDate() {
    const dateElement = document.getElementById("date");
    if (!dateElement) return;

    const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
    dateElement.textContent = new Date().toLocaleDateString("en-US", options);
}

/**
 * Fetches dashboard overview stats from the API and updates the stat cards
 */
async function fetchDashboardOverview() {
    // Select the stat card counter elements
    const registeredWomenEl = document.querySelector(".stat-card.black h1");
    const dueThisWeekEl = document.querySelector(".stat-card.green h1");
    const missedVisitsEl = document.querySelector(".stat-card.orange h1");
    const redFlagsEl = document.querySelector(".stat-card.red h1");

    try {
        // Retrieve the JWT token securely stored during login
        const token = localStorage.getItem("accessToken"); 
        
        const response = await fetch("https://mama-check.onrender.com/api/v1/dashboard/chew/overview", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                console.error("Unauthorized access. Redirecting to login...");
                // window.location.href = "/login.html"; // Uncomment to enforce route guard
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Dynamically map incoming API keys to corresponding HTML cards
        if (registeredWomenEl) registeredWomenEl.textContent = data.totalPregnancies ?? 0;
        if (dueThisWeekEl) dueThisWeekEl.textContent = data.pendingVisits ?? 0;
        // Adjust these mappings based on your exact API models if needed
        if (missedVisitsEl) missedVisitsEl.textContent = data.activePregnancies ?? 0; 
        if (redFlagsEl) redFlagsEl.textContent = data.redFlagAlerts ?? 0;

    } catch (error) {
        console.error("Failed to load dashboard metrics:", error);
        // Fallback placeholder formatting in case of connection loss
        [registeredWomenEl, dueThisWeekEl, missedVisitsEl, redFlagsEl].forEach(el => {
            if (el) el.textContent = "--";
        });
    }
}

/**
 * Filter patient table rows locally matching search queries
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

/**
 * Interactive handlers for sidebar styling
 */
function initializeSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll("aside nav a");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", () => {
            sidebarLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });
}

/**
 * Action button redirects
 */
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
            if (name) {
                alert(`Opening profile for ${name}`);
            }
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