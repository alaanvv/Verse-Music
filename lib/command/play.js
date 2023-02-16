const playerManager = require(`${process.cwd()}/lib/music/player-manager`)

module.exports = {
  name: 'play',
  aliases: ['p'],

  run: async (client, message, args) => {
    if (!args[0]) return message.reply('provide a song')

    if (args.join(' ').includes('soundcloud')) playerManager(client, message, args, 'song:soundcloud')
    else if (args.join(' ').includes('spotify')) playerManager(client, message, args, 'song:raw')
    else if (args.join(' ').includes('apple')) playerManager(client, message, args, 'song:raw')
    else playerManager(client, message, args, 'song:youtube')
  }
}