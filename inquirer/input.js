const inquirer = require('inquirer')

inquirer
  .prompt([
    {
      type: 'password', // password
      name: 'projectName',
      message: 'float like a butterfly',
      default: 'kaka'
    }
  ])
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '))
  })
