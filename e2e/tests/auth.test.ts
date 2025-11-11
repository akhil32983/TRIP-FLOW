import { test, expect } from "@playwright/test";
import { FRONTEND_URL } from "../config/environment";

test.describe("Authentication Flow", () => {
    const shortPassword = "Ab12";
    const validPassword = "Ab12345678";
    
    /**
     * Helper function to generate a unique username with 30 characters or less.
     * @param prefix 
     * @returns 
     */
    const generateUsername = (prefix: string) => {
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.random().toString(36).substring(2, 6);
        return `${prefix}_${timestamp}_${random}`;
    };

    test.describe("Registration", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(`${FRONTEND_URL}/signup`);
        });

        test("should render signup form", async ({ page }) => {
            await expect(page.getByLabel(/usuario/i)).toBeVisible();
            await expect(page.getByLabel(/^contraseña$/i)).toBeVisible();
            await expect(page.getByLabel(/confirmar contraseña/i)).toBeVisible();
            await expect(page.getByRole("button", { name: /registrarse/i })).toBeVisible();
            
            await expect(page.getByText(/¿ya tienes una cuenta\?/i)).toBeVisible();
            await expect(page.getByRole("link", { name: /inicia sesión aquí/i })).toBeVisible();
        });

        test("should navigate to login page", async ({ page }) => {
            await page.getByRole("link", { name: /inicia sesión aquí/i }).click();
            await expect(page).toHaveURL(/\/login/);
        });

        test("should show validation errors for empty fields", async ({ page }) => {
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await expect(page.getByText(/el nombre de usuario es obligatorio/i)).toBeVisible();
            await expect(page.getByText(/la contraseña es obligatoria/i)).toBeVisible();
        });

        test("should show error for invalid username length", async ({ page }) => {
            const passwordField = page.getByLabel(/^contraseña$/i);
            const confirmPasswordField = page.getByLabel(/confirmar contraseña/i);
            const registerButton = page.getByRole("button", { name: /registrarse/i });

            // 1. Username too short (less than 3 characters)
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
            await page.getByLabel(/usuario/i).fill(uniqueUsername);

            const passwordField = page.getByLabel(/^contraseña$/i);
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
            
            await page.getByLabel(/usuario/i).fill(uniqueUsername);
            await page.getByLabel(/^contraseña$/i).fill(validPassword);
            await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
        });

        test("should show error for duplicate username", async ({ page }) => {
            const duplicateUsername = generateUsername("dup");
            
            // First registration
            await page.getByLabel(/usuario/i).fill(duplicateUsername);
            await page.getByLabel(/^contraseña$/i).fill(validPassword);
            await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
            
            // Second registration with the same username
            await page.goto(`${FRONTEND_URL}/signup`);
            await page.getByLabel(/usuario/i).fill(duplicateUsername);
            await page.getByLabel(/^contraseña$/i).fill(validPassword);
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
            await page.getByLabel(/usuario/i).fill(sharedUsername);
            await page.getByLabel(/^contraseña$/i).fill(validPassword);
            await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await page.waitForURL(/\/login/, { timeout: 10000 });
            await context.close();
        });

        test.beforeEach(async ({ page }) => {
            await page.goto(`${FRONTEND_URL}/login`);
        });

        test("should render login form", async ({ page }) => {
            await expect(page.getByLabel(/usuario/i)).toBeVisible();
            await expect(page.getByLabel(/contraseña/i)).toBeVisible();
            await expect(page.getByRole("button", { name: /iniciar sesión/i })).toBeVisible();
            
            await expect(page.getByText(/¿no tienes una cuenta\?/i)).toBeVisible();
            await expect(page.getByRole("link", { name: /regístrate aquí/i })).toBeVisible();
        });

        test("should navigate to signup page", async ({ page }) => {
            await page.getByRole("link", { name: /regístrate aquí/i }).click();
            await expect(page).toHaveURL(/\/signup/);
        });

        test("should show validation errors for empty fields", async ({ page }) => {
            await page.getByRole("button", { name: /iniciar sesión/i }).click();
            
            await expect(page.getByText(/el nombre de usuario es obligatorio/i)).toBeVisible();
            await expect(page.getByText(/la contraseña es obligatoria/i)).toBeVisible();
        });

        test("should show error for invalid credentials", async ({ page }) => {
            await page.getByLabel(/usuario/i).fill("nonexist123");
            await page.getByLabel(/contraseña/i).fill("wrongpass123");
            await page.getByRole("button", { name: /iniciar sesión/i }).click();
            
            await expect(page.getByText(/contraseña incorrecta/i)).toBeVisible();
        });

        test("should successfully login with registered user", async ({ page }) => {
            await page.getByLabel(/usuario/i).fill(sharedUsername);
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
            await page.getByLabel(/usuario/i).fill(newUsername);
            await page.getByLabel(/^contraseña/i).fill(validPassword);
            await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await expect(page).toHaveURL(/\/login/, { timeout: 10000 });

            // 2. Login
            await page.getByLabel(/usuario/i).fill(newUsername);
            await page.getByLabel(/^contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /iniciar sesión/i }).click();
            
            await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });

            // 3. Logout
            await page.getByRole("button", { name: /cerrar sesión/i }).click();
            await expect(page).toHaveURL(/\/login/, { timeout: 5000 });

            // 4. Login again
            await page.getByLabel(/usuario/i).fill(newUsername);
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
            await page.getByLabel(/usuario/i).fill(uniqueUsername);
            await page.getByLabel(/^contraseña$/i).fill(validPassword);
            await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
            await page.getByRole("button", { name: /registrarse/i }).click();
            
            await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
            
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