module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": "off",
    "max-len": "off",  
    "comma-dangle": "off",
    "no-tabs": "off",
    "no-mixed-spaces-and-tabs": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-trailing-spaces": "off",
    "indent": "off",
    "eol-last": "off",
    "semi": "off",
    "object-curly-spacing": "off",
    "quote-props": "off",
    "spaced-comment": "off",
    "no-case-declarations": "off",
    "no-fallthrough": "off",
    "import/no-unresolved": 0,
    "require-jsdoc": "off",
    "no-invalid-this": "off",
  },
};
