module.exports = {
  name: 'unsave',
  
  description: 'Unsave the current song from your favorites',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.channel.guildId)

    if (!player || !player.queue.current) return message.channel.send('Nothing playing')
    else if (player) {
      let pl = bot.playlistDB.get(message.author.id)
      if (!pl) pl = []
      else pl = pl.favorites

      const trackInPl = !pl.find(track => track.url === player.queue.current.url)
      if (!trackInPl) return message.channel.send('This music isnt saved')

      for (let i = 0; i < pl.length; i++)
        if (pl[i].url === player.queue.current.uri) pl.splice(i, 1)
      bot.playlistDB.set(message.author.id, pl, 'favorites')

      message.channel.send(player.queue.current.title + ' removed from **Favorites**')
    }
  }
}