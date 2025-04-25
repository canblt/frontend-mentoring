import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('Products', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('shows products list', async ({ page }) => {
    await expect(page.getByRole('listitem')).toHaveCount(10);
  });

  test('navigates to a product page', async ({ page }) => {
    await page.getByRole('link', { name: /1 | iPhone 9/ }).click();
    await expect(page).toHaveURL('/products/1');
    expect(page.getByText(/iPhone 9/)).toBeDefined();
    expect(
      page.getByText(/An apple mobile which is nothing like apple/)
    ).toBeDefined();
    expect(page.getByAltText(/iPhone 9/)).toBeDefined();
  });

  test('should not have any a11y issues', async ({ page }) => {
    const a11yResults = await new AxeBuilder({ page }).analyze();

    expect(a11yResults.violations).toEqual([]);
  });
});
