const { readdirSync } = require('fs')

module.exports = bot => {
  readdirSync(process.cwd() + '/lib/bot-chat').forEach(file => require(process.cwd() + '/lib/bot-chat/' + file)(bot))
}