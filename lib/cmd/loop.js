module.exports = {
  name: 'loop',
  description: 'Toggle loop mode',
  requirements: ['vc'],

  run: (bot, message) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    if (!player.queueRepeat && !player.trackRepeat) {
      player.setTrackRepeat(true)
    } else if (player.trackRepeat) {
      player.setTrackRepeat(false)
      player.setQueueRepeat(true)
    } else {
      player.setTrackRepeat(false)
      player.setQueueRepeat(false)
    }

    bot.update_chat(message.channel.guild, 0x0F)
  }
}
