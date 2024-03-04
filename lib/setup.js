const { readdirSync, existsSync, mkdirSync } = require('fs')
const { Routes } = require('discord-api-types/v9')
const { REST } = require('@discordjs/rest')
const Enmap = require('enmap')
require('dotenv').config()

module.exports = bot => {
  bot.on('ready', async bot => {
    console.info(`Running as ${bot.user.tag}`); // <- this is necessary ToT
    (await bot.guilds.fetch()).forEach(async g => bot.update_chat(await g.fetch(), 0xFF))
  })

  // Database
  bot.db = {}
  Array('cfg', 'fav').map(name => {
    !existsSync(`./db/${name}`) && mkdirSync(`./db/${name}`, { recursive: true })
    bot.db[name] = new Enmap({ name, dataDir: `./db/${name}` })
  })

  // Bot variables and constants
  bot.dev = process.env.dev
  bot.token = process.env.token
  bot.prefix = process.env.prefix
  bot.spotify_id = process.env.spotify_id
  bot.spotify_secret = process.env.spotify_secret
  bot.lavalink_host = process.env.lavalink_host
  bot.lavalink_port = Number(process.env.lavalink_port)
  bot.lavalink_password = process.env.lavalink_password
  bot.lavalink_secure = process.env.lavalink_secure
  bot.banner = process.env.banner
  bot.background = process.env.background
  bot.text = process.env.text
  bot.queue_rows = Number(process.env.queue_rows)
  bot.message_delete_delay = Number(process.env.message_delete_delay)
  bot.page_delete_delay = Number(process.env.page_delete_delay)
  bot.autoplay_randomness = Number(process.env.autoplay_randomness)

  bot.commands = {}
  bot.waiting_answer = []

  bot.reactions = {
    '⏯': 'pause',
    '⏹': 'stop',
    '⏭': 'skip',
    '🔄': 'loop',
    '🔀': 'shuffle',
    '⭐': 'save',
  }

  bot.u = require('./utils')
  require('./erela')(bot)
  require('./chat-manager')(bot)
  require('./command-system')(bot)

  // Update slash commands
  body = readdirSync(`${process.cwd()}/lib/cmd`).map(f => require(`./cmd/${f}`)).filter((c, i, l) => c.name != l[i - 1]?.name)
  new REST({ version: '9' }).setToken(process.env.token).put(Routes.applicationCommands(process.env.client_id), { body })
}

// Error handling
const handle_err = err => {
  if      (/Cannot read properties of undefined \(reading 'password'\)/.test(err.stack)) console.warn('Retrying lavalink...')
  else if (/Request failed with status code 400[\s\S]*erela\.js-spotify/.test(err.stack)) console.error('Invalid Spotify token')
  else if (/An invalid token was provided/.test(err.stack)) console.error('Invalid bot token')
  else    console.error(err)
}

process.on('uncaughtExceptionMonitor', handle_err)
process.on('unhandledRejection', handle_err)
process.on('uncaughtException', handle_err)
