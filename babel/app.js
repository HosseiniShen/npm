const fs = require('fs')
const path = require('path')
const t = require('@webassemblyjs/ast')
const { decode } = require("@webassemblyjs/wasm-parser");

const codePath = path.resolve(process.cwd(), '../../work/zm-operation-manage/src/router/routes/activityConfig.js')
const demoCode = path.resolve(process.cwd(), './babel/project/index.js')
const code = fs.readFileSync(codePath, 'utf-8')

const ast = decode(code, {
  sourceType: 'module'
});

const ret = t.traverse(ast, {
  ModuleImport(res) {
    console.log(res)
  }
})

console.log(ret)
