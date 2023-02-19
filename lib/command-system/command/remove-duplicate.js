module.exports = {
  name: 'remove-duplicate',
  aliases: ['remove-dup'],
  description: 'Remove duplicated songs from queue',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    const tracks = player.queue

    const newtracks = []
    for (let i = 0; i < tracks.length; i++) {
      let exists = false
      for (j = 0; j < newtracks.length; j++)
        if (tracks[i].uri === newtracks[j].uri) exists = true

      if (!exists) newtracks.push(tracks[i])
    }
    player.queue.clear()

    for (const track of newtracks)
      player.queue.add(track)

    bot.chat.updateBotChat(message.guild.id)
    message.channel.send('Duplicates removed')
  }
}