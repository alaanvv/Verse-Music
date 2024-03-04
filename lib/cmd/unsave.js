module.exports = {
  name: 'unsave',
  description: 'Unsave the current song from your favorites',

  run: (bot, message) => {
    const player = bot.manager.players.get(message.channel.guildId)
    if (!player?.queue.current) return

    const pl = bot.db.fav.get(message.author.id)?.favorites || []
    const new_pl = pl.filter(s => s.identifier != player.queue.current.identifier)
    if (pl.length == new_pl.length) return message.channel.send('This song wasn\'t saved')

    bot.db.fav.set(message.author.id, new_pl, 'favorites')
    message.channel.send(`**${player.queue.current.title}** removed from **Favorites**`)
  }
}
