module.exports = {
  name: 'play-multiple',
  aliases: ['pm'],
  description: 'Add multiple songs to queue',
  options: [{
    name: 'songs',
    description: 'Songs separed with a comma',
    type: 3,
    required: true
  }],
  requirements: ['vc'],

  run: async (bot, message, args) => {
    const queries = args.join(' ').split(',')
    if (!queries) return

    for (query of queries) await bot.request_song(bot, message, query, 0)
    bot.update_chat(message.guild, 0xF0)
  }
}
