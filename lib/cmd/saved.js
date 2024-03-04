module.exports = {
  name: 'saved',
  description: 'Display your favorites',
  options: [{
    name: 'page',
    description: 'Page index',
    type: 3,
    required: false
  }],

  run: (bot, message, args) => {
    const member  = (args.reaction ? args : message).member

    const pl = bot.db.fav.get(member.id)?.favorites
    if (!pl) return message.channel.send('You don\'t have favorited songs')

    const gen_embed = data => ({
      title: 'Saved',
      description: data.map(s => `**${++s.i}\\. ${s.title}**`).join('\n')
    })

    bot.u.page(bot, message, pl, gen_embed, 20, Number(args[0]))
  }
}
