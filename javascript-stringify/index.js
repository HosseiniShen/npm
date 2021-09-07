const fs = require('fs')
const { stringify } = require('javascript-stringify')

// const source = fs.readFileSync('./commander/description/index.js', 'utf-8')
// const ret = stringify(["test", "string"], (value, indent, stringify) => {
//   if (typeof value === "string") {
//     return '"' + value.replace(/"/g, '\\"') + '"';
//   }

//   return stringify(value);
// })

// console.log(ret)

function makeRaw(str) {
  const fn = () => {
    /* Noop. */
  };
  fn.__expression = str;
  return fn;
}

const result = stringify(
  {
    "no-console": function () { console.log(23) },
    "no-debugger": makeRaw(
      `process.env.NODE_ENV === 'production' ? 'error' : 'off'`
    ),
  },
  (val, indent, stringify) => {
    if (val && val.__expression) {
      return val.__expression;
    }
    return stringify(val);
  },
  2
);

console.log(result)