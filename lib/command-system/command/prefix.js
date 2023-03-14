module.exports = {
  name: 'prefix',
  description: 'Changes the bot prefix.',
  options: [
    {
      name: 'prefix',
      description: 'The prefix you want to set',
      type: 3,
      required: true
    }
  ],
  permissions: ['ADMINISTRATOR'],

  run: async (bot, message, args) => {
    const newPrefix = args[0]

    bot.prefixDB.set(message.channel.guildId, newPrefix)
    bot.chat.updateBotChat(message.channel.guildId)

    message.channel.send('Prefix now is ' + newPrefix)
  }
}