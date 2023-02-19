module.exports = {
  name: 'volume',
  description: 'Change the player volume',
  options: [
    {
      name: 'value',
      description: 'Value for set volume',
      type: 3,
      required: true
    }
  ],
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