module.exports = {
  ignorePatterns: ['*.js'],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: './tsconfig.eslint.json',
    "extraFileExtensions": [".vue"]
  },
  // plugins: [
  //   'vue',
  //   '@typescript-eslint',
  // ],
};
