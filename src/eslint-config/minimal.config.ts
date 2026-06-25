import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import a11y from 'eslint-plugin-jsx-a11y'
import noRelativeImports from 'eslint-plugin-no-relative-import-paths'
import solid from 'eslint-plugin-solid/configs/recommended'
import * as tseslint from 'typescript-eslint'

// eslint-disable-next-line @typescript-eslint/no-deprecated
export default tseslint.config(
  {
    name: 'enable typed linting',
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: 'included files',
    files: ['**/*.{ts,js,tsx,jsx}', '*.{js,ts,jsx,tsx}'],
  },
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single', 'avoid-escape']
    }
  },
  {
    name: 'import plugin',
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    settings: {
      'import/internal-regex': '^[~.]/',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: { caseInsensitive: true, order: 'asc' },
          // groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          groups: ['builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index', 'object', 'type'],
        },
      ],
      'import/enforce-node-protocol-usage': ['error', 'always'],
      'import/no-empty-named-blocks': ['error'],
      'import/default': 'off',
    },
  },
  {
    name: 'no-relative-import-paths',
    plugins: {
      'no-relative-import-paths': noRelativeImports,
    },
    rules: {
      'no-relative-import-paths/no-relative-import-paths': ['warn', { allowSameFolder: true }],
    },
  },
  tseslint.configs.base
)
