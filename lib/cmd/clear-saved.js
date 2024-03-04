module.exports = {
  name: 'clear-saved',
  description: 'Clear favorites',

  run: (bot, message) => {
    bot.db.fav.delete(message.author.id, 'favorites')
    message.channel.send('Cleared **Favorites**')
  }
}
