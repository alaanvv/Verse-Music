const { AttachmentBuilder } = require('discord.js')
const { getColor } = require('../img-color/getImageColor')

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
  bot.utils.downloadImage = async url => {
    const fs = require('fs')
    const https = require('https')
    const sharp = require('sharp')

    const path_ = process.cwd() + '/img/song_.png'
    const path = process.cwd() + '/img/song.png'
    await https.get(url, async res => { res.pipe(fs.createWriteStream(path_)) })

    await bot.utils.delay(5000)
    await sharp(path_).resize(640, 360).toFile(path)

    fs.unlink(path_, err => { if (err) console.log(err) })
}

bot.utils.generateQueueMessage = guildID => {
  const guild = bot.guilds.cache.get(guildID)
  if (!guild) return

  const queueMessage = ['**__Queue list:__**', 'Join a voice channel and queue songs by name ou url in here']

  const player = bot.manager.players.get(guild.id)
  if (player?.queue) {
    const tracks = player.queue
    if (tracks > 1) delete queueMessage[1]
    const maxTracks = 10

    const songs = tracks.slice(0, maxTracks)

    songs.forEach(song => queueMessage.append(`${++index}. ${song.title} [${bot.utils.formatTime(song.duration)}] | requested by: ${song.requester.tag}`))
    if (player.queue.length > maxTracks)
      queueMessage.append(player.queue.length + ' other...')
  }

  return queueMessage.join('\n')
}
bot.utils.generateEmbed = async guildID => {
  const guild = bot.guilds.cache.get(guildID)
  if (!guild) return

  const embed = {
    title: '**No song playing currently**',
    description: '[Github](https://github.com/alaanvv) | [Youtube](https://www.youtube.com/channel/UCowmXUPOZgV7LtgReWHQmBg) | [Source Code](https://github.com/alaanvv/Music-Bot-Like-Hydra)',
    color: 0xB256DC,
    files: [],
    image: { url: 'https://i.ibb.co/Z8mcSBD/hydra-embed.png', width: 2000 },
    footer: { text: 'Prefix for this server is: ' + bot.prefix }
  }

  const player = bot.manager.players.get(guild.id)
  if (player?.queue?.current) {
    const imageUrl = `https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`
    let attachment
    await bot.utils.downloadImage(imageUrl)
      .then(() => {
        attachment = new AttachmentBuilder(process.cwd() + '/img/song.png', { name: 'song.png' })
      })

    let color = await getColor(imageUrl)
    color = parseInt(('0x' + (1 << 24 | color[0] << 16 | color[1] << 8 | color[2]).toString(16).slice(1)), 16)

    embed.files = [attachment]
    embed.image.url = 'attachment://song.png'
    embed.color = color
    embed.title = bot.utils.formatTime(player.queue.current.duration) + ' - ' + player.queue.current.title + ' | ' + player.queue.current.requester.username
    embed.footer = { text: ('Queue length: ' + player.queue.length + ' songs' + "\u3000".repeat(100)) }
  }

  return embed
}
bot.utils.updateBotChat = async player => {
  if (bot.settingsDB.get(player.guild, 'botChannel')) {
    const botQueueMessageID = bot.settingsDB.get(player.guild, 'botQueueMessage')
    const botEmbedID = bot.settingsDB.get(player.guild, 'botEmbed')

    const guild = bot.guilds.cache.get(player.guild)

    const channel = guild.channels.cache.get(bot.settingsDB.get(player.guild, 'botChannel'))

    const channelMessages = await channel.messages.fetch()
    const botEmbed = channelMessages.find(msg => msg.id === botEmbedID)

    var queueMessage = bot.utils.generateQueueMessage(player.guild)
    var embed = await bot.utils.generateEmbed(player.guild)

    await botEmbed.edit({ content: queueMessage, embeds: [embed], files: embed.files })
  }
}
}