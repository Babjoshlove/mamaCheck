
//     //registration page 2 

// const form = document.getElementById("registration-form2");

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const lmp = document.getElementById("lmp").value;
//     // const edd = document.getElementById("edd").value;
//     const clinicName = document.getElementById("clinicName").value;
//     const assignedChew = document.getElementById("assignedChew").value;

//     if (!lmp || !clinicName || !assignedChew) {
//         alert("Please complete all fields.");
//         return;
//     }

//     // Get data from Step 1
//     const registrationData = JSON.parse(
//         localStorage.getItem("registrationData")
//     ) || {};

//     // Add Step 2 data
//     registrationData.lmp = lmp;
//     // registrationData.edd = edd;
//     registrationData.clinicName = clinicName;
//     registrationData.assignedChew = assignedChew;

//     // Save updated data
//     localStorage.setItem(
//         "registrationData",
//         JSON.stringify(registrationData)
//     );

//     // Move to Step 3
//     window.location.href = "registration3.html";
// });

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("registrationData"));
    data.lmp = document.getElementById("lmp").value;
    data.clinicName = document.getElementById("clinicName").value;
    // Note: 'assignedChew' is not in your Swagger schema, exclude it or add to schema
    localStorage.setItem("registrationData", JSON.stringify(data));
    window.location.href = "registration3.html";
});


  