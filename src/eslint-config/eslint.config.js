import stylistic from '@stylistic/eslint-plugin'
import parserTs from '@typescript-eslint/parser'

export default [
  {
    ignores: ['.react-router']
  },
  {
    files: ['**/*.ts', '*.js', '*.ts'],
    languageOptions: {
      parser: parserTs,
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
      '@stylistic/linebreak-style': 'error',
      '@stylistic/eol-last': 'error'
    }
  }
]
