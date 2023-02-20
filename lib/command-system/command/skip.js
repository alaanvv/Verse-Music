module.exports = {
  name: 'skip',
  description: 'Skip the currently playing song.',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return
    
    player.stop()
  }
}