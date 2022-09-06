module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
  },
};
