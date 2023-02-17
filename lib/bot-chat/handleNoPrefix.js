module.exports = bot => {
  bot.on('messageCreate', async message => {
    const botChannelID = bot.settingsDB.get(message.guild.id, 'botChannel')
    
    if (!message.guild || message.author.bot || botChannelID != message.channel.id || message.content.startsWith(bot.prefix)) return

    bot.commands.get('play').run(bot, message, message.content.split(' '))
  })
}