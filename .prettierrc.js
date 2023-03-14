module.exports = {
  printWidth: 100,
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
  ],
};
