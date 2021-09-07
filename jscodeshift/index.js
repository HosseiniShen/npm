const j = require('jscodeshift')

const jsContent = `app.say = function(test) {
  console.log(test);
}

app.get('/api/config/save', checkConfigHighRiskPermission, function() {
  console.log('cool')
});

app.say('123')`

const ast = j(jsContent)

// 找到名称为 get 的 Identifier ，然后替换成一个新的 identifier
// ast.find(j.Identifier, { name: 'get' })
//   .forEach(path => {
//       j(path).replaceWith(j.identifier('post'));
//   })

// 找到 app.get 表达式中的 function，替换成 generator function
const ret = ast.find(j.FunctionExpression)
  .at(-1).nodes()

console.log(ret)