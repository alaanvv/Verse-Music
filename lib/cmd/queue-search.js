module.exports = {
  name: 'queue-search',
  aliases: ['qs'],
  description: 'Search around the queue',
  options: [{
    name: 'query',
    description: 'Query to search for',
    type: 3,
    required: false
  }],

  run: (bot, message, args) => {
    let queue = bot.manager.players.get(message.guild.id).queue
    if (!queue.length) return message.channel.send('No queue')
    queue = queue.map((item, i) => ({ ...item, i }))

    queue = bot.u.apply_query(queue, args)
    if (!queue.length) return message.channel.send('No results')

    const gen_embed = data => ({
      title: `Queue results for "_${args.join(', ')}_"`,
      description: data.map(s => `**${++s.i}\\. ${s.title} ${s.duration ? `__${bot.u.format_time(s.duration)}__` : ''}**`).join('\n')
    })

    bot.u.page(bot, message, queue, gen_embed, 20, 1)
  }
}
