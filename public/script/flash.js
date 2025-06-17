  // Auto-dismiss flash message after 4 seconds
  setTimeout(() => {
    const flash = document.querySelector('.flash-message');
    if (flash) {
      flash.classList.add('fade-out');
      setTimeout(() => flash.remove(), 100);
    }
  }, 2000);