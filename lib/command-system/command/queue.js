module.exports = {
  name: 'queue',
  aliases: ['q'],
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    
    const queue = player?.queue
    if (queue?.length < 1) return message.reply('Queue is empty')
    let queueMessage = []

    player.queue.forEach((song, index) => {
      const trackLine = `${++index}. ${song.title} ${song.duration ? bot.utils.formatTime(song.duration) : ''} ${player.queue.current.requester.username ? '| ' + player.queue.current.requester.username : ''}`
      
      if (queueMessage.join('\n').length + trackLine.length > 2000) {
        message.channel.send(queueMessage.join('\n'))
        queueMessage = []
      }
      queueMessage.push(trackLine)
    })
    message.channel.send(queueMessage.join('\n'))
  }
}