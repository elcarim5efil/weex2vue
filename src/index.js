const { isSFC, transformHtml, transformWeex } = require('./helper/transform');

function transform(input, options = {}) {
  const { sfc } = options;
  if (sfc || isSFC(input)) {
    return transformWeex(input, options);
  }
  return transformHtml(input, options);
}

const s = `<div>
  <text
    v-if="content"
    v-for="(item) in list"
    class="hyper" :class="{{o:1}}"
    style="height:100px" :style="{{o:1}}"
    contain="ss"
    @click="on"
  >
    asd
  </text>
  <p>
    12312
  </p>
</div>`;
const s2 = `<div><text>Vue</text><img src="./jpg.png"/></div>`
const res = transform(s2);

console.log('test', res)

module.exports = {
  transform
};