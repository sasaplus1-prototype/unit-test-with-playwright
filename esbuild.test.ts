import type { a1 as a1Fn } from './a-1';
import type { b1 as b1Fn } from './b-1';

import * as esbuild from 'esbuild';

import { test, expect } from '@playwright/test';

type Win = {
  a1: { a1: typeof a1Fn };
  b1: { b1: typeof b1Fn };
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
    await page.addScriptTag({ path: './dist/esbuild-a-1.js' })
    await page.addScriptTag({ path: './dist/esbuild-b-1.js' })
  });

  test('test-1', async function({ page }) {
    const result = await page.evaluate(function() {
      const w = window as unknown as Win;

      const { a1 } = w.a1;
      const { b1 } = w.b1;

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
