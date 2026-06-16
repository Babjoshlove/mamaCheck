const form = document.getElementById("registration-form3");
const skipBtn = document.querySelector(".skip-btn");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const trustedContactName =
        document.getElementById("trustedContactName").value.trim();

    const trustedContactRelationship =
        document.getElementById("relationship").value;

    const trustedContactPhone =
        document.getElementById("trustedContactPhone").value.trim();

    const trustedContactLanguage =
        document.getElementById("trustedContactLanguage").value;

    let registrationData = JSON.parse(
        localStorage.getItem("registrationData")
    );

    if (!registrationData) {
        alert("Registration data missing. Please restart.");
        window.location.href = "registration.html";
        return;
    }

    registrationData.trustedContactName = trustedContactName;
    registrationData.trustedContactRelationship =
        trustedContactRelationship;
    registrationData.trustedContactPhone =
        trustedContactPhone;
    registrationData.trustedContactLanguage =
        trustedContactLanguage;

    localStorage.setItem(
        "registrationData",
        JSON.stringify(registrationData)
    );

    window.location.href = "registration4.html";
});

// Skip button
skipBtn.addEventListener("click", () => {
    window.location.href = "registration4.html";
});