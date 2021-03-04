module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['@websublime/eslint-config/typescript'],
  parserOptions: {
    ecmaVersion: 2020
  },
  root: true,
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    'comma-spacing': [1, {
      after: true,
      before: false
    }],
    'indent': 'off'
  }
};
