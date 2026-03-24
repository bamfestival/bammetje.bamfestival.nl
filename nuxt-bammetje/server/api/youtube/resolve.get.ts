function toEmbedUrl(url: string) {
  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname.replace(/^www\./, '')

    if (hostname === 'youtu.be') {
      const videoId = parsed.pathname.slice(1)
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : ''
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (parsed.pathname.startsWith('/embed/')) {
        const videoId = parsed.pathname.split('/')[2]
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : ''
      }

      if (parsed.pathname === '/watch') {
        const videoId = parsed.searchParams.get('v')
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : ''
      }

      const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/]+)/)
      if (shortsMatch?.[1]) {
        return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`
      }
    }
  }
  catch {
    return ''
  }

  return ''
}

async function resolveChannelId(url: string) {
  const parsed = new URL(url)

  if (parsed.pathname.startsWith('/channel/')) {
    return parsed.pathname.split('/')[2] || ''
  }

  const response = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; BammetjeBot/1.0; +https://bammetje.bamfestival.nl/)',
      accept: 'text/html,application/xhtml+xml'
    }
  })

  if (!response.ok) {
    return ''
  }

  const html = await response.text()
  const match = html.match(/"channelId":"(UC[^"]+)"/)
    || html.match(/<meta itemprop="channelId" content="(UC[^"]+)">/)
    || html.match(/"externalId":"(UC[^"]+)"/)

  return match?.[1] || ''
}

async function resolveLatestVideoEmbed(url: string) {
  const channelId = await resolveChannelId(url)
  if (!channelId) {
    return ''
  }

  const feedResponse = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; BammetjeBot/1.0; +https://bammetje.bamfestival.nl/)',
      accept: 'application/atom+xml,text/xml'
    }
  })

  if (!feedResponse.ok) {
    return ''
  }

  const feed = await feedResponse.text()
  const match = feed.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)

  return match?.[1] ? `https://www.youtube-nocookie.com/embed/${match[1]}` : ''
}

export default cachedEventHandler(async (event) => {
  const query = getQuery(event)
  const url = typeof query.url === 'string' ? query.url.trim() : ''

  if (!url) {
    return { embedUrl: '' }
  }

  const directEmbedUrl = toEmbedUrl(url)
  if (directEmbedUrl) {
    return { embedUrl: directEmbedUrl }
  }

  const embedUrl = await resolveLatestVideoEmbed(url)
  return { embedUrl }
}, {
  maxAge: 60 * 60 * 6,
  swr: true,
  getKey: event => {
    const query = getQuery(event)
    return typeof query.url === 'string' ? query.url : ''
  }
})
