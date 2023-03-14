module.exports = bot => {
  bot.on('messageCreate', async message => {
    const botChannelID = bot.chat.getChannel(message.guild.id)
    if (botChannelID !== message.channel.id || message.author.bot && message.embeds.length) return
    
    // Delete user message in 0 ms, bot messages 1000 for small messages, and 10000 for big ones
    ms = message.author.bot ? message.content.length > 100 ? 10000 : 1000 : 0

    await bot.utils.delay(ms)
    try { await message.delete() }
    catch (err) {} // Message was already deleted
  })

  bot.on('messageReactionAdd', async (reaction, user) => {
    const botEmbedID = bot.chat.getEmbed(reaction.message.guildId)

    const messageID = reaction.message.id

    if (botEmbedID !== messageID || user.id === bot.user.id) return

    await reaction.users.remove(user.id)
  })
}