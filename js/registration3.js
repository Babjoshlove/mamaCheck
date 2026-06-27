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

// Single, complete function
async function triggerOtpAndProceed(registrationData) {
    // 1. Safety Check
    if (!registrationData || !registrationData.phone) {
        alert("Session expired. Please restart registration.");
        window.location.href = "registration.html";
        return;
    }

    // 2. Trigger OTP Request
    try {
        const response = await fetch("https://mama-check23.onrender.com/api/v1/pregnancies/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: registrationData.phone })
        });

        if (response.ok) {
            // Move to registration 4 where OTP input exists
            window.location.href = "registration4.html";
        } else {
            alert("Failed to send OTP. Please try again.");
        }
    } catch (err) {
        console.error(err);
        alert("Network error. Please check your connection.");
    }
}

// Handle Form Submission (Continue)
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem("registrationData")) || {};
    
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
    await triggerOtpAndProceed(data);
});