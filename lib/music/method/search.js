module.exports = async (bot, message, args, type) => {
  const query = args.join(' ')

  await message.channel.sendTyping()

  let player = bot.manager.players.get(message.guild.id) || await bot.manager.createPlayer(message.channel.guildId, message.channelId, message.member.voice.channelId)
  if (player && player.node && !player.node.connected) await player.node.connect()

  let res = await bot.manager.search({
    query: query,
    source: type.split(':')[1]
  }, message.author)

  if (res.loadType === 'LOAD_FAILED') return message.channel.send(`Found nothing for ${query}`)
  else if (res.loadType === 'PLAYLIST_LOADED') return message.channel.send('Cant search playlists')

  const max = 10
  let results = res.tracks.slice(0, max)
  results = results.map((track, index) => `${++index} - ${track.title} ${bot.utils.formatTime(track.duration)}`).join('\n')

  const embed = {
    title: '**Search results**',
    description: results,
    color: 0xB256DC,
  }

  const botMsg = await message.channel.send({ embeds: [embed] })

  const filter = m => message.author.id === m.author.id
  bot.waitingAnswer.push(message.author.id)
  const collector = message.channel.createMessageCollector({ filter, time: 10000 })

  collector.on('collect', async m => {
    const index = parseInt(m.content) - 1
    if (!res.tracks[index]) {
      message.channel.send('Invalid index')
      return collector.stop()
    }

    const track = res.tracks[index]

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

    bot.chat.updateBotChat(message.channel.guildId)
    message.channel.send(`Added **${track.title}** to queue`)
    collector.stop()
  })
  collector.on('end', async (_, reason) => {
    botMsg.delete()
    for (let i = 0; i < bot.waitingAnswer; i++)
      if (bot.waitingAnswer[i] === message.author.id) bot.waitingAnswer.splice(i, 1)

    if (reason === 'time') message.channel.send('Search timed out')
  })
}