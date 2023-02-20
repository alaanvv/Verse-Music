module.exports = {
  name: 'shuffle',
  description: 'Shuffle the queue.',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return
    
    player.queue.shuffle()
    bot.chat.updateBotChat(player.guild)
  }
}