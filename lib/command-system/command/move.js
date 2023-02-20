module.exports = {
  name: 'move',
  description: 'Moves a song to a specific position in the queue.',
  options: [
    {
      name: 'positions',
      description: '<from> to <to>',
      type: 3,
      required: true
    }
  ],
  requirements: ['VOICE CHANNEL'],

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return

    // args[1] = move x >>to<< y
    if (!args[0] || !args[2]) return message.channel.send('Specify a index')

    const fromIndex = Number(args[0])
    const toIndex = Number(args[2])
    if (isNaN(fromIndex) || isNaN(fromIndex) || fromIndex < 1 || toIndex < 1 || fromIndex > player.queue.size || toIndex > player.queue.size || fromIndex === toIndex)
      return message.channel.send('Invalid index')

    queue = player.queue
    const [fromSong] = queue.splice(fromIndex - 1, 1)

    const beforeArr = queue.splice(0, toIndex - 1)
    const newQueue = [...beforeArr, fromSong, ...queue]

    player.queue.clear()
    for (const track of newQueue)
      player.queue.add(track)

    bot.chat.updateBotChat(message.guild.id)
    message.channel.send('Moved ' + fromIndex + ' to ' + toIndex)
  }
}