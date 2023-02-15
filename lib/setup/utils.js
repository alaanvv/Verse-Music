module.exports = bot => {
  bot.utils = {}

  bot.utils.formatTime = ms => {
    let m = Math.floor(ms / 60000)
    ms = ms % 60000
    let s = Math.floor(ms / 1000)

    m = m < 10  ? '0' + String(m) : String(m)
    s = s < 10  ? '0' + String(s) : String(s)

    const time = `[${m}:${s}]`
    return time
  }

  bot.utils.generateQueueMessage = guildID => { 
    const guild = bot.guilds.cache.get(guildID)
    if (!guild) return

    const queueMessage = ['**__Queue list:__**', 'Join a voice channel and queue songs by name ou url in here']

    const player = bot.manager.players.get(guild.id)
    if (player?.queue) {
      const tracks = player.queue
      const maxTracks = 10

      const songs = tracks.slice(0, maxTracks)
      if (songs) delete queueMessage[1]

      songs.forEach(song => queueMessage.append(`${++index}. ${song.title} [${bot.utils.formatTime(song.duration)}] | requested by: ${song.requester.tag}`))
      if (player.queue.length > maxTracks)
        queueMessage.append(player.queue.length + ' other...')
    }

    return queueMessage.join('\n')
  }
  bot.utils.generateEmbed = guildID => {
  const guild = bot.guilds.cache.get(guildID)
  if (!guild) return

  const embed = {
    title: '**No song playing currently**',
    description: '[Github](https://github.com/alaanvv) | [Youtube](https://www.youtube.com/channel/UCowmXUPOZgV7LtgReWHQmBg) | (Source Code)[]',
    color: 0xB256DC,
    image: { url: 'https://i.ibb.co/Z8mcSBD/hydra-embed.png' },
    footer: { text: 'Prefix for this server is: ' + bot.prefix }
  }
  
  const player = bot.manager.players.get(guild.id)
  if (player?.queue?.current) {
    embed.image.url = `https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`
    embed.title = format(player.queue.current.duration) + ' - ' + player.queue.current.title + ' - ' + player.queue.current.requester.tag
    embed.footer = 'queue length: ' + player.queue.length + ' songs', true
  }

  return embed
  }
}