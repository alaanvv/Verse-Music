module.exports = {
  name: 'restart',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    player.seek(0)
    
    message.channel.send('Restarted')
  }
}