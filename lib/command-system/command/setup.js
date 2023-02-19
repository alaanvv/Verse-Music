module.exports = {
  name: 'setup',
  permissions: ['ADMINISTRATOR'],

  run: async (bot, message) => {
    await message.channel.bulkDelete(100, true)
    const channel = message.channel
    const guildID = message.guild.id

    bot.settingsDB.set(guildID, 0, 'botChannel')

    const embed = await bot.chat.generateEmbed(guildID)
    const queueMessage = bot.chat.generateQueueMessage(guildID)

    await channel.send({ files: [process.cwd() + '/img/verse-music.png'] })
    await channel.send({content: queueMessage, embeds: [embed]})
      .then(msg => {
        bot.settingsDB.set(guildID, channel.id, 'botChannel')
        bot.settingsDB.set(guildID, msg.id, 'botEmbed')

        Object.keys(bot.reactions).forEach(emoji => msg.react(emoji))
      })
  }
}