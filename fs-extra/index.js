const fs = require('fs-extra')
const path = require('path')

const filePath = path.resolve(process.cwd(), './fs-extra/call.js')

fs.ensureDirSync(path.dirname(filePath))
fs.writeFileSync(filePath, 'float like a butterfly')

const dirs = fs.readdirSync(process.cwd(), { encoding: 'utf-8' })
const ret = dirs.filter(i => {
  return fs.statSync(path.resolve(process.cwd(), i)).isDirectory()
})
console.log(ret)