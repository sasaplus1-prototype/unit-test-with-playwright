import type { a1 } from './a-1';
import type { b1 } from './b-1';

import { test, expect } from '@playwright/test';

declare global {
  interface Window {
    a1: typeof a1;
    b1: typeof b1;
  }
}

test.describe('test', function() {
  test.beforeEach(async function({ page }) {
    await page.goto('index.html');
    await page.addScriptTag({ url: '/dist/webpack-a1.js' })
    await page.addScriptTag({ url: '/dist/webpack-b1.js' })
    // await page.addScriptTag({ path: './dist/webpack-a1.js' })
    // await page.addScriptTag({ path: './dist/webpack-b1.js' })
  });

  test('test-1', async function({ page }) {
    const result = await page.evaluate(function() {
      const w: Window = window;

      const a1 = w.a1;
      const b1 = w.b1;

      return {
        a1: a1(100, 200),
        b1: b1('=', '>')
      };
    });

    const { a1, b1 } = result;

    expect(a1).toBe(342);
    expect(b1).toBe('=>42');
  });
});
