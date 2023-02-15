const fs = require('fs')

module.exports = async bot => {
  fs.readdirSync(process.cwd() + '/lib/event').forEach(file => {
    const event = require(process.cwd() + '/lib/event/' + file)

    let eventName = file.split('.')[0]
    bot.on(eventName, event.bind(null, bot))
  })
}