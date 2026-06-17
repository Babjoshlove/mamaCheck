// const verifyBtn = document.querySelector(".verify-btn");
// const otpInputs = document.querySelectorAll(".otp-input");

// // Auto-focus logic for OTP inputs
// const inputs = document.querySelectorAll('.otp-input');
// inputs.forEach((input, index) => {
//     input.addEventListener('input', () => {
//         if (input.value.length === 1 && index < inputs.length - 1) {
//             inputs[index + 1].focus();
//         }
//     });
// });

// verifyBtn.addEventListener("click", async () => {
//     const otp = [...otpInputs]
//         .map(input => input.value.trim())
//         .join("");

//     if (otp.length !== 6) {
//         alert("Please enter a valid 6-digit OTP.");
//         return;
//     }

//     const registrationData = JSON.parse(
//         localStorage.getItem("registrationData")
//     );

//     if (!registrationData || !registrationData.phone) {
//         alert("Registration or phone data not found.");
//         return;
//     }

//     try {
//         verifyBtn.disabled = true;
//         verifyBtn.textContent = "Verifying OTP...";

//         ---
//         // STEP 1: Verify the OTP first
//         ---
//         const verifyResponse = await fetch(
//             "https://mama-check.onrender.com/api/v1/auth/verify-otp",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     phone: registrationData.phone, // Extracts phone from stored data
//                     otp: otp
//                 })
//             }
//         );

//         let verifyData;
//         try {
//             verifyData = await verifyResponse.json();
//         } catch {
//             verifyData = { message: "Unable to read verification response." };
//         }

//         if (!verifyResponse.ok) {
//             alert(verifyData.message || "OTP verification failed. Please try again.");
//             return; // Stop here if OTP is invalid
//         }

//         ---
//         // STEP 2: Proceed to Registration if OTP is verified successfully
//         ---
//         verifyBtn.textContent = "Registering...";

//         const registerResponse = await fetch(
//             "https://mama-check.onrender.com/api/v1/pregnancies/register",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(registrationData) // Sends the full registration payload
//             }
//         );

//         let registerData;
//         try {
//             registerData = await registerResponse.json();
//         } catch {
//             registerData = { message: "Unable to read registration response." };
//         }

//         if (registerResponse.ok) {
//             alert("Registration successful!");

//             localStorage.setItem(
//                 "registeredMother",
//                 JSON.stringify(registerData)
//             );

//             localStorage.removeItem("registrationData");
//             window.location.replace("overview.html");
//         } else {
//             alert(registerData.message || "Registration failed.");
//         }

//     } catch (error) {
//         console.error("Error:", error);
//         alert("Network error. Please try again.");
//     } finally {
//         verifyBtn.disabled = false;
//         verifyBtn.textContent = "Verify Number";
//     }
// });


document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll("#otpGroup .otp-input");
    const verifyBtn = document.getElementById("verifyBtn");

    // 1. Automatically jump to the next input field during typing
    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            if (e.target.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        // Move backward on pressing Backspace
        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });

    // 2. Handle Verification Action
    verifyBtn.addEventListener("click", () => {
        // Gather the 6 numbers into a single string string
        const otpCode = Array.from(inputs).map(input => input.value).join("");

        if (otpCode.length < 6) {
            alert("Please enter the complete 6-digit code.");
            return;
        }

        // --- PLACE YOUR BACKEND API CALL HERE ---
        // For demonstration, we assume verification succeeded:
        const verificationSuccess = true; 

        if (verificationSuccess) {
            // Retrieve the role stored in a previous step (defaulting to 'chew' if not found)
            const currentRole = localStorage.getItem("currentRole") || "chew";

            // Cleaner dynamic routing conditional statement
            window.location.href = currentRole === "chew" ? "mama-check.html" : "overview.html";
        } else {
            alert("Invalid verification code. Please request a new one.");
        }
    });
});