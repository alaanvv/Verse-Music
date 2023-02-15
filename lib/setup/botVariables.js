const { Collection } = require('discord.js')

module.exports = bot => {
  bot.prefix = '.'
  bot.token = 'MTA3NTAyMTUzOTE4MDgxNDQwNw.Gg-NsC.3uebp6Mi6oRp2JdOS5XwikgZDu1iWNp0KgbWgE'

  bot.reactions = {
    '⏯': 'pause',
    '⏹': 'stop',
    '⏭': 'skip',
    '🔄': 'loop',
    '🔀': 'shuffle',
    '⭐': 'star',
  }

  bot.commands = new Collection()
  bot.aliases = new Collection()
}