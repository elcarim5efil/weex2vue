const prettier = require("prettier/standalone");
const plugins = [require("prettier/parser-html")];

function prettify(content, options = {}) {
  let prettified = ''
  const {
    parser = 'vue',
    arrowParens = 'avoid',
    bracketSpacing = true,
    tabWidth = 4,
    singleQuote = true,
    trailingComma = 'none',
    jsxBracketSameLine = false,
    jsxSingleQuote = false,
    htmlWhitespaceSensitivity = 'css',
    insertPragma = false,
    semi = true,
    printWidth = 80,
    proseWrap = 'preserve',
    requirePragma = false,
    useTabs = false
  } = options;

  prettified = prettier.format(content, {
    parser,
    arrowParens,
    bracketSpacing,
    tabWidth,
    singleQuote,
    trailingComma,
    jsxBracketSameLine,
    jsxSingleQuote,
    htmlWhitespaceSensitivity,
    insertPragma,
    semi,
    printWidth,
    proseWrap,
    plugins,
    requirePragma,
    useTabs,
  });

  return prettified;
}

module.exports = {
  prettify
};