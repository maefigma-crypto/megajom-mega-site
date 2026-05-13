#!/usr/bin/env node
// Bukti Cuci — MEGAJOM post with rotating opener/closer lines for variety.

import { loadJson, sendMarkdownPhotoPost, fmtRM, md, nextIndex } from './_helpers.mjs';

const BRAND_LABEL = {
  mega888: 'Mega888',
  kiss918: '918Kiss',
  pussy888: 'Pussy888',
};

const OPENERS = [
  'Bukti cuci fresh baru masuk',
  'Member MegaJOM cashout lagi',
  'Result cantik dari sesi hari ini',
  'Modal kecil, outcome memang padu',
];

const CLOSERS = [
  'Target sampai terus lock profit',
  'Main steady, cashout cantik',
  'Jangan tamak, win sudah ada terus simpan',
  'Flow ngam, keputusan pun kemas',
];

function pickEntry() {
  const entries = loadJson('data/bukti-cuci.json');
  return entries[nextIndex('bukti-cuci', entries.length)];
}

function pickOne(items, seed) {
  return items[Math.abs(seed) % items.length];
}

function buildCaption(entry, game) {
  const brand = BRAND_LABEL[entry.brand] ?? entry.brand;
  const gameName = game?.name_en ?? entry.game_id;
  const seed = entry.deposit + entry.withdrawal + entry.turnover;
  const profit = entry.withdrawal - entry.deposit;

  return [
    `🤖 *MEGAJOM*`,
    ``,
    `🔥 *BUKTI CUCI UPDATED* 🔥`,
    ``,
    `✅ ${md(pickOne(OPENERS, seed))}`,
    ``,
    `👑 *Member:* \`${md(entry.member)}\``,
    `👉 *Provider :* ${md(brand)}`,
    `🎮 *Game:* ${md(gameName)}`,
    `💰 *Deposit:* ${md(fmtRM(entry.deposit))}`,
    `💰 *Withdrawal:* ${md(fmtRM(entry.withdrawal))} ✅`,
    `📈 *Profit:* ${md(fmtRM(profit))}`,
    ``,
    `💬 ${md(entry.note)}`,
    `🚀 ${md(pickOne(CLOSERS, seed + 3))}`,
  ].join('\n');
}

async function main() {
  const entry = pickEntry();
  const games = loadJson('data/games.json');
  const game = (games[entry.brand] ?? []).find((g) => g.id === entry.game_id);
  const imagePath = game?.image ?? '/images/games/mega888/great-blue.png';

  const caption = buildCaption(entry, game);
  const result = await sendMarkdownPhotoPost({ imagePath, caption });
  console.log(`✅ Posted bukti-cuci #${result.message_id} — ${game?.name_en ?? entry.game_id}`);
}

main().catch((err) => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
