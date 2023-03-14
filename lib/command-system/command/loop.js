module.exports = {
  name: 'loop',
  aliases: ['l'],
  description: 'Toggle loop mode.',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    if (!player.queueRepeat && !player.trackRepeat) {
      player.setTrackRepeat(true)
      message.channel.send('Loop mode: **Song**')
    } else if (player.trackRepeat) {
      player.setTrackRepeat(false)
      player.setQueueRepeat(true)
      message.channel.send('Loop mode: **Queue**')
    } else {
      player.setTrackRepeat(false)
      player.setQueueRepeat(false)
      message.channel.send('Loop mode: **None**')
    }
    
    bot.chat.updateBotChat(message.channel.guildId)
  }
}