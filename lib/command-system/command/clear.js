module.exports = {
  name: 'clear',
  aliases: ['clean'],
  description: 'Clear the queue.',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    player.queue.clear()
    bot.chat.updateBotChat(player.guild)
    message.channel.send('Queue cleared')
  }
}