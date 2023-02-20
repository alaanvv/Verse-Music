module.exports = bot => {
  bot.on('messageCreate', async message => {
    const botChannelID = bot.chat.getChannel(message.guild.id)
    if (botChannelID !== message.channel.id || message.author.bot && message.embeds.length > 0) return
    
    ms = 0
    if (message.author.bot) {
      if (message.content.length > 100) ms = 10000
      else ms = 1000
    }

    await bot.utils.delay(ms)
    try { await message.delete() }
    catch (err) {} // MEANS THAT MESSAGE WAS DELETED
  })

  bot.on('messageReactionAdd', async (reaction, user) => {
    const botEmbedID = bot.chat.getEmbed(reaction.message.guildId)

    const messageID = reaction.message.id

    if (botEmbedID !== messageID || user.id === bot.user.id) return

    await reaction.users.remove(user.id)
  })
}