module.exports = {
  name: 'restart',
  description: 'Restart the currently playing song.',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    player.seek(0)
    
    message.channel.send('Restarted')
  }
}