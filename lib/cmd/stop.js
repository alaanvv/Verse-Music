module.exports = {
  name: 'stop',
  description: 'Stop playing and clear queue',
  requirements: ['vc'],

  run: (bot, message) => bot.manager.players.get(message.guild.id)?.destroy()
}
