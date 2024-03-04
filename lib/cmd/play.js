module.exports = {
  name: 'play',
  aliases: ['p'],
  description: 'Play a song or adds to queue',
  options: [{
    name: 'query',
    description: 'Query/url to search for',
    type: 3,
    required: true
  }],
  requirements: ['vc'],

  run: (bot, message, args) => args.join(' ') && bot.request_song(bot, message, args.join(' '))
}
