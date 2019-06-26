const { codegen } = require('../compiler/index');
const { prettify } = require('./pretty');
const templateReg = /<template>([\s\S]*)<\/template>/;
const scriptReg = /<script>([\s\S]*)<\/script>/;
const style = /<style>([\s\S]*)<\/style>/;


function isSFC(content) {
  return templateReg.test(content) && scriptReg.test(content);
}

function transformHtml(input, options = {}) {
  let raw = '';
  let prettified = '';
  let error = null;
  try {
    raw = codegen(input);
    prettified = prettify(raw, options);
  } catch(err) {
    console.error(err)
    error = err;
  }
  return {
    raw,
    prettified,
    error
  };
}

function transformWeex(input, options = {}) {
  const templateReg = /<template>([\s\S]*)<\/template>/;
  const template = (templateReg.exec(input) || [])[1];
  if (template === undefined) {
    return {
      raw: '',
      prettified: '',
      error: new Error('Cannot match <template> content'),
    };
  }

  let transed = transformHtml(template, options);
  if (!transed.error) {
    const transformedTemplate = input.replace(template, `\n${transed.prettified || transed.raw}`);
    return {
      raw: transed.raw,
      prettified: transformedTemplate,
      error: null
    }
  } else {
    return {
      raw: '',
      prettified: '',
      error: transed.error,
    };
  }
}

module.exports = {
  isSFC,
  transformHtml,
  transformWeex,
};