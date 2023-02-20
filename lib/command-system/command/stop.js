module.exports = {
  name: 'stop',
  description: 'Stop playing music and clears the queue.',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    player.destroy()
  }
}