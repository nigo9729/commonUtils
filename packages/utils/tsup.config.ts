import { defineConfig } from 'tsup';
import { initIndexFile } from './help';

export default defineConfig(async (options) => {
  // 生成src/index.ts的入口文件
  await initIndexFile(!!options.watch);
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
