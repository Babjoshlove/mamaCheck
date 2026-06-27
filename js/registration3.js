// const form = document.getElementById("registration-form3");
// const skipBtn = document.querySelector(".skip-btn");

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const trustedContactName =
//         document.getElementById("trustedContactName").value.trim();

//     const trustedContactRelationship =
//         document.getElementById("relationship").value;

//     const trustedContactPhone =
//         document.getElementById("trustedContactPhone").value.trim();

//     const trustedContactLanguage =
//         document.getElementById("trustedContactLanguage").value;

//     let registrationData = JSON.parse(
//         localStorage.getItem("registrationData")
//     );

//     if (!registrationData) {
//         alert("Registration data missing. Please restart.");
//         window.location.href = "registration.html";
//         return;
//     }

//     registrationData.trustedContactName = trustedContactName;
//     registrationData.trustedContactRelationship =
//         trustedContactRelationship;
//     registrationData.trustedContactPhone =
//         trustedContactPhone;
//     registrationData.trustedContactLanguage =
//         trustedContactLanguage;

//     localStorage.setItem(
//         "registrationData",
//         JSON.stringify(registrationData)
//     );

//     window.location.href = "registration4.html";
// });

// // Skip button
// skipBtn.addEventListener("click", () => {
//     window.location.href = "registration4.html";
// });

const form = document.getElementById("registration-form3");
const skipBtn = document.querySelector(".skip-btn");

// Centralized OTP trigger function
async function triggerOtpAndProceed(registrationData) {
    if (!registrationData || !registrationData.phone) {
        alert("Session expired. Please restart registration.");
        window.location.href = "registration.html";
        return;
    }

    try {
        // IMPORTANT: Ensure phone format matches what your API expects 
        // If your API needs +234, ensure registrationData.phone includes it
        const response = await fetch("https://mama-check23.onrender.com/api/v1/pregnancies/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: registrationData.phone })
        });

        if (response.ok) {
            window.location.href = "registration4.html";
        } else {
            const errorData = await response.json().catch(() => ({}));
            console.error("Server Error:", errorData);
            alert("Failed to send OTP: " + (errorData.message || "Please check your network."));
        }
    } catch (err) {
        console.error("Network Error:", err);
        alert("Network error. Please check your internet connection.");
    }
}

// Handle Form Submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem("registrationData")) || {};
    
    // Grab values from inputs
    data.trustedContactName = document.getElementById("trustedContactName").value.trim();
    data.trustedContactPhone = document.getElementById("trustedContactPhone").value.trim();
    data.trustedContactRelationship = document.getElementById("relationship").value;
    data.trustedContactLanguage = document.getElementById("trustedContactLanguage").value;
    
    localStorage.setItem("registrationData", JSON.stringify(data));

    triggerOtpAndProceed(data);
});

// Handle Skip
skipBtn.addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem("registrationData"));
    triggerOtpAndProceed(data);
});