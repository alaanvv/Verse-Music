module.exports = {
  name: 'shuffle',
  description: 'Shuffle the queue',
  requirements: ['vc'],

  run: (bot, message) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player?.queue.length) return
    
    player.queue.shuffle()
    bot.update_chat(player.guild, 0xF0)
  }
}
