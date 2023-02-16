module.exports = async (bot, message, args, type) => {
  const query = args.join(' ')

  let res
  let player = bot.manager.players.get(message.guild.id)

  if (player && player.node && !player.node.connected) await player.node.connect()

  if (!player) {
    if (!message.member.voice.channel) message.reply('youre not in a vc')

    player = await bot.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true
    })
    if (player && player.node && !player.node.connected) await player.node.connect()
  }

  const state = player.state
  if (state !== 'CONNECTED') {
    player.connect()
    player.stop()
  }

  if (type.split(':')[1] === 'youtube' || type.split(':')[1] === 'soundcloud') {
    if (bot.utils.checkURL(query)) res = await bot.manager.search(query, message.author)
    else
      res = await bot.manager.search({ query: query, source: type.split(':')[1] }, message.author)
  } 
  else res = await bot.manager.search(query, message.author)
  
  if (res.loadType === 'LOAD_FAILED') throw res.exception
  else if (res.loadType === 'PLAYLIST_LOADED') loadTracks(true)
  else loadTracks(false)

  async function loadTracks(playlist = false) {
    const track = playlist ? res.tracks : res.tracks[0]

    if (!track) message.reply('query not found')

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
    
    bot.utils.updateBotChat(player)
  }
}