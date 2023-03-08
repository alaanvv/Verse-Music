const puppeteer = require('puppeteer')

module.exports = {
  name: 'lyrics',
  description: 'Get the lyrics of current song.',

  run: async (bot, message, args) => {
    const player = bot.manager.players.get(message.guild.id)
    if (!player) return
    message.channel.send('Loading lyrics...')

    try {
      const query = player.queue.current.title + ' ' + player.queue.current.author
      const linkSite = 'https://www.letras.mus.br'

      const browser = await puppeteer.launch({ headless: true })
      const page = await browser.newPage()
      await page.setRequestInterception(true)
      page.on('request', (req) => {
        if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image')
          return req.abort()

        req.continue()
      })

      await page.goto(`${linkSite}/?q=${query}`)
      try {
        await page.click('a.gs-title')
      } catch (err) {
        await page.waitForSelector('a.gs-title')
        await page.click('a.gs-title')
      }
      const url = page.url()
      const lyricDOM = await page.$(url.includes('traducao.html') ? '.cnt-trad_l' : '.cnt-letra')

      const lyric = await page.evaluate(el => el.innerText, lyricDOM)
      await browser.close()

      const embed = {
        title: player.queue.current.title,
        description: lyric
      }
      const msg = await message.channel.send({ embeds: [embed] })
      const channel = await bot.channels.fetch(message.channel.id);

      setTimeout(async () => {
        await channel.messages.fetch(msg.id)
          .then((msg => msg.delete()))
      }, 30000)
    } catch (err) { message.channel.send('Lyrics not found') }
  }
}

// LYRICS SCRAPER CREDIT: https://github.com/Ronaldo3030/api-lyrics-scraper