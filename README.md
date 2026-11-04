# Hebrew Calendar

A tiny, dependency-free Hebrew calendar that works with a **D-pad** (TV remote, game pad, arrow keys), mouse and touch.
Blue, green and white. Under 50 KB total, no build step, works offline once loaded (PWA).

## D-pad controls

| Where | Key | Action |
|---|---|---|
| Calendar | ◀ ▶ | previous / next **month** |
| Calendar | ▲ ▼ | next / previous **year** (flip in Settings) |
| Calendar | OK | pick a day (cursor appears) |
| Day cursor | ◀ ▶ ▲ ▼ | move by day / week (crosses months) |
| Day cursor | OK | open the converter on that day |
| Day cursor | ▼ on the last row | move to the bottom bar (Today / Convert / Settings) |
| Anywhere | Back / Esc | step back out |
| Converter | ◀ ▶ | switch field (direction, day, month, year, "show") |
| Converter | ▲ ▼ | change the field's value |
| Converter | OK | flip direction, or show the result in the calendar |
| Settings | ▲ ▼ then ◀ ▶ / OK | choose and change |

Keyboard extras: `T` today, `C` converter, `S` settings, PageUp / PageDown = ±10 years.

## Features

- Month grid with the Gregorian date under every Hebrew date, Shabbat highlighted, today in green
- Gregorian ⇄ Hebrew **date converter** (spinner-style, fully D-pad driven)
- Jewish holidays, fasts, Rosh Chodesh and Chanukah candles; Diaspora / Israel schedule switch
- English or עברית interface (right-to-left, Hebrew numerals), saved between visits
- Leap-year aware (Adar I / Adar II), responsive from phone to TV

## Run locally

Open `index.html`, or serve the folder: `npx serve .`

## Publish on GitHub Pages

1. Create a repo and push these files to the `main` branch.
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch → main / (root)**.
3. Your app is live at `https://<user>.github.io/<repo>/`.

When you change files, bump `VERSION` in `sw.js` so installed copies refresh.

## Verify the calendar maths

`node test/verify.js` checks every day from 1900 to 2100 against the JavaScript engine's built-in Hebrew calendar.

## Files

`hebcal.js` calendar engine · `app.js` UI and key handling · `style.css` theme (edit the colors in `:root`) · `sw.js`, `manifest.json`, `icon.svg` offline/install support
