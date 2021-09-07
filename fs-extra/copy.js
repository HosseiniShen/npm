const path = require('path')
const fs = require('fs-extra')

const root = process.cwd()
const originFolder = path.resolve(root, './babel/index.js')
const targetFolder = path.resolve(root, './another/index.js')

fs.copySync(originFolder, targetFolder)
