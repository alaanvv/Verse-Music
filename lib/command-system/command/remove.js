module.exports = {
  name: 'remove',
  description: 'Remove a specific song by its position in the queue.',
  options: [
    {
      name: 'index',
      description: 'Index of song',
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

    player.queue.remove(index - 1)
    
    bot.chat.updateBotChat(message.guild.id)
    message.channel.send('Removed ' + index)
  }
}