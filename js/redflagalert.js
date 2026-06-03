// ===============================
// CONFIG (change anytime)
// ===============================
const API_CONFIG = {
    baseURL: "https://example-api.com",   // change this anytime
    endpoint: "/women",                   // endpoint changes here
};

// full URL builder
const getURL = () => `${API_CONFIG.baseURL}${API_CONFIG.endpoint}`;


// ===============================
// DOM ELEMENTS
// ===============================
const profileContainer = document.querySelector(".inner-container");
const searchInput = document.querySelector(".search-box input");
const enrollBtn = document.querySelector(".enroll-btn");


// ===============================
// FETCH DATA FROM API
// ===============================
async function fetchWomen() {
    try {
        const res = await fetch(getURL());
        const data = await res.json();

        renderWomen(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


// ===============================
// RENDER FUNCTION
// ===============================
function renderWomen(women) {
    // remove old rows (keep header + static parts)
    const oldRows = document.querySelectorAll(".profile-details");
    oldRows.forEach(row => row.remove());

    women.forEach(person => {
        const row = document.createElement("div");
        row.className = "profile-details";

        row.innerHTML = `
            <div class="card-name">
                <h2>${person.name}</h2>
                <h4>${person.location || "N/A"}</h4>
            </div>

            <div class="card-number">
                ${person.phone}
            </div>

            <div class="card-week">
                Wk ${person.week}
            </div>

            <div class="card-lang">
                ${person.language}
            </div>

            <div class="anc-metrics">
                <div class="metrics" style="width:${person.ancProgress}%"></div>
            </div>

            <div>
                ${person.nextVisit}
            </div>

            <div class="btn-visit">
                <div class="card-nextvisit">
                    ${person.status}
                </div>
                <div class="card-view-btn" data-id="${person.id}">
                    View
                </div>
            </div>
        `;

        profileContainer.appendChild(row);
    });
}


// ===============================
// SEARCH FUNCTIONALITY
// ===============================
searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.toLowerCase();

    try {
        const res = await fetch(getURL());
        const data = await res.json();

        const filtered = data.filter(person =>
            person.name.toLowerCase().includes(query) ||
            person.phone.includes(query)
        );

        renderWomen(filtered);
    } catch (err) {
        console.error(err);
    }
});


// ===============================
// ENROLL BUTTON (placeholder)
// ===============================
enrollBtn.addEventListener("click", () => {
    alert("Enroll form coming soon 🚀");
});


// ===============================
// INITIAL LOAD
// ===============================
document.addEventListener("DOMContentLoaded", fetchWomen);