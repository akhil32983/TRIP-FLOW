import { test, expect } from '@playwright/test';
import { FRONTEND_URL } from '../config/environment';

test("Example Test", async ({ page }) => {
    await page.goto(FRONTEND_URL);
    await expect(page.getByText('Planifica tus viajes del futuro')).toBeVisible();
});
