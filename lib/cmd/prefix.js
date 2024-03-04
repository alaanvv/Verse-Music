module.exports = {
  name: 'prefix',
  description: 'Changes the bot prefix',
  options: [{
    name: 'prefix',
    description: 'The prefix you want to set',
    type: 3,
    required: true
  }],
  permissions: ['admin'],

  run: (bot, message, args) => {
    const prefix = args[0]
    if (!prefix) return

    bot.db.cfg.set(message.channel.guildId, prefix, 'prefix')
    bot.update_chat(message.channel.guild, 0x0F)

    message.channel.send(`Prefix now is **${prefix}**`)
  }
}
