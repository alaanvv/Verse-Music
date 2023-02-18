module.exports = {
  name: 'clear-save',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    bot.playlistDB.set(message.author.id, [], 'favorites')
    message.channel.send('Cleared **Favorites**')
  }
}