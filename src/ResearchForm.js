const form = document.querySelector('#research-form');
form.addEventListener('submit', e =>
{
    e.preventDefault();

    const email = form.email.value.trim();
    const status = form.querySelector('.form-status');
    if (!form.checkValidity())
    {
        form.reportValidity();
        return;
    }

    localStorage.setItem('geneograph-research-interest', email);
    status.textContent = 'Thank you — your interest has been saved on this device for the prototype.';
    form.reset();
});
