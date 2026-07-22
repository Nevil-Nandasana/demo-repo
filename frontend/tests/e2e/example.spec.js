// frontend/tests/e2e/example.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test('should display the welcome message', async ({ page }) => {
    await page.goto('/'); // Navigates to baseURL (http://localhost:3000)
    await expect(page.locator('h1')).toHaveText('Welcome to the Demo App'); // Assuming an H1 with this text
  });

  test('should navigate to a different page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=About'); // Assuming a link with text "About"
    await expect(page).toHaveURL('/about'); // Assuming it navigates to /about
    await expect(page.locator('h2')).toHaveText('About Us'); // Assuming an H2 with this text on the about page
  });

  test('should allow user to interact with a form', async ({ page }) => {
    await page.goto('/contact'); // Assuming a contact page with a form
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message.');
    await page.click('button[type="submit"]');

    // Assuming a success message appears or a redirect happens
    await expect(page.locator('text=Message sent successfully!')).toBeVisible();
  });
});