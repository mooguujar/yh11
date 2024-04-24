module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard-with-typescript'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['*.js', '*.cjs'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  ignorePatterns: ['*.d.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true
  //   },
  //   ecmaVersion: 'latest',
  //   sourceType: 'module',
  //   project: './tsconfig.json'
  // },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-invalid-void-type': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: [
          'camelCase',
          'PascalCase',
          'UPPER_CASE'
        ],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null
      }
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false, argsIgnorePattern: '^_' }],
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'prefer-regex-literals': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-undef': 'off',
    'no-useless-catch': 'off',
    'react/no-unknown-property': 'off',
    'no-promise-executor-return': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/prefer-for-of': 'off',
    radix: 'off',
    'no-useless-concat': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'prefer-promise-reject-errors': 'off',
    'max-params': ['error', { max: 10 }],
    'prefer-object-spread': 'off',
    semi: 'off',
    indent: ['error', 2],
    'no-debugger': 'off',
    // 'space-in-parens': 'off',
    'space-infix-ops': ['error', { int32Hint: false }],
    'object-curly-spacing': ['error', 'always'],
    'lines-between-class-members': ['error',
      'always',
      { exceptAfterSingleLine: true }],
    'padding-line-between-statements': ['error',
      {
        blankLine: 'always',
        prev: ['const',
          'let',
          'var'],
        next: '*'
      },
      {
        blankLine: 'any',
        prev: ['const',
          'let',
          'var'],
        next: ['const',
          'let',
          'var']
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['if',
          'for',
          'while',
          'do',
          'switch',
          'try',
          'class',
          'function']
      },
      {
        blankLine: 'always',
        prev: ['if',
          'for',
          'while',
          'do',
          'switch',
          'try',
          'class',
          'function'],
        next: '*'
      },
      {
        blankLine: 'any',
        prev: ['if',
          'for',
          'while',
          'do',
          'switch',
          'try',
          'class',
          'function'],
        next: ['if',
          'for',
          'while',
          'do',
          'switch',
          'try',
          'class',
          'function']
      },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' }],
    'object-shorthand': ['error',
      'always',
      { avoidQuotes: true, avoidExplicitReturnArrows: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'no-whitespace-before-property': 'error',
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false, return: false, arrow: false, condition: false, logical: false, prop: false }],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'array-element-newline': ['error', { multiline: true, minItems: 3 }],
    // 'array-bracket-spacing': 'off',
    'space-in-parens': 'off',
    'prefer-template': 'error',
    complexity: ['error', { max: 2000 }],
    'max-nested-callbacks': ['error', 5],
    'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
