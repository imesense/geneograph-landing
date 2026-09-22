import { expect, test } from '@playwright/test';
import { readFile, stat } from 'node:fs/promises';

test('landing links to the demo', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Genealogy research gets complicated/ })).toBeVisible();
  const demoLinks = page.locator('a[href="/demo/"]');
  await expect(demoLinks).toHaveCount(4);
  for (const link of await demoLinks.all()) await expect(link).toHaveAttribute('href', '/demo/');
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

test('demo loads and opens the populated project', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/demo/');
  await expect(page.getByRole('heading', { name: 'Welcome back!' })).toBeVisible();
  await page.getByRole('button', { name: 'Open Whiskerfield Family Tree', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Whiskerfield Family Tree' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('language selection persists', async ({ page }) => {
  await page.goto('/demo/');
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.locator('#globalLanguageSelect').selectOption('ru');
  await expect(page.getByRole('heading', { name: 'С возвращением!' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'С возвращением!' })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('geneograph.language'))).toBe('ru');
});

test('feature module navigation renders representative views', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('geneograph.language', 'en'));
  await page.goto('/demo/');
  await page.getByRole('button', { name: 'Open Whiskerfield Family Tree', exact: true }).click();
  await page.getByRole('button', { name: /Family Tree Structured/ }).click();
  await expect(page.getByRole('region', { name: 'Family tree canvas' })).toBeVisible();
  for (const moduleName of ['People', 'Geneograph', 'Albums', 'Archive', 'Notes', 'Places']) {
    await page.locator(`[data-module="${moduleName}"]`).click();
    await expect(page.locator('main')).not.toBeEmpty();
  }
});

test('npm-owned Leaflet and Quill integrations initialize', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('geneograph.language', 'en'));
  await page.goto('/demo/');
  await page.getByRole('button', { name: 'Open Whiskerfield Family Tree', exact: true }).click();

  await page.locator('[data-module="Places"]').click();
  await expect(page.locator('.leaflet-container')).toBeVisible();

  await page.locator('[data-module="Notes"]').click();
  await page.locator('[data-note-row]').first().click();
  await expect(page.locator('.ql-editor')).toBeVisible();
});

test('Geneograph downloads a branded PNG', async ({ page }) => {
  test.setTimeout(45_000);
  await page.addInitScript(() => localStorage.setItem('geneograph.language', 'en'));
  await page.goto('/demo/');
  await page.getByRole('button', { name: 'Open Whiskerfield Family Tree', exact: true }).click();
  await page.locator('[data-module="Geneograph"]').click();
  await page.locator('[data-geneo-open-board]').first().click();

  const downloadPromise = page.waitForEvent('download');
  await page.locator('[data-geneo-export]').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.png$/i);
  const downloadPath = await download.path();
  expect(downloadPath).toBeTruthy();
  expect((await stat(downloadPath)).size).toBeGreaterThan(0);
  const bytes = await readFile(downloadPath);
  expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
  expect(bytes.readUInt32BE(16)).toBeGreaterThan(1000);
  expect(bytes.readUInt32BE(20)).toBeGreaterThan(500);
});

test('Geneograph exports through the stable narrow toolbar menu', async ({ page }) => {
  test.setTimeout(45_000);
  await page.setViewportSize({ width: 1000, height: 800 });
  await page.addInitScript(() => localStorage.setItem('geneograph.language', 'en'));
  await page.goto('/demo/');
  await page.getByRole('button', { name: 'Open Whiskerfield Family Tree', exact: true }).click();
  await page.locator('[data-module="Geneograph"]').click();
  await page.locator('[data-geneo-open-board]').first().click();

  const overflow = page.locator('[data-geneo-toolbar-overflow]');
  await expect(overflow).toBeVisible();
  const initialBox = await overflow.boundingBox();
  await page.waitForTimeout(250);
  const settledBox = await overflow.boundingBox();
  expect(settledBox?.x).toBe(initialBox?.x);

  await overflow.click();
  const downloadPromise = page.waitForEvent('download');
  await page.locator('[data-geneo-toolbar-action="export"]').click();
  const download = await downloadPromise;
  const downloadPath = await download.path();
  expect(downloadPath).toBeTruthy();
  const bytes = await readFile(downloadPath);
  expect(bytes.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
});
