module.exports = bot => {
  if (!bot.chat) bot.chat = {}

  bot.chat.getChannel = guildID => {
    return bot.settingsDB.get(guildID, 'botChannel')
  }
  bot.chat.generateQueueMessage = guildID => {
    const guild = bot.guilds.cache.get(guildID)
    if (!guild) return

    const queueMessage = ['**__Queue list:__**', 'Join a voice channel and queue songs by name ou url in here']

    const player = bot.manager.players.get(guild.id)
    if (player?.queue > 1) {
      delete queueMessage[1]

      const tracks = player.queue
      const maxTracks = 10
      const songs = tracks.slice(0, maxTracks)

      songs.forEach(song => queueMessage.append(`${++index}. ${song.title} [${bot.utils.formatTime(song.duration)}] | requested by: ${song.requester.tag}`))
      if (player.queue.length > maxTracks)
        queueMessage.append((player.queue.length - maxTracks) + ' other...')
    }

    return queueMessage.join('\n')
  }
  bot.chat.generateEmbed = async guildID => {
    const guild = bot.guilds.cache.get(guildID)
    if (!guild) return

    const embed = {
      title: '**No song playing currently**',
      description: '[Github](https://github.com/alaanvv) | [Youtube](https://www.youtube.com/channel/UCowmXUPOZgV7LtgReWHQmBg) | [Source Code](https://github.com/alaanvv/Music-Bot-Like-Hydra)',
      color: 0xB256DC,
      files: [],
      image: { url: 'https://i.ibb.co/Z8mcSBD/hydra-embed.png' },
      footer: { text: 'Prefix for this server is: ' + bot.prefix }
    }

    const player = bot.manager.players.get(guild.id)
    if (player?.queue?.current) {
      if (player.queue.current.identifier) {
        const imageUrl = `https://i.ytimg.com/vi/${player.queue.current.identifier}/maxresdefault.jpg`
        let color = await bot.chat.getColor(imageUrl)
        color = parseInt(('0x' + (1 << 24 | color[0] << 16 | color[1] << 8 | color[2]).toString(16).slice(1)), 16)
        embed.image.url = imageUrl
        embed.color = color
      }
      embed.title = bot.utils.formatTime(player.queue.current.duration) + ' - ' + player.queue.current.title + ' | ' + player.queue.current.requester.username
      embed.footer = { text: 'Queue length: ' + player.queue.length + ' songs' }
    }

    return embed
  }
  bot.chat.updateBotChat = async (guildID) => {
    if (!bot.settingsDB.get(guildID, 'botChannel')) return

    const botEmbedID = bot.settingsDB.get(guildID, 'botEmbed')

    const guild = bot.guilds.cache.get(guildID)
    const channel = guild.channels.cache.get(bot.settingsDB.get(guildID, 'botChannel'))
    const botEmbed = await bot.utils.search(channel.messages, msg => msg.id === botEmbedID)

    const queueMessage = bot.chat.generateQueueMessage(guildID)
    const embed = await bot.chat.generateEmbed(guildID)

    await botEmbed.edit({ content: queueMessage, embeds: [embed], files: embed.files })
  }
}