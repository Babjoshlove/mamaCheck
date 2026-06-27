// // ==========================================================================
// // CONFIGURATION: API Endpoint Settings
// // ==========================================================================
// const API_BASE_URL = "They should use the documentation sent earlier, cause other part of the URL is there to complete this one sent. Example https://mamacheck26.onrender.com/api/v1"; 
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
// /js/overview.js

document.addEventListener("DOMContentLoaded", () => {
  // Authentication Token Logic
  const TOKEN = localStorage.getItem("token") || ""; 
  
  // Elements Selection
  const profileAvatar = document.getElementById("profile-avatar");
  const profileName = document.querySelector(".profile-name");
  const profilePhc = document.getElementById("profile-phc");
  const mainGreeting = document.getElementById("main-greeting");
  const dateDisplay = document.getElementById("date");
  
  const statTotalWomen = document.getElementById("stat-total-women");
  const statActivePregnancies = document.getElementById("stat-active-pregnancies");
  const statMissedVisits = document.getElementById("stat-missed-visits");
  const statHighRisk = document.getElementById("stat-high-risk");
  
  const womenListTableBody = document.getElementById("women-list");
  const alertCardsContainer = document.querySelector(".alert-cards");

  // Set Current Date & Greeting
  const initDateTime = () => {
    const now = new Date();
    
    // Formatting Date: e.g., "Friday, June 19, 2026"
    const options = { weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
 };
    dateDisplay.textContent = now.toLocaleDateString('en-US', options);

    // Dynamic Greeting based on time
    const hrs = now.getHours();
    if (hrs < 12) mainGreeting.textContent = "Good morning ☀️";
    else if (hrs < 18) mainGreeting.textContent = "Good afternoon 🌤️";
    else mainGreeting.textContent = "Good evening 🌙";
  };

  // Fetch Current Logged-in User Profile
  const fetchUserProfile = async () => {
    try {
      const response = await fetch("https://mamacheck26.onrender.com/api/v1/auth/me", {
        headers: { 
          "Authorization": `Bearer ${TOKEN}`,
          "Accept": "application/json"
        }
      });
      if (!response.ok) throw new Error("Failed to load profile");
      const user = await response.json();
      
      // Handle nested or flat data schema variations gracefully
      const userData = user.user || user;
      const firstName = userData.firstName || "";
      const lastName = userData.lastName || "";
      const fullName = userData.name || `${firstName} ${lastName}`.trim() || "CHEW User";
      
      profileName.textContent = fullName;
      
      // Format UI locations using LGA and State
      if (userData.lga && userData.state) {
        const formatLocation = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        profilePhc.textContent = `${formatLocation(userData.lga)}, ${formatLocation(userData.state)} State`;
      } else {
        profilePhc.textContent = userData.phc || "Assigned PHC Zone";
      }
      
      // Render 2-letter Avatar
      if (firstName || lastName) {
        profileAvatar.textContent = ((firstName[0] || "") + (lastName[0] || "")).toUpperCase();
      } else if (fullName) {
        const initials = fullName.split(" ").map(n => n[0]).join("").toUpperCase();
        profileAvatar.textContent = initials.slice(0, 2);
      }

      // Automatically chain down the specific user ID for contextual data
      const chewId = userData.id || userData.userId; 
      if (chewId) {
        fetchChewPregnancies(chewId);
      } else {
        console.warn("CHEW ID context missing in profile payload.");
      }

    } catch (error) {
      console.error("Error fetching profile:", error);
      profileName.textContent = "Error Loading Profile";
      profilePhc.textContent = "Authentication failed";
    }
  };

  // Fetch Summary KPIs Dashboard Module Data
  const fetchDashboardData = async () => {
    try {
      const response = await fetch("https://mamacheck26.onrender.com/api/v1/chew/dashboard", {
        headers: { 
          "Authorization": `Bearer ${TOKEN}`,
          "Accept": "application/json"
        }
      });
      if (!response.ok) throw new Error("Failed to load dashboard statistics");
      const data = await response.json();

      if (data.success && data.overview) {
        renderStats(data.overview.kpis || {});
        renderAlerts(data.overview.recentAlerts || []);
      }
    } catch (error) {
      console.error("Error fetching dashboard statistics:", error);
    }
  };



  // Fetch Pregnancies assigned to the logged-in CHEW ID
  const fetchChewPregnancies = async (chewId) => {
    try {
      const response = await fetch(`They should use the documentation sent earlier, cause other part of the URL is there to complete this one sent. Example https://mamacheck26.onrender.com/api/v1/pregnancies/chew/${chewId}`, {
        headers: { 
          "Authorization": `Bearer ${TOKEN}`,
          "Accept": "application/json"
        }
      });
      if (!response.ok) throw new Error("Failed to load pregnancies");
      const pregnancies = await response.json();

      renderRecentPatients(pregnancies);
    } catch (error) {
      console.error("Error fetching pregnancies list:", error);
      showTableError("Failed to fetch assigned patients from registry.");
    }
  };

  // Render KPIs to UI Metric Cards
  const renderStats = (kpis) => {
    statTotalWomen.textContent = kpis.totalWomen ?? 0;
    statActivePregnancies.textContent = kpis.dueThisWeek ?? kpis.activePregnancies ?? 0; 
    statMissedVisits.textContent = kpis.overdueVisits ?? 0;
    statHighRisk.textContent = kpis.highRiskWomen ?? kpis.redFlagsToday ?? 0;
  };

  // Render Patient Registry Table
  const renderRecentPatients = (patients) => {
    const listData = Array.isArray(patients) ? patients : (patients.recentRegistrations || []);

    if (listData.length === 0) {
      womenListTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 20px; color: #A1A1AA;">No recent patient registrations found.</td>
        </tr>`;
      return;
    }

    // Cap display items at 5 rows for clean view dashboard presentation
    const itemsToRender = listData.slice(0, 5);

    womenListTableBody.innerHTML = itemsToRender.map(patient => {
      const statusClass = patient.status?.toLowerCase() === 'high risk' ? 'status-red' : 'status-green';
      
      return `
        <tr>
          <td><strong>${patient.name || 'Unnamed Mama'}</strong></td>
          <td>Wk ${patient.currentWeek || '--'}</td>
          <td>
            <div class="progress-bar-placeholder" style="font-size:0.85rem;">
               ${patient.ancVisitsAttended || 0} Visits Completed
            </div>
          </td>
          <td><span class="status-pill ${statusClass}">${patient.status || 'Active'}</span></td>
          <td><a href="ancTracker.html?id=${patient.id || patient._id}" class="action-view-btn">Manage</a></td>
        </tr>
      `;
    }).join('');
  };

  // Render Live Emergency Red Flags Panel
  const renderAlerts = (alerts) => {
    if (!alerts || alerts.length === 0) {
      alertCardsContainer.innerHTML = `
        <div style="text-align: center; padding: 25px; color: #A1A1AA; font-size: 0.9rem;">
          <p>🎉 All clean! No active emergency red flags found today.</p>
        </div>`;
      return;
    }

    alertCardsContainer.innerHTML = alerts.map(alert => {
      const isUrgent = alert.type === 'red_flag' || alert.severity === 'high';
      const badgeClass = isUrgent ? 'open-red' : 'open-yellow';
      const iconPath = isUrgent ? '/images/alert caution mark.svg' : '/images/alert exclamation mark.svg';

      return `
        <div class="alert-card">
          <div class="alert-left">
            <div class="alert-icon">
              <img src="${iconPath}" alt="alert icon">
            </div>
            <div class="alert-text">
              <h5>${alert.patientName || 'Unknown Patient'}</h5>
              <span>${alert.description || 'System Metric Issue Alert'}</span>
              <span>${alert.timestamp || 'Just now'}</span>
            </div>
          </div>
          <span class="${badgeClass}">OPEN</span>
        </div>
      `;
    }).join('');
  };

  const showTableError = (message) => {
    womenListTableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px; color: #EF4444;">${message}</td>
      </tr>`;
  };

  // Orchestrated Unified Initialization Sequence
  const initDashboard = () => {
    initDateTime();
    
    // Execute endpoints concurrently 
    Promise.all([
      fetchUserProfile(),
      fetchDashboardData()
    ]).catch(err => console.error("Error during dashboard aggregation sequence:", err));
  };

  initDashboard();
});

document.addEventListener("DOMContentLoaded", () => {
    const enrollBtn = document.getElementById("enrollMamaBtn");

    if (enrollBtn) {
        enrollBtn.addEventListener("click", () => {
            window.location.href = "mama-check.html";
        });
    }
});