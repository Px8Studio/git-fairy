const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'commonjs', globals: { console: 'readonly', process: 'readonly', __dirname: 'readonly' } },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn'
    },
    ignores: ['index.d.ts', 'dist/**']
  }
  ,{
    files: ['test/**/*.js'],
    languageOptions: { globals: { describe: 'readonly', it: 'readonly' } },
    rules: {}
  }
];
