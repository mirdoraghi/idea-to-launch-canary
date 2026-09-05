import { test, expect } from '@playwright/test';

test('saves, reloads, rejects blank input, and clears a marker', async ({ page }) => {
  await page.goto('./');
  const input = page.getByLabel('Your note');
  const error = page.locator('#error');

  await input.fill('  ship the canary  ');
  await page.getByRole('button', { name: 'Save note' }).click();
  await expect(page.locator('#saved')).toHaveText('ship the canary');

  await page.reload();
  await expect(page.locator('#saved')).toHaveText('ship the canary');

  await input.fill('   ');
  await page.getByRole('button', { name: 'Save note' }).click();
  await expect(error).toHaveText('Enter a note before saving.');
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(input).toBeFocused();

  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(page.locator('#saved')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Clear' })).toBeHidden();
});
