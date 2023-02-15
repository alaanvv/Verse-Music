const { readdirSync } = require('fs')

module.exports = bot => {
  readdirSync(process.cwd() + '/lib/command/').forEach(file => {
    let command = require(process.cwd() + '/lib/command/' + file)

    bot.commands.set(command.name, command)
    if (command.aliases) command.aliases.forEach(alias => bot.aliases.set(alias, command.name))
  })
}