module.exports = bot => {
  for (let fileName of ['botVariables', 'loadDatabase', 'loadEvent', 'loadErela', 'loadCommands', 'utils', 'chatCleaner', 'handleNoPrefix'])
  require('./setup/' + fileName)(bot)
}