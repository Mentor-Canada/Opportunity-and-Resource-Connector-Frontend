module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
    // babelOptions: {
    //   configFile: "./babel.config.json",
    // },
  },
  rules: {
    semi: ["error", "never"]
  },
  env: {
    "browser": true
  },
}