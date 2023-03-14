@REM It runs the bot and the lavalink in separated windows,
@REM you can execute lavalink only with lavalink.bat
start /max cmd /k call npm start
start /max cmd /k call java -jar lavalink/Lavalink.jar