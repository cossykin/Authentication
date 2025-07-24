//  <script>
    const toggleLink = document.getElementById("toggleLink");
    const toggleText = document.getElementById("toggleText");
    const title = document.getElementById("formTitle");
    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");
    const otpForm = document.getElementById("otpForm");

    let currentForm = "signup";

    function switchForm() {
      if (currentForm === "signup" || currentForm === "otp") {
        signupForm.style.display = "none";
        otpForm.style.display = "none";
        signinForm.style.display = "block";
        title.textContent = "Log In";
        toggleText.textContent = "Don't have an account?";
        toggleLink.textContent = "Sign Up";
        currentForm = "signin";
      } else {
        signupForm.style.display = "block";
        otpForm.style.display = "none";
        signinForm.style.display = "none";
        title.textContent = "Sign Up";
        toggleText.textContent = "Already have an account?";
        toggleLink.textContent = "Log In";
        currentForm = "signup";
      }
    }

    toggleLink.addEventListener("click", switchForm);

    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("signupUsername").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
      const errorDiv = document.getElementById("signupError");

      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();
        if (!response.ok) {
          errorDiv.textContent = result.message || "Signup failed.";
          return;
        }

        alert("Signup successful. Check your email for OTP.");
        signupForm.style.display = "none";
        otpForm.style.display = "block";
        title.textContent = "Verify OTP";
        document.getElementById("otpEmail").value = email;
        currentForm = "otp";
      } catch (err) {
        errorDiv.textContent = "Error contacting server.";
      }
    });

    otpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("otpEmail").value;
      const code = document.getElementById("otpCode").value;
      const errorDiv = document.getElementById("otpError");

      try {
        const response = await fetch("/api/otp/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        });

        const result = await response.json();
        if (!response.ok) {
          errorDiv.textContent = result.message || "Verification failed.";
          return;
        }

        alert("Email verified! You can now log in.");
        switchForm();
      } catch (err) {
        errorDiv.textContent = "Error contacting server.";
      }
    });

    signinForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("signinEmail").value;
      const password = document.getElementById("signinPassword").value;
      const errorDiv = document.getElementById("signinError");

      try {
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (!response.ok) {
          errorDiv.textContent = result.message || "Login failed.";
          return;
        }

        localStorage.setItem("token", result.accessToken);
        alert("Login successful!");
        window.location.href = "/dashboard.html"; // adjust as needed
      } catch (err) {
        errorDiv.textContent = "Server error. Try again.";
      }
    });
//   </script>
