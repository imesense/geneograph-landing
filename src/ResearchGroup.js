const researchForm = document.getElementById('research-form');

if (researchForm) {
  const submitButton = researchForm.querySelector('button[type="submit"]');
  const status = document.getElementById('research-status');
  const error = document.getElementById('research-error');
  const buttonLabel = submitButton.textContent;

  researchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!researchForm.reportValidity() || submitButton.disabled) return;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    researchForm.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your interest…';
    error.hidden = true;

    try {
      const response = await fetch(researchForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(researchForm)))
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission failed');

      researchForm.reset();
      status.textContent = 'Thanks — we’ll be in touch about the Research Group.';
    } catch {
      status.textContent = '';
      error.hidden = false;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = buttonLabel;
      researchForm.removeAttribute('aria-busy');
    }
  });
}
