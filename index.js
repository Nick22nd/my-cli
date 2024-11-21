#!/usr/bin/env node
const { program } = require('commander')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const {PROJECT_MAP} = require('./constant')
const { existsSync } = require('./file')
const { join } = require('path')
console.log('hello my-cli')
// 输出版对应的版本号
program
    .version(`my-cli ${require('./package').version}`)
    .command('create <app-name>')
    .description('create a new project powered by my-cli')
    .option('-T, --template [template]', 'Enter a name of template')
    .action(async name => {
        const {
            template
        } = await inquirer.prompt([{
            name: 'template',
            type: 'rawlist',
            message: 'Please choose a template:',
            default: 'ProjectA',
            choices: [{
                name: '项目 A',
                value: 'PROJECT_A'
            },
            {
                name: '项目 B',
                value: 'PROJECT_B'
            },
            {
                name: '项目 C',
                value: 'PROJECT_C'
            }
            ]
        }])
        const dirPath = join(process.cwd(), name)
        await existsSync(dirPath)
        // 下载 GitHub 仓库时可以省略前面的 github:
        console.log(`开始创建项目: ${name}`, dirPath, template, PROJECT_MAP[template])
        download(`${PROJECT_MAP[template].path}`, name, error => {
        if (error) {
          console.log(`创建 ${name} 项目失败`)
          console.log('失败原因: ', error)
        } else {
          console.log(`成功创建项目: ${name}`)
          console.log(`所使用的模板: ${template}`)
        }
      })
    })
program
    .command('checkAll')
    .description('Browse all the templates')
    .action(() => {
        const templateList = ['ProjectA', 'ProjectB', 'ProjectC']
        templateList.forEach((temp, index) => {
            console.log(`(${index + 1})  ${temp}`)
        })
    })
program.parse(process.argv)