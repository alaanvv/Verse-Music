module.exports = {
  name: 'play',
  aliases: ['p'],

  run: async (bot, message, args) => {
    if (!args[0]) return message.reply('provide a song')

    if (args.join(' ').includes('soundcloud')) bot.songQuery(bot, message, args, 'song:soundcloud')
    else if (args.join(' ').includes('spotify')) bot.songQuery(bot, message, args, 'song:raw')
    else if (args.join(' ').includes('apple')) bot.songQuery(bot, message, args, 'song:raw')
    else bot.songQuery(bot, message, args, 'song:youtube')
  }
}