import { test, expect } from '@playwright/test';

test('has title', async function({ page }) {
  await page.goto('https://example.com/');
  await page.setContent(`
    <script>window.result = 1;</script>
  `);

  const result = await page.evaluate(function() {
    return window.result;
  });

  await expect(result).toBe(1);
});
