module.exports = {
  name: 'autoplay',
  description: 'Toggle autoplay on/off',
  requirements: ['vc'],

  run: (bot, message) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    player.set('autoplay', !player.get('autoplay'))

    bot.update_chat(message.channel.guild, 0x0F)
  }
}
