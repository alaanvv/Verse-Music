process.on('uncaughtException', err => {
  if (err.stack.startsWith(`TypeError: Cannot read properties of undefined (reading 'password')`))
    console.log('Lavalink isn\'t running')
    
  // else throw err /// You can use wich you prefer
  else console.log(err)
})