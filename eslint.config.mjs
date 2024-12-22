import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'warn', // Warns about console.log usage
      'eqeqeq': 'error', // Enforces strict equality (===) instead of abstract equality (==)
      'no-unused-vars': ['warn', { args: 'none' }], // Warns about unused variables, ignores unused function arguments
      'semi': ['error', 'always'], // Requires semicolons at the end of statements
      'quotes': ['error', 'single'], // Enforces the use of single quotes for strings
      'indent': ['error', 2], // Enforces 2 spaces for indentation
      'no-trailing-spaces': 'error', // Disallows trailing whitespace at the end of lines
      'space-before-function-paren': ['error', 'always'], // Requires a space before function parentheses
      'keyword-spacing': ['error', { before: true, after: true }], // Enforces spaces before and after keywords
      'space-infix-ops': 'error', // Enforces spaces around infix operators (e.g., `a + b`)
      'space-in-parens': ['error', 'never'], // Disallows spaces inside parentheses
      'array-bracket-spacing': ['error', 'never'], // Disallows spaces inside array brackets
      'object-curly-spacing': ['error', 'always'], // Requires spaces inside curly braces
      'block-spacing': ['error', 'always'], // Enforces spaces inside single-line blocks
    }
  },
];
