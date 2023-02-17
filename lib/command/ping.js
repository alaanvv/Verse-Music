module.exports = {
  name: 'ping',

  run: async (bot, message) => {
    await message.reply('pong!')

    const channel = message.guild.channels.cache.get(bot.settingsDB.get(message.guildId, 'botChannel'))
    const channelMessages = await channel.messages.fetch()
    const botQueueMessage = channelMessages.find(msg => msg.id === '1075809823817478194')
    await botQueueMessage.edit('abc')
  }
}