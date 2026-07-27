import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '.design/**',
  ]),
  // Data files use bare array/object exports — the anonymous-default-export
  // rule isn't useful here and wrapping them would be noise.
  {
    files: ['src/data/**'],
    rules: { 'import/no-anonymous-default-export': 'off' },
  },
])

export default eslintConfig
