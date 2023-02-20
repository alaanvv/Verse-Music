module.exports = bot => {
  bot.on('ready', bot => console.log('Bot running as ' + bot.user.tag)) 
  bot.on('messageCreate', async message => console.log(message.author.username + ': ' + message.content))
  
  Array('botVariables.js', 'loadErela.js', 'loadBotChat.js', 'loadDatabase.js', 'loadCommandSystem.js', 'utils.js').forEach(file => require(process.cwd() + '/lib/setup/' + file)(bot))
}