document.getElementById("loginForm").addEventListener("submit", function (e) {
    let valid = true;

    // Get the input elements
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    // Get the error message elements
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    // Validate Username
    if (usernameInput.value.trim() === "") {
        usernameError.style.display = "inline";
        usernameInput.classList.add("invalid");
        valid = false;
    } else {
        usernameError.style.display = "none";
        usernameInput.classList.remove("invalid");
    }

    // Validate Password
    // You might want to add a minimum length check here as well, similar to your signup.js
    if (passwordInput.value.trim() === "") {
        passwordError.style.display = "inline";
        passwordInput.classList.add("invalid");
        valid = false;
    } else {
        passwordError.style.display = "none";
        passwordInput.classList.remove("invalid");
    }

    // If any field is invalid, prevent form submission
    if (!valid) {
        e.preventDefault();
    }
});