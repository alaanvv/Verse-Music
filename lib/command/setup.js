module.exports = {
  name: 'setup',
  permissions: ['ADMINISTRATOR'],

  run: async (bot, message) => {
    await message.channel.bulkDelete(100, true)
    const channel = message.channel
    const guildID = message.guild.id

    const embeds = [bot.utils.generateEmbed(guildID)]
    const queueMessage = bot.utils.generateQueueMessage(guildID)

    await channel.send({ files: [process.cwd() + '/img/hydra.png'] })
    await channel.send(queueMessage)
    await channel.send({embeds})
      .then(msg => {
        bot.settingsDB.set(guildID, channel.id, 'channel')
        bot.settingsDB.set(guildID, msg.id, 'message')

        Object.keys(bot.reactions).forEach(emoji => msg.react(emoji))
      })
  }
}