module.exports = {
  name: 'restart',
  description: 'Restart the song',
  requirements: ['vc'],

  run: (bot, message) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    player.seek(0)
    
    message.channel.send('Restarting...')
  }
}
