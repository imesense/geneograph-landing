import './brand.css';
import './landing.css';
import { landingConfig } from './config.js';

const navToggle = document.querySelector('[data-nav-toggle]');
const navigation = document.querySelector('[data-primary-nav]');
const form = document.querySelector('[data-research-form]');

function setNavigationOpen(open, { returnFocus = false } = {})
{
    if (!navToggle || !navigation)
    {
        return;
    }

    navigation.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.querySelector('.sr-only').textContent = open
        ? 'Close navigation'
        : 'Open navigation';
    document.body.classList.toggle('nav-open', open);

    if (returnFocus)
    {
        navToggle.focus({ preventScroll: true });
    }
}

navToggle?.addEventListener('click', () =>
{
    setNavigationOpen(navToggle.getAttribute('aria-expanded') !== 'true');
});

navigation?.addEventListener('click', event =>
{
    if (event.target.closest('a'))
    {
        setNavigationOpen(false);
    }
});

document.addEventListener('click', event =>
{
    if (navToggle?.getAttribute('aria-expanded') === 'true' &&
        !event.target.closest('[data-site-header]'))
    {
        setNavigationOpen(false);
    }
});

document.addEventListener('keydown', event =>
{
    if (event.key === 'Escape' &&
        navToggle?.getAttribute('aria-expanded') === 'true')
    {
        setNavigationOpen(false, { returnFocus: true });
    }
});

window.addEventListener('resize', () =>
{
    if (window.matchMedia('(min-width: 761px)').matches)
    {
        setNavigationOpen(false);
    }
});

function emitAnalytics(eventName, source)
{
    document.dispatchEvent(new CustomEvent('geneograph:analytics',
    {
        bubbles: true,
        detail: { event: eventName, source },
    }));
}

document.addEventListener('click', event =>
{
    const target = event.target.closest('[data-analytics-event]');
    if (!target || target === form)
    {
        return;
    }

    emitAnalytics(target.dataset.analyticsEvent, target);
});

function safeExternalUrl(value)
{
    if (!value)
    {
        return null;
    }

    try
    {
        const url = new URL(value, window.location.origin);
        return ['https:', 'http:', 'mailto:'].includes(url.protocol) ? url.href : null;
    }
    catch
    {
        return null;
    }
}

document.querySelectorAll('[data-config-link]').forEach(placeholder =>
{
    const url = safeExternalUrl(landingConfig[placeholder.dataset.configLink]);
    if (!url)
    {
        return;
    }

    const link = document.createElement('a');
    link.href = url;
    link.textContent = placeholder.firstChild?.textContent?.trim() || 'Open';
    if (/^https?:/i.test(url))
    {
        link.rel = 'noopener noreferrer';
    }
    placeholder.replaceWith(link);
});

const supportUrl = safeExternalUrl(landingConfig.supportUrl);
const supportHost = document.querySelector('[data-support-action]');
if (supportUrl && supportHost)
{
    const supportLink = document.createElement('a');
    supportLink.className = 'button secondary';
    supportLink.href = supportUrl;
    supportLink.rel = 'noopener noreferrer';
    supportLink.textContent = 'Support the Project';
    supportLink.dataset.analyticsEvent = 'support_click';
    supportHost.replaceChildren(supportLink);
}

function setFormStatus(message, tone = '')
{
    const status = form?.querySelector('[data-form-status]');
    if (!status)
    {
        return;
    }

    status.textContent = message;
    status.className = `form-status${tone ? ` is-${tone}` : ''}`;
}

function validateEmail()
{
    const input = form?.elements.email;
    const error = form?.querySelector('[data-email-error]');
    if (!input || !error)
    {
        return false;
    }

    let message = '';
    if (!input.value.trim())
    {
        message = 'Enter your email address.';
    }
    else if (!input.validity.valid)
    {
        message = 'Enter a valid email address.';
    }

    input.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
    return !message;
}

form?.elements.email?.addEventListener('input', () =>
{
    if (form.elements.email.getAttribute('aria-invalid') === 'true')
    {
        validateEmail();
    }
});

form?.addEventListener('submit', async event =>
{
    event.preventDefault();
    setFormStatus('');
    if (!validateEmail())
    {
        form.elements.email.focus();
        return;
    }
    if (!landingConfig.signupEndpoint)
    {
        setFormStatus('Online signup is not connected yet. No information was sent. Please check back as the prototype develops.');
        return;
    }

    const button = form.querySelector('[data-signup-submit]');
    const originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = 'Joining...';
    form.setAttribute('aria-busy', 'true');
    try
    {
        const response = await fetch(landingConfig.signupEndpoint,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: form.elements.email.value.trim(),
                role: form.elements.role.value || null,
            }),
        });
        if (!response.ok)
        {
            throw new Error(`Signup failed with status ${response.status}`);
        }

        setFormStatus('Thank you. You have joined the GeneoGraph research group.', 'success');
        emitAnalytics('research_signup_completed', form);
        form.querySelector('[data-follow-up]').hidden = false;
    }
    catch (error)
    {
        console.error('Research signup failed:', error);
        setFormStatus('We could not complete the signup. Please try again later.', 'error');
    }
    finally
    {
        button.disabled = false;
        button.textContent = originalLabel;
        form.removeAttribute('aria-busy');
    }
});

form?.querySelector('[data-feedback-submit]')?.addEventListener('click', async () =>
{
    const challenge = form.elements.challenge?.value;
    if (!challenge)
    {
        setFormStatus('Choose a research challenge before sharing feedback.', 'error');
        return;
    }
    if (!landingConfig.feedbackEndpoint)
    {
        setFormStatus('Feedback collection is not connected yet. Your answer was not sent.');
        return;
    }

    try
    {
        const response = await fetch(landingConfig.feedbackEndpoint,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: form.elements.email.value.trim(), challenge }),
        });
        if (!response.ok)
        {
            throw new Error(`Feedback failed with status ${response.status}`);
        }

        setFormStatus('Thank you for sharing what matters most in your research.', 'success');
    }
    catch (error)
    {
        console.error('Research feedback failed:', error);
        setFormStatus('We could not send the feedback. Please try again later.', 'error');
    }
});
