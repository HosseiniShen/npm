const fs = require('fs')
const ejs = require('ejs')

const temp = fs.readFileSync('./ejs/tmp.ejs', 'utf-8')
const ret = ejs.compile(temp)({
  names: [ 'kaka', 'ronaldo', 'messi' ]
})

fs.writeFileSync('./ejs/ret.tpl', ret)
console.log(ret)