# ЛЕО Tattoo — website

Responsive tattoo artist website (Tashkent, Uzbekistan) in Russian (default), English and Uzbek.
Live: https://leotattoouz-gif.github.io/Leo.Tattoo/

## What is inside

- `index.html`, `css/`, `js/app.js` — the site.
- `img/g/` — the 22 idea sheets (full size), `img/t/` — their previews.
- `img/d/` — **680 single designs** cut out of the sheets (`SS-NN.jpg`, e.g. `05-12` = sheet 05, design 12), `img/d/th/` — their thumbnails. `js/designs.js` lists how many designs each sheet has.
- `worker/worker.js` — the small Cloudflare Worker that forwards every booking to Leo's Telegram.
- `js/config.js` — settings (booking endpoint, Telegram username, email, timezone).

## How booking works

1. The visitor picks a **day** (Sunday–Thursday, up to 8 weeks ahead, Tashkent time — the calendar moves forward automatically; no hours are chosen).
2. Fills in name and phone (required), Telegram/Instagram username and email (optional), can pick **one exact design** from the idea sheets (optional) and describe the idea (optional).
3. "Send" posts the form to the Worker, which sends Leo a Telegram message with all details, plus the chosen design picture as a reply.
4. Visitors with their own picture are told to send it to Leo on Telegram @kaishi_tattoo.
5. A day is never blocked by a request — several clients can ask for the same day; Leo decides. Leo can mark days as **busy** from Telegram; they show on the site with ✕ "Занято / Busy / Band" and cannot be chosen.

## Busy days — commands Leo sends to the bot

| Command | What it does |
|---|---|
| `/close 27` | closes the 27th (next coming 27th) |
| `/close 25 26 27` or `/close 25-27` | closes several days |
| `/close 3.11`, `/close 3.11-7.11`, `/close 2026-11-03` | other date formats |
| `/close` | closes today |
| `/open 27` | opens a day again (same formats) |
| `/list` | shows all closed days |

Past days are removed automatically. Each booking message ends with a ready `/close <that day>` hint.

While `bookingEndpoint` in `js/config.js` is empty, the form does not pretend to work — it tells visitors to message Leo on Telegram.

## One-time setup of the Telegram booking (about 10 minutes)

**A. Create the bot**
1. In Telegram open **@BotFather** → `/newbot` → choose a name (e.g. `LEO Tattoo Booking`) and a username ending in `bot`.
2. Copy the **token** it gives you. Keep it secret — never put it in this repository.
3. From Leo's account **@kaishi_tattoo**, open the new bot, press **START** and send `hi`. (A bot can only write to people who started it.)

**B. Create the Worker (free)**
1. Sign up at https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Create Worker** → name it `leo-booking` → **Deploy**.
2. **Edit code**, delete everything, paste the whole content of `worker/worker.js`, **Deploy**.
3. **Settings → Variables and Secrets → Add** → type *Secret*, name `BOT_TOKEN`, value = the token → Deploy.
4. Open `https://leo-booking.<your-subdomain>.workers.dev/chat-id` in a browser. It lists who pressed START — copy the number next to Leo's account.
5. Add a second *Secret* `CHAT_ID` with that number → Deploy.
6. **Busy-days storage:** Cloudflare → **Storage & Databases → KV → Create** a namespace called `leo-days`. Then in the Worker → **Settings → Bindings → Add → KV namespace**, variable name `KV`, choose `leo-days` → Deploy.
7. Open `https://leo-booking.<your-subdomain>.workers.dev/setup` once. The bot sends Leo a message with the commands. Opening the worker URL now shows `BOT_TOKEN: ok`, `CHAT_ID: ok`, `KV: ok`.
   (Do step 4 before step 7 — after /setup the `/chat-id` page no longer works.)

**C. Connect the site**
1. In `js/config.js` set `bookingEndpoint: "https://leo-booking.<your-subdomain>.workers.dev/"` and commit.
2. Wait ~1 minute for GitHub Pages, open the site, send a test booking — it arrives in @kaishi_tattoo's Telegram.

If you later use your own domain, add it to the Worker as a variable `EXTRA_ORIGINS` (e.g. `https://leotattoo.uz`).

## Details to keep up to date

- Hours shown: Sunday–Thursday, 13:00–22:00, by appointment only (Tashkent). Change the texts `b2` in `js/app.js` if they change.
- Contacts are in the footer of `index.html`: Instagram `kaishi_tattoo`, Instagram `wenx.xz_`, TikTok `wnxz_wqn`, Telegram `kaishi_tattoo`, email `leo.tattoo.uz@gmail.com`.
- The idea sheets are reference images collected from the internet; the site presents them as ideas Leo can tattoo, not as his own artwork.
- Local preview needs Node.js 20+: run `node preview-server.mjs` and open `http://127.0.0.1:4176`.
