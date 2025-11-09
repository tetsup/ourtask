import type { Config } from 'jest';
import fs from 'fs';
import nextJest from 'next/jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  setupFiles: fs
    .readdirSync('./test/factories')
    .map((file) => `./test/factories/${file}`),
  preset: '@shelf/jest-mongodb',
};

export default nextJest({ dir: './' })(config);
