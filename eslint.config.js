// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/component-selector": [
        "error",
        {
          prefix: "app",
          style: "kebab-case",
          type: "element",
        },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          prefix: "app",
          style: "camelCase",
          type: "attribute",
        },
      ],
      "quotes": [
        "error",
        "single",
        {
          allowTemplateLiterals: true,
        },
      ],
      "@angular-eslint/no-empty-lifecycle-method": "off",
      "@angular-eslint/prefer-inject": "off",
      "@angular-eslint/prefer-standalone": "off",
      "@angular-eslint/prefer-on-push-component-change-detection": "off",
      "no-var": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "no-useless-escape": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
    ],
  }
);
