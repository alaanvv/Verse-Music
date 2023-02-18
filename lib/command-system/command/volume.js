module.exports = {
  name: 'volume',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    if (!args[0]) return message.channel.send('Specify a volume')

    const volume = Number(args[0])
    if (isNaN(volume) || volume < 0) return message.channel.send('Invalid number')

    player.setVolume(volume)
    
    message.channel.send('Volume set to ' + volume)
  }
}