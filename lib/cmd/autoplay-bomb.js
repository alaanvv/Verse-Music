module.exports = {
  name: 'autoplay-bomb',
  aliases: ['ab'],
  description: 'Populate the queue with songs related to now playing song',
  options: [{
    name: 'amount',
    description: 'Amount of songs to add',
    type: 3,
    required: false
  }],
  requirements: ['vc'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player?.state == 'CONNECTED') return

    const amount = Math.max(1, Math.min(25, Math.abs(args[0]) || 25))
    player.queue.push(...(await bot.u.autoplay(bot, player)).slice(0, amount))
    bot.update_chat(message.guild, 0xF0)

    message.channel.send(`**${amount}** songs similar to this added to queue`)
  }
}
