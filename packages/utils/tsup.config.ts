import { defineConfig } from 'tsup';
import { writeIndexFile } from './help';

export default defineConfig(async (options) => {
  await writeIndexFile();
  return {
    entry: ['src/index.ts'],
    splitting: true,
    minify: !options.watch,
    clean: true,
    shims: true,
    bundle: true,
    keepNames: true,
    format: ['cjs', 'esm'],
  };
});
