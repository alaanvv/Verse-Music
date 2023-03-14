module.exports = {
  name: 'time',
  description: 'Show current time of the song.',

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return
    
    message.channel.send(bot.utils.formatTime(player.position))
  }
}