module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript',
    'plugin:vue/vue3-recommended',
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': 0,
    'no-nested-ternary': 0,
    'no-unused-expressions': 0,
    'no-param-reassign': 0,
    radix: 0,
    'func-names': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'quotes': 0
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        './**/**/*.test.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
