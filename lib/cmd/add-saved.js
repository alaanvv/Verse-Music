const { TrackUtils } = require('erela.js')

module.exports = {
  name: 'add-saved',
  description: 'Add saved songs to queue',
  requirements: ['vc'],

  run: async (bot, message) => {
    const player = await bot.get_or_create_player(message.channel.guild.id, message.channel.id, message.member.voice.channelId)

    const pl = bot.db.fav.get(message.member.id)?.favorites
    if (!pl) return
    pl.map(t => player.queue.add(TrackUtils.buildUnresolved(t, message.member)))

    bot.start_or_keep_playing(player)

    message.channel.send('**Favorite** playlist added to queue')
    bot.update_chat(message.guild, 0xF0)
  }
}
