module.exports = bot => {
  bot.on('ready', bot => { console.log('bot running as ' + bot.user.tag) }) 

  Array('botVariables.js', 'loadErela.js', 'loadBotChat.js', 'loadDatabase.js', 'loadCommandSystem.js', 'utils.js').forEach(file => require(process.cwd() + '/lib/setup/' + file)(bot))
}