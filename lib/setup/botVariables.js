const { Collection } = require('discord.js')

module.exports = bot => {
  bot.prefix = '.'
  bot.token = 'TOKEN'

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