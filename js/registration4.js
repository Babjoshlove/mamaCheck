const inputs = document.querySelectorAll('.otp-input');

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });
});


const verifyBtn = document.querySelector(".verify-btn");
const otpInputs = document.querySelectorAll(".otp-input");

verifyBtn.addEventListener("click", async () => {
    const otp = [...otpInputs]
        .map(input => input.value.trim())
        .join("");

    if (otp.length !== 6) {
        alert("Please enter a valid 6-digit OTP.");
        return;
    }

    const registrationData = JSON.parse(
        localStorage.getItem("registrationData")
    );

    if (!registrationData) {
        alert("Registration data not found.");
        return;
    }

    try {
        verifyBtn.disabled = true;
        verifyBtn.textContent = "Verifying...";

        // Add OTP to registration payload
        const payload = {
            ...registrationData,
            otp
        };

        const response = await fetch(
            "https://mama-check.onrender.com/api/v1/pregnancies/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            }
        );

        let data;

        try {
            data = await response.json();
        } catch {
            data = {
                message: "Unable to read server response."
            };
        }

                if (response.ok) {
                    alert("Registration successful!");

                    localStorage.setItem(
                        "registeredMother",
                        JSON.stringify(data)
                    );

                    localStorage.removeItem("registrationData");

                    window.location.replace("overview.html");
                } else {
                    alert(data.message || "Registration failed.");
                }

//         if (response.ok) {
//             alert("Registration successful!");

//             localStorage.setItem(
//                 "registeredMother",
//                 JSON.stringify(data)
//             );

//             localStorage.removeItem("registrationData");

//             // Redirect to dashboard
//             // window.location.href = "overview.html";
//         } else {
//             alert(data.message || "Registration failed.");
//         }

    } catch (error) {
        console.error("Error:", error);
        alert("Network error. Please try again.");
    } finally {
        verifyBtn.disabled = false;
        verifyBtn.textContent = "Verify Number";
    }
});