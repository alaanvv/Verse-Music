module.exports = {
  name: 'stop',
  description: 'Destroy the player and clear the queue',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    player.destroy()
  }
}