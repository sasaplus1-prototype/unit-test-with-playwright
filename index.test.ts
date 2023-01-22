import fs from 'node:fs';

import { test, expect } from '@playwright/test';

test('test1', async function({ page }) {
  await page.goto('https://example.com/');
  await page.setContent(`
    <script>window.result = 1;</script>
  `);

  const result = await page.evaluate(function() {
    return window.result;
  });

  await expect(result).toBe(1);
});

test('test2', async function({ page }) {
  await page.goto('https://example.com/');
  await page.setContent(`
    <script>${fs.readFileSync('./index.js', 'utf8')}</script>
  `);

  const result = await page.evaluate(function() {
    return window.result;
  });

  await expect(result).toBe(5);
});
