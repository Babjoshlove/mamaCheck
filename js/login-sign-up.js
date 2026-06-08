

// const roleBtns = document.querySelectorAll(".role-btn");
// const tabBtns = document.querySelectorAll(".tab-btn");

// const cardTitle = document.querySelector(".card-header h2");
// const cardText = document.querySelector(".card-header p");
// const submitBtn = document.querySelector(".submit-btn");

// let currentRole = "CHEW";
// let currentTab = "login";

// function updateView() {

//     submitBtn.textContent =
//         currentTab === "login"
//             ? `Sign In as ${currentRole}`
//             : `Sign Up as ${currentRole}`;

//     if (currentTab === "login") {
//         cardTitle.textContent = "Welcome Back";
//         cardText.textContent = "Sign in to continue to your dashboard.";

//         // hide phone
//         document.querySelector(".phone-field").style.display = "none";

//     } else {
//         cardTitle.textContent = "Create Account";
//         cardText.textContent = "Register to access the platform.";

//         // show phone
//         document.querySelector(".phone-field").style.display = "block";
//     }
// }

// // Role switch
// roleBtns.forEach(btn => {
//     btn.addEventListener("click", () => {

//         roleBtns.forEach(b => b.classList.remove("active"));

//         btn.classList.add("active");

//         currentRole = btn.dataset.role;

//         updateView();
//     });
// });

// // Login / Signup switch
// tabBtns.forEach(btn => {
//     btn.addEventListener("click", () => {

//         tabBtns.forEach(b => b.classList.remove("active"));

//         btn.classList.add("active");

//         currentTab = btn.dataset.tab;

//         updateView();
//     });
// });

// // Initial state
// updateView();

// =====================
// SELECT ELEMENTS
// =====================
const roleBtns = document.querySelectorAll(".role-btn");
const tabBtns = document.querySelectorAll(".tab-btn");

const cardTitle = document.querySelector(".card-header h2");
const cardText = document.querySelector(".card-header p");
const submitBtn = document.querySelector(".submit-btn");

// =====================
// DEFAULT STATE (CHEW FIRST)
// =====================
let currentRole = "CHEW";
let currentTab = "login";

// =====================
// GET API ENDPOINT
// =====================
function getEndpoint() {

    const role = currentRole.toLowerCase();

    if (role === "chew" && currentTab === "login") {
        return "https://chewlogin.msn.api.com";
    }

    if (role === "chew" && currentTab === "signup") {
        return "https://chewsignup.msn.api.com";
    }

    if (role === "admin" && currentTab === "login") {
        return "https://adminlogin.msn.api.com";
    }

    if (role === "admin" && currentTab === "signup") {
        return "https://adminsignup.msn.api.com";
    }

    return "https://msn.api.com";
}

// =====================
// UPDATE UI VIEW
// =====================
function updateView() {

    submitBtn.textContent =
        currentTab === "login"
            ? `Sign In as ${currentRole}`
            : `Sign Up as ${currentRole}`;

    if (currentTab === "login") {
        cardTitle.textContent = "Welcome Back";
        cardText.textContent = "Sign in to continue to your dashboard.";

        document.querySelector(".phone-field").style.display = "none";

    } else {
        cardTitle.textContent = "Create Account";
        cardText.textContent = "Register to access the platform.";

        document.querySelector(".phone-field").style.display = "block";
    }
}

// =====================
// ROLE SWITCH
// =====================
roleBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        roleBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentRole = btn.dataset.role;

        updateView();
    });
});

// =====================
// LOGIN / SIGNUP SWITCH
// =====================
tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentTab = btn.dataset.tab;

        updateView();
    });
});

// =====================
// FORM SUBMIT (LOGIN / SIGNUP)
// =====================
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const endpoint = getEndpoint();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone")?.value;

    const payload = {
        email,
        password,
        role: currentRole,
        type: currentTab
    };

    if (currentTab === "signup") {
        payload.phone = phone;
    }

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {

            // =====================
            // SAVE SESSION (AUTO LOGIN)
            // =====================
            localStorage.setItem("token", data.token || "");
            localStorage.setItem("role", currentRole.toLowerCase());

            // =====================
            // REDIRECT
            // =====================
            window.location.href =
                currentRole.toLowerCase() === "chew"
                    ? "chew-dashboard.html"
                    : "admin-dashboard.html";

        } else {
            alert(data.message || "Login failed ❌");
        }

    } catch (error) {
        console.error(error);
        alert("Network error ❌");
    }
});

// =====================
// AUTO LOGIN CHECK
// =====================
window.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {

        window.location.href =
            role === "chew"
                ? "chew-dashboard.html"
                : "admin-dashboard.html";
    }
});

// =====================
// INITIAL LOAD
// =====================
updateView();