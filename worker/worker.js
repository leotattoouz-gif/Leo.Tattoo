// ЛЕО Tattoo — booking → Telegram bridge + busy days (Cloudflare Worker)
// Secrets / bindings to set in Cloudflare (see README):
//   BOT_TOKEN  (secret)  — token from @BotFather
//   CHAT_ID    (secret)  — Leo's Telegram chat id (open  <worker-url>/chat-id  once to find it)
//   KV         (KV namespace binding) — stores the busy days Leo closes from Telegram
// Optional variable:
//   EXTRA_ORIGINS — comma-separated extra site origins allowed to send (e.g. a custom domain)
const SITE = 'https://leotattoouz-gif.github.io/Leo.Tattoo/';
const ORIGINS = ['https://leotattoouz-gif.github.io'];
const TZ = 'Asia/Tashkent';
const hits = new Map(); // best-effort per-IP rate limit

const esc = s => String(s ?? '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const clip = (s, n) => String(s ?? '').trim().slice(0, n);
const pad = n => String(n).padStart(2, '0');

function todayTZ() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(new Date()).filter(x => x.type !== 'literal').map(x => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}`;
}
const dayDiff = (a, b) => Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 864e5);
const validDate = k => /^\d{4}-\d{2}-\d{2}$/.test(k) && new Date(k + 'T12:00:00Z').toISOString().slice(0, 10) === k;
const nice = k => new Date(k + 'T12:00:00Z').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });

async function tg(env, method, body) {
  const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  });
  return r.json().catch(() => ({ ok: false }));
}
async function hookSecret(env) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('leo-hook:' + env.BOT_TOKEN));
  return [...new Uint8Array(h)].slice(0, 20).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ---- busy days (stored as a JSON array of YYYY-MM-DD in KV, past days dropped automatically)
async function getClosed(env) {
  if (!env.KV) return [];
  const all = JSON.parse((await env.KV.get('closed')) || '[]'), t = todayTZ();
  return all.filter(k => k >= t).sort();
}
async function setClosed(env, list) { await env.KV.put('closed', JSON.stringify([...new Set(list)].sort())); }

// Accepts: 2026-11-03 · 3.11 · 03.11.2026 · 3/11 · 25 (next 25th) · 25-27 · 3.11-5.11 — separated by spaces or commas
function parseDates(text) {
  const t = todayTZ(), [ty, tm] = t.split('-').map(Number), out = [], bad = [];
  const one = s => {
    let m;
    if ((m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) return `${m[1]}-${pad(m[2])}-${pad(m[3])}`;
    if ((m = s.match(/^(\d{1,2})[./](\d{1,2})(?:[./](\d{2,4}))?$/))) {
      let y = m[3] ? (m[3].length === 2 ? 2000 + +m[3] : +m[3]) : ty, k = `${y}-${pad(m[2])}-${pad(m[1])}`;
      if (!m[3] && k < t) k = `${y + 1}-${pad(m[2])}-${pad(m[1])}`;
      return k;
    }
    if ((m = s.match(/^(\d{1,2})$/))) {
      let y = ty, mo = tm, k = `${y}-${pad(mo)}-${pad(m[1])}`;
      if (k < t || !validDate(k)) { mo++; if (mo > 12) { mo = 1; y++; } k = `${y}-${pad(mo)}-${pad(m[1])}`; }
      return k;
    }
    return null;
  };
  for (const tok of text.split(/[\s,;]+/).filter(Boolean)) {
    const r = tok.match(/^(.+?)[–—-](.+)$/);
    if (r && !/^\d{4}-/.test(tok)) {
      const a = one(r[1]); let b = one(r[2]);
      if (a && b && validDate(a) && validDate(b)) {
        if (b < a && /^\d{1,2}$/.test(r[2])) { const d = new Date(a + 'T12:00:00Z'); d.setUTCMonth(d.getUTCMonth() + 1); b = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(r[2])}`; }
        const span = dayDiff(a, b);
        if (span >= 0 && span <= 120) { for (let i = 0; i <= span; i++) { const d = new Date(a + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + i); out.push(d.toISOString().slice(0, 10)); } continue; }
      }
      bad.push(tok); continue;
    }
    const k = one(tok);
    if (k && validDate(k)) out.push(k); else bad.push(tok);
  }
  return { dates: out.filter(k => k >= t), bad };
}

