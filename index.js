#!/usr/bin/env node
const { program } = require('commander')
const inquirer = require('inquirer')
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
                value: 'ProjectA'
            },
            {
                name: '项目 B',
                value: 'ProjectB'
            },
            {
                name: '项目 C',
                value: 'ProjectC'
            }
            ]
        }])
        console.log(`成功创建项目: ${name}`)
        console.log(`所使用的模板: ${template}`)
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