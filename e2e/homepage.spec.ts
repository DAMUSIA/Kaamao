import { test, expect } from "@playwright/test";

test.describe("LocalSkill Connect Landing Page E2E Tests", () => {
  test("should load the homepage and check main content", async ({ page }) => {
    // Navigate to homepage
    await page.goto("/");

    // Verify main title is visible and contains expected text
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Empower Your Skills");
    await expect(heading).toContainText("Earn Locally");

    // Verify the rating rating section is present
    await expect(page.locator("text=Community Rating")).toBeVisible();
  });

  test("should open the waitlist modal when clicking Join/Register CTA buttons", async ({
    page,
  }) => {
    await page.goto("/");

    // Locate the 'Join as Provider' CTA button and click it
    // WaitlistModal should show up
    const ctaButton = page
      .locator('button:has-text("Join as Provider")')
      .first();
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();

    // Verify redirection to /login
    await expect(page).toHaveURL(/.*\/login/);

    // Verify login page header is visible
    const loginHeader = page.locator('h2:has-text("Login")');
    await expect(loginHeader).toBeVisible();
  });
});

