module.exports = {
  name: 'search',
  description: 'Search for a query and give you options to choose',
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
    if (!args) return message.channel.send('Specify a term')

    bot.songQuery(bot, message, args, 'search:youtube')
  }
}