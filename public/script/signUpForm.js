document.getElementById("signupForm").addEventListener("submit", function (e) {
    let valid = true;
  
    const fields = [
      { id: "fullname", minLen: 1 },
      { id: "username", minLen: 1 },
      { id: "email", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      { id: "password", minLen: 8 }
    ];
  
    fields.forEach(({ id, minLen = 0, pattern }) => {
      const input = document.getElementById(id);
      const error = document.getElementById(id + "Error");
      const success = document.getElementById(id + "Success");
  
      let value = input.value.trim();
      let isValid = value.length >= minLen;
  
      if (pattern) isValid = pattern.test(value);
  
      if (!isValid) {
        error.style.display = "inline";
        success.style.display = "none";
        input.classList.add("invalid");
        valid = false;
      } else {
        error.style.display = "none";
        success.style.display = "inline";
        input.classList.remove("invalid");
      }
    });
  
    if (!valid) e.preventDefault();
  });
  