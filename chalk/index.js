const chalk = require('chalk')
const stripAnsi = require('strip-ansi')

const format = (label, msg) => msg.split('\n').map((line, i) => (i === 0
    ? `${label} ${line}`
    : line.padStart(stripAnsi(label).length))).join('\n')

const chalkTag = msg => chalk.bgBlackBright.white.dim(` ${msg} `)

const log = (msg = '', tag = null) => {
    tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg)
}

const info = (msg, tag = null) => {
    console.log(format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg))
}

const warn = (msg, tag = null) => {
    console.warn(format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg)))
}

const error = (msg, tag = null) => {
    console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg)))
    if (msg instanceof Error) {
        console.error(msg.stack)
    }
}

log('log')
info('info\nget\njkjk')
warn('warn', 'www')
error(new Error('float'))
