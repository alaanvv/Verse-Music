module.exports = {
  name: 'skip-to',
  aliases: ['s-to'],
  description: 'Skip to a specific song',
  options: [
    {
      name: 'index',
      description: 'Index to skip to',
      type: 3,
      required: true
    }
  ],
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    if (!args[0]) return message.channel.send('Specify a index')

    const index = Number(args[0])
    if (isNaN(index) || index < 1 || index > player.queue.size) return message.channel.send('Invalid index')

    player.queue.remove(0, Number(args[0]) - 1)
    player.stop()

    bot.chat.updateBotChat(message.guild.id)
    message.channel.send('Skipped to ' + index)
  }
}