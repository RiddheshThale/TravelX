// Minimal ESLint flat config for this Vite + React project.
// Note: eslint itself and any plugins are not part of this project's
// dependencies, so `lint` is not wired up as an npm script. Install
// eslint (and optionally eslint-plugin-react-hooks / react-refresh)
// if you'd like to lint locally, then reference them here.
export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {},
  },
];
