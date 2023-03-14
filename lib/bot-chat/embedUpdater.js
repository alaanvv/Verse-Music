module.exports = bot => {
  bot.on('ready', async bot => {
    const guilds = await bot.guilds.fetch()
    for (guild of guilds) bot.chat.updateBotChat(guild[1].id)
  })

  const update = async player => await bot.chat.updateBotChat(player.guild)
  bot.manager
    .on('playerDestroy', update)
    .on('trackStart', update)
    .on('trackEnd', update)
    .on('trackStuck', update)
    .on('trackError', update)
    .on('queueEnd', update)

  process.on('SIGINT', async () => { // Clean the embeds when the bot stop running by CTRL^C
    const guilds = await bot.guilds.fetch()
    for (let guild of guilds) {
      guild = guild[1]

      const player = await bot.manager.players.get(guild.id)
      if (player) await player.destroy()

      await bot.chat.updateBotChat(guild.id)
    }

    process.exit(0)
  })
}