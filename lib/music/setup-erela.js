const { Manager } = require('erela.js')
const Spotify = require('erela.js-spotify')
const AppleMusic = require('erela.js-apple')
const Deezer = require('erela.js-deezer')
const Facebook = require('erela.js-facebook')

module.exports = bot => {
  bot.manager = new Manager({
    nodes: [{ host: 'localhost', port: 2333, password: 'youshallnotpass', retryAmount: Infinity, retryDelay: 3000 }],
    plugins: [ new Spotify({ clientID: bot.spotifyClientID, clientSecret: bot.spotifyClientSecret }), new Deezer(), new Facebook(), new AppleMusic() ],
    send(id, payload) {
      var guild = bot.guilds.cache.get(id)
      if (guild) guild.shard.send(payload)
    },
  })
  bot.manager.createPlayer = async (guildID, channelID, vcID) => {
    return await bot.manager.create({
      guild: guildID,
      textChannel: channelID,
      voiceChannel: vcID,
      selfDeafen: true,
    })
  }
  bot.songQuery = (bot, message, args, type) => require(process.cwd() + '/lib/music/method/' + type.split(':')[0])(bot, message, args, type)
  
  bot.once('ready', () => { bot.manager.init(bot.user.id) })
  bot.on('raw', d => bot.manager.updateVoiceState(d))

  require('./node-events')(bot)
  require('./player-events')(bot)
}