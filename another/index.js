const fs = require('fs')
const path = require('path')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const compiler = require('vue-template-compiler')
const domCompiler = require('@vue/compiler-dom')
const { runTransformation } = require('vue-codemod')

const root = process.cwd()

const reto = path.join('router', 'routes', 'referral')

const codePath = path.resolve(root, '../../work/zm-operation-manage/src/views/Group/RewardList/dict.js')
const demoCode = path.resolve(root, '../../work/zm-operation-manage/src/views/referralActivity/posterCenter/add-new.vue')
const aCode = path.resolve(root, '../../work/zm-operation-manage/src/views/PromotionActivities/PromotionActivitiesList/PopBatchActions/index.vue')
const requireInJsCode = path.resolve(root, '../../work/zm-operation-manage/src/views/saleBackstage/index.vue')
const zmQualificationCode = path.resolve(root, '../../work/zm-operation-manage/src/views/Qualifications/create.vue')
const zmopUICode = path.resolve(root, '../../work/zm-operation-manage/src/views/CrWorkbench/components/dataList.vue')
const vClipboardCode = path.resolve(root, '../../work/zm-operation-manage/src/views/CrWorkbench/components/poster.vue')
const protoCode = path.resolve(root, '../../work/zm-operation-manage/src/components/couponDetail/index.vue')

const routePath = path.resolve(root, '../xt/client/router/index.js')
const configMap = path.resolve(process.cwd(), './babel/router.js')

const code = fs.readFileSync(routePath, 'utf-8')

// const sfcDescriptor = compiler.parseComponent(code);
// const templateAST = domCompiler.compile(sfcDescriptor.template.content)

// fs.writeFileSync(path.resolve(root, './babel/tet.tpl'), JSON.stringify(sfcDescriptor.template.content))

// const match = sfcDescriptor.template.content.match(/<img.*src=[\'\"]{1}([^\s\n]*)[\'\"]{1}.*\/>/)

