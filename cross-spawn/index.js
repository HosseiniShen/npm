const spawn = require('cross-spawn')

const ret = spawn('npm', ['-v'])

console.log(process.pid, process.ppid)