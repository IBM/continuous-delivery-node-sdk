
const { defineConfig, globalIgnores } = require("eslint/config");
const globals = require("globals");
const importPlugin = require("eslint-plugin-import");
const js = require("@eslint/js");
// const jsdoc = require("eslint-plugin-jsdoc");
const pluginJest = require("eslint-plugin-jest");
const prettier = require("eslint-plugin-prettier/recommended");
const tseslint = require("typescript-eslint");

module.exports = defineConfig([
  // List of recommended rules used as a baseline
  js.configs.recommended, // Applies "eslint:recommended"
  prettier,
  {
    files: ["**/*.{cjs,js,mjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.jest,
        ...globals.node
      },
      sourceType: "commonjs"
    },
    rules: {
      "no-unused-vars": "off",
      "prettier/prettier": "off", // Too many problems to resolve
      // "prettier/prettier": [
      //   "error",
      //   {
      //     arrowParens: "avoid",
      //     endOfLine: "auto",
      //     printWidth: 100,
      //     semi: true,
      //     singleQuote: true,
      //     trailingComma: "es5"
      //   }
      // ]
    }
  },
  {
    // update this to match your test files
    files: ["*.test.js", "*.test.jsx"],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
        "jest/expect-expect": "off",
        "jest/no-conditional-expect": "off",
        "jest/no-done-callback": "off",
        "jest/no-standalone-expect": "off",
        "jest/no-try-expect": "off",
        "no-unused-vars": "off"
    }
  },
  {
    extends: [
      tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended
      // jsdoc.configs["flat/recommended"] // Too many problems to resolve
    ],
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "prettier/prettier": "off" // Too many problems to resolve
    },
  },
  // Overrides
  globalIgnores([
    "jsdoc/",
    "doc/",
    "coverage/",
    "dist/",
    "node_modules/",
    "examples/**/node_modules/",
    "test/resources/auth.js",
    "**/*v*.js",
    "!test/**/*.js",
    "!examples/**/*.js",
    "lib/*.js",
    "scripts/typedoc/"
  ])
]);
