module.exports = {
  name: 'eval',
  description: 'Evalute a JS command.',
  options: [
    {
      name: 'cmd',
      description: 'Command to evalute',
      type: 3,
      required: true
    }
  ],
  permissions: ['ADMINISTRATOR'],

  run: async (bot, message, args) => {
    if (!args.length) return message.channel.send('Provide a command')

    eval(args.join(' ')).catch(err => message.channel.send(err.message))
  }
}