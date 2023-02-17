module.exports = bot => {
  ['botVariables.js', 'loadErela.js', 'loadBotChat.js', 'loadCommands.js', 'loadDatabase.js', 'loadEvent.js', 'utils.js']
    .forEach(file => require(process.cwd() + '/lib/setup/' + file)(bot))
}