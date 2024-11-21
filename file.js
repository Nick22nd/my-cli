const inquirer = require('inquirer')
const fs  = require('fs-extra')
exports.existsSync = async name => {
  if (fs.existsSync(name)) {
    const {
      action
    } = await inquirer.prompt([{
      name: 'action',
      type: 'list',
      message: `Target directory ${name} already exists. Pick an action:` ,
      default: false,
      choices: [
        {
          name: 'Overwrite',
          value: true
        },
        {
          name: 'Cancel',
          value: false
        }
      ]
    }])
    if (action) {
      console.log(`Removing ${name} ...`)
      await fs.remove(name)
      console.log(`removed ${name} successfully`)
    } else {
      process.exit(-1)
    }
  }
}