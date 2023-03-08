module.exports = async (bot) => {
  bot.on('messageCreate', (message) => {
    const { guild, author, member, channel, content } = message
  
    const botChannelID = bot.chat.getChannel(guild.id)
    const prefix = bot.prefix
  
    if (!guild || author.bot || botChannelID && botChannelID !== channel.id || !content.startsWith(prefix) || bot.waitingAnswer.includes(message.author.id))  return
  
    const args = content.slice(prefix.length).trim().split(' ')
    const commandQuery = args.shift()?.toLowerCase()
  
    const command = bot.commands.get(commandQuery) || bot.commands.get(bot.aliases.get(commandQuery))
    const commandStatus = bot.validateCommand(command, message)
    if (!commandStatus.status) return message.reply(commandStatus.message)
  
    command.run(bot, message, args)
  })
}