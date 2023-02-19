const { Collection } = require('discord.js')
const config = require(process.cwd() + '/config/config.json')

module.exports = bot => {
  bot.token = config.token
  bot.prefix = config.prefix
  bot.spotifyClientID = config.spotifyClientID
  bot.spotifyClientSecret = config.spotifyClientSecret
  bot.waitingAnswer = []
  bot.searchEmbed = []

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
}