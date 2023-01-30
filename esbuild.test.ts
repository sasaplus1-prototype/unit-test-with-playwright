import * as esbuild from 'esbuild';

import { test, expect } from '@playwright/test';

type Modules = {
  a1: typeof import('./a-1');
  b1: typeof import('./b-1');
};

async function build(filePath: string, globalName: string): Promise<void> {
  await esbuild.build({
    bundle: true,
    entryPoints: [filePath],
    entryNames: 'esbuild-[name]',
    format: 'iife',
    globalName,
    outdir: './dist',
    sourcemap: 'inline'
  });
}

test.describe('test', function() {
  test.beforeEach(async function({ page }) {
    await build('./a-1.ts', 'a1');
    await build('./b-1.ts', 'b1');

    await page.goto('index.html');
    await page.addScriptTag({ url: '/dist/esbuild-a-1.js' })
    await page.addScriptTag({ url: '/dist/esbuild-b-1.js' })
    // await page.addScriptTag({ path: './dist/esbuild-a-1.js' })
    // await page.addScriptTag({ path: './dist/esbuild-b-1.js' })
  });

  test('test-1', async function({ page }) {
    const result = await page.evaluate(function() {
      const { a1: A1, b1: B1 } = window as unknown as Modules;

      const { a1 } = A1;
      const { b1 } = B1;

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
