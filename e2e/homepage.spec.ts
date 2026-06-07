import { test, expect } from "@playwright/test";

test.describe("Kaamao Homepage E2E Tests", () => {
  test("should load the homepage and check main content", async ({ page }) => {
    // Navigate to homepage
    await page.goto("/");

    // Verify main title is visible and contains expected text
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Kaamao Connect");
  });

  test("should redirect to login page when clicking login button", async ({
    page,
  }) => {
    await page.goto("/");

    // Locate the 'Go to Login' CTA button and click it
    const ctaButton = page.locator('a:has-text("Go to Login")').first();
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();

    // Verify redirection to /login
    await expect(page).toHaveURL(/.*\/login/);

    // Verify login page header is visible
    const loginHeader = page.locator('h2:has-text("Login")');
    await expect(loginHeader).toBeVisible();
  });
});
