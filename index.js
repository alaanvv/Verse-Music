const { Client } = require('discord.js')
const setup = require('./lib/setup')

const bot = new Client({ intents: 34435, partials: [1, 3, 4] })
setup(bot)

bot.login(bot.token)
