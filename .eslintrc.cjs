module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'plugin:vue/base',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    activeDocument: 'readonly',
    app: 'readonly',
    module: 'readonly',
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    ecmaVersion: 6,
    sourceType: 'module',
    jsx: true,
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    // TODO
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
    'vue/multi-word-component-names': 1,
    'vue/no-v-model-argument': 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/no-unused-vars': 0, // Configured in tsconfig instead.
    'no-unused-vars': 0, // Configured in tsconfig instead.
    indent: ['error', 2],
    // 'prettier/prettier': [
    //     'error',
    //     {
    //         trailingComma: 'all',
    //         printWidth: 120,
    //         tabWidth: 4,
    //         useTabs: false,
    //         singleQuote: true,
    //         bracketSpacing: true,
    //     },
    // ],
    semi: ['error', 'always'],
    'import/order': 'error',
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.json', 'other-packages/*/tsconfig.json'],
      },
    },
  },
};
