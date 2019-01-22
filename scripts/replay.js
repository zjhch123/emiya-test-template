const selenium = require('selenium-standalone');
const shelljs = require('shelljs');
const path = require('path');

const macaca = path.resolve(process.cwd(), 'node_modules', 'macaca-cli', 'bin', 'macaca-cli')

selenium.start((err, inst) => {
  if (err) {
    console.error(erro)
    process.exit(-1)
  }
  shelljs.exec(`${macaca} run -p 4444 -d sample/test.spec.js --verbose`, { async: true }, () => {
    inst.kill()
  })
})