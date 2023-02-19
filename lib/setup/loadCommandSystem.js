module.exports = bot => {
  ['handle.js', 'handleNoPrefix.js', 'handleSlash.js', 'handleReaction.js', 'loadCommands.js', 'validateCommand.js'].forEach(file => { require(process.cwd() + '/lib/command-system/' + file)(bot) })
}