module.exports = {
  name: 'pause',
  description: 'Pause/unpause the currently playing song.',
  aliases: ['unpause'],
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    player.pause(!player.paused)
  }
}