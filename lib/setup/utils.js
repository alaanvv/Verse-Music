module.exports = bot => {
  bot.utils = {}

  bot.utils.formatTime = ms => {
    let m = Math.floor(ms / 60000)
    ms = ms % 60000
    let s = Math.floor(ms / 1000)

    m = m < 10 ? '0' + String(m) : String(m)
    s = s < 10 ? '0' + String(s) : String(s)

    const time = `[${m}:${s}]`
    return time
  }
  bot.utils.delay = ms => {
    return new Promise((resolve) => { setTimeout(resolve.bind(2), ms) })
  }
  bot.utils.checkURL = string => {
    const args = string.split(' ')
    let url
    for (const arg of args) {
      try {
        url = new URL(arg)
        url = url.protocol === 'http:' || url.protocol === 'https:'
        return true
      } catch (_) { return false }
    }
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
      description: '[Github](https://github.com/alaanvv) | [Youtube](https://www.youtube.com/channel/UCowmXUPOZgV7LtgReWHQmBg) | [Source Code](https://github.com/alaanvv/Music-Bot-Like-Hydra)',
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
  bot.utils.updateBotChat = async player => {
    if (bot.settingsDB.get(player.guild, 'botChannel')) {
      const botQueueMessageID = bot.settingsDB.get(player.guild, 'botQueueMessage')
      const botEmbedID = bot.settingsDB.get(player.guild, 'botEmbed')

      const guild = bot.guilds.cache.get(player.guild)
      const channel = guild.channels.cache.get(bot.settingsDB.get(player.guild, 'botChannel'))

      const botQueueMessage = await channel.messages.fetch(botQueueMessageID)
      const botEmbed = await channel.messages.fetch(botEmbedID)

      var queueMessage = bot.utils.generateQueueMessage(player.guild.id)
      var embeds = bot.utils.generateEmbed(player.guild.id)

      botQueueMessage.edit(queueMessage)
      botEmbed.edit({embeds})
    }
  }
}