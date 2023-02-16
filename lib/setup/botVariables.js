const { Collection } = require('discord.js')

module.exports = bot => {
  bot.prefix = '.'
  bot.token = 'MTA3NTAyMTUzOTE4MDgxNDQwNw.GcHwxd.sct0MuGXFFga9HIZli4riUV-ZPeVaUoXvXkgpY'

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