// document.addEventListener("DOMContentLoaded", () => {
//     initializeGreeting();
//     initializeDate();
//     initializeSearch();
//     initializeViewButtons();
//     initializeSidebarNavigation();
//     updateStatistics();
// });

// /* ==========================
//    Greeting
// ========================== */
// function initializeGreeting() {
//     const greetingElement = document.querySelector(".top-bar p");

//     if (!greetingElement) return;

//     const hour = new Date().getHours();

//     let greeting = "Good evening";

//     if (hour < 12) {
//         greeting = "Good morning";
//     } else if (hour < 18) {
//         greeting = "Good afternoon";
//     }

//     greetingElement.textContent = `${greeting}, Nurse Sumayyah`;
// }

// /* ==========================
//    Date
// ========================== */
// function initializeDate() {
//     const dateElement = document.querySelector(".inputDate p");

//     if (!dateElement) return;

//     const options = {
//         weekday: "short",
//         day: "numeric",
//         month: "short",
//         year: "numeric"
//     };

//     dateElement.textContent = new Date().toLocaleDateString(
//         "en-GB",
//         options
//     );
// }

// /* ==========================
//    Search Patients
// ========================== */
// function initializeSearch() {
//     const searchInput = document.querySelector(
//         '.input-container input'
//     );

//     const tableRows = document.querySelectorAll(
//         "tbody tr"
//     );

//     if (!searchInput) return;

//     searchInput.addEventListener("input", () => {
//         const searchTerm = searchInput.value
//             .toLowerCase()
//             .trim();

//         tableRows.forEach(row => {
//             const patientName = row
//                 .querySelector("h5")
//                 ?.textContent.toLowerCase() || "";

//             const location = row
//                 .querySelector("td span")
//                 ?.textContent.toLowerCase() || "";

//             const isMatch =
//                 patientName.includes(searchTerm) ||
//                 location.includes(searchTerm);

//             row.style.display = isMatch ? "" : "none";
//         });
//     });
// }

// /* ==========================
//    View Buttons
// ========================== */
// function initializeViewButtons() {
//     const viewButtons =
//         document.querySelectorAll(".view-btn");

//     viewButtons.forEach(button => {
//         button.addEventListener("click", () => {
//             const row = button.closest("tr");

//             const patientName =
//                 row.querySelector("h5")?.textContent;

//             alert(`Opening profile for ${patientName}`);
            
//             // Future navigation:
//             // window.location.href =
//             // `patient.html?name=${encodeURIComponent(patientName)}`;
//         });
//     });
// }

// /* ==========================
//    Sidebar Active Links
// ========================== */
// function initializeSidebarNavigation() {
//     const links =
//         document.querySelectorAll("nav .sub");

//     links.forEach(link => {
//         link.addEventListener("click", () => {
//             links.forEach(item =>
//                 item.classList.remove("active")
//             );

//             link.classList.add("active");
//         });
//     });
// }

// /* ==========================
//    Dashboard Statistics
// ========================== */
// function updateStatistics() {
//     const registeredWomen =
//         document.querySelector(".stat-card.black h1");

//     const dueThisWeek =
//         document.querySelector(".stat-card.green h1");

//     const missedVisits =
//         document.querySelector(".stat-card.orange h1");

//     const redFlags =
//         document.querySelector(".stat-card.red h1");

//     console.log("Dashboard Loaded");

//     console.log({
//         registeredWomen: registeredWomen?.textContent,
//         dueThisWeek: dueThisWeek?.textContent,
//         missedVisits: missedVisits?.textContent,
//         redFlags: redFlags?.textContent
//     });
// }

// /* ==========================
//    Enroll Mama Button
// ========================== */
// const enrollButton =
//     document.querySelector(".enroll-btn");

// if (enrollButton) {
//     enrollButton.addEventListener("click", () => {
//         alert("Redirecting to Mama Enrollment Form");

//         // Future route
//         // window.location.href = "enroll.html";
//     });
// }

document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // ELEMENT SELECTORS
    // =========================
    const searchInput = document.querySelector(".input-container input");
    const enrollBtn = document.querySelector(".enroll-btn");
    const sidebarLinks = document.querySelectorAll("aside nav a");
    const viewButtons = document.querySelectorAll(".view-btn");
    const alertCards = document.querySelectorAll(".alert-card");

    // =========================
    // SIDEBAR ACTIVE STATE
    // =========================
    sidebarLinks.forEach(link => {
        link.addEventListener("click", () => {
            sidebarLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // =========================
    // SEARCH FUNCTION (UI ONLY)
    // =========================
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const value = e.target.value.toLowerCase().trim();

            console.log("Searching for:", value);

            // You can later connect this to API filtering
            // Example: filter table rows
        });
    }

    // =========================
    // ENROLL BUTTON ACTION
    // =========================
    if (enrollBtn) {
        enrollBtn.addEventListener("click", () => {
            // Redirect to registration page
            window.location.href = "/registeration1.html";
        });
    }

    // =========================
    // TABLE VIEW BUTTONS
    // =========================
    viewButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const row = e.target.closest("tr");

            const name = row?.querySelector("td h5")?.innerText;

            if (name) {
                alert(`Opening profile for ${name}`);
                // Later: navigate to patient details page
                // window.location.href = `/patient/${id}`;
            }
        });
    });

    // =========================
    // ALERT CARD INTERACTION
    // =========================
    alertCards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("expanded");
            console.log("Alert toggled");
        });
    });

    // =========================
    // OPTIONAL: LIVE DATE UPDATE
    // =========================
    const dateElement = document.querySelector(".inputDate p");

    function updateDate() {
        const now = new Date();
        const options = { weekday: "short", day: "2-digit", month: "short", year: "numeric" };
        if (dateElement) {
            dateElement.textContent = now.toLocaleDateString("en-US", options);
        }
    }

    updateDate();
});



const dateElement = document.getElementById("date");

function formatDate() {
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  };

  const today = new Date();
  return today.toLocaleDateString("en-US", options);
}

dateElement.textContent = formatDate();