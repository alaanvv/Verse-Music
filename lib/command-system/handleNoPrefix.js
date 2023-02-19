module.exports = bot => {
  bot.on('messageCreate', async message => {
    if (!bot.settingsDB.get(message.guild.id)) return 
    const botChannelID = bot.settingsDB.get(message.guild.id, 'botChannel')
    
    if (!message.guild || message.author.bot || botChannelID != message.channel.id || message.content.startsWith(bot.prefix) || bot.waitingAnswer.includes(message.author.id)) return

    const command = bot.commands.get('play')
    const commandStatus = bot.validateCommand(command, message)
    if (!commandStatus.status) return message.reply(commandStatus.message)
    
    command.run(bot, message, message.content.split(' '))
  })
}