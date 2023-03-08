module.exports = bot => {
  bot.utils = {}

  bot.utils.formatTime = ms => {
    let m = Math.floor(ms / 60000)
    ms = ms % 60000
    let s = Math.floor(ms / 1000)

    m = m < 10 ? '0' + String(m) : String(m)
    s = s < 10 ? '0' + String(s) : String(s)

    return `[${m}:${s}]`
  }
  bot.utils.delay = ms => {
    return new Promise((resolve) => { setTimeout(resolve(), ms) })
  }
  bot.utils.checkURL = string => {
    return /^https:\/\/[^\s/$.?#].[^\s]*$/i.test(string)
  }
  bot.utils.search = async (info, checker) => {
    const allRes = await info.fetch()
    return allRes.find(checker)
  }
  bot.utils.autoplay = async (bot, player) => {
    const previoustrack = player.get('previoustrack') || player.queue.current
    if (!previoustrack) return

    const mixURL = `https://www.youtube.com/watch?v=${previoustrack.identifier}&list=RD${previoustrack.identifier}`
    const res = await bot.manager.search(mixURL, undefined)

    if (!res || res.loadType === 'LOAD_FAILED' || res.loadType !== 'PLAYLIST_LOADED') return
    player.queue.add(res.tracks[Math.floor(Math.random() * 3 + 1)])
    return player.play()
  }
}