module.exports = {
  name: 'remove',
  description: 'Remove a song by it\'s position',
  options: [{
    name: 'index',
    description: 'Index of the song',
    type: 3,
    required: true
  }],
  requirements: ['vc'],

  run: (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    const index = Number(args[0]) - 1
    if (!player || !index) return
    if (index > player.queue.size) return message.channel.send('Invalid index')

    const title = player.queue[index].title
    player.queue.remove(index)

    bot.update_chat(message.guild, 0xF0)
    message.channel.send(`Removed **${title}**`)
  }
}
