const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { readdirSync } = require('fs')
const { token, client_id } = require(`${process.cwd()}/config.json`)

const commands = []
const commandsPath = `${process.cwd()}/lib/command-system/command`

readdirSync(commandsPath).forEach(file => {
  const command = require(`${commandsPath}/${file}`)
  const slashCmd = {
    name: command.name,
    description: command.description,
    options: command.options
  }
  commands.push(slashCmd)
})

const rest = new REST({ version: '9' }).setToken(token)
rest.put(Routes.applicationCommands(client_id), { body: commands })