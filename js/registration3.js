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

// Function to trigger OTP and move to step 4
async function triggerOtpAndProceed(registrationData) {
    try {
        const response = await fetch("https://mama-check23.onrender.com/api/v1/auth/request-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: registrationData.phone })
        });

        if (response.ok) {
            window.location.href = "registration4.html";
        } else {
            alert("Failed to send OTP. Please try again.");
        }
    } catch (err) {
        alert("Network error. Please check your connection.");
    }
}

// Handle Form Submission (Continue button)
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem("registrationData"));
    
    // Update data with form inputs
    data.trustedContactName = document.getElementById("trustedContactName").value.trim();
    data.trustedContactPhone = document.getElementById("trustedContactPhone").value.trim();
    data.trustedContactRelationship = document.getElementById("relationship").value;
    data.trustedContactLanguage = document.getElementById("trustedContactLanguage").value;
    
    localStorage.setItem("registrationData", JSON.stringify(data));

    await triggerOtpAndProceed(data);
});

// Handle Skip Button
skipBtn.addEventListener("click", async () => {
    let data = JSON.parse(localStorage.getItem("registrationData"));
    // Even if skipping, we ensure they trigger the OTP request
    await triggerOtpAndProceed(data);
});
async function triggerOtpAndProceed(registrationData) {
    // Safety Check: If data or phone is missing, force user back to start
    if (!registrationData || !registrationData.phone) {
        alert("Session expired. Please restart registration.");
        window.location.href = "registration.html";
        return;
    }
    // ... rest of your fetch logic
}