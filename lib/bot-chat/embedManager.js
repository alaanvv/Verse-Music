module.exports = bot => {
  if (!bot.chat) bot.chat = {}

  bot.chat.getChannel = guildID => {
    if (bot.settingsDB.get(guildID))
    return bot.settingsDB.get(guildID, 'botChannel')
  }
  bot.chat.generateQueueMessage = guildID => {
    const guild = bot.guilds.cache.get(guildID)
    if (!guild) return

    const queueMessage = []

    const player = bot.manager.players.get(guild.id)
    
    const queue = player?.queue
    if (queue?.length >= 1) {
      delete queueMessage[1]

      const tracks = player.queue
      const maxTracks = 10
      const songs = tracks.slice(0, maxTracks)

      songs.forEach((song, index) => queueMessage.push(`${++index}. ${song.title} ${song.duration ? bot.utils.formatTime(song.duration) : ''} ${player.queue.current.requester.username ? '| ' + player.queue.current.requester.username : ''}`))
      if (player.queue.length > maxTracks)
        queueMessage.push((player.queue.length - maxTracks) + ' other...')
      queueMessage.reverse()
    }

    queueMessage.unshift('**__Queue list:__**')
    if (!queue || queue.length < 1) queueMessage.push('Join a voice channel and queue songs by name ou url in here')
    
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
      image: { url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hdwallpapers.in%2Fdownload%2Ffog_covered_forest_hd_tumblr-1280x720.jpg&f=1&nofb=1&ipt=42823d19a4bb29d663bd62e59bee471494b76d3c0d82b37e44eb4589a10b80fc&ipo=images' },
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
      embed.title = bot.utils.formatTime(player.queue.current.duration) + ' - ' + player.queue.current.title + (player.queue.current.requester?.username ? ' | ' + player.queue.current.requester.username : '')
      embed.footer = { text: 'Queue length: ' + player.queue.length + ' songs' }
    }

    return embed
  }
  bot.chat.updateBotChat = async (guildID) => {
    if (!bot.settingsDB.get(guildID)) return

    const botEmbedID = bot.settingsDB.get(guildID, 'botEmbed')

    const guild = bot.guilds.cache.get(guildID)
    const channel = guild.channels.cache.get(bot.settingsDB.get(guildID, 'botChannel'))
    const botEmbed = await bot.utils.search(channel.messages, msg => msg.id === botEmbedID)

    const queueMessage = bot.chat.generateQueueMessage(guildID)
    const embed = await bot.chat.generateEmbed(guildID)

    await botEmbed.edit({ content: queueMessage, embeds: [embed], files: embed.files })
  }
}
