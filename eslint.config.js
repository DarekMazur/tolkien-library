import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      js,
      react: pluginReact,
    },
    extends: ['js/recommended', pluginReact.configs.flat['jsx-runtime']],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  tseslint.configs.recommended,
  ...compat.extends('plugin:storybook/recommended'),
  {
    settings: {
      react: {
        version: '19.0',
      },
    },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
    },
  },
  {
    ignores: [
      '**/*.config.*',
      '**/.lintstagedrc.*',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
    ],
  },
]);
