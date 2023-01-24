import * as path from 'node:path';
import * as fs from 'node:fs';

import { webpack } from 'webpack';
import { test, expect } from '@playwright/test';

import type { sum } from './index';

declare global {
  interface Window {
    // sum: typeof import('./index').sum
    sum: typeof sum
  }
}

const compiler = webpack({
  context: __dirname,
  devtool: false,
  mode: 'development',
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  entry: './index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
    libraryTarget: 'window'
  },
});

test('test', async function({ page }) {
  await new Promise(function(resolve, reject) {
    compiler.run(function(err, res) {
      err ? reject(err) : resolve(res);
    });
  });

  const script = fs.readFileSync('./index.js', 'utf8');

  await page.goto('https://example.com/');
  await page.setContent(`
    <script>${script}</script>
  `);

  const result = await page.evaluate(function() {
    return window.sum(1, 3);
  });

  await expect(result).toBe(4);
});
