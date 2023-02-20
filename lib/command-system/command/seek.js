module.exports = {
  name: 'seek',
  description: 'Seek to a specific time in the currently playing song.',
  options: [
    {
      name: 'position',
      description: 'Position in seconds',
      type: 3,
      required: true
    }
  ],
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    if (!args[0]) return message.channel.send('Specify the seconds')

    const time = Number(args[0])
    if (isNaN(time) || time < 0) return message.channel.send('Invalid number')

    player.seek(time * 1000)
    
    message.channel.send('Seeked to ' + time + 's')
  }
}