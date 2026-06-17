const BASE_URL = "https://mama-check.onrender.com";
const womenList = document.getElementById("women-list");

// ALERT LOGIC
function getAlertStatus(progress = 0) {
  if (progress >= 80) {
    return {
      text: "Red Flag",
      bgColor: "#FEE2E2",
      textColor: "#DC2626",
      progressColor: "#DC2626"
    };
  }

  if (progress >= 51) {
    return {
      text: "Warning",
      bgColor: "#DBEAFE",
      textColor: "#2563EB",
      progressColor: "#2563EB"
    };
  }

  return {
    text: "Normal",
    bgColor: "#DCFCE7",
    textColor: "#16A34A",
    progressColor: "#16A34A"
  };
}

// CREATE CARD
function createWomanCard(woman) {
  const fullName = `${woman.firstName || ""} ${woman.lastName || ""}`.trim();

  const progress = Number(woman.progress || 0);
  const alert = getAlertStatus(progress);

  const card = document.createElement("div");
  card.className = "profile-details";

  card.innerHTML = `
    <div class="card-name">
      <h2>${fullName || "N/A"}</h2>
      <h4>${woman.state || "N/A"}</h4>
    </div>

    <div class="card-number">
      ${woman.phone || "N/A"}
    </div>

    <div class="card-week">
      ${woman.week || "N/A"}
    </div>

    <div class="card-lang">
      ${woman.language || "N/A"}
    </div>

    <div class="anc-metrics">
      <div class="metrics" style="width:${progress}%; background:${alert.progressColor};"></div>
    </div>

    <div>
      ${woman.nextVisit || "N/A"}
    </div>

    <div class="btn-visit">
      <div class="card-nextvisit" style="background:${alert.bgColor}; color:${alert.textColor};">
        ${alert.text}
      </div>

      <div class="card-view-btn" data-id="${woman.id || ""}">
        View
      </div>
    </div>
  `;

  return card;
}

// FETCH DATA
async function fetchWomen() {
  try {
    womenList.innerHTML = "<p>Loading...</p>";

    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api/v1/pregnancies/register`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const result = await res.json();

    const women = Array.isArray(result) ? result : result.data || [];

    womenList.innerHTML = "";

    if (women.length === 0) {
      womenList.innerHTML = "<p>No registered women found.</p>";
      return;
    }

    women.forEach(woman => {
      womenList.appendChild(createWomanCard(woman));
    });

  } catch (error) {
    console.error("Fetch error:", error);
    womenList.innerHTML = "<p style='color:red;'>Failed to load data</p>";
  }
}

// INIT
document.addEventListener("DOMContentLoaded", fetchWomen);