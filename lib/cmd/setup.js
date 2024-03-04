module.exports = {
  name: 'setup',
  description: 'Setup the music player in the current channel',
  permissions: ['admin'],

  run: async (bot, message) => {
    await message.channel.send(bot.banner)
    const embed = await message.channel.send({content: bot.gen_queue_message(message.guild), embeds: [await bot.gen_embed(message.guild)]})

    bot.db.cfg.set(message.guild.id, message.channel.id, 'channel')
    bot.db.cfg.set(message.guild.id, embed.id, 'embed')

    Object.keys(bot.reactions).forEach(emoji => embed.react(emoji))
  }
}
