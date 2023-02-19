const { TrackUtils } = require('erela.js')

module.exports = bot => {
  bot.on('messageReactionAdd', async (reaction, user) => {
    const botEmbedID = bot.settingsDB.get(reaction.message.guild.id, 'botEmbed')
    const messageID = reaction.message.id

    if (botEmbedID !== messageID || user.id === bot.user.id) return

    switch (bot.reactions[reaction.emoji]) {
      case 'pause':
        bot.commands.get('pause').run(bot, reaction.message, '')
        break
      case 'stop':
        bot.commands.get('stop').run(bot, reaction.message, '')
        break
      case 'skip':
        bot.commands.get('skip').run(bot, reaction.message, '')
        break
      case 'loop':
        bot.commands.get('loop').run(bot, reaction.message, '')
        break
      case 'shuffle':
        bot.commands.get('shuffle').run(bot, reaction.message, '')
        break
      case 'save':
        const player = bot.manager.players.get(reaction.message.guildId)

        const members = await reaction.message.channel.guild.members.fetch()
        const member = members.find(m => m.id == user.id)

        if (!player && member.voice.channel || 
          player && !player.queue.current && member.voice.channelId === player?.voiceChannel) { // ADD TO QUEUE
            let pl = bot.playlistDB.get(user.id)
            pl = pl?.favorites
            if (!pl || pl?.length < 1) return reaction.message.channel.send('You dont have songs favorited')

          const player = await bot.manager.createPlayer(reaction.message.guildId, reaction.message.channelId, member.voice.channelId)

          for (const track of pl) {
            const unresolvedTrack = TrackUtils.buildUnresolved({
              title: track.title,
              url: track.url
            }, member)
            player.queue.add(unresolvedTrack)
          }

          if (player.state !== 'CONNECTED') {
            player.connect()
            player.play()
          }

          reaction.message.channel.send('**Favorite** playlist added to queue')
        }

        else if (player) { // FAVORITE
          let pl = bot.playlistDB.get(member.id)
          if (!pl) pl = []
          else pl = pl.favorites

          pl.push({ title: player.queue.current.title, url: player.queue.current.uri })
          bot.playlistDB.set(member.id, pl, 'favorites')

          reaction.message.channel.send(player.queue.current.title + ' added to **Favorites**')
        }
        break
    }
  })
}