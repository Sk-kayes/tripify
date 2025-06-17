const form = document.getElementById("reviewForm");
const ratingInputs = document.querySelectorAll('input[name="rating"]');
const selectedRatingDisplay = document.getElementById("selected-rating");
const ratingError = document.getElementById("rating-error");

// Update displayed selected rating
ratingInputs.forEach(input => {
  input.addEventListener("change", () => {
    selectedRatingDisplay.textContent = input.value;
    ratingError.style.display = "none";
  });
});

// Prevent form submission if no rating
form.addEventListener("submit", function (e) {
  const selectedRating = document.querySelector('input[name="rating"]:checked');

  if (!selectedRating || selectedRating.value === "0") {
    e.preventDefault();
    ratingError.style.display = "block";
  }
});
