module.exports = bot => {
  bot.on('interactionCreate', async interaction => {
    const botChannelID = bot.settingsDB.get(guild.id)
    if (!interaction.isCommand() || !interaction.guild || interaction.member.bot || botChannelID && !botChannelID === interaction.channelId)  return
    
    interaction.author = interaction.member
    const commandName = interaction.commandName
    const command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName))

    const validationResult = bot.validateCommand(command, interaction)
    if (!validationResult.status) return interaction.reply(validationResult.message)
    
    interaction.deferReply()
    
    const args = interaction.options._hoistedOptions.map(option => option.value)
    command.run(bot, interaction, args)
  })
}