import { expect, test } from '@playwright/test';

const demoUrl = 'https://imesense.github.io/geneograph-prototype';

test('landing links to the demo', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Genealogy research gets complicated/ })).toBeVisible();
  const demoLinks = page.locator(`a[href="${demoUrl}"]`);
  await expect(demoLinks).toHaveCount(4);
  for (const link of await demoLinks.all()) {
    await expect(link).toHaveAttribute('href', demoUrl);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute('content', /Organize genealogy research/);
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', 'https://geneograph.com/');
});

test('landing navigation and unavailable integrations are honest', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Join the Research Group' }).first().click();
  await expect(page.locator('#research-group')).toBeInViewport();

  const form = page.locator('[data-research-form]');
  await form.getByRole('button', { name: 'Join the Research Group' }).click();
  await expect(page.locator('[data-email-error]')).toHaveText('Enter your email address.');
  await form.getByLabel('Email').fill('not-an-email');
  await form.getByRole('button', { name: 'Join the Research Group' }).click();
  await expect(page.locator('[data-email-error]')).toHaveText('Enter a valid email address.');
  await form.getByLabel('Email').fill('researcher@example.org');
  await form.getByRole('button', { name: 'Join the Research Group' }).click();
  await expect(page.locator('[data-form-status]')).toContainText('Online signup is not connected yet');
  await expect(page.locator('[data-form-status]')).toContainText('No information was sent');
  await expect(page.locator('[data-follow-up]')).toBeHidden();
  await expect(page.getByText('Support options coming later')).toBeVisible();
});

test('landing signup reports real success and emits analytics only after HTTP success', async ({ page }) => {
  await page.addInitScript(() => {
    window.GENEOGRAPH_LANDING_CONFIG = {
      signupEndpoint: '/api/research',
      supportUrl: 'https://example.org/support',
      contactUrl: 'https://example.org/contact',
    };
    window.__landingEvents = [];
    document.addEventListener('geneograph:analytics', event => window.__landingEvents.push(event.detail.event));
  });
  await page.route('**/api/research', route => route.fulfill({ status: 204, body: '' }));
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Support the Project' })).toHaveAttribute('href', 'https://example.org/support');
  await expect(page.locator('footer').getByRole('link', { name: 'Contact' })).toHaveAttribute('href', 'https://example.org/contact');
  const form = page.locator('[data-research-form]');
  expect(await page.evaluate(() => window.__landingEvents)).not.toContain('research_signup_completed');
  await form.getByLabel('Email').fill('researcher@example.org');
  await form.getByLabel('I am a Optional').selectOption({ label: 'Researcher' });
  await form.getByRole('button', { name: 'Join the Research Group' }).click();
  await expect(page.locator('[data-form-status]')).toContainText('joined the GeneoGraph research group');
  await expect(page.locator('[data-follow-up]')).toBeVisible();
  expect(await page.evaluate(() => window.__landingEvents)).toContain('research_signup_completed');
});

test('landing is responsive, keyboard accessible and respects reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const toggle = page.locator('[data-nav-toggle]');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await page.locator('.skip-link').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeInViewport();

  await page.evaluate(() => {
    document.querySelector('#primary-navigation a[href="#about"]').textContent = 'О проекте и исследовательском подходе';
    document.querySelector('#primary-navigation a[href="#research-group"]').textContent = 'Исследовательская группа';
    document.querySelector('.hero-actions .primary').textContent = 'Открыть интерактивную демонстрацию';
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390);
});
