const handleErr = err => {
  if (/Cannot read properties of undefined \(reading 'password'\)/.test(err.stack)) console.log('Lavalink isn\'t running')
  else if (/An invalid token was provided/.test(err.stack)) console.log('Invalid bot token')
  else if (/Request failed with status code 400[\s\S]*erela\.js-spotify/.test(err.stack)) console.log('Invalid spotify token')

  else console.log(err)
}

process
  .on('uncaughtException', handleErr)
  .on('uncaughtExceptionMonitor', handleErr)
  .on('unhandledRejection', handleErr)