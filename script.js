document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('waitlist-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const message = document.getElementById('form-message');
  message.textContent = 'Thanks! This prototype is working visually. We will connect the real waitlist database next.';
  this.reset();
});
