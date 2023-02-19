module.exports = {
  name: 'save-queue',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.channel.guildId)

    if (!player || !player.queue) return message.channel.send('There is no queue')

    let pl = bot.playlistDB.get(message.author.id)
    if (!pl) pl = []
    else pl = pl.favorites

    for (song of player.queue)
      pl.push({ title: song.title, url: song.uri })
    pl.push({ title: player.queue.current.title, url: player.queue.current.uri })

    bot.playlistDB.set(message.author.id, pl, 'favorites')

    message.channel.send('Queue added to **Favorites**')
  }
}