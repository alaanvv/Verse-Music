module.exports = bot => {
  bot.on('ready', async bot => {
    const guilds = await bot.guilds.fetch()
    for (guild of guilds) bot.chat.updateBotChat(guild[1].id)
  })

  const update = async player => bot.chat.updateBotChat(player.guild)
  bot.manager
    .on('playerDestroy', update)
    .on('trackStart', update)
    .on('trackEnd', update)
    .on('trackStuck', update)
    .on('trackError', update)
    .on('queueEnd', update)
}