module.exports = {
  name: 'autoplay',
  description: 'Toggle autoplay on/off.',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    player.set('autoplay', !player.get('autoplay'))
    message.channel.send('Autoplay ' + (player.get('autoplay') ? 'enabled' : 'disabled'))
}
}