let started = false

module.exports = client => {
  client.manager
    .on('nodeConnect', node => {
      if (!started) started = true
      setTimeout(e => { started = false }, 2000)
    })
    .on('nodeDisconnect', node => {
      setTimeout(e => { node.connect() }, 1000)
    })
    .on('nodeError', (node, error) => {
      setTimeout(e => { node.connect() }, 1000)
    })
}