module.exports = {
  name: 'now-playing',
  aliases: ['np'],
  description: 'Show information about current song',

  run: async (bot, message) => {
    const player = bot.manager.players.get(message.guild.id)
    const song = player?.queue.current
    if (!song) return

    const embed = await message.channel.send({embeds: [{
      title: `**${song.title}**`,
      description: `**By:** ${song.author} \n**__${bot.u.format_time(player.position)}__ - __${bot.u.format_time(song.duration)}__**\n`,
      footer: song.requester.username ? { text: `Requested by: ${song.requester?.username}` } : undefined,
      color: 0xFFFFFF
    }]})

    setTimeout(async _ => (await message.channel.messages.fetch(embed.id))?.delete(), 3e3)
  }
}
