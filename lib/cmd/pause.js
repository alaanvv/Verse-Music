module.exports = {
  name: 'pause',
  description: 'Pause/unpause',
  aliases: ['unpause'],
  requirements: ['vc'],

  run: (bot, message) => {
    const player = bot.manager.players.get(message.guild.id)
    player && player.pause(!player.paused)
    bot.update_chat(message.guild, 0x0F)
  }
}