const imgReg = /<img\n?\s*[^\s\>]*\s+src=[\'\"]([^\s\n\>]*)[\'\"][^\>]*\/?>/g
const aReg = /<a\n?[^\>]*:href=\"require\(\'(.*)\'\)\"[^\>]*>/g
const ret1 = []
let i = ''

// while (i = imgReg.exec(sfcDescriptor.template.content)) {
//   console.log(i)
// }

const ast = parse(code, {
  sourceType: 'module',
  plugins: ['jsx']
});

let base = '/boss2'
let baseSeted = false
const ret = traverse(ast, {
  ImportDeclaration(res) {
    const value = res.node.source.value
    // console.log('ImportDeclaration:', value)
  },

  ExportDeclaration (res) {
    console.log(res)
  },

  ExportAllDeclaration (res) {
    console.log(res)
  },

  ExportNamespaceSpecifier (res) {
    console.log(res)
  },

  CallExpression ({ node }) {
    // Import @/views/ActivityConfig/lotteryCode
    // console.log('CallExpression:', path.node.callee.type)
    // console.log('CallExpression:', path.node.callee.type, path.node.arguments[0].value)

    // require ../../assets/img/saleblack.png
    const { callee } = node
    // if (generator.dep.indexOf('xssFilter') > -1 && callee.name === 'require') {
    //   console.log(node.arguments[0].value)
    // }
    if (callee.name === 'require' && node.arguments && node.arguments.length) {
      console.log(node.arguments[0].value)
    }

    // $awaitTo、 $jumpTo 、$cloneDeep、$checkForm
    // const callee = path.node.callee
    // if (callee.property && callee.property.name === '$awaitTo') {
    //   console.log('$awaitTo')
    // }
  },

  ObjectProperty (path) {
    const pathKeys = ['FormManage', 'FormBuildTools']
    const name = path.node.key.name
    const value = path.node.value?.property?.name
    if (name === 'path' && pathKeys.includes(value)) {
      path.parent.properties.forEach(({ key, value }) => {
        if (key.name === 'component' && value.type === 'ArrowFunctionExpression') {
          const _name = value?.body?.arguments?.[0].value
          console.log(_name)
        }
      })

      if (baseSeted) return

      const nodePath = findParentByKey(path, 'children')
      if (nodePath.parentPath) {
        const pathP = nodePath.parentPath.node.properties.find(p => p.key.name === 'path')
        const baseName = pathP?.value?.property?.name
        base += baseName === 'Home' 
          ? '/'
          : baseName === 'CrmHome'
            ? '/crm'
            : ''
        baseSeted = true
      }
      
    }

    function findParentByKey (nodePath, key) {
      if (typeof key !== 'string' || !nodePath) return null
      if (nodePath?.node?.key?.name === key) return nodePath
      return findParentByKey(nodePath.parentPath, key)
    }
  },

  ArrayExpression ({ node }) {
    const pathKeys = ['FormManage', 'FormBuildTools']
    const count = 0
    const routeAST = []
    return

    // const elements = node.elements


    // for (let i = 0; i < elements.length; i++) {
    //   const element = elements[i]
    //   const { properties } = element

    //   const property = properties.find(({ key, value }) => {
    //     const name = value.property.name
    //     return Boolean(key === 'path' && pathKeys.indexOf(name) >= 0)
    //   })

    //   if (!property) continue

    //   const 

    //   for (let j = 0; j < properties.length; j++) {
    //     const { key, value } = properties[j]
    //     const name = value.property.name
    //     if (key === 'path' && pathKeys.indexOf(name) >= 0) {

    //       console.log()
    //       routeAST.push(element)

    //       if (++count === pathKeys.length) return
    //     }
    //   }
    // }
    // if () {

    // }
  },

  ExportNamedDeclaration ({ node }) {
    const key = node.declaration.declarations[0].id.name
    console.log(key)
  },

})

const source = fs.readFileSync(configMap, 'utf-8')
const routeSource = fs.readFileSync(routePath, 'utf-8')

const addNewAppConfig = ({ path, source } , api) => {
  const j = api.jscodeshift

  const pathKeys = ['FormManage', 'FormBuildTools']

  const routeRoot = j(routeSource)
    .find(j.NewExpression, {
      callee: {
        name: 'VueRouter'
      }
    })
    .find(j.ObjectExpression)
    .filter(({ value }) => value.properties.some(p => p?.key?.name === 'path' && pathKeys.includes(p?.value?.property?.name)))
    .forEach(i => {
      i.replace()
    })
    .toSource()

  fs.writeFileSync(require('path').resolve(process.cwd(), './babel/ret.js'), routeRoot)

  const root = j(source)
    .find(j.NewExpression, {
      callee: {
        name: 'VueRouter'
      }
    })
    .find(j.ObjectExpression)
    .forEach(i => {
      const pItem = i.value.properties.find(p => p?.key?.name === 'base')
      pItem.value.value = base
    })
    .find(j.ArrayExpression)
    .forEach(p => p.get('elements').push(...routeRoot.__paths.map(p => p.value)))

  return root.toSource()
}

const retSource = runTransformation(
  { path: configMap, source },
  addNewAppConfig,
  {  }
)
console.log(retSource)


// 全局组件
// if (templateAST.ast.components.includes('zm-op-cms-qualification') ) {
//   console.log('zm-op-cms-qualification')
// }

// if (templateAST.ast.components.includes('vue-draggable-resizable') ) {
//   console.log('vue-draggable-resizable')
// }

// const useZmopUI = templateAST.ast.components.some(name => name.startsWith('zmop-'))

// if (useZmopUI) {
//   console.log('@zm-op/zmop-ui')
// }

// if (templateAST.ast.directives.includes('clipboard')) {
//   console.log('clipboard')
// }

console.log(ret, 'loat like a butterfly')
