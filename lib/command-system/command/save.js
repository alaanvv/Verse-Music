const { TrackUtils } = require('erela.js')

module.exports = {
  name: 'save',
  description: 'Save the currently playing song to the saved songs list or play your favorites.',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.channel.guildId)

    if (!player || !player.queue.current) { // ADD TO QUEUE
      let pl = bot.playlistDB.get(message.author.id)
      pl = pl?.favorites
      if (!pl || pl?.length < 1) return message.channel.send('You dont have songs favorited')

      const player = await bot.manager.createPlayer(message.channel.guildId, message.channelId, message.member.voice.channelId)

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

    else if (player) { // FAVORITE
      let pl = bot.playlistDB.get(message.author.id)
      if (!pl) pl = []
      else pl = pl.favorites

      pl.push({ title: player.queue.current.title, url: player.queue.current.uri })
      bot.playlistDB.set(message.author.id, pl, 'favorites')

      message.channel.send(player.queue.current.title + ' added to **Favorites**')
    }
  }
}