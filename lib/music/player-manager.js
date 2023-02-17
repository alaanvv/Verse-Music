module.exports = async (client, message, args, type) => {
  require('./method/' + type.split(':')[0])(client, message, args, type)
}