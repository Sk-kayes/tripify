document.getElementById('editForm').addEventListener('submit', function (e) {
    let isValid = true;

    const fields = [
        { id: 'title', error: '❌ Title is required', success: '✅ Looks good!' },
        { id: 'description', error: '❌ Description is required', success: '✅ Looks good!' },
        { id: 'image', error: '❌ Invalid URL', success: '✅ Great image URL!', validate: isValidURL },
        { id: 'price', error: '❌ Enter valid price', success: '✅ Price is promising!', validate: val => !isNaN(val) && Number(val) > 0 },
        { id: 'location', error: '❌ Location is required', success: '✅ Nice location!' },
        { id: 'country', error: '❌ Country is required', success: '✅ Good choice!' }
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorSpan = document.getElementById(field.id + 'Error');
        const successSpan = document.getElementById(field.id + 'Success');

        input.classList.remove('invalid');
        errorSpan.style.display = 'none';
        successSpan.style.display = 'none';

        const value = input.value.trim();
        const valid = field.validate ? field.validate(value) : value !== '';

        if (!valid) {
            errorSpan.textContent = field.error;
            errorSpan.style.display = 'block';
            input.classList.add('invalid');
            isValid = false;
        } else {
            successSpan.textContent = field.success;
            successSpan.style.display = 'block';
        }
    });

    if (!isValid) e.preventDefault();
});

function isValidURL(str) {
    try {
        new URL(str);
        return true;
    } catch {
        return false;
    }
}
