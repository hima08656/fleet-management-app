// scripts/login.js

// Attach event listener to the login form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Check credentials
        if (email === "admin@gmail.com" && password === "admin1234") {
            alert("Login success");
            // Redirect to admin dashboard
            window.location.href = "admin.html";
        } else {
            alert("Wrong email or password");
        }
    });
});