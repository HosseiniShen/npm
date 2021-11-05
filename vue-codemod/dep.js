const { node } = require('execa');
const fs = require('fs')
const path = require('path')
const { runTransformation } = require('vue-codemod');

const targetPath = path.resolve(process.cwd(), './vue-codemod/app-config.js')
const source = fs.readFileSync(targetPath, 'utf-8')

const ret = runTransformation(
  { path: targetPath, source },
  getAST
)
console.log(ret)
fs.writeFileSync(targetPath, ret)

function getAST ({ path, source }, api) {
  const j = api.jscodeshift

  const name = 'app'

  let root
  const code = `const oo = {
    name: '${ name }',
    activeRule: genActiveRule('${ name }'),
    props: {},
    entry: ''
}`

  const codeAst = j(code)
    .find(j.ObjectExpression)
    .get()
    .value

  try {
    root = j(source)
      .findVariableDeclarators('APP_CONFIG')
      .find(j.ArrayExpression)
      .forEach(p => p.get('elements').push(codeAst))
  } catch (error) {
    console.log(error)
  }

  return root.toSource()
}
