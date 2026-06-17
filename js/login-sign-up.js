const BASE_URL = "https://mama-check.onrender.com";

// API ENDPOINTS
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

// DOM ELEMENTS
const roleBtns = document.querySelectorAll(".role-btn");
const tabBtns = document.querySelectorAll(".tab-btn");

const cardTitle = document.querySelector(".card-header h2");
const cardText = document.querySelector(".card-header p");
const submitBtn = document.querySelector(".submit-btn");

const signupFields = document.querySelector(".signup-fields");
const signupInputs = signupFields ? signupFields.querySelectorAll("input") : [];

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const authForm = document.getElementById("authForm");

// STATE
let currentRole = "chew";
let currentTab = "login";

// =============================
// VALIDATION HELPERS
// =============================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateLoginForm() {
    const email = emailInput?.value.trim();
    const password = passwordInput?.value;

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    if (!isValidEmail(email)) {
        throw new Error("Please enter a valid email address");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }

    return { email, password };
}

function validateSignupForm() {
    const firstName = document.getElementById("firstName")?.value.trim();
    const lastName = document.getElementById("lastName")?.value.trim();
    const email = emailInput?.value.trim();
    const password = passwordInput?.value;
    const phone = document.getElementById("phone")?.value.trim();
    const state = document.getElementById("state")?.value.trim();
    const lga = document.getElementById("lga")?.value.trim();
    const phcName = document.getElementById("phcName")?.value.trim();

    if (!firstName || !lastName) {
        throw new Error("First and last names are required");
    }

    if (!email) {
        throw new Error("Email is required");
    }

    if (!isValidEmail(email)) {
        throw new Error("Please enter a valid email address");
    }

    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }

    if (!phone) {
        throw new Error("Phone number is required");
    }

    if (!state) {
        throw new Error("State is required");
    }

    if (!lga) {
        throw new Error("LGA is required");
    }

    if (!phcName) {
        throw new Error("PHC name is required");
    }

    return {
        firstName,
        lastName,
        email,
        password,
        phone,
        state,
        lga,
        phcName
    };
}

// =============================
// UI UPDATE
// =============================
function updateView() {
    const roleLabel = currentRole.toUpperCase();

    submitBtn.textContent =
        currentTab === "login"
            ? `Sign In as ${roleLabel}`
            : `Sign Up as ${roleLabel}`;

    if (currentTab === "login") {
        cardTitle.textContent = "Welcome Back";
        cardText.textContent = "Sign in to continue to your dashboard.";
        signupFields.style.display = "none";
        signupInputs.forEach(input => {
            input.required = false;
        });
    } else {
        cardTitle.textContent = "Create Account";
        cardText.textContent = "Register to access the platform.";
        signupFields.style.display = "block";
        signupInputs.forEach(input => {
            input.required = true;
        });
    }
}

// =============================
// ROLE SWITCH
// =============================
roleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        roleBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentRole = btn.dataset.role.toLowerCase();
        updateView();
    });
});

// =============================
// TAB SWITCH
// =============================
tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentTab = btn.dataset.tab.toLowerCase();
        updateView();
    });
});

// =============================
// PASSWORD TOGGLE
// =============================
if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
        passwordInput.type =
            passwordInput.type === "password" ? "text" : "password";
    });
}

// =============================
// FETCH HELPER
// =============================
async function sendRequest(url, payload) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        console.log("STATUS:", response.status);
        console.log("RESPONSE:", data);

        if (!response.ok) {
            throw new Error(data.message || `Request failed with status ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error("FETCH ERROR:", error);
        throw error;
    }
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

        // VALIDATE AND GET FORM DATA
        if (currentTab === "login") {
            payload = validateLoginForm();
            endpoint = API[currentRole].login;
        } else {
            payload = validateSignupForm();
            endpoint = API[currentRole].register;
        }

        console.log("Endpoint:", endpoint);
        console.log("Payload:", payload);

        // SEND REQUEST
        const result = await sendRequest(endpoint, payload);

        console.log("SUCCESS RESPONSE:", result);

        // EXTRACT TOKEN
        const token =
            result.token ||
            result.accessToken ||
            result.data?.token ||
            result.authorization?.token;

        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("role", currentRole);
            console.log("Token saved to localStorage");
        }

        // SHOW SUCCESS MESSAGE
        alert(result.message || "Success! Redirecting...");

        // REDIRECT AFTER LOGIN
        if (currentTab === "login") {
            const redirectUrl =
                currentRole === "admin"
                    ? "overview.html"
                    : "mama-check.html";
            window.location.href = redirectUrl;
        } else {
            // After signup, reset form and switch to login
            authForm.reset();
            tabBtns.forEach(b => b.classList.remove("active"));
            tabBtns[0].classList.add("active");
            currentTab = "login";
            updateView();
            alert("Account created successfully! Please sign in.");
        }

    } catch (error) {
        console.error("AUTH ERROR:", error);
        alert(error.message || "An error occurred. Please try again.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

// =============================
// INIT
// =============================
updateView();