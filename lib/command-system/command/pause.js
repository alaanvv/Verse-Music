module.exports = {
  name: 'pause',
  description: 'Pause/unpause the player',
  aliases: ['unpause'],
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    player.pause(!player.paused)
  }
}