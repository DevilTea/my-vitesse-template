module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'no-debugger': 'error',
    'no-console': process.env.NODE_ENV === 'production'
      ? ['error', { allow: ['warn', 'error'] }]
      : 'off',
    'vue/no-multiple-template-root': 'off'
  }
}
