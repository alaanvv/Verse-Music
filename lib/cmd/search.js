module.exports = {
  name: 'search',
  description: 'Search a song on YouTube',
  options: [{
    name: 'query',
    description: 'Query to search',
    type: 3,
    required: true
  }],
  requirements: ['vc'],

  run: (bot, message, args) => {
    if (!args) return
    bot.request_search(bot, message, args)
  }
}
