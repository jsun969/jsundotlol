module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    require.resolve('prettier-plugin-astro'),
  ],
  importOrder: ['<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
};
