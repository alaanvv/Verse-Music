module.exports = {
  name: 'remove-duplicates',
  description: 'Remove all duplicated songs',
  requirements: ['vc'],

  run: (bot, message) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    let count = 0
    const unique_tracks = []
    player.queue.forEach((t, i) => { 
      if (unique_tracks.includes(`${t.title}${t.author}${t.duration}`)) { player.queue.remove(i); count++ }
      else unique_tracks.push(`${t.title}${t.author}${t.duration}`)
    })

    bot.update_chat(message.guild, 0xF0)
    message.channel.send(`Removed **${count}** duplicates`)
  }
}
