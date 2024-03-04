module.exports = bot => {
  bot.gen_queue_message = guild => {
    const queue = bot.manager.players.get(guild)?.queue

    return queue?.size ? [
      `**__Queue list:__** ${queue.length > bot.queue_rows ? `\n${queue.length - bot.queue_rows} other...` : ''}`,
      ...queue.slice(0, bot.queue_rows).reverse().map((s, i) => `${Math.min(10, queue.length) - i}\\. ${s.title} ${s.duration ? bot.u.format_time(s.duration) : ''}`)
    ].join('\n') : ''
  }

  bot.gen_embed = guild => {
    const player = bot.manager.players.get(guild)
    const song = player?.state == 'DISCONNECTED' ? 0 : player?.queue.current

    return {
      title: song ? `**${bot.u.format_time(song.duration)} - ${song.title}**` : '**No song playing currently**',
      description: bot.text,
      footer: { text: song ? `${player.paused ? 'Pausedㅤ|ㅤ' : player.volume != 100 ? `Volume: ${player.volume}ㅤ|ㅤ` : ''}Loop mode: ${player.trackRepeat ? 'Song' : player.queueRepeat ? 'Queue' : 'None'}ㅤ|ㅤAutoplay: ${player.get('autoplay') ? 'On' : 'Off'}` : `Prefix for this server is: ${bot.db.cfg.get(guild.id)?.prefix || bot.prefix}` },
      image: { url: song ? `https://i.ytimg.com/vi/${song.identifier}/hqdefault.jpg` : bot.background },
      color: 0
    }
  }

  bot.update_chat = async (g, mode) => {
    const cfg = bot.db.cfg.get(g.id)
    if (!cfg) return

    (await g.channels.cache.get(cfg.channel).messages.fetch()).get(cfg.embed).edit({
      content: 0xF0 & mode ? bot.gen_queue_message(g.id) : undefined,
      embeds:  0x0F & mode ? [bot.gen_embed(g.id)]       : undefined
    })
  }
}
