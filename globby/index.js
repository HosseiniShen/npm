const globby = require('globby')
const path = require('path')

const source = path.resolve(__dirname, '../commander')
console.log(process.cwd(), __dirname)

globby(['**/*'], { cwd: source, dot: true })
  .then(ret => {
    console.log(ret)
  })

