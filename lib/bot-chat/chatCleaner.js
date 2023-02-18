module.exports = bot => {
  bot.on('messageCreate', async message => {
    const botChannelID = bot.chat.getChannel(message.guild.id)
    if (botChannelID !== message.channel.id || message.author.bot && message.embeds.length > 0 || bot.searchEmbed.includes(message.id)) return
    
    let ms
    if (message.author.bot) {
      if (message.content.length > 100) ms = 10000
      else ms = 1000
    } else ms = 0

    await bot.utils.delay(ms)
    if (!message.deleted) await message.delete()
  })

  bot.on('messageReactionAdd', async (reaction, user) => {
    const botEmbedID = bot.settingsDB.get(reaction.message.guild.id, 'botEmbed')
    const messageID = reaction.message.id

    if (botEmbedID !== messageID || user.id === bot.user.id) return

    await reaction.users.remove(user.id)
  })
}