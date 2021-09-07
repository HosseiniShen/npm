const fs = require('fs')
const path = require('path')
const { runTransformation } = require('vue-codemod')

const targetPath = path.resolve(process.cwd(), './vue-codemod/app-config.js')
const source = fs.readFileSync(targetPath, 'utf-8')

const ret = runTransformation(
  { path: targetPath, source },
  getAST
)

console.log(ret)

function getAST ({ path, source }, api) {
  const j = api.jscodeshift
  const elements = j(source)
    .findVariableDeclarators('APP_CONFIG')
    .find('ArrayExpression')
    .get()
    .value
    .elements

  const findByKey = (node, key) => node.properties.find(i => i.key.name === key)

  const collectName = node => {
    let targrt = findByKey(node, 'name')
    return targrt && targrt.value && targrt.value.value
  }

  const collectDir = node => {
    let targrt = findByKey(node, 'routes')
    const args = targrt && targrt.value && targrt.value.arguments
    if (args.length) {
      const match = args[0].value.match(/router\/routes\/(\w+)$/)
      if (match) return match[1]
    }
  }

  const collectPrefix = node => {
    let targrt = findByKey(node, 'activeRule')
    try {
      const { value: { body: { callee: { object } } } } = targrt
      if (object.value) return object.value
      if (object.arguments && object.arguments.length) {
        regStr = object.arguments[0].value
        return new RegExp(regStr)
      } 
    } catch (error) {
      
    }
  }

  return elements.map(node => {
    const name = collectName(node)
    const reg = collectPrefix(node)
    const dir = collectDir(node)
    return { name, reg, dir }
  })

  // return elements.forEach(node => {
  //   const name = collectName(node)
  //   const reg = collectPrefix(node)
  //   const dir = collectDir(node)
  //   if (name) appNames.push(name)
  //   if (reg) activePrefix.push(reg)
  //   if (dir) routeDirs.push(dir)
  // })

  // return { appNames, activePrefix, routeDirs }
}
