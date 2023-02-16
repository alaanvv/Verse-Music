module.exports = async (bot, message) => {
  console.log(message.author.username + ': ' + message.content)
  const { guild, author, member, channel, content } = message

  const botChannelID = bot.settingsDB.get(guild.id)
  const prefix = bot.prefix

  if (!guild || author.bot || botChannelID && !botChannelID === channel.id || !content.startsWith(prefix)) 
    return

  const args = content.slice(prefix.length).trim().split(' ')
  const commandQuery = args.shift()?.toLowerCase()

  const command = bot.commands.get(commandQuery) || bot.commands.get(bot.aliases.get(commandQuery))
  if (!command) return message.reply('unknown command')

  if (command.memberpermissions && !member.permissions.has(command.permissions))
    return message.reply('you dont have permissions')

  command.run(bot, message, args)
}