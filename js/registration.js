// // registration.js

// const form = document.getElementById("registrationForm");

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const fullName = document.getElementById("fullname").value.trim();
//     const phone = document.getElementById("phone").value.trim();
//     const address = document.getElementById("address").value.trim();
//     const lga = document.getElementById("lga").value.trim();
//     const language = document.getElementById("language").value;

//     if (!fullName || !phone || !address || !lga || !language) {
//         alert("Please fill in all fields.");
//         return;
//     }

//     // Split full name into firstName and lastName
//     const names = fullName.split(" ");
//     const firstName = names[0];
//     const lastName = names.slice(1).join(" ") || "";

//     const registrationData = {
//         firstName,
//         lastName,
//         phone,
//         residentialAddress: address,
//         lga,
//         preferredLanguage: language.toLowerCase()
//     };

//     // Save data for next steps
//     localStorage.setItem(
//         "registrationData",
//         JSON.stringify(registrationData)
//     );

//     // Go to Step 2
//     window.location.href = "registration2.html";
// });

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const registrationData = {
        firstName: document.getElementById("fullname").value.trim().split(" ")[0],
        lastName: document.getElementById("fullname").value.trim().split(" ").slice(1).join(" ") || "",
        phone: document.getElementById("phone").value.trim(),
        password: document.getElementById("password").value, // Add this input
        residentialAddress: document.getElementById("address").value.trim(),
        lga: document.getElementById("lga").value.trim(),
        state: document.getElementById("state").value.trim(), // Add this input
        preferredLanguage: document.getElementById("language").value.toLowerCase()
    };
    localStorage.setItem("registrationData", JSON.stringify(registrationData));
    window.location.href = "registration2.html";
});