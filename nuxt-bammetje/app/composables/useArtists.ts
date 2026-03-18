export const useArtists = () => {
  const artists = [
    {
      name: 'André Manuel',
      stage: 'Hoofdpodium' as const,
      description: 'Een van de grotere namen op het Hoofdpodium: zichtbaar, dragend en perfect voor een gezamenlijk BAM-moment.',
      bio: 'Scherpe teksten, veel karakter en precies het soort naam dat op Bammetje meteen gewicht geeft aan de dag.',
      time: '18:45 indicatie',
      theme: 'dark' as const,
      image: '/assets/stock/concert-crowd-stage-960.webp'
    },
    {
      name: 'IDA',
      stage: 'Hoofdpodium' as const,
      description: 'Ook op het Hoofdpodium: een naam die de grotere publieksmomenten van Bammetje mee kleur geeft.',
      bio: 'Een energieke livekaart voor de grotere publieksblokken, met genoeg uitstraling om het Hoofdpodium echt open te trekken.',
      time: '20:15 indicatie',
      theme: 'light' as const,
      image: '/assets/stock/concert-singer-audience-960.webp'
    },
    {
      name: 'Post Ella',
      stage: 'De Tent' as const,
      description: 'In De Tent voelt het dichter op het publiek. Post Ella past precies in die lossere, intiemere flow.',
      bio: 'Een tent-act die het publiek dichterbij trekt: minder afstand, meer direct contact en precies de juiste spanning voor Bammetje.',
      time: '15:00 indicatie',
      theme: 'night' as const,
      image: '/assets/stock/concert-audience-lights-960.webp'
    },
    {
      name: 'Lenny Monsou',
      stage: 'De Tent' as const,
      description: 'Ook in De Tent: een livekaart die Bammetje een warme, directe en compacte festivalfeel geeft.',
      bio: 'Een naam die goed past in de kleinere, warmere setting van De Tent: dichtbij, menselijk en meteen aanwezig.',
      time: '16:30 indicatie',
      theme: 'gold' as const,
      image: '/assets/stock/concert-singer-audience-960.webp'
    },
    {
      name: 'L\u00e9zard',
      stage: 'De Tent' as const,
      description: 'De Tent blijft de plek voor acts die klein beginnen maar de ruimte toch meteen naar zich toe trekken.',
      bio: 'Een act voor het vroegere tentblok: spannend genoeg om op te vallen, maar compact genoeg voor de directe setting van Bammetje.',
      time: '17:45 indicatie',
      theme: 'light' as const,
      image: '/assets/stock/concert-crowd-stage-960.webp'
    },
    {
      name: 'Yo That\u2019s Shit',
      stage: 'Tommy-Loods' as const,
      description: 'De Tommy-Loods is de dj-hoek van de avond: losser, later en gemaakt voor ritme, sfeer en beweging.',
      bio: 'Een dj-slot voor wanneer Bammetje wat meer nachtenergie mag krijgen: rauwer, sneller en gebouwd op beweging.',
      time: '21:15 indicatie',
      theme: 'night' as const,
      image: '/assets/stock/concert-audience-lights-960.webp'
    },
    {
      name: 'M\u00f8rssync & Sabossi',
      stage: 'Tommy-Loods' as const,
      description: 'Ook in de Tommy-Loods: een dj-set die Bammetje tegen de avond net wat meer vaart en spanning geeft.',
      bio: 'Een afsluitende dj-vibe voor de loods: iets donkerder, iets later en perfect om de mini-editie met tempo af te ronden.',
      time: '22:00 indicatie',
      theme: 'dark' as const,
      image: '/assets/stock/concert-singer-audience-960.webp'
    }
  ]

  return { artists }
}
