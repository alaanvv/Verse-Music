module.exports = client => {
  client.manager
    .on('nodeConnect', () => console.log('Node connected'))
    .on('nodeDisconnect', node => setTimeout(node.connect, 1000))
    .on('nodeError', node => { setTimeout(node.connect, 10000) })
}