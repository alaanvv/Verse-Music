module.exports = {
  name: 'queue',
  aliases: ['q'],
  description: 'Display the queue',
  options: [{
    name: 'page',
    description: 'Page index',
    type: 3,
    required: false
  }],
  requirements: ['vc'],

  run: (bot, message, args) => {
    const queue = bot.manager.players.get(message.guild.id).queue
    if (!queue.length) return

    const gen_embed = data => ({
      title: 'Queue',
      description: data.map(s => `**${++s.i}\\. ${s.title} ${s.duration ? `__${bot.u.format_time(s.duration)}__` : ''}**`).join('\n')
    })

    bot.u.page(bot, message, queue, gen_embed, 20, Number(args[0]))
  }
}
