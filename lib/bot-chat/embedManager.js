module.exports = bot => {
  if (!bot.chat) bot.chat = {}

  bot.chat.getChannel = guildID => {
    if (bot.settingsDB.get(guildID)) return bot.settingsDB.get(guildID, 'botChannel')
  }
  bot.chat.getEmbed = guildID => {
    if (bot.settingsDB.get(guildID)) return bot.settingsDB.get(guildID, 'botEmbed')
  }
  bot.chat.generateQueueMessage = guildID => {
    const guild = bot.guilds.cache.get(guildID)
    if (!guild) return

    const queueMessage = []

    const player = bot.manager.players.get(guild.id)

    const queue = player?.queue

    if (queue) {
      const tracks = player.queue
      const maxTracks = 10
      const songs = tracks.slice(0, maxTracks)
      
      songs.forEach((song, index) => queueMessage.push(`${++index}. ${song.title} ${song.duration ? bot.utils.formatTime(song.duration) : ''} ${song.requester?.username ? '| ' + song.requester.username : ''}`))
      if (queue.length > maxTracks) queueMessage.push((queue.length - maxTracks) + ' other...')
      queueMessage.reverse()
    }

    queueMessage.unshift('**__Queue list:__**')
    if (queueMessage.length === 1) queueMessage.push('Join a voice channel and queue songs by name ou url in here')

    return queueMessage.join('\n')
  }
  bot.chat.generateEmbed = async guildID => {
    const guild = bot.guilds.cache.get(guildID)
    if (!guild) return

    const embed = {
      title: '**No song playing currently**',
      description: '[Youtube](https://www.youtube.com/channel/UCowmXUPOZgV7LtgReWHQmBg) | [Github](https://github.com/alaanvv) | [Source Code](https://github.com/alaanvv/Music-Bot-Like-Hydra) | [Commands](https://github.com/alaanvv/Verse-Music/blob/main/commands.md)',
      color: Math.random() > 0.5 ? 0xffffff : 0x000,
      files: [],
      image: { url: 'https://github.com/alaanvv/Verse-Music/blob/main/img/banner.png?raw=true' },
      footer: { text: `Prefix for this server is: ${bot.prefixDB.get(guildID) || bot.prefix}` }
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
      embed.title = `${bot.utils.formatTime(player.queue.current.duration)} - ${player.queue.current.title}${(player.queue.current.requester?.username ? ' | ' + player.queue.current.requester.username : '')}`
      embed.footer = { text: `Queue length: ${player.queue.length} songs` }
    }

    return embed
  }
  bot.chat.updateBotChat = async (guildID) => {
    const botEmbedID = bot.chat.getEmbed(guildID)
    if (!botEmbedID) return
    
    const guild = bot.guilds.cache.get(guildID)
    const channel = guild.channels.cache.get(bot.chat.getChannel(guildID))
    if (!channel) return
    const botEmbed = await bot.utils.search(channel.messages, msg => msg.id === botEmbedID)
    if (!botEmbed) return
    
    const queueMessage = bot.chat.generateQueueMessage(guildID)
    const embed = await bot.chat.generateEmbed(guildID)

    await botEmbed.edit({ content: queueMessage, embeds: [embed], files: embed.files })
  }
}