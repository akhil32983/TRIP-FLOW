import { test, expect } from "@playwright/test";
import { FRONTEND_URL } from "../config/environment";
import { generateUsername } from "./utils/testUtils";

test.describe("Authentication Flow", () => {
    const shortPassword = "Ab12";
    const validPassword = "Ab12345678";

    test.describe("Registration", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(`${FRONTEND_URL}/signup`);
        });

        test("should render signup form", async ({ page }) => {
            await expect(page.getByLabel(/correo electrónico/i)).toBeVisible();
            await expect(page.getByLabel(/usuario/i)).toBeVisible();
            await expect(page.getByLabel(/^contraseña/i)).toBeVisible();
            await expect(page.getByLabel(/confirmar contraseña/i)).toBeVisible();
            await expect(page.getByRole("button", { name: /registrarse/i })).toBeVisible();
            await expect(page.getByRole("tab", { name: /iniciar sesión/i })).toBeVisible();
        });

        test("should navigate to login page", async ({ page }) => {
            await page.getByRole("tab", { name: /iniciar sesión/i }).click();
            await expect(page).toHaveURL(/\/login/);
        });

        test("should show validation errors for empty fields", async ({ page }) => {
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await expect(page.getByText(/el nombre de usuario es obligatorio/i)).toBeVisible();
            await expect(page.getByText(/la contraseña es obligatoria/i)).toBeVisible();
        });

        test("should show error for invalid username length", async ({ page }) => {
            const emailField = page.getByLabel(/correo electrónico/i);
            const passwordField = page.getByLabel(/^contraseña/i);
            const confirmPasswordField = page.getByLabel(/confirmar contraseña/i);
            const registerButton = page.getByRole("button", { name: /registrarse/i });

            // 1. Username too short (less than 3 characters)
            await emailField.fill("test@test.com");
            await page.getByLabel(/usuario/i).fill("ab");
            await passwordField.fill(validPassword);
            await confirmPasswordField.fill(validPassword);
            await registerButton.click();

            await expect(page.getByText(/el nombre de usuario debe tener entre 3 y 30 caracteres/i)).toBeVisible();

            // 2. Username too long (more than 30 characters)
            await page.getByLabel(/usuario/i).fill("a".repeat(31));
            await passwordField.fill(validPassword);
            await confirmPasswordField.fill(validPassword);
            await registerButton.click();
            
            await expect(page.getByText(/el nombre de usuario debe tener entre 3 y 30 caracteres/i)).toBeVisible();
        });

        test("should show error for password validation", async ({ page }) => {
            const uniqueUsername = generateUsername("test");
            await page.getByLabel(/correo electrónico/i).fill(`${uniqueUsername}@test.com`);
            await page.getByLabel(/usuario/i).fill(uniqueUsername);

            const passwordField = page.getByLabel(/^contraseña/i);
            const confirmPasswordField = page.getByLabel(/confirmar contraseña/i);
            const registerButton = page.getByRole("button", { name: /registrarse/i });

            // 1. Short password error validation
            await passwordField.fill(shortPassword);
            await confirmPasswordField.fill(shortPassword);
            await registerButton.click();

            await expect(page.getByText(/la contraseña debe tener al menos 8 caracteres/i)).toBeVisible();

            // 2. Password mismatch error validation
            await passwordField.fill(validPassword);
            await confirmPasswordField.fill(shortPassword);
            await registerButton.click();
            
            await expect(page.getByText(/las contraseñas no coinciden/i)).toBeVisible();
        });

        test("should successfully register a new user", async ({ page }) => {
            const uniqueUsername = generateUsername("user");
            
            await page.getByLabel(/correo electrónico/i).fill(`${uniqueUsername}@example.com`);
            await page.getByLabel(/usuario/i).fill(uniqueUsername);
            await page.getByLabel(/^contraseña/i).fill(validPassword);
            await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            // Expected to go to verify page, but we manually go to login since backend auto-verifies in test mode
            await expect(page).toHaveURL(/\/verify/, { timeout: 10000 });
            await page.goto(`${FRONTEND_URL}/login`);
        });

        test("should show error for duplicate username", async ({ page }) => {
            const duplicateUsername = generateUsername("dup");
            
            // First registration
            await page.getByLabel(/correo electrónico/i).fill(`${duplicateUsername}@example.com`);
            await page.getByLabel(/usuario/i).fill(duplicateUsername);
            await page.getByLabel(/^contraseña/i).fill(validPassword);
            await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await expect(page).toHaveURL(/\/verify/, { timeout: 10000 });
            
            // Second registration with the same username
            await page.goto(`${FRONTEND_URL}/signup`);
            await page.getByLabel(/correo electrónico/i).fill(`other_${duplicateUsername}@example.com`);
            await page.getByLabel(/usuario/i).fill(duplicateUsername);
            await page.getByLabel(/^contraseña/i).fill(validPassword);
            await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await expect(page.getByText(/el nombre de usuario ya está en uso/i)).toBeVisible();
        });
    });

    test.describe("Login", () => {
        let sharedUsername: string;
        
        test.beforeAll(async ({ browser }) => {
            sharedUsername = generateUsername("login");
            
            const context = await browser.newContext();
            const page = await context.newPage();
            
            await page.goto(`${FRONTEND_URL}/signup`);
            await page.getByLabel(/correo electrónico/i).fill(`${sharedUsername}@example.com`);
            await page.getByLabel(/usuario/i).fill(sharedUsername);
            await page.getByLabel(/^contraseña/i).fill(validPassword);
            await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await page.waitForURL(/\/verify/, { timeout: 10000 });
            await context.close();
        });

        test.beforeEach(async ({ page }) => {
            await page.goto(`${FRONTEND_URL}/login`);
        });

        test("should render login form", async ({ page }) => {
            await expect(page.getByLabel(/usuario \/ email/i)).toBeVisible();
            await expect(page.getByLabel(/contraseña/i)).toBeVisible();
            await expect(page.getByRole("button", { name: /iniciar sesión/i })).toBeVisible();
            await expect(page.getByRole("tab", { name: /registrarse/i })).toBeVisible();
        });

        test("should navigate to signup page", async ({ page }) => {
            await page.getByRole("tab", { name: /registrarse/i }).click();
            await expect(page).toHaveURL(/\/signup/);
        });

        test("should show validation errors for empty fields", async ({ page }) => {
            await page.getByRole("button", { name: /iniciar sesión/i }).click();
            
            await expect(page.getByText(/el nombre de usuario es obligatorio/i)).toBeVisible();
            await expect(page.getByText(/la contraseña es obligatoria/i)).toBeVisible();
        });

        test("should show error for invalid credentials", async ({ page }) => {
            await page.getByLabel(/usuario \/ email/i).fill("nonexist123");
            await page.getByLabel(/contraseña/i).fill("wrongpass123");
            await page.getByRole("button", { name: /iniciar sesión/i }).click();
            
            await expect(page.getByText(/contraseña incorrecta/i)).toBeVisible();
        });

        test("should successfully login with registered user", async ({ page }) => {
            await page.getByLabel(/usuario \/ email/i).fill(sharedUsername);
            await page.getByLabel(/contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /iniciar sesión/i }).click();
            
            await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
            
            // Verify that the username is displayed on the dashboard
            await expect(page.getByText(new RegExp(sharedUsername, "i"))).toBeVisible();
        });
    });

    test.describe("Complete Authentication Flow", () => {
        test("should register, logout, and login again", async ({ page }) => {
            const newUsername = generateUsername("flow");

            // 1. Signup
            await page.goto(`${FRONTEND_URL}/signup`);
            await page.getByLabel(/correo electrónico/i).fill(`${newUsername}@example.com`);
            await page.getByLabel(/usuario/i).fill(newUsername);
            await page.getByLabel(/^contraseña/i).fill(validPassword);
            await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await expect(page).toHaveURL(/\/verify/, { timeout: 10000 });
            await page.goto(`${FRONTEND_URL}/login`);

            // 2. Login
            await page.getByLabel(/usuario \/ email/i).fill(newUsername);
            await page.getByLabel(/^contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /iniciar sesión/i }).click();
            
            await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

            await page.goto(`${FRONTEND_URL}/profile`);

            // 3. Logout
            await page.getByRole("button", { name: /cerrar sesión/i }).click();
            await expect(page).toHaveURL(/\/login/, { timeout: 5000 });

            // 4. Login again
            await page.getByLabel(/usuario \/ email/i).fill(newUsername);
            await page.getByLabel(/^contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /iniciar sesión/i }).click();

            await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
        });

        test("should prevent access to protected routes when not authenticated", async ({ page }) => {
            await page.goto(`${FRONTEND_URL}/dashboard`);
            await expect(page).toHaveURL(/\/login/, { timeout: 5000 });
        });

        test("should redirect to dashboard if already logged in and accessing auth pages", async ({ page }) => {
            const uniqueUsername = generateUsername("redir");
            
            // 1. Registro
            await page.goto(`${FRONTEND_URL}/signup`);
            await page.getByLabel(/correo electrónico/i).fill(`${uniqueUsername}@example.com`);
            await page.getByLabel(/usuario/i).fill(uniqueUsername);
            await page.getByLabel(/^contraseña/i).fill(validPassword);
            await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await expect(page).toHaveURL(/\/verify/, { timeout: 10000 });
            await page.goto(`${FRONTEND_URL}/login`);
            
            // 2. Login
            await page.getByLabel(/usuario/i).fill(uniqueUsername);
            await page.getByLabel(/contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /iniciar sesión/i }).click();

            await expect(page).toHaveURL(/\/dashboard/);

            // 3. Try to access login page
            await page.goto(`${FRONTEND_URL}/login`);
            await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });

            // 4. Try to access signup page
            await page.goto(`${FRONTEND_URL}/signup`);
            await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });
        });
    });
});