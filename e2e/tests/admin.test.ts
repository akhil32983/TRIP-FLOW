import { test, expect } from "@playwright/test";
import { FRONTEND_URL } from "../config/environment";

import { generateUsername } from "./utils/testUtils";

test.describe("Admin Panel Flow", () => {
    const adminUsername = "admin";
    const adminPassword = "secure_password";
    
    let targetUsername: string;
    let targetEmail: string;

    test.beforeAll(async ({ browser }) => {
        // Create a target user to be managed by admin
        targetUsername = generateUsername("target_user");
        targetEmail = `${targetUsername}@test.com`;

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(`${FRONTEND_URL}/signup`);
        await page.getByLabel(/email/i).fill(targetEmail);
        await page.getByLabel(/username/i).fill(targetUsername);
        await page.getByLabel(/^password/i).fill("Ab12345678");
        await page.getByLabel(/confirm password/i).fill("Ab12345678");
        await page.getByRole("button", { name: /sign up/i }).click();

        await page.waitForURL(/\/verify/, { timeout: 10000 });
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto(`${FRONTEND_URL}/login`);
        await page.getByLabel(/username \/ email/i).fill(adminUsername);
        await page.getByLabel(/password/i).fill(adminPassword);
        await page.getByRole("button", { name: /sign in/i }).click();

        await page.waitForURL(/\/dashboard|admin/, { timeout: 10000 });
    });

    test("should navigate to admin dashboard", async ({ page }) => {
        const adminLink = page.getByRole("link", { name: /admin/i });
        await expect(adminLink).toBeVisible();
        await adminLink.click();

        await expect(page).toHaveURL(/\/admin/);
        await expect(page.getByRole("heading", { name: /administration/i })).toBeVisible();
    });

    test("should search and manage users", async ({ page }) => {
        await page.goto(`${FRONTEND_URL}/admin`);
        
        // Wait for table
        await expect(page.getByRole("table")).toBeVisible({ timeout: 20000 });
        
        const searchInput = page.getByPlaceholder(/search by username/i);
        await expect(searchInput).toBeVisible();
        
        // Search for the target user
        await searchInput.fill(targetUsername);
        await searchInput.press("Enter");

        // Wait for the target row
        const targetRow = page.getByRole("row").filter({ hasText: `@${targetUsername}` }).first();
        await expect(targetRow).toBeVisible({ timeout: 10000 });

        // Verify delete button is enabled for this user. Scope to the row.
        const deleteBtn = targetRow.getByRole("button", { name: /eliminar_usuario|eliminar/i }); 
        // Note: accessibility name might be strict "Eliminar usuario @user".
        // Let's use a simpler locator within the row if name is tricky
        const deleteBtnScoped = targetRow.locator("button");
        await expect(deleteBtnScoped).toBeVisible();
        await expect(deleteBtnScoped).toBeEnabled();

        // Click delete and check modal
        await deleteBtnScoped.click();
        
        // Verify delete confirmation modal
        const modal = page.locator("[role='dialog']"); 
        // Or specific text in modal
        await expect(page.getByText(/are you sure you want to delete/i)).toBeVisible();
        
        // Cancel deletion to keep state clean (or proceed if needed)
        await page.getByRole("button", { name: /cancel/i }).click();
        await expect(page.getByText(/are you sure you want to delete/i)).not.toBeVisible();
    });
});
