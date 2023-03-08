const { TrackUtils } = require('erela.js')

module.exports = {
  name: 'add-saved',
  description: 'Add the saved song list to the queue.',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    let player = bot.manager.players.get(message.channel.guildId)

    let pl = bot.playlistDB.get(message.author.id)
    pl = pl?.favorites
    if (!pl || pl?.length < 1) return message.channel.send('You dont have songs favorited')

    if (!player) player = await bot.manager.createPlayer(message.channel.guildId, message.channelId, message.member.voice.channelId)

    for (const track of pl) {
      const unresolvedTrack = TrackUtils.buildUnresolved({
        title: track.title,
        url: track.url
      }, message.author)
      player.queue.add(unresolvedTrack)
    }

    if (player.state !== 'CONNECTED') {
      player.connect()
      player.play()
      player.pause(false)
    }

    message.channel.send('**Favorite** playlist added to queue')

  }
}