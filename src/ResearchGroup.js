function attachWeb3Form(formId, statusId, errorId, pendingMessage, successMessage) {
  const form = document.getElementById(formId);
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const status = document.getElementById(statusId);
  const error = document.getElementById(errorId);
  const buttonLabel = submitButton.textContent;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity() || submitButton.disabled) return;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = pendingMessage;
    error.hidden = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission failed');

      form.reset();
      status.textContent = successMessage;
    } catch {
      status.textContent = '';
      error.hidden = false;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = buttonLabel;
      form.removeAttribute('aria-busy');
    }
  });
}

attachWeb3Form('research-form', 'research-status', 'research-error', 'Sending your interest…', 'Thanks — we’ll be in touch about the Research Group.');
attachWeb3Form('contact-form', 'contact-status', 'contact-error', 'Sending your question…', 'Thanks — your question has been sent.');
