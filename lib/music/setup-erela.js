const { Manager } = require('erela.js')
const Spotify = require('erela.js-spotify')
const AppleMusic = require('erela.js-apple')
const Deezer = require('erela.js-deezer')
const Facebook = require('erela.js-facebook')

clientID = 'ef46df3725c84e97a0235a910950ae3e'
clientSecret = '56b0fc88e62c4a9ca6277f2ec7fe3f28'

module.exports = bot => {
  bot.manager = new Manager({
    nodes: [{ 'host': 'localhost', 'port': 2333, 'password': 'youshallnotpass' }],
    plugins: [ new Spotify({ clientID, clientSecret }), new Deezer(), new Facebook(), new AppleMusic() ],
    send(id, payload) {
      var guild = bot.guilds.cache.get(id)
      if (guild) guild.shard.send(payload)
    },
  })
  
  bot.once('ready', () => { bot.manager.init(bot.user.id) })

  require('./erela/node-events')(bot)
  require('./erela/events')(bot)
}