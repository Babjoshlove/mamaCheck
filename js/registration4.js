// --- DOM Elements ---
const verifyBtn = document.querySelector(".verify-btn");
const resendBtn = document.querySelector(".resend-btn");
const otpInputs = document.querySelectorAll(".otp-input");

let countdownInterval;

// --- 1. Automatic Input Focus Handling ---
otpInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        if (input.value.length === 1 && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    });

    // Optional: Handle backspace to move focus backward
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value.length === 0 && index > 0) {
            otpInputs[index - 1].focus();
        }
    });
});

// --- 2. Helper Functions ---
function getRegistrationData() {
    const registrationData = JSON.parse(localStorage.getItem("registrationData"));
    if (!registrationData || !registrationData.phone) {
        alert("Registration details missing. Please restart registration.");
        return null;
    }
    return registrationData;
}

function startResendCooldown(durationInSeconds) {
    let timeLeft = durationInSeconds;
    resendBtn.disabled = true;

    countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            resendBtn.disabled = false;
            resendBtn.textContent = "Resend OTP";
        } else {
            resendBtn.textContent = `Resend OTP (${timeLeft}s)`;
            timeLeft--;
        }
    }, 1000);
}

// --- 3. Verify OTP & Submit Registration ---
verifyBtn.addEventListener("click", async () => {
    const otp = [...otpInputs].map(input => input.value.trim()).join("");
    if (otp.length !== 6) {
        alert("Please enter a valid 6-digit OTP.");
        return;
    }

    const registrationData = getRegistrationData();
    if (!registrationData) return;

    try {
        verifyBtn.disabled = true;
        verifyBtn.textContent = "Verifying OTP...";

        // Step A: Verify OTP via Auth endpoint
        const verifyResponse = await fetch("https://mamacheck26.onrender.com/api/v1/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phone: registrationData.phone,
                otp: otp
            })
        });



        let verifyData = await verifyResponse.json().catch(() => ({
            message: "Unable to read verification response."
        }));

        if (!verifyResponse.ok) {
            alert(verifyData.message || "OTP verification failed.");
            return;
        }

        // Step B: Proceed to register pregnancy if OTP is valid
        verifyBtn.textContent = "Completing Registration...";
        const registerResponse = await fetch("https://mamacheck26.onrender.com/api/v1/pregnancies/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registrationData)
        });

        let registerData = await registerResponse.json().catch(() => ({
            message: "Unable to read registration response."
        }));

        if (registerResponse.ok) {
            alert("Registration successful!");
            localStorage.setItem("registeredMother", JSON.stringify(registerData));
            localStorage.removeItem("registrationData");
            window.location.replace("overview.html");
        } else {
            alert(registerData.message || "Registration failed.");
        }

    } catch (error) {
        console.error("Verification/Registration Error:", error);
        alert("Network error. Please check your connection and try again.");
    } finally {
        verifyBtn.disabled = false;
        verifyBtn.textContent = "Verify Number";
    }
});

// --- 4. Resend OTP Logic ---
resendBtn.addEventListener("click", async () => {
    const registrationData = getRegistrationData();
    if (!registrationData) return;

    try {
        resendBtn.disabled = true;
        resendBtn.textContent = "Sending...";

        const response = await fetch("https://mamacheck26.onrender.com/api/v1/auth/request-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: registrationData.phone })
        });

        let data = await response.json().catch(() => ({
            message: "Failed to read server response."
        }));

        if (response.ok) {
            alert("A new verification code has been sent!");
            
            // Clear current inputs and refocus
            otpInputs.forEach(input => input.value = "");
            otpInputs[0].focus();

            startResendCooldown(60); // 60-second lock
        } else {
            alert(data.message || "Failed to resend OTP.");
            resendBtn.disabled = false;
            resendBtn.textContent = "Resend OTP";
        }

    } catch (error) {
        console.error("Resend Error:", error);
        alert("Network error. Could not request a new OTP.");
        resendBtn.disabled = false;
        resendBtn.textContent = "Resend OTP";
    }
});