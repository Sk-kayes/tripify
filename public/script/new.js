const form = document.getElementById('listingForm');
const title = document.getElementById('title');
// const image = document.getElementById('image');
const price = document.getElementById('price');
const locationInput = document.getElementById('location');
const country = document.getElementById('country');
const description = document.getElementById('description');

form.addEventListener('submit', function (e) {
  let valid = true;

  if (title.value.trim() === '') {
    showError(title, 'titleError');
    valid = false;
  } else {
    hideError('titleError');
    showSuccess('titleSuccess', '✅ Title looks good!');
  }

  // if (image.value.trim() !== '' && !isValidURL(image.value.trim())) {
  //   showError(image, 'imageError');
  //   valid = false;
  // } else {
  //   hideError('imageError');
  //   if (image.value.trim() !== '') showSuccess('imageSuccess', '✅ Great image URL!');
  // }

  if (price.value.trim() === '' || isNaN(price.value) || Number(price.value) < 0) {
    showError(price, 'priceError');
    valid = false;
  } else {
    hideError('priceError');
    showSuccess('priceSuccess', '✅ Price is promising!');
  }

  if (locationInput.value.trim() === '') {
    showError(locationInput, 'locationError');
    valid = false;
  } else {
    hideError('locationError');
    showSuccess('locationSuccess', '✅ Nice location choice!');
  }

  if (country.value.trim() === '') {
    showError(country, 'countryError');
    valid = false;
  } else {
    hideError('countryError');
    showSuccess('countrySuccess', '✅ Sounds great!');
  }

  if (description.value.trim() === '') {
    showError(description, 'descriptionError');
    valid = false;
  } else {
    hideError('descriptionError');
    showSuccess('descriptionSuccess', '✅ Description looks good!');
  }

  if (!valid) e.preventDefault();
});

function showError(input, errorId) {
  const error = document.getElementById(errorId);
  if (error) error.style.display = 'block';
  input.classList.add('invalid');
  const successId = errorId.replace('Error', 'Success');
  hideSuccess(successId);
}

function hideError(errorId) {
  const error = document.getElementById(errorId);
  if (error) error.style.display = 'none';
}

function showSuccess(successId, message) {
  const success = document.getElementById(successId);
  if (success) {
    success.textContent = message;
    success.style.display = 'block';
  }
}

function hideSuccess(successId) {
  const success = document.getElementById(successId);
  if (success) success.style.display = 'none';
}

function isValidURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
    '(([a-zA-Z0-9$\\-_@.&+!*"(),]|(%[0-9a-fA-F]{2}))+)' +
    '(\\.[a-zA-Z]{2,})' +
    '(\\/[a-zA-Z0-9#]+\\/?)*$', 'i'
  );
  return pattern.test(str);
}
