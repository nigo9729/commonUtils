import { defineConfig } from 'tsup';
import { writeIndexFile } from './help';

export default defineConfig(async (options) => {
  // 生成src/index.ts的入口文件
  await writeIndexFile();
  return {
    entry: ['src/index.ts'],
    splitting: true,
    minify: !options.watch,
    clean: true,
    shims: true,
    dts: true,
    bundle: true,
    keepNames: true,
    format: ['cjs', 'esm'],
  };
});
