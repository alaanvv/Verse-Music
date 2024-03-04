module.exports = {
  name: 'move',
  description: 'Move a song to a specific position',
  options: [{
    name: 'positions',
    description: '<FROM> <TO>',
    type: 3,
    required: true
  }],
  requirements: ['vc'],

  run: (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    const from = Number(args[0])
    const to = Number(args[1])
    if (!from || !to || from > player.queue.size || to > player.queue.size || from == to)
      return message.channel.send('Invalid index')

    queue = player.queue
    const [from_song] = queue.splice(from - 1, 1)
    const before = queue.splice(0, to - 1)

    player.queue.clear()
    for (const t of [...before, from_song, ...queue]) player.queue.add(t)

    bot.update_chat(message.guild, 0xF0)
    message.channel.send(`Moved "**${from_song.title}**" to **${to}**`)
  }
}
