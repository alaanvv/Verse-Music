module.exports = bot => {
  ['setup-erela'].forEach(file => require(process.cwd() + '/lib/music/' + file)(bot))
}