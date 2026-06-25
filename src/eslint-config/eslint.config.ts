import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import a11y from 'eslint-plugin-jsx-a11y'
import noRelativeImports from 'eslint-plugin-no-relative-import-paths'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import * as tseslint from 'typescript-eslint'


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
    name: 'ignored files',
    ignores: [
      '.react-router/',
      '.next/',
    ],
  },
  {
    name: 'included files',
    files: ['**/*.{ts,js`,tsx,jsx}', '*.{js,ts,jsx,tsx}'],
  },
  {
    name: 'import plugin',
    extends: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      importPlugin.flatConfigs.recommended,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      importPlugin.flatConfigs.typescript,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      importPlugin.flatConfigs.react,
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
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          'newlines-between': 'always',
        },
      ],
      // 'import/enforce-node-protocol-usage': ['error', 'always'],
    },
  },
  {
    name: 'stylistic',
    extends: [
      tseslint.configs.stylisticTypeChecked,
      stylistic.configs.customize({ braceStyle: '1tbs' }),
    ],
    rules: {
      '@stylistic/array-bracket-spacing': 'off',
      '@stylistic/no-multiple-empty-lines': 'off',
      '@stylistic/linebreak-style': 'error',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
      '@stylistic/no-multi-spaces': 'off',
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
    },
  },
  {
    name: 'react',
    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs['recommended-latest'],
      a11y.flatConfigs.recommended,
    ],
    settings: {
      react: {
        version: 'detect',
        formComponents: ['Form'],
        linkComponents: [
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
        ],
        'import/resolver': {
          typescript: {},
        },
      },
    },
    rules: {
      '@stylistic/jsx-wrap-multilines': 'off',
      // 'react/jsx-no-leaked-render': ['warn', { validStrategies: ['ternary']}],
    },
  },
  {
    name: 'miscellaneous rules',
    plugins: {
      'no-relative-import-paths': noRelativeImports,
    },
    extends: [
      eslint.configs.recommended,
      // tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
    ],
    rules: {
      'no-empty-pattern': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-relative-import-paths/no-relative-import-paths': ['warn', { allowSameFolder: true }],
      curly: ['error', 'multi'],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-confusing-void-expression': 'off',
    },
  },
)
