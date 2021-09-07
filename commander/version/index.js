const program = require('commander')

/**
 * version: 定义命令程序的版本号
 */
program
  .version('9.9.9', '-V, --version', 'float like a butterfly')

program.parse()

/**
 * node xxx.js -V
 * 9.9.9
 */
