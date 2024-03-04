module.exports = {
  member_from_user: (bot, g, u) => bot.guilds.cache.get(g.id).members.cache.get(u.id),
  format_time: ms => `[${~~(ms / 6e4)}:${`0${~~(ms % 6e4 / 1e3)}`.slice(-2)}]`,
  
  autoplay: async (bot, p) => {
    const id = (p.queue.current || p.queue.previous).identifier
    return (await bot.manager.search(`https://www.youtube.com/watch?v=${id}&list=RD${id}`)).tracks
  },

  apply_query: (queue, queries) => {
    const reducer = s => s.replaceAll(' ', '').toLowerCase()
    queries = reducer(queries.join(' ')).split('||')

    const dont_contain = queries.filter(q =>  q.startsWith('!')).map(q => q.slice(1))
    const contain      = queries.filter(q => !q.startsWith('!'))

    dont_contain.map(query => { queue = queue.filter(s => !reducer(s.title).includes(query)) })
    contain.map(query      => { queue = queue.filter(s =>  reducer(s.title).includes(query)) })

    return queue 
  },

  page: async (bot, message, data, _gen_embed, size = 5, current) => {
    if (data[0].i == undefined) data = data.map((item, i) => ({ ...item, i }))
    const total = ~~(data.length / size) + 1
    if (!current || current > total) current = 1

    const gen_embed = page => {
      const start = (page - 1) * size
      const embed = _gen_embed(data.slice(start, start + size))
      embed.footer = { text: `Page: ${current} / ${total}` }
      embed.color = 0xFFFFFF

      return embed
    }

    const embed = await message.channel.send({ embeds: [gen_embed(current)] })

    if (total == 1) {
      await new Promise(r => setTimeout(r, bot.page_delete_delay))

      embed.channel.messages.fetch(embed.id)
        .then(m => m.delete())
        .catch()
    } 
    else {
      await embed.react('⬅️')
      await embed.react('➡️')

      const collector = embed.createReactionCollector({ filter: (r, u) => ['⬅️', '➡️'].includes(r.emoji.name) && u.id == message.author.id, time: bot.page_delete_delay })

      collector.on('collect', async (r, u) => {
        await r.users.remove(u.id)

        if      (r.emoji.name == '⬅️' && current > 1)     current--
        else if (r.emoji.name == '➡️' && current < total) current++

        await embed.edit({ embeds: [gen_embed(current)] })
      })

      collector.on('end', _ => {
        embed.channel.messages.fetch(embed.id)
          .then(m => m.delete())
          .catch()
      })
    }
  }
}
