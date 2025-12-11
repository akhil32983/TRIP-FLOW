import { test, expect } from "@playwright/test";
import { FRONTEND_URL } from "../config/environment";
import { generateUniqueString, generateUsername } from "./utils/testUtils";

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

            await expect(page.getByLabel(/título del viaje/i)).toBeVisible();
            await expect(page.getByLabel(/destino/i)).toBeVisible();
            await expect(page.getByLabel(/viajeros/i)).toBeVisible();
            await expect(page.getByLabel(/presupuesto/i)).toBeVisible();
            await expect(page.getByLabel(/fecha de inicio/i)).toBeVisible();
            await expect(page.getByLabel(/fecha de fin/i)).toBeVisible();
            await expect(page.getByLabel(/estado/i)).toBeVisible();
            
            await expect(page.getByRole("button", { name: /^guardar$/i }).first()).toBeVisible();
        });

        test("should show validation errors for empty required fields", async ({ page }) => {
            await page.getByLabel(/título del viaje/i).clear();
            await page.getByLabel(/destino/i).clear();
            
            await page.getByRole("button", { name: /^guardar$/i }).first().click();
            
            // Expect alert to be visible
            await expect(page.getByText(/revisa los campos/i)).toBeVisible({ timeout: 10000 });
        });

        test("should successfully create a new itinerary with basic info", async ({ page }) => {
            await page.getByLabel(/título del viaje/i).fill("Escapada a Barcelona");
            await page.getByLabel(/destino/i).fill("Barcelona, España");
            await page.getByLabel(/viajeros/i).fill("2");
            await page.getByLabel(/presupuesto/i).fill("1500");
            await page.getByLabel(/fecha de inicio/i).fill("2025-12-01");
            await page.getByLabel(/fecha de fin/i).fill("2025-12-05");
            
            await page.getByRole("button", { name: /^guardar$/i }).first().click();
            
            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
            await expect(page.getByText(/barcelona/i).first()).toBeVisible();
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
            await page.getByLabel(/fecha de inicio/i).fill("2025-12-01");
            // Set 3 days duration (2025-12-01 to 2025-12-03)
            await page.getByLabel(/fecha de fin/i).fill("2025-12-03");

            await expect(page.getByText(/día 1/i)).toBeVisible();
            await expect(page.getByText(/día 2/i)).toBeVisible();
            await expect(page.getByText(/día 3/i)).toBeVisible();
        });

        test("should create an itinerary with activities and locations", async ({ page }) => {
            // 1. Fill basic itinerary info
            await page.getByLabel(/título del viaje/i).fill("Escapada a Barcelona");
            await page.getByLabel(/destino/i).fill("Barcelona, España");
            await page.getByLabel(/viajeros/i).fill("2");
            await page.getByLabel(/presupuesto/i).fill("1500");
            await page.getByLabel(/fecha de inicio/i).fill("2025-12-01");
            await page.getByLabel(/fecha de fin/i).fill("2025-12-02"); // 2 days

            
            // 2. Add activity to Day 1
            await expect(page.getByText(/día 1/i)).toBeVisible();
            await page.getByRole("button", { name: /añadir actividad/i }).first().click();

            // 3. Fill activity details
            const activityHeader = page.getByText(/actividad \d+/i).last();
            await activityHeader.click(); // Expand the form
            
            await page.getByLabel(/actividad/i).last().fill("Visita a la Sagrada Familia");
            await page.getByLabel(/hora de inicio/i).last().fill("10:00");
            await page.getByLabel(/duración/i).last().fill("2 horas");
            await page.getByLabel(/descripción/i).last().fill("Entrada reservada online");

            await page.getByLabel(/lugar/i).fill("Sagrada Familia");
            await page.getByLabel(/dirección/i).fill("Carrer de Mallorca, 401, Barcelona");
            await page.getByLabel(/latitud/i).fill("41.4036");
            await page.getByLabel(/longitud/i).fill("2.1744");
            
            // 4. Save it and verify
            await page.getByRole("button", { name: /^guardar$/i }).first().click();

            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });

            await expect(page.getByText(/escapada a barcelona/i).first()).toBeVisible();
            await expect(page.getByText(/barcelona, españa/i).first()).toBeVisible();
            await expect(page.getByText(/día 1/i).first()).toBeVisible();
            await expect(page.getByText(/visita a la sagrada familia/i).first()).toBeVisible();
            await expect(page.getByText(/10:00/i).first()).toBeVisible();
            
            await expect(page.getByText(/sagrada familia/i).first()).toBeVisible();
        });

        test("should delete activity from day", async ({ page }) => {
            // 1. Create one day
            await page.getByLabel(/fecha de inicio/i).fill("2025-12-01");
            await page.getByLabel(/fecha de fin/i).fill("2025-12-01");

            // 2. Create an activity to day 1
            await expect(page.getByText(/día 1/i)).toBeVisible();
            await page.getByRole("button", { name: /añadir actividad/i }).first().click();

            // 3. Ensure activity is added
            await expect(page.getByText(/actividad 1/i)).toBeVisible();

            // 4. Delete the activity
            const deleteActivityBtn = page.locator('button:has(.lucide-trash2)').first();
            await deleteActivityBtn.click();

            // 5. Verify activity is removed
            await expect(page.getByText(/actividad 1/i)).not.toBeVisible();
        });

        test("should delete entire day if there are multiple days", async ({ page }) => {
            // 1. Set dates to have 2 days
            await page.getByLabel(/fecha de inicio/i).fill("2025-12-01");
            await page.getByLabel(/fecha de fin/i).fill("2025-12-02");

            // 2. Ensure Day 2 is added
            await expect(page.getByText(/día 2/i)).toBeVisible();

            // 3. Delete Day 2 by reducing the date range
            await page.getByLabel(/fecha de fin/i).fill("2025-12-01");

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
            await page.getByRole("button", { name: /^guardar$/i }).first().click();

            await page.waitForLoadState("networkidle");

            // 2. Navigate back to itineraries list
            await page.getByText(/volver/i).click();
            
            // 3. Check that the itinerary list displays the created itinerary
            await expect(page.getByText(/viaje a parís/i).first()).toBeVisible({ timeout: 15000 });
            await expect(page.getByText(/parís, francia/i).first()).toBeVisible();
        });

        test("should display itinerary details", async ({ page }) => {
            // 1. Create a new itinerary to ensure there is at least one
            await page.goto(`${FRONTEND_URL}/itineraries/new`);

            await page.getByLabel(/título del viaje/i).fill("Viaje a París");
            await page.getByLabel(/destino/i).fill("París, Francia");
            await page.getByRole("button", { name: /^guardar$/i }).first().click();

            // 2. Navigate back to itineraries list
            await page.getByText(/volver/i).click();

            // 3. Click on the itinerary card to view details
            await page.getByText(/viaje a parís/i).first().click({ force: true });

            // 4. Verify that itinerary details are displayed
            await expect(page).toHaveURL(/\/itineraries\/\d+/);
            await expect(page.getByRole("heading", { name: /viaje a parís/i })).toBeVisible();
            await expect(page.getByText(/parís, francia/i)).toBeVisible();
        });
    });

    test.describe("Edit Itinerary", () => {
        test("should navigate to edit page and display existing data", async ({ page }) => {
            // 1. Create a new itinerary to ensure there is at least one
            await page.goto(`${FRONTEND_URL}/itineraries/new`);

            await page.getByLabel(/título del viaje/i).fill("Viaje a París");
            await page.getByLabel(/destino/i).fill("París, Francia");
            await page.getByRole("button", { name: /^guardar$/i }).first().click();

            await page.waitForLoadState("networkidle");

            // 2. Go to Details page first
            await expect(page.getByText(/viaje a parís/i).first()).toBeVisible();
            await page.getByText(/viaje a parís/i).first().click({ force: true });
            
            // 3. Click on edit link
            const editBtn = page.getByRole("link", { name: /editar/i });
            await editBtn.click();

            // 4. Verify navigation to edit page
            await expect(page).toHaveURL(/\/itineraries\/\d+\/edit/);
            await expect(page.getByRole("heading", { name: /editar itinerario/i })).toBeVisible();
            await expect(page.getByRole("textbox", { name: /título del viaje/i })).toHaveValue("Viaje a París");
        });

        test("should successfully update itinerary", async ({ page }) => {
            // 1. Create a new itinerary to ensure there is at least one
            await page.goto(`${FRONTEND_URL}/itineraries/new`);

            await page.getByLabel(/título del viaje/i).fill("Viaje a París");
            await page.getByLabel(/destino/i).fill("París, Francia");
            await page.getByRole("button", { name: /^guardar$/i }).first().click();

            // 2. Verify that the itinerary was created
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
            await expect(page.getByText(/parís/i).first()).toBeVisible();

            // 3. Navigate to edit page
            await expect(page.getByText(/viaje a parís/i).first()).toBeVisible();
            await page.getByText(/viaje a parís/i).first().click({ force: true });
            
            await expect(page.getByRole("heading", { name: /viaje a parís/i })).toBeVisible();
            await page.getByRole("link", { name: /editar/i }).click();
            
            // 4. Verify navigation to edit page
            await expect(page).toHaveURL(/\/itineraries\/\d+\/edit/);
            await expect(page.getByText(/editar itinerario/i)).toBeVisible();

            // 5. Update itinerary details
            const titleInput = page.getByLabel(/título del viaje/i);
            await titleInput.fill("Viaje a París - Actualizado");

            await page.getByRole("button", { name: /^guardar$/i }).first().click();

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
            await page.getByRole("button", { name: /^guardar$/i }).first().click();

            // 2. Verify that the itinerary was created
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
            await expect(page.getByText(/parís/i).first()).toBeVisible();

            // 3. Navigate to edit page (Delete is there now)
            await expect(page.getByText(/viaje a parís/i).first()).toBeVisible();
            await page.getByText(/viaje a parís/i).first().click({ force: true });
            
            await expect(page.getByRole("heading", { name: /viaje a parís/i })).toBeVisible();
            await page.getByRole("link", { name: /editar/i }).click();

            // 4. Click on delete button
            await page.getByRole("button", { name: /eliminar itinerario/i }).click();

            // 5. Verify confirmation dialog appears
            await expect(page.getByText(/¿estás seguro de que deseas eliminar este itinerario?/i)).toBeVisible();
        });

        test("should successfully delete itinerary", async ({ page }) => {
            const itineraryTitle = generateUniqueString("viaje")
            
            // 1. Create a new itinerary to ensure there is at least one
            await page.goto(`${FRONTEND_URL}/itineraries/new`);

            await page.getByLabel(/título del viaje/i).fill(itineraryTitle);
            await page.getByLabel(/destino/i).fill("España");
            await page.getByRole("button", { name: /^guardar$/i }).first().click();

            // 2. Verify that the itinerary was created
            await page.waitForLoadState("networkidle");
            await expect(page).toHaveURL(/\/itineraries/, { timeout: 10000 });
            const itineraryCard = page.getByText(new RegExp(itineraryTitle, "i"));
            await expect(itineraryCard).toBeVisible();

            // 3. Navigate to edit page
            // Use force click to bypass potential overlays
            await itineraryCard.click({ force: true });

            await expect(page.getByRole("heading", { name: new RegExp(itineraryTitle, "i") })).toBeVisible();
            await page.getByRole("link", { name: /editar/i }).click();

            // 4. Click on delete button
            await page.getByRole("button", { name: /eliminar itinerario/i }).click();

            // 5. Verify confirmation dialog appears
            await expect(page.getByText(/¿estás seguro de que deseas eliminar este itinerario?/i)).toBeVisible();

            // 6. Confirm deletion
            await page.getByRole("button", { name: /^eliminar$/i }).click();

            // 7. Wait for navigation and verify deletion
            await page.waitForURL(/\/itineraries/, { timeout: 10000 });
            
            // 8. Check that the itinerary is no longer present
            const deletedItinerary = page.getByText(new RegExp(itineraryTitle, "i"));
            await expect(deletedItinerary).toHaveCount(0);
        });
    });

    test.describe("Protected Routes", () => {
        test("should redirect to login when accessing itineraries without auth", async ({ page }) => {
            await page.goto(`${FRONTEND_URL}/profile`);

            // 1. Log out
            await page.getByRole("button", { name: /cerrar sesión/i }).click();
            
            // 2. Attempt to access itineraries list
            await page.goto(`${FRONTEND_URL}/itineraries`);
            
            // 3. Should redirect to login
            await expect(page).toHaveURL(/\/login/, { timeout: 10000 });
        });

        test("should redirect to login when accessing new itinerary without auth", async ({ page }) => {
            await page.goto(`${FRONTEND_URL}/profile`);
            
            // 1. Log out
            await page.getByRole("button", { name: /cerrar sesión/i }).click();
            
            // 2. Attempt to access new itinerary creation
            await page.goto(`${FRONTEND_URL}/itineraries/new`);
            
            // 3. Should redirect to login
            await expect(page).toHaveURL(/\/login/);
        });
    });
});