/** @type {import("stylelint").Config} */
const config = {
  extends: ["stylelint-config-standard"],
  ignoreFiles: [".next/**", "coverage/**", "node_modules/**", "storybook-static/**"],
  rules: {
    "alpha-value-notation": "number",
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "config",
          "custom-variant",
          "plugin",
          "reference",
          "source",
          "theme",
          "utility",
          "variant",
        ],
      },
    ],
    "color-function-alias-notation": "with-alpha",
    "color-function-notation": "legacy",
    "color-hex-length": "long",
    "custom-property-pattern": null,
    "import-notation": "string",
    "media-feature-range-notation": "prefix",
    "no-descending-specificity": null,
    "property-no-deprecated": null,
    "selector-class-pattern": null,
    "value-keyword-case": null,
  },
}

export default config
