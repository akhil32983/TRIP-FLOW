import { test, expect } from "@playwright/test";
import { FRONTEND_URL } from "../config/environment";
import { generateUsername } from "./utils/testUtils";

test.describe("Profile Management", () => {
    const validPassword = "Ab12345678";
    
    let testUsername: string;
    let testEmail: string;

    test.beforeAll(async ({ browser }) => {
        testUsername = generateUsername("profile_user");
        testEmail = `${testUsername}@test.com`;

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(`${FRONTEND_URL}/signup`);
        await page.getByLabel(/correo electrónico/i).fill(testEmail);
        await page.getByLabel(/usuario/i).fill(testUsername);
        await page.getByLabel(/^contraseña/i).fill(validPassword);
        await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
        await page.getByRole("button", { name: /registrarse/i }).click();

        await page.waitForURL(/\/verify/, { timeout: 10000 });
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto(`${FRONTEND_URL}/login`);
        await page.getByLabel(/usuario \/ email/i).fill(testUsername);
        await page.getByLabel(/contraseña/i).fill(validPassword);
        await page.getByRole("button", { name: /iniciar sesión/i }).click();
        await page.waitForURL(/\/dashboard/, { timeout: 10000 });
    });

    test("should navigate to profile page", async ({ page }) => {
        await page.getByRole("link", { name: /perfil/i }).click();
        await expect(page).toHaveURL(/.*\/profile/);
        
        await expect(page.getByRole("link", { name: /editar perfil/i })).toBeVisible();
    });

    test("should update profile details", async ({ page }) => {
        await page.goto(`${FRONTEND_URL}/profile`);
        await page.getByRole("link", { name: /editar perfil/i }).click();
        
        await expect(page).toHaveURL(/.*\/profile\/edit/);
        
        const newName = `User ${testUsername}`;
        const newLocation = "Madrid, Spain";
        const newDescription = "Testing the profile description field.";

        await page.getByLabel(/nombre/i).fill(newName);
        await page.getByLabel(/ubicación/i).fill(newLocation);
        await page.getByLabel(/sobre mí/i).fill(newDescription);
        
        await page.getByRole("button", { name: /guardar/i }).click();

        await expect(page.getByText(/perfil actualizado correctamente/i)).toBeVisible();
        await expect(page).toHaveURL(/.*\/profile/);
        
        await expect(page.getByRole("heading", { name: newName })).toBeVisible();
        await expect(page.getByText(newLocation)).toBeVisible();
        await expect(page.getByText(newDescription)).toBeVisible();
    });
});
