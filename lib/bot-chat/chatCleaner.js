module.exports = bot => {
  bot.on('messageCreate', async message => {
    const botChannelID = bot.chat.getChannel(message.guild.id)
    if (botChannelID !== message.channel.id) return
    
    const ms = message.author.bot ? 5000 : 0

    await bot.utils.delay(ms)
    if (!message.deleted) message.delete()
  })

  bot.on('messageReactionAdd', async (reaction, user) => {
    const botEmbedID = bot.settingsDB.get(reaction.message.guild.id, 'botEmbed')
    const messageID = reaction.message.id

    if (botEmbedID !== messageID || user.id === bot.user.id) return

    await reaction.users.remove(user.id)
  })
}