module.exports = {
  name: 'volume',
  aliases: ['v'],
  description: 'Set the volume',
  options: [{
    name: 'value',
    description: 'Value for set volume',
    type: 3,
    required: true
  }],
  requirements: ['vc'],

  run: (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    const volume = Math.abs(args[0])
    if (!volume) return message.channel.send('Specify a volume')

    player.setVolume(volume)

    if (volume != 100) bot.update_chat(message.channel.guild, 0x0F)
  }
}
