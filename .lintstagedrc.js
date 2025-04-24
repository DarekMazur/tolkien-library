/* eslint-env node */

import path from 'path';

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

export default {
  '*.{ts,tsx}': () => 'tsc --noEmit',
  '*.{js,jsx,ts,tsx,json,md,css,scss}': 'prettier --write',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
