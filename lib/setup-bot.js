const { readdirSync } = require('fs')

module.exports = bot => {
  readdirSync(process.cwd() + '/lib/setup/').forEach(file => require(process.cwd() + '/lib/setup/' + file)(bot))
}