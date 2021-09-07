/**
 * 
{
  type: String, // 表示提问的类型，下文会单独解释
  name: String, // 在最后获取到的answers回答对象中，作为当前这个问题的键
  message: String|Function, // 打印出来的问题标题，如果为函数的话
  default: String|Number|Array|Function, // 用户不输入回答时，问题的默认值。或者使用函数来return一个默认值。假如为函数时，函数第一个参数为当前问题的输入答案。
  choices: Array|Function, // 给出一个选择的列表，假如是一个函数的话，第一个参数为当前问题的输入答案。为数组时，数组的每个元素可以为基本类型中的值。
  validate: Function, // 接受用户输入，并且当值合法时，函数返回true。当函数返回false时，一个默认的错误信息会被提供给用户。
  filter: Function, // 接受用户输入并且将值转化后返回填充入最后的answers对象内。
  when: Function|Boolean, // 接受当前用户输入的answers对象，并且通过返回true或者false来决定是否当前的问题应该去问。也可以是简单类型的值。
  pageSize: Number, // 改变渲染list,rawlist,expand或者checkbox时的行数的长度。
}
 */
const inquirer = require('inquirer')

// inquirer.prompt([
//   {
//     type: 'rawlist',
//     name: 'float like a butterfly',
//     message: 'Are you handsome?',
//     choices: [
//       { name: 1, value: 1, disabled: true },
//       { name: 2, value: 2 },
//       { name: 3, value: 3 },
//       { name: 4, value: 4 },
//       { name: 5, value: 5 }
//     ]
//   },
//   {
//     type: 'rawlist',
//     name: 'float like a butterfly2',
//     message: 'Are you handsome?',
//     validate: (res) => {
//       console.log(res)
//       return res > 3 ? true : 'error number'
//     },
//     choices: [1,2,3,4,5]
//   }
// ]).then(answer => {
//   console.log()
//   console.log(answer)
// })

function validate (name) {
  return ![/^a$/,/^b$/,/^c$/,/^d$/,/^e$/].some(i => i.test(name))
}

const flg = validate('f')
console.log(flg)