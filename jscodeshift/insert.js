const j = require('jscodeshift')

const jsContent = `app.say = function(test) {
  console.log(test);
}

app.get('/api/config/save', checkConfigHighRiskPermission, function() {
  console.log('cool')
});

app.say('123')`

const ast = j(jsContent)

ast.find(j.ExpressionStatement)
  .forEach(path => {
    j(path).insertAfter(`console.log('heekjk')`)
  })

console.log(ast.toSource())