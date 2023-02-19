const { REST } = require('@discordjs/rest')
const { readdirSync } = require('fs')
const { Routes } = require('discord-api-types/v9')
const { token, client_id } = require('../../config/config.json')

const commands = []
readdirSync(process.cwd() + '/lib/command-system/command').forEach(file => {
  const command = require(process.cwd() + '/lib/command-system/command/' + file)
  const slashCmd = {
    name: command.name,
    description: command.description ? command.description : 'No description provided',
    options: command.options ? command.options : undefined
  }
  commands.push(slashCmd)
})

const rest = new REST({ version: '9' }).setToken(token)

rest.put(Routes.applicationCommands(client_id), { body: commands })