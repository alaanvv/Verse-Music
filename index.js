const { Client } = require('discord.js')
const setup = require('./lib/setup')
const { autoRunLavalink } = require('./config.json')

// If not, you need to run manually with `lavalink.bat`
if (autoRunLavalink) {
  const { spawn } = require('child_process')
  const startLava = spawn('java -jar ./lavalink/Lavalink.jar', { shell: true })
  startLava.on('close', code => { throw 'Failed to run lavalink' })
}

const bot = new Client({ intents: 3276799 }) // All intents
setup(bot)

bot.login(bot.token)