import { test, expect } from "@playwright/test";
import { FRONTEND_URL } from "../config/environment";
import { generateUsername } from "./utils/testUtils";

test.describe("Itinerary Management", () => {
    const validPassword = "Ab12345678";

    let testUsername: string;

    test.beforeAll(async ({ browser }) => {
        testUsername = generateUsername("itinerary");
        
        const context = await browser.newContext();
        const page = await context.newPage();
        
        // Sign up a new user
        await page.goto(`${FRONTEND_URL}/signup`);
        await page.getByLabel(/usuario/i).fill(testUsername);
        await page.getByLabel(/^contraseña$/i).fill(validPassword);
        await page.getByLabel(/confirmar contraseña/i).fill(validPassword);
        await page.getByRole("button", { name: /registrarse/i }).click();
        
        await page.waitForURL(/\/login/, { timeout: 10000 });
        await context.close();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto(`${FRONTEND_URL}/login`);
        await page.getByLabel(/usuario/i).fill(testUsername);
        await page.getByLabel(/contraseña/i).fill(validPassword);
        await page.getByRole("button", { name: /iniciar sesión/i }).click();
        await page.waitForURL(/\/dashboard/, { timeout: 10000 });
    });

    test.describe("Navigation", () => {
        test("should navigate to itineraries list from dashboard", async ({ page }) => {
            await page.locator("a[href='/itineraries']").last().click();
            await expect(page).toHaveURL(/\/itineraries/);
        });

        test("should navigate to create new itinerary", async ({ page }) => {
            await page.goto(`${FRONTEND_URL}/itineraries`);
            await page.locator("a[href='/itineraries/new']").last().click();
            await expect(page).toHaveURL(/\/itineraries\/new/);
        });
    });

    test.describe("Create Itinerary", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(`${FRONTEND_URL}/itineraries/new`);
        });

        test("should render create itinerary form", async ({ page }) => {
            await expect(page.getByLabel(/icono del viaje/i)).toBeVisible();
            await expect(page.getByLabel(/título del viaje/i)).toBeVisible();
            await expect(page.getByLabel(/destino/i)).toBeVisible();
            await expect(page.getByLabel(/número de viajeros/i)).toBeVisible();
            await expect(page.getByLabel(/presupuesto/i)).toBeVisible();
            await expect(page.getByLabel(/fecha de inicio/i)).toBeVisible();
            await expect(page.getByLabel(/estado/i)).toBeVisible();
            
            await expect(page.getByRole("button", { name: /guardar todo/i })).toBeVisible();
        });

        test("should show validation errors for empty required fields", async ({ page }) => {
            await page.getByLabel(/título del viaje/i).clear();
            await page.getByLabel(/destino/i).clear();
            
            await page.getByRole("button", { name: /guardar todo/i }).click();
            
            // Expect alert to be visible
            await expect(page.getByText(/revisa los campos/i)).toBeVisible({ timeout: 10000 });
        });

        test("should successfully create a new itinerary with basic info", async ({ page }) => {
            await page.getByLabel(/título del viaje/i).fill("Escapada a Barcelona");
            await page.getByLabel(/destino/i).fill("Barcelona, España");
            await page.getByLabel(/número de viajeros/i).fill("2");
            await page.getByLabel(/presupuesto/i).fill("1500");
            await page.getByLabel(/fecha de inicio/i).fill("2025-12-01");
            
            await page.getByRole("button", { name: /guardar todo/i }).click();
            
            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
            await expect(page.getByText(/barcelona/i)).toBeVisible();
        });

        test("should allow adding and removing tags", async ({ page }) => {
            const tagInput = page.locator("input#newTagInput");
            const addTagButton = page.locator('button:has(.lucide-plus)').first();
            
            await tagInput.fill("playa");
            await addTagButton.click();
            
            await tagInput.fill("gastronomía");
            await addTagButton.click();
            
            await expect(page.getByText("playa")).toBeVisible();
            await expect(page.getByText("gastronomía")).toBeVisible();
            await expect(tagInput).toHaveValue("");
        });

        test("should create itinerary with multiple days", async ({ page }) => {
            await expect(page.getByText(/día 1/i)).toBeVisible();

            await page.getByRole("button", { name: /nuevo día/i }).click();

            await expect(page.getByText(/día 2/i)).toBeVisible();
        });

        test("should create an itinerary with activities and locations", async ({ page }) => {
            // 1. Fill basic itinerary info
            await page.getByLabel(/título del viaje/i).fill("Escapada a Barcelona");
            await page.getByLabel(/destino/i).fill("Barcelona, España");
            await page.getByLabel(/número de viajeros/i).fill("2");
            await page.getByLabel(/presupuesto/i).fill("1500");
            await page.getByLabel(/fecha de inicio/i).fill("2025-12-01");
            await page.getByLabel(/icono del viaje/i).fill("🏖️");
            
            // 2. Add activity to Day 1
            const addActivityBtn = page.locator('button:has(.lucide-plus)').last();
            await addActivityBtn.click();

            // 3. Fill activity details
            await page.getByLabel(/qué vas a hacer/i).first().fill("Visita a la Sagrada Familia");
            await page.getByLabel(/hora de inicio/i).first().fill("10:00");
            await page.getByLabel(/cuánto tiempo/i).first().fill("2 horas");
            await page.getByLabel(/descripción y notas/i).first().fill("Entrada reservada online");

            await page.getByLabel(/nombre del lugar/i).fill("Sagrada Familia");
            await page.getByLabel(/dirección completa/i).fill("Carrer de Mallorca, 401, Barcelona");
            await page.getByLabel(/latitud/i).fill("41.4036");
            await page.getByLabel(/longitud/i).fill("2.1744");
            
            // 4. Save it and verify
            await page.getByRole("button", { name: /guardar todo/i }).click();

            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });

            await expect(page.getByText(/escapada a barcelona/i).first()).toBeVisible();
            await expect(page.getByText(/barcelona, españa/i).first()).toBeVisible();
            await expect(page.getByText(/día 1/i).first()).toBeVisible();
            await expect(page.getByText(/visita a la sagrada familia/i).first()).toBeVisible();
            await expect(page.getByText(/10:00/i).first()).toBeVisible();
            await expect(page.getByText(/2 horas/i).first()).toBeVisible();
            await expect(page.getByText(/entrada reservada online/i).first()).toBeVisible();
            await expect(page.getByText(/sagrada familia/i).first()).toBeVisible();
            await expect(page.getByText(/carrer de mallorca, 401, barcelona/i).first()).toBeVisible();
            await expect(page.getByText(/41.4036/i).first()).toBeVisible();
            await expect(page.getByText(/2.1744/i).first()).toBeVisible();
        });

        test("should delete activity from day", async ({ page }) => {
            // 1. Create an activity to day 1
            const addActivityBtn = page.locator('button:has(.lucide-plus)').last();
            await addActivityBtn.click();

            // 2. Ensure activity is added
            await expect(page.getByText(/actividad 1/i)).toBeVisible();

            // 3. Delete the activity
            const deleteActivityBtn = page.locator('button:has(.lucide-trash2)').first();
            await deleteActivityBtn.click();

            // 4. Verify activity is removed
            await expect(page.getByText(/actividad 1/i)).not.toBeVisible();
        });

        test("should delete entire day if there are multiple days", async ({ page }) => {
            // 1. Add a second day
            const newDayBtn = page.getByRole("button", { name: /nuevo día/i });
            await newDayBtn.click();

            // 2. Ensure Day 2 is added
            await expect(page.getByText(/día 2/i)).toBeVisible();

            // 3. Delete Day 2
            const deleteDayBtn = page.locator('button:has(.lucide-trash2)').last();
            await deleteDayBtn.click();

            // 4. Verify Day 2 is removed
            await expect(page.getByText(/día 2/i)).not.toBeVisible();
        });
    });

    test.describe("View Itineraries", () => {
        test("should display list of itineraries", async ({ page }) => {
            // 1. Create a new itinerary to ensure there is at least one
            await page.goto(`${FRONTEND_URL}/itineraries/new`);

            await page.getByLabel(/título del viaje/i).fill("Viaje a París");
            await page.getByLabel(/destino/i).fill("París, Francia");
            await page.getByRole("button", { name: /guardar todo/i }).click();

            await page.waitForLoadState('networkidle');

            // 2. Navigate back to itineraries list
            await page.goto(`${FRONTEND_URL}/itineraries`);
            
            // 3. Check that the itinerary list displays the created itinerary
            const itineraryLink = page.getByRole("link", { name: /viaje a parís/i });
            await expect(itineraryLink).toBeVisible({ timeout: 15000 });
        });

        test("should display itinerary details", async ({ page }) => {
            // 1. Create a new itinerary to ensure there is at least one
            await page.goto(`${FRONTEND_URL}/itineraries/new`);

            await page.getByLabel(/título del viaje/i).fill("Viaje a París");
            await page.getByLabel(/destino/i).fill("París, Francia");
            await page.getByRole("button", { name: /guardar todo/i }).click();

            // 2. Navigate back to itineraries list
            await page.goto(`${FRONTEND_URL}/itineraries`);

            // 3. Click on the itinerary to view details
            const itineraryLink = page.getByRole("link", { name: /viaje a parís/i });
            await expect(itineraryLink).toBeVisible({ timeout: 15000 });
            await itineraryLink.click();

            // 4. Verify that itinerary details are displayed
            await expect(page).toHaveURL(/\/itineraries\/\d+/);
            await expect(page.getByRole("heading", { name: /viaje a parís/i })).toBeVisible();
            await expect(page.getByRole("heading", { name: /parís, francia/i })).toBeVisible();
        });
    });

    test.describe("Edit Itinerary", () => {
        test("should navigate to edit page and display existing data", async ({ page }) => {
            // 1. Create a new itinerary to ensure there is at least one
            await page.goto(`${FRONTEND_URL}/itineraries/new`);

            await page.getByLabel(/título del viaje/i).fill("Viaje a París");
            await page.getByLabel(/destino/i).fill("París, Francia");
            await page.getByRole("button", { name: /guardar todo/i }).click();

            await page.waitForLoadState("networkidle");

            // 2. Click on edit link
            const editBtn = page.locator("a:has(.lucide-square-pen)").first();
            await editBtn.click();

            // 3. Verify navigation to edit page
            await expect(page).toHaveURL(/\/itineraries\/\d+\/edit/);
            await expect(page.getByRole("heading", { name: /editar itinerario/i })).toBeVisible();
            await expect(page.getByRole("textbox", { name: /título del viaje/i })).toHaveValue("Viaje a París");
        });

        test("should successfully update itinerary", async ({ page }) => {
            // 1. Create a new itinerary to ensure there is at least one
            await page.goto(`${FRONTEND_URL}/itineraries/new`);

            await page.getByLabel(/título del viaje/i).fill("Viaje a París");
            await page.getByLabel(/destino/i).fill("París, Francia");
            await page.getByRole("button", { name: /guardar todo/i }).click();

            // 2. Verify that the itinerary was created
            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
            await expect(page.getByText(/parís/i)).toBeVisible();

            // 3. Click on edit link
            await page.locator("a:has(.lucide-square-pen)").first().click();

            // 4. Verify navigation to edit page
            await expect(page).toHaveURL(/\/itineraries\/\d+\/edit/);
            await expect(page.getByText(/editar itinerario/i)).toBeVisible();
            await expect(page.getByText(/viaje a parís/i)).toBeVisible();

            // 5. Update itinerary details
            const titleInput = page.getByLabel(/título del viaje/i);
            await titleInput.fill("Viaje a París - Actualizado");

            await page.getByRole("button", { name: /guardar todo/i }).click();

            // 6. Verify that the itinerary was updated
            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
            await expect(page.getByText(/viaje a parís - actualizado/i)).toBeVisible();
        });
    });

    test.describe("Delete Itinerary", () => {
        test("should show confirmation dialog before delete", async ({ page }) => {
            // 1. Create a new itinerary to ensure there is at least one
            await page.goto(`${FRONTEND_URL}/itineraries/new`);

            await page.getByLabel(/título del viaje/i).fill("Viaje a París");
            await page.getByLabel(/destino/i).fill("París, Francia");
            await page.getByRole("button", { name: /guardar todo/i }).click();

            // 2. Verify that the itinerary was created
            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
            await expect(page.getByText(/parís/i)).toBeVisible();

            // 3. Click on delete button
            await page.locator("button:has(.lucide-trash2)").first().click();

            // 4. Verify confirmation dialog appears
            await expect(page.getByText(/eliminar itinerario/i)).toBeVisible();
        });

        test("should successfully delete itinerary", async ({ page }) => {
            // 1. Create a new itinerary to ensure there is at least one
            await page.goto(`${FRONTEND_URL}/itineraries/new`);

            await page.getByLabel(/título del viaje/i).fill("Viaje a París");
            await page.getByLabel(/destino/i).fill("París, Francia");
            await page.getByRole("button", { name: /guardar todo/i }).click();

            // 2. Verify that the itinerary was created
            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
            await expect(page.getByText(/parís/i).first()).toBeVisible();

            // 3. Click on delete button
            await page.locator("button:has(.lucide-trash2)").first().click();

            // 4. Verify confirmation dialog appears
            await expect(page.getByText(/eliminar itinerario/i)).toBeVisible();

            // 5. Confirm deletion
            await page.getByRole("button", { name: /eliminar/i }).click();

            // 6. Verify that the itinerary was deleted
            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
            await expect(page.getByText(/parís/i).first()).not.toBeVisible();
        });

        test("should cancel delete operation", async ({ page }) => {
            // 1. Create a new itinerary to ensure there is at least one
            await page.goto(`${FRONTEND_URL}/itineraries/new`);

            await page.getByLabel(/título del viaje/i).fill("Viaje a París");
            await page.getByLabel(/destino/i).fill("París, Francia");
            await page.getByRole("button", { name: /guardar todo/i }).click();

            // 2. Verify that the itinerary was created
            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
            await expect(page.getByText(/parís/i)).toBeVisible();

            // 3. Click on delete button
            await page.locator("button:has(.lucide-trash2)").first().click();

            // 4. Verify confirmation dialog appears
            await expect(page.getByText(/eliminar itinerario/i)).toBeVisible();

            // 5. Cancel deletion
            await page.getByRole("button", { name: /cancelar/i }).click();

            // 6. Verify that the itinerary still exists
            await expect(page.getByText(/parís/i).first()).toBeVisible();
        });
    });

    test.describe("Protected Routes", () => {
        test("should redirect to login when accessing itineraries without auth", async ({ page }) => {
            // 1. Log out
            await page.getByRole("button", { name: /cerrar sesión/i }).click();
            
            // 2. Attempt to access itineraries list
            await page.goto(`${FRONTEND_URL}/itineraries`);
            
            // 3. Should redirect to login
            await expect(page).toHaveURL(/\/login/);
        });

        test("should redirect to login when accessing new itinerary without auth", async ({ page }) => {
            // 1. Log out
            await page.getByRole("button", { name: /cerrar sesión/i }).click();
            
            // 2. Attempt to access new itinerary creation
            await page.goto(`${FRONTEND_URL}/itineraries/new`);
            
            // 3. Should redirect to login
            await expect(page).toHaveURL(/\/login/);
        });
    });
});