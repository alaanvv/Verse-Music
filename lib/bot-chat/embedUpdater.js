module.exports = bot => {
  bot.on('ready', async bot => {
    const guilds = await bot.guilds.fetch()
    for (guild of guilds) {
      guild = guild[1]
      bot.chat.updateBotChat(guild.id)
    }
  })

  bot.manager
    .on('playerDestroy', async (player) => bot.chat.updateBotChat(player.guild))
    .on('trackStart', async (player, track) => bot.chat.updateBotChat(player.guild))
    .on('trackEnd', async (player, track) => bot.chat.updateBotChat(player.guild))
    .on('trackStuck', async (player, track, payload) => bot.chat.updateBotChat(player.guild))
    .on('trackError', async (player, track, payload) => bot.chat.updateBotChat(player.guild))
    .on('queueEnd', async (player) => bot.chat.updateBotChat(player.guild))
}