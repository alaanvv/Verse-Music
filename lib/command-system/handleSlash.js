module.exports = bot => {
  bot.on('interactionCreate', async interaction => {
    const botChannelID = bot.chat.getChannel(guild.id)
    if (!interaction.isCommand() || !interaction.guild || interaction.member.bot || botChannelID && !botChannelID === interaction.channelId)  return
    
    interaction.author = interaction.member
    const command = bot.commands.get(interaction.commandName) || bot.commands.get(bot.aliases.get(interaction.commandName))

    const commandStatus = bot.validateCommand(command, interaction)
    if (!commandStatus.status) return interaction.reply(commandStatus.message)
    
    interaction.deferReply()
    
    const args = interaction.options._hoistedOptions.map(option => option.value)
    command.run(bot, interaction, args)
  })
}