const HELP = [
  '🗓 <b>Busy days / Занятые дни</b>',
  '',
  '<code>/close 27</code> — close the 27th (✕ on the site)',
  '<code>/close 25 26 27</code> or <code>/close 25-27</code>',
  '<code>/close 3.11</code> · <code>/close 3.11-7.11</code> · <code>/close 2026-11-03</code>',
  '<code>/close</code> — close today',
  '<code>/open 27</code> — open a day again (same formats)',
  '<code>/list</code> — show closed days',
  '',
  'Bookings from the website arrive here automatically.'
].join('\n');

async function handleTelegram(update, env) {
  const msg = update.message || update.edited_message;
  if (!msg || !msg.text) return;
  if (String(msg.chat.id) !== String(env.CHAT_ID)) return; // only Leo can manage days
  const reply = text => tg(env, 'sendMessage', { chat_id: env.CHAT_ID, text, parse_mode: 'HTML' });
  const [cmdRaw, ...rest] = msg.text.trim().split(/\s+/), cmd = cmdRaw.toLowerCase().replace(/@.*$/, ''), arg = rest.join(' ');
  if (!env.KV) return reply('⚠️ KV storage is not connected to the worker yet (see README, step B6).');
  if (cmd === '/close' || cmd === '/open') {
    const { dates, bad } = arg ? parseDates(arg) : { dates: [todayTZ()], bad: [] };
    if (!dates.length) return reply(`❓ No valid future dates found${bad.length ? ': ' + esc(bad.join(' ')) : ''}.\n\n` + HELP);
    let list = await getClosed(env);
    list = cmd === '/close' ? list.concat(dates) : list.filter(k => !dates.includes(k));
    await setClosed(env, list);
    const shown = [...new Set(dates)].sort().map(nice).join(', ');
    return reply(`${cmd === '/close' ? '✕ Closed' : '✅ Opened'}: ${shown}${bad.length ? `\n(ignored: ${esc(bad.join(' '))})` : ''}\n\nNow closed: ${(await getClosed(env)).map(nice).join(', ') || '—'}`);
  }
  if (cmd === '/list') { const l = await getClosed(env); return reply(l.length ? '✕ Closed days:\n' + l.map(nice).join('\n') : 'No closed days. All Sun–Thu days are open.'); }
  if (cmd === '/start' || cmd === '/help') return reply(HELP);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = req.headers.get('Origin') || '';
    const allowed = ORIGINS.concat((env.EXTRA_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean));
    const cors = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };
    const json = (obj, status = 200, extra = {}) => new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json', ...extra } });
    const text = (s, status = 200) => new Response(s, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    // Public: list of busy days for the website calendar
    if (req.method === 'GET' && url.pathname === '/closed') return json({ closed: await getClosed(env) }, 200, { 'Cache-Control': 'max-age=30' });

    // Telegram webhook (Leo's commands)
    if (req.method === 'POST' && url.pathname === '/tg') {
      if (!env.BOT_TOKEN || req.headers.get('X-Telegram-Bot-Api-Secret-Token') !== await hookSecret(env)) return text('forbidden', 403);
      try { await handleTelegram(await req.json(), env); } catch (e) { /* never make Telegram retry forever */ }
      return text('ok');
    }

    // One-time helper: shows who has pressed Start in the bot, so you can copy Leo's chat id.
    if (req.method === 'GET' && url.pathname === '/chat-id') {
      if (!env.BOT_TOKEN) return text('Add the BOT_TOKEN secret first.');
      if (env.CHAT_ID) return text('CHAT_ID is already set. Next: open /setup');
      const u = await tg(env, 'getUpdates', {});
      const chats = new Map();
      for (const x of (u.result || [])) { const c = (x.message || x.edited_message || {}).chat; if (c) chats.set(c.id, c); }
      if (!chats.size) return text('No messages yet. From Leo\'s Telegram account, open the bot, press START and send "hi", then reload this page.');
      return text('Copy the id of Leo\'s account into the CHAT_ID secret:\n\n' +
        [...chats.values()].map(c => `${c.id}  —  ${[c.first_name, c.last_name].filter(Boolean).join(' ')}  ${c.username ? '@' + c.username : ''}`).join('\n'));
    }
    // One-time helper: connects the bot commands (/close, /open, /list) to this worker.
    if (req.method === 'GET' && url.pathname === '/setup') {
      if (!env.BOT_TOKEN || !env.CHAT_ID) return text('Set BOT_TOKEN and CHAT_ID first.');
      const r = await tg(env, 'setWebhook', { url: `${url.origin}/tg`, secret_token: await hookSecret(env), allowed_updates: ['message', 'edited_message'], drop_pending_updates: true });
      await tg(env, 'setMyCommands', { commands: [
        { command: 'close', description: 'Close day(s): /close 25 26 or /close 25-27' },
        { command: 'open', description: 'Open day(s) again: /open 26' },
        { command: 'list', description: 'Show closed days' },
        { command: 'help', description: 'How to use' }] });
      if (r.ok) await tg(env, 'sendMessage', { chat_id: env.CHAT_ID, text: '✅ Booking bot connected.\n\n' + HELP, parse_mode: 'HTML' });
      return text(r.ok ? 'Done! The bot sent Leo a message with the commands.' + (env.KV ? '' : '\n\n⚠️ KV is not bound yet — /close will not work until you add it.') : 'Telegram error: ' + JSON.stringify(r));
    }
    if (req.method === 'GET') return text(`ЛЕО Tattoo booking service\nBOT_TOKEN: ${env.BOT_TOKEN ? 'ok' : 'missing'}\nCHAT_ID: ${env.CHAT_ID ? 'ok' : 'missing'}\nKV (busy days): ${env.KV ? 'ok' : 'missing'}`);
    if (req.method !== 'POST' || url.pathname !== '/') return json({ ok: false, error: 'not_found' }, 404);
    if (!allowed.includes(origin)) return json({ ok: false, error: 'origin' }, 403);
    if (!env.BOT_TOKEN || !env.CHAT_ID) return json({ ok: false, error: 'not_configured' }, 503);

    const ip = req.headers.get('CF-Connecting-IP') || 'x', now = Date.now();
    const recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60e3);
    if (recent.length >= 5) return json({ ok: false, error: 'too_many' }, 429);

    let d; try { d = await req.json(); } catch { return json({ ok: false, error: 'invalid' }, 400); }
    const f = {
      name: clip(d.name, 120), phone: clip(d.phone, 40), contact: clip(d.contact, 80), email: clip(d.email, 254),
      idea: clip(d.idea, 1500), design: /^\d{2}-\d{2}$/.test(d.design || '') ? d.design : '', day: String(d.day || ''),
      lang: ['ru', 'en', 'uz'].includes(d.lang) ? d.lang : 'ru'
    };
    if (f.name.length < 2 || f.phone.replace(/\D/g, '').length < 7) return json({ ok: false, error: 'invalid' }, 400);
    if (!validDate(f.day)) return json({ ok: false, error: 'invalid' }, 400);
    const dow = new Date(f.day + 'T12:00:00Z').getUTCDay(), diff = dayDiff(todayTZ(), f.day);
    if (dow > 4 || diff < 0 || diff > 70) return json({ ok: false, error: 'invalid' }, 400);
    if ((await getClosed(env)).includes(f.day)) return json({ ok: false, error: 'closed' }, 409);

    recent.push(now); hits.set(ip, recent);
    const ref = 'LT-' + now.toString(36).slice(-5).toUpperCase();
    const dayTxt = new Date(f.day + 'T12:00:00Z').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
    const handle = f.contact.replace(/^@/, '');
    const lines = [
      `🖋 <b>New booking request</b> · <code>${ref}</code>`, '',
      `📅 <b>Day:</b> ${esc(dayTxt)}`,
      `👤 <b>Name:</b> ${esc(f.name)}`,
      `📞 <b>Phone:</b> ${esc(f.phone)}`,
      `💬 <b>Telegram / Instagram:</b> ${f.contact ? esc(f.contact) + (/^[A-Za-z0-9_.]{3,40}$/.test(handle) ? ` (<a href="https://t.me/${esc(handle)}">TG</a> · <a href="https://instagram.com/${esc(handle)}">IG</a>)` : '') : '—'}`,
      `✉️ <b>Email:</b> ${f.email ? esc(f.email) : '—'}`,
      `🎨 <b>Design:</b> ${f.design ? `${f.design} (picture below)` : 'own idea / not chosen'}`,
      `📝 <b>Idea:</b> ${f.idea ? esc(f.idea) : '—'}`,
      `🌐 <b>Site language:</b> ${f.lang.toUpperCase()}`, '',
      `<i>Busy that day? Reply</i> <code>/close ${f.day}</code>`
    ];
    const m = await tg(env, 'sendMessage', { chat_id: env.CHAT_ID, text: lines.join('\n'), parse_mode: 'HTML', disable_web_page_preview: true });
    if (!m.ok) return json({ ok: false, error: 'telegram' }, 502);
    if (f.design) {
      await tg(env, 'sendPhoto', {
        chat_id: env.CHAT_ID, photo: `${SITE}img/d/${f.design}.jpg`,
        caption: `🎨 Design ${f.design} · ${ref}`, reply_to_message_id: m.result.message_id
      });
    }
    return json({ ok: true, ref });
  }
};
