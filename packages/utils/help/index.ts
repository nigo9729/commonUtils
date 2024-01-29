import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import watch from 'glob-watcher';

/** 自动生成index.ts 文件，动态引入 */
export const writeIndexFile = async () => {
  const baseUrl = path.resolve(__dirname, '../src/');
  const entryFile = path.resolve(baseUrl, 'index.ts');

  const toolFiles = await glob(`${baseUrl}/**/**.ts`, {
    ignore: ['node_modules/**', '**/__tests__/**', entryFile],
  });

  const relativePaths = toolFiles.map((file) => {
    return path.relative(baseUrl, file).replace(/\.ts$/, '');
  });

  const fileUrlStr = relativePaths
    .map((path) => `export * from './${path}';`)
    .join('\n');

  const indexFileBanner = '// This file is auto generated by help/index.ts\n\n';

  writeFileSync(entryFile, indexFileBanner + fileUrlStr);
};

const watchFileChange = () => {
  const baseUrl = path.resolve(__dirname, '../src/');
  const entryFile = path.resolve(baseUrl, 'index.ts');
  const watcher = watch([
    `${baseUrl}/**/**.ts`,
    '!node_modules/**',
    '!**/__tests__/**',
    `!${entryFile}`,
  ]);

  watcher.on(['change', 'add', 'unlink'], writeIndexFile);
};

/** 自动生成index.ts 文件，动态引入并监听 */
export const initIndexFile = async () => {
  await writeIndexFile();
  watchFileChange();
};
