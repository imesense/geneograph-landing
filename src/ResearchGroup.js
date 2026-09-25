function attachWeb3Form(formId, statusId, errorId, pendingMessage, successMessage) {
  const form = document.getElementById(formId);
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const status = document.getElementById(statusId);
  const error = document.getElementById(errorId);
  const buttonLabel = submitButton.textContent;
  const sendingLabel = document.documentElement.lang === 'ru' ? 'Отправка…' : 'Sending…';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity() || submitButton.disabled) return;

    submitButton.disabled = true;
    submitButton.textContent = sendingLabel;
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

const formMessages = document.documentElement.lang === 'ru' ? {
  researchPending: 'Отправляем заявку…',
  researchSuccess: 'Спасибо! Мы свяжемся с вами по поводу исследовательской группы.',
  contactPending: 'Отправляем вопрос…',
  contactSuccess: 'Спасибо! Ваш вопрос отправлен.'
} : {
  researchPending: 'Sending your interest…',
  researchSuccess: 'Thanks — we’ll be in touch about the Research Group.',
  contactPending: 'Sending your question…',
  contactSuccess: 'Thanks — your question has been sent.'
};

attachWeb3Form('research-form', 'research-status', 'research-error', formMessages.researchPending, formMessages.researchSuccess);
attachWeb3Form('contact-form', 'contact-status', 'contact-error', formMessages.contactPending, formMessages.contactSuccess);
