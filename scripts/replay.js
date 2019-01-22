const selenium = require('selenium-standalone');
const shelljs = require('shelljs');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');

const root = process.cwd();

const macaca = path.resolve(root, 'node_modules', 'macaca-cli', 'bin', 'macaca-cli');

const getTestCases = () => {
  const files = fs.readdirSync(path.resolve(root, 'test'))
  return files.map(file => path.join('test', file)).filter(file => path.extname(file) === '.js')
}

const askTestCases = () => {
  const questions = [{
    type: 'list',
    name: 'name',
    message: `请选择测试用例`,
    choices: getTestCases()
  }]

  return inquirer.prompt(questions)
}

selenium.start((err, inst) => {
  if (err) {
    console.error(err)
    process.exit(-1)
  }

  askTestCases().then(answer => {
    shelljs.exec(`${macaca} run -p 4444 -d ${answer.name} --verbose`, { async: true }, () => {
      inst.kill()
    })
  })
})
