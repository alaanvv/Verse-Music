module.exports = bot => {
  for (let fileName of ['botVariables', 'loadDatabase', 'loadEvent', 'loadErela', 'loadCommands', 'utils'])
  require('./setup/' + fileName)(bot)
}