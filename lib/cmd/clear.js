module.exports = {
  name: 'clear',
  description: 'Clear the queue',
  requirements: ['vc'],

  run: (bot, message) => bot.manager.players.get(message.guild.id)?.queue.clear() && bot.update_chat(message.guild, 0xF0)
}
