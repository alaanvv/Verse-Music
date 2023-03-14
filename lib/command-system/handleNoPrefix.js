module.exports = bot => {
  bot.on('messageCreate', async message => {
    const botChannelID = bot.chat.getChannel(message.guild.id)
    const prefix = bot.prefixDB.get(message.channel.guildId) || bot.prefix
  
    if (!message.guild || message.author.bot || botChannelID != message.channel.id || message.content.startsWith(prefix) || bot.waitingAnswer.includes(message.author.id)) return

    const command = bot.commands.get('play')
    const commandStatus = bot.validateCommand(command, message)
    if (!commandStatus.status) return message.reply(commandStatus.message)
    
    command.run(bot, message, message.content.split(' '))
  })
}