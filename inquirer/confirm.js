const inquirer = require('inquirer')

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'SPAModel',
      message: 'Are you Hoss?',
      default: false
    }
  ])
  .then(answers => {
    console.log(JSON.stringify(answers, null, '  '))
  })
