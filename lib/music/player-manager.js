module.exports = async (client, message, args, type) => {
  if (!message.guild) return

  require('./method/' + type.split(':')[0])(client, message, args, type)
}