const playerManager = require(`${process.cwd()}/lib/music/player-manager`)

module.exports = {
  name: 'play',
  aliases: ['p'],

  run: async (bot, message, args) => {
    if (!args[0]) return message.reply('provide a song')

    if (args.join(' ').includes('soundcloud')) playerManager(bot, message, args, 'song:soundcloud')
    else if (args.join(' ').includes('spotify')) playerManager(bot, message, args, 'song:raw')
    else if (args.join(' ').includes('apple')) playerManager(bot, message, args, 'song:raw')
    else playerManager(bot, message, args, 'song:youtube')
  }
}