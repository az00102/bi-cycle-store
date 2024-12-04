// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-console": "warn",
      "no-undef": "error",

    },
    // "globals": {
    //   "process": "readonly"
    // }
  },

  {
    ignores: [".node_modules/*", "dist"]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];