const fs = require('fs')
const { runTransformation } = require('vue-codemod')

const filePath = './vue-codemod/source.vue'

const source = fs.readFileSync(filePath, 'utf-8')
const imports = [ `import Vuex from 'vuex'`, `import router from './router'` ]

const ret = runTransformation(
    { path: filePath, source: source },
    injectImports,
    { imports }
)

console.log(ret)

function injectImports (fileInfo, api, { imports }) {
    const j = api.jscodeshift
    const root = j(fileInfo.source)

    const toImportAST = i => j(`${ i }\n`) .nodes()[0].program.body[0]
    const toImportHash = node => JSON.stringify({
        specifiers: node.specifiers.map(s => s.local.name),
        source: node.source.raw
    })

    const importDeclarations = root.find(j.ImportDeclaration)
    const importSet = new Set(importDeclarations.nodes().map(toImportHash))
    const nonDuplicates = node => !importSet.has(toImportHash(node))

    const importNodes = imports.map(toImportAST).filter(nonDuplicates)

    if (importDeclarations.length) {
        importDeclarations
            .at(-1)
            // 删掉上一行 import 语句下的空行
            .forEach(({ node }) => delete node.loc)
            .insertAfter(importNodes)
    } else {
        root.get().node.program.body.unshift(...importNodes)
    }

    return root.toSource()
}
