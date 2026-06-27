
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

    const lmp = document.getElementById("lmp").value;
    const clinicName = document.getElementById("clinicName").value;
    const assignedChew = document.getElementById("assignedChew").value;

    // Manual validation: Check if fields are empty
    if (!lmp || !clinicName || !assignedChew) {
        alert("Please complete all required fields (LMP, Clinic, and Assigned Nurse).");
        return;
    }

    // ... rest of your storage logic
});

  