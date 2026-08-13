document.getElementById('year').textContent = new Date().getFullYear();

const SUPABASE_URL = 'https://shfgolhxofitcggvpfli.supabase.co/rest/v1/';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_iQZBs9LJoMpNSJZkfW7KDQ_xk95z6gx';

document.getElementById('waitlist-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const form = this;
  const emailInput = document.getElementById('email');
  const message = document.getElementById('form-message');
  const submitButton = form.querySelector('button[type="submit"]');

  const email = emailInput.value.trim();

  message.textContent = 'Joining waitlist...';
  submitButton.disabled = true;

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      message.textContent = 'Thank you! You are now on the Journey Forward Friends waitlist.';
      form.reset();
    } else if (response.status === 409) {
      message.textContent = 'You are already on the waitlist. Thank you!';
    } else {
      const errorText = await response.text();
      console.error('Supabase error:', errorText);
      message.textContent = 'We could not add you right now. Please try again.';
    }
  } catch (error) {
    console.error('Waitlist error:', error);
    message.textContent = 'We could not add you right now. Please try again.';
  } finally {
    submitButton.disabled = false;
  }
});
