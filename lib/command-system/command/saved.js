module.exports = {
  name: 'saved',
  description: 'Display a list of saved songs.',

  run: async (bot, message, args) => {
    let pl = bot.playlistDB.get(message.author.id)
    pl = pl?.favorites
    if (!pl || pl?.length < 1) return message.channel.send('You dont have songs favorited')

    let msg = []
    pl.forEach((song, index) => {
      const trackLine = `${++index}. ${song.title}`
      if (msg.join('\n').length + trackLine.length > 1900) {
        message.channel.send(msg.join('\n'))
        msg = []
      }
      msg.push(trackLine)
    })
    message.channel.send(msg.join('\n'))
  }
}