module.exports = {
  name: 'filter',
  description: 'Filter queue based on a query',
  options: [{
    name: 'query',
    description: 'Query to filter song names',
    type: 3,
    required: false
  }],

  run: (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player || !player.queue.length) return

    let queue = player.queue

    if (!args.join()) return message.channel.send('Provide a query')
    queue = bot.u.apply_query(queue, args)

    if (!queue.length) return message.channel.send('No results')

    player.queue.clear()
    queue.map(t => player.queue.add(t))

    bot.update_chat(message.guild, 0xF0)
    message.channel.send(`Queue filtered for **${args.join(' ')}**`)
  }
}
