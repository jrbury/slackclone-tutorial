module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  globals: {
    document: true,
    localStorage: true,
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
  },
  parser: 'babel-eslint',
  env: {
    browser: 1,
  },
};
