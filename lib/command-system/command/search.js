module.exports = {
  name: 'search',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    if (!args) return message.channel.send('Specify a term')

    bot.songQuery(bot, message, args, 'search:youtube')
  }
}