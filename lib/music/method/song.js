module.exports = async (bot, message, args, type) => {
  try {
    const query = args.join(' ')
    console.log(query)

    let res
    let player = bot.manager.players.get(message.guild.id) || await bot.manager.createPlayer(message.channel.guildId, message.channelId, message.member.voice.channelId)
    if (player && player.node && !player.node.connected) await player.node.connect()

    if (/(youtube|soundcloud):/i.test(type))
      res = await bot.manager.search((bot.utils.checkURL(query) ? query : { query: query, source: type.split(':')[1] }), message.author)
    else res = await bot.manager.search(query, message.author)

    if (res.loadType === 'LOAD_FAILED') throw res.exception
    else loadTracks(res.loadType === 'PLAYLIST_LOADED' ? true : false)

    async function loadTracks(playlist = false) {
      const track = playlist ? res.tracks : res.tracks[0]
      if (!track) message.channel.send('Query not found')

      if (player.state !== 'CONNECTED') {
        player.connect()
        player.queue.add(track)
        player.play()
        player.pause(false)
      } else if (!player.queue || !player.queue.current) {
        player.queue.add(track)
        player.play()
        player.pause(false)
      }
      else player.queue.add(track)

      bot.chat.updateBotChat(player.guild)
      message.channel.send(`**${playlist ? 'Playlist' : track.title}** added to queue`)
    }
  } catch {
    message.channel.send('There was a error searching for this')
  }
}