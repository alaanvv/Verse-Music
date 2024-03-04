const validate_command = (bot, command, member) => {
  if (!command) 
    throw 'Unknown command'
  if (command.requirements?.includes('vc') && !member.voice.channel)
    throw 'You need to be in a voice channel'
  if (command.requirements?.includes('vc') && bot.manager.players.get(member.guild.id) && bot.manager.players.get(member.guild.id).voiceChannel != member.voice.channel.id) 
    throw 'You need to be in my voice channel'
  if (command.requirements?.includes('admin') && !member.permissions.has('ADMINISTRATOR')) 
    throw 'You dont have permissions'
  if (command.requirements?.includes('dev') && member.id != bot.dev) 
    throw 'This commands is available only to the developer'
}

module.exports = bot => {
  require('fs').readdirSync(`${process.cwd()}/lib/cmd`).forEach(f => {
    const command = require(`./cmd/${f}`)
    Array(command.name, ...(command.aliases || [])).forEach(n => bot.commands[n] = command)
  })

  bot.on('messageCreate', async message => {
    const prefix = bot.db.cfg.get(message.channel.guildId)?.prefix || bot.prefix
    if (message.content != `${prefix}setup` && bot.db.cfg.get(message.guild.id)?.channel != message.channel.id || message.embeds.length) return

    if (message.author.bot) return setTimeout(async _ => (await message.channel.messages.fetch(message.id))?.delete(), bot.message_delete_delay)
    else message.delete()

    if (bot.waiting_answer.includes(message.author.id)) return

    const args    = message.content.startsWith(prefix) ? message.content.slice(prefix.length).split(' ') : message.content.split(' ')
    const command = message.content.startsWith(prefix) ? bot.commands[args.shift().toLowerCase()] : bot.commands.play
    try { await validate_command(bot, command, message.member) }
    catch (err) { return message.channel.send(err) }

    command.run(bot, message, args)
  })

  bot.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() || interaction.member.bot || bot.db.cfg.get(interaction.guild.id)?.channel != interaction.channelId && interaction.commandName != 'setup') return

    interaction.author = interaction.member

    const command = bot.commands[interaction.commandName]
    try { await validate_command(bot, command, interaction.member) }
    catch (err) { return interaction.reply(err) }

    interaction.deferReply()

    command.run(bot, interaction, interaction.options._hoistedOptions.map(o => o.value))
  })

  bot.on('messageReactionAdd', async (r, u) => {
    if (bot.db.cfg.get(r.message.guild.id)?.embed != r.message.id || u.bot) return 
    await r.users.remove(u.id)

    const member = bot.u.member_from_user(bot, r.message.guild, u)
    const command = bot.commands[bot.reactions[r.emoji]]
    try { await validate_command(bot, command, member) }
    catch (err) { return r.message.channel.send(err) }

    command.run(bot, r.message, { reaction: r, user: u, member, channel: r.message.channel })
  })
}
