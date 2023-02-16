const playerCreated = new Map()

module.exports = bot => {
  bot.manager
    .on('playerCreate', async player => { playerCreated.set(player.guild, true) })
    .on('playerMove', async (player, oldChannel, newChannel) => {
      if (!newChannel) await player.destroy()
      else {
        player.set('moved', true)
        player.setVoiceChannel(newChannel)
        if (player.paused) return
        setTimeout(() => {
          player.pause(true)
          setTimeout(() => player.pause(false), bot.ws.ping * 2)
        }, bot.ws.ping * 2)
      }
    })
    .on('playerDestroy', async (player) => {
      if (player.textChannel && player.guild) bot.utils.updateBotChat(player, true)
    })
    .on('trackStart', async (player, track) => {
      const guild = bot.guilds.cache.get(player.guild)
      if (!guild) return
      playerCreated.delete(player.guild)

      bot.utils.updateBotChat(player)
      player.set('previoustrack', track)
    })
    .on('trackStuck', async (player, track, payload) => {
      await player.stop()
      if (player.textChannel) bot.utils.updateBotChat(player)
    })
    .on('trackError', async (player, track, payload) => {
      await player.stop()
      if (player.textChannel) bot.utils.updateBotChat(player)
    })
    .on('queueEnd', async (player) => {
      // player = bot.manager.players.get(player.guild)

      if (player.queue && player.queue.current) return
      bot.utils.updateBotChat(player)
      await player.destroy()
    })
}