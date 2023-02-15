const Enmap = require('enmap')

module.exports = bot => {
  bot.settingsDB = new Enmap({
    name: 'settings',
    dataDir: './db/settings'
  })
  bot.playlistDB = new Enmap({
    name: 'playlist',
    dataDir: './db/playlist'
  })
}