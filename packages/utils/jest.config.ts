import type { Config } from 'jest';
import { initIndexFile } from './help';

export default async (): Promise<Config> => {
  await initIndexFile(false);
  return {
    collectCoverage: true,
    testEnvironment: 'jest-environment-jsdom',
    coverageThreshold: {
      global: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: 95,
      },
    },
    setupFiles: ['<rootDir>/jest.setup.ts'],
  };
};
