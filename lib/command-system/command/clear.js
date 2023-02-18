module.exports = {
  name: 'clear',
  aliases: ['clean'],
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    player.queue.clear()
    bot.chat.updateBotChat(player.guild)
    message.channel.send('Queue cleared')
  }
}