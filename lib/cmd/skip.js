module.exports = {
  name: 'skip',
  description: 'Skip the playing song.',
  requirements: ['vc'],

  run: (bot, message) => bot.manager.players.get(message.guild.id)?.stop()
}
