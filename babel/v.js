const fs = require('fs')
const path = require('path')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const compiler = require('vue-template-compiler')
const { runTransformation } = require('vue-codemod')

const root = process.cwd()
const routePath = path.resolve(root, '../xt/client/view/account/operation/AccountYihuibao.vue')
const storePath = path.resolve(root, './babel/project/store.js')
const source = fs.readFileSync(routePath, 'utf-8')
const storeSource = fs.readFileSync(storePath, 'utf-8')

let { script, template } = compiler.parseComponent(source)
const code = script && script.content

const ast = parse(code, {
  sourceType: 'module',
  plugins: ['jsx']
});


// const ret = traverse(ast, {
//   CallExpression ({ node }) {
//     const { callee } = node
//     if (callee.name === 'mapState' && node.arguments && node.arguments.length) {
//       console.log('')
//       const ret = []
//       node.arguments[0].properties.forEach(p => {
//         let path = findPathInMemberExpression(p.value.body, 'state')
//         console.log(path)
//       })
//     }
//   },

//   MemberExpression ({ node }) {
//     const path = findPathInMemberExpression(node, '$store')
    
//     if (path) {
//       console.log(path)
//     }
//   }

// })

const names = new Set([
  'common',
  'notification',
  'channelManage',
  'riskAdmin',
  'tools',
  'external',
  'storage',
  'map',
  'contentManage',
  'contentV2',
  'financing',
  'outbound',
  'dataSrc'
])

const retSource = runTransformation(
  { path: storePath, source: storeSource },
  storeTransformationModule,
  {}
)
fs.writeFileSync(path.resolve(root, './babel/project/store_copy.js'), retSource)

function storeTransformationModule ({ path, source }, api) {
  const j = api.jscodeshift
  const moduleNames = Array.from(names)

  const toImportStr = n => `import ${ n } from './${ n }/index'`
  const toImportAST = i => j(`${ i }\n`).nodes()[0].program.body[0]
  const importNodes = moduleNames.map(n => toImportAST(toImportStr(n)))
  const propertyNodes = moduleNames.map(n => {
    const property = j.property('init', j.identifier(n), j.literal(n))
    property.value = property.key
    property.shorthand = true
    return property
  })
  const root = j(source)

  root.find(j.ImportDeclaration)
    .at(-1)
    .forEach(({ node }) => delete node.loc)
    .insertAfter(importNodes)

  root.find(j.NewExpression, {
    callee: {
      object: {
        name: 'Vuex'
      }
    }
  })
  .find(j.ObjectExpression)
  .find(j.Property)
  .at(-1)
  .insertAfter(j.property('init', j.identifier('modules'), j.objectExpression(propertyNodes)))


  return root.toSource()
}

function findPathInMemberExpression (memberExp, key) {
  const path = []

  const find = (memberExp) => {
    if (!memberExp) return 
    if (memberExp.type === 'Identifier') return path.unshift(memberExp.name)
    if (memberExp.object) {
      const name = memberExp?.property?.name
      if (name) {
        path.unshift(name)
        if (name === key) return
      }
      find(memberExp.object)
    }
    
  }
  find(memberExp)
  return path.includes(key) ? path : null
}