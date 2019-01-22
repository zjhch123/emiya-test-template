const path = require('path');
const fs = require('fs');

const inquirer = require('inquirer');
const uirecorder = require('uirecorder');

const now = Date.now()
const defaultName = `test_${now}.js`

const askName = () => {
  const questions = [{
    type: 'input',
    name: 'name',
    message: `请输入测试用例的名称, 以.js结尾(${defaultName})`,
    validate: (_val) => {
      _val = _val.trim().toLowerCase()
      if (_val === '') {
        _val = defaultName
      }
      if (fs.existsSync(path.join(process.cwd(), 'test', _val))) {
        return '该名称已存在'
      } else {
        return true
      }
    },
  }]

  return inquirer.prompt(questions)
}

askName().then(answer => {
  const name = answer.name || defaultName

  uirecorder.start({
    cmdFilename: path.join('test', name),
  })
})