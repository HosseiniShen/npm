const path = require('path')
const slash = require('slash')

/**
Unix    => foo/bar
Windows => foo\\bar

slash(string)

Unix    => foo/bar
Windows => foo/bar

用于转换 Windows 反斜杠路径转换为正斜杠路径 \ => /
 * 
 * 
*/

const filePath = path.resolve(__dirname, './dollar')

const ret = slash(filePath)

console.log(ret)
