const { MessageEmbed } = require('discord.js')

const playercreated = new Map()
const collector = false

module.exports = bot => {
  let started = false
  bot.manager
    .on('nodeConnect', node => {
      if (!started) {
        started = true
        setTimeout(() => autoconnect(), 2 * bot.ws.ping)
      }
      setTimeout(() => {started = false}, 5000)
    })
    .on('playerCreate', async player => { playercreated.set(player.guild, true) })
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
      let guild = bot.guilds.cache.get(player.guild)
      if (!guild) return

      let channel = guild.channels.cache.get(player.textChannel)
      if (!channel) channel = await guild.channels.fetch(player.textChannel)

      if (playercreated.has(player.guild)) {
        player.set('eq', player.get("eq") || '💣 None')
        player.set('filter', player.get("eq") || '🧨 None')
        player.set('autoplay', player.get("autoplay") || bot.settings.get(player.guild, 'defaultap'))
        player.set('afk', false)
        if (player.get("autoresume")) {
          player.set("autoresume", false)
        } else {
          await player.setVolume(bot.settings.get(player.guild, 'defaultvolume'))
          if (bot.settings.get(player.guild, 'defaulteq')) {
            await player.setEQ(bot.eqs.music)
          }
        }


        databasing(bot, player.guild, player.get('playerauthor'))
        playercreated.delete(player.guild)
        if (!player.get("autoresume") && channel && channel.permissionsFor(guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) {
          channel.send({
            embeds: [
              new MessageEmbed().setColor(es.color)
                .setDescription('> 👍 **Joined** <#${player.voiceChannel}>\n\n> 📃 **And bound to** <#${player.textChannel}>')
                .setTimestamp()
            ]
          })
        }
      }

      bot.updateMusicSystem(player)

      if (player.textChannel && player.get('previoustrack'))
        if (!collector.ended) collector.stop()

      player.set('previoustrack', track)
    })
    .on('trackStuck', async (player, track, payload) => {
      await player.stop()
      if (player.textChannel) bot.updateMusicSystem(player)
    })
    .on('trackError', async (player, track, payload) => {
      await player.stop()
      if (player.textChannel) bot.updateMusicSystem(player)
    })
    .on('queueEnd', async (player) => {
      databasing(bot, player.guild, player.get('playerauthor'))

      if (player.get('autoplay')) return autoplay(bot, player)

      player = bot.manager.players.get(player.guild)

      if (!player.queue || !player.queue.current) {
        bot.updateMusicSystem(player, true)
        if (player.get('afk')) return
        if (player) {
          let pl = bot.manager.players.get(player.guild)
          if (!pl.queue || !pl.queue.current) return await pl.destroy()
        }
      }

    })
}