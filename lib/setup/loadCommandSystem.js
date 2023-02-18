module.exports = bot => {
  ['handle.js', 'handleNoPrefix.js', 'handleReaction.js', 'loadCommands.js', 'validateCommand.js'].forEach(file => { require(process.cwd() + '/lib/command-system/' + file)(bot) })
}