module.exports = {
  name: 'skip-to',
  aliases: ['st'],
  description: 'Skip to a specific song',
  options: [{
    name: 'index',
    description: 'Index to skip to',
    type: 3,
    required: true
  }],
  requirements: ['vc'],

  run: (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    const index = Math.min(Math.abs(args[0]), player?.queue.size)
    if (!player || !index) return

    const removed = player.queue.remove(0, index - 1)
    player.stop()
    player.queueRepeat && player.queue.push(...removed.reverse())

    bot.update_chat(message.guild, 0xF0)
  }
}
