const { readdirSync } = require('fs')

module.exports = bot => {
  readdirSync(process.cwd() + '/lib/setup/erela/').forEach(file => require(process.cwd() + '/lib/setup/erela/' + file)(bot) )
}