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

function saveAndProceed() {
    // 1. Retrieve existing data
    let data = JSON.parse(localStorage.getItem("registrationData")) || {};
    
    // 2. Add Trusted Contact details from the current form
    data.trustedContactName = document.getElementById("trustedContactName").value.trim();
    data.trustedContactPhone = document.getElementById("trustedContactPhone").value.trim();
    data.trustedContactRelationship = document.getElementById("relationship").value;
    data.trustedContactLanguage = document.getElementById("trustedContactLanguage").value;
    
    // 3. Save the updated object back to localStorage
    localStorage.setItem("registrationData", JSON.stringify(data));

    // 4. Navigate to the final step
    window.location.href = "registration4.html";
}

// Event Listeners
form.addEventListener("submit", (e) => {
    e.preventDefault();
    saveAndProceed();
});

skipBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevents button from acting like a submit if inside a form
    saveAndProceed();
});