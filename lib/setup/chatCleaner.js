module.exports = bot => {
  bot.on('messageCreate', async message => {
    const botChannelID = bot.settingsDB.get(message.guild.id, 'botChannel')
    if (!botChannelID || botChannelID !== message.channel.id) return
    
    const ms = message.author.bot ? 5000 : 0

    await bot.utils.delay(ms)
    if (!message.deleted) message.delete()
  })

  bot.on('messageReactionAdd', async (reaction, user) => {
    const botEmbedID = bot.settingsDB.get(reaction.message.guild.id, 'botEmbed')
    const messageID = reaction.message.id

    if (botEmbedID !== messageID || user.id === bot.user.id) return

    await reaction.users.remove(user.id)

    const command = bot.reactions[reaction.emoji]
    if (!command) return

    console.log(command)
  })
}