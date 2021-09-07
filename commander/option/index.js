const program = require('commander')

// .option('-n, --name <items1> [items2]', 'name description', 'default value')
program
  .version('1.1.1')
  .option('-D, --dev', 'run in development mode')
  .option('-S, --save-dev', 'run in production mode')
  .option('--no-verify', 'verify commander')
  .option('-a, --add <pkgName>', 'add package name')
  .parse()

console.log(program.opts())

/**
 * output: 
 * {
 *  dev: true,
 *  saveDev: true,
 *  verify: false,
 *  add: '{ pkgName }'
 * }
 */