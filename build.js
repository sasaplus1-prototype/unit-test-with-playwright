const esbuild = require('esbuild');

async function main() {
  const result = await esbuild.build({
    bundle: true,
    entryPoints: ['./a-1.ts', './b-1.ts'],
    entryNames: 'esbuild-[name]',
    format: 'iife',
    globalName: 'module',
    outdir: './dist',
    sourcemap: 'inline'
  });

  console.log(result);
}
main();
