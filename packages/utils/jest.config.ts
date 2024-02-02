import type { Config } from 'jest';
import { initIndexFile } from './help';

export default async (): Promise<Config> => {
  await initIndexFile(false);
  return {
    collectCoverage: true,
    coverageThreshold: {
      global: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: 95,
      },
    },
  };
};
