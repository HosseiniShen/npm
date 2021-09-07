const fs = require('fs')
const path = require('path')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const compiler = require('vue-template-compiler')
const domCompiler = require('@vue/compiler-dom')

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

const code = fs.readFileSync(codePath, 'utf-8')

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
    const key = path.node.key.name
    const value = path.node.value.value
    if (key === 'path') {
      // console.log('ObjectProperty', key, value)
    }
  },
})


// 全局组件
if (templateAST.ast.components.includes('zm-op-cms-qualification') ) {
  console.log('zm-op-cms-qualification')
}

if (templateAST.ast.components.includes('vue-draggable-resizable') ) {
  console.log('vue-draggable-resizable')
}

const useZmopUI = templateAST.ast.components.some(name => name.startsWith('zmop-'))

if (useZmopUI) {
  console.log('@zm-op/zmop-ui')
}

if (templateAST.ast.directives.includes('clipboard')) {
  console.log('clipboard')
}

console.log(ret, 'loat like a butterfly')
