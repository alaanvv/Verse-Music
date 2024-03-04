module.exports = {
  name: 'seek',
  description: 'Seek to a specific time',
  options: [{
    name: 'position',
    description: 'Position in seconds',
    type: 3,
    required: true
  }],
  requirements: ['vc'],

  run: (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    const time = Math.min(player.queue.current.duration, Math.abs(args[0]) * 1e3)
    if (!player || isNaN(args[0])) return
    
    player.seek(time)

    message.channel.send(`Seeking to ${bot.u.format_time(time)}`)
  }
}
