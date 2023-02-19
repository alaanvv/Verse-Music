module.exports = bot => {
  bot.utils = {}

  bot.utils.formatTime = ms => {
    let m = Math.floor(ms / 60000)
    ms = ms % 60000
    let s = Math.floor(ms / 1000)

    m = m < 10 ? '0' + String(m) : String(m)
    s = s < 10 ? '0' + String(s) : String(s)

    const time = `[${m}:${s}]`
    return time
  }
  bot.utils.delay = ms => {
    return new Promise((resolve) => { setTimeout(resolve.bind(2), ms) })
  }
  bot.utils.checkURL = string => {
    const args = string.split(' ')
    let url
    for (const arg of args) {
      try {
        url = new URL(arg)
        url = url.protocol === 'http:' || url.protocol === 'https:'
        return true
      } catch (_) { return false }
    }
  }
  bot.utils.search = async (info, checker) => {
    const allRes = await info.fetch()
    const res = allRes.find(checker)

    return res
  }
  bot.utils.autoplay = async (bot, player) => {
    if (player.queue.length > 0) return
    const previoustrack = player.get('previoustrack') || player.queue.current
    if (!previoustrack) return

    const mixURL = `https://www.youtube.com/watch?v=${previoustrack.identifier}&list=RD${previoustrack.identifier}`
    const res = await bot.manager.search(mixURL, undefined)
    
    if (!res || res.loadType === 'LOAD_FAILED' || res.loadType !== 'PLAYLIST_LOADED') return
    player.queue.add(res.tracks[Math.floor(Math.random() * 4 + 1)])
    return player.play()
  }
}