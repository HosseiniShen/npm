const fs = require('fs')
const path = require('path')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default

const root = process.cwd()
const codePath = path.resolve(root, '../../work/zm-operation-manage/src/core/app-config.js')
const code = fs.readFileSync(codePath, 'utf-8')


const ast = parse(code, {
  sourceType: 'module'
});

const ret = traverse(ast, {
  ArrayExpression (path) {  
    console.log(path)
  },

  Identifier (path) {
    console.log(path)
  },

})
