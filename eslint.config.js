import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // 🔹 Regras de boas práticas
      "no-console": "error",
      "no-debugger": "error",
      eqeqeq: ["error", "always"],

      // 🔹 Formatação
      semi: ["error", "always"],
      quotes: ["error", "single"],
      indent: ["error", 2],
      "object-curly-spacing": ["error", "always"],

      // 🔹 Variáveis e nomes
      camelcase: ["warn", { properties: "always" }],
      "id-length": ["warn", { min: 2 }],
      "no-underscore-dangle": ["warn"],

      // 🔹 React
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // 🔹 Lidar com variáveis não utilizadas
      "no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
    },
  },
  prettier,
];