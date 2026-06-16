// =============================
// MAMACHECK AUTH SCRIPT
// =============================

// Base URL
const BASE_URL = "https://mama-check.onrender.com";

// API Endpoints
const API = {
    chew: {
        register: `${BASE_URL}/api/v1/auth/register-chew`,
        login: `${BASE_URL}/api/v1/auth/login`
    },
    admin: {
        register: `${BASE_URL}/api/v1/auth/register-admin`,
        login: `${BASE_URL}/api/v1/auth/login`
    }
};

// =============================
// DOM ELEMENTS
// =============================
const roleBtns = document.querySelectorAll(".role-btn");
const tabBtns = document.querySelectorAll(".tab-btn");

const cardTitle = document.querySelector(".card-header h2");
const cardText = document.querySelector(".card-header p");
const submitBtn = document.querySelector(".submit-btn");

const signupFields = document.querySelector(".signup-fields");

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const authForm = document.getElementById("authForm");

// =============================
// STATE
// =============================
let currentRole = "chew";
let currentTab = "login";

// =============================
// UPDATE UI
// =============================
function updateView() {
    const roleLabel = currentRole.toUpperCase();

    submitBtn.textContent =
        currentTab === "login"
            ? `Sign In as ${roleLabel}`
            : `Sign Up as ${roleLabel}`;

    if (currentTab === "login") {
        cardTitle.textContent = "Welcome Back";
        cardText.textContent =
            "Sign in to continue to your dashboard.";

        signupFields.style.display = "none";
    } else {
        cardTitle.textContent = "Create Account";
        cardText.textContent =
            "Register to access the platform.";

        signupFields.style.display = "block";
    }
}

// =============================
// ROLE SWITCH
// =============================
roleBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        roleBtns.forEach(b =>
            b.classList.remove("active")
        );

        btn.classList.add("active");

        currentRole = btn.dataset.role.toLowerCase();

        updateView();
    });
});

// =============================
// LOGIN / SIGNUP SWITCH
// =============================
tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        tabBtns.forEach(b =>
            b.classList.remove("active")
        );

        btn.classList.add("active");

        currentTab = btn.dataset.tab.toLowerCase();

        updateView();
    });
});

// =============================
// PASSWORD TOGGLE
// =============================
if (togglePassword) {
    togglePassword.addEventListener("click", () => {

        passwordInput.type =
            passwordInput.type === "password"
                ? "text"
                : "password";
    });
}

// =============================
// API REQUEST HELPER
// =============================
async function sendRequest(url, payload) {

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Request failed"
        );
    }

    return data;
}

// =============================
// FORM SUBMIT
// =============================
authForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.disabled = true;

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Please wait...";

    try {

        let endpoint;
        let payload;

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        // LOGIN
        if (currentTab === "login") {

            endpoint = API[currentRole].login;

            payload = {
                email,
                password
            };
        }

        // REGISTER
        else {

                const firstName = document.getElementById("firstName").value.trim();
                const lastName = document.getElementById("lastName").value.trim();
                const phone = document.getElementById("phone").value.trim();
                const state = document.getElementById("state").value.trim();
                const lga = document.getElementById("lga").value.trim();
                const email = document.getElementById("email").value.trim();
                const password = document.getElementById("password").value;
                const phcName = document.getElementById("phcName").value.trim();

                const fullName = `${firstName} ${lastName}`;
            endpoint = API[currentRole].register;

            payload = {
                fullName,
                email,
                password,
                phone,
                state,
                lga,
                phcName
            };
        }

        console.log("Endpoint:", endpoint);
        console.log("Payload:", payload);

        const result = await sendRequest(
            endpoint,
            payload
        );

        console.log("Success:", result);

        alert(
            result.message ||
            `${currentTab} successful`
        );

        // Save token if available
        if (result.token) {
            localStorage.setItem(
                "token",
                result.token
            );
        }

        // Redirect after login
        if (currentTab === "login") {

            if (currentRole === "admin") {
                window.location.href =
                    "admin-dashboard.html";
            } else {
                window.location.href =
                    "mama-check.html";
            }
        }

        authForm.reset();

    } catch (error) {

        console.error(error);

        alert(
            error.message ||
            "Something went wrong"
        );

    } finally {

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

// =============================
// INITIALIZE
// =============================
updateView();