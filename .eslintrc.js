module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'semi': 'off',
    '@typescript-eslint/semi': 'error',
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [2, {'args': 'after-used', 'argsIgnorePattern': '^_'}],
    '@typescript-eslint/no-empty-function': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      { 'format': ['PascalCase'], 'selector': 'interface'},
      { 'format': ['PascalCase'], 'selector': 'typeAlias'},
      { 'format': ['PascalCase'], 'selector': 'class'},
      { 'format': ['camelCase'], 'selector': 'default'},
      { 'format': ['camelCase', 'UPPER_CASE'], 'selector': 'variable'},
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
