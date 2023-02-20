module.exports = {
  name: 'clear-save',
  description: 'Save the current queue as a playlist.',
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    bot.playlistDB.set(message.author.id, [], 'favorites')
    message.channel.send('Cleared **Favorites**')
  }
}