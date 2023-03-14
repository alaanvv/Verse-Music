const { Collection } = require('discord.js')
const { readdirSync } = require('fs')
const Enmap = require('enmap')
const config = require(`${process.cwd()}/config.json`)

module.exports = bot => {
  // Errors
  require('./error')
  
  // Database
  bot.settingsDB = new Enmap({
    name: 'settings',
    dataDir: './db/settings'
  })
  bot.playlistDB = new Enmap({
    name: 'playlist',
    dataDir: './db/playlist'
  })
  bot.prefixDB = new Enmap({
    name: 'prefix',
    dataDir: './db/prefix'
  })

  // Events
  bot.on('ready', bot => console.log('Bot running as ' + bot.user.tag))
  config.logMessages && bot.on('messageCreate', async message => console.log(`${message.author.username}: ${message.content}`))

  // Bot Variables
  bot.token = config.token
  bot.prefix = config.prefix // Default prefix

  bot.spotifyClientID = config.spotifyClientID
  bot.spotifyClientSecret = config.spotifyClientSecret
  bot.lavalinkPort = config.lavalinkPort

  bot.waitingAnswer = []

  bot.reactions = {
    '⏯': 'pause',
    '⏹': 'stop',
    '⏭': 'skip',
    '🔄': 'loop',
    '🔀': 'shuffle',
    '⭐': 'save',
  }

  bot.commands = new Collection()
  bot.aliases = new Collection()

  // Setup Erela
  require(`${process.cwd()}/lib/music/setup-erela`)(bot)

  // Bot Chat
  const botChatPath = `${process.cwd()}/lib/bot-chat`
  readdirSync(botChatPath).forEach(file => require(`${botChatPath}/${file}`)(bot))

  // Command System
  Array('handle.js', 'handleNoPrefix.js', 'handleSlash.js', 'handleReaction.js', 'loadCommands.js', 'validateCommand.js')
    .forEach(file => require(`${process.cwd()}/lib/command-system/${file}`)(bot))

  // Utils
  require('./utils')(bot)
}