module.exports = {
  name: 'play',
  aliases: ['p'],
  description: 'Play a song or adds a song to the queue. Can take a URL or a search term as input.',
  options: [
    {
      name: 'query',
      description: 'Query to search for',
      type: 3,
      required: true
    }
  ],
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    if (!args[0]) return message.reply('provide a song')

    if (args.join(' ').includes('soundcloud')) bot.songQuery(bot, message, args, 'song:soundcloud')
    else if (args.join(' ').includes('spotify') || args.join(' ').includes('apple')) bot.songQuery(bot, message, args, 'song:raw')
    else bot.songQuery(bot, message, args, 'song:youtube')
  }
}