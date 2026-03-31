<!doctype html>
<html lang="nl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Bammetje 2026 | Doorsturen</title>
  <meta
    name="description"
    content="Doorstuurpagina voor Bammetje 2026 met datum, locatie en link naar de hoofdsite."
  />
  <meta http-equiv="refresh" content="12; url=https://bammetje.bamfestival.nl" />
  <meta name="theme-color" content="#530A1D" />
  <meta name="color-scheme" content="light" />
  <link rel="canonical" href="https://bammetje.bamfestival.nl" />
  <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicons/favicon-32.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@600;700;800&family=Instrument+Sans:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  <style>
    :root {
      color-scheme: light;
      --page_ink: #120206;
      --page_soft_ink: #5d3941;
      --page_white: #fdfafb;
      --page_surface: #fff4ec;
      --page_panel: rgba(253, 250, 251, 0.84);
      --page_border: rgba(83, 10, 29, 0.12);
      --page_shadow: 0 22px 70px rgba(83, 10, 29, 0.18);
      --page_burgundy: #530a1d;
      --page_red_dark: #921234;
      --page_red: #c62144;
      --page_orange: #e26426;
      --page_yellow: #f8be05;
      --page_gradient: linear-gradient(135deg, #530a1d 0%, #921234 35%, #c62144 55%, #e26426 80%, #f8be05 100%);
      --page_backdrop:
        radial-gradient(circle at 16% 18%, rgba(248, 190, 5, 0.2), transparent 24%),
        radial-gradient(circle at 82% 14%, rgba(198, 33, 68, 0.16), transparent 22%),
        radial-gradient(circle at 74% 78%, rgba(226, 100, 38, 0.14), transparent 18%),
        linear-gradient(180deg, #fff7ef 0%, #fff1e7 48%, #fff8f3 100%);
      --ease_out_quint: cubic-bezier(0.22, 1, 0.36, 1);
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-width: 320px;
      min-height: 100vh;
      font-family: "Instrument Sans", sans-serif;
      color: var(--page_ink);
      background: var(--page_backdrop);
    }

    img {
      display: block;
      max-width: 100%;
    }

    a {
      color: inherit;
    }

    .page_shell {
      position: relative;
      min-height: 100vh;
      overflow: hidden;
      padding: 1.5rem;
      display: grid;
      place-items: center;
    }

    .page_shell::before,
    .page_shell::after {
      content: "";
      position: absolute;
      border-radius: 999px;
      filter: blur(34px);
      opacity: 0.72;
      pointer-events: none;
    }

    .page_shell::before {
      top: 4rem;
      left: -4rem;
      width: 14rem;
      height: 14rem;
      background: rgba(248, 190, 5, 0.24);
    }

    .page_shell::after {
      right: -4rem;
      bottom: 2rem;
      width: 16rem;
      height: 16rem;
      background: rgba(198, 33, 68, 0.18);
    }

    .redirect_card {
      position: relative;
      width: min(100%, 34rem);
      padding: 1.35rem;
      border-radius: 2rem;
      background: linear-gradient(180deg, rgba(253, 250, 251, 0.95) 0%, rgba(253, 250, 251, 0.88) 100%);
      border: 1px solid var(--page_border);
      box-shadow: var(--page_shadow);
    }

    .hero_band {
      position: relative;
      overflow: hidden;
      padding: 1.25rem;
      border-radius: 1.5rem;
      background: var(--page_gradient);
      color: var(--page_white);
    }

    .hero_band::after {
      content: "";
      position: absolute;
      inset: auto -2.5rem -3rem auto;
      width: 9rem;
      height: 9rem;
      border-radius: 40% 60% 55% 45%;
      background: rgba(253, 250, 251, 0.14);
      transform: rotate(16deg);
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      padding: 0.5rem 0.8rem;
      background: rgba(253, 250, 251, 0.14);
      border: 1px solid rgba(253, 250, 251, 0.22);
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }

    .brand_row {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
    }

    .brand_mark {
      width: 4.5rem;
      height: 4.5rem;
      flex: 0 0 auto;
      padding: 0.55rem;
      border-radius: 1.25rem;
      background: rgba(253, 250, 251, 0.14);
      border: 1px solid rgba(253, 250, 251, 0.22);
      box-shadow: inset 0 1px 0 rgba(253, 250, 251, 0.12);
    }

    .brand_mark img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .brand_copy h1 {
      margin: 0;
      font-family: "Saira Condensed", sans-serif;
      font-size: clamp(2.4rem, 9vw, 4rem);
      line-height: 0.92;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .brand_copy p {
      margin: 0.45rem 0 0;
      max-width: 22rem;
      color: rgba(253, 250, 251, 0.86);
      font-size: 0.98rem;
      line-height: 1.55;
    }

    .content_stack {
      display: grid;
      gap: 1rem;
      margin-top: 1rem;
    }

    .notice {
      margin: 0;
      padding: 1rem 1.1rem;
      border-radius: 1.3rem;
      background: rgba(83, 10, 29, 0.05);
      color: var(--page_soft_ink);
      line-height: 1.65;
    }

    .notice strong {
      color: var(--page_ink);
    }

    .info_grid {
      display: grid;
      gap: 0.85rem;
    }

    .info_card {
      padding: 1rem 1.05rem;
      border-radius: 1.3rem;
      background: var(--page_panel);
      border: 1px solid var(--page_border);
    }

    .info_card dt {
      margin: 0;
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: var(--page_red_dark);
    }

    .info_card dd {
      margin: 0.45rem 0 0;
      font-size: 1rem;
      line-height: 1.55;
      color: var(--page_ink);
    }

    .link_panel {
      display: grid;
      gap: 0.75rem;
      padding: 1rem 1.05rem;
      border-radius: 1.3rem;
      background: rgba(248, 190, 5, 0.14);
      border: 1px solid rgba(83, 10, 29, 0.1);
    }

    .destination_link {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-height: 3.35rem;
      padding: 0.95rem 1.2rem;
      border-radius: 999px;
      background: var(--page_gradient);
      color: var(--page_white);
      font-weight: 700;
      text-decoration: none;
      text-align: center;
      box-shadow: 0 14px 28px rgba(146, 18, 52, 0.22);
      transition:
        transform 220ms var(--ease_out_quint),
        box-shadow 220ms var(--ease_out_quint),
        opacity 220ms var(--ease_out_quint);
    }

    .destination_link:hover,
    .destination_link:focus-visible {
      transform: translateY(-2px);
      box-shadow: 0 18px 34px rgba(146, 18, 52, 0.26);
    }

    .destination_link:focus-visible {
      outline: 3px solid rgba(248, 190, 5, 0.45);
      outline-offset: 3px;
    }

    .countdown {
      margin: 0;
      text-align: center;
      color: var(--page_soft_ink);
      font-size: 0.95rem;
    }

    @media (min-width: 40rem) {
      .redirect_card {
        padding: 1.55rem;
      }

      .info_grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .link_panel {
        padding: 1.1rem 1.15rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
    }
  </style>
</head>
<body>
  <main class="page_shell">
    <section class="redirect_card" aria-labelledby="redirect_title">
      <div class="hero_band">
        <span class="eyebrow">Bammetje 2026</span>
        <div class="brand_row">
          <div class="brand_mark">
            <img src="./assets/graphics/bammetje-logo-512.png" alt="Bammetje logo" width="512" height="512" />
          </div>
          <div class="brand_copy">
            <h1 id="redirect_title">Tot zo op Bammetje</h1>
            <p>Je wordt automatisch doorgestuurd naar de officiële Bammetje 2026 pagina.</p>
          </div>
        </div>
      </div>

      <div class="content_stack">
        <p class="notice">
          <strong>Nieuwe locatie voor alle info:</strong> de volledige line-up, praktische details en laatste updates staan op de hoofdsite.
        </p>

        <div class="info_grid">
          <dl class="info_card">
            <dt>Datum</dt>
            <dd>23 mei 2026</dd>
          </dl>
          <dl class="info_card">
            <dt>Adres</dt>
            <dd>Broedplaats Oogst<br />Esrein 53, 7553 CX Hengelo</dd>
          </dl>
        </div>

        <div class="link_panel">
          <a class="destination_link" href="https://bammetje.bamfestival.nl">https://bammetje.bamfestival.nl</a>
          <p class="countdown">Automatische redirect over <span id="countdown_value">12</span> seconden.</p>
        </div>
      </div>
    </section>
  </main>

  <script>
    const redirect_url = "https://bammetje.bamfestival.nl";
    const countdown_node = document.getElementById("countdown_value");
    let seconds_left = 12;

    const countdown_timer = window.setInterval(() => {
      seconds_left -= 1;

      if (countdown_node && seconds_left >= 0) {
        countdown_node.textContent = String(seconds_left);
      }

      if (seconds_left <= 0) {
        window.clearInterval(countdown_timer);
      }
    }, 1000);

    window.setTimeout(() => {
      window.location.href = redirect_url;
    }, 12000);
  </script>
</body>
</html>
