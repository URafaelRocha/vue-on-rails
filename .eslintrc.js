module.exports = {
  root: true,
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue', '.ts']
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'vue'],
  globals: {
    ga: 'readonly',
    chrome: 'readonly'
  },
  rules: {
    quotes: ['warn', 'single', { avoidEscape: true }],
    semi: 'warn',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-mutating-props': 'off',
    'vue/no-reserved-component-names': 'off',
    'eol-last': ['error', 'always']
  }
};
