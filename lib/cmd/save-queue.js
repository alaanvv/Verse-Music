module.exports = {
  name: 'save-queue',
  description: 'Save the whole queue to your favorites',
  requirements: ['vc'],

  run: (bot, message) => {
    const player = bot.manager.players.get(message.channel.guildId)
    if (!player?.playing && !player.paused) return

    let pl = bot.db.fav.get(message.author.id)?.favorites || []
    for (s of [...player.queue.reverse(), player.queue.current]) {
      const { track, title, author, duration, identifier } = s
      pl.push({ track, title, author, duration, identifier })
    }

    bot.db.fav.set(message.author.id, pl, 'favorites')
    message.channel.send('__Queue__ added to **Favorites**')
  }
}
