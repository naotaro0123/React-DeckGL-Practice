module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: [
    'prettier',
  ],
  parser: "babel-eslint",
  parserOptions: {
    'sourceType': 'module',
  },
  env: {
    'browser': true,
    'node': true,
    'es6': true,
    'jest': true
  },
   // add your custom rules here
  rules: {
  }
}
