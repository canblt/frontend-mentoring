import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigates to the products page', async ({ page }) => {
    await page.getByRole('link', { name: /Products/ }).click();
    await expect(page).toHaveURL('/products');
    await expect(page).toHaveTitle('OEV | Choose a product');
    expect(page.getByText(/Select a product/)).toBeDefined();
  });

  test('should not have any a11y issues', async ({ page }) => {
    const a11yResults = await new AxeBuilder({ page }).analyze();

    expect(a11yResults.violations).toEqual([]);
  });
});
