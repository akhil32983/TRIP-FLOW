import { test, expect } from '@playwright/test';
import { FRONTEND_URL } from "../config/environment";

test.describe('Home Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(FRONTEND_URL);
    });

    test("should render main sections", async ({ page }) => {
        await expect(page.getByText("Plan Your Future Trips")).toBeVisible();
        await expect(page.getByText("Why TripFlow?")).toBeVisible();
        await expect(page.getByText("Install TripFlow on Your Mobile")).toBeVisible();
        await expect(page.getByText("Frequently Asked Questions")).toBeVisible();
        await expect(page.getByText("Not convinced yet?")).toBeVisible();
    });

    test("should navigate to login page", async ({ page }) => {
        // Fixed RegEx: Added the missing closing slash before the 'i' flag
        await page.getByRole("link", { name: /log in/i }).click();
        await expect(page).toHaveURL(/\/login/);
    });

    test("should navigate to signup page", async ({ page }) => {
        // Fixed RegEx: Added the missing closing slash before the 'i' flag
        await page.getByRole("link", { name: /get started/i }).click();
        await expect(page).toHaveURL(/\/signup/);
    });

    test("should toggle demo mode", async ({ page }) => {
        // Fixed RegEx: Added the missing closing slash before the 'i' flag
        const demoButton = page.getByRole("button", { name: /try demo/i }).first();
        await demoButton.click();
        await expect(page).toHaveURL(/\/dashboard/);
        
        // Go back to home
        await page.goto(FRONTEND_URL);
        
        // Verify exit demo button
        const exitDemoButton = page.getByRole("button", { name: /exit demo/i }).first();
        await expect(exitDemoButton).toBeVisible();
        
        // Deactivate demo mode
        await exitDemoButton.click();
        
        // Verify that the original button returns
        await expect(demoButton).toBeVisible();
    });
}); // <--- Added this missing closing block at the bottom of your file