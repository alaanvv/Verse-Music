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
    .on('trackStart', async (player, track) => {
      const guild = bot.guilds.cache.get(player.guild)
      if (!guild) return
      playerCreated.delete(player.guild)

      player.set('previoustrack', track)
      player.set('pause', false)
    })
    .on('trackEnd', async (player, track, reason) => {
      if (reason.reason === 'STOPPED' && player.queueRepeat)
        player.queue.add(track)
    })
    .on('trackStuck', async (player, track, payload) => {
      await player.stop()
    })
    .on('trackError', async (player, track, payload) => {
      await player.stop()
    })
    .on('queueEnd', async (player) => {
      player = bot.manager.players.get(player.guild)
      if (player.queue && player.queue.current) return
      await player.destroy()
    })
}