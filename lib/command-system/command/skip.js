module.exports = {
  name: 'skip',
  description: 'Skip to the next song',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return
    
    player.stop()
  }
}