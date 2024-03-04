module.exports = {
  name: 'eval',
  description: 'Evalute a JS command',
  options: [{
    name: 'command',
    description: 'Command to evalute',
    type: 3,
    required: true
  }],
  permissions: ['dev'],

  run: (bot, message, args) => {
    try { eval(args.join(' ')) }
  catch (err) { message.channel.send(err.message) }
  }
}
