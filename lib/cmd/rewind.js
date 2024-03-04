module.exports = {
  name: 'rewind',
  description: 'Go back in timeline',
  options: [{
    name: 'amount',
    description: 'Seconds to go back',
    type: 3,
    required: false
  }],
  requirements: ['vc'],

  run: (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    const time = Math.max(0, player.position - ((Math.abs(args[0]) * 1e3) || 10e3))
    player.seek(time)

    message.channel.send(`Seeking to ${bot.u.format_time(time)}`)
  }
}
