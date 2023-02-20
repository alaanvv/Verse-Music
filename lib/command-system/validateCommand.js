module.exports = bot => {
  bot.validateCommand = (command, message) => {
    const member = message.member
    if (!command) return { status: false, message: 'Unknown command' }

    if (command.requirements) {
      if (command.requirements.includes('VOICE CHANNEL')) {

        if (!member.voice.channel)
          return { status: false, message: 'You need to be in a voice channel' }

        const player = bot.manager.players.get(member.guild.id)
        if (player && player.voiceChannel !== member.voice.channel.id)
          return { status: false, message: 'You need to be in my voice channel' }
      }
    }

    if (command.memberpermissions && !member.permissions.has(command.permissions))
      return { status: false, message: 'You dont have permissions' }

    return { status: true }
  }
}