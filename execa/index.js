const execa = require('execa')

const child = execa('npm', [ '-v' ], {
  cwd: __dirname,
  stdio: ['inherit', 'pipe', 'inherit'],
})

child.stdout.on('data', buffer => {
  process.stdout.write(buffer)
})
