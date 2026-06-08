// Women data
const women = [
  {
    name: "Adaeze Okonkwo",
    location: "Lagos",
    phone: "+234 803 211 0045",
    week: "Wk 28",
    language: "Igbo",
    progress: 30,
    nextVisit: "18 May 2026",
    status: "Red Alert"
  },
  {
    name: "Amina Bello",
    location: "Abuja",
    phone: "+234 805 123 4567",
    week: "Wk 24",
    language: "Hausa",
    progress: 55,
    nextVisit: "20 May 2026",
    status: "Blue Alert"
  },
  {
    name: "Chioma Eze",
    location: "Enugu",
    phone: "+234 807 765 4321",
    week: "Wk 32",
    language: "Igbo",
    progress: 90,
    nextVisit: "22 May 2026",
    status: "Red Alert"
  },
  {
    name: "james busola",
    location:"Oyo",
    phone: "+234 813 919 3712",
    week: "wk 1",
    language:"Yoruba",
    progress:"98",
    nextVisit:"1 june 2026",
    status:"Red Alert"
  }
];
const womenList = document.getElementById("women-list");

function getAlertStatus(progress) {
  if (progress >= 80) {
    return {
      text: "Red Alert",
      bgColor: "#FEE2E2",
      textColor: "#DC2626",
      progressColor: "#DC2626"
    };
  }

  if (progress >= 51) {
    return {
      text: "Blue Alert",
      bgColor: "#DBEAFE",
      textColor: "#2563EB",
      progressColor: "#2563EB"
    };
  }

  return {
    text: "Green Alert",
    bgColor: "#DCFCE7",
    textColor: "#16A34A",
    progressColor: "#16A34A"
  };
}

function renderWomen() {
  women.forEach(woman => {
    const alert = getAlertStatus(woman.progress);

    const card = document.createElement("div");
    card.classList.add("profile-details");

    card.innerHTML = `
      <div class="card-name">
        <h2>${woman.name}</h2>
        <h4>${woman.location}</h4>
      </div>

      <div class="card-number">
        ${woman.phone}
      </div>

      <div class="card-week">
        ${woman.week}
      </div>

      <div class="card-lang">
        ${woman.language}
      </div>

      <div class="anc-metrics">
        <div
          class="metrics"
          style="
            width:${woman.progress}%;
            background:${alert.progressColor};
          ">
        </div>
      </div>

      <div>${woman.nextVisit}</div>

      <div class="btn-visit">
        <div
          class="card-nextvisit"
          style="
            background:${alert.bgColor};
            color:${alert.textColor};
          ">
          ${alert.text}
        </div>

        <div class="card-view-btn">
          View
        </div>
      </div>
    `;

    womenList.appendChild(card);
  });
}

renderWomen();