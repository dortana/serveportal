module.exports = {
  // Input files to scan (app and components directories)
  input: undefined,
  // Output directory and file
  output: 'src/messages/$LOCALE.json',
  // Supported locales (just "us" in your case)
  locales: ['en-US'],
  // Use the key as the value (e.g., "Email": "Email")
  defaultValue: (lng, ns, key) => key,
  // Avoid creating namespaces (since you want a flat JSON file)
  namespaceSeparator: false,
  keySeparator: false,
  // Handle duplicates by keeping the first occurrence
  keepRemoved: false,
  // Match t() function calls like t('Email')
  createOldCatalogs: false,
  lexers: {
    js: [
      {
        lexer: 'JavascriptLexer',
        functions: ['t', 't.rich'], // Look for t() function calls
      },
    ],
    tsx: [
      {
        lexer: 'JsxLexer',
        functions: ['t', 't.rich'], // Look for t() in JSX/TSX files
      },
    ],
  },
};
