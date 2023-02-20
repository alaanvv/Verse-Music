module.exports = bot => {
  bot.on('ready', async bot => {
    const guilds = await bot.guilds.fetch()
    for (guild of guilds) bot.chat.updateBotChat(guild[1].id)
  })

  bot.manager
    .on('playerDestroy', async (player) => bot.chat.updateBotChat(player.guild))
    .on('trackStart', async (player, track) => bot.chat.updateBotChat(player.guild))
    .on('trackEnd', async (player, track) => bot.chat.updateBotChat(player.guild))
    .on('trackStuck', async (player, track, payload) => bot.chat.updateBotChat(player.guild))
    .on('trackError', async (player, track, payload) => bot.chat.updateBotChat(player.guild))
    .on('queueEnd', async (player) => bot.chat.updateBotChat(player.guild))
}