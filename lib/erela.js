const Spotify = require('erela.js-spotify')
const { Manager } = require('erela.js')

module.exports = bot => {
  bot.manager = new Manager({
    nodes: [{ host: bot.lavalink_host, port: bot.lavalink_port, password: bot.lavalink_password, secure: !!bot.lavalink_secure, retryAmount: Infinity, retryDelay: 10e3 }],
    plugins: [new Spotify({ clientID: bot.spotify_id, clientSecret: bot.spotify_secret })],
    send: (id, payload) => bot.guilds.cache.get(id).shard.send(payload),
    trackPartial: ['title', 'identifier', 'author', 'duration', 'requester']
  })

  bot.on('ready', _ => bot.manager.init(bot.user.id))
  bot.on('raw', d => bot.manager.updateVoiceState(d))

  bot.manager.on('nodeConnect', _ => console.info('Node connected'))
  bot.manager.on('nodeError', n => setTimeout(n.connect, 10e3))
  bot.manager.on('nodeDisconnect', n => n.connect())
  bot.manager.on('playerDestroy', p => bot.update_chat(bot.guilds.cache.get(p.guild), 0xFF))
  bot.manager.on('trackStart',    p => bot.update_chat(bot.guilds.cache.get(p.guild), 0xFF))
  bot.manager.on('trackStuck', p => p.stop())
  bot.manager.on('trackError', p => p.stop())
  bot.manager.on('trackEnd', (p, t, r) => r.reason == 'STOPPED' && p.queueRepeat && p.queue.add(t))
  bot.manager.on('queueEnd', async p => {
    if (!p.get('autoplay')) return await p.destroy()
    p.queue.add((await bot.u.autoplay(bot, p))[1 + ~~(Math.random() * bot.autoplay_randomness)])
    p.play()
  })

  bot.get_or_create_player = async (guild, textChannel, voiceChannel) => {
    let player = bot.manager.players.get(guild) || await bot.manager.create({ guild, textChannel, voiceChannel })
    if (!player.playing && !player.paused) await player.connect()
    return player
  }

  bot.start_or_keep_playing = player => {
    if (player.playing && !player.paused) return
    player.pause(false)
    player.play()
  }

  bot.request_song = async (bot, message, query, update = 1) => {
    const player = bot.manager.players.get(message.guild.id) || await bot.manager.create({ guild: message.channel.guildId, textChannel: message.channelId, voiceChannel: message.member.voice.channelId })
    if (player && player.node && !player.node.connected) await player.node.connect()
    const res = await bot.manager.search(query, message.author)

    const track = res?.loadType == 'PLAYLIST_LOADED' ? res?.tracks : res?.tracks[0]
    if (!track || res.loadType == 'LOAD_FAILED') return message.channel.send('Couldn\'t not find')

    let was_playing = player.state == 'CONNECTED'
    if (!was_playing) {
      player.connect()
      player.queue.add(track)
      player.play()
    } else player.queue.add(track)

    update && bot.update_chat(bot.guilds.cache.get(player.guild), 0xF0)
    message.channel.send(`**${res.loadType == 'PLAYLIST_LOADED' ? 'Playlist' : track.title}** added to queue`)
  }

  bot.request_search = async (bot, message, args) => {
    message.channel.sendTyping()
    const query = args.join(' ')

    let player = bot.manager.players.get(message.guild.id) || await bot.manager.create({ guild: message.channel.guildId, textChannel: message.channelId, voiceChannel: message.member.voice.channelId })
    if (player && player.node && !player.node.connected) await player.node.connect()

    let res = await bot.manager.search({ query, source: 'youtube'}, message.author)

    if (/LOAD_FAILED|PLAYLIST_LOADED/.test(res.loadType)) return message.channel.send(`Found nothing for ${query}`)

    const embeds = [{
      title: 'Search results',
      description: res.tracks.slice(0, 10).map((s, i) => `**${i + 1}\\. ${s.title} ${s.duration ? `__${bot.u.format_time(s.duration)}__` : ''}**`).join('\n'),
      color: 0xFFFFFF
    }]

    const bot_message = await message.channel.send({ embeds })

    bot.waiting_answer.push(message.author.id)
    const collector = message.channel.createMessageCollector({ filter: m => message.author.id == m.author.id, time: 15e3 })

    collector.on('collect', m => {
      const track = res.tracks[Number(m.content) - 1]
      if (!track) return message.channel.send('Invalid choice')

      if (player.state != 'CONNECTED' || !player.queue?.current)
        player.connect()
      player.queue.add(track)
      player.play()

      bot.update_chat(message.channel.guild, 0xF0)
      message.channel.send(`Added **${track.title}** to queue`)
      collector.stop()
    })

    collector.on('end', (_, r) => {
      bot_message.delete()
      bot.waiting_answer = bot.waiting_answer.filter(id => id != message.author.id)
    })
  }
}
