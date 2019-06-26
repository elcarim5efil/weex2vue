const { compile } = require('vue-template-compiler');


function isSelfCloseTag(el) {
  return ['img', 'input', 'br'].indexOf(el.tag) > -1;
}

function walk(el) {
  const { tag, children, attrsMap } = el;
  if (tag === 'text') {
    el.tag = 'p';
    attrsMap.class = 'weex-text ' + (attrsMap.class || '');
  }
  if (tag === 'image') {
    el.tag = 'img';
  }
  if (tag === 'cell') {
    el.tag = 'div';
  }
  if (children) {
    children.forEach(walk);
  }
}

function genTemplate(el) {
  let res = [];
  const { tag, children } = el;
  if (tag) {
    res = [
      `<${tag}`,
        genAttributes(el),
      `>`
    ];
  } else {
    return el.text;
  }

  if (isSelfCloseTag(el)) {
    return res.join('');
  }
  if (children) {
    res = res.concat(children.map(genTemplate));
  }
  if (tag) {
    res.push(`</${tag}>`);
  }
  return res.join('');
}

function genAttributes(el) {
  const { attrsMap } = el;
  return Object.keys(attrsMap).map((key) => {
    return ` ${key}="${attrsMap[key]}"`;
  }).join('');
}

function codegen(template) {
  const { ast } = compile(template);
  walk(ast);
  return genTemplate(ast);
}

module.exports = {
  codegen
};
