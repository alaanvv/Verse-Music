const { TrackUtils } = require('erela.js')

module.exports = {
  name: 'save',
  description: 'Favorite the playing song or play your favorites',
  requirements: ['vc'],

  run: async (bot, message, args) => {
    const member  = (args.reaction ? args : message).member
    const player = await bot.get_or_create_player(message.channel.guild.id, message.channel.id, member.voice.channelId)

    if (!player.playing && !player.paused) {
      const pl = bot.db.fav.get(member.id)?.favorites
      if (!pl) return message.channel.send('You don\'t have favorited songs')

      pl.map(t => player.queue.add(TrackUtils.buildUnresolved(t, member)))
      bot.start_or_keep_playing(player)
    }
    else {
      const { track, title, author, duration, identifier } = player.queue.current
      bot.db.fav.set(member.id, [...(bot.db.fav.get(member.id)?.favorites || []), { track, title, author, duration, identifier }], 'favorites')
      message.channel.send(`${title} added to **Favorites**`)
    }
  }
}
